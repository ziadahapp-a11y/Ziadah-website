import { useEffect, useState } from "react";
import {
  Search,
  X,
  ChevronRight,
  Clock,
  Mail,
  Lightbulb,
  MessageCircle,
  ExternalLink,
  Play,
} from "lucide-react";
import PageShell from "../components/PageShell";
import { categories, videoLibrary, searchArticles } from "../data/support-data";
import { navigateTo } from "@/components/PageTransition";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import FeatureRequestModal from "../components/FeatureRequestModal";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import { Section, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import { HeroLede } from "@/sections";
import { t as siteTranslations } from "@/i18n/translations";
import { supportCategoryIcon } from "@/lib/support-icons";

export default function Support() {
  const { lang, isAr } = useLanguage();
  const t = siteTranslations;
  const tx = t[lang].support;
  const navTr = t[lang].nav;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const pk = getPageKeywords("/support");
  const [activeCategory, setActiveCategory] = useState("start");
  const [search, setSearch] = useState("");
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

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

  const quickLinks: { label: string; href: string; icon: string; desc: string; ext: true }[] = [
    { label: tx.quickTalkSupport, href: "https://api.whatsapp.com/send/?phone=966510131856", icon: "💬", desc: tx.quickTalkSupportDesc, ext: true },
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

      {/* ─── HERO ─── */}
      <HeroLede
        compact
        family="grey"
        eyebrow={tx.tag}
        title={tx.heroTitle}
        body={tx.heroSub}
      >
        {/* The search is the help centre's front door, so it sits in the hero
            rather than in a band under it, and its results open in place. */}
        <div className="hero-search">
          <input
            type="search"
            autoComplete="off"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={tx.searchPlaceholder}
            className={`hero-search-input${search.trim() ? " is-clearable" : ""}`}
          />
          <Search className="hero-search-ico" aria-hidden="true" />
          {!!search && (
            <button
              type="button"
              aria-label={isAr ? "مسح البحث" : "Clear search"}
              onClick={() => setSearch("")}
              className="hero-search-clear"
            >
              <X aria-hidden="true" />
            </button>
          )}
        </div>

        {search.trim() && (
          <div className="hero-search-results">
            {searchResults.length > 0 ? (
              <>
                <div className="hero-search-count">
                  <span className="num-ltr">{searchResults.length}</span> {tx.resultCount}
                </div>
                {searchResults.map((a, i) => (
                  <a
                    key={i}
                    href={`/support/article/${a.id}`}
                    className="hero-search-hit"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/support/article/${a.id}`);
                      setSearch("");
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="hero-search-hit-title">{getArticleTitle(a)}</div>
                      <div className="hero-search-hit-meta">
                        {a.categoryLabel} · {getArticleTime(a)} {tx.readSuffix}
                      </div>
                    </div>
                    <ChevronRight className={`hero-search-hit-ico${isAr ? " rotate-180" : ""}`} aria-hidden="true" />
                  </a>
                ))}
              </>
            ) : (
              <div className="hero-search-empty">
                {tx.noResults} «{search}»
              </div>
            )}
          </div>
        )}
      </HeroLede>

      {/* ─── QUICK LINKS ─── */}
      <Section family="violet">
        <SectionHead center kicker={tx.tag} title={tx.contactSupport} />
        <Shell width="wide">
        <div className="cards-grid">
          <a
            href="mailto:support@ziadah.app"
            className="rv card card--short card--clickable flex-row items-center gap-4"
          >
            <span className="card-ico">
              <Mail className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block t-sm-med">{navTr.email}</span>
              <span className="card-body-text">{navTr.emailSub}</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => setFeatureModalOpen(true)}
            className="rv card card--short card--clickable flex-row items-center gap-4"
          >
            <span className="card-ico">
              <Lightbulb className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block t-sm-med">{navTr.featureRequest}</span>
              <span className="card-body-text">{navTr.featureRequestSub}</span>
            </span>
          </button>
          {quickLinks.map(l => {
            const Icon = l.icon === "💬" ? MessageCircle : ExternalLink;
            const inner = (
              <>
                <span className="card-ico">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block t-sm-med">{l.label}</span>
                  <span className="card-body-text">{l.desc}</span>
                </span>
              </>
            );
            return (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rv card card--short card--clickable flex-row items-center gap-4"
              >
                {inner}
              </a>
            );
          })}
        </div>
        </Shell>
      </Section>

      {/* ─── CATEGORIES + ARTICLES ─── */}
      <Section family="grey">
        <Shell width="wide">
        {/* mobile category pills */}
        <div className="rv flex gap-2 overflow-x-auto pb-2 mb-8 lg:hidden">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className="chip shrink-0 gap-2"
              aria-pressed={activeCategory === c.id}
            >
              {(() => { const I = supportCategoryIcon(c.icon); return <I className="w-4 h-4" aria-hidden="true" />; })()}
              {getCatLabel(c)}
              <span className="chip-count num-ltr">{c.articles.length}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="rv card card--short !p-3 sticky top-24">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className="cat-link"
                  aria-pressed={activeCategory === c.id}
                >
                  {(() => { const I = supportCategoryIcon(c.icon); return <I className="w-4 h-4 shrink-0" aria-hidden="true" />; })()}
                  <span className="flex-1 t-sm-med">{getCatLabel(c)}</span>
                  <span className="card-eyebrow num-ltr">{c.articles.length}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* articles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl" aria-hidden>{activeCat.icon}</span>
              <h2 className="t-head-1">{getCatLabel(activeCat)}</h2>
              <span className="pill pill--soon num-ltr">
                {activeCat.articles.length} {tx.articleCount}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {activeCat.articles.map((a, i) => (
                <a
                  key={a.id}
                  href={`/support/article/${a.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/support/article/${a.id}`);
                  }}
                  className="card card--short card--clickable"
                >
                  <span
                    className="card-ico !w-9 !h-9 !rounded-lg text-sm font-bold num-ltr"
                    /* The numeral is the category's own hue, which at full
                       strength measures 4.23:1 on the card - under AA. Mixed
                       78% with black it keeps the hue and clears 4.5:1 on both
                       the white card and its own 13% tile. */
                    style={{
                      background: `${activeCat.color}22`,
                      color: `color-mix(in srgb, ${activeCat.color} 78%, #000)`,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block t-sm-med mb-1.5">{getArticleTitle(a)}</span>
                    <span className="card-body-text">{getArticleDesc(a)}</span>
                  </span>
                  <span className="card-eyebrow card-foot justify-start gap-1.5">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {getArticleTime(a)} {tx.readSuffix}
                    <ChevronRight className={`card-arrow w-4 h-4 ms-auto opacity-50 ${isAr ? "rotate-180" : ""}`} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        </Shell>
      </Section>

      {/* ─── VIDEO LIBRARY ─── */}
      <Section family="violet">
        <Shell width="wide">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-12">
          <div>
            <p className="t-eyebrow mb-3">{tx.videoTag}</p>
            <h2 className="section-head-title--md mb-2">{tx.videoTitle}</h2>
            <p className="section-lead">{tx.videoSub}</p>
          </div>
          <span className="pill pill--soon">{tx.videoComingSoon}</span>
        </div>

        <div className="cards-grid">
          {videoLibrary.map((v) => {
            const vEn = videoTitlesEn[v.id];
            const vTitle = isAr ? v.title : (vEn?.title || v.title);
            const vDesc = isAr ? v.description : (vEn?.description || v.description);
            const vCat = isAr ? v.category : (vEn?.category || v.category);
            return (
              <div key={v.id} className="card card--short !p-0 overflow-hidden">
                {/* The thumbnail stays a dark plate: it stands in for a video
                    still, which is a picture and not a card. */}
                <div className="relative aspect-video mockup-card flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                  <div className="relative w-14 h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <span className="absolute bottom-2.5 start-2.5 rounded-md bg-black/60 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-white num-ltr">
                    {v.duration}
                  </span>
                  {/* White on the brand violet, not near-black: `#7c3aed` at 90%
                      over a dark still gave 3.92:1 behind 10px type. White on
                      the same ground is 5.6:1. */}
                  <span className="absolute top-2.5 end-2.5 rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: "var(--ziadah-violet)", color: "var(--general-white)" }}>
                    {vCat}
                  </span>
                  <span className="absolute top-2.5 start-2.5 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white">
                    {tx.videoSoonLabel}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-1.5">
                  <div className="t-sm-med">{vTitle}</div>
                  <div className="card-body-text">{vDesc}</div>
                </div>
              </div>
            );
          })}
        </div>
        </Shell>
      </Section>

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
