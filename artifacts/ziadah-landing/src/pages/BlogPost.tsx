import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { t } from "@/i18n/translations";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Clock, Calendar, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import { blogPosts, categoryColors, categories } from "../data/blogPosts";
import { navigateTo } from "@/components/PageTransition";
import SEO from "../components/SEO";
import { ArticleSchema, BreadcrumbSchema } from "../components/JsonLd";
import { absolutePageUrl } from "@/seo/meta";
import { useLanguage } from "../i18n/LanguageContext";
import { useSiteContentMap, useSiteT } from "../cms/siteContent";
import { useBlogPostFields } from "@/cms/useBlogPostFields";
import CustomerProfileDemo from "../components/CustomerProfileDemo";
import { toWesternDigits } from "@/utils/westernDigits";
import { Section, Eyebrow } from "@/components/trackflow";

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
        <div
          key={`callout-${i}`}
          style={{
            margin: "28px 0",
            padding: "20px 24px",
            background: "rgba(124, 58, 237,0.06)",
            border: "1px solid rgba(124, 58, 237,0.25)",
            borderRadius: 16,
            borderInlineStart: "4px solid #7c3aed",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {calloutLines.map((cl, ci) => (
            <p
              key={ci}
              style={{
                fontSize: 15,
                color: "#18181b",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {formatInline(cl)}
            </p>
          ))}
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
        <figure
          key={`img-${i}`}
          style={{
            margin: "32px auto",
            textAlign: "center",
            maxWidth: 320,
          }}
        >
          <img
            src={resolvedSrc}
            alt={alt}
            style={{
              width: "100%",
              maxWidth: 220,
              height: "auto",
              borderRadius: 20,
              boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px #e4e4e7",
              display: "block",
              margin: "0 auto",
              border: "1px solid #e4e4e7",
            }}
          />
          {alt && (
            <figcaption
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#71717a",
                fontStyle: "italic",
              }}
            >
              {alt}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          style={{
            fontSize: "clamp(22px,3vw,28px)",
            fontWeight: 800,
            marginTop: 40,
            marginBottom: 16,
            color: "#09090b",
            letterSpacing: "-0.5px",
          }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginTop: 28,
            marginBottom: 12,
            color: "#7c3aed",
          }}
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#09090b",
            marginBottom: 8,
          }}
        >
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const listItems: ReactElement[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(
          <li
            key={i}
            style={{
              fontSize: 15,
              color: "#3f3f46",
              lineHeight: 1.8,
              marginBottom: 6,
            }}
          >
            {formatInline(lines[i].trim().slice(2))}
          </li>
        );
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          style={{
            paddingInlineEnd: 20,
            marginBottom: 16,
            listStyle: "none",
          }}
        >
          {listItems.map((item) => (
            <li
              key={item.key}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 15,
                color: "#3f3f46",
                lineHeight: 1.8,
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#7c3aed", flexShrink: 0, marginTop: 2 }}>
                ●
              </span>
              <span>
                {(item as ReactElement<{ children?: ReactNode }>).props.children}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\. /.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          style={{ paddingInlineEnd: 0, marginBottom: 16, listStyle: "none" }}
        >
          {listItems.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                fontSize: 15,
                color: "#3f3f46",
                lineHeight: 1.8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "rgba(124, 58, 237,.12)",
                  border: "1px solid rgba(124, 58, 237,.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#7c3aed",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {idx + 1}
              </span>
              <span>{formatInline(item)}</span>
            </li>
          ))}
        </ol>
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
        <div
          key={`tbl-${i}`}
          style={{ overflowX: "auto", marginBottom: 24, marginTop: 8 }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
              textAlign: "start",
            }}
          >
            <thead>
              <tr>
                {headers.map((h, hi) => (
                  <th
                    key={hi}
                    style={{
                      padding: "10px 16px",
                      background: "rgba(124, 58, 237,.12)",
                      border: "1px solid rgba(124, 58, 237,.2)",
                      fontWeight: 700,
                      color: "#7c3aed",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "10px 16px",
                        border: "1px solid #e4e4e7",
                        color: "#3f3f46",
                        background:
                          ri % 2 === 0
                            ? "#fafafa"
                            : "transparent",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith("❌") || line.startsWith("✅")) {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: 15,
            color: "#3f3f46",
            lineHeight: 1.8,
            marginBottom: 8,
          }}
        >
          {line}
        </p>
      );
    } else {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: 16,
            color: "#3f3f46",
            lineHeight: 1.85,
            marginBottom: 16,
          }}
        >
          {formatInline(line)}
        </p>
      );
    }

    i++;
  }

  return elements;
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#09090b", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogPost() {
  const t = useSiteT();
  const { lang, dir, isAr } = useLanguage();
  const tx = t[lang].blog;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);
  const fields = useBlogPostFields(post ?? blogPosts[0]);
  const cmsMap = useSiteContentMap();

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
    return (
      <PageShell
        className="blog-white-shell"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          minHeight: "100%",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-950 relative z-[2]">
          {tx.notFound}
        </h1>
        <button
          type="button"
          onClick={() => navigateTo("/blog")}
          className="relative z-[2] inline-flex items-center gap-2 text-violet-600 font-semibold hover:opacity-70 transition-opacity cursor-pointer"
        >
          {tx.backToBlog}
        </button>
      </PageShell>
    );
  }

  const arNums = (s: string) => (isAr ? toWesternDigits(s) : s);
  const getRelatedTitle = (p: typeof blogPosts[0]) => {
    const raw = isAr
      ? cmsMap[`blog.${p.slug}.title`] ?? p.title
      : cmsMap[`blog.${p.slug}.titleEn`] ?? p.titleEn ?? p.title;
    return arNums(raw);
  };
  const getRelatedReadTime = (p: typeof blogPosts[0]) => {
    const raw = isAr
      ? cmsMap[`blog.${p.slug}.readTime`] ?? p.readTime
      : cmsMap[`blog.${p.slug}.readTimeEn`] ?? p.readTimeEn ?? p.readTime;
    return arNums(raw);
  };

  const relatedPosts = blogPosts.filter((p) => post.related.includes(p.slug));
  const postCat = categories.find((c) => c.id === post.category);

  return (
    <>
    <SEO
      titleAr={cmsMap[`blog.${post.slug}.title`] ?? post.title}
      titleEn={cmsMap[`blog.${post.slug}.titleEn`] ?? post.titleEn ?? post.title}
      descriptionAr={cmsMap[`blog.${post.slug}.summary`] ?? post.summary}
      descriptionEn={cmsMap[`blog.${post.slug}.summaryEn`] ?? post.summaryEn ?? post.summary}
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
    <PageShell className="relative overflow-x-clip blog-white-shell" style={{ color: "#09090b" }}>
      <DsPageBackdrop />

      {/* HERO / COVER */}
      <section className="relative z-[2] px-4 pt-20 md:pt-28">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center overflow-hidden rounded-3xl"
            style={{
              background: post.coverGradient,
              minHeight: "clamp(220px, 52vw, 320px)",
            }}
          >
            <div className="absolute inset-0 bg-zinc-950/35" />
            <span
              className="relative z-[1]"
              style={{
                fontSize: 96,
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
              }}
            >
              {post.coverIcon}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE */}
      <Section band="white" containerClassName="max-w-3xl" className="!pt-12 !pb-20">
        <div>
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-zinc-500 pb-5">
            <button
              type="button"
              onClick={() => navigateTo("/")}
              className="text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              {tx.breadcrumbHome}
            </button>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden />
            <button
              type="button"
              onClick={() => navigateTo("/blog")}
              className="text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              {tx.breadcrumbBlog}
            </button>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden />
            <span className="font-semibold text-violet-600">
              {getCatDisplay(post.category)}
            </span>
          </nav>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5"
          >
            <div className="mb-4">
              <Eyebrow>{getCatDisplay(post.category)}</Eyebrow>
            </div>

            <h1
              className="font-extrabold text-zinc-950 leading-tight mb-4"
              style={{ fontSize: "clamp(26px,4vw,40px)", letterSpacing: "-0.5px" }}
            >
              {fields.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-[13px] text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                <span className="num-ltr">{fields.readTime}</span> {tx.readSuffix}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden />
                <span className="num-ltr">{fields.publishDate}</span>
              </span>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-zinc-200 bg-zinc-50/60 border-s-4 border-s-violet-600 p-6 mb-8"
          >
            <p className="text-base text-zinc-700 leading-relaxed m-0">
              {fields.summary}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {renderContent(fields.content)}
          </motion.div>

          {/* Back link */}
          <div className="mt-12 pt-6 border-t border-zinc-200">
            <button
              type="button"
              onClick={() => navigateTo("/blog")}
              className="inline-flex items-center gap-2 text-violet-600 font-semibold text-[15px] hover:opacity-70 transition-opacity cursor-pointer"
            >
              {tx.backToAll}
            </button>
          </div>
        </div>
      </Section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <Section band="muted" containerClassName="max-w-6xl">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-zinc-950 mb-8">
            <span className="inline-block w-1 h-6 rounded bg-violet-600" aria-hidden />
            {tx.relatedArticles}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((rel, i) => (
              <motion.a
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group block rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-zinc-300 hover:shadow-card transition-all"
                onClick={(e) => {
                  if (
                    e.defaultPrevented ||
                    e.ctrlKey ||
                    e.metaKey ||
                    e.shiftKey ||
                    e.altKey ||
                    e.button !== 0
                  ) {
                    return;
                  }
                  e.preventDefault();
                  navigateTo(`/blog/${rel.slug}`);
                }}
              >
                <article className="flex flex-col h-full">
                  <div
                    className="relative flex items-center justify-center h-36 border-b border-zinc-200"
                    style={{ background: rel.coverGradient }}
                  >
                    <span className="text-4xl drop-shadow-sm" aria-hidden>
                      {rel.coverIcon}
                    </span>
                    <span className="absolute top-3 start-3 inline-flex items-center px-2.5 py-1 rounded-full bg-violet-100 border border-violet-200 text-[11px] font-bold text-violet-700">
                      {getCatDisplay(rel.category)}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-base font-bold text-zinc-950 leading-snug mb-4 line-clamp-2 group-hover:text-zinc-700 transition-colors">
                      {getRelatedTitle(rel)}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-xs text-zinc-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" aria-hidden />
                        <span className="num-ltr">{getRelatedReadTime(rel)}</span> {tx.readSuffix}
                      </span>
                      <ArrowCTA className="w-4 h-4 text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                    </div>
                  </div>
                </article>
              </motion.a>
            ))}
          </div>
        </Section>
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
