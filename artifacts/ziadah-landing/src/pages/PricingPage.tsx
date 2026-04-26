import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";
import PlatformModal from "@/components/PlatformModal";

type PlanKey = "s" | "g" | "p" | "b";
type FeatureVal = boolean | string | null;
type FeatureRow = {
  ar: string;
  en: string;
  s: FeatureVal;
  g: FeatureVal;
  p: FeatureVal;
  b: FeatureVal;
};
type CategoryGroup = {
  arTitle: string;
  enTitle: string;
  features: FeatureRow[];
};

const FEATURE_GROUPS: CategoryGroup[] = [
  {
    arTitle: "الأساسيات",
    enTitle: "Basics",
    features: [
      { ar: "تجربة مجانية 7 أيام", en: "7-day free trial", s: true, g: true, p: true, b: true },
      { ar: "اقتراحات لامحدودة", en: "Unlimited suggestions", s: true, g: true, p: true, b: true },
      { ar: "مبيعات لامحدودة", en: "Unlimited sales", s: true, g: true, p: true, b: true },
      { ar: "مزامنة المنتجات", en: "Product sync", s: true, g: true, p: true, b: true },
      { ar: "نقاط ذكاء اصطناعي مجانية", en: "Free AI points", s: "60", g: "600", p: "6,000", b: "60,000" },
    ],
  },
  {
    arTitle: "العروض",
    enTitle: "Offers",
    features: [
      { ar: "عرض المنتجات المقترحة", en: "Suggested products display", s: true, g: true, p: true, b: true },
      { ar: "عرض الكميات", en: "Quantity offers", s: true, g: true, p: true, b: true },
      { ar: "عرض الكوبونات", en: "Coupon offers", s: false, g: true, p: true, b: true },
      { ar: "عرض الوصول للشحن المجاني", en: "Free-shipping threshold bar", s: false, g: false, p: true, b: true },
      { ar: "عرض استبدال المنتجات", en: "Product swap display", s: false, g: false, p: true, b: true },
    ],
  },
  {
    arTitle: "مواقع الاقتراحات",
    enTitle: "Suggestion Locations",
    features: [
      { ar: "صفحة المنتج", en: "Product page", s: true, g: true, p: true, b: true },
      { ar: "بعد إضافة المنتج", en: "After adding a product", s: false, g: true, p: true, b: true },
      { ar: "بعد حذف المنتج", en: "After removing a product", s: false, g: true, p: true, b: true },
      { ar: "صفحة السلة", en: "Cart page", s: false, g: true, p: true, b: true },
      { ar: "بعد الدفع", en: "After checkout", s: false, g: false, p: true, b: true },
      { ar: "حسب قيمة السلة", en: "Based on cart value", s: false, g: false, p: true, b: true },
      { ar: "الصفحة الرئيسية ★", en: "Home page ★", s: false, g: false, p: false, b: true },
      { ar: "صفحة التصنيفات ★", en: "Category pages ★", s: false, g: false, p: false, b: true },
      { ar: "صفحة الدفع ★", en: "Checkout page ★", s: false, g: false, p: false, b: true },
    ],
  },
  {
    arTitle: "المنتجات المُشغَّلة",
    enTitle: "Activated Products",
    features: [
      { ar: "منتجات محددة", en: "Specific products", s: true, g: true, p: true, b: true },
      { ar: "قيمة السلة", en: "Cart value triggers", s: true, g: true, p: true, b: true },
      { ar: "كل المنتجات", en: "All products", s: false, g: true, p: true, b: true },
    ],
  },
  {
    arTitle: "تصميم الاقتراحات",
    enTitle: "Recommendations Design",
    features: [
      { ar: "تخصيص الأزرار وتفاصيل المنتجات", en: "Button & product detail customization", s: true, g: true, p: true, b: true },
      { ar: "أشكال المنتجات", en: "Product shapes", s: false, g: true, p: true, b: true },
      { ar: "أشكال الاقتراحات", en: "Suggestion layouts", s: false, g: true, p: true, b: true },
    ],
  },
  {
    arTitle: "التقارير والإحصائيات",
    enTitle: "Reports & Analytics",
    features: [
      { ar: "تحليلات عامة لكل مقترح", en: "General analytics per recommendation", s: true, g: true, p: true, b: true },
      { ar: "تحليلات مفصلة حسب المنتج", en: "Detailed analytics per product", s: false, g: false, p: true, b: true },
    ],
  },
  {
    arTitle: "الخصائص المتطورة",
    enTitle: "Advanced Features",
    features: [
      { ar: "دعم الثيمات الخاصة", en: "Custom theme support", s: false, g: false, p: true, b: true },
      { ar: "فريق العمل", en: "Team members", s: false, g: "2", p: "2", b: "∞" },
      { ar: "مدير حساب خاص ★", en: "Dedicated success manager ★", s: false, g: false, p: false, b: true },
      { ar: "مراجعة شهرية استراتيجية ★", en: "Monthly strategic review ★", s: false, g: false, p: false, b: true },
      { ar: "دعم تقني مخصص ★", en: "Dedicated technical support ★", s: false, g: false, p: false, b: true },
    ],
  },
];

