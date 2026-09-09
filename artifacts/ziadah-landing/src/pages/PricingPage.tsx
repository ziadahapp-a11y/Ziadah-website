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
import { Section, Eyebrow } from "@/components/trackflow";
import { HeroLede, Section as DsSection } from "@/sections";
import { Shell } from "@/components/mk";
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

/** Renders one comparison-table cell. Featured plan keeps the dark-card treatment. */
function CellVal({ val, featured }: { val: FeatureVal; featured: boolean }) {
  if (val === true)
    return (
      <Check
        className={`mx-auto w-[18px] h-[18px] ${featured ? "text-violet-600" : "text-violet-500"}`}
        strokeWidth={2.5}
        aria-hidden
      />
    );
  if (val === false || val === null)
    return <Minus className={`mx-auto w-4 h-4 ${featured ? "text-violet-300" : "text-zinc-300"}`} aria-hidden />;
  return (
    <span className={`text-sm font-bold num-ltr ${featured ? "text-violet-700" : "text-zinc-900"}`}>{val}</span>
  );
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

      <PageShell className="pp-root relative overflow-x-clip bg-white" style={{ background: "#fff" }}>
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

                      {/* CTA */}
                      <div className="mt-2 mb-5">
                        {plan.key === "b" ? (
                          <a
                            href="https://wa.me/966544357555"
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex w-full items-center justify-center rounded-md h-11 px-5 text-sm font-semibold transition-colors ${
                              featured
                                ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-900/40 hover:from-violet-400 hover:to-violet-500"
                                : "bg-zinc-950 text-white hover:bg-zinc-800"
                            }`}
                          >
                            {isAr ? "تواصل معنا" : "Contact Us"}
                          </a>
                        ) : (
                          <button
                            type="button"
                            className={`inline-flex w-full items-center justify-center rounded-md h-11 px-5 text-sm font-semibold transition-colors ${
                              featured
                                ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-900/40 hover:from-violet-400 hover:to-violet-500"
                                : "bg-zinc-950 text-white hover:bg-zinc-800"
                            }`}
                            onClick={() => setPlatformModalOpen(true)}
                          >
                            {isAr ? "ابدأ الآن" : "Get Started"}
                          </button>
                        )}
                      </div>

                      {/* AI Points chip */}
                      <div
                        className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-semibold ${
                          featured
                            ? "bg-violet-500/15 border border-violet-500/30 text-violet-300"
                            : "bg-violet-50 border border-violet-100 text-violet-700"
                        }`}
                      >
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

          {/* ══════════════════ FEATURE COMPARISON ══════════════════ */}
          <Section band="muted" containerClassName="max-w-6xl">
              <div className="text-center mb-12">
                <Eyebrow className="mb-4">{isAr ? "مقارنة الخصائص" : "Feature Comparison"}</Eyebrow>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-950 leading-tight">
                  {isAr ? "ماذا يشمل كل باقة؟" : "What's included in each plan?"}
                </h2>
              </div>

              {/* Mobile plan selector — hidden on desktop */}
              <div className="md:hidden flex flex-wrap justify-center gap-2 mb-6">
                {plans.map((plan, i) => (
                  <button
                    key={plan.key}
                    type="button"
                    className={`rounded-full border px-3.5 py-2 text-xs font-bold transition-colors ${
                      mobilePlanIdx === i
                        ? "border-violet-600 bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-violet-300"
                    }`}
                    onClick={() => setMobilePlanIdx(i)}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white shadow-card overflow-hidden">
                {/* Sticky header */}
                <div className="sticky top-0 z-10 grid grid-cols-2 md:grid-cols-5 items-stretch border-b border-zinc-200 bg-white/95 backdrop-blur">
                  <div className="hidden md:block" />
                  {plans.map((plan, i) => (
                    <div
                      key={plan.key}
                      className={`p-4 text-center ${plan.featured ? "bg-violet-600 border-x border-violet-600" : ""} ${
                        mobilePlanIdx === i ? "" : "hidden md:block"
                      }`}
                    >
                      <div className={`text-sm font-bold ${plan.featured ? "text-white" : "text-zinc-950"}`}>
                        {plan.name}
                      </div>
                      <div className={`mt-0.5 text-xs num-ltr ${plan.featured ? "text-violet-100" : "text-zinc-500"}`}>
                        {mode === "m" ? plan.mPrice : plan.yPrice}{" "}
                        <span>{riyal}/{isAr ? "شهر" : "mo"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feature groups */}
                {FEATURE_GROUPS.map((group) => {
                  const isOpen = open[group.arTitle] !== false;
                  const title = isAr ? group.arTitle : group.enTitle;
                  return (
                    <div key={group.arTitle} className="border-b border-zinc-100 last:border-b-0">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between border-s-2 border-violet-500 bg-zinc-50/80 px-4 py-3.5 text-start transition-colors hover:bg-violet-50"
                        onClick={() => toggleGroup(group.arTitle)}
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-bold text-zinc-950">{title}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-violet-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isOpen && (
                        <div>
                          {group.features.map((feat, fi) => (
                            <div
                              key={fi}
                              className={`grid grid-cols-2 md:grid-cols-5 items-center ${fi % 2 === 1 ? "bg-zinc-50/40" : ""}`}
                            >
                              <div className="px-4 py-3 text-sm text-zinc-700">{isAr ? feat.ar : feat.en}</div>
                              {plans.map((plan, i) => (
                                <div
                                  key={plan.key}
                                  className={`px-4 py-3 text-center ${plan.featured ? "bg-violet-50 border-x border-violet-200" : ""} ${
                                    mobilePlanIdx === i ? "" : "hidden md:block"
                                  }`}
                                >
                                  <CellVal val={feat[plan.key]} featured={plan.featured} />
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

              {/* Footnote */}
              <p className="mt-6 text-center text-xs text-zinc-500 leading-relaxed max-w-3xl mx-auto">
                {isAr
                  ? "★ المميزات المحددة بالنجمة حصرية لباقة الأعمال · نقاط الذكاء الاصطناعي تُستهلك فقط عند إتمام شراء فعلي عبر الاقتراح الذكي"
                  : "★ Star features are exclusive to the Business plan · AI points are only consumed when a purchase is completed via a smart suggestion"}
              </p>
        </Section>

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
