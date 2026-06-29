import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import CouponWidget from "../../components/widgets/CouponWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "قسيمة الخصم",
    subtitle:
      "كوبونات ذكية تظهر في اللحظة المناسبة — مؤقتة ومحدودة بشروط واضحة — لتحفيز العميل المتردد على إتمام الشراء. ليست مجرد رمز ثابت؛ بل عرض مرتبط بسلوك وقيمة السلة.",
    tagline: "خصم في الوقت الصح = إتمام بدل إلغاء",
    icon: "🏷️",
  },
  whatWeDoTitle: "ما الفرق بين قسيمة عادية وقسيمة ذكية في زيادة؟",
  whatWeDoDesc:
    "القسيمة العادية يُعلن عنها للجميع. قسيمة زيادة تُفعَّل لحالة محددة: وقت طويل في السلة، قيمة قريبة من هدف، أو محاولة مغادرة. يمكن ربطها بشروط قيمة أو فئة أو وقت — ويُظهرها الواجهة بوضوح مع عداد زمني يخلق إلحاحاً حقيقياً دون إزعاج.",
  strategyTitle: "أساليب استخدام قسيمة الخصم",
  strategies: [
    {
      icon: "⏱️",
      title: "قسيمة مؤقتة",
      desc: "مدة محدودة للاستخدام — يدفع العميل للقرار الآن.",
      color: "#f59e0b",
    },
    {
      icon: "💰",
      title: "شرط قيمة السلة",
      desc: "مثلاً: خصم عند تجاوز مبلغ معين — يُشجّع على رفع قيمة الطلب.",
      color: "#34d399",
    },
    {
      icon: "🎯",
      title: "تفعيل حسب السلوك",
      desc: "تظهر عند تردد أو عند مغادرة الصفحة — حسب ما يُناسب متجرك.",
      color: "#06b6d4",
    },
    {
      icon: "🚚",
      title: "دمج مع الشحن",
      desc: "أحياناً تُقترن القسيمة بشحن مجاني أو عرض تكميلي — رسالة واحدة أكثر إقناعاً.",
      color: "#10b981",
    },
  ],
  stats: [
    { value: "-38%", label: "معدل التخلي عند استخدام الإنقاذ بكوبون", color: "#ec4899" },
    { value: "+24%", label: "إتمام الطلب بعد ظهور القسيمة", color: "#34d399" },
    { value: "+18%", label: "متوسط قيمة الطلب", color: "#06b6d4" },
    { value: "+31%", label: "العملاء المسترجعون شهرياً", color: "#10b981" },
  ],
  exampleScenario: {
    title: "عميل في السلة منذ دقائق",
    steps: [
      "يكتشف زيادة التردد أو تجاوز زمن بدون إتمام.",
      "يظهر عرض كوبون بخصم واضح ومدة محدودة.",
      "العميل يُطبّق الكود ويُكمل الطلب.",
    ],
    result: "تحويل من تخلي عن السلة إلى إتمام بعرض محدود الوقت.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف تظهر قسيمة الخصم للعميل؟" : "How does the coupon appear to customers?"}
      subtitle={isAr ? "واجهة كوبون واضحة مع عداد زمني" : "Clear coupon UI with a countdown"}
      tabs={[{ labelAr: "📱 معاينة", labelEn: "📱 Preview", content: <CouponWidget /> }]}
    />
  ),
  ctaTitle: "فعّل قسيمة الخصم الذكية",
  ctaDesc: "حوّل المترددين إلى مشترين بعرض واضح ومحدود الوقت.",
  heroEn: {
    tag: "By Goals",
    title: "Discount Coupon",
    subtitle:
      "Smart coupons that appear at the right moment — time-limited with clear conditions — to nudge hesitant customers to complete checkout. Not a static code for everyone; an offer tied to behavior and cart value.",
    tagline: "The right discount at the right time = completion instead of abandonment",
    icon: "🏷️",
  },
  whatWeDoTitleEn: "What’s the difference between a regular coupon and a Ziadah smart coupon?",
  whatWeDoDescEn:
    "Regular coupons are broadcast to everyone. A Ziadah coupon activates for a specific situation: long time in cart, value near a goal, or exit intent. It can be tied to cart value, category, or time — and the UI shows it clearly with a countdown that creates real urgency without being annoying.",
  strategyTitleEn: "How to use discount coupons effectively",
  strategiesEn: [
    {
      icon: "⏱️",
      title: "Time-limited coupon",
      desc: "A short validity window — pushes customers to decide now.",
      color: "#f59e0b",
    },
    {
      icon: "💰",
      title: "Cart value condition",
      desc: "E.g. discount after crossing a threshold — encourages higher order value.",
      color: "#34d399",
    },
    {
      icon: "🎯",
      title: "Behavior-triggered",
      desc: "Shown on hesitation or exit intent — depending on what fits your store.",
      color: "#06b6d4",
    },
    {
      icon: "🚚",
      title: "Pair with shipping",
      desc: "Sometimes combined with free shipping or a complementary offer — one stronger message.",
      color: "#10b981",
    },
  ],
  statsEn: [
    { value: "-38%", label: "Abandonment when rescue coupon is used", color: "#ec4899" },
    { value: "+24%", label: "Completion after coupon appears", color: "#34d399" },
    { value: "+18%", label: "Average order value", color: "#06b6d4" },
    { value: "+31%", label: "Recovered customers monthly", color: "#10b981" },
  ],
  exampleScenarioEn: {
    title: "Customer in cart for several minutes",
    steps: [
      "Ziadah detects hesitation or time without progress.",
      "A coupon appears with a clear discount and limited time.",
      "The customer applies the code and completes checkout.",
    ],
    result: "Turn cart abandonment into completion with a time-bound offer.",
  },
  ctaTitleEn: "Activate smart discount coupons",
  ctaDescEn: "Convert hesitators into buyers with a clear, time-limited offer.",
  seo: {
    title: "قسيمة الخصم الذكية — زيادة",
    titleEn: "Smart Discount Coupon — Ziadah",
    description:
      "قسيمة خصم ذكية من زيادة: تظهر في اللحظة المناسبة بشروط واضحة وعداد زمني — لرفع إتمام الطلبات وتقليل التخلي عن السلة.",
    descriptionEn:
      "Ziadah smart coupons: shown at the right moment with clear rules and a countdown — higher completion and lower abandonment.",
    canonical: "/use-cases/discount-coupon",
  },
};

export default function DiscountCoupon() {
  return <UseCaseLayout data={data} />;
}
