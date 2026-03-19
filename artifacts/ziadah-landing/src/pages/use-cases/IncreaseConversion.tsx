import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import IncreaseConversionWidget from "../../components/widgets/IncreaseConversionWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "رفع معدل التحويل",
    subtitle: "معدل التحويل (CVR) هو النسبة المئوية من زوار متجرك الذين يُتمّون الشراء — رفعه يعني ربح أكثر بنفس عدد الزوار.",
    tagline: "كل 1٪ في CVR = آلاف ⃁ شهرياً",
    icon: "📈",
  },
  whatWeDoTitle: "لماذا معدل التحويل أكثر أهمية من عدد الزوار؟",
  whatWeDoDesc:
    "المتجر الذي لديه 1000 زائر بمعدل تحويل 3٪ يحقق 30 طلباً. رفع معدل التحويل لـ 5٪ يعني 50 طلباً — بنفس ميزانية الإعلانات. معدل التحويل في المتاجر الإلكترونية العربية يتراوح بين 1-3٪ في المتوسط. زيادة يرفعه عبر منظومة متكاملة: تجربة مخصصة تزيل الاحتكاك، عروض موجّهة تُقلّل التردد، دليل اجتماعي يبني الثقة، وحوافز ذكية في اللحظة المناسبة.",
  strategyTitle: "كيف يرفع زيادة معدل التحويل؟",
  strategies: [
    {
      icon: "🎯",
      title: "تجربة مخصصة = قرار أسرع",
      desc: "كل عميل يرى المنتجات الأنسب له فور وصوله. لا تشتت، لا بحث طويل — مسار مباشر من الوصول للشراء يقلل وقت الاتخاذ.",
      color: "#a855f7",
    },
    {
      icon: "⭐",
      title: "الدليل الاجتماعي الذكي",
      desc: "يعرض 'عملاء مشابهون لك اشتروا هذا' مع آراء وتقييمات حقيقية من منطقتك أو فئتك — يبني الثقة ويقلل الخوف من الشراء.",
      color: "#f59e0b",
    },
    {
      icon: "🏷️",
      title: "تحفيز الشراء الأول",
      desc: "للزوار الجدد الذين لم يشتروا بعد: يقدم كوبون خاص للطلب الأول أو عرضاً مؤقتاً يقنعهم بتجربة المتجر.",
      color: "#10b981",
    },
    {
      icon: "📱",
      title: "تحسين تجربة الموبايل",
      desc: "أكثر من 70٪ من تصفح المتاجر يأتي من الهاتف. زيادة يُحسّن ظهور التوصيات ويجعلها سهلة التفاعل على الشاشات الصغيرة.",
      color: "#06b6d4",
    },
  ],
  stats: [
    { value: "+25٪", label: "معدل التحويل الإجمالي", color: "#a855f7" },
    { value: "-40٪", label: "وقت اتخاذ قرار الشراء", color: "#06b6d4" },
    { value: "+32٪", label: "معدل تحويل الزوار الجدد", color: "#10b981" },
    { value: "+45٪", label: "معدل تحويل العملاء العائدين", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "حساب تأثير رفع CVR بـ 2٪",
    steps: [
      "متجر أزياء يستقبل 8,000 زائر شهرياً بمعدل تحويل 2٪ = 160 طلباً.",
      "بعد تفعيل زيادة: التخصيص وعروض الكوبون الأول ترفع CVR لـ 4٪.",
      "نفس 8,000 زائر → 320 طلباً بمتوسط 400 ⃁ = 128,000 ⃁.",
      "الإيراد السابق: 160 × 400 = 64,000 ⃁. الزيادة: 64,000 ⃁ شهرياً.",
    ],
    result: "مضاعفة الإيراد بدون إنفاق ⃁ واحد إضافي على الإعلانات — فقط بتحسين معدل التحويل.",
  },
  extraSections: (
    <>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يُحوّل زيادة الزائر إلى مشترٍ؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا يبدو ويدجت رفع التحويل كما يراه عميلك الجديد</p>
        <IncreaseConversionWidget />
      </div>
    </section>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24, textAlign: "center" }}>العوامل التي ترفع معدل التحويل</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "🎯", title: "التخصيص", desc: "كل عميل يرى محتوى مناسباً له يختصر رحلة الشراء", color: "#a855f7" },
              { icon: "🤝", title: "الثقة", desc: "آراء حقيقية وإثبات اجتماعي يزيل التردد", color: "#06b6d4" },
              { icon: "⚡", title: "الإلحاح", desc: "عروض محدودة الوقت وعدادات توقيت تحفّز الشراء الآن", color: "#f59e0b" },
              { icon: "💎", title: "القيمة الواضحة", desc: "إظهار التوفير والفوائد بشكل صريح بدون غموض", color: "#10b981" },
              { icon: "🔄", title: "البساطة", desc: "مسار شراء سلس بلا عقبات يقلل الاحتكاك", color: "#ec4899" },
              { icon: "📱", title: "التوافق مع الموبايل", desc: "تجربة سلسة على جميع الأجهزة والشاشات", color: "#4f46e5" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px 20px", background: "rgba(0,0,0,.25)", border: "1px solid var(--b1)", borderRadius: 14 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6, color: item.color }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "var(--td)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "ضاعف إيراداتك بنفس عدد الزوار",
  ctaDesc: "رفع CVR بنسبة صغيرة يساوي آلاف ⃁ شهرياً — فعّل زيادة الآن.",
  seo: {
    title: "رفع معدل التحويل (CVR) — زيادة",
    description: "حوّل زوار متجرك إلى مشترين بمعدلات أعلى مع زيادة. تخصيص ذكي يجعل قرار الشراء أسرع وأسهل لكل عميل.",
    canonical: "/use-cases/increase-conversion",
  },
};

export default function IncreaseConversion() {
  return <UseCaseLayout data={data} />;
}
