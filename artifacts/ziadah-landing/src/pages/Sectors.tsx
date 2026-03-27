import { useEffect } from "react";
import { t } from "@/i18n/translations";
import Nav from "@/components/Nav";
import ParticleBackground from "@/components/ParticleBackground";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { sectors } from "@/data/sectors";
import { navigateTo } from "@/components/PageTransition";

export default function Sectors() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang].sectorsPage;
  const pk = getPageKeywords("/sectors");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <SEO
        titleAr={t.ar.sectorsPage.seoTitle}
        titleEn={t.en.sectorsPage.seoTitle}
        descriptionAr={t.ar.sectorsPage.seoDesc}
        descriptionEn={t.en.sectorsPage.seoDesc}
        canonical="/sectors"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: tr.breadcrumbHome, url: "/" },
          { name: tr.breadcrumbSectors, url: "/sectors" },
        ]}
      />
      <WebPageSchema
        name={lang === "ar" ? t.ar.sectorsPage.seoTitle : t.en.sectorsPage.seoTitle}
        description={lang === "ar" ? t.ar.sectorsPage.seoDesc : t.en.sectorsPage.seoDesc}
        url="/sectors"
      />
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

        <section
          style={{
            paddingTop: "var(--page-hero-pt)",
            paddingBottom: 40,
            textAlign: "center",
            position: "relative",
            zIndex: 2,
            paddingInline: "var(--page-inline-pad)",
          }}
        >
          <div className="stag rv" style={{ display: "inline-flex" }}>
            <span className="stag-dot" />
            {tr.heroTag}
          </div>
          <h1 className="st rv d1" style={{ fontSize: "clamp(32px,4vw,52px)", marginTop: 8 }}>
            {tr.heroTitle}
          </h1>
          <p className="ssub rv d2" style={{ margin: "0 auto", maxWidth: 720 }}>
            {tr.heroSub}
          </p>
        </section>

        <section style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 100px" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {sectors.map((s, i) => {
              const title = lang === "ar" ? s.titleAr : s.titleEn;
              const tag = lang === "ar" ? s.taglineAr : s.taglineEn;
              return (
                <a
                  key={s.slug}
                  href={`/sectors/${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/sectors/${s.slug}`);
                  }}
                  className={`gc rv d${(i % 3) + 1}`}
                  style={{
                    padding: 0,
                    textAlign: dir === "rtl" ? "right" : "left",
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    fontFamily: "var(--font)",
                    color: "inherit",
                    textDecoration: "none",
                    position: "relative",
                    zIndex: 3,
                    pointerEvents: "auto",
                    display: "block",
                  }}
                >
                  <div className="shine" />
                  <div style={{ padding: "24px 22px 26px" }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--t)", marginBottom: 8 }}>{title}</div>
                    <div style={{ fontSize: 14, color: "var(--td)", lineHeight: 1.55, marginBottom: 16 }}>{tag}</div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--p)",
                      }}
                    >
                      {tr.cardCta} →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
