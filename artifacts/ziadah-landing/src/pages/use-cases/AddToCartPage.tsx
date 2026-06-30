import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import AddToCartWidget from "../../components/widgets/AddToCartWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأنشطة",
    title: "إضافة للسلة",
    subtitle: "اللحظة التي يضغط فيها العميل 'أضف للسلة' هي فرصة ذهبية — نية الشراء في أعلى مستوياتها وزيادة يستغلها لعرض توصية مكمّلة ترفع قيمة الطلب فوراً.",
    tagline: "لحظة الإضافة = أعلى نية شرائية",
    icon: "🛍️",
  },
  whatWeDoTitle: "كيف يستغل زيادة لحظة الإضافة للسلة؟",
  whatWeDoDesc:
    "حين يضغط العميل 'أضف للسلة' يكون قد اتخذ قراره بالفعل — وهذا يجعله في أكثر لحظاته تقبّلاً لاقتراح إضافي. زيادة يرصد هذه اللحظة ويعرض على الفور منتجاً مكمّلاً مختاراً بالذكاء الاصطناعي بناءً على بيانات آلاف الطلبات الفعلية. لا يقاطع التجربة — بل يثريها بعرض يشعر العميل أنه كان ينتظره.",
  strategyTitle: "استراتيجيات زيادة لحظة الإضافة للسلة",
  strategies: [
    {
      icon: "⚡",
      title: "توصية فورية لحظة الإضافة",
      desc: "بمجرد الضغط على 'أضف للسلة' تظهر نافذة Glassmorphism خفيفة بمنتج مكمّل واحد فقط — مختار بعناية ليكون ذو صلة مباشرة بالمنتج المضاف.",
      color: "#a855f7",
    },
    {
      icon: "🤝",
      title: "مبدأ 'اشتروا مع بعض'",
      desc: "يعرض زيادة المنتجات التي اشتراها عملاء آخرون مع نفس المنتج فعلياً. الدليل الاجتماعي يرفع معدل القبول بشكل ملحوظ.",
      color: "#06b6d4",
    },
    {
      icon: "🎯",
      title: "توصية أحادية بدون إرباك",
      desc: "عرض منتج واحد فقط لحظة الإضافة — لا قائمة تُربك العميل. التركيز على خيار واحد يرفع معدل التحويل بشكل كبير.",
      color: "#8b5cf6",
    },
    {
      icon: "📊",
      title: "تخصيص بالذكاء الاصطناعي",
      desc: "زيادة يحلل سلوك العميل وتاريخه وقيمة السلة الحالية ليختار الاقتراح الأنسب — ليس مجرد منتج عشوائي مرتبط.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+35%", label: "متوسط قيمة الطلب عند تطبيق التوصية الفورية", color: "#a855f7" },
    { value: "38%", label: "معدل قبول التوصية لحظة الإضافة", color: "#06b6d4" },
    { value: "+27%", label: "إيرادات إضافية من كل جلسة تسوق", color: "#8b5cf6" },
    { value: "x2.4", label: "أسرع قرار شراء مقارنة بالتوصية في الصفحة الرئيسية", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "عميلة أضافت فاونديشن لسلتها",
    steps: [
      "العميلة اختارت فاونديشن بـ 110 ⃁ وضغطت 'أضف للسلة'.",
      "رصد زيادة اللحظة وعرض فوراً: 'عميلات اشترين هذا الفاونديشن اشترين أيضاً برايمر التثبيت بـ 55 ⃁'.",
      "ظهر العرض بتصميم Glassmorphism أنيق لا يقاطع التجربة — زر واحد 'أضف للسلة'.",
      "العميلة أضافت البرايمر بنقرة واحدة لأنه منطقي ومكمّل لما اشترته.",
    ],
    result: "قيمة الطلب ارتفعت من 110 إلى 165 ⃁ بقرار شراء لم تخطط له العميلة — لكنها سعيدة به.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف تبدو التوصية لحظة الإضافة؟" : "How does the add-to-cart recommendation look?"}
      subtitle={
        isAr
          ? "محاكاة تفاعلية — شاهد ردة فعل زيادة بمجرد ضغط العميل على الإضافة"
          : "Interactive simulation — see Ziadah's response the moment a customer clicks add to cart"
      }
      tabs={[{ labelAr: "📱 معاينة", labelEn: "📱 Preview", content: <AddToCartWidget /> }]}
    />
  ),
  ctaTitle: "حوّل كل إضافة للسلة إلى فرصة بيع إضافية",
  ctaDesc: "زيادة يتدخل في اللحظة المثلى ليرفع قيمة كل طلب تلقائياً.",
  heroEn: {
    tag: "By Activity",
    title: "Add to Cart",
    subtitle: "The moment the customer clicks 'Add to Cart' is a golden opportunity — purchase intent is at its peak and Ziadah seizes it to show a complementary recommendation that instantly increases order value.",
    tagline: "The moment of adding = peak purchase intent",
    icon: "🛍️",
  },
  whatWeDoTitleEn: "How does Ziadah leverage the add-to-cart moment?",
  whatWeDoDescEn:
    "When the customer clicks 'Add to Cart', they've already made their decision — making them most receptive to an additional suggestion. Ziadah detects this moment and instantly shows a complementary product selected by AI based on thousands of actual orders. It doesn't interrupt the experience — it enriches it with an offer the customer feels they were waiting for.",
  strategyTitleEn: "Ziadah's strategies at the add-to-cart moment",
  strategiesEn: [
    {
      icon: "⚡",
      title: "Instant Recommendation at Add-to-Cart",
      desc: "The moment 'Add to Cart' is clicked, a sleek glassmorphism popup appears with one complementary product only — carefully selected for direct relevance to the added product.",
      color: "#a855f7",
    },
    {
      icon: "🤝",
      title: "'Bought Together' Principle",
      desc: "Ziadah shows products that other customers actually bought with the same product. Social proof significantly increases acceptance rates.",
      color: "#06b6d4",
    },
    {
      icon: "🎯",
      title: "Single Recommendation, No Overwhelm",
      desc: "Showing just one product at the add-to-cart moment — no list to overwhelm the customer. Focusing on a single option significantly increases conversion rate.",
      color: "#8b5cf6",
    },
    {
      icon: "📊",
      title: "AI-Powered Personalization",
      desc: "Ziadah analyzes customer behavior, history, and current cart value to choose the most suitable suggestion — not just a random related product.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+35%", label: "Average order value when instant recommendation is applied", color: "#a855f7" },
    { value: "38%", label: "Recommendation acceptance rate at add-to-cart moment", color: "#06b6d4" },
    { value: "+27%", label: "Additional revenue from every shopping session", color: "#8b5cf6" },
    { value: "x2.4", label: "Faster purchase decision vs. home page recommendation", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "A customer added foundation to her cart",
    steps: [
      "The customer chose foundation at 110 SAR and clicked 'Add to Cart'.",
      "Ziadah detected the moment and instantly showed: 'Customers who bought this foundation also bought setting primer at 55 SAR'.",
      "The offer appeared in an elegant glassmorphism design that doesn't interrupt the experience — one button: 'Add to Cart'.",
      "The customer added the primer with one click because it's logical and complements what she bought.",
    ],
    result: "Order value rose from 110 to 165 SAR with a purchase decision the customer didn't plan — but she's happy about it.",
  },
  ctaTitleEn: "Turn every add-to-cart into an additional sales opportunity",
  ctaDescEn: "Ziadah intervenes at the optimal moment to automatically increase every order value.",
  seo: {
    title: "التوصية عند إضافة للسلة — زيادة",
    titleEn: "Add-to-Cart Recommendation — Ziadah",
    description: "حوّل لحظة إضافة المنتج للسلة إلى فرصة بيع إضافية ذكية مع زيادة. عروض مخصصة في أعلى لحظات نية الشراء ترفع AOV فوراً.",
    descriptionEn: "Turn the add-to-cart moment into a smart upsell opportunity with Ziadah. Personalized offers at peak purchase intent moments instantly boost AOV.",
    canonical: "/use-cases/add-to-cart",
  },
};

export default function AddToCartPage() {
  return <UseCaseLayout data={data} />;
}
