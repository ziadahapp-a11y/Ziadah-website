import { useEffect, useState } from "react";
import { t } from "@/i18n/translations";
import { useParams } from "wouter";
import PageShell from "@/components/PageShell";
import { PageRail, PageProgress } from "@/components/PageRail";
import { HeroLede, Section as DsSection } from "@/sections";
import { Shell, Button as MkButton } from "@/components/mk";
import { getMotionRuntime, scrollToTarget } from "@/motion/runtime";
import { getAnchorScrollTopOffset } from "@/utils/anchorScroll";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import SEO from "@/components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema, SoftwareAppSchema } from "@/components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorBySlug, getSectorSeoTitle } from "@/data/sectors";
import { getSectorVisuals } from "@/data/sectorVisuals";
import SectorVisualExamples from "@/components/SectorVisualExamples";
import { navigateTo } from "@/components/PageTransition";
import SectorAiMlHighlights from "@/components/SectorAiMlHighlights";
import SectorHubPlaybook from "@/components/SectorHubPlaybook";
import SectorPageRichSections from "@/components/SectorPageRichSections";
import SectorHtmlHero from "@/components/SectorHtmlHero";
import SectorDeliveryUseCases from "@/components/SectorDeliveryUseCases";
import { getSectorPageRich } from "@/data/sectorPageRich";
import "@/styles/sectorHtmlPage.css";
import { t as siteTranslations } from "@/i18n/translations";

const SECTOR_SLUGS_WITH_PLATFORM_HUB = new Set(["delivery-apps", "ecommerce-platforms"]);

