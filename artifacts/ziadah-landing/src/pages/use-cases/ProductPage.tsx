import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import ProductPageMockups from "../../components/ProductPageMockups";
import { ProductPageMockup, PageHeroPhone } from "../../components/UseCasePagesShowcase";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "صفحة المنتج",
    subtitle: "أعلى نقطة تأثير في رحلة العميل — في اللحظة التي يتأمل فيها المنتج تبدأ محرك زيادة باقتراح ما يكمّل تجربته ويرفع قيمة طلبه.",
    tagline: "من يزور صفحة منتج يُشتري له أكثر",
    icon: "📄",
  },
  whatWeDoTitle: "كيف يعمل زيادة في صفحة المنتج؟",
  whatWeDoDesc:
    "بمجرد أن يفتح العميل صفحة المنتج، يبدأ محرك الذكاء الاصطناعي لزيادة في تحليل هويته: ما تصفّحه سابقاً، منطقته الجغرافية، جهازه، مشترياته القديمة. في غضون أجزاء من الثانية يُنشئ قائمة توصيات مخصصة تظهر أسفل المنتج أو جانبه — إضافات (Add-ons) وظيفية تكمّل المنتج الأساسي، منتجات ذات صلة يشتريها عملاء مشابهون معاً، نسخة أعلى جودة بسعر معقول، وحزم كومبو مدروسة توفر على العميل. كل هذا يحدث بصمت تام — بدون أي تدخل منك.",
  strategyTitle: "استراتيجيات زيادة في صفحة المنتج",
  strategies: [
    {
      icon: "🔗",
      title: "منتجات ذات صلة",
      desc: "يحلل الذكاء الاصطناعي سلوك العملاء المشابهين ويعرض المنتجات التي يشترونها معاً في أغلب الأحيان. الأكثر تأثيراً لأنها تعكس اهتمامات حقيقية.",
      color: "#34d399",
    },
    {
      icon: "➕",
      title: "إضافات وظيفية (Add-ons)",
      desc: "يقترح منتجات تكمّل المنتج الرئيسي وظيفياً — مثل حافظة جهاز، طاقم عناية، أو مكمّل غذائي. عرض طبيعي يشعر العميل أنه تجربة أكمل لا بيعاً قسرياً.",
      color: "#06b6d4",
    },
    {
      icon: "⬆️",
      title: "Upsell — النسخة الأفضل",
      desc: "يعرض نسخة أعلى مواصفة أو موديل أحدث من نفس المنتج مع إبراز الفارق الحقيقي في القيمة. يرفع متوسط قيمة الطلب بشكل ملحوظ.",
      color: "#10b981",
    },
    {
      icon: "🎁",
      title: "حزم Combo ذكية",
      desc: "يجمّع منتجات متكاملة في حزمة بسعر مخفوض، يظهر التوفير بوضوح ليحفّز العميل على أخذ الطقم الكامل دفعة واحدة.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+42%", label: "متوسط قيمة الطلب", color: "#34d399" },
    { value: "+38%", label: "عدد المنتجات بالسلة", color: "#06b6d4" },
    { value: "+25%", label: "معدل التحويل", color: "#10b981" },
    { value: "+60%", label: "احتمال عودة العميل", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "عميلة تتصفح عطوراً نسائية",
    steps: [
      "تفتح العميلة صفحة عطر نسائي بسعر 220 ⃁.",
      "يحلل زيادة فوراً: هي من جدة، سبق أن اشترت مجموعة عناية، وتتصفح من هاتفها.",
      "يظهر تحت العطر: 'يشترى معاً' → بخاخ الجسم المكمّل + كريم العطر بحزمة 330 ⃁ بدلاً من 380.",
      "يظهر أيضاً نسخة العطر الكبيرة (300 مل) بسعر 310 مع مقارنة واضحة بالتوفير.",
    ],
    result: "العميلة اشترت الحزمة — الطلب ارتفع من 220 إلى 330 ⃁ (+50%) بمجرد اقتراح واحد.",
  },
  ctaTitle: "ارفع مبيعات صفحة المنتج اليوم",
  ctaDesc: "فعّل زيادة بضغطة زر واحدة وشاهد الفرق خلال أول أسبوع.",
  heroVisual: (
    <PageHeroPhone float1="📈 +42% متوسط الطلب" float2="🛒 توصيات تلقائية">
      <ProductPageMockup />
    </PageHeroPhone>
  ),
  extraSections: <ProductPageMockups />,
  heroEn: {
    tag: "By Pages",
    title: "Product Page",
    subtitle: "The highest impact point in the customer journey — at the moment they're examining a product, Ziadah's engine starts suggesting what completes their experience and increases order value.",
    tagline: "Whoever visits a product page buys more",
    icon: "📄",
  },
  whatWeDoTitleEn: "How does Ziadah work on the product page?",
  whatWeDoDescEn:
    "As soon as a customer opens a product page, Ziadah's AI engine starts analyzing their identity: what they browsed before, their geographic region, device, and past purchases. Within fractions of a second, it creates a personalized recommendation list displayed below or beside the product — functional add-ons that complement the main product, related products that similar customers buy together, a higher-quality version at a reasonable price, and curated combo bundles that save the customer money. All of this happens silently — without any intervention from you.",
  strategyTitleEn: "Ziadah's strategies on the product page",
  strategiesEn: [
    {
      icon: "🔗",
      title: "Related Products",
      desc: "AI analyzes similar customers' behavior and displays products they most frequently buy together. Most impactful because it reflects real interests.",
      color: "#34d399",
    },
    {
      icon: "➕",
      title: "Functional Add-ons",
      desc: "Suggests products that functionally complement the main product — like a device case, skincare set, or dietary supplement. A natural display that feels like a complete experience, not forced selling.",
      color: "#06b6d4",
    },
    {
      icon: "⬆️",
      title: "Upsell — The Better Version",
      desc: "Shows a higher-spec version or newer model of the same product highlighting the real difference in value. Noticeably increases average order value.",
      color: "#10b981",
    },
    {
      icon: "🎁",
      title: "Smart Combo Bundles",
      desc: "Combines complementary products in a discounted bundle, clearly showing savings to encourage the customer to take the complete set at once.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+42%", label: "Average order value", color: "#34d399" },
    { value: "+38%", label: "Number of products in cart", color: "#06b6d4" },
    { value: "+25%", label: "Conversion rate", color: "#10b981" },
    { value: "+60%", label: "Customer return probability", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "A customer browsing women's perfumes",
    steps: [
      "The customer opens a women's perfume page priced at 220 SAR.",
      "Ziadah instantly analyzes: she's from Jeddah, previously bought a skincare set, and is browsing from her phone.",
      "Below the perfume: 'Bought Together' → matching body spray + perfume cream as a bundle for 330 SAR instead of 380.",
      "The large perfume version (300ml) also appears at 310 SAR with a clear savings comparison.",
    ],
    result: "The customer bought the bundle — the order increased from 220 to 330 SAR (+50%) with just one suggestion.",
  },
  ctaTitleEn: "Boost your product page sales today",
  ctaDescEn: "Activate Ziadah with one click and see the difference within the first week.",
  seo: {
    title: "تحسين صفحة المنتج — زيادة",
    titleEn: "Optimize Product Page — Ziadah",
    description: "اجعل صفحة منتجك أقوى أداةً بيعية مع زيادة. توصيات ذكية تكمّل تجربة العميل وترفع قيمة الطلب في أعلى نقاط التأثير.",
    descriptionEn: "Make your product page the strongest sales tool with Ziadah. Smart recommendations that complete the customer experience and increase order value at peak impact points.",
    canonical: "/use-cases/product-page",
  },
};

export default function ProductPage() {
  return <UseCaseLayout data={data} />;
}
