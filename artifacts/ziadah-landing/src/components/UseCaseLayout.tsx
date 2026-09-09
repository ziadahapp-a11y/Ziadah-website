import { useEffect, useState } from "react";
import { Rocket, ArrowDown, CheckCircle2, BarChart3, Package, Zap } from "lucide-react";
import PlatformModal from "./PlatformModal";
import { navigateTo } from "./PageTransition";
import { PageRail, PageProgress } from "./PageRail";
import { getMotionRuntime, scrollToTarget } from "@/motion/runtime";
import { getAnchorScrollTopOffset } from "@/utils/anchorScroll";
import SEO from "./SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { planLabelsForUseCasePath } from "@/data/useCasePlans";
import { BreadcrumbSchema } from "./JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { DefaultUseCaseHeroPhone } from "@/components/UseCasePagesShowcase";
import { t as siteTranslations } from "@/i18n/translations";
import { Button, Shell } from "@/components/mk";
import { HeroSplit, Section, SectionHead, CardsGrid, CtaSection } from "@/sections";

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
  /**
   * Where the card goes, when it names a page rather than describing a
   * technique. The five `by-*` indexes list solutions that each have their
   * own page; before this they were unclickable cards naming a destination
   * the reader then had to find in the menu.
   */
  href?: string;
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
/**
 * Shared layout for every `/use-cases/*` playbook page — twenty-one of them.
 *
 * On the design system: the hero is a `HeroSplit` with the page's own phone
 * mockup in the media column, and every band below is a `Section` carrying a
 * family rather than a hand-written `py-24` with a zinc tint. Colour comes
 * from the section triple, so the same markup reads correctly on the pale
 * violet band and the white one without either being restyled.
 *
 * The data contract is unchanged: `UseCasePageData` is what the twenty-one
 * pages pass, and none of them needed editing.
 */
