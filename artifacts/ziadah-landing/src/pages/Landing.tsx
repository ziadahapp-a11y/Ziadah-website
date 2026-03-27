import { useEffect, useRef, useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import Nav, { Logo } from "../components/Nav";
import PlatformModal from "../components/PlatformModal";
import HomeCalculator from "../components/HomeCalculator";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { OrganizationSchema, SoftwareAppSchema, WebSiteSchema, HowToSchema, FAQSchema } from "../components/JsonLd";
import FloatingUseCaseCards from "../components/FloatingUseCaseCards";
import BuyMoreSaveMoreWidget from "../components/widgets/BuyMoreSaveMoreWidget";
import BuyTogetherWidget from "../components/widgets/BuyTogetherWidget";
import AddonsWidget from "../components/widgets/AddonsWidget";
import RelatedProductsWidget from "../components/widgets/RelatedProductsWidget";
import CouponWidget from "../components/widgets/CouponWidget";
import FreeShippingThresholdWidget from "../components/widgets/FreeShippingThresholdWidget";
import ProductSwapWidget from "../components/widgets/ProductSwapWidget";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";
import { useTheme } from "@/ThemeContext";
import { scrollToHashElement } from "@/utils/anchorScroll";
import { sectors } from "@/data/sectors";
import { navigateTo } from "@/components/PageTransition";

const storeLogos = [
  { name: "BestClean", src: "/logos/bestclean.png" },
  { name: "Reeq Alnahl", src: "/logos/reeq-alnahl.png" },
  { name: "Altamimi", src: "/logos/altamimi.png" },
  { name: "ZUM", src: "/logos/zum.png" },
  { name: "CB", src: "/logos/cb.png" },
  { name: "12 CUPS", src: "/logos/12cups.png" },
  { name: "RIBAL", src: "/logos/ribal.png" },
  { name: "SHFT", src: "/logos/shft.png" },
  { name: "FOR HER", src: "/logos/for-her.png" },
  { name: "Abaq Alghim", src: "/logos/abaq-alghim.png" },
  { name: "FABIAN", src: "/logos/fabian.png" },
  { name: "Natural Touch", src: "/logos/natural-touch.png" },
  { name: "image_223", src: "/logos/image-223.png" },
  { name: "Mazeed", src: "/logos/mazeed.png" },
  { name: "AlSalman Oud", src: "/logos/alsalman-oud.png" },
  { name: "PC Palace", src: "/logos/pc-palace.png" },
];

function GlassCard({
  children,
  className = "",
  style = {},
  lift = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--gx",
        ((e.clientX - r.left) / r.width) * 100 + "%",
      );
      el.style.setProperty(
        "--gy",
        ((e.clientY - r.top) / r.height) * 100 + "%",
      );
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className={`gc${lift ? " gc-lift" : ""} ${className}`}
      style={style}
    >
      <div className="shine" />
      {children}
    </div>
  );
}

function SecTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="stag rv">
      <span className="stag-dot" />
      {children}
    </div>
  );
}

