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
import { Section, SectionHeading, Eyebrow } from "@/components/trackflow";
import { HeroLede } from "@/sections";
import { t as siteTranslations } from "@/i18n/translations";

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
    <PageShell className="relative overflow-x-clip bg-white support-page" style={{ background: "#fff" }}>

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
      <Section band="white">
        <SectionHeading eyebrow={tx.tag} title={tx.contactSupport} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="mailto:support@ziadah.app"
            className="rv flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-card transition-all text-start"
          >
            <span className="w-11 h-11 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-zinc-950">{navTr.email}</div>
              <div className="text-sm text-zinc-600 mt-0.5">{navTr.emailSub}</div>
            </div>
          </a>
          <button
            type="button"
            onClick={() => setFeatureModalOpen(true)}
            className="rv flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-card transition-all text-start"
          >
            <span className="w-11 h-11 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-zinc-950">{navTr.featureRequest}</div>
              <div className="text-sm text-zinc-600 mt-0.5">{navTr.featureRequestSub}</div>
            </div>
          </button>
          {quickLinks.map(l => {
            const Icon = l.icon === "💬" ? MessageCircle : ExternalLink;
            const inner = (
              <>
                <span className="w-11 h-11 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-zinc-700" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-zinc-950">{l.label}</div>
                  <div className="text-sm text-zinc-600 mt-0.5">{l.desc}</div>
                </div>
              </>
            );
            return (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rv flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-card transition-all text-start"
              >
                {inner}
              </a>
            );
          })}
        </div>
      </Section>

      {/* ─── CATEGORIES + ARTICLES ─── */}
      <Section band="muted">
        {/* mobile category pills */}
        <div className="rv flex gap-2 overflow-x-auto pb-2 mb-8 lg:hidden">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                activeCategory === c.id
                  ? "bg-zinc-950 text-white border-zinc-950"
                  : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <span aria-hidden>{c.icon}</span>
              {getCatLabel(c)}
              <span className="text-xs opacity-70 num-ltr">{c.articles.length}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="rv rounded-2xl border border-zinc-200 bg-white p-3 shadow-card sticky top-24">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-start transition-colors ${
                    activeCategory === c.id ? "bg-zinc-950 text-white" : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <span className="text-lg" aria-hidden>{c.icon}</span>
                  <span className="flex-1 text-sm font-bold">{getCatLabel(c)}</span>
                  <span className={`text-xs num-ltr ${activeCategory === c.id ? "text-zinc-300" : "text-zinc-400"}`}>{c.articles.length}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* articles */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl" aria-hidden>{activeCat.icon}</span>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-950">{getCatLabel(activeCat)}</h2>
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600 num-ltr">
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
                  className="rounded-2xl border border-zinc-200 bg-white p-6 cursor-pointer hover:border-zinc-300 hover:shadow-card transition-all flex flex-col gap-3.5"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold num-ltr shrink-0"
                    style={{
                      background: `${activeCat.color}1c`,
                      border: `1px solid ${activeCat.color}44`,
                      color: activeCat.color,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-zinc-950 leading-snug mb-1.5">{getArticleTitle(a)}</div>
                    <div className="text-sm text-zinc-600 leading-relaxed">{getArticleDesc(a)}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Clock className="w-3.5 h-3.5" />
                    {getArticleTime(a)} {tx.readSuffix}
                    <ChevronRight className={`w-4 h-4 ms-auto text-zinc-300 ${isAr ? "rotate-180" : ""}`} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── VIDEO LIBRARY ─── */}
      <Section band="white">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-12">
          <div>
            <Eyebrow className="mb-3">{tx.videoTag}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-950 mb-2 leading-tight">{tx.videoTitle}</h2>
            <p className="text-lg text-zinc-600">{tx.videoSub}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-violet-100 border border-violet-200 px-4 py-1.5 text-xs font-bold text-violet-700">
            {tx.videoComingSoon}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videoLibrary.map((v) => {
            const vEn = videoTitlesEn[v.id];
            const vTitle = isAr ? v.title : (vEn?.title || v.title);
            const vDesc = isAr ? v.description : (vEn?.description || v.description);
            const vCat = isAr ? v.category : (vEn?.category || v.category);
            return (
              <div key={v.id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-zinc-300 hover:shadow-card transition-all flex flex-col">
                <div className="relative aspect-video mockup-card flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                  <div className="relative w-14 h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <span className="absolute bottom-2.5 start-2.5 rounded-md bg-black/60 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-white num-ltr">
                    {v.duration}
                  </span>
                  <span className="absolute top-2.5 end-2.5 rounded-full bg-violet-500/90 px-3 py-1 text-[10px] font-bold text-zinc-950">
                    {vCat}
                  </span>
                  <span className="absolute top-2.5 start-2.5 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white">
                    {tx.videoSoonLabel}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-base font-bold text-zinc-950 leading-snug mb-1.5">{vTitle}</div>
                  <div className="text-sm text-zinc-600 leading-relaxed">{vDesc}</div>
                </div>
              </div>
            );
          })}
        </div>
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
