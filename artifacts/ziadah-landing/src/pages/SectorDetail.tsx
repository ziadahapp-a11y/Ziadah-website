import { useEffect, useState } from "react";
import { t } from "@/i18n/translations";
import { useParams } from "wouter";
import PageShell from "@/components/PageShell";
import { PageRail, PageProgress } from "@/components/PageRail";
import { HeroLede } from "@/sections";
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
import LandingSolutionsMatrix from "@/components/LandingSolutionsMatrix";
import WidgetsShowcaseSection from "@/components/WidgetsShowcaseSection";
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
      <PageShell className="bg-white" style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-950 mb-3">{tr.notFoundTitle}</h1>
          <p className="text-zinc-600 mb-6 max-w-md mx-auto leading-relaxed">{tr.notFoundDesc}</p>
          <button
            type="button"
            onClick={() => navigateTo("/sectors")}
            className="inline-flex items-center justify-center h-12 px-7 rounded-md bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors"
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
      <PageShell className="relative overflow-x-clip bg-white text-zinc-950" style={{ background: "#fff" }}>

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
                    className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-card transition-all`}
                  >
                    <div className="flex items-start gap-2.5 mb-3">
                      <span className="text-2xl leading-none" aria-hidden>
                        {card.emoji}
                      </span>
                      <h3 className="m-0 text-base font-extrabold text-zinc-950 leading-snug">
                        {lang === "ar" ? card.titleAr : card.titleEn}
                      </h3>
                    </div>
                    <ul className="m-0 ps-5 list-disc text-sm text-zinc-600 leading-relaxed space-y-2">
                      {(slim ? (lang === "ar" ? card.bulletsAr : card.bulletsEn).slice(0, 2) : lang === "ar" ? card.bulletsAr : card.bulletsEn).map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ol className="m-0 ps-5 list-decimal text-[15px] text-zinc-600 leading-relaxed space-y-2.5">
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
                    className={`rv d${(i % 3) + 1} flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-card transition-all`}
                  >
                    <span className="text-2xl leading-none shrink-0" aria-hidden>
                      {hc.emoji}
                    </span>
                    <p className="m-0 text-sm text-zinc-600 leading-relaxed">
                      {lang === "ar" ? hc.bodyAr : hc.bodyEn}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="m-0 ps-5 list-disc text-[15px] text-zinc-600 leading-relaxed space-y-2.5">
                {helps.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </SectionBlock>
          ) : null}

          {showPlatformHub && visualBundle ? <SectorHubPlaybook bundle={visualBundle} /> : null}
          {showPlatformHub && !visualBundle && !(htmlPlaybook && SECTOR_SLUGS_WITH_PLATFORM_HUB.has(sector.slug)) ? (
            <>
              <LandingSolutionsMatrix variant="sector" />
              <WidgetsShowcaseSection variant="sector" sectorSlug={sector.slug} />
            </>
          ) : null}

          {!showPlatformHub && visualBundle ? (
            <div
              id="section-examples"
              className="rv d3 rounded-2xl border border-zinc-200 bg-white p-7 md:p-9 shadow-card"
              style={{ marginBottom: 20, scrollMarginTop: 120 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 mb-5 leading-tight">{tr.sectionExamples}</h2>
              <SectorVisualExamples bundle={visualBundle} />
            </div>
          ) : null}
          {!showPlatformHub && !visualBundle ? (
            <SectionBlock title={tr.sectionExamples} delayClass="d3" sectionId="section-examples">
              <ul className="m-0 ps-5 list-disc text-[15px] text-zinc-600 leading-relaxed space-y-2.5">
                {(lang === "ar" ? sector.examplesAr : sector.examplesEn).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </SectionBlock>
          ) : null}

          {!slim ? (
            <SectionBlock title={tr.sectionExperience} delayClass="d1" sectionId="section-experience">
              {sector.useCardLayout ? (
                <div className="rv rounded-2xl border border-zinc-200 border-s-4 border-s-violet-500 bg-zinc-50/60 p-6">
                  <p className="m-0 text-[15px] text-zinc-700 leading-loose">{experience}</p>
                </div>
              ) : (
                <p className="m-0 text-[15px] text-zinc-700 leading-loose">{experience}</p>
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
                      className={`rv d${(i % 3) + 1} flex items-start gap-2.5 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-card transition-all`}
                    >
                      <span className="text-lg leading-snug shrink-0" aria-hidden>
                        {bc.emoji}
                      </span>
                      <p className="m-0 text-sm text-zinc-600 leading-relaxed">
                        {lang === "ar" ? bc.textAr : bc.textEn}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="m-0 ps-5 list-disc text-[15px] text-zinc-600 leading-relaxed space-y-2.5">
                  {best.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </SectionBlock>
          ) : null}

          {pageRich ? <SectorPageRichSections rich={pageRich} part="foot" /> : null}

          <div className="rv d2 text-center mt-8">
            <button
              type="button"
              onClick={() => navigateTo("/sectors")}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-zinc-300 text-zinc-950 hover:bg-zinc-100 font-semibold text-sm transition-colors"
            >
              <span aria-hidden>{dir === "rtl" ? "→" : "←"}</span> {tr.breadcrumbSectors}
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
