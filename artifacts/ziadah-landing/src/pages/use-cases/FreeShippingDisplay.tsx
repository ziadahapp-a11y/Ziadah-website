import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import FreeShippingThresholdWidget from "../../components/widgets/FreeShippingThresholdWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "عرض الشحن المجاني",
    subtitle:
      "يُظهر للعميل كم تبقّى حتى يصل لعتبة الشحن المجاني — مع منتجات مقترحة تسدّ الفجوة بالقيمة المناسبة. دافع واضح يُشجّع على إضافة منتج بدلاً من المغادرة.",
    tagline: "شريط تقدّم + اقتراحات = تخطّي عتبة الشحن بسهولة",
    icon: "🚚",
  },
  whatWeDoTitle: "لماذا عرض الشحن المجاني يغيّر السلوك؟",
  whatWeDoDesc:
    "الشحن أحد أسباب التخلي عن السلة. عندما يرى العميل أنه على بعد مبلغ محدد من الشحن المجاني، يصبح الإضافة قراراً منطقياً. زيادة يحسب الفجوة بدقة ويقترح منتجات بالقيمة الناقصة تقريباً — مع واجهة بصرية (شريط تقدّم) تبقى العميل على اطلاع دون ضغط مزعج.",
  strategyTitle: "كيف يُنفَّذ عرض الشحن المجاني في زيادة؟",
  strategies: [
    {
      icon: "📊",
      title: "شريط التقدّم",
      desc: "يُظهر نسبة المبلغ المحقق من عتبة الشحن المجاني — واضح ومباشر.",
      color: "#22c55e",
    },
    {
      icon: "🎯",
      title: "تطابق قيمة الفجوة",
      desc: "يقترح منتجات قريبة من المبلغ المتبقي ليُسهّل إتمام العتبة دون تجاوز كبير.",
      color: "#06b6d4",
    },
    {
      icon: "🧩",
      title: "صلة بالسلة",
      desc: "الاقتراحات مرتبطة بما في السلة أو بتصنيفات يهتم بها العميل — لا عشوائية.",
      color: "#22c55e",
    },
    {
      icon: "⚡",
      title: "نقاط الرحلة",
      desc: "عادةً في السلة أو الدفع — حيث قرار الشراء قريب والتحقق من العتبة يُحدث أثراً مباشراً.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+31%", label: "الطلبات التي تتجاوز عتبة الشحن", color: "#22c55e" },
    { value: "+22%", label: "متوسط قيمة الطلب", color: "#06b6d4" },
    { value: "-18%", label: "مغادرة بسبب الشحن", color: "#22c55e" },
    { value: "+27%", label: "إتمام الشراء بعد الإضافة", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "سلة بقيمة 170 ⃁ وعتبة 200 ⃁",
    steps: [
      "يظهر الشريط: 'باقي 30 ⃁ للشحن المجاني'.",
      "يُقترح منتج تكميلي بـ 32 ⃁ قريب من الفجوة.",
      "العميل يضيف ويحصل على شحن مجاني — يرتفع عدد المنتجات والقيمة معاً.",
    ],
    result: "تحويل من تردد إلى إتمام باستخدام عتبة واضحة واقتراح مخصص.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يُعرض الشحن المجاني للعميل؟" : "How does the free-shipping prompt look?"}
      subtitle={isAr ? "شريط تقدّم واقتراحات تسدّ الفجوة" : "Progress bar + gap-closing suggestions"}
      tabs={[{ labelAr: "📱 معاينة", labelEn: "📱 Preview", content: <FreeShippingThresholdWidget /> }]}
    />
  ),
  ctaTitle: "فعّل عرض الشحن المجاني",
  ctaDesc: "ارفع معدل إتمام الطلبات عبر عتبة واضحة واقتراحات ذكية.",
  heroEn: {
    tag: "By Goals",
    title: "Free Shipping Display",
    subtitle:
      "Shows how much is left until the free shipping threshold — with suggested products that close the gap. A clear incentive to add instead of leave.",
    tagline: "Progress bar + suggestions = easier threshold crossing",
    icon: "🚚",
  },
  whatWeDoTitleEn: "Why does free shipping messaging change behavior?",
  whatWeDoDescEn:
    "Shipping is a top abandonment reason. When customers see a concrete amount left to unlock free shipping, adding one more item becomes a rational decision. Ziadah calculates the gap precisely and suggests products near the missing amount — with a visual progress bar that keeps customers informed without aggressive pressure.",
  strategyTitleEn: "How Ziadah implements free shipping display",
  strategiesEn: [
    {
      icon: "📊",
      title: "Progress bar",
      desc: "Shows how much of the free shipping threshold is already covered — clear and direct.",
      color: "#22c55e",
    },
    {
      icon: "🎯",
      title: "Gap matching",
      desc: "Suggests products close to the remaining amount so the threshold is easy to hit without overspending.",
      color: "#06b6d4",
    },
    {
      icon: "🧩",
      title: "Cart relevance",
      desc: "Suggestions tied to what’s in the cart or categories the customer cares about — not random picks.",
      color: "#22c55e",
    },
    {
      icon: "⚡",
      title: "Journey placement",
      desc: "Usually cart or checkout — where purchase intent is high and threshold messaging has impact.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+31%", label: "Orders exceeding shipping threshold", color: "#22c55e" },
    { value: "+22%", label: "Average order value", color: "#06b6d4" },
    { value: "-18%", label: "Shipping-related drop-off", color: "#22c55e" },
    { value: "+27%", label: "Completion after add-on", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "170 SAR cart, 200 SAR threshold",
    steps: [
      "The bar shows: '30 SAR left for free shipping'.",
      "A complementary item at ~32 SAR is suggested near the gap.",
      "The customer adds and gets free shipping — more items and higher value.",
    ],
    result: "Turn hesitation into completion with a clear threshold and a relevant suggestion.",
  },
  ctaTitleEn: "Activate free shipping display",
  ctaDescEn: "Increase completion with a clear threshold and smart suggestions.",
  seo: {
    title: "عرض الشحن المجاني — زيادة",
    titleEn: "Free Shipping Display — Ziadah",
    description:
      "زيادة يعرض عتبة الشحن المجاني بشريط تقدّم واقتراحات تسدّ الفجوة — لزيادة إتمام الطلبات ومتوسط قيمة السلة.",
    descriptionEn:
      "Ziadah shows the free shipping threshold with a progress bar and gap-closing suggestions — higher completion and higher order value.",
    canonical: "/use-cases/free-shipping",
  },
};

export default function FreeShippingDisplay() {
  return <UseCaseLayout data={data} />;
}
