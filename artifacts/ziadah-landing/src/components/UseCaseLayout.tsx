import { useEffect, useState } from "react";
import Nav from "./Nav";
import ParticleBackground from "./ParticleBackground";
import { navigateTo } from "@/components/PageTransition";
import PlatformModal from "./PlatformModal";
import SEO from "./SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema } from "./JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

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

export default function UseCaseLayout({ data }: { data: UseCasePageData }) {
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const isEn = lang === "en";

  const hero = (isEn && data.heroEn) ? data.heroEn : data.hero;
  const whatWeDoTitle = (isEn && data.whatWeDoTitleEn) ? data.whatWeDoTitleEn : data.whatWeDoTitle;
  const whatWeDoDesc = (isEn && data.whatWeDoDescEn) ? data.whatWeDoDescEn : data.whatWeDoDesc;
  const strategyTitle = (isEn && data.strategyTitleEn) ? data.strategyTitleEn : data.strategyTitle;
  const strategies = (isEn && data.strategiesEn) ? data.strategiesEn : data.strategies;
  const stats = (isEn && data.statsEn) ? data.statsEn : data.stats;
  const exampleScenario = (isEn && data.exampleScenarioEn) ? data.exampleScenarioEn : data.exampleScenario;
  const plans = (isEn && data.plansEn) ? data.plansEn : data.plans;
  const ctaTitle = (isEn && data.ctaTitleEn) ? data.ctaTitleEn : data.ctaTitle;
  const ctaDesc = (isEn && data.ctaDescEn) ? data.ctaDescEn : data.ctaDesc;
  const pageKw = data.seo?.canonical ? getPageKeywords(data.seo.canonical) : getPageKeywords("/use-cases");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => { es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }); },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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
        <BreadcrumbSchema items={data.seo.breadcrumbs || [{ name: tr.useCaseLayout.breadcrumbHome, url: "/" }, { name: hero.title, url: data.seo.canonical }]} />
      </>
    )}
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: dir, color: "var(--t)" }}>
      <div className="bg-wrap">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="bg-grid"/>
      </div>
      <div className="noise"/>
      <ParticleBackground />
      <Nav />

      {/* HERO */}
      <section style={{ paddingTop: "var(--page-hero-pt)", paddingBottom: 56, textAlign: "center", position: "relative", zIndex: 2, paddingInline: "var(--page-inline-pad)" }}>
        <div className="stag rv" style={{ display: "inline-flex" }}>
          <span className="stag-dot"/>
          {hero.tag}
        </div>
        <div style={{ fontSize: "clamp(40px, 11vw, 72px)", marginTop: 12, marginBottom: 12, lineHeight: 1 }}>{hero.icon}</div>
        <h1 className="rv d1" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 16 }}>
          {hero.title}
        </h1>
        <p className="rv d2" style={{ fontSize: 18, color: "var(--tm)", maxWidth: 600, margin: "0 auto 20px", lineHeight: 1.8 }}>
          {hero.subtitle}
        </p>
        <div className="rv d3" style={{ display: "inline-block", padding: "10px 24px", borderRadius: 50, background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)", color: "var(--p4)", fontSize: 15, fontWeight: 700, marginBottom: 48 }}>
          {hero.tagline}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="gc rv uc-what-card" style={{ padding: "48px 52px" }}>
            <div className="shine"/>
            <div style={{ textAlign: "center", marginBottom: 0 }}>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, marginBottom: 20 }}>{whatWeDoTitle}</h2>
              <p style={{ fontSize: 16, color: "var(--tm)", lineHeight: 1.85, maxWidth: 720, margin: "0 auto" }}>{whatWeDoDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="uc-stats-grid rv">
            {stats.map((s, i) => (
              <div key={i} className={`gc d${(i % 4) + 1}`} style={{ padding: "var(--card-pad-md)", textAlign: "center", minHeight: "100%" }}>
                <div className="shine"/>
                <div style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, color: s.color || "var(--p3)", marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "var(--td)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIES */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 className="rv" style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, marginBottom: 32, textAlign: "center" }}>{strategyTitle}</h2>
          <div className="uc-strategies-grid">
            {strategies.map((s, i) => (
              <div key={i} className={`gc gc-lift rv d${(i % 4) + 1}`} style={{ padding: "var(--card-pad-lg)", minHeight: "100%" }}>
                <div className="shine"/>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `rgba(${hexToRgb(s.color)},.1)`, border: `1px solid rgba(${hexToRgb(s.color)},.22)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800 }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE SCENARIO */}
      {exampleScenario && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 60px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="gc rv" style={{ padding: "40px 48px" }}>
              <div className="shine"/>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.2)", color: "#06b6d4", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 20 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 7px #06b6d4" }}/>
                {tr.useCaseLayout.exampleLabel}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 28 }}>{exampleScenario.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {exampleScenario.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "var(--p4)", flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7, paddingTop: 4 }}>{step}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, padding: "18px 22px", background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 14, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <p style={{ fontSize: 15, color: "#10b981", fontWeight: 700 }}>{exampleScenario.result}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PLANS */}
      {plans && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 60px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="gc rv" style={{ padding: "36px 48px" }}>
              <div className="shine"/>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>{tr.useCaseLayout.availableIn}</h3>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {plans.map((plan, i) => (
                  <div key={i} style={{ padding: "10px 24px", borderRadius: 50, background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)", fontSize: 14, fontWeight: 700, color: "var(--p4)" }}>{plan}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EXTRA SECTIONS */}
      {typeof data.extraSections === "function" ? data.extraSections(!isEn) : data.extraSections}

      {/* REPORTS HIGHLIGHT */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="gc rv" style={{ padding: "36px 40px", background: "rgba(124,58,237,.05)", borderColor: "rgba(124,58,237,.18)" }}>
            <div className="shine"/>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(168,85,247,.08)", border: "1px solid rgba(168,85,247,.2)", color: "#a855f7", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 7px #a855f7" }}/>
                {tr.useCaseLayout.reportsTag}
              </div>
            </div>
            <div className="uc-reports-inner" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900, marginBottom: 12 }}>
                  {tr.useCaseLayout.reportsTitle}
                </h3>
                <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.8, maxWidth: 600 }}>
                  {tr.useCaseLayout.reportsDesc}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                {[
                  { icon: "📊", label: tr.useCaseLayout.campaignReports, sub: tr.useCaseLayout.campaignReportsSub, color: "#a855f7" },
                  { icon: "📦", label: tr.useCaseLayout.productReports, sub: tr.useCaseLayout.productReportsSub, color: "#06b6d4" },
                  { icon: "⚡", label: tr.useCaseLayout.liveData, sub: tr.useCaseLayout.liveDataSub, color: "#10b981" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "var(--s2)", border: "1px solid var(--b1)", borderRadius: 12, minWidth: 240 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${item.color === "#a855f7" ? "168,85,247" : item.color === "#06b6d4" ? "6,182,212" : "16,185,129"},.1)`, border: `1px solid rgba(${item.color === "#a855f7" ? "168,85,247" : item.color === "#06b6d4" ? "6,182,212" : "16,185,129"},.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: "var(--td)", marginTop: 2 }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec" style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 100px" }}>
        <div className="cta-box gc rv" style={{ maxWidth: 840, margin: "0 auto", padding: "88px 60px", textAlign: "center" }}>
          <div className="shine"/>
          <div className="cta-glow"/>
          <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16, position: "relative", zIndex: 1, lineHeight: 1.05 }}>{ctaTitle}</h2>
          <p style={{ color: "var(--tm)", fontSize: 17, marginBottom: 40, position: "relative", zIndex: 1 }}>{ctaDesc}</p>
          <div className="cta-btns">
            <button
              onClick={() => setPlatformModalOpen(true)}
              className="cta-btn cb-zid"
              style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}
            >
              <span>🚀</span> {tr.useCaseLayout.activateNow}
            </button>
          </div>
          <p className="cta-note">{tr.useCaseLayout.ctaNote}</p>
        </div>
      </section>
    </div>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}

function hexToRgb(color: string): string {
  const map: Record<string, string> = {
    "#a855f7": "168,85,247",
    "#06b6d4": "6,182,212",
    "#10b981": "16,185,129",
    "#f59e0b": "245,158,11",
    "#ec4899": "236,72,153",
    "#4f46e5": "79,70,229",
    "#7c3aed": "124,58,237",
    "#e11d48": "225,29,72",
    "#8b5cf6": "139,92,246",
  };
  return map[color] || "168,85,247";
}
