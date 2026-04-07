import { useEffect, useState } from "react";
import PageShell from "./PageShell";
import { navigateTo } from "@/components/PageTransition";
import PlatformModal from "./PlatformModal";
import SEO from "./SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema } from "./JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteContentMap, useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import "@/styles/sectorHtmlPage.css";

/* ───────────────────────── interfaces ─────────────────────────── */
export interface UseCaseHero {
  tag: string;
  title: string;
  subtitle: string;
  tagline: string;
  icon: string;
}
export interface StatItem {
  value: string;
  label: string;
  color?: string;
}
export interface StrategyCard {
  icon: string;
  title: string;
  desc: string;
  color: string;
}
export interface ExampleScenario {
  title: string;
  steps: string[];
  result: string;
}
export interface UseCasePageData {
  hero: UseCaseHero;
  heroEn?: UseCaseHero;
  whatWeDoTitle: string;
  whatWeDoTitleEn?: string;
  whatWeDoDesc: string;
  whatWeDoDescEn?: string;
  strategyTitle: string;
  strategyTitleEn?: string;
  strategies: StrategyCard[];
  strategiesEn?: StrategyCard[];
  stats: StatItem[];
  statsEn?: StatItem[];
  exampleScenario?: ExampleScenario;
  exampleScenarioEn?: ExampleScenario;
  plans?: string[];
  plansEn?: string[];
  ctaTitle: string;
  ctaTitleEn?: string;
  ctaDesc: string;
  ctaDescEn?: string;
  heroVisual?: React.ReactNode;
  extraSections?: React.ReactNode | ((isAr: boolean) => React.ReactNode);
  seo?: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    canonical: string;
    breadcrumbs?: Array<{ name: string; url: string }>;
  };
}

