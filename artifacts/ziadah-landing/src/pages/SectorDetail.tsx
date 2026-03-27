import { useEffect } from "react";
import { t } from "@/i18n/translations";
import { useParams } from "wouter";
import Nav from "@/components/Nav";
import ParticleBackground from "@/components/ParticleBackground";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getSectorBySlug, getSectorSeoTitle } from "@/data/sectors";
import { getSectorVisuals } from "@/data/sectorVisuals";
import SectorVisualExamples from "@/components/SectorVisualExamples";
import { navigateTo } from "@/components/PageTransition";

function SectionBlock({
  title,
  children,
  delayClass,
}: {
  title: string;
  children: React.ReactNode;
  delayClass: string;
}) {
  return (
    <div className={`gc rv ${delayClass}`} style={{ padding: 0, marginBottom: 20 }}>
      <div className="shine" />
      <div style={{ padding: "22px 24px 26px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 14, marginTop: 0 }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default function SectorDetail() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang].sectorsPage;
  const params = useParams<{ slug: string }>();
  const sector = params.slug ? getSectorBySlug(params.slug) : undefined;
  const pk = getPageKeywords(`/sectors/${params.slug ?? ""}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

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
  }, [params.slug]);

  if (!sector) {
    return (
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          fontFamily: "var(--font)",
          direction: dir,
          color: "var(--t)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="bg-wrap">
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />
          <div className="bg-grid" />
        </div>
        <div className="noise" />
        <Nav />
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>📂</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>{tr.notFoundTitle}</h1>
          <p style={{ color: "var(--td)", marginBottom: 24, maxWidth: 400, marginInline: "auto" }}>{tr.notFoundDesc}</p>
          <button
            type="button"
            onClick={() => navigateTo("/sectors")}
            style={{
              padding: "12px 28px",
              borderRadius: 50,
              background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "var(--font)",
            }}
          >
            {tr.notFoundBtn}
          </button>
        </div>
      </div>
    );
  }

  const title = lang === "ar" ? sector.titleAr : sector.titleEn;
  const tagline = lang === "ar" ? sector.taglineAr : sector.taglineEn;
  const pageTitle = getSectorSeoTitle(sector, lang);
  const seoDesc = lang === "ar" ? sector.seoDescAr : sector.seoDescEn;
  const howTo = lang === "ar" ? sector.howToApplyAr : sector.howToApplyEn;
  const helps = lang === "ar" ? sector.howZiadahHelpsAr : sector.howZiadahHelpsEn;
  const experience = lang === "ar" ? sector.experienceAr : sector.experienceEn;
  const visualBundle = getSectorVisuals(sector.slug);
  const best = lang === "ar" ? sector.bestPracticesAr : sector.bestPracticesEn;

  return (
    <>
      <SEO
        titleAr={getSectorSeoTitle(sector, "ar")}
        titleEn={getSectorSeoTitle(sector, "en")}
        descriptionAr={sector.seoDescAr}
        descriptionEn={sector.seoDescEn}
        canonical={`/sectors/${sector.slug}`}
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: tr.breadcrumbHome, url: "/" },
          { name: tr.breadcrumbSectors, url: "/sectors" },
          { name: title, url: `/sectors/${sector.slug}` },
        ]}
      />
      <WebPageSchema name={pageTitle} description={seoDesc} url={`/sectors/${sector.slug}`} />
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
            paddingBottom: 28,
            position: "relative",
            zIndex: 2,
            paddingInline: "var(--page-inline-pad)",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div className="stag rv" style={{ display: "inline-flex" }}>
            <span className="stag-dot" />
            {tr.breadcrumbSectors}
          </div>
          <div className="rv d1" style={{ fontSize: 52, marginTop: 12, marginBottom: 8 }}>
            {sector.icon}
          </div>
          <h1 className="st rv d1" style={{ fontSize: "clamp(28px,3.5vw,40px)", marginTop: 0, marginBottom: 10 }}>
            {title}
          </h1>
          <p className="ssub rv d2" style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--tm)" }}>
            {tagline}
          </p>
        </section>

        <article style={{ position: "relative", zIndex: 2, padding: "0 var(--page-inline-pad) 100px", maxWidth: 1200, margin: "0 auto" }}>
          <SectionBlock title={tr.sectionHowToApply} delayClass="d1">
            <ol style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
              {howTo.map((line, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  {line}
                </li>
              ))}
            </ol>
          </SectionBlock>

          <SectionBlock title={tr.sectionHowZiadah} delayClass="d2">
            <ul style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
              {helps.map((line, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  {line}
                </li>
              ))}
            </ul>
          </SectionBlock>

          {visualBundle ? (
            <div className={`gc rv d3`} style={{ padding: 0, marginBottom: 20 }}>
              <div className="shine" />
              <div style={{ padding: "22px 24px 8px" }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 4, marginTop: 0 }}>{tr.sectionExamples}</h2>
              </div>
              <div style={{ padding: "0 24px 26px" }}>
                <SectorVisualExamples bundle={visualBundle} />
              </div>
            </div>
          ) : (
            <SectionBlock title={tr.sectionExamples} delayClass="d3">
              <ul style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
                {(lang === "ar" ? sector.examplesAr : sector.examplesEn).map((line, i) => (
                  <li key={i} style={{ marginBottom: 10 }}>
                    {line}
                  </li>
                ))}
              </ul>
            </SectionBlock>
          )}

          <SectionBlock title={tr.sectionExperience} delayClass="d1">
            <p style={{ margin: 0, fontSize: 15, color: "var(--tm)", lineHeight: 1.8 }}>
              {experience}
            </p>
          </SectionBlock>

          <SectionBlock title={tr.sectionBestPractices} delayClass="d1">
            <ul style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
              {best.map((line, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  {line}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <div className="rv d2" style={{ textAlign: "center", marginTop: 32 }}>
            <button
              type="button"
              onClick={() => navigateTo("/sectors")}
              style={{
                padding: "14px 28px",
                borderRadius: 50,
                background: "transparent",
                border: "1px solid var(--b2)",
                color: "var(--t)",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "var(--font)",
                marginInlineEnd: 12,
              }}
            >
              ← {tr.breadcrumbSectors}
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
