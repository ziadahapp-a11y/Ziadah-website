import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Coins, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button, Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import { useT } from "@/lib/i18n";
import { Section, SectionHead } from "@/sections";

/**
 * The revenue calculator: the band where the merchant puts their OWN numbers
 * in rather than reading ours.
 *
 * Lifted out of `HomeTrackflow` unchanged. It was converted onto the design
 * system's card vocabulary in the previous pass - `.card`, `.card-eyebrow`,
 * `.card-inset`, the section's own ink rather than fixed zincs - and nothing
 * about that changes here. What changes is where it lives: the page is a list
 * of bands now, so a band is a file.
 *
 * The activation CTA is a prop, because the platform-picker modal belongs to
 * the page: a band should not own a dialog that another band also opens.
 */

function snapToStep(v: number, min: number, step: number): number {
  if (step <= 0) return v;
  const snapped = min + Math.round((v - min) / step) * step;
  return Number(snapped.toPrecision(12));
}

interface CalcSliderConfig {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatDisplay: (n: number) => string;
  formatTick: (n: number) => string;
}

// One labelled slider control inside the dark calculator card: muted uppercase
// label, violet value chip, the shared slider, and min/max tick labels.
function CalcSliderCard({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatDisplay,
  formatTick,
  dir,
}: CalcSliderConfig & { dir: "rtl" | "ltr" }) {
  const apply = useCallback(
    (raw: number) => onChange(snapToStep(raw, min, step)),
    [onChange, min, step],
  );

  return (
    <div className="card card--short gap-[1.6rem]">
      <div className="card-head">
        <span className="card-eyebrow">{label}</span>
        <span className="pill pill--live num-ltr">{formatDisplay(value)}</span>
      </div>
      <Slider
        dir={dir}
        min={min}
        max={max}
        step={step}
        value={[value]}
        aria-label={label}
        onValueChange={(v) => apply(v[0])}
      />
      <div className="card-eyebrow num-ltr flex justify-between">
        <span>{formatTick(min)}</span>
        <span>{formatTick(max)}</span>
      </div>
    </div>
  );
}

