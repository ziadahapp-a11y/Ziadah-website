import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import BundleDealsWidget from "../../components/widgets/BundleDealsWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "عروض الحزم",
    subtitle: "اجمع منتجين أو أكثر بسعر مخفوض في حزمة واحدة — العميل يربح توفيراً حقيقياً والمتجر يرفع قيمة الطلب دفعة واحدة.",
    tagline: "الحزمة تُقنع بالقيمة قبل أن تُقنع بالسعر",
    icon: "🎁",
  },
  whatWeDoTitle: "ما هي عروض الحزم وكيف يبنيها زيادة؟",
  whatWeDoDesc:
    "عروض الحزم (Bundle Deals) تجمع منتجين أو أكثر في باقة واحدة بسعر إجمالي أقل من مجموع أسعارها المفردة. زيادة يبني هذه الحزم ذكياً: يختار المنتجات التي تُكمّل بعضها استناداً لبيانات الارتباط في الطلبات، يحسب نسبة الخصم الأنسب لكل حزمة بحيث تُحفّز القرار وتحمي هامش الربح، ثم يعرضها في اللحظة والصفحة المناسبتين مع إبراز التوفير بشكل واضح.",
  strategyTitle: "أنواع عروض الحزم في زيادة",
  strategies: [
    {
      icon: "🧩",
      title: "حزمة التكامل الوظيفي",
      desc: "منتجان أو ثلاثة تُكمّل بعضها وظيفياً في طقم متكامل — الهاتف مع الغلاف والشاشة، أو مجموعة العناية الكاملة.",
      color: "#8b5cf6",
    },
    {
      icon: "🎁",
      title: "حزمة الهدية",
      desc: "مجموعة منتجات مُختارة بأسلوب 'صندوق هدية' مع إبراز القيمة الإجمالية والخصم المطبق — تُحفّز في المواسم وأوقات الهدايا.",
      color: "#06b6d4",
    },
    {
      icon: "🍽️",
      title: "حزمة الوجبة الكاملة",
      desc: "للمطاعم والمنتجات الغذائية: جمع الرئيسي والمرافق والمشروب في وجبة بسعر موحد أقل من الأفراد.",
      color: "#8b5cf6",
    },
    {
      icon: "🔢",
      title: "حزمة الكمية (Pack)",
      desc: "بيع عدد محدد من نفس المنتج كحزمة واحدة بسعر أقل من المفرد — يُناسب المنتجات الاستهلاكية والتسهيل على التجار.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+52%", label: "معدل قبول عرض الحزمة عند إبراز التوفير بوضوح", color: "#8b5cf6" },
    { value: "+39%", label: "متوسط قيمة الطلب مع حزمة واحدة على الأقل", color: "#06b6d4" },
    { value: "+25%", label: "هامش الإيراد الإجمالي رغم الخصم على الحزمة", color: "#8b5cf6" },
    { value: "68%", label: "من العملاء يُفضّلون الحزمة على الشراء المفرد حين يرون التوفير", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات متنوعة",
    steps: [
      "💄 تجميل: حزمة 'روتين الصباح' = غسول + سيروم + مرطب بـ 199 ⃁ بدلاً من 249 ⃁ (توفير 50 ⃁) — عرض واضح يقنع بالقيمة.",
      "💻 إلكترونيات: حزمة 'الإنتاجية' = لابتوب + ماوس + حقيبة بـ 1899 ⃁ بدلاً من 2150 ⃁ — التوفير الكبير يُبرر القرار الفوري.",
      "🍔 مطعم: وجبة عائلية = 4 برغر + 4 مشروبات + بطاطس كبيرة بـ 119 ⃁ بدلاً من 148 ⃁ — يُناسب قرارات العائلة السريعة.",
      "🧴 رعاية شعر: حزمة 'شعر صحي' = شامبو + بلسم + ماسك أسبوعي بـ 89 ⃁ بدلاً من 112 ⃁ — توفير 23 ⃁ يُقنع العميلة بالطقم الكامل.",
    ],
    result: "العميل الذي يرى التوفير بوضوح (المبلغ وليس النسبة فقط) يتحول إلى المشتري بنسبة 52% — الشفافية في الخصم هي المحرك الأقوى لقرار الشراء.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف تظهر الحزمة للعميل داخل المتجر؟" : "How does the bundle appear to customers in-store?"}
      subtitle={
        isAr ? "هكذا تبدو واجهة اقتراح الحزمة كما يراها عميلك فعلياً" : "This is how the bundle suggestion looks to your customer"
      }
      tabs={[
        {
          labelAr: "📱 مثال حي",
          labelEn: "📱 Live Demo",
          content: <BundleDealsWidget />,
        },
        {
          labelAr: "🧮 كيف يحسب الخصم؟",
          labelEn: "🧮 How Discount Works",
          placement: "below",
          content: (
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-card p-8 md:p-10" style={{ width: "100%" }}>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-950 text-center" style={{ marginBottom: 20 }}>
                {isAr ? "كيف يحسب زيادة نسبة خصم الحزمة المثلى؟" : "How does Ziadah calculate the optimal bundle discount?"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(isAr
                  ? [
                      { step: "1", title: "تحليل هامش كل منتج", desc: "يحسب زيادة هامش الربح لكل منتج في الحزمة المقترحة قبل تحديد نسبة الخصم." },
                      { step: "2", title: "استهداف نسبة تحفيز", desc: "يُطبّق خصماً يتراوح بين 10-25% من الإجمالي — كافٍ ليُحفّز القرار دون إضرار بالهامش." },
                      { step: "3", title: "اختبار تلقائي A/B", desc: "يجرب زيادة نسب خصم مختلفة على شرائح صغيرة ويُثبّت النسبة التي تُحقق أعلى إيراد فعلي." },
                    ]
                  : [
                      { step: "1", title: "Analyze each product's margin", desc: "Ziadah calculates the profit margin for each product in the proposed bundle before setting the discount." },
                      { step: "2", title: "Target an incentive rate", desc: "Applies a discount between 10-25% of the total — enough to motivate the decision without hurting the margin." },
                      { step: "3", title: "Automatic A/B testing", desc: "Ziadah tests different discount rates on small segments and locks in the rate that achieves the highest actual revenue." },
                    ]
                ).map((item, i) => (
                  <div key={i} className="rounded-xl border border-zinc-200 bg-zinc-50/60" style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 22px" }}>
                    <div className="bg-violet-100 border border-violet-200 text-violet-600" style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, flexShrink: 0 }}>{item.step}</div>
                    <div style={{ textAlign: "start" }}>
                      <div className="font-bold text-zinc-950" style={{ fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                      <div className="text-sm text-zinc-600" style={{ lineHeight: 1.7 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
  ctaTitle: "حوّل منتجاتك إلى حزم تبيع نفسها",
  ctaDesc: "زيادة يبني الحزمة ويختار الخصم ويعرضها في الوقت الصحيح — أنت تجني النتيجة.",
  heroEn: {
    tag: "By Display Method",
    title: "Bundle Deals",
    subtitle: "Combine two or more products at a discounted price in a single bundle — the customer gains real savings and the store increases order value in one go.",
    tagline: "Bundles convince with value before they convince with price",
    icon: "🎁",
  },
  whatWeDoTitleEn: "What are bundle deals and how does Ziadah build them?",
  whatWeDoDescEn:
    "Bundle deals combine two or more products in a single package at a total price lower than their individual prices combined. Ziadah builds these bundles intelligently: it selects products that complement each other based on order association data, calculates the optimal discount for each bundle to motivate the decision while protecting profit margins, then displays them at the right time and page with savings clearly highlighted.",
  strategyTitleEn: "Types of bundle deals in Ziadah",
  strategiesEn: [
    {
      icon: "🧩",
      title: "Functional Complement Bundle",
      desc: "Two or three products that functionally complete each other in one set — a phone with case and screen protector, or a complete skincare routine.",
      color: "#8b5cf6",
    },
    {
      icon: "🎁",
      title: "Gift Bundle",
      desc: "A curated product collection styled as a 'gift box' highlighting total value and applied discount — drives purchases during holidays and gift-giving occasions.",
      color: "#06b6d4",
    },
    {
      icon: "🍽️",
      title: "Complete Meal Bundle",
      desc: "For restaurants and food products: combining the main dish, sides, and drink in a meal at a unified price lower than individual items.",
      color: "#8b5cf6",
    },
    {
      icon: "🔢",
      title: "Quantity Pack",
      desc: "Selling a set number of the same product as a single pack at a lower price than buying individually — ideal for consumables and wholesale buyers.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+52%", label: "Bundle acceptance rate when savings are clearly shown", color: "#8b5cf6" },
    { value: "+39%", label: "Average order value with at least one bundle", color: "#06b6d4" },
    { value: "+25%", label: "Total revenue margin despite the bundle discount", color: "#8b5cf6" },
    { value: "68%", label: "Of customers prefer the bundle over individual purchase when they see the savings", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Real examples from various industries",
    steps: [
      "💄 Beauty: 'Morning Routine' bundle = cleanser + serum + moisturizer at 199 SAR instead of 249 SAR (save 50 SAR) — a clear offer that convinces with value.",
      "💻 Electronics: 'Productivity' bundle = laptop + mouse + bag at 1,899 SAR instead of 2,150 SAR — the big saving justifies an immediate decision.",
      "🍔 Restaurant: Family meal = 4 burgers + 4 drinks + large fries at 119 SAR instead of 148 SAR — suits quick family decisions.",
      "🧴 Haircare: 'Healthy Hair' bundle = shampoo + conditioner + weekly mask at 89 SAR instead of 112 SAR — saving 23 SAR convinces the customer to get the full set.",
    ],
    result: "The customer who sees savings clearly (the amount, not just the percentage) converts at 52% — transparency in the discount is the strongest driver of purchase decisions.",
  },
  ctaTitleEn: "Turn your products into bundles that sell themselves",
  ctaDescEn: "Ziadah builds the bundle, chooses the discount, and displays it at the right time — you reap the results.",
  seo: {
    title: "عروض الحزم — زيادة",
    titleEn: "Bundle Deals — Ziadah",
    description: "اجمع منتجين أو أكثر في حزمة بسعر مخفوض وارفع قيمة الطلب دفعة واحدة. زيادة يُنشئ عروض الحزم الذكية لمتجرك على زد وسلة.",
    descriptionEn: "Combine two or more products in a discounted bundle and boost order value instantly. Ziadah creates smart bundle deals for your Zid and Salla store.",
    canonical: "/use-cases/bundle-deals",
  },
};

export default function BundleDeals() {
  return <UseCaseLayout data={data} />;
}
