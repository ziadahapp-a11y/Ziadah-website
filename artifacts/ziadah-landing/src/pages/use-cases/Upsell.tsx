import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import ProductSwapWidget from "../../components/widgets/ProductSwapWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "استبدال المنتجات",
    subtitle: "عرض نسخة أفضل وأعلى قيمة من المنتج — زيادة يقنع العميل بالترقية حين يرى الفارق الحقيقي في القيمة لا مجرد السعر.",
    tagline: "ليس كل عميل يعرف أن هناك ما هو أفضل",
    icon: "⬆️",
  },
  whatWeDoTitle: "ما هو البيع البديل وكيف ينفّذه زيادة؟",
  whatWeDoDesc:
    "البيع البديل (Upsell) هو إقناع العميل بالتحوّل من المنتج الذي ينظر إليه إلى نسخة أعلى جودة أو موديل أحدث — لكن بطريقة ذكية تُظهر القيمة لا مجرد الفارق في السعر. زيادة يحسب أولاً هل هذا العميل مرشّح للترقية (بناءً على مشترياته السابقة وميزانيته المعتادة)، ثم يعرض عليه البديل مع إبراز الفروقات الملموسة التي تبرر الفارق في التكلفة. النتيجة: عميل يشعر أنه وجد صفقة أفضل، ومتجر يربح 20-45% أكثر من كل طلب.",
  strategyTitle: "أساليب البيع البديل في زيادة",
  strategies: [
    {
      icon: "🏆",
      title: "الفئة الأعلى — القيمة الأوضح",
      desc: "يعرض النسخة المتميزة مع جدول مقارنة واضح يُبرز الفروقات الحقيقية. العميل يرى لماذا يستحق الفارق في السعر.",
      color: "#22c55e",
    },
    {
      icon: "📦",
      title: "الحجم الأكبر — التكلفة أقل",
      desc: "للمنتجات الاستهلاكية يعرض الحجم الأكبر مع حساب التكلفة لكل وحدة. العميل يدرك أن الأكبر أوفر — فيختاره.",
      color: "#06b6d4",
    },
    {
      icon: "⭐",
      title: "الإصدار المتميز (Premium)",
      desc: "يعرض الإصدار Premium أو البريميوم مع تأكيد المزايا الإضافية بشكل جذاب — يناسب العملاء الذين يقدّرون الجودة.",
      color: "#22c55e",
    },
    {
      icon: "🔄",
      title: "الموديل الأحدث",
      desc: "للإلكترونيات والتقنية، يقارن بين الموديل الذي يشاهده العميل والأحدث — مع إبراز المزايا الجديدة بأسلوب واضح.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+41%", label: "متوسط قيمة الطلب", color: "#22c55e" },
    { value:"+28%", label: "معدل قبول اقتراح الترقية", color: "#06b6d4" },
    { value: "+35%", label: "رضا العملاء على المدى البعيد", color: "#22c55e" },
    { value: "+22%", label: "معدل تكرار الشراء", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية حقيقية عبر قطاعات",
    steps: [
      "🎧 إلكترونيات: عميل ينظر لسماعة بـ 120 ⃁ → يرى عرض 'سماعة بـ 190 ⃁ — عزل صوت فعّال + 20 ساعة بطارية + ضمان سنتان' مع مقارنة مباشرة.",
      "💐 عطور: عميلة تنظر لعطر 30 مل → تجد 'النسخة 100 مل بـ 310 ⃁ (توفر 35% في سعر الـ مل)'.",
      "🌿 عناية: عميل اختار كريم أساسي → يظهر كريم بريميوم بنفس الوزن وبـ 30 ⃁ إضافية مع قائمة مكونات نشطة أكثر.",
      "📚 كورسات: مشترك في باقة أساسية → يرى ترقية للباقة المتقدمة بفارق 80 ⃁ مع 3 كورسات إضافية وشهادة.",
    ],
    result: "معدل قبول عرض الترقية يتراوح بين 22 و35% عند تقديمه بالطريقة الصحيحة مع إبراز القيمة — وكل قبول يرفع الإيراد مباشرة.",
  },
  extraSections: (isAr) => (
    <>
      <UseCaseLiveShowcase
        isAr={isAr}
        title={isAr ? "كيف يظهر للعميل داخل المتجر؟" : "How does it look to customers in-store?"}
        subtitle={
          isAr
            ? "هكذا تبدو واجهة اقتراح الاستبدال كما يراها عميلك فعلياً"
            : "This is how the upgrade suggestion looks to your customer"
        }
        tabs={[{ labelAr: "📱 معاينة", labelEn: "📱 Preview", content: <ProductSwapWidget /> }]}
      />
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine" style={{ width: "100%" }}/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>{isAr ? "متى يعمل Upsell ومتى لا يعمل؟" : "When upselling works — and when it doesn't"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            <div style={{ padding: "24px 28px", background: "rgba(16,185,129,.05)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#22c55e", marginBottom: 12 }}>{isAr ? "✅ يعمل بشكل ممتاز عندما" : "✅ Works great when"}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {(isAr ? ["الفارق في السعر 20-50% وليس أكثر", "الفوائد الإضافية واضحة وملموسة", "العميل له تاريخ شراء في الفئة المتميزة", "يُعرض قبل إضافة المنتج للسلة"] : ["Price difference is 20-50%, not more", "Additional benefits are clear and tangible", "Customer has a purchase history in premium category", "Shown before adding the product to cart"]).map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "flex-start" }}>
                    <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(225,29,72,.05)", border: "1px solid rgba(225,29,72,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#e11d48", marginBottom: 12 }}>{isAr ? "⚠️ لا يعمل بشكل جيد عندما" : "⚠️ Doesn't work well when"}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {(isAr ? ["الفارق أكبر من 50% بدون مبرر واضح", "النسخة المُقترحة في فئة مختلفة كلياً", "العميل في مرحلة متقدمة من عملية الدفع", "يُعرض بشكل مكثف أكثر من مرة"] : ["Difference exceeds 50% without clear justification", "Suggested version is in a completely different category", "Customer is in an advanced stage of checkout", "Shown too aggressively or repeatedly"]).map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "flex-start" }}>
                    <span style={{ color: "#e11d48", fontWeight: 700, flexShrink: 0 }}>✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  ),
  ctaTitle: "ارفع قيمة كل طلب بالترقية الذكية",
  ctaDesc: "عميل واحد يختار النسخة الأفضل يساوي طلبين — فعّل Upsell مع زيادة اليوم.",
  heroEn: {
    tag: "By Goals",
    title: "Product Swap",
    subtitle: "Show a better, higher-value version of the product — Ziadah convinces the customer to upgrade when they see the real difference in value, not just price.",
    tagline: "Not every customer knows there's something better",
    icon: "⬆️",
  },
  whatWeDoTitleEn: "What is upselling and how does Ziadah implement it?",
  whatWeDoDescEn:
    "Upselling is convincing the customer to switch from the product they're viewing to a higher-quality version or newer model — but smartly, highlighting value rather than just the price difference. Ziadah first calculates whether this customer is a candidate for an upgrade (based on past purchases and typical budget), then shows the alternative highlighting tangible differences that justify the cost difference. The result: a customer who feels they found a better deal, and a store earning 20-45% more per order.",
  strategyTitleEn: "Upselling methods in Ziadah",
  strategiesEn: [
    {
      icon: "🏆",
      title: "Higher Tier — Clearer Value",
      desc: "Displays the premium version with a clear comparison table highlighting real differences. The customer sees why the price difference is worth it.",
      color: "#22c55e",
    },
    {
      icon: "📦",
      title: "Bigger Size — Lower Cost",
      desc: "For consumable products, shows the larger size with per-unit cost calculated. The customer realizes bigger is cheaper — and chooses it.",
      color: "#06b6d4",
    },
    {
      icon: "⭐",
      title: "Premium Edition",
      desc: "Displays the Premium edition with its additional benefits highlighted attractively — perfect for customers who value quality.",
      color: "#22c55e",
    },
    {
      icon: "🔄",
      title: "Newer Model",
      desc: "For electronics and tech, compares the model being viewed with the latest one — highlighting new features in a clear format.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+41%", label: "Average order value", color: "#22c55e" },
    { value: "+28%", label: "Upgrade suggestion acceptance rate", color: "#06b6d4" },
    { value: "+35%", label: "Long-term customer satisfaction", color: "#22c55e" },
    { value: "+22%", label: "Repeat purchase rate", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Real examples across industries",
    steps: [
      "🎧 Electronics: Customer views headphones at 120 SAR → sees 'Headphones at 190 SAR — active noise cancellation + 20-hour battery + 2-year warranty' with a direct comparison.",
      "💐 Perfumes: Customer views 30ml perfume → finds '100ml version for 310 SAR (saving 35% per ml)'.",
      "🌿 Skincare: Customer chose a basic cream → premium cream appears, same weight but 30 SAR more with a list of more active ingredients.",
      "📚 Courses: Subscriber on basic plan → sees upgrade to advanced plan for 80 SAR more with 3 extra courses and a certificate.",
    ],
    result: "Upgrade acceptance rate ranges from 22-35% when presented correctly with value emphasis — and each acceptance directly increases revenue.",
  },
  ctaTitleEn: "Increase every order value with smart upgrades",
  ctaDescEn: "One customer choosing the better version equals two orders — activate Upsell with Ziadah today.",
  seo: {
    title: "استبدال المنتجات (Upsell) — زيادة",
    titleEn: "Product Swap (Upsell) — Ziadah",
    description: "أقنع عميلك بالترقية للنسخة الأعلى قيمة مع زيادة. عروض Upsell ذكية تُبرز الفارق الحقيقي وترفع قيمة الطلب بشكل مقنع.",
    descriptionEn: "Convince your customers to upgrade to the higher-value version with Ziadah. Smart upsell offers highlight the real difference and convincingly increase order value.",
    canonical: "/use-cases/upsell",
  },
};

export default function Upsell() {
  return <UseCaseLayout data={data} />;
}
