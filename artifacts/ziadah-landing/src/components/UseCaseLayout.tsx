import { useEffect, useLayoutEffect, useState } from "react";
import { Rocket, ArrowDown, CheckCircle2, BarChart3, Package, Zap } from "lucide-react";
import PageShell from "./PageShell";
import { scrollWindowToTopAfterPaint } from "@/utils/scrollToTop";
import PlatformModal from "./PlatformModal";
import PageClosingCta from "./PageClosingCta";
import SEO from "./SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { planLabelsForUseCasePath } from "@/data/useCasePlans";
import { BreadcrumbSchema } from "./JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteContentMap, useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";
import { DefaultUseCaseHeroPhone } from "@/components/UseCasePagesShowcase";

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
/**
 * Shared layout for every `/use-cases/*` playbook page (re-themed to the
 * TrackFlow design system — see `src/components/trackflow/DESIGN_SYSTEM.md`).
 * Content stays CMS-editable via `Editable` + content keys; presentation now
 * uses the light SaaS look: `py-24` bands alternating white / `zinc-50`, the
 * green eyebrow + bold heading pattern, bordered cards, and the dark mockup CTA.
 */
export default function UseCaseLayout({ data }: { data: UseCasePageData }) {
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [scrollProg, setScrollProg] = useState(0);
  const t = useSiteT();
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

  useLayoutEffect(() => {
    scrollWindowToTopAfterPaint();
  }, []);

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

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

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

      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
        {/* ── fixed scroll progress bar ── */}
        <div
          className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-violet-600 z-50"
          style={{ width: `${scrollProg}%` }}
          aria-hidden
        />

        {/* ══════════════════ HERO ══════════════════ */}
        <section dir={dir} className="relative pt-40 pb-20 md:pt-48 md:pb-24 px-4 border-b border-zinc-200">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center rv d1">
              <div className="text-center lg:text-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                  </span>
                  <span className="text-xs font-semibold text-violet-700">
                    <Editable contentKey={ucKey("hero", "tag")} label="Tag" type="text">
                      {cv(["hero", "tag"], hero.tag)}
                    </Editable>
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 mb-5 text-sm font-bold text-violet-700">
                  <span className="text-lg leading-none">{hero.icon}</span>
                  <Editable contentKey={ucKey("hero", "tagline")} label="Tagline" type="text">
                    {cv(["hero", "tagline"], hero.tagline)}
                  </Editable>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-6 leading-[1.08]">
                  <Editable contentKey={ucKey("hero", "title")} label="Title" type="text">
                    {cv(["hero", "title"], hero.title)}
                  </Editable>
                </h1>

                <p className="text-lg text-zinc-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                  <Editable contentKey={ucKey("hero", "subtitle")} label="Subtitle" type="text">
                    {cv(["hero", "subtitle"], hero.subtitle)}
                  </Editable>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <button
                    type="button"
                    onClick={() => setPlatformModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base h-12 px-7 rounded-md bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-colors"
                  >
                    <Rocket className="w-4 h-4" />
                    <Editable contentKey={ucKey("activateNow")} label="Activate CTA" type="text">
                      {activateNow}
                    </Editable>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo(data.extraSections ? "uc-showcase" : "uc-strategies")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base h-12 px-7 rounded-md border border-zinc-300 text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors"
                  >
                    {data.extraSections
                      ? (isEn ? "See it live" : "شوف الأداة")
                      : (isEn ? "How it works" : "كيف يعمل")}
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative w-full mt-4 lg:mt-0">
                {data.heroVisual ?? <DefaultUseCaseHeroPhone hero={hero} stats={stats} />}
              </div>
            </div>
          </div>
        </section>

        {/* sticky quick-nav */}
        <nav
          className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-zinc-200"
          aria-label={isEn ? "Sections on this page" : "أقسام هذه الصفحة"}
        >
          <div className="container mx-auto max-w-6xl px-4 py-3 flex flex-wrap gap-2 justify-center">
            {quickNav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-bold px-3.5 py-2 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
              >
                {isEn ? item.en : item.ar}
              </button>
            ))}
          </div>
        </nav>

        {/* ══════════════════ WHAT WE DO + STATS ══════════════════ */}
        <section id="uc-what" className="py-24 px-4 scroll-mt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="rv rounded-2xl border border-zinc-200 bg-white p-8 md:p-12 shadow-card">
              <div className="mb-4">
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase">
                  {isEn ? "How it works" : "كيف يعمل"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-950 mb-5 leading-tight">
                <Editable contentKey={ucKey("whatWeDoTitle")} label="What we do title" type="text">
                  {cv(["whatWeDoTitle"], whatWeDoTitle)}
                </Editable>
              </h2>
              <p className="text-base md:text-lg text-zinc-600 leading-relaxed max-w-3xl">
                <Editable contentKey={ucKey("whatWeDoDesc")} label="What we do desc" type="text">
                  {cv(["whatWeDoDesc"], whatWeDoDesc)}
                </Editable>
              </p>

              <div id="uc-stats" className="scroll-mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {stats.map((s, i) => (
                  <div key={i} className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 text-center`}>
                    <div className="text-3xl md:text-4xl font-extrabold num-ltr" style={{ color: s.color || "#6d28d9" }}>
                      <Editable contentKey={ucKey("stats", String(i), "value")} label={`Stat ${i + 1}`} type="text">
                        {cv(["stats", String(i), "value"], s.value)}
                      </Editable>
                    </div>
                    <div className="mt-1.5 text-sm text-zinc-600">
                      <Editable contentKey={ucKey("stats", String(i), "label")} label={`Stat ${i + 1} label`} type="text">
                        {cv(["stats", String(i), "label"], s.label)}
                      </Editable>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ STRATEGIES ══════════════════ */}
        <section id="uc-strategies" className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200 scroll-mt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 leading-tight">
                <Editable contentKey={ucKey("strategyTitle")} label="Strategy title" type="text">
                  {cv(["strategyTitle"], strategyTitle)}
                </Editable>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {strategies.map((s, i) => (
                <div
                  key={i}
                  className={`rv d${(i % 3) + 1} relative rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all overflow-hidden`}
                >
                  <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: s.color }} />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                    style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)` }}
                  >
                    {s.icon}
                  </div>
                  <p className="text-lg font-bold text-zinc-950 mb-2.5 leading-snug">
                    <Editable contentKey={ucKey("strategies", String(i), "title")} label={`Strategy ${i + 1}`} type="text">
                      {cv(["strategies", String(i), "title"], s.title)}
                    </Editable>
                  </p>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    <Editable contentKey={ucKey("strategies", String(i), "desc")} label={`Strategy ${i + 1} desc`} type="text">
                      {cv(["strategies", String(i), "desc"], s.desc)}
                    </Editable>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ EXAMPLE SCENARIO ══════════════════ */}
        {exampleScenario && (
          <section id="uc-example" className="py-24 px-4 scroll-mt-20">
            <div className="container mx-auto max-w-5xl">
              <div className="rv rounded-2xl border border-zinc-200 bg-white p-8 md:p-12 shadow-card">
                <div className="mb-5">
                  <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase">
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "exampleLabel")} label="Example label" type="text">
                      {exampleLabel}
                    </Editable>
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-950 mb-8 leading-snug">
                  <Editable contentKey={ucKey("exampleScenario", "title")} label="Example title" type="text">
                    {cv(["exampleScenario", "title"], exampleScenario.title)}
                  </Editable>
                </h3>
                <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
                  <div className="flex flex-col gap-3">
                    {exampleScenario.steps.map((step, i) => (
                      <div key={i} className="flex gap-3.5 items-start rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-zinc-950 text-white text-sm font-bold flex items-center justify-center num-ltr">
                          {i + 1}
                        </div>
                        <p className="text-sm text-zinc-700 leading-relaxed pt-0.5">
                          <Editable contentKey={ucKey("exampleScenario", "steps", String(i))} label={`Step ${i + 1}`} type="text">
                            {cv(["exampleScenario", "steps", String(i)], step)}
                          </Editable>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="lg:sticky lg:top-24">
                    <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-7">
                      <CheckCircle2 className="w-8 h-8 text-violet-600 mb-3" />
                      <p className="text-base font-bold text-violet-700 leading-relaxed">
                        <Editable contentKey={ucKey("exampleScenario", "result")} label="Result" type="text">
                          {cv(["exampleScenario", "result"], exampleScenario.result)}
                        </Editable>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ PLANS ══════════════════ */}
        {plans && (
          <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="mb-7">
                <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase">
                  <Editable contentKey={cmsKey(lang, "useCaseLayout", "availableIn")} label="Available in" type="text">
                    {availableIn}
                  </Editable>
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {plans.map((plan, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-zinc-200 text-sm font-bold text-zinc-800 shadow-card"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                    <Editable contentKey={ucKey("plans", String(i))} label={`Plan ${i + 1}`} type="text">
                      {cv(["plans", String(i)], plan)}
                    </Editable>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ REPORTS HIGHLIGHT ══════════════════ */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="rv rounded-2xl border border-zinc-200 bg-white p-8 md:p-12 shadow-card">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="mb-4">
                    <span className="inline-block text-xs font-bold tracking-widest text-violet-600 uppercase">
                      <Editable contentKey={cmsKey(lang, "useCaseLayout", "reportsTag")} label="Reports tag" type="text">
                        {reportsTag}
                      </Editable>
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-950 mb-3 leading-snug">
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "reportsTitle")} label="Reports title" type="text">
                      {reportsTitle}
                    </Editable>
                  </h3>
                  <p className="text-base text-zinc-600 leading-relaxed">
                    <Editable contentKey={cmsKey(lang, "useCaseLayout", "reportsDesc")} label="Reports desc" type="richtext">
                      {reportsDesc}
                    </Editable>
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {(
                    [
                      { Icon: BarChart3, labelKey: "campaignReports" as const, subKey: "campaignReportsSub" as const, color: "#6d28d9" },
                      { Icon: Package, labelKey: "productReports" as const, subKey: "productReportsSub" as const, color: "#06b6d4" },
                      { Icon: Zap, labelKey: "liveData" as const, subKey: "liveDataSub" as const, color: "#8b5cf6" },
                    ] as const
                  ).map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5 p-4 rounded-xl border border-zinc-200 bg-zinc-50/60">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `color-mix(in srgb, ${item.color} 14%, transparent)` }}
                      >
                        <item.Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-950">
                          <Editable contentKey={cmsKey(lang, "useCaseLayout", item.labelKey)} label={item.labelKey} type="text">
                            {gv(cmsKey(lang, "useCaseLayout", item.labelKey), tr.useCaseLayout[item.labelKey])}
                          </Editable>
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">
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

        {/* ══════════════════ EXTRA SECTIONS ══════════════════ */}
        {data.extraSections ? (
          <section id="uc-showcase" className="scroll-mt-20 w-full">
            {typeof data.extraSections === "function" ? data.extraSections(!isEn) : data.extraSections}
          </section>
        ) : null}

        {/* ══════════════════ CTA ══════════════════ */}
        <PageClosingCta
          title={
            <Editable contentKey={ucKey("ctaTitle")} label="CTA title" type="text">
              {cv(["ctaTitle"], ctaTitle)}
            </Editable>
          }
          description={
            <Editable contentKey={ucKey("ctaDesc")} label="CTA desc" type="text">
              {cv(["ctaDesc"], ctaDesc)}
            </Editable>
          }
          buttonLabel={
            <Editable contentKey={cmsKey(lang, "useCaseLayout", "activateNow")} label="Activate CTA" type="text">
              {activateNow}
            </Editable>
          }
          note={
            <Editable contentKey={cmsKey(lang, "useCaseLayout", "ctaNote")} label="CTA note" type="text">
              {ctaNote}
            </Editable>
          }
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>

      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
