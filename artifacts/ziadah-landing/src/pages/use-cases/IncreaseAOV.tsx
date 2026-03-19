import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
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
      desc: "يجمّع منتجات مكمّلة بخصم 15-25٪ على سعر المجموع. العميل يحصل على قيمة أعلى ويدفع أكثر — فوز للطرفين.",
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
      color: "#10b981",
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
    { value: "+35٪", label: "متوسط قيمة الطلب", color: "#a855f7" },
    { value: "+28٪", label: "عدد المنتجات في السلة", color: "#06b6d4" },
    { value: "+42٪", label: "الطلبات فوق عتبة الشحن", color: "#10b981" },
    { value: "7x", label: "عائد الاستثمار في المتوسط", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "تأثير رفع متوسط السلة بـ 20٪",
    steps: [
      "متجر يستقبل 500 طلب شهرياً بمتوسط سلة 250 ⃁ → إيراد 125,000 ⃁.",
      "بعد تفعيل زيادة: متوسط السلة ارتفع إلى 300 ⃁ (+20٪).",
      "نفس عدد الطلبات 500، لكن الإيراد أصبح 150,000 ⃁.",
      "الزيادة الشهرية: 25,000 ⃁ إضافية — بدون عميل جديد واحد.",
    ],
    result: "25,000 ⃁ شهرياً = 300,000 ⃁ سنوياً — مجرد تحسين متوسط السلة بـ 20٪.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يُحرّك زيادة العميل لرفع سلّته؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا يبدو ويدجت رفع متوسط الطلب كما يراه عميلك فعلياً</p>
        <IncreaseAOVWidget />
      </div>
    </section>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "ارفع متوسط سلتك بـ 20٪ في الشهر الأول",
  ctaDesc: "أدوات Upsell وCombo وعتبة الشحن جاهزة — فعّلها الآن.",
};

export default function IncreaseAOV() {
  return <UseCaseLayout data={data} />;
}