const CHECK = (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
    <circle cx="8.5" cy="8.5" r="8.5" fill="rgba(124,58,237,.18)" />
    <path d="M5 8.5l2.5 2.5 4.5-4.5" stroke="#a855f7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DASH = <span style={{ color: "rgba(255,255,255,.2)", fontSize: 16, lineHeight: 1 }}>—</span>;

function CellVal({ val, planKey }: { val: FeatureVal; planKey: PlanKey }) {
  if (val === true) return <span className="pp-check">{planKey === "b" ? <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="8.5" r="8.5" fill="rgba(217,119,6,.2)" /><path d="M5 8.5l2.5 2.5 4.5-4.5" stroke="#d97706" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg> : CHECK}</span>;
  if (val === false || val === null) return <span className="pp-dash">{DASH}</span>;
  return <span className="pp-val">{val}</span>;
}

export default function PricingPage() {
  const { lang } = useLanguage();
  const t = useSiteT();
  const [mode, setMode] = useState<"m" | "y">("y");
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(FEATURE_GROUPS.map((g) => [g.arTitle, true]))
  );
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [mobilePlanIdx, setMobilePlanIdx] = useState(1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".pp-root .rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const isAr = lang === "ar";
  const ld = t[lang].landing;
  const dir = isAr ? "rtl" : "ltr";

  const plans: {
    key: PlanKey;
    name: string;
    desc: string;
    mPrice: string | number;
    yPrice: string | number;
    yAnnual: string | number;
    yOrig: string;
    yDisc: string;
    badge: string | null;
    featured: boolean;
    featIntro: string | null;
    features: string[];
  }[] = [
    {
      key: "s",
      name: isAr ? "الانطلاقة" : "Starter",
      desc: isAr ? "للمبتدئين والراغبين بالتجربة" : "For beginners",
      mPrice: 29, yPrice: 24, yAnnual: 290, yOrig: "348", yDisc: "17%",
      badge: null, featured: false,
      featIntro: null,
      features: ld.planStarterFeatures as string[],
    },
    {
      key: "g",
      name: isAr ? "النمو" : "Growth",
      desc: isAr ? "للتجار الأفراد" : "For individual merchants",
      mPrice: 290, yPrice: 249, yAnnual: "2,990", yOrig: "3,480", yDisc: "14%",
      badge: null, featured: false,
      featIntro: ld.planGrowthIntro as string,
      features: ld.planGrowthFeatures as string[],
    },
    {
      key: "p",
      name: isAr ? "الاحترافية" : "Professional",
      desc: isAr ? "للشركات والمؤسسات" : "For companies",
      mPrice: 790, yPrice: 666, yAnnual: "7,990", yOrig: "9,480", yDisc: "16%",
      badge: isAr ? "الأكثر طلباً" : "Most Popular", featured: false,
      featIntro: ld.planProIntro as string,
      features: ld.planProFeatures as string[],
    },
    {
      key: "b",
      name: isAr ? "الأعمال" : "Business",
      desc: isAr ? "قيمة مخصصة للمنشآت الكبيرة" : "Custom value for large organizations",
      mPrice: "1,990", yPrice: "1,333", yAnnual: "15,990", yOrig: "23,880", yDisc: "33%",
      badge: isAr ? "للمتاجر الكبيرة" : "For Large Stores", featured: true,
      featIntro: ld.planBusinessIntro as string,
      features: ld.planBusinessFeatures as string[],
    },
  ];

  const toggleGroup = (title: string) =>
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <div className="pp-root" dir={dir}>

      {/* ── Hero ── */}
      <section className="pp-hero">
        <div className="wrap" style={{ textAlign: "center" }}>

          {/* Section tag — uses design system .stag */}
          <div className="stag" style={{ margin: "0 auto 22px" }}>
            <span className="stag-dot" />
            {isAr ? "الأسعار" : "Pricing"}
          </div>

          <h1 className="pp-title">
            {isAr ? "اختر الباقة المناسبة لمتجرك" : "Choose the right plan for your store"}
          </h1>
          <p className="ssub" style={{ margin: "0 auto 22px", textAlign: "center" }}>
            {isAr
              ? "اقتراحات ومبيعات لامحدودة في كل الباقات · شاملة الضريبة"
              : "Unlimited suggestions & sales in all plans · VAT included"}
          </p>

          {/* Toggle */}
          <div className="pp-toggle">
            <button className={`pp-tb${mode === "m" ? " on" : ""}`} onClick={() => setMode("m")}>
              {isAr ? "شهري" : "Monthly"}
            </button>
            <button className={`pp-tb${mode === "y" ? " on" : ""}`} onClick={() => setMode("y")}>
              {isAr ? "سنوي" : "Yearly"}
              <span className="pp-save-pill">{isAr ? "وفّر حتى 33٪" : "Save up to 33%"}</span>
            </button>
          </div>

          {/* Plan Cards */}
          <div className="pp-cards">
            {plans.map((plan, idx) => {
              const displayPrice = mode === "m" ? plan.mPrice : plan.yPrice;
              return (
                <div
                  key={plan.key}
                  className={`gc pp-card pp-card-in d${idx + 1}${plan.featured ? " pp-card--feat" : ""}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* Badge — absolute positioned like landing cards */}
                  {plan.badge && (
                    <div className="pp-card-badge">{plan.badge}</div>
                  )}

                  <div className="pp-card-name">{plan.name}</div>
                  <div className="pp-card-desc">{plan.desc}</div>

                  {/* Discount row */}
                  {mode === "y" && (
                    <div className="pp-card-orig-row">
                      <span className="pp-card-orig">{plan.yOrig} ⃁</span>
                      <span className="pp-card-disc">{plan.yDisc} {isAr ? "خصم" : "off"}</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="pp-card-price">
                    <span className="pp-card-num">{displayPrice}</span>
                    <span className="pp-card-cur">⃁</span>
                    <span className="pp-card-per">{isAr ? "/ شهر" : "/ mo"}</span>
                  </div>

                  {mode === "y" && (
                    <div className="pp-card-annual">
                      {isAr ? `يُدفع ${plan.yAnnual} ر.س سنوياً` : `Billed ${plan.yAnnual} SAR/year`}
                    </div>
                  )}

                  {/* CTA — uses design system button base */}
                  <button
                    className={`pp-card-cta${plan.featured ? " pp-card-cta--feat" : ""}`}
                    onClick={() => setPlatformModalOpen(true)}
                  >
                    {isAr ? "ابدأ الآن" : "Get Started"}
                  </button>

                  {/* Feature list */}
                  <div className="pp-card-feats">
                    {plan.featIntro && (
                      <p className="pp-card-feat-intro">{plan.featIntro}</p>
                    )}
                    <ul className="pp-card-feat-list">
                      {plan.features.map((f, i) => (
                        <li key={i} className="pp-card-feat-item">
                          <span className="pp-card-feat-check">✓</span>
                          {f.replace(" ★", "")}
                          {f.includes("★") && <span className="pp-card-feat-star">★</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Feature Comparison ── */}
      <section className="pp-compare">
        <div className="wrap">

          {/* Section heading — design system h2.st */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="stag" style={{ margin: "0 auto 16px" }}>
              <span className="stag-dot" />
              {isAr ? "مقارنة الخصائص" : "Feature Comparison"}
            </div>
            <h2 className="st">{isAr ? "ماذا يشمل كل باقة؟" : "What's included in each plan?"}</h2>
          </div>

          {/* Mobile plan selector — hidden on desktop */}
          <div className="pp-mobile-plan-tabs">
            {plans.map((plan, i) => (
              <button
                key={plan.key}
                className={`pp-mobile-plan-tab${mobilePlanIdx === i ? " pp-mobile-plan-tab--on" : ""}${plan.featured ? " pp-mobile-plan-tab--feat" : ""}`}
                onClick={() => setMobilePlanIdx(i)}
              >
                {plan.name}
              </button>
            ))}
          </div>

          {/* Sticky header */}
          <div className="pp-tbl-head">
            <div className="pp-tbl-label-col" />
            {plans.map((plan, i) => (
              <div key={plan.key} className={`pp-tbl-plan-col${plan.featured ? " pp-tbl-plan-col--feat" : ""}${mobilePlanIdx === i ? " pp-tbl-plan-col--m-active" : ""}`}>
                <div className="pp-tbl-plan-name">{plan.name}</div>
                <div className="pp-tbl-plan-price">
                  {mode === "m" ? plan.mPrice : plan.yPrice}{" "}
                  <span style={{ fontSize: 11 }}>⃁/{isAr ? "شهر" : "mo"}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature groups */}
          {FEATURE_GROUPS.map((group) => {
            const isOpen = open[group.arTitle] !== false;
            const title = isAr ? group.arTitle : group.enTitle;
            return (
              <div key={group.arTitle} className="pp-group">
                <button
                  className="pp-group-header"
                  onClick={() => toggleGroup(group.arTitle)}
                  aria-expanded={isOpen}
                >
                  <span className="pp-group-title">{title}</span>
                  <span className={`pp-group-chevron${isOpen ? " open" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="pp-group-body">
                    {group.features.map((feat, fi) => (
                      <div key={fi} className={`pp-row${fi % 2 === 1 ? " pp-row--alt" : ""}`}>
                        <div className="pp-row-label">
                          {isAr ? feat.ar : feat.en}
                        </div>
                        {plans.map((plan, i) => (
                          <div key={plan.key} className={`pp-row-cell${plan.featured ? " pp-row-cell--feat" : ""}${mobilePlanIdx === i ? " pp-row-cell--m-active" : ""}`}>
                            <CellVal val={feat[plan.key]} planKey={plan.key} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Footnote */}
          <p className="pp-footnote">
            {isAr
              ? "★ المميزات المحددة بالنجمة حصرية لباقة الأعمال · نقاط الذكاء الاصطناعي تُستهلك فقط عند إتمام شراء فعلي عبر الاقتراح الذكي"
              : "★ Star features are exclusive to the Business plan · AI points are only consumed when a purchase is completed via a smart suggestion"}
          </p>
        </div>
      </section>

      {/* ── Activation CTA ── */}
      <section className="pp-activate">
        <div className="pp-activate-glow" aria-hidden />
        <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="stag" style={{ margin: "0 auto 18px" }}>
            <span className="stag-dot" />
            {isAr ? "ابدأ الآن" : "Get Started"}
          </div>
          <h2 className="pp-activate-title">
            {isAr ? "فعّل متجرك اليوم" : "Activate Your Store Today"}
          </h2>
          <p className="ssub" style={{ margin: "0 auto 10px", textAlign: "center" }}>
            {isAr
              ? "7 أيام تجربة مجانية · بدون بطاقة ائتمانية · إلغاء في أي وقت"
              : "7-day free trial · No credit card · Cancel anytime"}
          </p>
          <p className="pp-activate-sub">
            {isAr
              ? "تفعيل فوري على منصات زد وسلة وبيع"
              : "Instant activation on Zid, Salla & Bea"}
          </p>
          <button
            className="pp-activate-btn"
            onClick={() => setPlatformModalOpen(true)}
          >
            {isAr ? "ابدأ التفعيل المجاني" : "Start Free Activation"}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </div>
  );
}
