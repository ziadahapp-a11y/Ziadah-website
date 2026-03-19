import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import ThankYouMockup from "../../components/ThankYouMockup";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "صفحة الشكر",
    subtitle: "بعد إتمام الشراء مباشرة — العميل في أعلى حالات الرضا والانفتاح. هذه اللحظة الذهبية لاقتراح منتج يكمل تجربته أو دعوته للطلب مجدداً.",
    tagline: "الراضي عن شرائه أكثر عميل مستعد للشراء مرة ثانية",
    icon: "🎉",
  },
  whatWeDoTitle: "كيف يعمل زيادة في صفحة الشكر؟",
  whatWeDoDesc:
    "بعد إتمام الطلب، يظهر للعميل صفحة الشكر — وهي في الغالب صفحة ميتة لا تقدم شيئاً. زيادة يحوّلها إلى فرصة مبيعات: يعرض منتجاً تكميلياً ذكياً مرتبطاً بما اشتراه للتو، أو نسخة Upsell لطلبه القادم، أو دعوة للاشتراك في عرض حصري. النغمة هنا ليست بيعية — بل تجربة مخصصة دافئة تبني الولاء وتحفّز الطلبات المتكررة.",
  strategyTitle: "استراتيجيات زيادة في صفحة الشكر",
  strategies: [
    {
      icon: "🎯",
      title: "منتج تكميلي ما بعد الشراء",
      desc: "يعرض منتجاً مكمّلاً مباشراً لما اشتراه العميل للتو — بمنطق 'معظم من اشتروا هذا أضافوا أيضاً...' لتحفيز الطلب الثاني.",
      color: "#a855f7",
    },
    {
      icon: "⬆️",
      title: "Upsell للطلب القادم",
      desc: "يقترح ترقية أو نسخة أفضل تناسب الطلب التالي — مع عرض خاص محدود المدة لتحفيز العودة.",
      color: "#10b981",
    },
    {
      icon: "🏷️",
      title: "كوبون الشراء التالي",
      desc: "يمنح العميل كوبون خصم لطلبه القادم مع مدة محدودة (24-48 ساعة) لخلق شعور بالعجلة وإعادته للمتجر.",
      color: "#f59e0b",
    },
    {
      icon: "❤️",
      title: "بناء الولاء الشخصي",
      desc: "يعرض توصيات مبنية على الملف الشخصي الكامل للعميل مما يجعل كل زيارة لصفحة الشكر تجربة مختلفة ومخصصة.",
      color: "#ec4899",
    },
  ],
  stats: [
    { value: "+48٪", label: "معدل الشراء المتكرر", color: "#a855f7" },
    { value: "+26٪", label: "قيمة الطلب الثاني", color: "#06b6d4" },
    { value: "+35٪", label: "معدل استخدام كوبون العودة", color: "#10b981" },
    { value: "+42٪", label: "رضا العميل على المدى البعيد", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "عميل اشترى هاتفاً جديداً",
    steps: [
      "العميل أتم شراء هاتف Galaxy بسعر 1800 ⃁.",
      "تظهر له صفحة شكر مخصصة من زيادة بدلاً من الصفحة الجامدة المعتادة.",
      "يظهر له: 'عملاء اشتروا هذا الهاتف أضافوا أيضاً → واقي شاشة + غلاف + سماعة بلوتوث بحزمة 280 ⃁'.",
      "يظهر أيضاً كوبون 15٪ خصم لأي طلب خلال 48 ساعة القادمة.",
    ],
    result: "38٪ من هؤلاء العملاء أضافوا الإكسسوارات فوراً، و22٪ عادوا خلال 48 ساعة باستخدام الكوبون.",
  },
  plans: ["الاحترافية", "الأعمال"],
  ctaTitle: "حوّل صفحة الشكر إلى مصدر دخل إضافي",
  ctaDesc: "ابنِ ولاء حقيقي وحفّز الطلبات المتكررة من أولى خطوات العلاقة مع العميل.",
  extraSections: <ThankYouMockup />,
  heroEn: {
    tag: "By Pages",
    title: "Thank You Page",
    subtitle: "Right after completing the purchase — the customer is at peak satisfaction and openness. This golden moment is perfect for suggesting a complementary product or inviting them to order again.",
    tagline: "A satisfied buyer is the most ready customer to buy again",
    icon: "🎉",
  },
  whatWeDoTitleEn: "How does Ziadah work on the thank you page?",
  whatWeDoDescEn:
    "After completing the order, the customer sees the thank you page — which is usually a dead page offering nothing. Ziadah transforms it into a sales opportunity: it shows a smart complementary product related to what they just bought, an upsell version for their next order, or an invitation to subscribe to an exclusive offer. The tone here isn't salesy — it's a warm, personalized experience that builds loyalty and drives repeat orders.",
  strategyTitleEn: "Ziadah's strategies on the thank you page",
  strategiesEn: [
    {
      icon: "🎯",
      title: "Post-Purchase Complementary Product",
      desc: "Shows a directly complementary product to what the customer just bought — with the logic 'Most who bought this also added...' to stimulate the second order.",
      color: "#a855f7",
    },
    {
      icon: "⬆️",
      title: "Upsell for Next Order",
      desc: "Suggests an upgrade or better version for the next order — with a special limited-time offer to incentivize return.",
      color: "#10b981",
    },
    {
      icon: "🏷️",
      title: "Next Purchase Coupon",
      desc: "Gives the customer a discount coupon for their next order with a limited time window (24-48 hours) to create urgency and bring them back.",
      color: "#f59e0b",
    },
    {
      icon: "❤️",
      title: "Personal Loyalty Building",
      desc: "Shows recommendations built on the customer's complete profile, making every thank you page visit a different, personalized experience.",
      color: "#ec4899",
    },
  ],
  statsEn: [
    { value: "+48%", label: "Repeat purchase rate", color: "#a855f7" },
    { value: "+26%", label: "Second order value", color: "#06b6d4" },
    { value: "+35%", label: "Return coupon usage rate", color: "#10b981" },
    { value: "+42%", label: "Long-term customer satisfaction", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "A customer who bought a new phone",
    steps: [
      "The customer completed a Galaxy phone purchase at 1,800 SAR.",
      "A personalized thank you page from Ziadah appears instead of the usual static page.",
      "Shown: 'Customers who bought this phone also added → screen protector + case + Bluetooth earbuds as a bundle for 280 SAR'.",
      "Also shown: a 15% coupon for any order within the next 48 hours.",
    ],
    result: "38% of these customers added accessories immediately, and 22% returned within 48 hours using the coupon.",
  },
  plansEn: ["Professional", "Business"],
  ctaTitleEn: "Turn the thank you page into an additional revenue source",
  ctaDescEn: "Build real loyalty and drive repeat orders from the very first steps of the customer relationship.",
  seo: {
    title: "عروض صفحة الشكر — زيادة",
    titleEn: "Thank You Page Offers — Ziadah",
    description: "اللحظة بعد الشراء هي الأكثر انفتاحاً. زيادة يستثمر صفحة الشكر لاقتراح منتج تكميلي وتعزيز الولاء وزيادة معدل التكرار.",
    descriptionEn: "The post-purchase moment is the most open. Ziadah leverages the thank you page to suggest complementary products, build loyalty, and increase repeat order rates.",
    canonical: "/use-cases/thank-you",
  },
};

export default function ThankYouPage() {
  return <UseCaseLayout data={data} />;
}
