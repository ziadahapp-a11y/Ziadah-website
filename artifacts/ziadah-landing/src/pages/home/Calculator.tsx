import { useCallback, useState } from "react";
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
 * THREE QUESTIONS, ONE ANSWER. It used to be three slider cards beside two
 * before/after cards, an impact summary of three more numbers and a disclaimer:
 * nine boxes and about fifteen figures for one thing a merchant came to learn,
 * which is how much more they would earn. Now the three inputs are plain rows
 * and the answer is one number, with one line under it saying where it comes
 * from. The assumption the number rests on stays in the line under the
 * heading, because a figure with its basis removed claims more than it should.
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
function CalcSliderRow({
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
    <div className="calc2-field">
      <div className="calc2-field-head">
        <span className="calc2-field-k">{label}</span>
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
      <div className="calc2-ticks num-ltr">
        <span>{formatTick(min)}</span>
        <span>{formatTick(max)}</span>
      </div>
    </div>
  );
}

export function Calculator({
  onActivate,
  invert = true,
}: {
  onActivate?: () => void;
  /**
   * The home page runs this band dark, between a pale widgets band and a pale
   * pricing band. The standalone `/calculator` page runs it pale, because
   * there it sits between a dark hero and the dark closing CTA and three dark
   * bands in a row is one long dark block. Everything inside is written from
   * the section's own pair, so the flip costs nothing.
   */
  invert?: boolean;
}) {
  const { lang } = useLanguage();
  const t = useT();
  const isAr = lang === "ar";
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

  const fmtShort = (n: number) => fmtN(Math.round(n));

  return (
    <Section id="calculator" family="violet" invert={invert}>
      <SectionHead center
        kicker={t({ ar: "حاسبة", en: "Calculator" })}
        title={t({ ar: "احسب إيرادك الإضافي مع زيادة", en: "Calculate your extra revenue with Ziadah" })}
        lead={t({
          ar: "حرّك زوارك ومعدّل التحويل ومتوسط قيمة الطلب، وشوف كم يضيف لك رفع متوسط الطلب - كل شهر.",
          en: "Adjust your visitors, conversion rate, and average order value to see how much a higher AOV adds - every month.",
        })}
      />
      <Shell>
        <p className="hero-caption calc-basis">
          {t({
            ar: "بناءً على متاجر تستخدم زيادة، نفترض أن ~20% من الطلبات تقبل الاقتراح فترتفع قيمتها ~30%.",
            en: "Based on stores using Ziadah, we assume ~20% of orders accept the suggestion, lifting their value ~30%.",
          })}
        </p>

        <div className="calc2" style={{ unicodeBidi: "isolate" }}>
          <div className="calc2-controls">
            {calcSliders.map((s) => (
              <CalcSliderRow key={s.label} {...s} dir={isAr ? "rtl" : "ltr"} />
            ))}
          </div>

          <div className="calc2-result">
            <span className="calc2-k">{t({ ar: "إيرادك الإضافي شهرياً", en: "Your extra revenue per month" })}</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={Math.round(r.addRevenue)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="calc2-v num-ltr"
              >
                +{fmtShort(r.addRevenue)} <small>{riyal}</small>
              </motion.div>
            </AnimatePresence>
            <p className="calc2-from num-ltr">
              {t({ ar: "من", en: "From" })} {fmtCur(r.baseRevenue)} {t({ ar: "إلى", en: "to" })} {fmtCur(r.newRevenue)}
            </p>
            <Button variant="invert" size="lg" block onClick={onActivate}>
              {t({ ar: "فعّل الآن", en: "Activate now" })}
            </Button>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
