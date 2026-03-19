import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import RelatedProductsWidget from "../../components/widgets/RelatedProductsWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "منتجات ذات صلة",
    subtitle: "اعرض لكل عميل المنتجات الأقرب لاهتمامه — زر الإضافة جاهز مع كل اقتراح، من النقر إلى السلة بثانيتين.",
    tagline: "عميل يرى ما يريد يشتري بلا تفكير",
    icon: "🔎",
  },
  whatWeDoTitle: "ما هي طريقة عرض 'منتجات ذات صلة' وكيف تعمل في زيادة؟",
  whatWeDoDesc:
    "طريقة العرض هذه تُبرز للعميل قائمة منتجات مُختارة ذكياً بجانب أو أسفل المنتج الذي يشاهده، وكل بطاقة مزودة بزر 'أضف إلى السلة' مباشرةً — دون الحاجة لفتح صفحة المنتج. الذكاء الاصطناعي في زيادة يختار ما يُعرض بناءً على: تاريخ تصفح العميل، سجل مشترياته، والمنتجات التي تُشترى معاً بكثرة عبر آلاف الطلبات الفعلية في نفس المتجر. النتيجة: اقتراح في السياق الصحيح بلا إزعاج، وزر إضافة لا يتطلب خطوات إضافية.",
  strategyTitle: "آليات العرض في 'منتجات ذات صلة' بزيادة",
  strategies: [
    {
      icon: "🤖",
      title: "توصيات مخصصة لكل عميل",
      desc: "بناءً على ملف العميل ومشترياته السابقة وتصفحه الحالي، يختار زيادة المنتجات التي تناسبه هو تحديداً — لا قائمة عامة للجميع.",
      color: "#a855f7",
    },
    {
      icon: "🛒",
      title: "زر الإضافة المباشر",
      desc: "كل بطاقة منتج مزودة بزر 'أضف إلى السلة' يعمل فورياً دون مغادرة الصفحة الحالية — يقلل الاحتكاك ويرفع معدل التحويل.",
      color: "#06b6d4",
    },
    {
      icon: "📊",
      title: "ترتيب ذكي بالأولوية",
      desc: "المنتجات لا تظهر عشوائياً — يرتبها زيادة حسب احتمالية الشراء لهذا العميل، فيظهر الأعلى ربحاً والأكثر صلة أولاً.",
      color: "#10b981",
    },
    {
      icon: "🔄",
      title: "تحديث ديناميكي",
      desc: "تتحدث القائمة المعروضة في الوقت الفعلي مع تغيّر سلوك العميل أو عند إضافته منتجاً للسلة — لا تكرار ولا قائمة ثابتة.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+٣٨٪", label: "زيادة في معدل إضافة المنتجات للسلة", color: "#a855f7" },
    { value: "+٢٦٪", label: "متوسط عدد المنتجات في الطلب الواحد", color: "#06b6d4" },
    { value: "٤٢٪", label: "من العملاء يتفاعلون مع قائمة الصلة", color: "#10b981" },
    { value: "٣ ثوانٍ", label: "متوسط وقت الإضافة من عرض الاقتراح", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات مختلفة",
    steps: [
      "🍔 مطعم: عميل يشاهد طبق برغر → تظهر له منتجات ذات صلة: بطاطس، مشروب، صلصة إضافية — كل واحدة بزر إضافة مستقل.",
      "💄 تجميل: عميلة تشاهد كريم ترطيب → تظهر لها: غسول منسجم + سيروم مكمل + كريم عيون — بزر أضف لكل منتج.",
      "💻 إلكترونيات: عميل يشاهد سماعة → يرى: كيس حمل + وصلة بلوتوث + بطارية محمولة — بزر إضافة سريع.",
      "👟 أزياء: عميل يشاهد حذاء رياضي → تُعرض له: جوارب مناسبة + كيس رياضي + ربطات بديل — يضيف ما يشاء فورياً.",
    ],
    result: "متوسط قبول اقتراح 'منتجات ذات صلة' يبلغ ٣٨٪ عند استخدام زر الإضافة المباشر مقابل ١٦٪ عند الاكتفاء بالرابط — الفارق في التصميم يصنع الفارق في الإيراد.",
  },
  extraSections: (
    <>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يظهر للعميل داخل المتجر؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا تبدو واجهة ويدجت المنتجات ذات الصلة كما يراها عميلك فعلياً</p>
        <RelatedProductsWidget />
      </div>
    </section>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>أين تظهر 'منتجات ذات صلة'؟</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { place: "📄 صفحة المنتج", note: "أسفل الوصف أو في الشريط الجانبي" },
              { place: "🛒 صفحة السلة", note: "قبل الدفع لزيادة قيمة الطلب" },
              { place: "🏠 الصفحة الرئيسية", note: "بناءً على آخر تصفح للعميل" },
              { place: "🏷️ صفحة التصنيف", note: "بين المنتجات أو في الشريط الجانبي" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px 24px", background: "rgba(124,58,237,.05)", border: "1px solid rgba(124,58,237,.15)", borderRadius: 14, textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{item.place}</div>
                <div style={{ fontSize: 13, color: "var(--tm)" }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "فعّل عرض المنتجات ذات الصلة اليوم",
  ctaDesc: "كل زيارة فرصة — دع زيادة يقترح المنتج المناسب بزر الإضافة المباشر.",
};

export default function RelatedProducts() {
  return <UseCaseLayout data={data} />;
}
