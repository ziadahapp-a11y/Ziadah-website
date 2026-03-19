import { useState, useEffect } from "react";
import { Link } from "wouter";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import { blogPosts, categories, categoryColors } from "../data/blogPosts";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

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
  }, []);

  const filtered = blogPosts.filter((post) => {
    const matchCat =
      activeCategory === "all" || post.category === activeCategory;
    const matchSearch =
      !search.trim() ||
      post.title.includes(search) ||
      post.summary.includes(search) ||
      post.category.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        fontFamily: "var(--font)",
        direction: "rtl",
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

      {/* HERO */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 56,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div className="stag rv" style={{ display: "inline-flex" }}>
          <span className="stag-dot" />
          مدونة زيادة
        </div>
        <h1
          className="rv d1"
          style={{
            fontSize: "clamp(38px,5vw,64px)",
            fontWeight: 900,
            marginTop: 8,
            marginBottom: 16,
            letterSpacing: "-1.5px",
          }}
        >
          مركز المعرفة
        </h1>
        <p
          className="ssub rv d2"
          style={{ margin: "0 auto 36px", maxWidth: 560 }}
        >
          مقالات تعليمية احترافية حول التجارة الإلكترونية، الذكاء الاصطناعي،
          واستراتيجيات النمو لمتجرك
        </p>

        {/* Search */}
        <div
          className="rv d3"
          style={{ maxWidth: 540, margin: "0 auto", position: "relative" }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في المقالات..."
            style={{
              width: "100%",
              padding: "15px 50px 15px 20px",
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 50,
              color: "#fff",
              fontFamily: "var(--font)",
              fontSize: 15,
              outline: "none",
              backdropFilter: "blur(20px)",
              transition: "border .25s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(168,85,247,.5)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,.12)")
            }
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{
              position: "absolute",
              left: 18,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <circle
              cx="8"
              cy="8"
              r="5.5"
              stroke="rgba(255,255,255,.3)"
              strokeWidth="1.4"
            />
            <line
              x1="12"
              y1="12"
              x2="16"
              y2="16"
              stroke="rgba(255,255,255,.3)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 5% 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 50,
                  border:
                    activeCategory === cat.id
                      ? "1px solid rgba(168,85,247,.5)"
                      : "1px solid var(--b1)",
                  background:
                    activeCategory === cat.id
                      ? "rgba(124,58,237,.15)"
                      : "var(--s1)",
                  color: activeCategory === cat.id ? "#c084fc" : "var(--tm)",
                  fontFamily: "var(--font)",
                  fontSize: 14,
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  cursor: "pointer",
                  transition: "all .2s",
                  backdropFilter: "blur(16px)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 5% 100px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--td)",
                fontSize: 16,
              }}
            >
              لم يتم العثور على مقالات مطابقة. جرّب بحثاً مختلفاً.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 24,
              }}
            >
              {filtered.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    className="gc gc-lift rv"
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      cursor: "pointer",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div className="shine" />
                    {/* Cover */}
                    <div
                      style={{
                        background: post.coverGradient,
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 64,
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to bottom, transparent 40%, rgba(3,3,11,0.9) 100%)",
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1 }}>
                        {post.coverIcon}
                      </span>
                      {/* Category badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          zIndex: 2,
                          padding: "4px 12px",
                          borderRadius: 50,
                          background: `${categoryColors[post.category]}22`,
                          border: `1px solid ${categoryColors[post.category]}55`,
                          color: categoryColors[post.category],
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 0.5,
                        }}
                      >
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        padding: "20px 24px 24px",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <h2
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          lineHeight: 1.4,
                          marginBottom: 10,
                          color: "#fff",
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--tm)",
                          lineHeight: 1.7,
                          marginBottom: 16,
                          flex: 1,
                        }}
                      >
                        {post.summary}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: 14,
                          borderTop: "1px solid var(--b1)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            color: "var(--td)",
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
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
                          {post.readTime} قراءة
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "var(--td)",
                          }}
                        >
                          {post.publishDate}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "32px 5%",
          borderTop: "1px solid var(--b1)",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "var(--td)" }}>
          © ٢٠٢٥ Ziadah. جميع الحقوق محفوظة.
        </p>
      </footer>
    </div>
  );
}
