import { useEffect, useState } from "react";
import Nav from "./Nav";
import ParticleBackground from "./ParticleBackground";
import { navigateTo } from "@/components/PageTransition";
import PlatformModal from "./PlatformModal";

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
  whatWeDoTitle: string;
  whatWeDoDesc: string;
  strategyTitle: string;
  strategies: StrategyCard[];
  stats: StatItem[];
  exampleScenario?: ExampleScenario;
  plans?: string[];
  ctaTitle: string;
  ctaDesc: string;
  extraSections?: React.ReactNode;
}

export default function UseCaseLayout({ data }: { data: UseCasePageData }) {
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

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
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: "rtl", color: "var(--t)" }}>
      <div className="bg-wrap">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="bg-grid"/>
      </div>
      <div className="noise"/>
      <ParticleBackground />
      <Nav />

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 56, textAlign: "center", position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="stag rv" style={{ display: "inline-flex" }}>
          <span className="stag-dot"/>
          {data.hero.tag}
        </div>
        <div style={{ fontSize: 72, marginTop: 12, marginBottom: 12 }}>{data.hero.icon}</div>
        <h1 className="rv d1" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 16 }}>
          {data.hero.title}
        </h1>
        <p className="rv d2" style={{ fontSize: 18, color: "var(--tm)", maxWidth: 600, margin: "0 auto 20px", lineHeight: 1.8 }}>
          {data.hero.subtitle}
        </p>
        <div className="rv d3" style={{ display: "inline-block", padding: "10px 24px", borderRadius: 50, background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)", color: "var(--p4)", fontSize: 15, fontWeight: 700, marginBottom: 48 }}>
          {data.hero.tagline}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="gc rv uc-what-card" style={{ padding: "48px 52px" }}>
            <div className="shine"/>
            <div style={{ textAlign: "center", marginBottom: 0 }}>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, marginBottom: 20 }}>{data.whatWeDoTitle}</h2>
              <p style={{ fontSize: 16, color: "var(--tm)", lineHeight: 1.85, maxWidth: 720, margin: "0 auto" }}>{data.whatWeDoDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="uc-stats-grid rv">
            {data.stats.map((s, i) => (
              <div key={i} className={`gc d${(i % 4) + 1}`} style={{ padding: "32px 24px", textAlign: "center" }}>
                <div className="shine"/>
                <div style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, color: s.color || "var(--p3)", marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "var(--td)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIES */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 className="rv" style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, marginBottom: 32, textAlign: "center" }}>{data.strategyTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {data.strategies.map((s, i) => (
              <div key={i} className={`gc gc-lift rv d${(i % 4) + 1}`} style={{ padding: "32px 28px" }}>
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
      {data.exampleScenario && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="gc rv" style={{ padding: "40px 48px" }}>
              <div className="shine"/>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.2)", color: "#06b6d4", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 20 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 7px #06b6d4" }}/>
                مثال تطبيقي
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 28 }}>{data.exampleScenario.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {data.exampleScenario.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "var(--p4)", flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7, paddingTop: 4 }}>{step}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, padding: "18px 22px", background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 14, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <p style={{ fontSize: 15, color: "#10b981", fontWeight: 700 }}>{data.exampleScenario.result}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PLANS */}
      {data.plans && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="gc rv" style={{ padding: "36px 48px" }}>
              <div className="shine"/>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>متاح في الباقات</h3>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {data.plans.map((plan, i) => (
                  <div key={i} style={{ padding: "10px 24px", borderRadius: 50, background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)", fontSize: 14, fontWeight: 700, color: "var(--p4)" }}>{plan}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EXTRA SECTIONS */}
      {data.extraSections}

      {/* CTA */}
      <section className="cta-sec" style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div className="cta-box gc rv" style={{ maxWidth: 840, margin: "0 auto", padding: "88px 60px", textAlign: "center" }}>
          <div className="shine"/>
          <div className="cta-glow"/>
          <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16, position: "relative", zIndex: 1, lineHeight: 1.05 }}>{data.ctaTitle}</h2>
          <p style={{ color: "var(--tm)", fontSize: 17, marginBottom: 40, position: "relative", zIndex: 1 }}>{data.ctaDesc}</p>
          <div className="cta-btns">
            <button
              onClick={() => setPlatformModalOpen(true)}
              className="cta-btn cb-zid"
              style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}
            >
              <span>🚀</span> فعّل الآن
            </button>
          </div>
          <p className="cta-note">تجربة مجانية 14 يوم • بدون بطاقة</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="ft-top">
            <div className="ft-brand">
              <div className="ft-logo">
                <div className="ft-lm"><span style={{ fontSize: 14, fontWeight: 900 }}>ز</span></div>
                <span className="ft-lt">زيادة</span>
              </div>
              <p className="ft-desc">ذكاء اصطناعي يرفع مبيعات متجرك تلقائياً</p>
            </div>
            <div className="ft-col">
              <h4>المنتج</h4>
              <span onClick={() => navigateTo("/features")} style={{ display: "block", fontSize: 13, color: "var(--td)", textDecoration: "none", marginBottom: 9, cursor: "pointer" }}>الخصائص</span>
              <a href="/#pricing" style={{ display: "block", fontSize: 13, color: "var(--td)", textDecoration: "none", marginBottom: 9 }}>الأسعار</a>
              <span onClick={() => navigateTo("/success-stories")} style={{ display: "block", fontSize: 13, color: "var(--td)", textDecoration: "none", marginBottom: 9, cursor: "pointer" }}>قصص نجاح</span>
            </div>
            <div className="ft-col">
              <h4>حالات الاستخدام</h4>
              <span onClick={() => navigateTo("/use-cases/product-page")} style={{ display: "block", fontSize: 13, color: "var(--td)", textDecoration: "none", marginBottom: 9, cursor: "pointer" }}>صفحة المنتج</span>
              <span onClick={() => navigateTo("/use-cases/cart")} style={{ display: "block", fontSize: 13, color: "var(--td)", textDecoration: "none", marginBottom: 9, cursor: "pointer" }}>صفحة السلة</span>
              <span onClick={() => navigateTo("/use-cases/cross-sell")} style={{ display: "block", fontSize: 13, color: "var(--td)", textDecoration: "none", marginBottom: 9, cursor: "pointer" }}>البيع المتقاطع</span>
            </div>
            <div className="ft-col">
              <h4>الدعم</h4>
              <span onClick={() => navigateTo("/support")} style={{ display: "block", fontSize: 13, color: "var(--td)", textDecoration: "none", marginBottom: 9, cursor: "pointer" }}>مركز الدعم</span>
            </div>
          </div>
          <div className="ft-bot">
            <span className="ft-copy">© 2025 زيادة. جميع الحقوق محفوظة.</span>
            <div className="ft-links">
              <a href="#">سياسة الخصوصية</a>
              <a href="#">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>
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
