import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import RemoveFromCartWidget from "../../components/widgets/RemoveFromCartWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأنشطة",
    title: "الحذف من السلة",
    subtitle: "عندما يحاول العميل حذف منتج فإنه لم يتخلَّ عن الرغبة — بل وجد عائقاً. زيادة يتدخل بذكاء قبل أن يخسر المتجر البيع: يعرض خصماً مؤقتاً أو بديلاً أوفر يُبقي العميل في رحلة الشراء.",
    tagline: "محاولة الحذف = إشارة استغاثة يلتقطها زيادة",
    icon: "🛡️",
  },
  whatWeDoTitle: "كيف يمنع زيادة خسارة العميل لحظة الحذف؟",
  whatWeDoDesc:
    "لحظة الحذف من السلة من أخطر اللحظات في رحلة الشراء — العميل يائس من إتمام الشراء لسبب ما: السعر، الشحن، أو التردد. زيادة يرصد محاولة الحذف ويتدخل قبل اختفاء المنتج: يعرض خصماً مؤقتاً مغرياً أو بديلاً أقل سعراً أو تذكيراً بمزايا المنتج. الهدف: إبقاء العميل وإنقاذ البيع الذي كان على وشك الضياع.",
  strategyTitle: "استراتيجيات زيادة لإنقاذ البيع لحظة الحذف",
  strategies: [
    {
      icon: "🔥",
      title: "خصم احتجازي مؤقت",
      desc: "حين يضغط العميل 'حذف' يظهر له خصم فوري بنسبة 10 إلى 20% لمدة محدودة (10 دقائق). الضغط الزمني يحوّل القرار من 'الحذف' إلى 'الشراء الآن'.",
      color: "#ec4899",
    },
    {
      icon: "🔄",
      title: "عرض بديل أوفر",
      desc: "إذا كان السعر هو العائق، يقترح زيادة منتجاً مشابهاً بسعر أقل — يُبقي العميل في التجربة ويُبقي المتجر يكسب بيعاً بدلاً من لا شيء.",
      color: "#7c3aed",
    },
    {
      icon: "💬",
      title: "تذكير بالقيمة والمزايا",
      desc: "أحياناً العميل ينسى لماذا اختار المنتج. زيادة يُذكّره بأبرز مزاياه وتقييمات العملاء الأخرى لإعادة شحن القرار بالثقة.",
      color: "#06b6d4",
    },
    {
      icon: "📦",
      title: "خيار 'احفظ لوقت لاحق'",
      desc: "بدلاً من الحذف النهائي، يعرض زيادة خيار الحفظ في القائمة المفضلة — العميل لا يخسر المنتج والمتجر يحتفظ بنية الشراء ليُذكّره بها لاحقاً.",
      color: "#8b5cf6",
    },
  ],
  stats: [
    { value: "-42%", label: "حالات الحذف التي تنتهي ببيع بعد تدخل زيادة", color: "#ec4899" },
    { value: "31%", label: "معدل قبول الخصم الاحتجازي لحظة الحذف", color: "#a855f7" },
    { value: "+24%", label: "إيرادات محفوظة كانت ستُفقد بدون التدخل", color: "#8b5cf6" },
    { value: "12 ث", label: "متوسط وقت اتخاذ القرار بعد ظهور عرض زيادة", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "عميل أراد حذف حذاء رياضي",
    steps: [
      "أضاف العميل حذاء رياضي بـ 280 ⃁ لكنه تردد وضغط 'حذف'.",
      "رصد زيادة المحاولة فوراً وعرض: 'قبل أن تحذفه — خصم 15% خاص لك الآن: السعر 238 ⃁ لمدة 9 دقائق فقط'.",
      "ظهر العرض بتصميم واضح مع عداد تنازلي يُشعر العميل بالحاجة للقرار الفوري.",
      "العميل اختار الاستفادة من الخصم وأتمّ الشراء بدلاً من الحذف.",
    ],
    result: "بيع بـ 238 ⃁ بدلاً من خسارة 280 ⃁ كاملاً — المتجر احتفظ بالعميل وحقق إيراداً لم يكن ليحدث لولا التدخل الذكي.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يتدخل زيادة لحظة الحذف؟" : "How does Ziadah intervene at the removal moment?"}
      subtitle={
        isAr
          ? "محاكاة تفاعلية — شاهد نافذة الاحتجاز الذكية تظهر قبل اختفاء المنتج"
          : "Interactive simulation — watch the smart retention popup appear before the product disappears"
      }
      tabs={[{ labelAr: "📱 معاينة", labelEn: "📱 Preview", content: <RemoveFromCartWidget /> }]}
    />
  ),
  ctaTitle: "أوقف خسارة المبيعات قبل أن تحدث",
  ctaDesc: "كل محاولة حذف هي فرصة مخفية — زيادة يحوّلها إلى بيع ناجح.",
  heroEn: {
    tag: "By Activity",
    title: "Remove from Cart",
    subtitle: "When a customer tries to remove a product, they haven't given up on wanting it — they found an obstacle. Ziadah intervenes smartly before the store loses the sale: offering a timed discount or a more affordable alternative to keep the customer in the buying journey.",
    tagline: "A removal attempt = a distress signal Ziadah catches",
    icon: "🛡️",
  },
  whatWeDoTitleEn: "How does Ziadah prevent losing the customer at the removal moment?",
  whatWeDoDescEn:
    "The moment of removal from cart is one of the most critical in the buying journey — the customer is giving up on completing the purchase for some reason: price, shipping, or hesitation. Ziadah detects the removal attempt and intervenes before the product disappears: offering an enticing timed discount, a lower-priced alternative, or a reminder of the product's benefits. The goal: retain the customer and save a sale that was about to be lost.",
  strategyTitleEn: "Ziadah's strategies to save the sale at the removal moment",
  strategiesEn: [
    {
      icon: "🔥",
      title: "Timed Retention Discount",
      desc: "When the customer clicks 'Remove', an instant 10-20% discount appears for a limited time (10 minutes). Time pressure converts the decision from 'remove' to 'buy now'.",
      color: "#ec4899",
    },
    {
      icon: "🔄",
      title: "More Affordable Alternative",
      desc: "If price is the obstacle, Ziadah suggests a similar product at a lower price — keeping the customer in the experience and earning a sale instead of nothing.",
      color: "#7c3aed",
    },
    {
      icon: "💬",
      title: "Value and Benefits Reminder",
      desc: "Sometimes the customer forgets why they chose the product. Ziadah reminds them of its key features and other customer reviews to recharge the decision with confidence.",
      color: "#06b6d4",
    },
    {
      icon: "📦",
      title: "'Save for Later' Option",
      desc: "Instead of permanent deletion, Ziadah offers a save-to-wishlist option — the customer doesn't lose the product and the store retains purchase intent to remind them later.",
      color: "#8b5cf6",
    },
  ],
  statsEn: [
    { value: "-42%", label: "Removal cases ending in a sale after Ziadah's intervention", color: "#ec4899" },
    { value: "31%", label: "Retention discount acceptance rate at removal moment", color: "#a855f7" },
    { value: "+24%", label: "Saved revenue that would have been lost without intervention", color: "#8b5cf6" },
    { value: "12 sec", label: "Average decision time after Ziadah's offer appears", color: "#06b6d4" },
  ],
  exampleScenarioEn: {
    title: "A customer wanted to remove a running shoe",
    steps: [
      "The customer added running shoes at 280 SAR but hesitated and clicked 'Remove'.",
      "Ziadah detected the attempt instantly and showed: 'Before you remove — 15% special discount for you now: 238 SAR for 9 minutes only'.",
      "The offer appeared with a clear design and a countdown timer creating a sense of urgency for an immediate decision.",
      "The customer chose to take advantage of the discount and completed the purchase instead of removing.",
    ],
    result: "A sale at 238 SAR instead of losing 280 SAR entirely — the store retained the customer and earned revenue that wouldn't have happened without smart intervention.",
  },
  ctaTitleEn: "Stop losing sales before they happen",
  ctaDescEn: "Every removal attempt is a hidden opportunity — Ziadah turns it into a successful sale.",
  seo: {
    title: "استعادة العميل عند الحذف من السلة — زيادة",
    titleEn: "Customer Recovery at Cart Removal — Ziadah",
    description: "لا تدع العميل يحذف المنتج دون عرض بديل. زيادة يتدخل بذكاء بخصم مؤقت أو بديل أوفر يُبقي العميل في رحلة الشراء.",
    descriptionEn: "Don't let customers remove products without offering an alternative. Ziadah smartly intervenes with a timed discount or more affordable option to keep them in the buying journey.",
    canonical: "/use-cases/remove-from-cart",
  },
};

export default function RemoveFromCartPage() {
  return <UseCaseLayout data={data} />;
}
