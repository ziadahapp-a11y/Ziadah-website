import { useEffect, useState } from "react";
import { t } from "@/i18n/translations";
import { useParams } from "wouter";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { getSectorBySlug, getSectorSeoTitle } from "@/data/sectors";
import { getSectorVisuals } from "@/data/sectorVisuals";
import SectorVisualExamples from "@/components/SectorVisualExamples";
import { navigateTo } from "@/components/PageTransition";
import LandingSolutionsMatrix from "@/components/LandingSolutionsMatrix";
import WidgetsShowcaseSection from "@/components/WidgetsShowcaseSection";
import SectorAiMlHighlights from "@/components/SectorAiMlHighlights";
import SectorHubPlaybook from "@/components/SectorHubPlaybook";
import SectorPageRichSections from "@/components/SectorPageRichSections";
import SectorHtmlHero from "@/components/SectorHtmlHero";
import SectorDeliveryUseCases from "@/components/SectorDeliveryUseCases";
import { getSectorPageRich } from "@/data/sectorPageRich";
import "@/styles/sectorHtmlPage.css";

const SECTOR_SLUGS_WITH_PLATFORM_HUB = new Set(["delivery-apps", "ecommerce-platforms"]);

function SectionBlock({
  title,
  children,
  delayClass,
  sectionId,
}: {
  title: string;
  children: React.ReactNode;
  delayClass: string;
  sectionId?: string;
}) {
  return (
    <div id={sectionId} className={`gc rv ${delayClass}`} style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
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
  const pageRichEarly = getSectorPageRich(params.slug ?? "");
  const htmlPlaybook = Boolean(pageRichEarly?.htmlLayout);
  const [scrollProg, setScrollProg] = useState(0);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  useEffect(() => {
    if (!htmlPlaybook) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      setScrollProg(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [htmlPlaybook, params.slug]);

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
      <PageShell style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        
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
              background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
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
      </PageShell>
    );
  }

  const title = lang === "ar" ? sector.titleAr : sector.titleEn;
  const pc = t[lang].pageClosingCta;
  const ld = t[lang].landing;
  const tagline = lang === "ar" ? sector.taglineAr : sector.taglineEn;
  const pageRich = pageRichEarly;
  const slim = Boolean(pageRich?.slimSectorPage);
  const pageTitle = getSectorSeoTitle(sector, lang);
  const seoDesc = lang === "ar" ? sector.seoDescAr : sector.seoDescEn;
  const howTo = lang === "ar" ? sector.howToApplyAr : sector.howToApplyEn;
  const helps = lang === "ar" ? sector.howZiadahHelpsAr : sector.howZiadahHelpsEn;
  const experience = lang === "ar" ? sector.experienceAr : sector.experienceEn;
  const visualBundle = getSectorVisuals(sector.slug);
  const best = lang === "ar" ? sector.bestPracticesAr : sector.bestPracticesEn;
  const showPlatformHub = SECTOR_SLUGS_WITH_PLATFORM_HUB.has(sector.slug);
  const hubQuick = showPlatformHub
    ? [
        { id: "sector-ai-ml", labelAr: t.ar.sectorsPage.sectorHubAiNav, labelEn: t.en.sectorsPage.sectorHubAiNav },
        { id: "sector-store-playbook", labelAr: t.ar.sectorsPage.sectorHubPlaybookNav, labelEn: t.en.sectorsPage.sectorHubPlaybookNav },
      ]
    : [];
  const richQuick = pageRich
    ? [
        { id: "section-why", labelAr: tr.sectorNavWhy, labelEn: t.en.sectorsPage.sectorNavWhy },
        { id: "section-how-to", labelAr: tr.sectorNavPhases, labelEn: t.en.sectorsPage.sectorNavPhases },
        { id: "sector-ai-context", labelAr: tr.sectorNavAi, labelEn: t.en.sectorsPage.sectorNavAi },
        ...(sector.slug === "delivery-apps"
          ? [{ id: "section-usecases", labelAr: tr.sectorNavUseCases, labelEn: t.en.sectorsPage.sectorNavUseCases }]
          : []),
      ]
    : [];
  const quickSections = [
    ...richQuick,
    ...hubQuick,
    ...(!pageRich ? ([{ id: "section-how-to", labelAr: "التطبيق", labelEn: "Setup" }] as const) : []),
    ...(slim ? [] : ([{ id: "section-how-help", labelAr: "الحلول", labelEn: "Solutions" }] as const)),
    { id: "section-examples", labelAr: "الأمثلة", labelEn: "Examples" },
    ...(slim ? [] : ([{ id: "section-experience", labelAr: "التجربة", labelEn: "Experience" }] as const)),
    ...(pageRich
      ? ([
          ...(htmlPlaybook
            ? ([{ id: "section-metrics", labelAr: tr.sectorSectionMetrics, labelEn: t.en.sectorsPage.sectorSectionMetrics }] as const)
            : ([
                { id: "section-tracking", labelAr: tr.sectorNavTrack, labelEn: t.en.sectorsPage.sectorNavTrack },
                { id: "section-analytics", labelAr: tr.sectorNavAnalytics, labelEn: t.en.sectorsPage.sectorNavAnalytics },
              ] as const)),
          ...(slim ? [] : ([{ id: "section-best", labelAr: "أفضل الممارسات", labelEn: "Best Practices" }] as const)),
          { id: "section-sector-cta", labelAr: tr.sectorNavCta, labelEn: t.en.sectorsPage.sectorNavCta },
        ] as const)
      : slim
        ? ([] as const)
        : ([{ id: "section-best", labelAr: "أفضل الممارسات", labelEn: "Best Practices" }] as const)),
  ] as const;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />

        {htmlPlaybook && pageRich ? (
          <>
            <div className="sector-html-prog" style={{ width: `${scrollProg}%` }} aria-hidden />
            <div className="sector-html">
              <SectorHtmlHero rich={pageRich} sectorTitle={title} sectorsBreadcrumb={tr.breadcrumbSectors} onScrollTo={scrollToSection} />
              <div
                className="rv d2 sector-page-quicknav"
                style={{
                  padding: "20px 0 20px",
                  maxWidth: 1200,
                  margin: "0 auto",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  borderBottom: "1px solid var(--b1)",
                }}
              >
                {quickSections.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      borderRadius: 999,
                      border: "1px solid rgba(253, 253, 252, 0.14)",
                      background: "transparent",
                      color: "var(--t)",
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "9px 14px",
                      fontFamily: "var(--font)",
                      cursor: "pointer",
                      boxShadow: "none",
                      transition: "border-color .2s, transform .15s",
                    }}
                  >
                    {lang === "ar" ? item.labelAr : item.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <section
            className="sector-page-hero page-hero-viewport page-hero-viewport--center"
            style={{
              position: "relative",
              zIndex: 2,
              borderBottom: "1px solid var(--b1)",
            }}
          >
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
            <div className="stag rv" style={{ display: "inline-flex" }}>
              <span className="stag-dot" />
              {tr.breadcrumbSectors}
            </div>
            <div className="rv d1" style={{ fontSize: 52, marginTop: 12, marginBottom: 8 }}>
              {sector.icon}
            </div>
            {pageRich ? (
              <>
                <div className="stag rv d1" style={{ display: "inline-flex", marginBottom: 6 }}>
                  <span className="stag-dot" />
                  {tr.sectorHeroSectorLabel}: {title}
                </div>
                <h1 className="st rv d1" style={{ fontSize: "clamp(28px,3.5vw,40px)", marginTop: 0, marginBottom: 10 }}>
                  {lang === "ar" ? pageRich.heroHeadlineAr : pageRich.heroHeadlineEn}
                </h1>
                <p className="ssub rv d2" style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--tm)", maxWidth: 620, textAlign: "center", lineHeight: 1.55 }}>
                  {lang === "ar" ? pageRich.heroSubAr : pageRich.heroSubEn}
                </p>
                <div
                  className="rv d2"
                  style={{
                    marginTop: 22,
                    width: "100%",
                    maxWidth: 440,
                    borderRadius: 20,
                    border: "1px solid var(--b2)",
                    background: "linear-gradient(165deg, rgba(124,58,237,.12), rgba(124,58,237,.03))",
                    boxShadow: "0 12px 40px rgba(0,0,0,.08)",
                    padding: "14px 16px 16px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    direction: dir,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--p)", marginBottom: 8 }}>{tr.sectorPhoneOrders}</div>
                    <div style={{ fontSize: 13, color: "var(--t)", lineHeight: 1.55, fontWeight: 600 }}>
                      {pageRich.phoneOrders.map((line, i) => (
                        <div key={i} style={{ marginBottom: 6 }}>
                          {lang === "ar" ? line.ar : line.en}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--p)", marginBottom: 8 }}>{tr.sectorPhoneRecs}</div>
                    <div style={{ fontSize: 13, color: "var(--t)", lineHeight: 1.55, fontWeight: 600 }}>
                      {pageRich.phoneRecs.map((line, i) => (
                        <div key={i} style={{ marginBottom: 6 }}>
                          {lang === "ar" ? line.ar : line.en}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="st rv d1" style={{ fontSize: "clamp(28px,3.5vw,40px)", marginTop: 0, marginBottom: 10 }}>
                  {title}
                </h1>
                <p className="ssub rv d2" style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--tm)", maxWidth: 560, textAlign: "center", lineHeight: 1.55 }}>
                  {tagline}
                </p>
              </>
            )}
            <div
              className="rv d2 sector-page-quicknav"
              style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 720 }}
            >
              {quickSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(253, 253, 252, 0.14)",
                    background: "transparent",
                    color: "var(--t)",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "9px 14px",
                    fontFamily: "var(--font)",
                    cursor: "pointer",
                    boxShadow: "none",
                    transition: "border-color .2s, transform .15s",
                  }}
                >
                  {lang === "ar" ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
            </div>
          </section>
        )}

        <article
          className={htmlPlaybook ? "sector-html sector-html--compact" : undefined}
          style={{
            position: "relative",
            zIndex: 2,
            padding: "28px var(--page-inline-pad) 100px",
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {pageRich ? <SectorPageRichSections rich={pageRich} part="top" /> : null}
          <SectionBlock title={tr.sectionHowToApply} delayClass="d1" sectionId="section-how-to">
            {sector.useCardLayout && sector.howToPhaseCards?.length ? (
              <div
                style={{
                  display: "grid",
                  gap: 14,
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                }}
              >
                {sector.howToPhaseCards.map((card, i) => (
                  <div key={i} className="gc rv" style={{ padding: 0, marginBottom: 0 }}>
                    <div className="shine" />
                    <div style={{ padding: "18px 18px 20px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 22, lineHeight: 1 }} aria-hidden>
                          {card.emoji}
                        </span>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: 16,
                            fontWeight: 800,
                            color: "var(--p)",
                            lineHeight: 1.35,
                          }}
                        >
                          {lang === "ar" ? card.titleAr : card.titleEn}
                        </h3>
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          paddingInlineStart: 20,
                          color: "var(--td)",
                          lineHeight: 1.7,
                          fontSize: 14,
                        }}
                      >
                        {(slim ? (lang === "ar" ? card.bulletsAr : card.bulletsEn).slice(0, 2) : lang === "ar" ? card.bulletsAr : card.bulletsEn).map((b, j) => (
                          <li key={j} style={{ marginBottom: 8 }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ol style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
                {howTo.map((line, i) => (
                  <li key={i} style={{ marginBottom: 10 }}>
                    {line}
                  </li>
                ))}
              </ol>
            )}
          </SectionBlock>

          {showPlatformHub ? <SectorAiMlHighlights /> : null}
          {pageRich ? <SectorPageRichSections rich={pageRich} part="ai" /> : null}
          {sector.slug === "delivery-apps" && pageRich ? <SectorDeliveryUseCases /> : null}

          {!slim ? (
          <SectionBlock title={tr.sectionHowZiadah} delayClass="d2" sectionId="section-how-help">
            {sector.useCardLayout && sector.helpCards?.length ? (
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                }}
              >
                {sector.helpCards.map((hc, i) => (
                  <div key={i} className="gc rv" style={{ padding: 0, marginBottom: 0 }}>
                    <div className="shine" />
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "16px 18px 18px" }}>
                      <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }} aria-hidden>
                        {hc.emoji}
                      </span>
                      <p style={{ margin: 0, fontSize: 14, color: "var(--td)", lineHeight: 1.65 }}>
                        {lang === "ar" ? hc.bodyAr : hc.bodyEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
                {helps.map((line, i) => (
                  <li key={i} style={{ marginBottom: 10 }}>
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </SectionBlock>
          ) : null}

          {showPlatformHub && visualBundle ? <SectorHubPlaybook bundle={visualBundle} sectorSlug={sector.slug} /> : null}
          {showPlatformHub && !visualBundle && !(htmlPlaybook && SECTOR_SLUGS_WITH_PLATFORM_HUB.has(sector.slug)) ? (
            <>
              <LandingSolutionsMatrix variant="sector" />
              <WidgetsShowcaseSection variant="sector" sectorSlug={sector.slug} />
            </>
          ) : null}

          {!showPlatformHub && visualBundle ? (
            <div id="section-examples" className={`gc rv d3`} style={{ padding: 0, marginBottom: 20, scrollMarginTop: 120 }}>
              <div className="shine" />
              <div style={{ padding: "22px 24px 8px" }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--p)", marginBottom: 4, marginTop: 0 }}>{tr.sectionExamples}</h2>
              </div>
              <div style={{ padding: "0 24px 26px" }}>
                <SectorVisualExamples bundle={visualBundle} sectorSlug={sector.slug} />
              </div>
            </div>
          ) : null}
          {!showPlatformHub && !visualBundle ? (
            <SectionBlock title={tr.sectionExamples} delayClass="d3" sectionId="section-examples">
              <ul style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
                {(lang === "ar" ? sector.examplesAr : sector.examplesEn).map((line, i) => (
                  <li key={i} style={{ marginBottom: 10 }}>
                    {line}
                  </li>
                ))}
              </ul>
            </SectionBlock>
          ) : null}

          {!slim ? (
            <SectionBlock title={tr.sectionExperience} delayClass="d1" sectionId="section-experience">
              {sector.useCardLayout ? (
                <div
                  className="gc rv"
                  style={{
                    padding: 0,
                    marginBottom: 0,
                    borderInlineStart: "4px solid rgba(124, 58, 237, 0.55)",
                  }}
                >
                  <div className="shine" />
                  <div style={{ padding: "22px 24px 24px" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        color: "var(--tm)",
                        lineHeight: 1.85,
                      }}
                    >
                      {experience}
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: 15, color: "var(--tm)", lineHeight: 1.8 }}>
                  {experience}
                </p>
              )}
            </SectionBlock>
          ) : null}

          {pageRich ? <SectorPageRichSections rich={pageRich} part="bottom" /> : null}

          {!slim ? (
            <SectionBlock title={tr.sectionBestPractices} delayClass="d1" sectionId="section-best">
              {sector.useCardLayout && sector.bestCards?.length ? (
                <div
                  style={{
                    display: "grid",
                    gap: 12,
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                  }}
                >
                  {sector.bestCards.map((bc, i) => (
                    <div key={i} className="gc rv" style={{ padding: 0, marginBottom: 0 }}>
                      <div className="shine" />
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px 16px" }}>
                        <span style={{ fontSize: 18, lineHeight: 1.25, flexShrink: 0 }} aria-hidden>
                          {bc.emoji}
                        </span>
                        <p style={{ margin: 0, fontSize: 14, color: "var(--td)", lineHeight: 1.65 }}>
                          {lang === "ar" ? bc.textAr : bc.textEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul style={{ margin: 0, paddingInlineStart: 22, color: "var(--td)", lineHeight: 1.75, fontSize: 15 }}>
                  {best.map((line, i) => (
                    <li key={i} style={{ marginBottom: 10 }}>
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </SectionBlock>
          ) : null}

          {pageRich ? <SectorPageRichSections rich={pageRich} part="foot" /> : null}

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
        <PageClosingCta
          title={lang === "ar" ? `جاهز تفعّل زيادة في قطاع ${title}؟` : `Ready to activate Ziadah for ${title}?`}
          description={pc.sectorDetailDesc}
          buttonLabel={ld.ctaBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
