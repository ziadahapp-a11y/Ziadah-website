import { useState, useEffect } from "react";
import {
  Check,
  CheckCircle2,
  Minus,
  Sparkles,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import PageShell from "@/components/PageShell";
import PlatformModal from "@/components/PlatformModal";
import PageClosingCta from "@/components/PageClosingCta";
import BilingualSEO from "@/components/BilingualSEO";
import { PricingPageSchema } from "@/components/JsonLd";
import { AI_TOPUPS, parsePrice, fmtPrice } from "@/data/aiTopups";
import { HeroLede, Section as DsSection, SectionHead } from "@/sections";
import { Shell, Button as MkButton } from "@/components/mk";
import { t as siteTranslations } from "@/i18n/translations";
import { usePricingPlans, maxAnnualDiscount, type BillingMode } from "@/lib/pricing-data";

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
      { ar: "نقاط ذكاء اصطناعي مجانية / شهر", en: "Free AI points / month", s: "5", g: "50", p: "500", b: "5,000" },
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

/* One comparison-table cell. The featured plan used to recolour every glyph
   inside it - a violet-600 check against a violet-500 one, which nobody can
   tell apart. The column's own tint carries that emphasis now, so the glyph
   only has to say yes, no, or how many. */
function CellVal({ val }: { val: FeatureVal }) {
  if (val === true) return <Check className="cmp-yes" strokeWidth={2.5} aria-hidden />;
  if (val === false || val === null) return <Minus className="cmp-no" aria-hidden />;
  return <span className="cmp-val num-ltr">{val}</span>;
}

export default function PricingPage() {
  const { lang } = useLanguage();
  const t = siteTranslations;
  const [mode, setMode] = useState<BillingMode>("y");
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(FEATURE_GROUPS.map((g) => [g.arTitle, true]))
  );
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [mobilePlanIdx, setMobilePlanIdx] = useState(1);
  const [topupOpen, setTopupOpen] = useState<Record<PlanKey, boolean>>({ s: false, g: false, p: false, b: false });
  const [topupSel, setTopupSel] = useState<Record<PlanKey, number | null>>({ s: null, g: null, p: null, b: null });
  const toggleTopup = (k: PlanKey) => setTopupOpen((prev) => ({ ...prev, [k]: !prev[k] }));
  const selectTopup = (k: PlanKey, idx: number | null) => {
    setTopupSel((prev) => ({ ...prev, [k]: idx }));
    setTopupOpen((prev) => ({ ...prev, [k]: false }));
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".pp-root .rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const isAr = lang === "ar";

  /* The official SAR glyph (U+20C1) is not covered by the loaded font and

     rendered as a tofu box beside every figure on this page. */

  const riyal = isAr ? "ر.س" : "SAR";
  const ld = t[lang].landing;
  const pc = t[lang].pageClosingCta;
  const dir = isAr ? "rtl" : "ltr";


  /* One table, shared with the home page's pricing band. */
  const plans = usePricingPlans();

  const toggleGroup = (title: string) =>
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <>
      <BilingualSEO
        titleAr="أسعار زيادة — اختر الباقة المناسبة لمتجرك"
        titleEn="Ziadah Pricing — Plans for Zid & Salla Stores"
        descriptionAr="تعرّف على باقات زيادة الأربع: الانطلاقة والنمو والاحترافية والأعمال. اقتراحات ومبيعات لامحدودة في كل الباقات — شاملة ضريبة القيمة المضافة."
        descriptionEn="Explore Ziadah's four AI-powered plans for Zid & Salla stores: Starter, Growth, Professional, and Business — unlimited suggestions, unlimited sales, VAT included."
        canonical="/pricing"
        keywordsAr="أسعار زيادة، باقات زيادة، اشتراك زيادة، تجربة مجانية، اقتراح منتجات، ذكاء اصطناعي، زد، سلة"
        keywordsEn="Ziadah pricing, Ziadah plans, Zid app pricing, Salla app pricing, AI ecommerce subscription"
      />
      <PricingPageSchema />

      <PageShell className="pp-root relative overflow-x-clip">
        <div dir={dir}>
          {/* ══════════════════ HERO + PLAN CARDS ══════════════════ */}
          <HeroLede
            compact
            family="grey"
            eyebrow={isAr ? "الأسعار" : "Pricing"}
            title={isAr ? "اختر الباقة المناسبة لمتجرك" : "Choose the right plan for your store"}
            body={
              isAr
                ? "اقتراحات ومبيعات لامحدودة في كل الباقات · شاملة الضريبة"
                : "Unlimited suggestions & sales in all plans · VAT included"
            }
          >
            {/* Monthly against yearly changes every number in the grid below,
                so the switch belongs with the headline rather than floating
                above the cards it governs. */}
            <div className="hero-tabs" role="tablist" aria-label={isAr ? "دورة الفوترة" : "Billing cycle"}>
              <button type="button" role="tab" aria-selected={mode === "m"} className="hero-tab" onClick={() => setMode("m")}>
                {isAr ? "شهري" : "Monthly"}
              </button>
              <button type="button" role="tab" aria-selected={mode === "y"} className="hero-tab" onClick={() => setMode("y")}>
                {isAr ? "سنوي" : "Yearly"}
                <span className="hero-tab-note">{isAr ? `وفّر حتى ${maxAnnualDiscount(plans)}` : `Save up to ${maxAnnualDiscount(plans)}`}</span>
              </button>
            </div>
          </HeroLede>

          <DsSection family="grey" flushTop>
            <Shell width="wide">
              {/* Plan Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
                {plans.map((plan) => {
                  const featured = plan.featured;
                  const basePrice = mode === "m" ? plan.mPrice : plan.yPrice;
                  const selTopup = topupSel[plan.key] != null ? AI_TOPUPS[topupSel[plan.key]!] : null;
                  const topupBase = mode === "m" ? plan.mPrice : plan.yAnnual;
                  const displayPrice = selTopup
                    ? fmtPrice(parsePrice(topupBase) + selTopup.price)
                    : basePrice;
                  const priceLabel = selTopup && mode === "y"
                    ? (isAr ? "/ سنة" : "/ yr")
                    : (isAr ? "/ شهر" : "/ mo");
                  return (
                    <div
                      key={plan.key}
                      /* The system's price card: one tint of the section ink,
                         and the featured plan flips its whole colour triple
                         with `.is-flipped` rather than being a hand-painted
                         `mockup-card` with a violet ring and two shadows. The
                         card keeps `overflow: visible` for the badge that
                         floats above its top edge. */
                      className={`price-card !overflow-visible${featured ? " is-flipped" : ""}`}
                      style={{ zIndex: topupOpen[plan.key] ? 20 : undefined }}
                    >
                      {/* "Most popular" badge for the featured (dark) plan */}
                      {featured && (
                        <span className="price-flag">{isAr ? "الأكثر اختياراً" : "Most popular"}</span>
                      )}
                      {/* Non-featured plan badge (e.g. Business) */}
                      {!featured && plan.badge && (
                        <span className="price-flag">{plan.badge}</span>
                      )}

                      <h3 className="price-name mb-1.5">
                        {plan.name}
                      </h3>
                      <p className="price-note mb-5">{plan.desc}</p>

                      {/* Discount row */}
                      {mode === "y" && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="card-eyebrow num-ltr line-through">
                            {plan.yOrig} {riyal}
                          </span>
                          <span className="tag">
                            {plan.yDisc} {isAr ? "خصم" : "off"}
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="t-display-3 num-ltr">
                          {displayPrice}
                        </span>
                        <span className="t-head-2 opacity-70">{riyal}</span>
                        <span className="price-note">{priceLabel}</span>
                      </div>

                      {selTopup && (
                        <div className="card-eyebrow flex flex-wrap items-center gap-1.5 mb-3">
                          <span>
                            {isAr ? (mode === "y" ? "الخطة السنوية" : "الخطة") : (mode === "y" ? "Annual plan" : "Plan")}
                            : {topupBase} {riyal}
                          </span>
                          <span className="font-bold">+</span>
                          <span>{isAr ? "نقاط" : "Points"}: {fmtPrice(selTopup.price)} {riyal}</span>
                        </div>
                      )}

                      {mode === "y" && !selTopup && (
                        <div className="card-eyebrow mb-3">
                          {isAr ? `يُدفع ${plan.yAnnual} ر.س سنوياً` : `Billed ${plan.yAnnual} SAR/year`}
                        </div>
                      )}

                      {/* CTA. The home page's pricing band uses the system's
                          own button here; this page was hand-rolling one with
                          a violet gradient and a `shadow-violet-900/40` drop
                          shadow, which is neither the system's primary nor
                          anything else on the site. */}
                      <div className="mt-2 mb-5">
                        {plan.key === "b" ? (
                          <MkButton
                            as="a"
                            block
                            href="https://wa.me/966544357555"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {isAr ? "تواصل معنا" : "Contact Us"}
                          </MkButton>
                        ) : (
                          <MkButton block onClick={() => setPlatformModalOpen(true)}>
                            {isAr ? "ابدأ الآن" : "Get Started"}
                          </MkButton>
                        )}
                      </div>

                      {/* AI Points chip */}
                      {/* The points allowance. One chip, taking the card's own
                          ink, rather than two hard-coded violet palettes
                          switched on whether the card happens to be featured. */}
                      <div className="chip self-start">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span className="num-ltr font-bold">{mode === "m" ? plan.aiPoints : plan.aiPointsY}</span>
                        <span className="opacity-80">
                          {isAr
                            ? (mode === "m" ? "نقطة ذكاء / شهر" : "نقطة ذكاء / سنة")
                            : (mode === "m" ? "AI points / mo" : "AI points / yr")}
                        </span>
                      </div>

                      {/* AI Topup Dropdown */}
                      <div className="relative mt-3">
                        <button
                          type="button"
                          className={`topup-trigger${topupSel[plan.key] != null ? " is-set" : ""}`}
                          onClick={() => toggleTopup(plan.key)}
                        >
                          <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--ziadah-violet)" }} aria-hidden="true" />
                          <span className="flex-1 text-start truncate">
                            {selTopup
                              ? `${selTopup.points.toLocaleString()} ${isAr ? "نقطة إضافية" : "extra pts"}`
                              : isAr ? "نقاط إضافية اختيارية" : "Optional extra points"}
                          </span>
                          {selTopup && (
                            <span className="num-ltr font-bold">
                              +{fmtPrice(selTopup.price)} {riyal}
                            </span>
                          )}
                          <ChevronDown
                            className={`w-3.5 h-3.5 shrink-0 transition-transform ${topupOpen[plan.key] ? "rotate-180" : ""}`}
                          />
                        </button>
                        {topupOpen[plan.key] && (
                          <div
                            className="topup-menu"
                          >
                            <button
                              type="button"
                              className={`topup-item${topupSel[plan.key] == null ? " is-on" : ""}`}
                              onClick={() => selectTopup(plan.key, null)}
                            >
                              <span>{isAr ? "بدون نقاط إضافية" : "No extra points"}</span>
                              <span className="opacity-60">—</span>
                            </button>
                            {AI_TOPUPS.map((pkg, ti) => (
                              <button
                                key={ti}
                                type="button"
                                className={`topup-item${topupSel[plan.key] === ti ? " is-on" : ""}`}
                                onClick={() => selectTopup(plan.key, ti)}
                              >
                                <span>{pkg.points.toLocaleString()} {isAr ? "نقطة" : "pts"}</span>
                                <span>+{fmtPrice(pkg.price)} {riyal}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Feature list */}
                      <div className="flex-1 space-y-3 card-rule mt-6">
                        {plan.featIntro && (
                          <p className="card-eyebrow">
                            {plan.featIntro}
                          </p>
                        )}
                        {plan.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="card-body-text">
                              {f.replace(" ★", "")}
                              {f.includes("★") && (
                                <span className="ms-1">★</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Shell>
          </DsSection>

          {/* ══════════════════ FEATURE COMPARISON ══════════════════
              Pale violet between the grey plan band and the dark violet
              close, so the page steps grey → violet → deep violet instead of
              running two pale bands together. */}
          <DsSection family="violet">
            <Shell width="wide">
              <SectionHead
                center
                kicker={isAr ? "مقارنة الخصائص" : "Feature Comparison"}
                title={isAr ? "ماذا يشمل كل باقة؟" : "What's included in each plan?"}
              />

              {/* Below the tablet tier the table shows one plan at a time -
                  five columns on a phone is five unreadable columns. */}
              <div className="md:hidden flex flex-wrap justify-center gap-2 mb-6">
                {plans.map((plan, i) => (
                  <button
                    key={plan.key}
                    type="button"
                    className="chip"
                    aria-pressed={mobilePlanIdx === i}
                    onClick={() => setMobilePlanIdx(i)}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>

              <div className="cmp-table">
                <div className="cmp-head">
                  <div className="hidden md:block" />
                  {plans.map((plan, i) => (
                    <div
                      key={plan.key}
                      className={`cmp-col${plan.featured ? " cmp-col--featured" : ""}${
                        mobilePlanIdx === i ? "" : " hidden md:block"
                      }`}
                    >
                      <div className="cmp-col-name">{plan.name}</div>
                      <div className="cmp-col-price num-ltr">
                        {mode === "m" ? plan.mPrice : plan.yPrice}{" "}
                        <span>{riyal}/{isAr ? "شهر" : "mo"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {FEATURE_GROUPS.map((group) => {
                  const isOpen = open[group.arTitle] !== false;
                  const title = isAr ? group.arTitle : group.enTitle;
                  return (
                    <div key={group.arTitle} className="cmp-group">
                      <button
                        type="button"
                        className="cmp-group-btn"
                        onClick={() => toggleGroup(group.arTitle)}
                        aria-expanded={isOpen}
                      >
                        <span>{title}</span>
                        <ChevronDown className="cmp-group-caret" aria-hidden="true" />
                      </button>

                      {isOpen && (
                        <div>
                          {group.features.map((feat, fi) => (
                            <div key={fi} className={`cmp-row${fi % 2 === 1 ? " cmp-row--alt" : ""}`}>
                              <div className="cmp-feat">{isAr ? feat.ar : feat.en}</div>
                              {plans.map((plan, i) => (
                                <div
                                  key={plan.key}
                                  className={`cmp-cell${plan.featured ? " cmp-cell--featured" : ""}${
                                    mobilePlanIdx === i ? "" : " hidden md:block"
                                  }`}
                                >
                                  <CellVal val={feat[plan.key]} />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="section-note">
                {isAr
                  ? "★ المميزات المحددة بالنجمة حصرية لباقة الأعمال · نقاط الذكاء الاصطناعي تُستهلك فقط عند إتمام شراء فعلي عبر الاقتراح الذكي"
                  : "★ Star features are exclusive to the Business plan · AI points are only consumed when a purchase is completed via a smart suggestion"}
              </p>
            </Shell>
          </DsSection>

          <PageClosingCta
            title={pc.pricingTitle}
            description={pc.pricingDesc}
            buttonLabel={isAr ? "ابدأ التفعيل المجاني" : "Start Free Activation"}
            onActivate={() => setPlatformModalOpen(true)}
          />

          <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
        </div>
      </PageShell>
    </>
  );
}
