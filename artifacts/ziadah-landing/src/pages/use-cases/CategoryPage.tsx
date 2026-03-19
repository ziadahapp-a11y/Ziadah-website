import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import CategoryPageWidget from "../../components/widgets/CategoryPageWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "صفحة التصنيف",
    subtitle: "العميل في مرحلة المقارنة والتصفح — فرصة ذهبية لتوجيهه نحو المنتجات الأعلى قيمة والأكثر ملاءمة لاهتماماته.",
    tagline: "توجيه ذكي قبل قرار الشراء",
    icon: "📁",
  },
  whatWeDoTitle: "كيف يعمل زيادة في صفحة التصنيف؟",
  whatWeDoDesc:
    "صفحة التصنيف هي لحظة البحث والمقارنة — العميل لم يقرر بعد أي منتج يريد. زيادة يستثمر هذه اللحظة بذكاء: يرتّب المنتجات بناءً على احتمالية الشراء لكل عميل، يبرز الكومبو والحزم الموفّرة بين بطاقات المنتجات، ويعرض شارات 'الأكثر مبيعاً' و'الأعلى تقييماً' على المنتجات التي تناسب ملفه الشخصي. بدلاً من تصفح عشوائي يصبح العميل في مسار مُوجَّه نحو الشراء.",
  strategyTitle: "استراتيجيات زيادة في صفحة التصنيف",
  strategies: [
    {
      icon: "🎯",
      title: "ترتيب ذكي مخصص",
      desc: "يعيد زيادة ترتيب بطاقات المنتجات بناءً على احتمالية شراء كل عميل — المنتجات الأنسب تظهر أولاً لكل زائر.",
      color: "#a855f7",
    },
    {
      icon: "🏷️",
      title: "شارات الثقة",
      desc: "يضع شارات 'الأكثر مبيعاً' و'اختيار محرر' و'ينتهي قريباً' على المنتجات المناسبة لدفع قرار الشراء.",
      color: "#f59e0b",
    },
    {
      icon: "🎁",
      title: "كومبو داخل الكاتالوج",
      desc: "يظهر بطاقات كومبو مدمجة بين المنتجات العادية تجمع منتجين أو أكثر بسعر أقل مما يفكر فيه العميل.",
      color: "#10b981",
    },
    {
      icon: "📊",
      title: "فلتر 'قد تعجبك'",
      desc: "يضيف قسماً مميزاً يجمع المنتجات التي تتطابق مع اهتمامات العميل المستنتجة من سلوكه السابق.",
      color: "#06b6d4",
    },
  ],
  stats: [
    { value: "+27٪", label: "معدل الانتقال من التصنيف للمنتج", color: "#a855f7" },
    { value: "+33٪", label: "معدل إضافة للسلة", color: "#10b981" },
    { value: "+21٪", label: "متوسط قيمة الطلب", color: "#06b6d4" },
    { value: "-24٪", label: "وقت اتخاذ قرار الشراء", color: "#ec4899" },
  ],
  exampleScenario: {
    title: "عميل يتصفح تصنيف 'أجهزة الصوت'",
    steps: [
      "يفتح العميل تصنيف أجهزة الصوت ويرى 40 منتجاً.",
      "زيادة يعرف من تاريخه أنه مهتم بالجودة وعنده ميزانية متوسطة (سبق أن اشترى منتجات بين 300-600 ⃁).",
      "يُعيد ترتيب المنتجات: السماعات في نطاق ميزانيته تظهر أولاً، مع شارة 'الأكثر مبيعاً هذا الأسبوع' على أحدها.",
      "يظهر بطاقة كومبو: 'سماعة + حامل + كابل شحن بخصم 15٪'.",
    ],
    result: "العميل وجد ما يريده في أقل من دقيقتين وأضاف الكومبو للسلة مباشرة.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف تظهر صفحة التصنيف المُخصَّصة؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا يرى عميلك صفحة التصنيف بعد تخصيصها بالذكاء الاصطناعي</p>
        <CategoryPageWidget />
      </div>
    </section>
  ),
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "حوّل تصفح التصنيف إلى قرار شراء",
  ctaDesc: "توجيه ذكي في اللحظة المناسبة = عميل يشتري بدلاً من أن يغادر.",
};

export default function CategoryPage() {
  return <UseCaseLayout data={data} />;
}
