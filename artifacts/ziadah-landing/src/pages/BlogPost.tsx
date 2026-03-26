import { useEffect } from "react";
import { useParams } from "wouter";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import { blogPosts, categoryColors, categories } from "../data/blogPosts";
import { navigateTo } from "@/components/PageTransition";
import SEO from "../components/SEO";
import { ArticleSchema, BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { t } from "../i18n/translations";
import CustomerProfileDemo from "../components/CustomerProfileDemo";
import { toWesternDigits } from "@/utils/westernDigits";

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: JSX.Element[] = [];
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
      const listItems: JSX.Element[] = [];
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
              <span>{item.props.children}</span>
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
                  background: "rgba(124,58,237,.15)",
                  border: "1px solid rgba(124,58,237,.25)",
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
                      background: "rgba(124,58,237,.12)",
                      border: "1px solid rgba(124,58,237,.2)",
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
  const { lang, dir, isAr } = useLanguage();
  const tx = t[lang].blog;
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);

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
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          fontFamily: "var(--font)",
          direction: dir,
          color: "var(--t)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div className="bg-wrap">
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="bg-grid" />
        </div>
        <div className="noise" />
        <Nav />
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
      </div>
    );
  }

  const arNums = (s: string) => (isAr ? toWesternDigits(s) : s);
  const getTitle = (p: typeof blogPosts[0]) => arNums(isAr ? p.title : (p.titleEn || p.title));
  const getSummary = (p: typeof blogPosts[0]) => arNums(isAr ? p.summary : (p.summaryEn || p.summary));
  const getReadTime = (p: typeof blogPosts[0]) => arNums(isAr ? p.readTime : (p.readTimeEn || p.readTime));
  const getPublishDate = (p: typeof blogPosts[0]) => arNums(isAr ? p.publishDate : (p.publishDateEn || p.publishDate));
  const getContent = (p: typeof blogPosts[0]) => arNums(isAr ? p.content : (p.contentEn || p.content));

  const relatedPosts = blogPosts.filter((p) => post.related.includes(p.slug));

  return (
    <>
    <SEO
      title={getTitle(post)}
      description={getSummary(post)}
      canonical={`/blog/${post.slug}`}
      type="article"
      publishDate={post.publishDateIso}
    />
    <ArticleSchema
      title={getTitle(post)}
      description={getSummary(post)}
      publishDate={post.publishDateIso}
      slug={post.slug}
    />
    <BreadcrumbSchema items={[
      { name: tx.breadcrumbHome, url: "/" },
      { name: tx.breadcrumbBlog, url: "/blog" },
      { name: getTitle(post), url: `/blog/${post.slug}` }
    ]} />
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        fontFamily: "var(--font)",
        direction: dir,
        color: "var(--t)",
      }}
    >
      <div className="bg-wrap">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="orb o3" />
        <div className="bg-grid" />
      </div>
      <div className="noise" />
      <ParticleBackground />
      <Nav />

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
              {getTitle(post)}
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
                {getReadTime(post)} {tx.readSuffix}
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
                {getPublishDate(post)}
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
              {getSummary(post)}
            </p>
          </div>

          {/* Content */}
          <div className="rv d2">{renderContent(getContent(post))}</div>

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
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {relatedPosts.map((rel, i) => (
                <div
                  key={rel.slug}
                  onClick={() => navigateTo(`/blog/${rel.slug}`)}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <article
                    className="gc gc-lift rv"
                    style={{
                      animationDelay: `${i * 0.07}s`,
                      cursor: "pointer",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="shine" />
                    <div
                      style={{
                        background: rel.coverGradient,
                        height: 130,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 44,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to bottom, transparent 30%, rgba(3,3,11,0.8) 100%)",
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1 }}>
                        {rel.coverIcon}
                      </span>
                    </div>
                    <div style={{ padding: "16px 20px 20px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: categoryColors[rel.category],
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {getCatDisplay(rel.category)}
                      </span>
                      <h3
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          lineHeight: 1.45,
                          color: "var(--t)",
                          marginBottom: 8,
                        }}
                      >
                        {getTitle(rel)}
                      </h3>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--td)",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 12 12"
                          fill="none"
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
                        {getReadTime(rel)} {tx.readSuffix}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  );
}
