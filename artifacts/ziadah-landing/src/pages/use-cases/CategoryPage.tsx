import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import CategoryPageWidget from "../../components/widgets/CategoryPageWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "صفحة التصنيف",
    subtitle: "العميل في مرحلة المقارنة والتصفح — فرصة ذهبية لتوجيهه نحو المنتجات الأعلى قيمة والأكثر ملاءمة لاهتماماته.",
    tagline: "توجيه ذكي قبل قرار الشراء",
    icon: "📁",
  },
  whatWeDoTitle: "كيف يعمل زيادة في صفحة التصنيف؟",
  whatWeDoDesc:
    "صفحة التصنيف هي لحظة البحث والمقارنة — العميل لم يقرر بعد أي منتج يريد. زيادة يستثمر هذه اللحظة بذكاء: يرتّب المنتجات بناءً على احتمالية الشراء لكل عميل، يبرز الكومبو والحزم الموفّرة بين بطاقات المنتجات، ويعرض شارات 'الأكثر مبيعاً' و'الأعلى تقييماً' على المنتجات التي تناسب ملفه الشخصي. بدلاً من تصفح عشوائي يصبح العميل في مسار مُوجَّه نحو الشراء.",
  strategyTitle: "استراتيجيات زيادة في صفحة التصنيف",
  strategies: [
    {
      icon: "🎯",
      title: "ترتيب ذكي مخصص",
      desc: "يعيد زيادة ترتيب بطاقات المنتجات بناءً على احتمالية شراء كل عميل — المنتجات الأنسب تظهر أولاً لكل زائر.",
      color: "#a855f7",
    },
    {
      icon: "🏷️",
      title: "شارات الثقة",
      desc: "يضع شارات 'الأكثر مبيعاً' و'اختيار محرر' و'ينتهي قريباً' على المنتجات المناسبة لدفع قرار الشراء.",
      color: "#f59e0b",
    },
    {
      icon: "🎁",
      title: "كومبو داخل الكاتالوج",
      desc: "يظهر بطاقات كومبو مدمجة بين المنتجات العادية تجمع منتجين أو أكثر بسعر أقل مما يفكر فيه العميل.",
      color: "#10b981",
    },
    {
      icon: "📊",
      title: "فلتر 'قد تعجبك'",
      desc: "يضيف قسماً مميزاً يجمع المنتجات التي تتطابق مع اهتمامات العميل المستنتجة من سلوكه السابق.",
      color: "#06b6d4",
    },
  ],
  stats: [
    { value: "+27%", label: "معدل الانتقال من التصنيف للمنتج", color: "#a855f7" },
    { value: "+33%", label: "معدل إضافة للسلة", color: "#10b981" },
    { value: "+21%", label: "متوسط قيمة الطلب", color: "#06b6d4" },
    { value: "-24%", label: "وقت اتخاذ قرار الشراء", color: "#ec4899" },
  ],
  exampleScenario: {
    title: "عميل يتصفح تصنيف 'أجهزة الصوت'",
    steps: [
      "يفتح العميل تصنيف أجهزة الصوت ويرى 40 منتجاً.",
      "زيادة يعرف من تاريخه أنه مهتم بالجودة وعنده ميزانية متوسطة (سبق أن اشترى منتجات بين 300-600 ⃁).",
      "يُعيد ترتيب المنتجات: السماعات في نطاق ميزانيته تظهر أولاً، مع شارة 'الأكثر مبيعاً هذا الأسبوع' على أحدها.",
      "يظهر بطاقة كومبو: 'سماعة + حامل + كابل شحن بخصم 15%'.",
    ],
    result: "العميل وجد ما يريده في أقل من دقيقتين وأضاف الكومبو للسلة مباشرة.",
  },
  extraSections: (isAr) => (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          {isAr ? "مثال حي" : "Live Example"}
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>{isAr ? "كيف تظهر صفحة التصنيف المُخصَّصة؟" : "How does the personalized category page look?"}</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>{isAr ? "هكذا يرى عميلك صفحة التصنيف بعد تخصيصها بالذكاء الاصطناعي" : "This is how your customer sees the category page after AI personalization"}</p>
        <CategoryPageWidget />
      </div>
    </section>
  ),
  plans: ["الأعمال"],
  ctaTitle: "حوّل تصفح التصنيف إلى قرار شراء",
  ctaDesc: "توجيه ذكي في اللحظة المناسبة = عميل يشتري بدلاً من أن يغادر.",
  heroEn: {
    tag: "By Pages",
    title: "Category Page",
    subtitle: "The customer is in comparison and browsing mode — a golden opportunity to guide them toward the highest-value and most relevant products for their interests.",
    tagline: "Smart guidance before the purchase decision",
    icon: "📁",
  },
  whatWeDoTitleEn: "How does Ziadah work on the category page?",
  whatWeDoDescEn:
    "The category page is the moment of search and comparison — the customer hasn't decided which product they want yet. Ziadah leverages this moment smartly: it reorders products based on purchase probability for each customer, highlights combos and value bundles between product cards, and displays 'Best Seller' and 'Top Rated' badges on products matching their profile. Instead of random browsing, the customer enters a guided path toward purchase.",
  strategyTitleEn: "Ziadah's strategies on the category page",
  strategiesEn: [
    {
      icon: "🎯",
      title: "Smart Personalized Ordering",
      desc: "Ziadah reorders product cards based on each customer's purchase probability — the most relevant products appear first for every visitor.",
      color: "#a855f7",
    },
    {
      icon: "🏷️",
      title: "Trust Badges",
      desc: "Places 'Best Seller', 'Editor's Pick', and 'Ending Soon' badges on appropriate products to drive purchase decisions.",
      color: "#f59e0b",
    },
    {
      icon: "🎁",
      title: "In-Catalog Combos",
      desc: "Shows embedded combo cards between regular products that bundle two or more items at a price lower than what the customer would expect.",
      color: "#10b981",
    },
    {
      icon: "📊",
      title: "'You Might Like' Filter",
      desc: "Adds a featured section that collects products matching the customer's interests inferred from their previous behavior.",
      color: "#06b6d4",
    },
  ],
  statsEn: [
    { value: "+27%", label: "Category-to-product click-through rate", color: "#a855f7" },
    { value: "+33%", label: "Add-to-cart rate", color: "#10b981" },
    { value: "+21%", label: "Average order value", color: "#06b6d4" },
    { value: "-24%", label: "Purchase decision time", color: "#ec4899" },
  ],
  exampleScenarioEn: {
    title: "A customer browsing the 'Audio Devices' category",
    steps: [
      "The customer opens the audio devices category and sees 40 products.",
      "Ziadah knows from their history they're interested in quality and have a mid-range budget (previously bought products between 300-600 SAR).",
      "It reorders products: speakers within their budget appear first, with a 'Best Seller This Week' badge on one.",
      "A combo card appears: 'Speaker + stand + charging cable at 15% off'.",
    ],
    result: "The customer found what they wanted in under two minutes and added the combo to cart directly.",
  },
  plansEn: ["Business"],
  ctaTitleEn: "Turn category browsing into a purchase decision",
  ctaDescEn: "Smart guidance at the right moment = a customer who buys instead of leaving.",
  seo: {
    title: "تحسين صفحة التصنيف — زيادة",
    titleEn: "Optimize Category Page — Ziadah",
    description: "وجّه العميل نحو المنتجات الأعلى قيمة في صفحة التصنيف. زيادة يُرتّب عرض المنتجات ذكياً بناءً على سلوك العميل.",
    descriptionEn: "Guide customers toward the highest-value products on the category page. Ziadah intelligently reorders product display based on customer behavior.",
    canonical: "/use-cases/category",
  },
};

export default function CategoryPage() {
  return <UseCaseLayout data={data} />;
}
