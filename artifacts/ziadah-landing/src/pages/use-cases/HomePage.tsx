import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import HomePageWidget from "../../components/widgets/HomePageWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "الصفحة الرئيسية",
    subtitle: "أول ما يراه العميل في متجرك — انطباع أول ذكي يُرحّب بكل زائر بتجربة مخصصة بناءً على تاريخه وسلوكه.",
    tagline: "كل عميل يرى متجراً مختلفاً مصمماً له شخصياً",
    icon: "🏠",
  },
  whatWeDoTitle: "كيف يعمل زيادة في الصفحة الرئيسية؟",
  whatWeDoDesc:
    "الصفحة الرئيسية في معظم المتاجر عبارة عن نفس العرض للجميع. زيادة يغيّر هذا تماماً: للعميل العائد يعرض ما تركه في آخر زيارة والمنتجات المرتبطة بمشترياته. للزائر الجديد يعرض أبرز المنتجات وأعلاها تقييماً. للعميل المتكرر يعرض عروض الولاء والكومبو الموفّر. كل زيارة للصفحة الرئيسية أصبحت تجربة مخصصة تزيد التفاعل وتختصر طريق الشراء.",
  strategyTitle: "استراتيجيات زيادة في الصفحة الرئيسية",
  strategies: [
    {
      icon: "🔄",
      title: "استكمل ما تركته",
      desc: "للعميل العائد يعرض المنتجات التي تصفّحها في آخر زيارة مع رسالة 'ما زلت مهتماً؟' تختصر عليه وقت البحث.",
      color: "#a855f7",
    },
    {
      icon: "⭐",
      title: "الأعلى تقييماً في فئتك",
      desc: "يعرض المنتجات الأكثر مبيعاً وتقييماً في الفئات التي أبدى العميل اهتماماً بها — تجربة تشعر العميل الجديد بالثقة.",
      color: "#f59e0b",
    },
    {
      icon: "🎁",
      title: "حزم Combo موفّرة",
      desc: "يعرض حزماً مدروسة من المنتجات المكمّلة بسعر إجمالي منخفض. مثالية للعملاء الذين لم يقرروا بعد ماذا يريدون.",
      color: "#10b981",
    },
    {
      icon: "🕐",
      title: "عروض محدودة الوقت",
      desc: "يضع عدادات عكسية وعروضاً مؤقتة في أعلى الصفحة بناءً على عادات الشراء — يخلق إلحاحاً حقيقياً وليس مصطنعاً.",
      color: "#06b6d4",
    },
  ],
  stats: [
    { value: "+34٪", label: "وقت التصفح في الموقع", color: "#a855f7" },
    { value: "+29٪", label: "معدل الانتقال للمنتجات", color: "#06b6d4" },
    { value: "+22٪", label: "معدل التحويل للعملاء العائدين", color: "#10b981" },
    { value: "-18٪", label: "معدل الارتداد من الصفحة الرئيسية", color: "#ec4899" },
  ],
  exampleScenario: {
    title: "عميل يعود لمتجر ملابس رياضية",
    steps: [
      "زار العميل المتجر قبل أسبوع وتصفّح أحذية الجري لكن لم يشترِ.",
      "في عودته اليوم تستقبله الصفحة الرئيسية بقسم مخصص: 'أحذية الجري الأكثر مبيعاً هذا الأسبوع'.",
      "يظهر تحته كومبو: 'حذاء جري + جوارب رياضية + حزام مائي' بخصم 18٪.",
      "في الزاوية العلوية: 'عرض ينتهي خلال 3 ساعات' على الحذاء الذي تصفّحه سابقاً.",
    ],
    result: "العميل انتقل مباشرة للمنتج وأتم الشراء مع الكومبو — وقت الشراء انخفض من 12 دقيقة إلى 3 دقائق.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف تظهر الصفحة الرئيسية المُخصَّصة؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا يستقبل عميلك العائد الصفحة الرئيسية المُصمَّمة خصيصاً له</p>
        <HomePageWidget />
      </div>
    </section>
  ),
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "اجعل كل زائر يشعر أن المتجر بُني له",
  ctaDesc: "تجربة مخصصة من اللحظة الأولى = عميل يشتري ويعود.",
};

export default function HomePage() {
  return <UseCaseLayout data={data} />;
}
