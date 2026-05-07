import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "جميع الصفحات",
    subtitle: "تغطية شاملة في كل نقطة تماس مع العميل — من أول صفحة يزورها حتى صفحة الشكر، زيادة موجود في كل خطوة.",
    tagline: "تجربة مخصصة متكاملة من أول لحظة لآخر لحظة",
    icon: "🌐",
  },
  whatWeDoTitle: "تغطية 360 درجة في رحلة العميل الكاملة",
  whatWeDoDesc:
    "زيادة ليس تطبيقاً لصفحة واحدة — بل مسوّق ذكي يرافق عميلك في كل خطوة داخل المتجر. يبدأ من الصفحة الرئيسية حيث يرحّب بالعميل بتجربة مخصصة، ينتقل معه لصفحة التصنيف ليوجّهه، يدخل معه صفحة المنتج ليقترح المكمّلات والبدائل، يحضر في السلة ليرفع قيمة الطلب، ويختتم في صفحة الشكر ببذرة الطلب التالي. كل هذا بذكاء اصطناعي واحد يتعلم ويتحسن مع كل تفاعل.",
  strategyTitle: "زيادة في كل نقطة تماس",
  strategies: [
    {
      icon: "🏠",
      title: "الصفحة الرئيسية",
      desc: "استقبال مخصص لكل عميل بناءً على سجله — الزائر الجديد يرى الأفضل، العائد يرى ما يكمل تجربته.",
      color: "#a855f7",
    },
    {
      icon: "📁",
      title: "صفحة التصنيف",
      desc: "ترتيب ذكي للمنتجات وشارات ثقة تختصر طريق الاختيار من عشرات المنتجات إلى قرار واضح.",
      color: "#06b6d4",
    },
    {
      icon: "📄",
      title: "صفحة المنتج",
      desc: "توصيات إضافية، نسخة أفضل، حزم كومبو — كلها تظهر في المكان الصح بالتوقيت الصح.",
      color: "#10b981",
    },
    {
      icon: "🛒",
      title: "صفحة السلة",
      desc: "ارفع قيمة الطلب، احسب الفجوة للشحن المجاني، أوقف المترددين بكوبون مؤقت.",
      color: "#f59e0b",
    },
    {
      icon: "🎉",
      title: "صفحة الشكر",
      desc: "حوّل اللحظة الذهبية بعد الشراء إلى طلب ثانٍ بتوصية مخصصة وكوبون عودة.",
      color: "#ec4899",
    },
    {
      icon: "🚪",
      title: "Exit Intent (نافذة المغادرة)",
      desc: "اللحظة الأخيرة قبل خروج العميل — عرض خاص فوري يحوّل المغادر إلى مشترٍ.",
      color: "#4f46e5",
    },
  ],
  stats: [
    { value: "+45%", label: "متوسط الزيادة في الإيرادات", color: "#a855f7" },
    { value: "+38%", label: "متوسط قيمة الطلب", color: "#06b6d4" },
    { value: "-35%", label: "معدل التخلي عن السلة", color: "#ec4899" },
    { value: "+52%", label: "معدل الشراء المتكرر", color: "#10b981" },
  ],
  exampleScenario: {
    title: "رحلة عميل كاملة مع زيادة",
    steps: [
      "يدخل العميل الصفحة الرئيسية: يرى عروضاً مبنية على آخر زيارة له.",
      "ينتقل لتصنيف العناية: يجد ترتيباً ذكياً يضع أنسب المنتجات في المقدمة.",
      "يفتح صفحة منتج: يرى حزمة روتين كاملة كومبو بتوفير 20%.",
      "يضيف للسلة: يظهر له 'أضف 25 ⃁ للشحن المجاني' فيضيف منتجاً صغيراً.",
      "بعد الشراء: صفحة شكر بكوبون 15% لطلبه القادم خلال 48 ساعة.",
    ],
    result: "قيمة الطلب ارتفعت 55% مقارنة بالنية الأصلية، والعميل عاد خلال 36 ساعة باستخدام الكوبون.",
  },
  ctaTitle: "غطِّ كل رحلة العميل بذكاء اصطناعي واحد",
  ctaDesc: "لا تترك أي نقطة تماس بدون توصية ذكية — فعّل زيادة اليوم.",
  heroEn: {
    tag: "By Pages",
    title: "All Pages",
    subtitle: "Comprehensive coverage at every customer touchpoint — from the first page they visit to the thank you page, Ziadah is present at every step.",
    tagline: "A complete personalized experience from first moment to last",
    icon: "🌐",
  },
  whatWeDoTitleEn: "360-degree coverage across the entire customer journey",
  whatWeDoDescEn:
    "Ziadah isn't an app for a single page — it's a smart marketer that accompanies your customer at every step inside the store. It starts from the home page where it welcomes the customer with a personalized experience, moves with them to the category page to guide them, enters the product page to suggest complements and alternatives, shows up in the cart to increase order value, and concludes on the thank you page with the seed for the next order. All powered by a single AI that learns and improves with every interaction.",
  strategyTitleEn: "Ziadah at every touchpoint",
  strategiesEn: [
    {
      icon: "🏠",
      title: "Home Page",
      desc: "Personalized welcome for every customer based on their history — new visitors see the best, returning ones see what completes their experience.",
      color: "#a855f7",
    },
    {
      icon: "📁",
      title: "Category Page",
      desc: "Smart product ordering and trust badges that shorten the choice path from dozens of products to a clear decision.",
      color: "#06b6d4",
    },
    {
      icon: "📄",
      title: "Product Page",
      desc: "Additional recommendations, better versions, combo bundles — all appearing at the right place at the right time.",
      color: "#10b981",
    },
    {
      icon: "🛒",
      title: "Cart Page",
      desc: "Increase order value, calculate the free shipping gap, stop hesitators with a timed coupon.",
      color: "#f59e0b",
    },
    {
      icon: "🎉",
      title: "Thank You Page",
      desc: "Turn the golden post-purchase moment into a second order with a personalized recommendation and return coupon.",
      color: "#ec4899",
    },
    {
      icon: "🚪",
      title: "Exit Intent (Exit Popup)",
      desc: "The last moment before the customer leaves — an instant special offer that converts the leaver into a buyer.",
      color: "#4f46e5",
    },
  ],
  statsEn: [
    { value: "+45%", label: "Average revenue increase", color: "#a855f7" },
    { value: "+38%", label: "Average order value", color: "#06b6d4" },
    { value: "-35%", label: "Cart abandonment rate", color: "#ec4899" },
    { value: "+52%", label: "Repeat purchase rate", color: "#10b981" },
  ],
  exampleScenarioEn: {
    title: "A complete customer journey with Ziadah",
    steps: [
      "The customer enters the home page: sees offers built on their last visit.",
      "Moves to the skincare category: finds smart ordering placing the most relevant products up front.",
      "Opens a product page: sees a complete routine combo bundle with 20% savings.",
      "Adds to cart: shown 'Add 25 SAR for free shipping' so they add a small product.",
      "After purchase: a thank you page with a 15% coupon for their next order within 48 hours.",
    ],
    result: "Order value increased 55% compared to original intent, and the customer returned within 36 hours using the coupon.",
  },
  ctaTitleEn: "Cover the entire customer journey with a single AI",
  ctaDescEn: "Don't leave any touchpoint without a smart recommendation — activate Ziadah today.",
  seo: {
    title: "جميع صفحات المتجر — زيادة",
    titleEn: "All Store Pages — Ziadah",
    description: "زيادة موجود في كل صفحة من صفحات متجرك: الرئيسية، المنتج، السلة، الدفع، وصفحة الشكر — تغطية شاملة لكل نقطة تماس مع العميل.",
    descriptionEn: "Ziadah is present on every page of your store: home, product, cart, checkout, and thank you — comprehensive coverage at every customer touchpoint.",
    canonical: "/use-cases/all-pages",
  },
};

export default function AllPages() {
  return <UseCaseLayout data={data} />;
}
