import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import IncreaseAOVWidget from "../../components/widgets/IncreaseAOVWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "زيادة متوسط السلة",
    subtitle: "رفع AOV (Average Order Value) يعني أنك تكسب أكثر من نفس العدد من الزوار — بدون زيادة تكاليف التسويق.",
    tagline: "نفس العدد من العملاء، إيرادات أكثر",
    icon: "💰",
  },
  whatWeDoTitle: "لماذا متوسط قيمة الطلب هو المقياس الأهم؟",
  whatWeDoDesc:
    "معظم أصحاب المتاجر يركّزون على استقطاب عملاء جدد — لكن تكلفة الاستحواذ على عميل جديد تبلغ 5 إلى 7 أضعاف تكلفة رفع قيمة طلب عميل حالي. زيادة يركّز على رفع AOV عبر مجموعة من الاستراتيجيات الذكية: من الحزم الموفّرة التي تجعل العميل يشعر بالربح، إلى عتبات الشحن المجاني التي تخلق دافعاً طبيعياً لإضافة منتج آخر، إلى Upsell الذكي الذي يعرض الأفضل في الوقت المناسب. كل ⃁ إضافي في متوسط الطلب = إيراد صافٍ تقريباً.",
  strategyTitle: "5 استراتيجيات زيادة لرفع متوسط الطلب",
  strategies: [
    {
      icon: "🎁",
      title: "حزم Combo بسعر خاص",
      desc: "يجمّع منتجات مكمّلة بخصم 15-25% على سعر المجموع. العميل يحصل على قيمة أعلى ويدفع أكثر — فوز للطرفين.",
      color: "#a855f7",
    },
    {
      icon: "🚚",
      title: "عتبة الشحن المجاني",
      desc: "يحسب الفجوة بين قيمة السلة وعتبة الشحن المجاني ويقترح منتجاً بالقيمة الناقصة. دافع قوي وطبيعي.",
      color: "#06b6d4",
    },
    {
      icon: "⬆️",
      title: "Upsell موجّه بذكاء",
      desc: "يعرض النسخة الأعلى بفارق معقول وبمبررات واضحة — لا يقترحها لكل عميل، بل للمرشّحين الذين تظهر أنماطهم ميلاً للجودة.",
      color: "#8b5cf6",
    },
    {
      icon: "📊",
      title: "اشتر أكثر ووفّر أكثر",
      desc: "جدول خصم تصاعدي يحفّز الشراء بكمية أكبر. مثالي للمنتجات الاستهلاكية: مشروبات، مكملات غذائية، عناية.",
      color: "#f59e0b",
    },
    {
      icon: "🏷️",
      title: "عروض مؤقتة بعد السلة",
      desc: "يظهر بعد إضافة المنتج للسلة عرضاً محدود الوقت على منتج مكمّل — يخلق إلحاحاً ويرفع قيمة الطلب الواحد.",
      color: "#ec4899",
    },
  ],
  stats: [
    { value: "+35%", label: "متوسط قيمة الطلب", color: "#a855f7" },
    { value: "+28%", label: "عدد المنتجات في السلة", color: "#06b6d4" },
    { value: "+42%", label: "الطلبات فوق عتبة الشحن", color: "#8b5cf6" },
    { value: "7x", label: "عائد الاستثمار في المتوسط", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "تأثير رفع متوسط السلة بـ 20%",
    steps: [
      "متجر يستقبل 500 طلب شهرياً بمتوسط سلة 250 ⃁ → إيراد 125,000 ⃁.",
      "بعد تفعيل زيادة: متوسط السلة ارتفع إلى 300 ⃁ (+20%).",
      "نفس عدد الطلبات 500، لكن الإيراد أصبح 150,000 ⃁.",
      "الزيادة الشهرية: 25,000 ⃁ إضافية — بدون عميل جديد واحد.",
    ],
    result: "25,000 ⃁ شهرياً = 300,000 ⃁ سنوياً — مجرد تحسين متوسط السلة بـ 20%.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يُحرّك زيادة العميل لرفع سلّته؟" : "How does Ziadah motivate customers to increase their cart?"}
      subtitle={
        isAr
          ? "هكذا يبدو اقتراح رفع متوسط الطلب كما يراه عميلك فعلياً"
          : "This is how the AOV-boosting suggestion looks to your customer"
      }
      tabs={[{ labelAr: "📱 معاينة", labelEn: "📱 Preview", content: <IncreaseAOVWidget /> }]}
    />
  ),
  ctaTitle: "ارفع متوسط سلتك بـ 20% في الشهر الأول",
  ctaDesc: "أدوات Upsell وCombo وعتبة الشحن جاهزة — فعّلها الآن.",
  heroEn: {
    tag: "By Goals",
    title: "Increase Average Order Value",
    subtitle: "Increasing AOV (Average Order Value) means you earn more from the same number of visitors — without increasing marketing costs.",
    tagline: "Same number of customers, more revenue",
    icon: "💰",
  },
  whatWeDoTitleEn: "Why is Average Order Value the most important metric?",
  whatWeDoDescEn:
    "Most store owners focus on acquiring new customers — but the cost of acquiring a new customer is 5 to 7 times the cost of increasing an existing customer's order value. Ziadah focuses on boosting AOV through a suite of smart strategies: from value-packed bundles that make the customer feel like a winner, to free shipping thresholds that create a natural incentive to add another product, to smart upsells that show the best option at the right time. Every extra SAR in average order = nearly pure revenue.",
  strategyTitleEn: "5 Ziadah strategies to increase average order value",
  strategiesEn: [
    {
      icon: "🎁",
      title: "Combo Bundles at Special Prices",
      desc: "Combines complementary products at a 15-25% discount on the total. The customer gets higher value and pays more — a win for both sides.",
      color: "#a855f7",
    },
    {
      icon: "🚚",
      title: "Free Shipping Threshold",
      desc: "Calculates the gap between cart value and the free shipping threshold and suggests a product at exactly the missing amount. A strong and natural incentive.",
      color: "#06b6d4",
    },
    {
      icon: "⬆️",
      title: "AI-Powered Upsell",
      desc: "Shows a higher version at a reasonable difference with clear justification — doesn't suggest it to every customer, only to those whose patterns show a preference for quality.",
      color: "#8b5cf6",
    },
    {
      icon: "📊",
      title: "Buy More, Save More",
      desc: "A progressive discount table that incentivizes buying larger quantities. Ideal for consumable products: beverages, supplements, skincare.",
      color: "#f59e0b",
    },
    {
      icon: "🏷️",
      title: "Post-Cart Timed Offers",
      desc: "Appears after adding a product to cart with a time-limited offer on a complementary item — creates urgency and increases single order value.",
      color: "#ec4899",
    },
  ],
  statsEn: [
    { value: "+35%", label: "Average order value", color: "#a855f7" },
    { value: "+28%", label: "Number of products in cart", color: "#06b6d4" },
    { value: "+42%", label: "Orders above shipping threshold", color: "#8b5cf6" },
    { value: "7x", label: "Average return on investment", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Impact of raising average cart by 20%",
    steps: [
      "A store receives 500 orders/month at an average cart of 250 SAR → revenue: 125,000 SAR.",
      "After activating Ziadah: average cart rose to 300 SAR (+20%).",
      "Same 500 orders, but revenue became 150,000 SAR.",
      "Monthly increase: 25,000 SAR extra — without a single new customer.",
    ],
    result: "25,000 SAR/month = 300,000 SAR/year — just by improving average cart by 20%.",
  },
  ctaTitleEn: "Increase your average cart by 20% in the first month",
  ctaDescEn: "Upsell, combo, and shipping threshold tools are ready — activate them now.",
  seo: {
    title: "زيادة متوسط قيمة الطلب (AOV) — زيادة",
    titleEn: "Increase Average Order Value (AOV) — Ziadah",
    description: "اكسب أكثر من نفس عدد الزوار برفع AOV. زيادة يُطبّق استراتيجيات حزم التكامل والعروض التدريجية لرفع إيراداتك.",
    descriptionEn: "Earn more from the same number of visitors by boosting AOV. Ziadah applies combo bundle strategies and tiered offers to increase your revenue.",
    canonical: "/use-cases/increase-aov",
  },
};

export default function IncreaseAOV() {
  return <UseCaseLayout data={data} />;
}