/* ───────────────────────── component ──────────────────────────── */
export default function UseCaseLayout({ data }: { data: UseCasePageData }) {
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [scrollProg, setScrollProg] = useState(0);
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang];
  const isEn = lang === "en";

  const hero = isEn && data.heroEn ? data.heroEn : data.hero;
  const whatWeDoTitle = isEn && data.whatWeDoTitleEn ? data.whatWeDoTitleEn : data.whatWeDoTitle;
  const whatWeDoDesc = isEn && data.whatWeDoDescEn ? data.whatWeDoDescEn : data.whatWeDoDesc;
  const strategyTitle = isEn && data.strategyTitleEn ? data.strategyTitleEn : data.strategyTitle;
  const strategies = isEn && data.strategiesEn ? data.strategiesEn : data.strategies;
  const stats = isEn && data.statsEn ? data.statsEn : data.stats;
  const exampleScenario = isEn && data.exampleScenarioEn ? data.exampleScenarioEn : data.exampleScenario;
  const plans = isEn && data.plansEn ? data.plansEn : data.plans;
  const ctaTitle = isEn && data.ctaTitleEn ? data.ctaTitleEn : data.ctaTitle;
  const ctaDesc = isEn && data.ctaDescEn ? data.ctaDescEn : data.ctaDesc;
  const pageKw = data.seo?.canonical ? getPageKeywords(data.seo.canonical) : getPageKeywords("/use-cases");

  const map = useSiteContentMap();
  const slug = data.seo?.canonical?.match(/\/use-cases\/([^/?#]+)/)?.[1] ?? "page";
  const ucKey = (...parts: string[]) => cmsKey(lang, "useCasePage", slug, ...parts);
  const cv = (parts: string[], fallback: string) => {
    const key = ucKey(...parts);
    const v = map[key];
    return v !== undefined && v !== "" ? v : fallback;
  };
  const gv = (key: string, fallback: string) => {
    const v = map[key];
    return v !== undefined && v !== "" ? v : fallback;
  };

  /* scroll-reveal observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => { es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }); },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* scroll progress — always active */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProg(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* quick-nav items */
  const quickNav = [
    { id: "uc-what",       ar: "كيف يعمل",       en: "How it works" },
    { id: "uc-stats",      ar: "النتائج",          en: "Results" },
    { id: "uc-strategies", ar: "الاستراتيجيات",   en: "Strategies" },
    ...(exampleScenario ? [{ id: "uc-example", ar: "مثال حي", en: "Example" }] : []),
    ...(data.extraSections ? [{ id: "uc-showcase", ar: "الأدوات", en: "Tools" }] : []),
  ];

  /* ─── CMS helpers ─── */
  const activateNow = gv(cmsKey(lang, "useCaseLayout", "activateNow"), tr.useCaseLayout.activateNow);
  const ctaNote     = gv(cmsKey(lang, "useCaseLayout", "ctaNote"),     tr.useCaseLayout.ctaNote);
  const reportsTag  = gv(cmsKey(lang, "useCaseLayout", "reportsTag"),  tr.useCaseLayout.reportsTag);
  const reportsTitle= gv(cmsKey(lang, "useCaseLayout", "reportsTitle"),tr.useCaseLayout.reportsTitle);
  const reportsDesc = gv(cmsKey(lang, "useCaseLayout", "reportsDesc"), tr.useCaseLayout.reportsDesc);
  const exampleLabel= gv(cmsKey(lang, "useCaseLayout", "exampleLabel"),tr.useCaseLayout.exampleLabel);
  const availableIn = gv(cmsKey(lang, "useCaseLayout", "availableIn"), tr.useCaseLayout.availableIn);

  /* shared quick-nav row */
  const QuickNavRow = () => (
    <div className="rv d2 sector-page-quicknav"
      style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
      {quickNav.map((item) => (
        <button key={item.id} type="button" onClick={() => scrollTo(item.id)}
          style={{ borderRadius: 999, border: "1px solid var(--b2)", background: "linear-gradient(180deg,var(--s1),rgba(124,58,237,.04))", color: "var(--t)", fontSize: 12, fontWeight: 700, padding: "9px 14px", fontFamily: "var(--font)", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.06)", transition: "border-color .2s" }}>
          {isEn ? item.en : item.ar}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {data.seo && (
        <>
          <SEO
            titleAr={data.seo.title}
            titleEn={data.seo.titleEn || data.seo.title}
            descriptionAr={data.seo.description}
            descriptionEn={data.seo.descriptionEn || data.seo.description}
            canonical={data.seo.canonical}
            keywordsAr={pageKw?.keywordsAr}
            keywordsEn={pageKw?.keywordsEn}
          />
          <BreadcrumbSchema items={data.seo.breadcrumbs || [
            { name: tr.useCaseLayout.breadcrumbHome, url: "/" },
            { name: hero.title, url: data.seo.canonical },
          ]} />
        </>
      )}

      <PageShell>
        {/* ── fixed scroll progress bar ── */}
        <div className="sector-html-prog" style={{ width: `${scrollProg}%` }} aria-hidden />

        {/* ══════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════ */}
        {data.heroVisual ? (
          /* two-column hero */
          <section className="sector-html"
            style={{ paddingTop: "var(--page-hero-pt)", paddingBottom: 48, position: "relative", zIndex: 2, paddingInline: "var(--page-inline-pad)", borderBottom: "1px solid var(--b1)" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div className="stag rv" style={{ display: "inline-flex" }}>
                <span className="stag-dot" />
                <Editable contentKey={ucKey("hero", "tag")} label="Tag" type="text">
                  {cv(["hero", "tag"], hero.tag)}
                </Editable>
              </div>
            </div>
            <div className="sector-html-hero-grid rv d1" style={{ maxWidth: 1160, margin: "0 auto" }}>
              {/* text */}
              <div>
                <div className="sector-html-badge">
                  {hero.icon}{" "}
                  <Editable contentKey={ucKey("hero", "tagline")} label="Tagline" type="text">
                    {cv(["hero", "tagline"], hero.tagline)}
                  </Editable>
                </div>
                <h1 className="sector-html-hero-h">
                  <Editable contentKey={ucKey("hero", "title")} label="Title" type="text">
                    {cv(["hero", "title"], hero.title)}
                  </Editable>
                </h1>
                <p className="sector-html-hero-sub">
                  <Editable contentKey={ucKey("hero", "subtitle")} label="Subtitle" type="text">
                    {cv(["hero", "subtitle"], hero.subtitle)}
                  </Editable>
                </p>
                <div className="sector-html-cta-row">
                  <button type="button" className="sector-html-btn sector-html-btn--fire"
                    onClick={() => setPlatformModalOpen(true)}>
                    🚀{" "}
                    <Editable contentKey={ucKey("activateNow")} label="Activate CTA" type="text">
                      {activateNow}
                    </Editable>
                  </button>
                  <button type="button" className="sector-html-btn sector-html-btn--ghost"
                    onClick={() => scrollTo("uc-showcase")}>
                    {isEn ? "See it live ↓" : "شوف الأداة ↓"}
                  </button>
                </div>
              </div>
              {/* visual */}
              <div>{data.heroVisual}</div>
            </div>
            <QuickNavRow />
          </section>
        ) : (
          /* centered hero */
          <section className="sector-html"
            style={{ paddingTop: "var(--page-hero-pt)", paddingBottom: 56, position: "relative", zIndex: 2, paddingInline: "var(--page-inline-pad)", borderBottom: "1px solid var(--b1)" }}>
            <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
              <div className="stag rv" style={{ display: "inline-flex", marginBottom: 16 }}>
                <span className="stag-dot" />
                <Editable contentKey={ucKey("hero", "tag")} label="Tag" type="text">
                  {cv(["hero", "tag"], hero.tag)}
                </Editable>
              </div>
              <div className="sector-html-badge rv" style={{ margin: "0 auto 20px", display: "inline-flex" }}>
                {hero.icon}{" "}
                <Editable contentKey={ucKey("hero", "tagline")} label="Tagline" type="text">
                  {cv(["hero", "tagline"], hero.tagline)}
                </Editable>
              </div>
              <h1 className="sector-html-hero-h rv d1" style={{ textAlign: "center" }}>
                <Editable contentKey={ucKey("hero", "title")} label="Title" type="text">
                  {cv(["hero", "title"], hero.title)}
                </Editable>
              </h1>
              <p className="sector-html-hero-sub rv d2" style={{ textAlign: "center", margin: "0 auto 28px" }}>
                <Editable contentKey={ucKey("hero", "subtitle")} label="Subtitle" type="text">
                  {cv(["hero", "subtitle"], hero.subtitle)}
                </Editable>
              </p>
              <div className="sector-html-cta-row rv d3" style={{ justifyContent: "center" }}>
                <button type="button" className="sector-html-btn sector-html-btn--fire"
                  onClick={() => setPlatformModalOpen(true)}>
                  🚀{" "}
                  <Editable contentKey={ucKey("activateNow")} label="Activate CTA" type="text">
                    {activateNow}
                  </Editable>
                </button>
                <button type="button" className="sector-html-btn sector-html-btn--ghost"
                  onClick={() => scrollTo("uc-strategies")}>
                  {isEn ? "How it works ↓" : "كيف يعمل ↓"}
                </button>
              </div>
              <QuickNavRow />
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            WHAT WE DO
        ══════════════════════════════════════════════════ */}
        <section id="uc-what" className="sector-html"
          style={{ position: "relative", zIndex: 2, padding: "56px var(--page-inline-pad) 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="rv" style={{
              position: "relative",
              background: "color-mix(in srgb, var(--p) 5%, transparent)",
              border: "1px solid color-mix(in srgb, var(--p) 18%, transparent)",
              borderRadius: 20,
              padding: "44px 52px",
              overflow: "hidden",
            }}>
              {/* gradient top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--p), var(--sh-accent), var(--sh-gold))" }} />
              <div className="sector-html-badge" style={{ marginBottom: 16 }}>
                {isEn ? "How it works" : "كيف يعمل"}
              </div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 18, color: "var(--t)" }}>
                <Editable contentKey={ucKey("whatWeDoTitle")} label="What we do title" type="text">
                  {cv(["whatWeDoTitle"], whatWeDoTitle)}
                </Editable>
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--td)", lineHeight: 1.88, maxWidth: 840 }}>
                <Editable contentKey={ucKey("whatWeDoDesc")} label="What we do desc" type="text">
                  {cv(["whatWeDoDesc"], whatWeDoDesc)}
                </Editable>
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            STATS — KPI boxes
        ══════════════════════════════════════════════════ */}
        <section id="uc-stats" className="sector-html"
          style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {stats.map((s, i) => (
                <div key={i} className={`sector-html-kpi-box rv d${i + 1}`}>
                  <div className="sector-html-kpiv"
                    style={{
                      background: `linear-gradient(135deg, ${s.color || "var(--p)"}, var(--sh-gold))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    <Editable contentKey={ucKey("stats", String(i), "value")} label={`Stat ${i + 1}`} type="text">
                      {cv(["stats", String(i), "value"], s.value)}
                    </Editable>
                  </div>
                  <div className="sector-html-kpil">
                    <Editable contentKey={ucKey("stats", String(i), "label")} label={`Stat ${i + 1} label`} type="text">
                      {cv(["stats", String(i), "label"], s.label)}
                    </Editable>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            STRATEGIES — sector-html-why-grid
        ══════════════════════════════════════════════════ */}
        <section id="uc-strategies" className="sector-html"
          style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 56px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 900, letterSpacing: "-0.5px", color: "var(--t)" }}>
                <Editable contentKey={ucKey("strategyTitle")} label="Strategy title" type="text">
                  {cv(["strategyTitle"], strategyTitle)}
                </Editable>
              </h2>
            </div>
            <div className="sector-html-why-grid">
              {strategies.map((s, i) => (
                <div key={i} className={`sector-html-wcard rv d${(i % 3) + 1}`}
                  style={{ borderTop: `2px solid ${s.color}` }}>
                  <div className="sector-html-wc-icon" style={{ fontSize: "1.6rem" }}>
                    {s.icon}
                  </div>
                  <p className="sector-html-wc-title" style={{ fontSize: "1rem" }}>
                    <Editable contentKey={ucKey("strategies", String(i), "title")} label={`Strategy ${i + 1}`} type="text">
                      {cv(["strategies", String(i), "title"], s.title)}
                    </Editable>
                  </p>
                  <p className="sector-html-wc-line">
                    <Editable contentKey={ucKey("strategies", String(i), "desc")} label={`Strategy ${i + 1} desc`} type="text">
                      {cv(["strategies", String(i), "desc"], s.desc)}
                    </Editable>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            EXAMPLE SCENARIO — two-column timeline + result
        ══════════════════════════════════════════════════ */}
        {exampleScenario && (
          <section id="uc-example" className="sector-html"
            style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 56px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div className="rv" style={{
                position: "relative",
                background: "color-mix(in srgb, var(--p) 5%, transparent)",
                border: "1px solid color-mix(in srgb, var(--p) 18%, transparent)",
                borderRadius: 20,
                overflow: "hidden",
              }}>
                {/* coloured top bar */}
                <div style={{ height: 3, background: "linear-gradient(90deg, var(--sh-accent2), var(--p), var(--sh-green))" }} />
                <div style={{ padding: "36px 44px" }}>
                  <div className="sector-html-badge" style={{ marginBottom: 20 }}>
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "exampleLabel")} label="Example label" type="text">
                      {exampleLabel}
                    </Editable>
                  </div>
                  <h3 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 900, marginBottom: 28, color: "var(--t)" }}>
                    <Editable contentKey={ucKey("exampleScenario", "title")} label="Example title" type="text">
                      {cv(["exampleScenario", "title"], exampleScenario.title)}
                    </Editable>
                  </h3>
                  <div className="sector-html-ai-layout" style={{ gap: 36, alignItems: "start" }}>
                    {/* steps */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {exampleScenario.steps.map((step, i) => (
                        <div key={i} className="sector-html-ai-layer">
                          <div className="sector-html-al-num">{i + 1}</div>
                          <div>
                            <p style={{ margin: 0, fontSize: 14, color: "var(--td)", lineHeight: 1.7 }}>
                              <Editable contentKey={ucKey("exampleScenario", "steps", String(i))} label={`Step ${i + 1}`} type="text">
                                {cv(["exampleScenario", "steps", String(i)], step)}
                              </Editable>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* result card */}
                    <div style={{ position: "sticky", top: 100 }}>
                      <div style={{
                        background: "color-mix(in srgb, var(--sh-green) 9%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--sh-green) 32%, transparent)",
                        borderRadius: 16,
                        padding: "28px 28px",
                      }}>
                        <div style={{ fontSize: 32, marginBottom: 14 }}>✅</div>
                        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--sh-green)", lineHeight: 1.65 }}>
                          <Editable contentKey={ucKey("exampleScenario", "result")} label="Result" type="text">
                            {cv(["exampleScenario", "result"], exampleScenario.result)}
                          </Editable>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            PLANS
        ══════════════════════════════════════════════════ */}
        {plans && (
          <section className="sector-html"
            style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 56px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div className="rv" style={{
                background: "color-mix(in srgb, var(--p) 4%, transparent)",
                border: "1px solid color-mix(in srgb, var(--p) 16%, transparent)",
                borderRadius: 18,
                padding: "28px 36px",
              }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div className="sector-html-badge" style={{ margin: "0 auto" }}>
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "availableIn")} label="Available in" type="text">
                      {availableIn}
                    </Editable>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {plans.map((plan, i) => (
                    <div key={i} style={{
                      padding: "10px 24px",
                      borderRadius: 999,
                      background: "color-mix(in srgb, var(--p) 10%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--p) 26%, transparent)",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--sh-accent)",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}>
                      <span style={{ color: "var(--sh-green)", fontWeight: 900 }}>✓</span>
                      <Editable contentKey={ucKey("plans", String(i))} label={`Plan ${i + 1}`} type="text">
                        {cv(["plans", String(i)], plan)}
                      </Editable>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            EXTRA SECTIONS (widgets / showcases)
        ══════════════════════════════════════════════════ */}
        <div id="uc-showcase">
          {typeof data.extraSections === "function" ? data.extraSections(!isEn) : data.extraSections}
        </div>

        {/* ══════════════════════════════════════════════════
            REPORTS HIGHLIGHT
        ══════════════════════════════════════════════════ */}
        <section className="sector-html"
          style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="rv" style={{
              position: "relative",
              background: "color-mix(in srgb, var(--p) 5%, transparent)",
              border: "1px solid color-mix(in srgb, var(--p) 18%, transparent)",
              borderRadius: 20,
              padding: "36px 44px",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--p), var(--sh-accent), transparent)" }} />
              <div className="sector-html-ai-layout" style={{ gap: 44 }}>
                {/* text */}
                <div>
                  <div className="sector-html-badge" style={{ marginBottom: 16 }}>
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "reportsTag")} label="Reports tag" type="text">
                      {reportsTag}
                    </Editable>
                  </div>
                  <h3 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 900, marginBottom: 12, color: "var(--t)" }}>
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "reportsTitle")} label="Reports title" type="text">
                      {reportsTitle}
                    </Editable>
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--td)", lineHeight: 1.78 }}>
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "reportsDesc")} label="Reports desc" type="richtext">
                      {reportsDesc}
                    </Editable>
                  </p>
                </div>
                {/* 3 report cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                  {(
                    [
                      { icon: "📊", labelKey: "campaignReports" as const, subKey: "campaignReportsSub" as const, color: "#a855f7" },
                      { icon: "📦", labelKey: "productReports" as const, subKey: "productReportsSub" as const, color: "#06b6d4" },
                      { icon: "⚡", labelKey: "liveData" as const, subKey: "liveDataSub" as const, color: "#10b981" },
                    ] as const
                  ).map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "color-mix(in srgb, var(--bg) 60%, transparent)", border: "1px solid color-mix(in srgb, var(--p) 14%, transparent)", borderRadius: 12, minWidth: 240 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${item.color === "#a855f7" ? "168,85,247" : item.color === "#06b6d4" ? "6,182,212" : "16,185,129"},.12)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "var(--t)" }}>
                          <Editable contentKey={cmsKey(lang, "useCaseLayout", item.labelKey)} label={item.labelKey} type="text">
                            {gv(cmsKey(lang, "useCaseLayout", item.labelKey), tr.useCaseLayout[item.labelKey])}
                          </Editable>
                        </div>
                        <div style={{ fontSize: 11, color: "var(--td)", marginTop: 2 }}>
                          <Editable contentKey={cmsKey(lang, "useCaseLayout", item.subKey)} label={item.subKey} type="text">
                            {gv(cmsKey(lang, "useCaseLayout", item.subKey), tr.useCaseLayout[item.subKey])}
                          </Editable>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════ */}
        <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 100px" }}>
          <div className="sector-html rv" style={{
            maxWidth: 860,
            margin: "0 auto",
            position: "relative",
            background: "color-mix(in srgb, var(--p) 8%, transparent)",
            border: "1px solid color-mix(in srgb, var(--p) 22%, transparent)",
            borderRadius: 24,
            padding: "72px 60px",
            textAlign: "center",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--p), var(--sh-accent), var(--sh-gold))" }} />
            {/* glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, background: "radial-gradient(ellipse, color-mix(in srgb, var(--p) 18%, transparent) 0%, transparent 70%)", pointerEvents: "none" }} />
            <h2 className="sector-html-hero-h" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <Editable contentKey={ucKey("ctaTitle")} label="CTA title" type="text">
                {cv(["ctaTitle"], ctaTitle)}
              </Editable>
            </h2>
            <p className="sector-html-hero-sub" style={{ textAlign: "center", margin: "0 auto 36px", position: "relative", zIndex: 1 }}>
              <Editable contentKey={ucKey("ctaDesc")} label="CTA desc" type="text">
                {cv(["ctaDesc"], ctaDesc)}
              </Editable>
            </p>
            <div className="sector-html-cta-row" style={{ justifyContent: "center", position: "relative", zIndex: 1 }}>
              <button type="button" className="sector-html-btn sector-html-btn--fire"
                onClick={() => setPlatformModalOpen(true)}>
                🚀{" "}
                <Editable contentKey={cmsKey(lang, "useCaseLayout", "activateNow")} label="Activate CTA" type="text">
                  {activateNow}
                </Editable>
              </button>
              <button type="button" className="sector-html-btn sector-html-btn--ghost"
                onClick={() => navigateTo("/")}>
                {isEn ? "Back to home" : "← الرئيسية"}
              </button>
            </div>
            <p className="cta-note" style={{ position: "relative", zIndex: 1, marginTop: 20 }}>
              <Editable contentKey={cmsKey(lang, "useCaseLayout", "ctaNote")} label="CTA note" type="text">
                {ctaNote}
              </Editable>
            </p>
          </div>
        </section>
      </PageShell>

      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
