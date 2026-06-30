import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { t } from "@/i18n/translations";
import { useParams } from "wouter";
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
            background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(234,88,12,0.06) 100%)",
            border: "1px solid rgba(249,115,22,0.35)",
            borderRadius: 16,
            borderInlineStart: "4px solid #f97316",
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
                color: "var(--t)",
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
              boxShadow: "0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px var(--b1)",
              display: "block",
              margin: "0 auto",
              border: "1px solid var(--b1)",
            }}
          />
          {alt && (
            <figcaption
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "var(--td)",
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
            color: "var(--t)",
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
            color: "#c084fc",
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
            color: "var(--t)",
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
              color: "var(--tm)",
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
                color: "var(--tm)",
                lineHeight: 1.8,
                marginBottom: 6,
              }}
            >
              <span style={{ color: "#a855f7", flexShrink: 0, marginTop: 2 }}>
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
                color: "var(--tm)",
                lineHeight: 1.8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "rgba(124, 58, 237,.15)",
                  border: "1px solid rgba(124, 58, 237,.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#a855f7",
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
                      color: "#c084fc",
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
                        border: "1px solid var(--b1)",
                        color: "var(--tm)",
                        background:
                          ri % 2 === 0
                            ? "var(--s1)"
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
            color: "var(--tm)",
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
            color: "var(--tm)",
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
        <strong key={i} style={{ color: "var(--t)", fontWeight: 700 }}>
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
        
        <h1 style={{ fontSize: 32, fontWeight: 900, position: "relative", zIndex: 2 }}>
          {tx.notFound}
        </h1>
        <span
          onClick={() => navigateTo("/blog")}
          style={{
            color: "#a855f7",
            textDecoration: "none",
            position: "relative",
            zIndex: 2,
            cursor: "pointer",
          }}
        >
          {tx.backToBlog}
        </span>
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
    <PageShell className="relative overflow-x-clip blog-white-shell" style={{ color: "var(--t)" }}>
      <DsPageBackdrop />

      {/* HERO / COVER */}
      <section
        style={{
          paddingTop: "var(--page-article-pt)",
          paddingInline: "var(--page-inline-pad)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: post.coverGradient,
            minHeight: "clamp(220px, 52vw, 320px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            borderRadius: "clamp(16px, 4vw, 40px)",
            border: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 40,
              background:
                "linear-gradient(135deg, rgba(52, 1, 193, 0.5) 0%, rgba(136, 93, 254, 0.3) 100%)",
            }}
          />
          <span
            style={{
              fontSize: 96,
              position: "relative",
              zIndex: 1,
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
            }}
          >
            {post.coverIcon}
          </span>
        </div>
      </section>

      {/* ARTICLE */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 5% 80px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--td)",
              padding: "24px 0 20px",
            }}
          >
            <span
              onClick={() => navigateTo("/")}
              style={{ color: "var(--td)", textDecoration: "none", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--t)")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--td)")
              }
            >
              {tx.breadcrumbHome}
            </span>
            <span>›</span>
            <span
              onClick={() => navigateTo("/blog")}
              style={{ color: "var(--td)", textDecoration: "none", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--t)")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--td)")
              }
            >
              {tx.breadcrumbBlog}
            </span>
            <span>›</span>
            <span
              style={{
                color: categoryColors[post.category],
                cursor: "pointer",
              }}
            >
              {getCatDisplay(post.category)}
            </span>
          </nav>

          {/* Meta */}
          <div className="rv" style={{ marginBottom: 20 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 50,
                background: `${categoryColors[post.category]}22`,
                border: `1px solid ${categoryColors[post.category]}55`,
                color: categoryColors[post.category],
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {getCatDisplay(post.category)}
            </span>

            <h1
              style={{
                fontSize: "clamp(26px,4vw,40px)",
                fontWeight: 900,
                lineHeight: 1.25,
                marginBottom: 16,
                letterSpacing: "-0.5px",
              }}
            >
              {fields.title}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontSize: 13,
                color: "var(--td)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7 4v3l2 1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {fields.readTime} {tx.readSuffix}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="2"
                    y="3"
                    width="10"
                    height="9"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5 1v2M9 1v2M2 6h10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {fields.publishDate}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div
            className="gc rv d1"
            style={{
              padding: "20px 24px",
              marginBottom: 32,
              borderRight: isAr ? `3px solid ${categoryColors[post.category]}` : undefined,
              borderLeft: isAr ? undefined : `3px solid ${categoryColors[post.category]}`,
              borderRadius: 14,
            }}
          >
            <p
              style={{
                fontSize: 16,
                color: "var(--tm)",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {fields.summary}
            </p>
          </div>

          {/* Content */}
          <div className="rv d2">{renderContent(fields.content)}</div>

          {/* Back link */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--b1)" }}>
            <span
              onClick={() => navigateTo("/blog")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#a855f7",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                transition: "opacity .2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {tx.backToAll}
            </span>
          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 5% 100px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2
              className="rv"
              style={{
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 24,
                  background: "var(--p)",
                  borderRadius: 2,
                  display: "inline-block",
                }}
              />
              {tx.relatedArticles}
            </h2>
            <div className="blog-cards-grid">
              {relatedPosts.map((rel, i) => (
                <a
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="blog-card-link"
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
                  <article
                    className="blog-card blog-card--compact gc gc-lift rv"
                    style={{
                      animationDelay: `${i * 0.07}s`,
                    }}
                  >
                    <div className="shine" aria-hidden />
                    <div
                      className="blog-card__media"
                      style={{ background: rel.coverGradient }}
                    >
                      <div className="blog-cover-overlay" aria-hidden />
                      <span className="blog-card__icon-wrap">
                        {rel.coverIcon}
                      </span>
                      <div
                        className="blog-card__badge"
                        style={{
                          background: `${categoryColors[rel.category]}28`,
                          border: `1px solid ${categoryColors[rel.category]}66`,
                          color: categoryColors[rel.category],
                        }}
                      >
                        {getCatDisplay(rel.category)}
                      </div>
                    </div>
                    <div className="blog-card__body">
                      <h3 className="blog-card__title">
                        {getRelatedTitle(rel)}
                      </h3>
                      <div className="blog-card__footer">
                        <div className="blog-card__meta-chip">
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden
                          >
                            <circle
                              cx="6"
                              cy="6"
                              r="5"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                            <path
                              d="M6 3v3l2 1.5"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                          </svg>
                          {getRelatedReadTime(rel)} {tx.readSuffix}
                        </div>
                        <span className="blog-card__go" aria-hidden>
                          <svg
                            className="blog-card__go-svg"
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6 12l4-4-4-4"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>
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
