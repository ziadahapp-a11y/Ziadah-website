import { useState, useCallback } from "react";
import { navigateTo } from "@/components/PageTransition";
import PlatformModal from "@/components/PlatformModal";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import { Editable } from "@/cms/components/Editable";
import { cmsKey } from "@/cms/cmsKeys";

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

interface SliderProps {
  label: string;
  labelKey: "labelVisitors" | "labelConvRate" | "labelAOV";
  lang: "ar" | "en";
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  color: string;
  colorRgb: string;
}

function HomeSlider({ label, labelKey, lang, value, min, max, step, onChange, display, color, colorRgb }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="hc-slider-row">
      <div className="hc-slider-header">
        <span className="hc-slider-label">
          <Editable contentKey={cmsKey(lang, "homeCalculator", labelKey)} label={label} type="text">
            {label}
          </Editable>
        </span>
        <span className="hc-slider-value" style={{ color, background: `rgba(${colorRgb},.12)`, border: `1px solid rgba(${colorRgb},.25)` }}>
          {display}
        </span>
      </div>
      <div className="hc-slider-track-wrap">
        <div className="hc-slider-track">
          <div
            className="hc-slider-fill"
            style={{ width: pct + "%", background: `linear-gradient(90deg, rgba(${colorRgb},.4), ${color})` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="hc-slider-input"
        />
        <div className="hc-slider-range">
          <span>{max.toLocaleString("en-US")}</span>
          <span>{min.toLocaleString("en-US")}</span>
        </div>
      </div>
    </div>
  );
}

export default function HomeCalculator() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const tr = t[lang].homeCalculator;

  const [visitors, setVisitors] = useState(50000);
  const [convRate, setConvRate] = useState(2.5);
  const [aov, setAov] = useState(250);
  const [modalOpen, setModalOpen] = useState(false);

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
    const addRevenue = newRevenue - baseRevenue;
    return { addRevenue };
  }, [visitors, convRate, aov]);

  const { addRevenue } = calc();

  const sliders: SliderProps[] = [
    {
      label: tr.labelVisitors,
      labelKey: "labelVisitors",
      lang,
      value: visitors,
      min: 1000,
      max: 500000,
      step: 1000,
      onChange: setVisitors,
      display: fmt(visitors),
      color: "#3b82f6",
      colorRgb: "59,130,246",
    },
    {
      label: tr.labelConvRate,
      labelKey: "labelConvRate",
      lang,
      value: convRate,
      min: 0.5,
      max: 15,
      step: 0.1,
      onChange: setConvRate,
      display: fmt(convRate, 1) + "%",
      color: "#22c55e",
      colorRgb: "34,197,94",
    },
    {
      label: tr.labelAOV,
      labelKey: "labelAOV",
      lang,
      value: aov,
      min: 50,
      max: 5000,
      step: 10,
      onChange: setAov,
      display: fmt(aov) + tr.resultCurrency,
      color: "#a855f7",
      colorRgb: "168,85,247",
    },
  ];

  return (
    <>
    <section className="hc-sec">
      <div className="wrap">
        <div className="tc" style={{ marginBottom: 48 }}>
          <div className="stag rv" style={{ display: "inline-flex" }}>
            <span className="stag-dot" />
            <Editable contentKey={cmsKey(lang, "homeCalculator", "tag")} label="Home calculator tag" type="text">
              {tr.tag}
            </Editable>
          </div>
          <h2 className="st rv d1 font-semibold">
            <Editable contentKey={cmsKey(lang, "homeCalculator", "title")} label="Home calculator title" type="text">
              {tr.title}
            </Editable>
          </h2>
          <p className="ssub rv d2">
            <Editable contentKey={cmsKey(lang, "homeCalculator", "subtitle")} label="Home calculator subtitle" type="text">
              {tr.subtitle}
            </Editable>
          </p>
        </div>

        <div className="hc-card rv d2">
          <div className="hc-grid">
            <div className="hc-sliders">
              {sliders.map((s) => (
                <HomeSlider key={s.labelKey} {...s} />
              ))}
            </div>

            <div className="hc-result">
              <div className="hc-result-inner">
                <div className="hc-result-label">
                  <Editable contentKey={cmsKey(lang, "homeCalculator", "resultLabel")} label="Result label" type="text">
                    {tr.resultLabel}
                  </Editable>
                </div>
                <div className="hc-result-amount">
                  {fmt(Math.round(addRevenue))}
                  <span className="hc-result-currency">
                    <Editable contentKey={cmsKey(lang, "homeCalculator", "resultCurrency")} label="Currency suffix" type="text">
                      {tr.resultCurrency}
                    </Editable>
                  </span>
                </div>
                <div className="hc-result-note">
                  <Editable contentKey={cmsKey(lang, "homeCalculator", "resultNote")} label="Result note" type="text">
                    {tr.resultNote}
                  </Editable>
                </div>
                <div className="hc-result-ctas">
                  <span
                    onClick={() => navigateTo("/calculator")}
                    className="hc-btn-primary"
                    style={{ cursor: "pointer" }}
                  >
                    <Editable contentKey={cmsKey(lang, "homeCalculator", "btnDetailed")} label="Detailed calculator CTA" type="text">
                      {tr.btnDetailed}
                    </Editable>
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="hc-btn-secondary"
                  >
                    <Editable contentKey={cmsKey(lang, "homeCalculator", "btnStart")} label="Start CTA" type="text">
                      {tr.btnStart}
                    </Editable>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <PlatformModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
