import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { t } from "@/i18n/translations";
import { useParams } from "wouter";
import { Clock, Calendar, ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import { blogPosts, categories } from "../data/blogPosts";
import { navigateTo } from "@/components/PageTransition";
import SEO from "../components/SEO";
import { ArticleSchema, BreadcrumbSchema } from "../components/JsonLd";
import { absolutePageUrl } from "@/seo/meta";
import { useLanguage } from "../i18n/LanguageContext";
import { useBlogPostFields } from "@/hooks/useBlogPostFields";
import CustomerProfileDemo from "../components/CustomerProfileDemo";
import { toWesternDigits } from "@/utils/westernDigits";
import { HeroLede, Section as DsSection, SectionHead, CardsGrid } from "@/sections";
import { Shell, Button as MkButton } from "@/components/mk";
import { t as siteTranslations } from "@/i18n/translations";

/**
 * The post body. Every element below used to carry inline styles with fixed
 * hexes - #09090b for headings, #7c3aed for sub-heads and list bullets,
 * #3f3f46 for body, #e4e4e7 and #fafafa for table rules and zebra rows. That
 * is a document that can only exist on white, on a page whose bands each
 * stamp their own family. It emits `.article-*` classes now, which take the
 * section's own pair, and it shares them with the support article so the two
 * long-form pages read as one system.
 */
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (line === ":::interactive-demo") {
      elements.push(<CustomerProfileDemo key={`demo-${i}`} />);
      i++;
      continue;
    }

    if (line === ":::callout") {
      const calloutLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        calloutLines.push(lines[i].trim());
        i++;
      }
      i++;
      elements.push(
        <div key={`callout-${i}`} className="article-note">
          <Lightbulb className="article-note-ico" aria-hidden="true" />
          <div>
            {calloutLines.map((cl, ci) => (
              <p key={ci}>{formatInline(cl)}</p>
            ))}
          </div>
        </div>
      );
      continue;
    }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      const isAbsolute = src.startsWith("http") || src.startsWith("/");
      const resolvedSrc = isAbsolute ? src : `/${src}`;
      elements.push(
        <figure key={`img-${i}`} className="article-figure">
          <img src={resolvedSrc} alt={alt} loading="lazy" />
          {alt && <figcaption className="article-figcaption">{alt}</figcaption>}
        </figure>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="article-h2">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="article-h3">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="article-bold">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <div key={`ul-${i}`} className="article-ul">
          {items.map((item, idx) => (
            <div key={idx} className="article-ul-row">
              <span className="article-ul-dot" aria-hidden="true" />
              <p>{formatInline(item)}</p>
            </div>
          ))}
        </div>
      );
      continue;
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <div key={`ol-${i}`} className="article-ol">
          {items.map((item, idx) => (
            <div key={idx} className="article-ol-row">
              <span className="article-ol-num inline-flex">{idx + 1}</span>
              <p>{formatInline(item)}</p>
            </div>
          ))}
        </div>
      );
      continue;
    } else if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const headers = tableLines[0]
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      const rows = tableLines
        .slice(2)
        .map((row) =>
          row
            .split("|")
            .filter((c) => c.trim())
            .map((c) => c.trim())
        );
      elements.push(
        <div key={`tbl-${i}`} className="article-table-wrap">
          <table className="article-table">
            <thead>
              <tr>
                {headers.map((h, hi) => (
                  <th key={hi}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else {
      elements.push(<p key={i} className="article-p">{formatInline(line)}</p>);
    }

    i++;
  }

  return elements;
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function BlogPost() {
  const t = siteTranslations;
  const { lang, dir, isAr } = useLanguage();
  const tx = t[lang].blog;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const BackArrow = isAr ? ArrowRight : ArrowLeft;
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);
  const fields = useBlogPostFields(post ?? blogPosts[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [params.slug]);

  const getCatDisplay = (catId: string) => {
    const catObj = categories.find(c => c.id === catId);
    return catObj ? (isAr ? catObj.label : catObj.labelEn) : catId;
  };

  if (!post) {
    /* A band like any other, not a bare white shell with a violet text link. */
    return (
      <div className="page" dir={dir}>
        <DsSection family="grey" className="min-h-[70vh] flex items-center">
          <Shell width="narrow">
            <div className="text-center">
              <h1 className="section-head-title--sm mb-8">{tx.notFound}</h1>
              <MkButton onClick={() => navigateTo("/blog")}>{tx.backToBlog}</MkButton>
            </div>
          </Shell>
        </DsSection>
      </div>
    );
  }

  const arNums = (s: string) => (isAr ? toWesternDigits(s) : s);
  const getRelatedTitle = (p: typeof blogPosts[0]) => {
    const raw = isAr
      ? p.title
      : p.titleEn ?? p.title;
    return arNums(raw);
  };
  const getRelatedReadTime = (p: typeof blogPosts[0]) => {
    const raw = isAr
      ? p.readTime
      : p.readTimeEn ?? p.readTime;
    return arNums(raw);
  };

  const relatedPosts = blogPosts.filter((p) => post.related.includes(p.slug));
  const postCat = categories.find((c) => c.id === post.category);

  return (
    <>
    <SEO
      titleAr={post.title}
      titleEn={post.titleEn ?? post.title}
      descriptionAr={post.summary}
      descriptionEn={post.summaryEn ?? post.summary}
      canonical={`/blog/${post.slug}`}
      type="article"
      publishDate={post.publishDateIso}
      keywordsAr={`زيادة، مدونة، ذكاء اصطناعي، تجارة إلكترونية، اقتراح منتجات، تسويق منتجات، ${postCat?.label ?? ""}`}
      keywordsEn={`Ziadah, blog, AI ecommerce, online store, product recommendations, ecommerce marketing, ${postCat?.labelEn ?? post.category}`}
    />
    <ArticleSchema
      title={fields.title}
      description={fields.summary}
      publishDate={post.publishDateIso}
      slug={post.slug}
      articleSection={postCat ? (isAr ? postCat.label : postCat.labelEn) : undefined}
      schemaKeywords={[
        "Ziadah",
        "زيادة",
        postCat?.label,
        postCat?.labelEn,
        "product recommendations",
        "اقتراح منتجات",
        "ecommerce marketing",
        "تسويق المنتجات",
      ]
        .filter(Boolean)
        .join(", ")}
      pageUrl={absolutePageUrl(`/blog/${post.slug}`, lang)}
    />
    <BreadcrumbSchema items={[
      { name: tx.breadcrumbHome, url: "/" },
      { name: tx.breadcrumbBlog, url: "/blog" },
      { name: fields.title, url: `/blog/${post.slug}` }
    ]} />
    {/* No white shell and no fixed ink: each band stamps its own family. */}
    <PageShell className="relative overflow-x-clip">

      {/* ══════════════════ HERO ══════════════════
          The cover used to be a 96px emoji on a gradient behind a black
          scrim. An emoji standing in for a photograph is the loudest tell
          that nobody made this page on purpose, and it carried no information
          the headline does not. What replaces it is the same dark lede the
          support article and the success story open with: category, read
          time, date, headline, standfirst, and the way back. */}
      <HeroLede
        compact
        center={false}
        family="violet"
        invert
        eyebrow={
          <span className="inline-flex items-center gap-2 flex-wrap">
            {getCatDisplay(post.category)}
            <span aria-hidden="true">·</span>
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {fields.readTime} {tx.readSuffix}
            <span aria-hidden="true">·</span>
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            {fields.publishDate}
          </span>
        }
        title={fields.title}
        actions={
          <MkButton variant="tertiary" onClick={() => navigateTo("/blog")}>
            <BackArrow className="w-4 h-4" aria-hidden="true" />
            <span className="ms-2">{tx.backToBlog}</span>
          </MkButton>
        }
      />

      {/* ══════════════════ ARTICLE ══════════════════ */}
      <DsSection family="grey">
        <Shell width="narrow">
          <article dir={dir} className="measure-read article-prose">
            <p className="article-lede">{fields.summary}</p>
            {renderContent(fields.content)}
            <div className="article-foot">
              <MkButton variant="tertiary" onClick={() => navigateTo("/blog")}>
                <BackArrow className="w-4 h-4" aria-hidden="true" />
                <span className="ms-2">{tx.backToAll}</span>
              </MkButton>
            </div>
          </article>
        </Shell>
      </DsSection>

      {/* ══════════════════ RELATED ══════════════════
          Cards, not gradient tiles with an emoji on each one. The category is
          the eyebrow and the read time is the foot, which is what a reader
          picking the next post actually chooses on. */}
      {relatedPosts.length > 0 && (
        <DsSection family="violet">
          <Shell>
            <SectionHead center title={tx.relatedArticles} />
            <CardsGrid
              compact
              cards={relatedPosts.map((rel) => ({
                key: rel.slug,
                eyebrow: getCatDisplay(rel.category),
                title: getRelatedTitle(rel),
                foot: (
                  <span className="card-cta">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {getRelatedReadTime(rel)} {tx.readSuffix}
                  </span>
                ),
                onClick: () => navigateTo(`/blog/${rel.slug}`),
              }))}
            />
          </Shell>
        </DsSection>
      )}
      <PageClosingCta
        title={pc.blogPostTitle}
        description={pc.blogPostDesc}
        buttonLabel={ld.ctaBtn}
        onActivate={() => setPlatformModalOpen(true)}
      />
    </PageShell>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