function SectionBlock({
  title,
  eyebrow,
  children,
  delayClass,
  sectionId,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  delayClass: string;
  sectionId?: string;
}) {
  return (
    <section id={sectionId} className={`rv ${delayClass} sector-block`}>
      {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-head-title--md">{title}</h2>
      {children}
    </section>
  );
}

export default function SectorDetail() {
  const t = siteTranslations;
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
      <div className="page">
        <DsSection family="grey" className="min-h-[70vh] flex items-center">
          <Shell width="narrow">
            <div className="text-center">
              <h1 className="section-head-title--sm mb-4">{tr.notFoundTitle}</h1>
              <p className="t-body-18 mb-8">{tr.notFoundDesc}</p>
              <MkButton onClick={() => navigateTo("/sectors")}>{tr.notFoundBtn}</MkButton>
            </div>
          </Shell>
        </DsSection>
      </div>
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

  /* `quickSections` carries `labelAr`/`labelEn`; the shared rail speaks
     `ar`/`en`. Mapped here rather than renaming the section list, which the
     hero's own jump links also read. */
  const railItems = quickSections.map((q) => ({ id: q.id, ar: q.labelAr, en: q.labelEn }));

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollToTarget(getMotionRuntime(), el, -getAnchorScrollTopOffset());
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
      <PageShell className="relative overflow-x-clip">

        {htmlPlaybook && pageRich ? (
          <>
            <PageProgress value={scrollProg} />
            <div className="sector-html">
              <SectorHtmlHero rich={pageRich} sectorTitle={title} sectorsBreadcrumb={tr.breadcrumbSectors} onScrollTo={scrollToSection} />
              <PageRail items={railItems} />
            </div>
          </>
        ) : (
          <>
            <HeroLede
              family="violet"
              eyebrow={
                <>
                  <span aria-hidden="true">{sector.icon}</span> {tr.breadcrumbSectors}
                </>
              }
              title={pageRich ? (lang === "ar" ? pageRich.heroHeadlineAr : pageRich.heroHeadlineEn) : title}
              body={pageRich ? (lang === "ar" ? pageRich.heroSubAr : pageRich.heroSubEn) : tagline}
            >
              {pageRich ? (
                /* The two columns are the sector's own evidence — what its
                   orders look like, and what Ziadah suggests against them —
                   so they sit inside the hero rather than in a band below it. */
                <div dir={dir} className="sector-hero-cols">
                  {[
                    { label: tr.sectorPhoneOrders, lines: pageRich.phoneOrders },
                    { label: tr.sectorPhoneRecs, lines: pageRich.phoneRecs },
                  ].map((col) => (
                    <div key={col.label} className="sector-hero-col">
                      <p className="t-eyebrow">{col.label}</p>
                      <ul className="sector-hero-lines">
                        {col.lines.map((line, i) => (
                          <li key={i}>{lang === "ar" ? line.ar : line.en}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </HeroLede>

            <PageRail items={railItems} />
          </>
        )}

        <article
          className={`${htmlPlaybook ? "sector-html sector-html--compact " : ""}px-4`}
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: 48,
            paddingBottom: 96,
            maxWidth: 1152,
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
                className="grid gap-3.5"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))" }}
              >
                {sector.howToPhaseCards.map((card, i) => (
                  <div
                    key={i}
                    className={`rv d${(i % 3) + 1} sector-card`}
                  >
                    <div className="flex items-start gap-2.5 mb-3">
                      <h3 className="sector-card-title">
                        {lang === "ar" ? card.titleAr : card.titleEn}
                      </h3>
                    </div>
                    <ul className="sector-list sector-list--sm">
                      {(slim ? (lang === "ar" ? card.bulletsAr : card.bulletsEn).slice(0, 2) : lang === "ar" ? card.bulletsAr : card.bulletsEn).map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ol className="sector-list">
                {howTo.map((line, i) => (
                  <li key={i}>{line}</li>
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
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}
              >
                {sector.helpCards.map((hc, i) => (
                  <div
                    key={i}
                    className={`rv d${(i % 3) + 1} sector-card flex items-start gap-3`}
                  >
                    <p className="sector-card-text">
                      {lang === "ar" ? hc.bodyAr : hc.bodyEn}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="sector-list">
                {helps.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </SectionBlock>
          ) : null}

          {/* `showPlatformHub` is true only for `delivery-apps` and
              `ecommerce-platforms`, and `sectorVisuals.ts` carries a bundle for
              both, so the fallback that used to sit here -
              `showPlatformHub && !visualBundle` - could never be true. It
              rendered `LandingSolutionsMatrix` and the widget marquee on zero
              routes. Both are gone; the playbook below is what these two
              sectors have always actually shown. */}
          {showPlatformHub && visualBundle ? <SectorHubPlaybook bundle={visualBundle} /> : null}

          {!showPlatformHub && visualBundle ? (
            <div
              id="section-examples"
              className="rv d3 sector-block"
              style={{ marginBottom: 20, scrollMarginTop: 120 }}
            >
              <h2 className="section-head-title--sm mb-5">{tr.sectionExamples}</h2>
              <SectorVisualExamples bundle={visualBundle} />
            </div>
          ) : null}
          {!showPlatformHub && !visualBundle ? (
            <SectionBlock title={tr.sectionExamples} delayClass="d3" sectionId="section-examples">
              <ul className="sector-list">
                {(lang === "ar" ? sector.examplesAr : sector.examplesEn).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </SectionBlock>
          ) : null}

          {!slim ? (
            <SectionBlock title={tr.sectionExperience} delayClass="d1" sectionId="section-experience">
              {sector.useCardLayout ? (
                <div className="rv sector-experience">
                  <p className="sector-card-text">{experience}</p>
                </div>
              ) : (
                <p className="sector-card-text">{experience}</p>
              )}
            </SectionBlock>
          ) : null}

          {pageRich ? <SectorPageRichSections rich={pageRich} part="bottom" /> : null}

          {!slim ? (
            <SectionBlock title={tr.sectionBestPractices} delayClass="d1" sectionId="section-best">
              {sector.useCardLayout && sector.bestCards?.length ? (
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}
                >
                  {sector.bestCards.map((bc, i) => (
                    <div
                      key={i}
                      className={`rv d${(i % 3) + 1} sector-card flex items-start gap-2.5`}
                    >
                      <p className="sector-card-text">
                        {lang === "ar" ? bc.textAr : bc.textEn}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="sector-list">
                  {best.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </SectionBlock>
          ) : null}

          {pageRich ? <SectorPageRichSections rich={pageRich} part="foot" /> : null}

          <div className="rv d2 text-center mt-8">
            <MkButton variant="tertiary" onClick={() => navigateTo("/sectors")}>
              <span aria-hidden>{dir === "rtl" ? "→" : "←"}</span>
              <span className="ms-2">{tr.breadcrumbSectors}</span>
            </MkButton>
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
