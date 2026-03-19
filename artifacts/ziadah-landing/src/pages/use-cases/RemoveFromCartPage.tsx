import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
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
      desc: "حين يضغط العميل 'حذف' يظهر له خصم فوري بنسبة ١٠ إلى ٢٠٪ لمدة محدودة (١٠ دقائق). الضغط الزمني يحوّل القرار من 'الحذف' إلى 'الشراء الآن'.",
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
      color: "#10b981",
    },
  ],
  stats: [
    { value: "-42٪", label: "حالات الحذف التي تنتهي ببيع بعد تدخل زيادة", color: "#ec4899" },
    { value: "٣١٪", label: "معدل قبول الخصم الاحتجازي لحظة الحذف", color: "#a855f7" },
    { value: "+24٪", label: "إيرادات محفوظة كانت ستُفقد بدون التدخل", color: "#10b981" },
    { value: "١٢ ث", label: "متوسط وقت اتخاذ القرار بعد ظهور عرض زيادة", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "عميل أراد حذف حذاء رياضي",
    steps: [
      "أضاف العميل حذاء رياضي بـ ٢٨٠ ⃁ لكنه تردد وضغط 'حذف'.",
      "رصد زيادة المحاولة فوراً وعرض: 'قبل أن تحذفه — خصم ١٥٪ خاص لك الآن: السعر ٢٣٨ ⃁ لمدة ٩ دقائق فقط'.",
      "ظهر العرض بتصميم واضح مع عداد تنازلي يُشعر العميل بالحاجة للقرار الفوري.",
      "العميل اختار الاستفادة من الخصم وأتمّ الشراء بدلاً من الحذف.",
    ],
    result: "بيع بـ ٢٣٨ ⃁ بدلاً من خسارة ٢٨٠ ⃁ كاملاً — المتجر احتفظ بالعميل وحقق إيراداً لم يكن ليحدث لولا التدخل الذكي.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يتدخل زيادة لحظة الحذف؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>محاكاة تفاعلية — شاهد نافذة الاحتجاز الذكية تظهر قبل اختفاء المنتج</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RemoveFromCartWidget />
        </div>
      </div>
    </section>
  ),
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "أوقف خسارة المبيعات قبل أن تحدث",
  ctaDesc: "كل محاولة حذف هي فرصة مخفية — زيادة يحوّلها إلى بيع ناجح.",
  seo: {
    title: "استعادة العميل عند الحذف من السلة — زيادة",
    description: "لا تدع العميل يحذف المنتج دون عرض بديل. زيادة يتدخل بذكاء بخصم مؤقت أو بديل أوفر يُبقي العميل في رحلة الشراء.",
    canonical: "/use-cases/remove-from-cart",
  },
};

export default function RemoveFromCartPage() {
  return <UseCaseLayout data={data} />;
}
