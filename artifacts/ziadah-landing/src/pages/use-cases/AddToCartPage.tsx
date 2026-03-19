import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
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
      color: "#10b981",
    },
    {
      icon: "📊",
      title: "تخصيص بالذكاء الاصطناعي",
      desc: "زيادة يحلل سلوك العميل وتاريخه وقيمة السلة الحالية ليختار الاقتراح الأنسب — ليس مجرد منتج عشوائي مرتبط.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+35٪", label: "متوسط قيمة الطلب عند تطبيق التوصية الفورية", color: "#a855f7" },
    { value: "٣٨٪", label: "معدل قبول التوصية لحظة الإضافة", color: "#06b6d4" },
    { value: "+27٪", label: "إيرادات إضافية من كل جلسة تسوق", color: "#10b981" },
    { value: "x2.4", label: "أسرع قرار شراء مقارنة بالتوصية في الصفحة الرئيسية", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "عميلة أضافت فاونديشن لسلتها",
    steps: [
      "العميلة اختارت فاونديشن بـ ١١٠ ⃁ وضغطت 'أضف للسلة'.",
      "رصد زيادة اللحظة وعرض فوراً: 'عميلات اشترين هذا الفاونديشن اشترين أيضاً برايمر التثبيت بـ ٥٥ ⃁'.",
      "ظهر العرض بتصميم Glassmorphism أنيق لا يقاطع التجربة — زر واحد 'أضف للسلة'.",
      "العميلة أضافت البرايمر بنقرة واحدة لأنه منطقي ومكمّل لما اشترته.",
    ],
    result: "قيمة الطلب ارتفعت من ١١٠ إلى ١٦٥ ⃁ بقرار شراء لم تخطط له العميلة — لكنها سعيدة به.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف تبدو التوصية لحظة الإضافة؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>محاكاة تفاعلية — شاهد ردة فعل زيادة بمجرد ضغط العميل على الإضافة</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AddToCartWidget />
        </div>
      </div>
    </section>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "حوّل كل إضافة للسلة إلى فرصة بيع إضافية",
  ctaDesc: "زيادة يتدخل في اللحظة المثلى ليرفع قيمة كل طلب تلقائياً.",
  seo: {
    title: "التوصية عند إضافة للسلة — زيادة",
    description: "حوّل لحظة إضافة المنتج للسلة إلى فرصة بيع إضافية ذكية مع زيادة. عروض مخصصة في أعلى لحظات نية الشراء ترفع AOV فوراً.",
    canonical: "/use-cases/add-to-cart",
  },
};

export default function AddToCartPage() {
  return <UseCaseLayout data={data} />;
}
