import { useEffect, useState, type CSSProperties } from "react";
import PageShell from "../components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import { categories, videoLibrary, searchArticles } from "../data/support-data";
import { navigateTo } from "@/components/PageTransition";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { useSiteT } from "../cms/siteContent";
import FeatureRequestModal from "../components/FeatureRequestModal";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import { useMeetingBooking } from "@/components/MeetingBookingProvider";

export default function Support() {
  const { lang, isAr } = useLanguage();
  const t = useSiteT();
  const tx = t[lang].support;
  const navTr = t[lang].nav;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const pk = getPageKeywords("/support");
  const [activeCategory, setActiveCategory] = useState("start");
  const [search, setSearch] = useState("");
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const { openMeetingBooking } = useMeetingBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }); },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeCat = categories.find(c => c.id === activeCategory)!;
  const searchResults = searchArticles(search);

  const getCatLabel = (cat: typeof categories[number]) => isAr ? cat.label : (cat.labelEn || cat.label);
  const getArticleTitle = (a: { title: string; titleEn?: string }) => isAr ? a.title : (a.titleEn || a.title);
  const getArticleDesc = (a: { desc: string; descEn?: string }) => isAr ? a.desc : (a.descEn || a.desc);
  const getArticleTime = (a: { time: string; timeEn?: string }) => isAr ? a.time : (a.timeEn || a.time);

  const quickLinks: (
    | { label: string; href: string; icon: string; desc: string; ext: true }
    | { label: string; icon: string; desc: string; meeting: true }
  )[] = [
    { label: tx.quickTalkSupport, href: "https://api.whatsapp.com/send/?phone=966510131856", icon: "💬", desc: tx.quickTalkSupportDesc, ext: true },
    { label: tx.quickBookMeeting, icon: "📅", desc: tx.quickBookMeetingDesc, meeting: true },
    { label: tx.quickZidDash, href: "https://web.ziadah.app/", icon: "🔗", desc: tx.quickZidDashDesc, ext: true },
    { label: tx.quickSallaDash, href: "https://dashboard.ziadah.app/", icon: "🔗", desc: tx.quickSallaDashDesc, ext: true },
  ];

  const videoTitlesEn: Record<string, { title: string; description: string; category: string }> = {
    v1: { title: "Introduction to Ziadah — Overview", description: "Learn about Ziadah and how it helps your store boost sales with AI", category: "Getting Started" },
    v2: { title: "Setting Up Your First Campaign Step by Step", description: "Detailed video for creating your first campaign from scratch to publishing", category: "Getting Started" },
    v3: { title: "Understanding the Analytics Dashboard", description: "How to read dashboard numbers and extract smart decisions", category: "Analytics" },
    v4: { title: "Upsell Strategies for Beginners", description: "Best Upsell and Cross-sell strategies to increase average cart value", category: "Strategies" },
    v5: { title: "Ziadah Integration with Zid Platform", description: "Complete visual guide to connecting Ziadah with your Zid store", category: "Technical" },
    v6: { title: "Success Stories from Saudi Merchants", description: "Real experiences from merchants who achieved amazing results with Ziadah", category: "Success Stories" },
  };

  return (
    <>
    <SEO
      titleAr={t.ar.support.seoTitle}
      titleEn={t.en.support.seoTitle}
      descriptionAr={t.ar.support.seoDesc}
      descriptionEn={t.en.support.seoDesc}
      canonical="/support"
      keywordsAr={pk?.keywordsAr}
      keywordsEn={pk?.keywordsEn}
    />
    <BreadcrumbSchema items={[{ name: tx.breadcrumbHome, url: "/" }, { name: tx.breadcrumbSupport, url: "/support" }]} />
    <PageShell className="relative overflow-x-clip support-page">
      <DsPageBackdrop />

      {/* ─── HERO ─── */}
      <section
        className="page-hero-viewport page-hero-viewport--center support-page-hero"
        style={{ position: "relative", zIndex: 2, overflow: "hidden" }}
      >
        <div className="support-page-hero-inner">
        <div className="stag rv">
          <span className="stag-dot" />
          {tx.tag}
        </div>
        <h1
          className="rv d1 support-page-hero-title"
          style={{
            fontSize: "clamp(22px,5.5vw,68px)",
            fontWeight: 900,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginTop: 10,
            marginBottom: 16,
          }}
        >
          {tx.heroTitle}
        </h1>
        <p
          className="rv d2 support-page-hero-lead ssub"
          style={{
            fontSize: 17,
            maxWidth: 520,
            margin: "0 auto 40px",
            lineHeight: 1.8,
          }}
        >
          {tx.heroSub}
        </p>

        {/* Search */}
        <div
          className="rv d3 support-page-hero-search-wrap"
          style={{ margin: "0 auto", position: "relative" }}
        >
          <input
            type="search"
            className="support-page-hero-search"
            autoComplete="off"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={tx.searchPlaceholder}
            style={{
              width: "100%",
              paddingBlock: 16,
              paddingInlineEnd: 52,
              paddingInlineStart: search.trim() ? 48 : 22,
              borderRadius: 50,
              fontFamily: "var(--font)",
              fontSize: 15,
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="support-page-hero-search-ico"
            style={{
              position: "absolute",
              insetInlineEnd: 18,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
            <line
              x1="12"
              y1="12"
              x2="16"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          {!!search && (
            <button
              type="button"
              className="support-page-hero-search-clear"
              aria-label={isAr ? "مسح البحث" : "Clear search"}
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                insetInlineStart: 14,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {search.trim() && (
          <div className="support-page-hero-results rv">
            {searchResults.length > 0 ? (
              <>
                <div className="support-page-hero-results-kicker">
                  {searchResults.length} {tx.resultCount}
                </div>
                {searchResults.map((a, i) => (
                  <div
                    key={i}
                    role="button"
                    tabIndex={0}
                    className="support-page-hero-results-row"
                    onClick={() => {
                      navigateTo(`/support/article/${a.id}`);
                      setSearch("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigateTo(`/support/article/${a.id}`);
                        setSearch("");
                      }
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "inherit" }}>
                      <div className="support-page-hero-results-title">{getArticleTitle(a)}</div>
                      <div className="support-page-hero-results-meta">
                        {a.categoryLabel} · {getArticleTime(a)} {tx.readSuffix}
                      </div>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: 4, transform: isAr ? "rotate(180deg)" : "none" }}
                    >
                      <path
                        d="M9 3L5 7l4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ))}
              </>
            ) : (
              <div className="support-page-hero-results-empty">
                {tx.noResults} «{search}»
              </div>
            )}
          </div>
        )}
        </div>
      </section>

      {/* ─── QUICK LINKS ─── */}
      <section className="support-section--contact">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 className="rv support-section-heading">{tx.contactSupport}</h2>
          <div className="rv support-cards-grid">
            <a href="mailto:support@ziadah.app" className="gc support-card-priority support-quick-card support-quick-card--primary">
              <div className="shine" />
              <span className="support-card-icon-wrap" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12l-6 5-6-5z" fill="currentColor" /></svg>
              </span>
              <div style={{ flex: 1, minWidth: 0, textAlign: "start" }}>
                <div className="support-quick-card-title">{navTr.email}</div>
                <div className="support-quick-card-desc">{navTr.emailSub}</div>
              </div>
            </a>
            <button type="button" onClick={() => setFeatureModalOpen(true)} className="gc support-card-priority support-quick-card support-quick-card--primary">
              <div className="shine" />
              <span className="support-card-icon-wrap" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v9a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zm0 2.36L15 8v8H5V8l5-3.64z" fill="currentColor" /></svg>
              </span>
              <div style={{ flex: 1, minWidth: 0, textAlign: "start" }}>
                <div className="support-quick-card-title">{navTr.featureRequest}</div>
                <div className="support-quick-card-desc">{navTr.featureRequestSub}</div>
              </div>
            </button>
            {quickLinks.map(l =>
              "meeting" in l ? (
                <button key={l.label} type="button" onClick={() => openMeetingBooking()} className="gc support-quick-card">
                  <div className="shine" />
                  <span className="support-quick-card-emoji" aria-hidden>{l.icon}</span>
                  <div style={{ flex: 1, minWidth: 0, textAlign: "start" }}>
                    <div className="support-quick-card-title">{l.label}</div>
                    <div className="support-quick-card-desc">{l.desc}</div>
                  </div>
                </button>
              ) : (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="gc support-quick-card">
                  <div className="shine" />
                  <span className="support-quick-card-emoji" aria-hidden>{l.icon}</span>
                  <div style={{ flex: 1, minWidth: 0, textAlign: "start" }}>
                    <div className="support-quick-card-title">{l.label}</div>
                    <div className="support-quick-card-desc">{l.desc}</div>
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES + ARTICLES ─── */}
      <section className="support-section--kb">
        <div className="support-panel">
          <div className="support-cats support-cat-scroll rv">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                data-on={activeCategory === c.id ? "true" : undefined}
                className="support-cat-pill"
                onClick={() => setActiveCategory(c.id)}
              >
                <span style={{ fontSize: 15 }} aria-hidden>{c.icon}</span>
                {getCatLabel(c)}
                <span className="support-cat-pill-count">{c.articles.length}</span>
              </button>
            ))}
          </div>

          <div className="support-layout">
            <div className="support-sidebar">
              <div className="gc support-sidebar-panel">
                <div className="shine" />
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    data-on={activeCategory === c.id ? "true" : undefined}
                    className="support-cat-sidebar-btn"
                    style={
                      {
                        "--cat": c.color,
                      } as CSSProperties
                    }
                    onClick={() => setActiveCategory(c.id)}
                  >
                    <span style={{ fontSize: 17 }} aria-hidden>{c.icon}</span>
                    <span style={{ flex: 1 }}>{getCatLabel(c)}</span>
                    <span className="support-cat-sidebar-count">{c.articles.length}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="support-articles">
              <div className="support-kb-heading">
                <span className="support-kb-heading-ico" aria-hidden>{activeCat.icon}</span>
                <h2 className="support-kb-heading-title">{getCatLabel(activeCat)}</h2>
                <span className="support-meta-pill">
                  {activeCat.articles.length} {tx.articleCount}
                </span>
              </div>

              <div
                className="support-articles-grid"
                style={{ "--support-cat-color": activeCat.color } as CSSProperties}
              >
                {activeCat.articles.map((a, i) => (
                  <div
                    key={a.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigateTo(`/support/article/${a.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigateTo(`/support/article/${a.id}`);
                      }
                    }}
                    className="gc gc-lift support-article-card"
                  >
                    <div className="shine" />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
                      <div
                        className="support-art-num"
                        style={{
                          background: `${activeCat.color}1c`,
                          borderColor: `${activeCat.color}44`,
                          color: activeCat.color,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--t)", lineHeight: 1.4, marginBottom: 6 }}>
                          {getArticleTitle(a)}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--tm)", lineHeight: 1.6 }}>{getArticleDesc(a)}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 11, color: "var(--td)" }}>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                            <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                          {getArticleTime(a)} {tx.readSuffix}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            style={{
                              marginInlineStart: "auto",
                              transform: isAr ? "rotate(180deg)" : "none",
                              opacity: 0.45,
                            }}
                            aria-hidden
                          >
                            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VIDEO LIBRARY ─── */}
      <section className="support-section--video">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rv" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 220px", minWidth: 0 }}>
              <div className="stag" style={{ marginBottom: 12 }}>
                <span className="stag-dot" />
                {tx.videoTag}
              </div>
              <h2 className="st font-semibold" style={{ marginBottom: 4 }}>
                {tx.videoTitle}
              </h2>
              <p className="support-section--video-intro">{tx.videoSub}</p>
            </div>
            <div className="support-video-coming-pill">{tx.videoComingSoon}</div>
          </div>

          <div className="rv d1 support-videos-grid">
            {videoLibrary.map((v) => {
              const vEn = videoTitlesEn[v.id];
              const vTitle = isAr ? v.title : (vEn?.title || v.title);
              const vDesc = isAr ? v.description : (vEn?.description || v.description);
              const vCat = isAr ? v.category : (vEn?.category || v.category);
              return (
                <div key={v.id} className="gc support-video-card">
                  <div className="shine" />
                  <div className="support-video-thumb">
                    <div className="support-video-thumb-inner">
                      <div className="support-video-thumb-grid" aria-hidden />
                      <div className="support-video-thumb-play">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="M7 5l10 5-10 5V5z" />
                        </svg>
                      </div>
                      <div className="support-video-thumb-soon">{tx.videoSoonLabel}</div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 10,
                        insetInlineStart: 10,
                        background: "rgba(0,0,0,.62)",
                        backdropFilter: "blur(8px)",
                        padding: "4px 10px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {v.duration}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        insetInlineEnd: 10,
                        background: "rgba(124,58,237,.22)",
                        border: "1px solid rgba(168,85,247,.4)",
                        backdropFilter: "blur(8px)",
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#4c1d95",
                      }}
                    >
                      {vCat}
                    </div>
                  </div>
                  <div style={{ padding: "var(--card-pad-sm)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#3d2a6b", lineHeight: 1.4, marginBottom: 6 }}>{vTitle}</div>
                    <div style={{ fontSize: 13, color: "rgba(76,29,149,.58)", lineHeight: 1.65 }}>{vDesc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ACTIVATION CTA (same shell as home) ─── */}
      <PageClosingCta
        title={pc.supportTitle}
        description={pc.supportDesc}
        buttonLabel={ld.ctaBtn}
        onActivate={() => setPlatformModalOpen(true)}
      />
      {featureModalOpen && <FeatureRequestModal onClose={() => setFeatureModalOpen(false)} />}
    </PageShell>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
