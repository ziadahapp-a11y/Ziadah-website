import { useState, useCallback, useEffect } from "react";
import { TrendingUp, BarChart3, Coins, ArrowUpRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

function fmtLocale(n: number, locale: string, decimals = 0): string {
  return n.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function snapToStep(v: number, min: number, step: number): number {
  if (step <= 0) return v;
  const snapped = min + Math.round((v - min) / step) * step;
  return Number(snapped.toPrecision(12));
}

interface SliderConfig {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatDisplay: (n: number) => string;
  formatTick: (n: number) => string;
}

/**
 * One labelled slider control inside the dark calculator card, styled to match
 * the home page calculator (`src/pages/HomeTrackflow.tsx`): muted uppercase
 * label, emerald value chip, and the shared `@/components/ui/slider` with the
 * white/20 track, emerald range, and emerald-ringed thumb.
 */
function SliderCard({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatDisplay,
  formatTick,
  dir,
}: SliderConfig & { dir: "rtl" | "ltr" }) {
  const apply = useCallback(
    (raw: number) => onChange(snapToStep(raw, min, step)),
    [onChange, min, step],
  );

  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</span>
        <span className="num-ltr rounded-md bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-sm font-extrabold text-emerald-300">
          {formatDisplay(value)}
        </span>
      </div>
      <Slider
        dir={dir}
        min={min}
        max={max}
        step={step}
        value={[value]}
        aria-label={label}
        onValueChange={(v) => apply(v[0])}
        className="[&>span:first-child]:h-2 [&>span:first-child]:bg-white/20 [&>span:first-child>span]:bg-emerald-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-emerald-400 [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-[0_0_0_4px_rgba(16,185,129,0.25)]"
      />
      <div className="num-ltr mt-3 flex justify-between text-[11px] text-zinc-500">
        <span>{formatTick(min)}</span>
        <span>{formatTick(max)}</span>
      </div>
    </div>
  );
}

export default function Calculator() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang].calculator;
  const ld = t[lang].landing;
  const pk = getPageKeywords("/calculator");
  const isAr = lang === "ar";
  const numLocale = lang === "ar" ? "ar-SA-u-nu-latn" : "en-US";
  const currencySuffix = lang === "ar" ? " ⃁" : " SAR";
  const fmtN = (n: number, decimals = 0) => fmtLocale(n, numLocale, decimals);
  const fmtCur = (n: number) => fmtLocale(Math.round(n), numLocale) + currencySuffix;
  const fmtP = (n: number, decimals = 1) => "+" + fmtLocale(n, numLocale, decimals) + "%";

  const [visitors, setVisitors] = useState(50000);
  const [convRate, setConvRate] = useState(2.5);
  const [aov, setAov] = useState(250);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const aovUplift = 30;
  const acceptRate = 20;

  const calc = useCallback(() => {
    const orders = visitors * (convRate / 100);
    const baseRevenue = orders * aov;

    const accepting = orders * (acceptRate / 100);
    const notAccepting = orders - accepting;
    const revenueAccepting = accepting * (aov * (1 + aovUplift / 100));
    const revenueNotAccepting = notAccepting * aov;
    const newRevenue = revenueAccepting + revenueNotAccepting;
    const effectiveAov = newRevenue / orders;

    const addRevenue = newRevenue - baseRevenue;
    const revGrowth = ((newRevenue - baseRevenue) / baseRevenue) * 100;
    const aovIncrease = effectiveAov - aov;

    return {
      orders,
      baseRevenue,
      newRevenue,
      effectiveAov,
      addRevenue,
      revGrowth,
      aovIncrease,
    };
  }, [visitors, convRate, aov]);

  const r = calc();

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

  const sliders: SliderConfig[] = [
    {
      label: tr.monthlyVisitors,
      value: visitors,
      min: 1000,
      max: 500000,
      step: 1000,
      onChange: setVisitors,
      formatDisplay: (n) => fmtN(n),
      formatTick: (n) => fmtN(n),
    },
    {
      label: tr.conversionRate,
      value: convRate,
      min: 0.5,
      max: 15,
      step: 0.1,
      onChange: setConvRate,
      formatDisplay: (n) => fmtN(n, 1) + "%",
      formatTick: (n) => fmtN(n, 1),
    },
    {
      label: tr.avgOrderValue,
      value: aov,
      min: 50,
      max: 5000,
      step: 10,
      onChange: setAov,
      formatDisplay: (n) => fmtN(n) + currencySuffix,
      formatTick: (n) => fmtN(n) + currencySuffix,
    },
  ];

  const impactStats = [
    { Icon: Coins, label: tr.additionalRevenue, value: "+" + fmtCur(r.addRevenue), sub: tr.perMonth },
    { Icon: TrendingUp, label: tr.revenueGrowth, value: fmtP(r.revGrowth), sub: tr.growthRate },
    { Icon: ArrowUpRight, label: tr.aovIncrease, value: "+" + fmtCur(r.aovIncrease), sub: tr.perOrder },
  ];

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

  return (
    <>
      <SEO
        titleAr={t.ar.calculator.seoTitle}
        titleEn={t.en.calculator.seoTitle}
        descriptionAr={t.ar.calculator.seoDesc}
        descriptionEn={t.en.calculator.seoDesc}
        canonical="/calculator"
        keywordsAr={pk?.keywordsAr}
        keywordsEn={pk?.keywordsEn}
      />
      <BreadcrumbSchema items={[{ name: tr.breadcrumbHome, url: "/" }, { name: tr.breadcrumbCalc, url: "/calculator" }]} />
      <WebPageSchema
        name={lang === "ar" ? t.ar.calculator.seoTitle : t.en.calculator.seoTitle}
        description={lang === "ar" ? t.ar.calculator.seoDesc : t.en.calculator.seoDesc}
        url="/calculator"
      />
      <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
        {/* ══════════════════ HERO ══════════════════ */}
        <section dir={dir} className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-4">
          <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
          <div className="container mx-auto relative max-w-3xl text-center">
            <div className="rv mb-4">
              <span className="inline-block text-xs font-bold tracking-widest text-green-600 uppercase">
                {tr.tag}
              </span>
            </div>
            <h1 className="rv d1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-5 leading-[1.08]">
              {tr.title}
            </h1>
            <p className="rv d2 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              {tr.subtitle}
            </p>
          </div>
        </section>

        {/* ══════════════════ CALCULATOR ══════════════════ */}
        <section className="py-24 px-4 bg-zinc-50/60 border-y border-zinc-200">
          <div className="container mx-auto max-w-6xl">
            <div className="rv rounded-3xl mockup-card overflow-hidden shadow-card-lg relative">
              <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/15 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative p-7 md:p-10 lg:p-12" dir={dir}>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  {/* left: controls */}
                  <div className="flex flex-col gap-4" style={{ unicodeBidi: "isolate" }}>
                    {sliders.map((s) => (
                      <SliderCard key={s.label} {...s} dir={isAr ? "rtl" : "ltr"} />
                    ))}
                  </div>

                  {/* right: results */}
                  <div className="flex flex-col gap-4" style={{ unicodeBidi: "isolate" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* without recommendations */}
                      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
                        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">
                          {tr.withoutRec}
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-[11px] text-zinc-500 mb-1">{tr.monthlyOrders}</div>
                            <div className="text-xl font-extrabold text-white num-ltr">
                              {fmtN(Math.round(r.orders))}
                            </div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-500 mb-1">{tr.avgOrder}</div>
                            <div className="text-xl font-extrabold text-white num-ltr">{fmtCur(aov)}</div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-500 mb-1">{tr.monthlyRevenue}</div>
                            <div className="text-xl font-extrabold text-white num-ltr">
                              {fmtCur(r.baseRevenue)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* with Ziadah */}
                      <div className="rounded-2xl bg-gradient-to-br from-emerald-500/[0.12] to-transparent border border-emerald-500/30 p-6">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </span>
                          {tr.withRec}
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-[11px] text-zinc-500 mb-1">{tr.monthlyOrders}</div>
                            <div className="text-xl font-extrabold text-emerald-300 num-ltr">
                              {fmtN(Math.round(r.orders))}
                            </div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-500 mb-1">{tr.effectiveAvgOrder}</div>
                            <div className="num-ltr flex items-center gap-2 flex-wrap">
                              <span className="text-xl font-extrabold text-emerald-300">
                                {fmtCur(r.effectiveAov)}
                              </span>
                              <span className="rounded-md bg-emerald-500/18 border border-emerald-500/35 px-1.5 py-0.5 text-[11px] font-extrabold text-emerald-300">
                                +{fmtCur(r.aovIncrease)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-500 mb-1">{tr.monthlyRevenue}</div>
                            <div className="text-xl font-extrabold text-emerald-300 num-ltr">
                              {fmtCur(r.newRevenue)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* impact summary */}
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/[0.08] to-transparent border border-emerald-500/20 p-6 md:p-7">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-6">
                        <BarChart3 className="w-4 h-4" />
                        {tr.impactSummary}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {impactStats.map((s) => (
                          <div
                            key={s.label}
                            className="rounded-xl bg-white/[0.05] border border-white/10 p-4 text-center"
                          >
                            <s.Icon className="w-4 h-4 text-emerald-400 mx-auto mb-2" />
                            <div className="text-[11px] font-semibold text-zinc-500 mb-1.5">{s.label}</div>
                            <div className="text-xl md:text-2xl font-extrabold text-emerald-300 num-ltr leading-tight">
                              {s.value}
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-1">{s.sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* disclaimer */}
                    <div className="rounded-xl bg-white/[0.03] border border-white/10 px-5 py-4 text-xs text-zinc-400 leading-relaxed">
                      {tr.disclaimer}
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => setPlatformModalOpen(true)}
                      className="w-full h-12 rounded-md bg-white text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors"
                    >
                      {tr.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PageClosingCta
          title={tr.closingTitle}
          description={tr.closingDesc}
          buttonLabel={ld.ctaBtn}
          onActivate={() => setPlatformModalOpen(true)}
        />
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
