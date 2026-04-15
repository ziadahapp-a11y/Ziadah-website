import { useState, useCallback, useEffect } from "react";
import { t } from "@/i18n/translations";
import PageShell from "../components/PageShell";
import DsPageBackdrop from "@/components/DsPageBackdrop";
import PlatformModal from "../components/PlatformModal";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

function fmtLocale(
  n: number,
  locale: string,
  decimals = 0,
): string {
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

interface SliderCardProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatDisplay: (n: number) => string;
  formatTick: (n: number) => string;
  color: string;
  colorRgb: string;
}

function SliderCard({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatDisplay,
  formatTick,
  color,
  colorRgb,
}: SliderCardProps) {
  const pct = ((value - min) / (max - min)) * 100;

  const apply = useCallback(
    (raw: number) => {
      onChange(snapToStep(raw, min, step));
    },
    [onChange, min, step],
  );

  return (
    <div
      style={{
        backgroundColor: "rgba(115, 0, 230, 0.02)",
        border: "1px solid var(--b1)",
        borderRadius: 16,
        padding: "24px 28px",
        borderInlineEnd: `4px solid ${color}`,
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          overflow: "hidden",
          backdropFilter: "blur(4px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
          position: "relative",
          zIndex: 1,
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--t)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            color,
            background: `rgba(${colorRgb},.12)`,
            border: `1px solid rgba(${colorRgb},.25)`,
            borderRadius: 10,
            padding: "4px 14px",
            minWidth: 100,
            textAlign: "center",
            display: "inline-block",
          }}
        >
          {formatDisplay(value)}
        </span>
      </div>
      {/* عزل LTR: سلوك المنزلق واتجاه التعبئة ثابتان في كل اللغات */}
      <div
        dir="ltr"
        lang="en"
        style={{
          direction: "ltr",
          unicodeBidi: "isolate",
          position: "relative",
          zIndex: 1,
          minHeight: 52,
          paddingTop: 4,
          paddingBottom: 2,
        }}
      >
        <div
          style={{
            position: "relative",
            height: 10,
            borderRadius: 5,
            background: "var(--b1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: pct + "%",
              background: `linear-gradient(90deg, rgba(${colorRgb},.45), ${color})`,
              borderRadius: 5,
              pointerEvents: "none",
            }}
          />
        </div>
        <input
          className="calc-range-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          onChange={(e) => apply(Number(e.currentTarget.value))}
          onInput={(e) => apply(Number(e.currentTarget.value))}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -6,
            width: "100%",
            height: 40,
            margin: 0,
            padding: 0,
            cursor: "pointer",
            zIndex: 2,
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "var(--td)",
            marginTop: 12,
            pointerEvents: "none",
          }}
        >
          <span>{formatTick(min)}</span>
          <span>{formatTick(max)}</span>
        </div>
      </div>
    </div>
  );
}