export function Calculator({ onActivate }: { onActivate?: () => void }) {
  const { lang } = useLanguage();
  const t = useT();
  const isAr = lang === "ar";
  const ArrowCTA = isAr ? ArrowLeft : ArrowRight;
  const riyal = t({ ar: "ر.س", en: "SAR" });

  const [visitors, setVisitors] = useState(50000);
  const [convRate, setConvRate] = useState(2.5);
  const [aov, setAov] = useState(250);

  /* The two assumptions the band states out loud right under the head: a
     share of orders accept the suggestion (acceptRate) and lift their order
     value by aovUplift, which raises the effective average order. */
  const aovUplift = 30;
  const acceptRate = 20;

  const fmtN = (n: number, decimals = 0) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  const fmtCur = (n: number) => `${fmtN(Math.round(n))} ${riyal}`;
  const fmtP = (n: number, decimals = 1) => `+${fmtN(n, decimals)}%`;

  const calc = useCallback(() => {
    const orders = visitors * (convRate / 100);
    const baseRevenue = orders * aov;

    const accepting = orders * (acceptRate / 100);
    const notAccepting = orders - accepting;
    const revenueAccepting = accepting * (aov * (1 + aovUplift / 100));
    const revenueNotAccepting = notAccepting * aov;
    const newRevenue = revenueAccepting + revenueNotAccepting;
    const effectiveAov = orders > 0 ? newRevenue / orders : 0;

    const addRevenue = newRevenue - baseRevenue;
    const revGrowth = baseRevenue > 0 ? ((newRevenue - baseRevenue) / baseRevenue) * 100 : 0;
    const aovIncrease = effectiveAov - aov;

    return { orders, baseRevenue, newRevenue, effectiveAov, addRevenue, revGrowth, aovIncrease };
  }, [visitors, convRate, aov]);

  const r = calc();

  const calcSliders: CalcSliderConfig[] = [
    {
      label: t({ ar: "الزوار شهرياً", en: "Monthly visitors" }),
      value: visitors,
      min: 1000,
      max: 500000,
      step: 1000,
      onChange: setVisitors,
      formatDisplay: (n) => fmtN(n),
      formatTick: (n) => fmtN(n),
    },
    {
      label: t({ ar: "معدّل التحويل", en: "Conversion rate" }),
      value: convRate,
      min: 0.5,
      max: 15,
      step: 0.1,
      onChange: setConvRate,
      formatDisplay: (n) => `${fmtN(n, 1)}%`,
      formatTick: (n) => `${fmtN(n, 1)}%`,
    },
    {
      label: t({ ar: "متوسط قيمة الطلب", en: "Average order value" }),
      value: aov,
      min: 50,
      max: 5000,
      step: 10,
      onChange: setAov,
      formatDisplay: (n) => fmtCur(n),
      formatTick: (n) => fmtCur(n),
    },
  ];

  const calcImpactStats = [
    { Icon: Coins, label: t({ ar: "إيراد إضافي", en: "Additional revenue" }), value: `+${fmtCur(r.addRevenue)}`, sub: t({ ar: "شهرياً", en: "per month" }) },
    { Icon: TrendingUp, label: t({ ar: "نمو الإيراد", en: "Revenue growth" }), value: fmtP(r.revGrowth), sub: t({ ar: "نسبة النمو", en: "growth rate" }) },
    { Icon: ArrowUpRight, label: t({ ar: "زيادة متوسط الطلب", en: "AOV increase" }), value: `+${fmtCur(r.aovIncrease)}`, sub: t({ ar: "لكل طلب", en: "per order" }) },
  ];

  return (
      <Section id="calculator" family="violet" invert>
        <SectionHead
          kicker={t({ ar: "حاسبة", en: "Calculator" })}
          title={t({ ar: "احسب إيرادك الإضافي مع زيادة", en: "Calculate your extra revenue with Ziadah" })}
          lead={t({
            ar: "حرّك زوارك ومعدّل التحويل ومتوسط قيمة الطلب، وشوف كم يضيف لك رفع متوسط الطلب — كل شهر.",
            en: "Adjust your visitors, conversion rate, and average order value to see how much a higher AOV adds — every month.",
          })}
        />
        <Shell width="wide">
              <p className="hero-caption calc-basis">
                {t({
                  ar: "بناءً على متاجر تستخدم زيادة، نفترض أن ~20٪ من الطلبات تقبل الاقتراح فترتفع قيمتها ~30٪.",
                  en: "Based on stores using Ziadah, we assume ~20% of orders accept the suggestion, lifting their value ~30%.",
                })}
              </p>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* left: controls */}
                <div className="flex flex-col gap-4" style={{ unicodeBidi: "isolate" }}>
                  {calcSliders.map((s) => (
                    <CalcSliderCard key={s.label} {...s} dir={isAr ? "rtl" : "ltr"} />
                  ))}
                </div>

                {/* right: results */}
                <div className="flex flex-col gap-5" style={{ unicodeBidi: "isolate" }}>
                  {/* The connector sits in the gap between the two cards, so the
                        gap has to be wide enough to hold it - a 2rem disc
                        plus its 0.5rem masking ring. At `gap-4` it
                        overhung both cards and clipped a label. */}
                  <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-[3.2rem]">
                    {/* without recommendations */}
                    <div className="card card--short">
                      <div className="card-eyebrow">
                        {t({ ar: "بدون اقتراحات", en: "Without recommendations" })}
                      </div>
                      <div className="flex flex-col gap-[1.6rem]">
                        <div>
                          <div className="card-eyebrow">{t({ ar: "الطلبات شهرياً", en: "Monthly orders" })}</div>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={Math.round(r.orders)}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="t-head-2 num-ltr"
                            >
                              {fmtN(Math.round(r.orders))}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <div>
                          <div className="card-eyebrow">{t({ ar: "متوسط الطلب", en: "Avg. order" })}</div>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={aov}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="t-head-2 num-ltr"
                            >
                              {fmtCur(aov)}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <div className="card-rule">
                          <div className="card-eyebrow">{t({ ar: "الإيراد شهرياً", en: "Monthly revenue" })}</div>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={Math.round(r.baseRevenue)}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="t-head-2 num-ltr"
                            >
                              {fmtCur(r.baseRevenue)}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* connector: flows from "without" into the elevated "with Ziadah" card */}
                    <div
                      /* `-translate-x-1/2` is NOT direction-aware: paired
                         with `inset-inline-start: 50%` it centred the disc
                         in LTR and pushed it a full width off-centre in
                         RTL, where it landed on the card's own labels. The
                         offset belongs in the logical inset. */
                      className="calc-connector hidden sm:flex absolute top-1/2 z-10 h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full"
                      style={{ insetInlineStart: "calc(50% - 1rem)" }}
                      aria-hidden="true"
                    >
                      <ArrowCTA className="w-4 h-4" />
                    </div>

                    {/* with Ziadah */}
                    <div className="card card--short card--accent">
                      <div className="card-eyebrow flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                        </span>
                        {t({ ar: "مع زيادة", en: "With Ziadah" })}
                      </div>
                      <div className="flex flex-col gap-[1.6rem]">
                        <div>
                          <div className="card-eyebrow">{t({ ar: "الطلبات شهرياً", en: "Monthly orders" })}</div>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={Math.round(r.orders)}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="t-head-2 num-ltr"
                            >
                              {fmtN(Math.round(r.orders))}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <div>
                          <div className="card-eyebrow">{t({ ar: "متوسط الطلب الفعلي", en: "Effective avg. order" })}</div>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={Math.round(r.effectiveAov)}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="num-ltr flex items-center gap-2 flex-wrap"
                            >
                              <span className="t-head-2">
                                {fmtCur(r.effectiveAov)}
                              </span>
                              <span className="pill pill--live">
                                +{fmtCur(r.aovIncrease)}
                              </span>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <div className="card-rule">
                          <div className="card-eyebrow">{t({ ar: "الإيراد شهرياً", en: "Monthly revenue" })}</div>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={Math.round(r.newRevenue)}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="t-head-2 num-ltr"
                            >
                              {fmtCur(r.newRevenue)}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* impact summary */}
                  <div className="card card--short">
                    <div
                      className="hidden sm:block absolute -top-3 start-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/50 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="card-eyebrow flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      {t({ ar: "ملخّص الأثر", en: "Impact summary" })}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[0.8rem]">
                      {calcImpactStats.map((s, i) => (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="card-inset !mt-0 text-center"
                        >
                          <s.Icon className="w-4 h-4 mx-auto mb-2 opacity-70" aria-hidden="true" />
                          <div className="card-eyebrow">{s.label}</div>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                              key={s.value}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="t-head-2 num-ltr"
                            >
                              {s.value}
                            </motion.div>
                          </AnimatePresence>
                          <div className="card-eyebrow">{s.sub}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* disclaimer */}
                  <div className="card-inset !mt-0">
                    {t({
                      ar: "تقدير متحفّظ؛ النتائج الفعلية تختلف حسب القطاع وحجم الكتالوج وسلوك العملاء.",
                      en: "Conservative estimate; actual results vary by sector, catalog size, and shopper behavior.",
                    })}
                  </div>

                  {/* CTA */}
                  <Button variant="invert" size="lg" block onClick={onActivate}>
                    {t({ ar: "فعّل الآن", en: "Activate now" })}
                  </Button>
                </div>
              </div>
        </Shell>
      </Section>
  );
}