export default function Landing() {
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [pricingMode, setPricingMode] = useState<"m" | "y">("y");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /** فتح رابط فيه #pricing أو #faq (مشاركة) — تمرير للقسم مع تعويض شريط التنقل الثابت */
  useEffect(() => {
    const scrollIfHash = () => {
      const id = window.location.hash.replace(/^#/, "").split("?")[0];
      if (!id || (id !== "pricing" && id !== "faq")) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      const run = () => {
        scrollToHashElement(id, behavior);
      };
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(run);
      });
    };

    const t = window.setTimeout(scrollIfHash, 200);
    window.addEventListener("hashchange", scrollIfHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", scrollIfHash);
    };
  }, []);

  // Custom cursor — فقط على الديسكتوب (لا يوجد ماوس على الجوال)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // جوال/لمس → تخطي
    const cur = document.getElementById("zd-cur");
    const curR = document.getElementById("zd-curR");
    if (!cur || !curR) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let rafId: number;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx - 5 + "px";
      cur.style.top = my - 5 + "px";
    };
    function loop() {
      rx += (mx - rx - 18) * 0.11;
      ry += (my - ry - 18) * 0.11;
      curR!.style.left = rx + "px";
      curR!.style.top = ry + "px";
      rafId = requestAnimationFrame(loop);
    }
    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      document.body.classList.toggle("page-hidden", document.hidden);
    };
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.body.classList.remove("page-hidden");
    };
  }, []);

  const prices = {
    m: { s: 29, g: 290, p: 790, b: "1,990" },
    y: { s: 24, g: 249, p: 665, b: "1,332" },
  };

  const row1Avatars = ["R", "T", "S", "F", "N", "B"];
  const row1Colors = [
    "linear-gradient(135deg,#7c3aed,#5b21b6)",
    "linear-gradient(135deg,#059669,#047857)",
    "linear-gradient(135deg,#ec4899,#be185d)",
    "linear-gradient(135deg,#7c3aed,#4f46e5)",
    "linear-gradient(135deg,#10b981,#059669)",
    "linear-gradient(135deg,#06b6d4,#0891b2)",
  ];
  const row2Avatars = ["A", "R", "K", "Q", "K", "Y"];
  const row2Colors = [
    "linear-gradient(135deg,#a855f7,#7c3aed)",
    "linear-gradient(135deg,#ec4899,#9333ea)",
    "linear-gradient(135deg,#06b6d4,#0891b2)",
    "linear-gradient(135deg,#4f46e5,#4338ca)",
    "linear-gradient(135deg,#f59e0b,#d97706)",
    "linear-gradient(135deg,#f59e0b,#92400e)",
  ];
  const trRow1 = tr.landing.testimonialsRow1 as { text: string; name: string; role: string }[];
  const trRow2 = tr.landing.testimonialsRow2 as { text: string; name: string; role: string }[];
  const testimonialsRow1 = trRow1.map((t, i) => ({
    ...t,
    av: row1Avatars[i % row1Avatars.length],
    col: row1Colors[i % row1Colors.length],
  }));
  const testimonialsRow2 = trRow2.map((t, i) => ({
    ...t,
    av: row2Avatars[i % row2Avatars.length],
    col: row2Colors[i % row2Colors.length],
  }));
  const faqs = tr.landing.faqList as { q: string; a: string }[];
  const pk = getPageKeywords("/");

  return (
    <>
      <SEO
        titleAr={t.ar.landing.seoTitle}
        titleEn={t.en.landing.seoTitle}
        descriptionAr={t.ar.landing.seoDesc}
        descriptionEn={t.en.landing.seoDesc}
        canonical="/"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <OrganizationSchema />
      <SoftwareAppSchema />
      <WebSiteSchema />
      <HowToSchema />
      <FAQSchema faqs={faqs} />
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          fontFamily: "var(--font)",
          direction: dir,
          color: "var(--t)",
        }}
      >
        {/* CURSOR — ديسكتوب فقط */}
        <div id="zd-cur" className="desktop-only" style={{ width: 10, height: 10, background: "var(--p3)", borderRadius: "50%", position: "fixed", pointerEvents: "none", zIndex: 9999, mixBlendMode: isLight ? "multiply" : "screen", transition: "width .18s,height .18s,background .18s", top: -999, left: -999 }} />
        <div id="zd-curR" className="desktop-only" style={{ width: 36, height: 36, border: "1px solid rgba(168,85,247,.4)", borderRadius: "50%", position: "fixed", pointerEvents: "none", zIndex: 9998, transition: "all .3s", top: -999, left: -999 }} />
        {/* BG */}
        <div className="bg-wrap">
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />
          <div className="orb o4" />
          <div className="bg-grid" />
        </div>
        <div className="noise" />
        <ParticleBackground />
        {/* NAV */}
        <Nav />
        {/* HERO */}
        <section className="hero">
          <div className="hero-glow" />
          <FloatingUseCaseCards />
          <div className="hero-in">
            <div className="hero-mobile-logo">
              <Logo />
            </div>
            <div className="hbadge">
              <span className="hbadge-pill">{tr.landing.aiBadge}</span>
              <span className="hbadge-txt">
                {tr.landing.aiBadgeText}
              </span>
            </div>
            <h1 className="ht pt-[6px] pb-[6px] mt-[0px] mb-[20px] font-semibold">
              <span className="ht-line1">
                {tr.landing.heroTitle1}
              </span>
              {tr.landing.heroTitleEm && <em>{tr.landing.heroTitleEm}</em>}
              <span className="grad font-semibold" style={{ whiteSpace: "pre-line" }}>
                {tr.landing.heroTitleGrad}
              </span>
            </h1>
            <p className="hero-sub" dangerouslySetInnerHTML={{ __html: tr.landing.heroSub }} />
            <div className="hero-ctas">
              <button
                onClick={() => setPlatformModalOpen(true)}
                className="btn-p"
                style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}
              >
                {tr.landing.ctaPrimary}
              </button>
              <a href="#hiw" className="btn-g">
                {tr.landing.ctaSecondary}
              </a>
            </div>
            <div className="sbar">
              <div className="sbi">
                <div className="sbi-n">{tr.landing.stat1Value}</div>
                <div className="sbi-l text-[14px]">{tr.landing.stat1Label}</div>
              </div>
              <div className="sbi">
                <div className="sbi-n">{tr.landing.stat2Value}</div>
                <div className="sbi-l">{tr.landing.stat2Label}</div>
              </div>
              <div className="sbi">
                <div className="sbi-n">{tr.landing.stat3Value}</div>
                <div className="sbi-l">{tr.landing.stat3Label}</div>
              </div>
              <div className="sbi">
                <div className="sbi-n">{tr.landing.stat4Value}</div>
                <div className="sbi-l">{tr.landing.stat4Label}</div>
              </div>
            </div>
          </div>
        </section>
        {/* LOGOS */}
        <div className="logos-sec">
          <p className="logos-lbl rv">{tr.landing.trustLabel}</p>
          <div className="logos-mask marquee-row">
            <div
              className="marquee-track marquee-rtl"
              style={{ animationDuration: `${storeLogos.length * 1.75}s` }}
            >
              {[...storeLogos, ...storeLogos, ...storeLogos].map((l, i) => (
                <div key={i} className="lc">
                  <img
                    src={l.src}
                    alt={
                      lang === "ar"
                        ? `شعار ${l.name} — متجر يستخدم منصة زيادة للذكاء الاصطناعي`
                        : `${l.name} logo — Ziadah AI ecommerce merchant`
                    }
                    className="logo-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* HOME CALCULATOR */}
        <HomeCalculator />
        {/* SECTORS */}
        <section id="sectors" style={{ position: "relative", zIndex: 2, padding: "72px 0 88px" }}>
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 44 }}>
              <SecTag>{tr.landing.sectorsTag}</SecTag>
              <h2 className="st rv d1 text-[clamp(28px,4vw,44px)] font-semibold">{tr.landing.sectorsTitle}</h2>
              <p className="ssub rv d2" style={{ maxWidth: 720, marginInline: "auto" }}>
                {tr.landing.sectorsSub}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 18,
                marginBottom: 28,
              }}
            >
              {sectors.map((sec, i) => {
                const stitle = lang === "ar" ? sec.titleAr : sec.titleEn;
                const stag = lang === "ar" ? sec.taglineAr : sec.taglineEn;
                return (
                  <GlassCard key={sec.slug} lift className={`rv d${(i % 3) + 1}`} style={{ cursor: "pointer" }}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => navigateTo(`/sectors/${sec.slug}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigateTo(`/sectors/${sec.slug}`);
                        }
                      }}
                      style={{ padding: "22px 20px 24px", textAlign: dir === "rtl" ? "right" : "left" }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{sec.icon}</div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: "var(--t)", marginBottom: 6 }}>{stitle}</div>
                      <div style={{ fontSize: 13, color: "var(--td)", lineHeight: 1.5 }}>{stag}</div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
            <div className="tc rv d3">
              <button
                type="button"
                onClick={() => navigateTo("/sectors")}
                className="btn-g"
                style={{ cursor: "pointer", fontFamily: "var(--font)", border: "1px solid var(--b2)", background: "var(--s1)" }}
              >
                {tr.landing.sectorsCta}
              </button>
            </div>
          </div>
        </section>
        {/* HOW IT WORKS */}
        <section id="hiw">
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 56 }}>
              <SecTag>{tr.landing.hiwTag}</SecTag>
              <h2 className="st rv d1 text-[48px] font-semibold">
                {tr.landing.hiwTitle}
              </h2>
              <p className="ssub rv d2">
                {tr.landing.hiwSubtitle}
              </p>
            </div>
            <div className="hiw-grid">
              {[
                {
                  step: tr.landing.step1Label,
                  title: tr.landing.step1Title,
                  desc: tr.landing.step1Desc,
                  chip: tr.landing.step1Chip,
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect
                        x="9"
                        y="6"
                        width="14"
                        height="20"
                        rx="3"
                        fill="rgba(124,58,237,.14)"
                        stroke="rgba(168,85,247,.45)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="12"
                        y="10"
                        width="8"
                        height="2"
                        rx="1"
                        fill="rgba(168,85,247,.55)"
                      />
                      <rect
                        x="12"
                        y="14"
                        width="5"
                        height="2"
                        rx="1"
                        fill="rgba(168,85,247,.35)"
                      />
                      <circle
                        cx="21"
                        cy="22"
                        r="6"
                        fill="rgba(16,185,129,.14)"
                        stroke="rgba(16,185,129,.5)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M18.5 22l1.5 1.5 3-3"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  step: tr.landing.step2Label,
                  title: tr.landing.step2Title,
                  desc: tr.landing.step2Desc,
                  chip: tr.landing.step2Chip,
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle
                        cx="16"
                        cy="13"
                        r="8"
                        fill="rgba(124,58,237,.12)"
                        stroke="rgba(168,85,247,.4)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 22 C10 17 13 15 16 15 C19 15 22 17 22 22"
                        fill="rgba(124,58,237,.08)"
                        stroke="rgba(168,85,247,.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="13"
                        cy="12"
                        r="1.5"
                        fill="rgba(168,85,247,.7)"
                      />
                      <circle cx="16" cy="12" r="1.5" fill="#a855f7" />
                      <circle
                        cx="19"
                        cy="12"
                        r="1.5"
                        fill="rgba(168,85,247,.7)"
                      />
                      <line
                        x1="8"
                        y1="5"
                        x2="11"
                        y2="8"
                        stroke="rgba(168,85,247,.3)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <line
                        x1="16"
                        y1="3"
                        x2="16"
                        y2="7"
                        stroke="rgba(168,85,247,.3)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <line
                        x1="24"
                        y1="5"
                        x2="21"
                        y2="8"
                        stroke="rgba(168,85,247,.3)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  step: tr.landing.step3Label,
                  title: tr.landing.step3Title,
                  desc: tr.landing.step3Desc,
                  chip: tr.landing.step3Chip,
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect
                        x="4"
                        y="20"
                        width="5"
                        height="8"
                        rx="1.5"
                        fill="rgba(168,85,247,.25)"
                        stroke="rgba(168,85,247,.45)"
                        strokeWidth="1.2"
                      />
                      <rect
                        x="13"
                        y="14"
                        width="5"
                        height="14"
                        rx="1.5"
                        fill="rgba(168,85,247,.45)"
                        stroke="rgba(168,85,247,.6)"
                        strokeWidth="1.2"
                      />
                      <rect
                        x="22"
                        y="7"
                        width="5"
                        height="21"
                        rx="1.5"
                        fill="#a855f7"
                        stroke="rgba(168,85,247,.7)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M6.5 18 L15.5 12 L24.5 5"
                        stroke="rgba(196,132,252,.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="2 3"
                      />
                      <circle
                        cx="24.5"
                        cy="5"
                        r="2.5"
                        fill="rgba(196,132,252,.4)"
                        stroke="rgba(196,132,252,.6)"
                        strokeWidth="1"
                      />
                    </svg>
                  ),
                },
              ].map((c, i) => (
                <GlassCard key={i} lift className={`rv d${i + 1}`}>
                  <div className="hiw-p">
                    <div className="step-lbl">{c.step}</div>
                    <div className="hiw-img">{c.icon}</div>
                    <div className="hiw-t">{c.title}</div>
                    <div className="hiw-d">{c.desc}</div>
                    <div className="hiw-chip">✓ {c.chip}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
        {/* LIVE WIDGETS SHOWCASE */}
        <section id="widgets-showcase" style={{ position: "relative", zIndex: 2, padding: "80px 0", background: "transparent" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", paddingInline: "5%" }}>
            <div className="tc" style={{ marginBottom: 56 }}>
              <div className="stag rv">
                <span className="stag-dot" />
                {tr.landing.widgetsTag}
              </div>
              <h2 className="st rv d1 font-semibold">
                {tr.landing.widgetsTitle}
              </h2>
              <p className="ssub rv d2">
                {tr.landing.widgetsSubtitle}
              </p>
            </div>
          </div>
          {(() => {
            const widgetIcons = ["📦", "🤝", "➕", "🔎", "🏷️", "🚚", "⬆️"];
            const widgetRgbs = ["168,85,247", "6,182,212", "16,185,129", "245,158,11", "236,72,153", "124,58,237", "79,70,229"];
            const widgetComponents = [<BuyMoreSaveMoreWidget />, <BuyTogetherWidget />, <AddonsWidget />, <RelatedProductsWidget />, <CouponWidget />, <FreeShippingThresholdWidget />, <ProductSwapWidget />];
            const wLabels = tr.landing.widgetLabels as { label: string; desc: string }[];
            const allWidgets = wLabels.map((wl, idx) => ({
              icon: widgetIcons[idx],
              label: wl.label,
              desc: wl.desc,
              widget: widgetComponents[idx],
              rgb: widgetRgbs[idx],
            }));
            const row1 = allWidgets.slice(0, 4);
            const row2 = [...allWidgets.slice(4), allWidgets[0], allWidgets[1], allWidgets[2]];

            const renderCard = (item: typeof allWidgets[0], key: number) => (
              <div key={key} style={{
                width: 280,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                padding: "16px",
                borderRadius: 16,
                background: "var(--s1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--b1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    direction: dir,
                    flexDirection: "row",
                    padding: "4px 0",
                  }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: `rgba(${item.rgb},.12)`,
                    border: `1px solid rgba(${item.rgb},.28)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                    boxShadow: `0 0 12px rgba(${item.rgb},.15)`,
                  }}>{item.icon}</div>
                  <div style={{ flex: 1, textAlign: lang === "ar" ? "right" : "left" }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 900,
                      color: `rgba(${item.rgb},1)`,
                      letterSpacing: "-0.3px",
                      lineHeight: 1.2,
                      textShadow: `0 0 20px rgba(${item.rgb},.35)`,
                    }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "var(--tm)", lineHeight: 1.55, marginTop: 4 }}>{item.desc}</div>
                  </div>
                </div>
                {item.widget}
              </div>
            );

            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div className="marquee-row">
                  <div className="marquee-track marquee-rtl" style={{ animationDuration: "32s", gap: 24, paddingInline: 12 }}>
                    {[...row1, ...row1, ...row1].map((item, i) => renderCard(item, i))}
                  </div>
                </div>
                <div className="marquee-row">
                  <div className="marquee-track marquee-ltr" style={{ animationDuration: "30s", gap: 24, paddingInline: 12 }}>
                    {[...row2, ...row2, ...row2].map((item, i) => renderCard(item, i))}
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
        {/* PERSONALIZATION DEMO */}
        <section id="demo">
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 56 }}>
              <SecTag>{tr.landing.personTag}</SecTag>
              <h2 className="st rv d1 font-semibold">
                {tr.landing.personTitle}
              </h2>
              <p className="ssub rv d2">
                {tr.landing.personSub}
              </p>
            </div>
            <div className="demo-grid">
              {/* MALE */}
              <div className="rv d1">
                <div className="demo-card">
                  <div className="demo-illo">
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 35%, #1e1245 0%, #0d0a22 55%, #060412 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img
                        src="/avatar-male.webp"
                        alt={
                          lang === "ar"
                            ? "ناصر — ملف شخصي تجريبي لتوصيات زيادة بالذكاء الاصطناعي"
                            : "Nasser — sample profile for Ziadah AI recommendations demo"
                        }
                        style={{ height: "100%", width: "auto", objectFit: "contain" }}
                      />
                    </div>
                    <div className="demo-fade" />
                    <div className="demo-pill">
                      <span className="demo-pill-dot" />
                      {tr.landing.aiAnalyzes1}
                    </div>
                    <div className="demo-shelf">
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(240,240,248,.1)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <ellipse
                              cx="11"
                              cy="14"
                              rx="7"
                              ry="4"
                              fill="rgba(240,240,248,.14)"
                              stroke="rgba(240,240,248,.55)"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M4 14 Q6 7 11 5 Q16 7 18 14"
                              fill="rgba(15,10,25,.5)"
                              stroke="rgba(240,240,248,.2)"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoMaleShelf1}</span>
                      </div>
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(168,85,247,.16)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <rect
                              x="4"
                              y="8"
                              width="14"
                              height="7"
                              rx="2.5"
                              fill="rgba(168,85,247,.2)"
                              stroke="rgba(168,85,247,.65)"
                              strokeWidth="1.2"
                            />
                            <circle
                              cx="8"
                              cy="11.5"
                              r="1.5"
                              fill="rgba(168,85,247,.6)"
                            />
                            <circle
                              cx="14"
                              cy="11.5"
                              r="1.5"
                              fill="rgba(168,85,247,.6)"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoMaleShelf2}</span>
                      </div>
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(6,182,212,.16)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <rect
                              x="8"
                              y="3"
                              width="6"
                              height="14"
                              rx="2.5"
                              fill="rgba(6,182,212,.18)"
                              stroke="rgba(6,182,212,.65)"
                              strokeWidth="1.2"
                            />
                            <ellipse
                              cx="11"
                              cy="17"
                              rx="3.5"
                              ry="2"
                              fill="rgba(6,182,212,.12)"
                              stroke="rgba(6,182,212,.45)"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoMaleShelf3}</span>
                      </div>
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(16,185,129,.16)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <ellipse
                              cx="7"
                              cy="13"
                              rx="3.5"
                              ry="3"
                              fill="rgba(16,185,129,.15)"
                              stroke="rgba(16,185,129,.55)"
                              strokeWidth="1.2"
                              transform="rotate(-12 7 13)"
                            />
                            <ellipse
                              cx="15"
                              cy="13"
                              rx="3.5"
                              ry="3"
                              fill="rgba(16,185,129,.15)"
                              stroke="rgba(16,185,129,.55)"
                              strokeWidth="1.2"
                              transform="rotate(12 15 13)"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoMaleShelf4}</span>
                      </div>
                    </div>
                  </div>
                  <div className="demo-info">
                    <div className="demo-top">
                      <div>
                        <div className="demo-name">{tr.landing.demoMaleName}</div>
                        <div className="demo-meta">{tr.landing.demoMaleMeta}</div>
                      </div>
                      <div className="demo-chip">{tr.landing.demoMaleChip}</div>
                    </div>
                    <div className="demo-sigs">
                      <div className="demo-sig">
                        <i
                          style={{
                            background: "#a855f7",
                            boxShadow: "0 0 6px #a855f7",
                          }}
                        />{" "}
                        {tr.landing.demoMaleSig1}
                      </div>
                      <div className="demo-sig">
                        <i
                          style={{
                            background: "#06b6d4",
                            boxShadow: "0 0 6px #06b6d4",
                          }}
                        />{" "}
                        {tr.landing.demoMaleSig2}
                      </div>
                      <div className="demo-sig">
                        <i
                          style={{
                            background: "#10b981",
                            boxShadow: "0 0 6px #10b981",
                          }}
                        />{" "}
                        {tr.landing.demoMaleSig3}
                      </div>
                    </div>
                    <div className="demo-sl">{tr.landing.aiSuggestions}</div>
                    <div className="demo-suggs">
                      <div className="demo-sugg">
                        <div
                          className="demo-si"
                          style={{
                            background: "rgba(240,240,248,.06)",
                            border: "1px solid rgba(240,240,248,.12)",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <ellipse
                              cx="9"
                              cy="12"
                              rx="5.5"
                              ry="3.5"
                              fill="rgba(240,240,248,.12)"
                              stroke="rgba(240,240,248,.4)"
                              strokeWidth="1"
                            />
                            <path
                              d="M3.5 12 Q5.5 5.5 9 3.5 Q12.5 5.5 14.5 12"
                              fill="rgba(15,10,30,.4)"
                              stroke="rgba(240,240,248,.18)"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                        <div className="demo-sb">
                          <div className="demo-sn">{tr.landing.demoMaleSugg1Name}</div>
                          <div className="demo-sw">
                            {tr.landing.demoMaleSugg1Sub}
                          </div>
                        </div>
                        <div className="demo-sp">{tr.landing.demoMaleSugg1Price}</div>
                      </div>
                      <div className="demo-sugg">
                        <div
                          className="demo-si"
                          style={{
                            background: "rgba(168,85,247,.07)",
                            border: "1px solid rgba(168,85,247,.15)",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <rect
                              x="3"
                              y="7"
                              width="12"
                              height="6"
                              rx="2"
                              fill="rgba(168,85,247,.15)"
                              stroke="rgba(168,85,247,.5)"
                              strokeWidth="1"
                            />
                            <circle
                              cx="6.5"
                              cy="10"
                              r="1.2"
                              fill="rgba(168,85,247,.5)"
                            />
                            <circle
                              cx="11.5"
                              cy="10"
                              r="1.2"
                              fill="rgba(168,85,247,.5)"
                            />
                          </svg>
                        </div>
                        <div className="demo-sb">
                          <div className="demo-sn">{tr.landing.demoMaleSugg2Name}</div>
                          <div className="demo-sw">
                            {tr.landing.demoMaleSugg2Sub}
                          </div>
                        </div>
                        <div className="demo-sp">{tr.landing.demoMaleSugg2Price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FEMALE */}
              <div className="rv d2">
                <div className="demo-card">
                  <div className="demo-illo">
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 40% 35%, #1f0a32 0%, #0f0818 55%, #060410 100%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img
                        src="/avatar-female.webp"
                        alt={
                          lang === "ar"
                            ? "نوره — ملف شخصي تجريبي لتوصيات زيادة بالذكاء الاصطناعي"
                            : "Noura — sample profile for Ziadah AI recommendations demo"
                        }
                        style={{ height: "100%", width: "auto", objectFit: "contain" }}
                      />
                    </div>
                    <div className="demo-fade" />
                    <div className="demo-pill">
                      <span className="demo-pill-dot" />
                      {tr.landing.aiAnalyzes2}
                    </div>
                    <div className="demo-shelf">
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(236,72,153,.16)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <rect
                              x="3"
                              y="6"
                              width="16"
                              height="11"
                              rx="2.5"
                              fill="rgba(236,72,153,.15)"
                              stroke="rgba(236,72,153,.6)"
                              strokeWidth="1.2"
                            />
                            <rect
                              x="5"
                              y="8"
                              width="4"
                              height="3"
                              rx="1"
                              fill="rgba(255,140,170,.3)"
                            />
                            <rect
                              x="10.5"
                              y="8"
                              width="4"
                              height="3"
                              rx="1"
                              fill="rgba(200,70,120,.3)"
                            />
                            <rect
                              x="5"
                              y="13"
                              width="9"
                              height="2"
                              rx="1"
                              fill="rgba(236,72,153,.25)"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoFemaleShelf1}</span>
                      </div>
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(245,158,11,.16)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <rect
                              x="9"
                              y="3"
                              width="4"
                              height="13"
                              rx="2"
                              fill="rgba(245,158,11,.18)"
                              stroke="rgba(245,158,11,.65)"
                              strokeWidth="1.2"
                            />
                            <ellipse
                              cx="11"
                              cy="16.5"
                              rx="3.5"
                              ry="2"
                              fill="rgba(245,158,11,.12)"
                              stroke="rgba(245,158,11,.45)"
                              strokeWidth="1"
                            />
                            <rect
                              x="9.5"
                              y="1.5"
                              width="3"
                              height="2.5"
                              rx=".8"
                              fill="rgba(245,158,11,.3)"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoFemaleShelf2}</span>
                      </div>
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(168,85,247,.16)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <rect
                              x="6"
                              y="4"
                              width="10"
                              height="12"
                              rx="2.5"
                              fill="rgba(168,85,247,.15)"
                              stroke="rgba(168,85,247,.6)"
                              strokeWidth="1.2"
                            />
                            <rect
                              x="8"
                              y="6"
                              width="6"
                              height="2"
                              rx="1"
                              fill="rgba(168,85,247,.4)"
                            />
                            <ellipse
                              cx="11"
                              cy="17"
                              rx="3.5"
                              ry="2"
                              fill="rgba(168,85,247,.1)"
                              stroke="rgba(168,85,247,.35)"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoFemaleShelf3}</span>
                      </div>
                      <div className="demo-prod">
                        <div
                          className="demo-ico"
                          style={{ background: "rgba(6,182,212,.16)" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              d="M5 7 Q5 3 11 3 Q17 3 17 7 L16.5 16 Q16.5 18 11 18 Q5.5 18 5.5 16Z"
                              fill="rgba(6,182,212,.12)"
                              stroke="rgba(6,182,212,.6)"
                              strokeWidth="1.2"
                            />
                            <line
                              x1="7"
                              y1="9"
                              x2="15"
                              y2="9"
                              stroke="rgba(6,182,212,.3)"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                        <span>{tr.landing.demoFemaleShelf4}</span>
                      </div>
                    </div>
                  </div>
                  <div className="demo-info">
                    <div className="demo-top">
                      <div>
                        <div className="demo-name">{tr.landing.demoFemaleName}</div>
                        <div className="demo-meta">{tr.landing.demoFemaleMeta}</div>
                      </div>
                      <div
                        className="demo-chip"
                        style={{
                          background: "rgba(236,72,153,.12)",
                          border: "1px solid rgba(236,72,153,.28)",
                          color: "#f9a8d4",
                        }}
                      >
                        {tr.landing.demoFemaleChip}
                      </div>
                    </div>
                    <div className="demo-sigs">
                      <div className="demo-sig">
                        <i
                          style={{
                            background: "#ec4899",
                            boxShadow: "0 0 6px #ec4899",
                          }}
                        />{" "}
                        {tr.landing.demoFemaleSig1}
                      </div>
                      <div className="demo-sig">
                        <i
                          style={{
                            background: "#a855f7",
                            boxShadow: "0 0 6px #a855f7",
                          }}
                        />{" "}
                        {tr.landing.demoFemaleSig2}
                      </div>
                      <div className="demo-sig">
                        <i
                          style={{
                            background: "#f59e0b",
                            boxShadow: "0 0 6px #f59e0b",
                          }}
                        />{" "}
                        {tr.landing.demoFemaleSig3}
                      </div>
                    </div>
                    <div className="demo-sl">{tr.landing.aiSuggestions}</div>
                    <div className="demo-suggs">
                      <div className="demo-sugg">
                        <div
                          className="demo-si"
                          style={{
                            background: "rgba(236,72,153,.07)",
                            border: "1px solid rgba(236,72,153,.15)",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <rect
                              x="2"
                              y="5"
                              width="14"
                              height="9"
                              rx="2"
                              fill="rgba(236,72,153,.12)"
                              stroke="rgba(236,72,153,.45)"
                              strokeWidth="1"
                            />
                            <rect
                              x="4"
                              y="7"
                              width="3"
                              height="2"
                              rx=".6"
                              fill="rgba(255,130,160,.3)"
                            />
                            <rect
                              x="8"
                              y="7"
                              width="3"
                              height="2"
                              rx=".6"
                              fill="rgba(200,70,120,.3)"
                            />
                          </svg>
                        </div>
                        <div className="demo-sb">
                          <div className="demo-sn">{tr.landing.demoFemaleSugg1Name}</div>
                          <div className="demo-sw">{tr.landing.demoFemaleSugg1Sub}</div>
                        </div>
                        <div className="demo-sp">289 ⃁</div>
                      </div>
                      <div className="demo-sugg">
                        <div
                          className="demo-si"
                          style={{
                            background: "rgba(168,85,247,.07)",
                            border: "1px solid rgba(168,85,247,.15)",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <rect
                              x="5"
                              y="3"
                              width="8"
                              height="11"
                              rx="2"
                              fill="rgba(168,85,247,.12)"
                              stroke="rgba(168,85,247,.4)"
                              strokeWidth="1"
                            />
                            <ellipse
                              cx="9"
                              cy="14.5"
                              rx="3"
                              ry="1.5"
                              fill="rgba(168,85,247,.08)"
                              stroke="rgba(168,85,247,.3)"
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                        <div className="demo-sb">
                          <div className="demo-sn">{tr.landing.demoFemaleSugg2Name}</div>
                          <div className="demo-sw">{tr.landing.demoFemaleSugg2Sub}</div>
                        </div>
                        <div className="demo-sp">449 ⃁</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* GOALS + PRESENTATIONS */}
        <section id="gp">
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 56 }}>
              <SecTag>{tr.landing.goalsTag}</SecTag>
              <h2 className="st rv d1 font-semibold">
                {tr.landing.goalsTitle}
              </h2>
              <p className="ssub rv d2">{tr.landing.goalsSub}</p>
            </div>
            <div className="gp-grid">
              <GlassCard className="rv d1">
                <div className="gp-card">
                  <div className="gp-hd">
                    <div className="gp-ico gp-ico-p">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <circle
                          cx="13"
                          cy="13"
                          r="9"
                          stroke="rgba(168,85,247,.45)"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="13"
                          cy="13"
                          r="5"
                          stroke="rgba(168,85,247,.65)"
                          strokeWidth="1.5"
                        />
                        <circle cx="13" cy="13" r="2" fill="#a855f7" />
                        <line
                          x1="13"
                          y1="2"
                          x2="13"
                          y2="6"
                          stroke="rgba(168,85,247,.4)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="13"
                          y1="20"
                          x2="13"
                          y2="24"
                          stroke="rgba(168,85,247,.4)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="2"
                          y1="13"
                          x2="6"
                          y2="13"
                          stroke="rgba(168,85,247,.4)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="20"
                          y1="13"
                          x2="24"
                          y2="13"
                          stroke="rgba(168,85,247,.4)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="gp-title">{tr.landing.goalsTitle1}</div>
                      <div className="gp-sub">{tr.landing.goalsSub1}</div>
                    </div>
                  </div>
                  <div className="gp-items">
                    {(tr.landing.goalsList as [string,string][]).map(([t, s]) => (
                      <div key={t} className="gp-row">
                        <div className="gdot gdot-p" />
                        <div>
                          <div className="gp-row-t">{t}</div>
                          <div className="gp-row-s">{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="rv d2">
                <div className="gp-card">
                  <div className="gp-hd">
                    <div className="gp-ico gp-ico-c">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <rect
                          x="3"
                          y="5"
                          width="20"
                          height="16"
                          rx="3"
                          fill="rgba(6,182,212,.1)"
                          stroke="rgba(6,182,212,.4)"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="6"
                          y="9"
                          width="6"
                          height="8"
                          rx="1.5"
                          fill="rgba(6,182,212,.2)"
                          stroke="rgba(6,182,212,.35)"
                          strokeWidth="1"
                        />
                        <rect
                          x="14"
                          y="9"
                          width="6"
                          height="3.5"
                          rx="1.5"
                          fill="rgba(6,182,212,.15)"
                          stroke="rgba(6,182,212,.3)"
                          strokeWidth="1"
                        />
                        <rect
                          x="14"
                          y="14.5"
                          width="6"
                          height="2.5"
                          rx="1"
                          fill="rgba(6,182,212,.2)"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="gp-title">{tr.landing.goalsTitle2}</div>
                      <div className="gp-sub">{tr.landing.goalsSub2}</div>
                    </div>
                  </div>
                  <div className="gp-items">
                    {(tr.landing.displayList as [string,string][]).map(([t, s]) => (
                      <div key={t} className="gp-row">
                        <div className="gdot gdot-c" />
                        <div>
                          <div className="gp-row-t">{t}</div>
                          <div className="gp-row-s">{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
              <GlassCard
                className="gp-banner rv"
              >
                <div className="gp-banner-ico">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect
                      x="5"
                      y="5"
                      width="20"
                      height="20"
                      rx="5"
                      fill="rgba(124,58,237,.15)"
                      stroke="rgba(168,85,247,.45)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="10.5"
                      cy="10.5"
                      r="2"
                      fill="rgba(168,85,247,.6)"
                    />
                    <circle
                      cx="19.5"
                      cy="10.5"
                      r="2"
                      fill="rgba(168,85,247,.6)"
                    />
                    <path
                      d="M10 18 Q15 22 20 18"
                      stroke="#a855f7"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <line
                      x1="15"
                      y1="1"
                      x2="15"
                      y2="5"
                      stroke="rgba(168,85,247,.4)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="15"
                      y1="25"
                      x2="15"
                      y2="29"
                      stroke="rgba(168,85,247,.4)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="15"
                      x2="5"
                      y2="15"
                      stroke="rgba(168,85,247,.4)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="25"
                      y1="15"
                      x2="29"
                      y2="15"
                      stroke="rgba(168,85,247,.4)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="gp-banner-t">
                    {tr.landing.autoBannerTitle}
                  </div>
                  <div className="gp-banner-d">
                    {tr.landing.autoBannerDesc}
                  </div>
                </div>
              </GlassCard>
              <GlassCard
                className="gp-banner rv d2"
              >
                <div className="gp-banner-ico">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect
                      x="5"
                      y="5"
                      width="20"
                      height="20"
                      rx="5"
                      fill="rgba(6,182,212,.1)"
                      stroke="rgba(6,182,212,.4)"
                      strokeWidth="1.5"
                    />
                    <line x1="10" y1="11" x2="20" y2="11" stroke="rgba(6,182,212,.4)" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="10" y1="15" x2="20" y2="15" stroke="rgba(6,182,212,.7)" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="10" y1="19" x2="16" y2="19" stroke="rgba(6,182,212,.4)" strokeWidth="1.4" strokeLinecap="round" />
                    <circle cx="22" cy="19" r="3" fill="rgba(6,182,212,.15)" stroke="rgba(6,182,212,.6)" strokeWidth="1.3" />
                    <line x1="22" y1="17.5" x2="22" y2="19" stroke="rgba(6,182,212,.8)" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="22" cy="19.8" r=".5" fill="rgba(6,182,212,.9)" />
                  </svg>
                </div>
                <div>
                  <div className="gp-banner-t">
                    {tr.landing.manualBannerTitle}
                  </div>
                  <div className="gp-banner-d">
                    {tr.landing.manualBannerDesc}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        {/* BEFORE / AFTER */}
        <section id="why">
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 56 }}>
              <SecTag>{tr.landing.whyTag}</SecTag>
              <h2 className="st rv d1 font-semibold">
                {tr.landing.whyTitle}
              </h2>
              <p className="ssub rv d2">{tr.landing.whySub}</p>
            </div>
            <div className="ba-grid">
              <GlassCard className="ba-card rv d1">
                <div className="ba-lbl ba-lbl-b text-[16px]">{tr.landing.beforeLabel}</div>
                <div className="ba-list">
                  {(tr.landing.beforeList as string[]).map((item) => (
                    <div key={item} className="ba-row ba-row-b">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="ba-foot ba-foot-b">{tr.landing.beforeFoot}</div>
              </GlassCard>
              <div className="ba-arrow-wrap rv d2">
                <div className="ba-arrow-circle">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M4 11H18M12 5L18 11L12 17"
                      stroke="#a855f7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <GlassCard
                className="ba-card rv d3"
                style={{
                  background: "rgba(88,28,220,.07)",
                  borderColor: "rgba(124,58,237,.2)",
                }}
              >
                <div className="ba-lbl ba-lbl-a text-[16px]">{tr.landing.afterLabel}</div>
                <div className="ba-list">
                  {(tr.landing.afterList as string[]).map((item) => (
                    <div key={item} className="ba-row ba-row-a">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="ba-foot ba-foot-a">
                  {tr.landing.afterFoot} <span style={{ fontSize: 24 }}>{tr.landing.afterFootValue}</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        {/* DETAILED REPORTS */}
        <section id="reports">
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 56 }}>
              <SecTag>{tr.landing.reportsTag}</SecTag>
              <h2 className="st rv d1 font-semibold">
                {tr.landing.reportsTitle}
              </h2>
              <p className="ssub rv d2">
                {tr.landing.reportsSub}
              </p>
            </div>

            <div className="reports-grid">
              {/* Campaign-level report card */}
              <GlassCard className="rv d1" style={{ padding: "var(--card-pad-lg)", minHeight: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="3" y="3" width="16" height="16" rx="3" fill="rgba(124,58,237,.12)" stroke="rgba(168,85,247,.45)" strokeWidth="1.4"/>
                      <line x1="7" y1="8" x2="15" y2="8" stroke="rgba(168,85,247,.4)" strokeWidth="1.3" strokeLinecap="round"/>
                      <line x1="7" y1="11" x2="15" y2="11" stroke="rgba(168,85,247,.7)" strokeWidth="1.6" strokeLinecap="round"/>
                      <line x1="7" y1="14" x2="11" y2="14" stroke="rgba(168,85,247,.4)" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>{tr.landing.reportsCampaignTitle}</div>
                    <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{tr.landing.reportsCampaignSub}</div>
                  </div>
                </div>

                {/* Campaign name bar */}
                <div style={{ padding: "10px 14px", background: "rgba(124,58,237,.06)", border: "1px solid rgba(124,58,237,.15)", borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 6px #a855f7" }}/>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{tr.landing.reportsCampaignName}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--p4)", fontWeight: 700, background: "rgba(168,85,247,.1)", border: "1px solid rgba(168,85,247,.2)", padding: "2px 10px", borderRadius: 50 }}>{tr.landing.reportsCampaignActive}</span>
                </div>

                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {(tr.landing.reportsCampaignStats as { label: string; value: string; sub?: string; icon: string }[]).map((s, i) => {
                    const colors = ["#06b6d4", "#a855f7", "#10b981", "#f59e0b"];
                    return (
                    <div key={i} style={{ padding: "14px 14px", background: "var(--s2)", border: "1px solid var(--b1)", borderRadius: 12 }}>
                      <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: colors[i], lineHeight: 1 }}>{s.value}</div>
                      {s.sub && <div style={{ fontSize: 11, color: "var(--td)", marginTop: 2 }}>{tr.landing.reportsRate} {s.sub}</div>}
                      <div style={{ fontSize: 11, color: "var(--td)", marginTop: 4 }}>{s.label}</div>
                    </div>
                  );
                  })}
                </div>

                {/* Mini trend bar */}
                <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(16,185,129,.05)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
                    <polyline points="2,20 10,16 18,14 26,10 34,8 42,5 54,2" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <polygon points="2,20 10,16 18,14 26,10 34,8 42,5 54,2 54,24 2,24" fill="rgba(16,185,129,.08)"/>
                  </svg>
                  <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>{tr.landing.reportsGrowth}</div>
                </div>
              </GlassCard>

              {/* Product-level report card */}
              <GlassCard className="rv d2" style={{ padding: "var(--card-pad-lg)", minHeight: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(6,182,212,.1)", border: "1px solid rgba(6,182,212,.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="3" y="12" width="4" height="7" rx="1.5" fill="rgba(6,182,212,.2)" stroke="rgba(6,182,212,.55)" strokeWidth="1.2"/>
                      <rect x="9" y="8" width="4" height="11" rx="1.5" fill="rgba(6,182,212,.35)" stroke="rgba(6,182,212,.65)" strokeWidth="1.2"/>
                      <rect x="15" y="4" width="4" height="15" rx="1.5" fill="rgba(6,182,212,.55)" stroke="rgba(6,182,212,.8)" strokeWidth="1.2"/>
                      <path d="M4.5 10.5 L11 7 L17 3.5" stroke="rgba(6,182,212,.4)" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>{tr.landing.reportsProductTitle}</div>
                    <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{tr.landing.reportsProductSub}</div>
                  </div>
                </div>

                {/* Product rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(tr.landing.reportsProducts as { name: string; clicks: string; clickRate: string; conv: string; convRate: string; sales: string }[]).map((p, i) => {
                    const pColors = ["#a855f7", "#06b6d4", "#10b981"];
                    const pColor = pColors[i] || "#a855f7";
                    return (
                    <div key={i} style={{ padding: "12px 14px", background: "var(--s2)", border: "1px solid var(--b1)", borderRadius: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: pColor, boxShadow: `0 0 6px ${pColor}`, flexShrink: 0 }}/>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 900, color: "#10b981" }}>{p.sales}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {[
                          { l: tr.landing.reportsClicksLabel, v: p.clicks, r: p.clickRate },
                          { l: tr.landing.reportsConvLabel, v: p.conv, r: p.convRate },
                        ].map((m, j) => (
                          <div key={j} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: "var(--td)" }}>{m.l}:</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t)" }}>{m.v}</span>
                            <span style={{ fontSize: 11, color: pColor, background: `rgba(${pColor === "#a855f7" ? "168,85,247" : pColor === "#06b6d4" ? "6,182,212" : "16,185,129"},.1)`, padding: "1px 6px", borderRadius: 50 }}>{m.r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                  })}
                </div>

                <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(124,58,237,.05)", border: "1px solid rgba(124,58,237,.12)", borderRadius: 10, fontSize: 12, color: "var(--tm)", textAlign: "center" }}>
                  {tr.landing.reportsFooter}
                </div>
              </GlassCard>
            </div>

            {/* Bottom banner */}
            <GlassCard className="reports-banner rv d3" style={{ marginTop: 16, padding: "28px 36px", display: "flex", alignItems: "center", gap: 24, background: "rgba(124,58,237,.05)", borderColor: "rgba(124,58,237,.18)" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <circle cx="13" cy="13" r="10" fill="rgba(124,58,237,.1)" stroke="rgba(168,85,247,.4)" strokeWidth="1.5"/>
                  <path d="M13 8v5l3 3" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="13" cy="13" r="1.5" fill="#a855f7"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{tr.landing.reportsBannerTitle}</div>
                <div style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7 }}>
                  {tr.landing.reportsBannerDesc}
                </div>
              </div>
              <div className="reports-banner-stats" style={{ display: "flex", gap: 20, flexShrink: 0, flexWrap: "wrap" }}>
                {(tr.landing.reportsBannerStats as { v: string; l: string }[]).map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "var(--p3)" }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "var(--td)", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
        {/* TESTIMONIALS */}
        <section id="testimonials" style={{ overflowX: "hidden", paddingInline: 0 }}>
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 56 }}>
              <SecTag>{tr.landing.testimonialsTag}</SecTag>
              <h2 className="st rv d1 font-semibold">
                {tr.landing.testimonialsTitle}
              </h2>
              <p className="ssub rv d2">
                {tr.landing.testimonialsSub}
              </p>
            </div>
          </div>
          <div className="marquee-row" style={{ marginBottom: 20 }}>
            <div className="marquee-track marquee-rtl" style={{ animationDuration: `${testimonialsRow1.length * 4}s` }}>
              {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
                <div key={i} className="gc tc-card-slim">
                  <div className="tc-stars">★★★★★</div>
                  <div className="tc-text">{t.text}</div>
                  <div className="tc-author">
                    <div className="tc-av" style={{ background: t.col }}>{t.av}</div>
                    <div>
                      <div className="tc-name">{t.name}</div>
                      <div className="tc-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="marquee-row">
            <div className="marquee-track marquee-ltr" style={{ animationDuration: `${testimonialsRow2.length * 4}s` }}>
              {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
                <div key={i} className="gc tc-card-slim">
                  <div className="tc-stars">★★★★★</div>
                  <div className="tc-text">{t.text}</div>
                  <div className="tc-author">
                    <div className="tc-av" style={{ background: t.col }}>{t.av}</div>
                    <div>
                      <div className="tc-name">{t.name}</div>
                      <div className="tc-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* PRICING */}
        <section id="pricing">
          <div className="wrap">
            <div className="tc" style={{ marginBottom: 24 }}>
              <SecTag>{tr.landing.pricingTag}</SecTag>
              <h2 className="st rv d1 font-semibold">{tr.landing.pricingTitle}</h2>
              <p className="ssub rv d2">
                {tr.landing.pricingSub}
              </p>
            </div>
            <div
              style={{ textAlign: "center", marginBottom: 48 }}
              className="rv d2"
            >
              <div className="ptog">
                <button
                  className={`ptb${pricingMode === "m" ? " on" : ""}`}
                  onClick={() => setPricingMode("m")}
                >
                  {tr.landing.monthly}
                </button>
                <button
                  className={`ptb${pricingMode === "y" ? " on" : ""}`}
                  onClick={() => setPricingMode("y")}
                >
                  {tr.landing.yearly}<span className="save-pill">{tr.landing.yearlyDiscount}</span>
                </button>
              </div>
            </div>
            <div className="pg">
              {[
                {
                  name: tr.landing.planStarter,
                  desc: tr.landing.planStarterDesc,
                  price: prices[pricingMode].s,
                  feat: false,
                  badge: null,
                  list: tr.landing.planStarterList as string[],
                  cta: tr.landing.subscribeNow,
                  fill: false,
                },
                {
                  name: tr.landing.planGrowth,
                  desc: tr.landing.planGrowthDesc,
                  price: prices[pricingMode].g,
                  feat: true,
                  badge: tr.landing.planGrowthBadge,
                  list: tr.landing.planGrowthList as string[],
                  cta: tr.landing.subscribeNow,
                  fill: true,
                },
                {
                  name: tr.landing.planPro,
                  desc: tr.landing.planProDesc,
                  price: prices[pricingMode].p,
                  feat: false,
                  badge: null,
                  list: tr.landing.planProList as string[],
                  cta: tr.landing.subscribeNow,
                  fill: false,
                },
                {
                  name: tr.landing.planBusiness,
                  desc: tr.landing.planBusinessDesc,
                  price: prices[pricingMode].b,
                  feat: false,
                  badge: null,
                  list: tr.landing.planBusinessList as string[],
                  cta: tr.landing.subscribeNow,
                  fill: false,
                },
              ].map((p, i) => (
                <GlassCard
                  key={i}
                  className={`pc rv d${i + 1}${p.feat ? " feat" : ""}`}
                >
                  {p.badge && <div className="pc-badge">{p.badge}</div>}
                  <div className="p-name">{p.name}</div>
                  <div className="p-desc">{p.desc}</div>
                  <div className="p-price">
                    {p.price != null ? (
                      <>
                        <span className="p-num">{p.price}</span>
                        <span className="p-cur">⃁</span>
                        <span className="p-per">
                          {tr.landing.perMonth}
                        </span>
                      </>
                    ) : (
                      <span
                        style={{ fontSize: 26, fontWeight: 900, lineHeight: 1 }}
                      >
                        {tr.landing.custom}
                      </span>
                    )}
                  </div>
                  <hr className="p-hr" />
                  <ul className="p-list">
                    {p.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <button
                      onClick={() => setPlatformModalOpen(true)}
                      className={`pbtn ${p.fill ? "pbtn-fill" : "pbtn-ghost"}`}
                      style={{ cursor: "pointer", border: "none", fontFamily: "inherit", width: "100%" }}
                    >
                      {p.cta}
                    </button>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
        {/* HELP CENTER */}
        <section id="faq">
          <div className="wrap">
            <SecTag>{tr.landing.faqTag}</SecTag>
            <h2 className="st rv d1 font-semibold" style={{ marginBottom: 48 }}>
              {tr.landing.faqTitle}
            </h2>
            <div className="hc-wrap">
              <GlassCard className="hc-left rv">
                <h3>{tr.landing.faqWeAreHere}</h3>
                <p>
                  {tr.landing.faqWeAreHereDesc}
                </p>
                <div className="hc-btns">
                  <a
                    href="https://api.whatsapp.com/send/?phone=966510131856"
                    target="_blank"
                    rel="noreferrer"
                    className="hcb hcb-wa"
                  >
                    <div className="hcb-ico hcb-wa">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 2C5.6 2 2 5.6 2 10C2 11.4 2.4 12.8 3 14L2 18L6 17C7.2 17.6 8.6 18 10 18C14.4 18 18 14.4 18 10C18 5.6 14.4 2 10 2ZM13.5 12.5C13.3 13 12.5 13.5 12 13.5C11.3 13.5 10.8 13.3 8.5 11.5C6.5 9.7 6 8.7 6 8C6 7.5 6.2 7 6.7 6.5C7 6.2 7.3 6 7.7 6C8 6 8.3 6.5 8.7 7.3C9 7.8 9.3 8.5 9.3 8.8C9.3 9 9 9.3 8.8 9.5C8.7 9.7 8.5 9.8 8.7 10.2C9 10.7 9.5 11.3 10 11.8C10.5 12.3 11 12.7 11.5 12.8C11.8 13 12 12.8 12.3 12.5C12.5 12.2 12.8 12 13 12C13.3 12 14 12.8 13.5 12.5Z"
                          fill="rgba(37,211,102,0.6)"
                        />
                      </svg>
                    </div>
                    <div>
                      <div>{tr.landing.faqWhatsapp}</div>
                      <div className="hcb-sub">{tr.landing.faqWhatsappSub}</div>
                    </div>
                  </a>
                  <a
                    href="https://calendar.app.google/pjtPBzs9TUPipUEF6"
                    target="_blank"
                    rel="noreferrer"
                    className="hcb hcb-cal"
                  >
                    <div className="hcb-ico hcb-cal">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect
                          x="3"
                          y="4"
                          width="14"
                          height="13"
                          rx="2"
                          fill="rgba(6,182,212,.12)"
                          stroke="rgba(6,182,212,.4)"
                          strokeWidth="1.2"
                        />
                        <line
                          x1="3"
                          y1="8"
                          x2="17"
                          y2="8"
                          stroke="rgba(6,182,212,.35)"
                          strokeWidth="1"
                        />
                        <line
                          x1="7"
                          y1="2"
                          x2="7"
                          y2="6"
                          stroke="rgba(6,182,212,.5)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="13"
                          y1="2"
                          x2="13"
                          y2="6"
                          stroke="rgba(6,182,212,.5)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <rect
                          x="6"
                          y="10"
                          width="3"
                          height="2.5"
                          rx=".5"
                          fill="rgba(6,182,212,.3)"
                        />
                        <rect
                          x="11"
                          y="10"
                          width="3"
                          height="2.5"
                          rx=".5"
                          fill="rgba(6,182,212,.3)"
                        />
                      </svg>
                    </div>
                    <div>
                      <div>{tr.landing.faqBookMeeting}</div>
                      <div className="hcb-sub">{tr.landing.faqBookMeetingSub}</div>
                    </div>
                  </a>
                  <a href="/support" className="hcb hcb-doc">
                    <div className="hcb-ico hcb-doc">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 3h6v14H4z"
                          fill="rgba(168,85,247,.12)"
                          stroke="rgba(168,85,247,.35)"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 3h6v14h-6z"
                          fill="rgba(168,85,247,.08)"
                          stroke="rgba(168,85,247,.3)"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="10"
                          y1="3"
                          x2="10"
                          y2="17"
                          stroke="rgba(168,85,247,.4)"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <div>
                      <div>{tr.landing.faqDocs}</div>
                      <div className="hcb-sub">{tr.landing.faqDocsSub}</div>
                    </div>
                  </a>
                </div>
              </GlassCard>
              <div className="faq-list">
                {faqs.map((f, i) => (
                  <div key={i} className={`fi rv d${(i % 2) + 1}`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{
                        background:
                          openFaq === i ? "rgba(124,58,237,.06)" : "var(--s1)",
                        border: `1px solid ${openFaq === i ? "rgba(124,58,237,.3)" : "var(--b1)"}`,
                        borderRadius: openFaq === i ? "14px 14px 0 0" : "14px",
                      }}
                    >
                      {f.q}
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "var(--s3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 17,
                          fontWeight: 300,
                          flexShrink: 0,
                          transform: openFaq === i ? "rotate(45deg)" : "none",
                          transition:
                            "transform .35s cubic-bezier(.34,1.56,.64,1)",
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      style={{
                        maxHeight: openFaq === i ? 400 : 0,
                        overflow: "hidden",
                        background: "rgba(124,58,237,.04)",
                        border:
                          openFaq === i
                            ? "1px solid rgba(124,58,237,.15)"
                            : "none",
                        borderTop: "none",
                        borderRadius: "0 0 14px 14px",
                        fontSize: 14,
                        color: "var(--tm)",
                        lineHeight: 1.8,
                        padding: openFaq === i ? "18px 22px" : 0,
                        transition: "max-height .38s ease,padding .25s",
                      }}
                    >
                      {f.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="cta-sec">
          <div className="wrap">
            <GlassCard className="cta-box rv">
              <div className="cta-glow" />
              <h2>
                {tr.landing.ctaTitle.split('\n').map((line: string, i: number) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p>
                {tr.landing.ctaDesc}
              </p>
              <div className="cta-btns">
                <button
                  onClick={() => setPlatformModalOpen(true)}
                  className="cta-btn cb-zid"
                  style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff" />
                  </svg>
                  {tr.landing.ctaBtn}
                </button>
              </div>
              <div className="cta-note text-[16px]">{tr.landing.ctaNote}</div>
            </GlassCard>
          </div>
        </section>
      </div>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
