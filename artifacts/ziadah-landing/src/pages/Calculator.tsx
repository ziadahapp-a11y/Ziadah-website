import { useState, useCallback, useEffect } from "react";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import PlatformModal from "../components/PlatformModal";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/JsonLd";

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtCurrency(n: number): string {
  return fmt(Math.round(n)) + " ⃁";
}

function fmtPct(n: number, decimals = 1): string {
  return "+" + fmt(n, decimals) + "%";
}

interface SliderCardProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
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
  display,
  color,
  colorRgb,
}: SliderCardProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div
      style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.09)",
        borderRadius: 16,
        padding: "24px 28px",
        borderRight: `4px solid ${color}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 0% 50%, rgba(${colorRgb},.06) 0%, transparent 70%)`,
          pointerEvents: "none",
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
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "rgba(255,255,255,.9)",
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
          {display}
        </span>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            position: "relative",
            height: 8,
            borderRadius: 4,
            background: "rgba(255,255,255,.1)",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: pct + "%",
              background: `linear-gradient(90deg, rgba(${colorRgb},.4), ${color})`,
              borderRadius: 4,
              transition: "width .1s",
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            top: -10,
            right: 0,
            left: 0,
            width: "100%",
            height: 28,
            opacity: 0,
            cursor: "pointer",
            direction: "rtl",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "rgba(255,255,255,.3)",
            marginTop: 4,
          }}
        >
          <span>{max.toLocaleString("en-US")}</span>
          <span>{min.toLocaleString("en-US")}</span>
        </div>
      </div>
    </div>
  );
}

export default function Calculator() {
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
      label: "الزوار الشهريون",
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
      label: "معدل التحويل",
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
      label: "متوسط قيمة الطلب",
      value: aov,
      min: 50,
      max: 5000,
      step: 10,
      onChange: setAov,
      display: fmt(aov) + " ⃁",
      color: "#a855f7",
      colorRgb: "168,85,247",
    },
  ];

  return (
    <>
      <SEO
        title="حاسبة أثر زيادة — احسب مكاسبك المتوقعة"
        description="استخدم حاسبة زيادة التفاعلية لمعرفة كم ستزيد مبيعاتك عند استخدام توصيات الذكاء الاصطناعي. أدخل بيانات متجرك واحصل على توقعات دقيقة."
        canonical="/calculator"
      />
      <BreadcrumbSchema items={[{ name: "الرئيسية", url: "/" }, { name: "الحاسبة", url: "/calculator" }]} />
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          fontFamily: "var(--font)",
          direction: "rtl",
          color: "var(--t)",
        }}
      >
        <div className="bg-wrap">
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />
          <div className="bg-grid" />
        </div>
        <div className="noise" />
        <ParticleBackground />
        <Nav />

        <section
          style={{
            paddingTop: 130,
            paddingBottom: 80,
            position: "relative",
            zIndex: 2,
            padding: "130px 5% 80px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="stag rv" style={{ display: "inline-flex" }}>
                <span className="stag-dot" />
                أداة تفاعلية
              </div>
              <h1
                className="st rv d1"
                style={{
                  fontSize: "clamp(32px,4.5vw,60px)",
                  marginTop: 12,
                  marginBottom: 8,
                }}
              >حاسبة أثر زيادة ✨</h1>
              <p
                className="ssub rv d2"
                style={{ margin: "0 auto", maxWidth: 520 }}
              >بناءً على متوسط أداء المتاجر</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
              }}
              className="calc-grid"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {sliders.map((s) => (
                  <SliderCard key={s.label} {...s} />
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div
                  className="calc-result-cols"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.1)",
                      borderRadius: 16,
                      padding: "24px 22px",
                      borderTop: "3px solid rgba(255,255,255,.18)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "rgba(255,255,255,.45)",
                        marginBottom: 18,
                        letterSpacing: 0.3,
                      }}
                    >
                      بدون توصيات
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>الطلبات الشهرية</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "rgba(255,255,255,.85)" }}>
                          {fmt(Math.round(r.orders))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>متوسط الطلب</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "rgba(255,255,255,.85)" }}>
                          {fmtCurrency(aov)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>الإيراد الشهري</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "rgba(255,255,255,.85)" }}>
                          {fmtCurrency(r.baseRevenue)}
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
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#22c55e",
                        marginBottom: 18,
                        letterSpacing: 0.3,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      مع توصيات Cross-sell / Upsell
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
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>الطلبات الشهرية</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>
                          {fmt(Math.round(r.orders))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>متوسط الطلب الفعلي</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>
                            {fmtCurrency(r.effectiveAov)}
                          </span>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 800,
                              color: "#22c55e",
                              background: "rgba(34,197,94,.15)",
                              border: "1px solid rgba(34,197,94,.3)",
                              borderRadius: 6,
                              padding: "2px 7px",
                            }}
                          >
                            +{fmtCurrency(r.aovIncrease)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>الإيراد الشهري</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>
                          {fmtCurrency(r.newRevenue)}
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
                    ملخص الأثر
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 12,
                      position: "relative",
                      zIndex: 1,
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
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,.4)",
                          marginBottom: 8,
                          fontWeight: 600,
                        }}
                      >
                        إيراد إضافي
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(16px,2.5vw,24px)",
                          fontWeight: 900,
                          color: "#fb923c",
                          lineHeight: 1.1,
                        }}
                      >
                        +{fmtCurrency(r.addRevenue)}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,.3)",
                          marginTop: 4,
                        }}
                      >
                        /شهر
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(0,0,0,.25)",
                        borderRadius: 14,
                        padding: "18px 16px",
                        textAlign: "center",
                        border: "1px solid rgba(251,146,60,.12)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,.4)",
                          marginBottom: 8,
                          fontWeight: 600,
                        }}
                      >
                        نمو الإيراد
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(16px,2.5vw,24px)",
                          fontWeight: 900,
                          color: "#fb923c",
                          lineHeight: 1.1,
                        }}
                      >
                        {fmtPct(r.revGrowth)}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,.3)",
                          marginTop: 4,
                        }}
                      >
                        نسبة الزيادة
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(0,0,0,.25)",
                        borderRadius: 14,
                        padding: "18px 16px",
                        textAlign: "center",
                        border: "1px solid rgba(251,146,60,.12)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,.4)",
                          marginBottom: 8,
                          fontWeight: 600,
                        }}
                      >
                        زيادة متوسط الطلب
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(16px,2.5vw,24px)",
                          fontWeight: 900,
                          color: "#fb923c",
                          lineHeight: 1.1,
                        }}
                      >
                        +{fmtCurrency(r.aovIncrease)}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,.3)",
                          marginTop: 4,
                        }}
                      >
                        لكل طلب
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    fontSize: 14,
                    color: "rgba(255,255,255,.3)",
                    lineHeight: 1.7,
                  }}
                >
                  * هذه الأرقام تقديرية بناءً على المدخلات المختارة وتجارب عملاء زيادة. النتائج الفعلية تختلف حسب طبيعة المتجر والمنتجات والجمهور المستهدف.
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
                  فعّل زيادة وحقق هذه الأرقام الآن
                </button>
              </div>
            </div>
          </div>
        </section>

        <style>{`
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
      </div>
      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
