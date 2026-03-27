/**
 * Seeds `content_blocks` from static site data (i18n tree, blog posts, support articles).
 * Idempotent: upserts on `key`. Requires DATABASE_URL (except with `--dry-run`).
 *
 * Run: pnpm --filter @workspace/api-server run seed:content
 */
import { sql } from "drizzle-orm";
import { flattenStringLeaves } from "../../ziadah-landing/src/i18n/mergeStaticWithCms.ts";
import { t } from "../../ziadah-landing/src/i18n/translations.ts";
import { blogPosts } from "../../ziadah-landing/src/data/blogPosts.ts";
import {
  categories as supportCategories,
  type FullArticle,
} from "../../ziadah-landing/src/data/support-data.ts";
import { sectorVisualsBySlug } from "../../ziadah-landing/src/data/sectorVisuals.ts";

type BlockRow = {
  key: string;
  value: string;
  type: "text" | "richtext";
  page: string;
  section: string;
  label: string;
};

function blockTypeForKey(key: string, value: string): "text" | "richtext" {
  if (value.length > 12000) return "richtext";
  if (
    key.includes(".content") ||
    key.endsWith("Json") ||
    key.includes("sections")
  ) {
    return "richtext";
  }
  return "text";
}

function pageSectionLabel(key: string): { page: string; section: string; label: string } {
  if (key.startsWith("ar.") || key.startsWith("en.")) {
    const parts = key.split(".");
    const section = parts.slice(0, 2).join(".").substring(0, 128);
    return { page: "i18n", section, label: key.substring(0, 512) };
  }
  if (key.startsWith("blog.")) {
    const slug = key.split(".")[1] ?? "post";
    return {
      page: "blog",
      section: slug.substring(0, 128),
      label: key.substring(0, 512),
    };
  }
  if (key.startsWith("support.")) {
    const id = key.split(".")[1] ?? "article";
    return {
      page: "support",
      section: id.substring(0, 128),
      label: key.substring(0, 512),
    };
  }
  return { page: "site", section: "misc", label: key.substring(0, 512) };
}

function serializeSections(sections: FullArticle["sections"]): string {
  return JSON.stringify(sections);
}

function buildRows(): BlockRow[] {
  const flatAr = flattenStringLeaves(t.ar, "ar");
  const flatEn = flattenStringLeaves(t.en, "en");
  const merged: Record<string, string> = { ...flatAr, ...flatEn };

  const rows: BlockRow[] = [];
  for (const [key, value] of Object.entries(merged)) {
    const { page, section, label } = pageSectionLabel(key);
    rows.push({
      key,
      value,
      type: blockTypeForKey(key, value),
      page,
      section,
      label,
    });
  }

  for (const post of blogPosts) {
    const base = `blog.${post.slug}`;
    const entries: [string, string][] = [
      [`${base}.title`, post.title],
      [`${base}.titleEn`, post.titleEn ?? post.title],
      [`${base}.summary`, post.summary],
      [`${base}.summaryEn`, post.summaryEn ?? post.summary],
      [`${base}.readTime`, post.readTime],
      [`${base}.readTimeEn`, post.readTimeEn ?? post.readTime],
      [`${base}.publishDate`, post.publishDate],
      [`${base}.publishDateEn`, post.publishDateEn ?? post.publishDate],
      [`${base}.content`, post.content],
      [`${base}.contentEn`, post.contentEn ?? post.content],
    ];
    for (const [key, value] of entries) {
      const { page, section, label } = pageSectionLabel(key);
      rows.push({
        key,
        value,
        type: blockTypeForKey(key, value),
        page,
        section,
        label,
      });
    }
  }

  for (const cat of supportCategories) {
    for (const article of cat.articles) {
      const base = `support.${article.id}`;
      const secAr = serializeSections(article.sections);
      const secEn = article.sectionsEn
        ? serializeSections(article.sectionsEn)
        : secAr;
      const entries: [string, string][] = [
        [`${base}.title`, article.title],
        [`${base}.titleEn`, article.titleEn ?? article.title],
        [`${base}.desc`, article.desc],
        [`${base}.descEn`, article.descEn ?? article.desc],
        [`${base}.time`, article.time],
        [`${base}.timeEn`, article.timeEn ?? article.time],
        [`${base}.sectionsJson`, secAr],
        [`${base}.sectionsEnJson`, secEn],
      ];
      for (const [key, value] of entries) {
        const { page, section, label } = pageSectionLabel(key);
        rows.push({
          key,
          value,
          type: blockTypeForKey(key, value),
          page,
          section,
          label,
        });
      }
    }
  }

  for (const [slug, bundle] of Object.entries(sectorVisualsBySlug)) {
    bundle.scenarios.forEach((sc, i) => {
      const entries: [string, string][] = [
        [`ar.sectorVisual.${slug}.scenarios.${i}.title`, sc.titleAr],
        [`en.sectorVisual.${slug}.scenarios.${i}.title`, sc.titleEn],
        [`ar.sectorVisual.${slug}.scenarios.${i}.context`, sc.contextAr],
        [`en.sectorVisual.${slug}.scenarios.${i}.context`, sc.contextEn],
        [`ar.sectorVisual.${slug}.scenarios.${i}.widget`, sc.widgetAr],
        [`en.sectorVisual.${slug}.scenarios.${i}.widget`, sc.widgetEn],
        [`ar.sectorVisual.${slug}.scenarios.${i}.placement`, sc.placementAr],
        [`en.sectorVisual.${slug}.scenarios.${i}.placement`, sc.placementEn],
      ];
      for (const [key, value] of entries) {
        rows.push({
          key,
          value,
          type: blockTypeForKey(key, value),
          page: "sectorVisual",
          section: slug.substring(0, 128),
          label: key.substring(0, 512),
        });
      }
    });
    bundle.flow.forEach((step, i) => {
      const entries: [string, string][] = [
        [`ar.sectorVisual.${slug}.flow.${i}.title`, step.titleAr],
        [`en.sectorVisual.${slug}.flow.${i}.title`, step.titleEn],
        [`ar.sectorVisual.${slug}.flow.${i}.desc`, step.descAr],
        [`en.sectorVisual.${slug}.flow.${i}.desc`, step.descEn],
      ];
      for (const [key, value] of entries) {
        rows.push({
          key,
          value,
          type: blockTypeForKey(key, value),
          page: "sectorVisual",
          section: slug.substring(0, 128),
          label: key.substring(0, 512),
        });
      }
    });
  }

  return rows;
}

const CHUNK = 250;

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const rows = buildRows();
  console.log(`Prepared ${rows.length} content block rows.`);

  if (dryRun) {
    console.log("(dry-run: no database writes)");
    return;
  }

  const { contentBlocksTable, db, pool } = await import("@workspace/db");

  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    await db
      .insert(contentBlocksTable)
      .values(chunk)
      .onConflictDoUpdate({
        target: contentBlocksTable.key,
        set: {
          value: sql`excluded.value`,
          type: sql`excluded.type`,
          page: sql`excluded.page`,
          section: sql`excluded.section`,
          label: sql`excluded.label`,
          updatedAt: sql`now()`,
        },
      });
    console.log(`Upserted ${Math.min(i + chunk.length, rows.length)} / ${rows.length}`);
  }

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