export default function UseCaseLayout({ data }: { data: UseCasePageData }) {
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [scrollProg, setScrollProg] = useState(0);
  const t = siteTranslations;
  const { lang, dir } = useLanguage();
  const tr = t[lang];
  const isEn = lang === "en";

  const hero = isEn && data.heroEn ? data.heroEn : data.hero;
  const whatWeDoTitle = isEn && data.whatWeDoTitleEn ? data.whatWeDoTitleEn : data.whatWeDoTitle;
  const whatWeDoDesc = isEn && data.whatWeDoDescEn ? data.whatWeDoDescEn : data.whatWeDoDesc;
  const strategyTitle = isEn && data.strategyTitleEn ? data.strategyTitleEn : data.strategyTitle;
  const strategies = isEn && data.strategiesEn ? data.strategiesEn : data.strategies;
  const stats = isEn && data.statsEn ? data.statsEn : data.stats;
  const exampleScenario = isEn && data.exampleScenarioEn ? data.exampleScenarioEn : data.exampleScenario;
  const centralizedPlans = data.seo?.canonical ? planLabelsForUseCasePath(data.seo.canonical, lang) : [];
  const plans =
    centralizedPlans.length > 0
      ? centralizedPlans
      : (isEn && data.plansEn ? data.plansEn : data.plans);
  const ctaTitle = isEn && data.ctaTitleEn ? data.ctaTitleEn : data.ctaTitle;
  const ctaDesc = isEn && data.ctaDescEn ? data.ctaDescEn : data.ctaDesc;
  const pageKw = data.seo?.canonical ? getPageKeywords(data.seo.canonical) : getPageKeywords("/use-cases");

  /* scroll-reveal observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => { es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }); },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));

    /* also observe .rv nodes added later (e.g. tab switches revealing new content) */
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(".rv")) obs.observe(node);
          node.querySelectorAll?.(".rv").forEach((el) => obs.observe(el));
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mo.disconnect();
    };
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

  /* The hero's own jump. Routed through the motion runtime for the same
     reason the rail is: a bare smooth `scrollIntoView` animates against
     Lenis. */
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollToTarget(getMotionRuntime(), el, -getAnchorScrollTopOffset());
  };

  /* quick-nav items */
  const quickNav = [
    { id: "uc-what",       ar: "كيف يعمل",       en: "How it works" },
    { id: "uc-stats",      ar: "النتائج",          en: "Results" },
    { id: "uc-strategies", ar: "الاستراتيجيات",   en: "Strategies" },
    ...(exampleScenario ? [{ id: "uc-example", ar: "مثال حي", en: "Example" }] : []),
    ...(data.extraSections ? [{ id: "uc-showcase", ar: "الأدوات", en: "Tools" }] : []),
  ];

  /* ─── shared labels ─── */
  const activateNow = tr.useCaseLayout.activateNow;
  const ctaNote     = tr.useCaseLayout.ctaNote;
  const reportsTag  = tr.useCaseLayout.reportsTag;
  const reportsTitle= tr.useCaseLayout.reportsTitle;
  const reportsDesc = tr.useCaseLayout.reportsDesc;
  const exampleLabel= tr.useCaseLayout.exampleLabel;
  const availableIn = tr.useCaseLayout.availableIn;


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

      <div className="page" dir={dir}>
        <PageProgress value={scrollProg} />

        <HeroSplit
          family="violet"
          eyebrow={
            <>
              <span aria-hidden="true">{hero.icon}</span> {hero.tag}
            </>
          }
          title={hero.title}
          body={hero.subtitle}
          note={hero.tagline}
          actions={
            <>
              <Button variant="primary" size="lg" onClick={() => setPlatformModalOpen(true)}>
                <Rocket className="w-4 h-4" aria-hidden="true" />
                {activateNow}
              </Button>
              <Button variant="tertiary" size="lg" onClick={() => scrollTo("uc-what")}>
                {isEn ? "See how it works" : "شوف كيف يشتغل"}
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </Button>
            </>
          }
          media={data.heroVisual ?? <DefaultUseCaseHeroPhone hero={hero} stats={stats} />}
        />

        <PageRail items={quickNav} />

        <Section id="uc-what" family="grey">
          <Shell width="narrow">
            <SectionHead
              size="md"
              kicker={isEn ? "How it works" : "كيف يعمل"}
              title={whatWeDoTitle}
              lead={whatWeDoDesc}
            />
          </Shell>
          {/* The numbers are the argument of this section, so they carry the
              display tier rather than sitting in cards that compete with it. */}
          <Shell>
            <ul id="uc-stats" className="uc-stats">
              {stats.map((s) => (
                <li key={s.label} className="uc-stat">
                  <span className="uc-stat-value num-ltr">{s.value}</span>
                  <span className="uc-stat-label">{s.label}</span>
                </li>
              ))}
            </ul>
          </Shell>
        </Section>

        <Section id="uc-strategies" family="violet">
          <SectionHead center kicker={isEn ? "Strategies" : "الاستراتيجيات"} title={strategyTitle} />
          <Shell>
            <CardsGrid
              cards={strategies.map((s) => ({
                key: s.title,
                icon: <span aria-hidden="true">{s.icon}</span>,
                title: s.title,
                body: s.desc,
                onClick: s.href ? () => navigateTo(s.href!) : undefined,
              }))}
            />
          </Shell>
        </Section>

        {exampleScenario ? (
          <Section id="uc-example" family="grey">
            <Shell width="narrow">
              <SectionHead
                size="md"
                kicker={exampleLabel}
                title={exampleScenario.title}
              />
              {/* A scenario is an ordered argument, so it is an ordered list —
                  the steps are numbered because the order is the content. */}
              <ol className="uc-list">
                {exampleScenario.steps.map((step, i) => (
                  <li key={i} className="uc-item">
                    <span className="uc-n num-ltr" aria-hidden="true">{i + 1}</span>
                    <p className="uc-body">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="uc-outcome">
                <span className="uc-outcome-label">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  {isEn ? "Outcome" : "النتيجة"}
                </span>
                {exampleScenario.result}
              </p>
            </Shell>
          </Section>
        ) : null}

        {plans && plans.length > 0 ? (
          <Section family="grey" flushTop>
            <Shell width="narrow">
              <SectionHead center size="sm" kicker={availableIn} />
              <ul className="uc-tools justify-center">
                {plans.map((p) => (
                  <li key={p}>
                    <span className="uc-tool">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </Shell>
          </Section>
        ) : null}

        {/* Violet, not grey. This used to be the THIRD grey band in a row -
            the example, the plans strip and this - across all twenty-one
            use-case routes, so the bottom half of every one of them read as
            one long pale block. The plans strip above is `flushTop` and
            deliberately continuous with the example it qualifies; this is a
            separate argument and takes a separate ground. */}
        <Section family="violet">
          <Shell>
            <div className="uc-split">
              <SectionHead size="md" kicker={reportsTag} title={reportsTitle} lead={reportsDesc} />
              <ul className="uc-report-list">
                {(
                  [
                    { Icon: BarChart3, labelKey: "campaignReports", subKey: "campaignReportsSub" },
                    { Icon: Package, labelKey: "productReports", subKey: "productReportsSub" },
                    { Icon: Zap, labelKey: "liveData", subKey: "liveDataSub" },
                  ] as const
                ).map((item) => (
                  <li key={item.labelKey} className="uc-report">
                    <span className="uc-report-ico" aria-hidden="true">
                      <item.Icon className="w-5 h-5" />
                    </span>
                    <span className="uc-report-text">
                      <span className="uc-report-label">{tr.useCaseLayout[item.labelKey]}</span>
                      <span className="uc-report-sub">{tr.useCaseLayout[item.subKey]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Shell>
        </Section>

        {data.extraSections ? (
          <section id="uc-showcase" className="w-full">
            {typeof data.extraSections === "function" ? data.extraSections(!isEn) : data.extraSections}
          </section>
        ) : null}

        <CtaSection
          family="violet"
          title={ctaTitle}
          body={ctaDesc}
          note={ctaNote}
          primary={{
            label: activateNow,
            onClick: () => setPlatformModalOpen(true),
            testId: "uc-cta",
          }}
        />
      </div>

      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