export default function Calculator() {
  const t = useSiteT();
  const { lang, dir } = useLanguage();
  const tr = t[lang].calculator;
  const pk = getPageKeywords("/calculator");
  const numLocale = lang === "ar" ? "ar-SA-u-nu-latn" : "en-US";
  const currencySuffix = lang === "ar" ? " ⃁" : " SAR";
  const fmtN = (n: number, decimals = 0) => fmtLocale(n, numLocale, decimals);
  const fmtCur = (n: number) => fmtLocale(Math.round(n), numLocale) + currencySuffix;
  const fmtP = (n: number, decimals = 1) =>
    "+" + fmtLocale(n, numLocale, decimals) + "%";

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

  const sliders: SliderCardProps[] = [
    {
      label: tr.monthlyVisitors,
      value: visitors,
      min: 1000,
      max: 500000,
      step: 1000,
      onChange: setVisitors,
      formatDisplay: (n) => fmtN(n),
      formatTick: (n) => fmtN(n),
      color: "#3b82f6",
      colorRgb: "59,130,246",
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
      color: "#22c55e",
      colorRgb: "34,197,94",
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
      color: "#a855f7",
      colorRgb: "168,85,247",
    },
  ];

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
      <PageShell className="relative overflow-x-clip" style={{ color: "var(--t)" }}>
        <DsPageBackdrop />

        <section
          style={{
            position: "relative",
            zIndex: 2,
            padding: "var(--page-hero-pt) var(--page-inline-pad) 80px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="stag rv" style={{ display: "inline-flex" }}>
                <span className="stag-dot" />
                {tr.tag}
              </div>
              <h1
                className="st rv d1"
                style={{
                  fontSize: "clamp(22px,4.5vw,60px)",
                  marginTop: 12,
                  marginBottom: 8,
                }}
              >{tr.title}</h1>
              <p
                className="ssub rv d2"
                style={{ margin: "0 auto", maxWidth: 520 }}
              >{tr.subtitle}</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                direction: dir,
              }}
              className="calc-grid"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  direction: dir,
                  unicodeBidi: "isolate",
                }}
              >
                {sliders.map((s) => (
                  <SliderCard key={s.label} {...s} />
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  direction: dir,
                  unicodeBidi: "isolate",
                }}
              >
                <div
                  className="calc-result-cols"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                    direction: dir,
                  }}
                >
                  <div
                    style={{
                      background: "var(--s1)",
                      border: "1px solid var(--b1)",
                      borderRadius: 16,
                      padding: "24px 22px",
                      borderTop: "3px solid var(--b2)",
                      direction: dir,
                      unicodeBidi: "isolate",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--td)",
                        marginBottom: 18,
                        letterSpacing: 0.3,
                      }}
                    >
                      {tr.withoutRec}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", marginBottom: 3 }}>{tr.monthlyOrders}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "var(--t)" }}>
                          {fmtN(Math.round(r.orders))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", marginBottom: 3 }}>{tr.avgOrder}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "var(--t)" }}>
                          {fmtCur(aov)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", marginBottom: 3 }}>{tr.monthlyRevenue}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "var(--t)" }}>
                          {fmtCur(r.baseRevenue)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(34,197,94,.06)",
                      border: "1px solid rgba(34,197,94,.2)",
                      borderRadius: 16,
                      padding: "24px 22px",
                      borderTop: "3px solid #22c55e",
                      position: "relative",
                      overflow: "hidden",
                      direction: dir,
                      unicodeBidi: "isolate",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(ellipse at 50% 0%,rgba(34,197,94,.08) 0%,transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#22c55e",
                        marginBottom: 18,
                        letterSpacing: 0.3,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {tr.withRec}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", marginBottom: 3 }}>{tr.monthlyOrders}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>
                          {fmtN(Math.round(r.orders))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", marginBottom: 3 }}>{tr.effectiveAvgOrder}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>
                            {fmtCur(r.effectiveAov)}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: "#22c55e",
                              background: "rgba(34,197,94,.15)",
                              border: "1px solid rgba(34,197,94,.3)",
                              borderRadius: 6,
                              padding: "2px 7px",
                            }}
                          >
                            +{fmtCur(r.aovIncrease)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", marginBottom: 3 }}>{tr.monthlyRevenue}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>
                          {fmtCur(r.newRevenue)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg,rgba(251,146,60,.08),rgba(245,158,11,.06))",
                    border: "1px solid rgba(251,146,60,.25)",
                    borderRadius: 18,
                    padding: "28px 28px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(ellipse at 50% 0%,rgba(251,146,60,.1) 0%,transparent 65%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#fb923c",
                      marginBottom: 22,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#fb923c",
                        display: "inline-block",
                      }}
                    />
                    {tr.impactSummary}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 12,
                      position: "relative",
                      zIndex: 1,
                      direction: dir,
                    }}
                    className="impact-grid"
                  >
                    <div
                      style={{
                        background: "rgba(0,0,0,.25)",
                        borderRadius: 14,
                        padding: "18px 16px",
                        textAlign: "center",
                        border: "1px solid rgba(251,146,60,.12)",
                        direction: dir,
                        unicodeBidi: "isolate",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--td)",
                          marginBottom: 8,
                          fontWeight: 600,
                        }}
                      >
                        {tr.additionalRevenue}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(16px,2.5vw,24px)",
                          fontWeight: 900,
                          color: "#fb923c",
                          lineHeight: 1.1,
                        }}
                      >
                        +{fmtCur(r.addRevenue)}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--td)",
                          marginTop: 4,
                        }}
                      >
                        {tr.perMonth}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(0,0,0,.25)",
                        borderRadius: 14,
                        padding: "18px 16px",
                        textAlign: "center",
                        border: "1px solid rgba(251,146,60,.12)",
                        direction: dir,
                        unicodeBidi: "isolate",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--td)",
                          marginBottom: 8,
                          fontWeight: 600,
                        }}
                      >
                        {tr.revenueGrowth}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(16px,2.5vw,24px)",
                          fontWeight: 900,
                          color: "#fb923c",
                          lineHeight: 1.1,
                        }}
                      >
                        {fmtP(r.revGrowth)}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--td)",
                          marginTop: 4,
                        }}
                      >
                        {tr.growthRate}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(0,0,0,.25)",
                        borderRadius: 14,
                        padding: "18px 16px",
                        textAlign: "center",
                        border: "1px solid rgba(251,146,60,.12)",
                        direction: dir,
                        unicodeBidi: "isolate",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--td)",
                          marginBottom: 8,
                          fontWeight: 600,
                        }}
                      >
                        {tr.aovIncrease}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(16px,2.5vw,24px)",
                          fontWeight: 900,
                          color: "#fb923c",
                          lineHeight: 1.1,
                        }}
                      >
                        +{fmtCur(r.aovIncrease)}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--td)",
                          marginTop: 4,
                        }}
                      >
                        {tr.perOrder}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "var(--s1)",
                    border: "1px solid var(--b1)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    fontSize: 12,
                    color: "var(--td)",
                    lineHeight: 1.7,
                  }}
                >
                  {tr.disclaimer}
                </div>

                <button
                  onClick={() => setPlatformModalOpen(true)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "16px 32px",
                    background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                    border: "1px solid rgba(168,85,247,.4)",
                    borderRadius: 14,
                    color: "#fff",
                    fontFamily: "var(--font)",
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "all .25s",
                    boxShadow: "0 8px 32px rgba(124,58,237,.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(124,58,237,.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(124,58,237,.35)";
                  }}
                >
                  {tr.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          /* منزلق شفاف فوق الشريط المرسوم: يبقى تفاعل الماوس موثوقاً */
          input.calc-range-input {
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
          }
          input.calc-range-input:focus {
            outline: none;
          }
          input.calc-range-input::-webkit-slider-runnable-track {
            height: 10px;
            background: transparent;
            border: none;
          }
          input.calc-range-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: transparent;
            border: none;
            margin-top: -5px;
            box-shadow: none;
            cursor: pointer;
          }
          input.calc-range-input::-moz-range-track {
            height: 10px;
            background: transparent;
            border: none;
          }
          input.calc-range-input::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: transparent;
            border: none;
            border-width: 0;
            cursor: pointer;
          }

          @media (max-width: 1024px) {
            .calc-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 768px) {
            .calc-grid {
              grid-template-columns: 1fr !important;
            }
            .calc-result-cols {
              grid-template-columns: 1fr !important;
            }
            .impact-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
          @media (max-width: 480px) {
            .impact-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </PageShell>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
