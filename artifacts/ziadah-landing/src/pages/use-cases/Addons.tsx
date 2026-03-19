import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import AddonsWidget from "../../components/widgets/AddonsWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "الإضافات (Add-ons)",
    subtitle: "اعرض للعميل إضافات وظيفية تُكمّل منتجه الأساسي — بطريقة اختبار متعدد تُعظّم قبول الاقتراح وترفع قيمة الطلب.",
    tagline: "الإضافة الصغيرة تصنع الفارق الكبير في الإيراد",
    icon: "➕",
  },
  whatWeDoTitle: "ما هو عرض Add-ons وكيف ينفّذه زيادة؟",
  whatWeDoDesc:
    "عرض Add-ons يُقدّم للعميل قائمة منتجات إضافية تُكمّل المنتج الذي يشتريه وظيفياً أو تحسّن تجربة استخدامه — لا بديل ولا منافس، بل مكمّل. ما يميّز تطبيق زيادة هو اعتماد منطق 'الاختبار المتعدد' (Multi-select): بدلاً من اقتراح إضافة واحدة، يُعرض تشكيلة قابلة للتحديد مع سعر إجمالي يتحدث فورياً مع كل اختيار. الذكاء الاصطناعي يختار ما يُعرض بناءً على بيانات المتجر الفعلية ويُخصّص القائمة لكل عميل.",
  strategyTitle: "أساليب عرض Add-ons في زيادة",
  strategies: [
    {
      icon: "☑️",
      title: "الاختبار المتعدد (Multi-select)",
      desc: "يُعرض للعميل قائمة إضافات بصناديق اختيار — يحدد ما يريد ويرى السعر الإجمالي يتحدث فورياً. يُحسّن معدل قبول الإضافات بشكل ملحوظ.",
      color: "#a855f7",
    },
    {
      icon: "🎯",
      title: "اقتراح مخصص لكل منتج",
      desc: "كل منتج له قائمة إضافات مُعدّة خصيصاً له — لا قوائم عامة. زيادة يتعلم من بيانات الطلبات أي الإضافات تُقبل أكثر مع هذا المنتج تحديداً.",
      color: "#06b6d4",
    },
    {
      icon: "💰",
      title: "إبراز قيمة الإضافة",
      desc: "لكل إضافة يُعرض سعرها بوضوح مع رسالة قيمة مختصرة — 'احمِ هاتفك' أو 'أكمل طقمك' — تجعل الاختيار منطقياً وسهلاً.",
      color: "#10b981",
    },
    {
      icon: "📍",
      title: "عرض في اللحظة المناسبة",
      desc: "تظهر قائمة Add-ons عند إضافة المنتج للسلة أو في صفحة المنتج — في اللحظة التي يكون فيها العميل في ذهنية الشراء.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+٤٤٪", label: "معدل قبول قائمة الإضافات", color: "#a855f7" },
    { value: "+٣١٪", label: "متوسط قيمة الطلب مع إضافة واحدة على الأقل", color: "#06b6d4" },
    { value: "٢.٣", label: "متوسط عدد الإضافات المختارة في كل طلب", color: "#10b981" },
    { value: "+٢٢٪", label: "تكرار الشراء من العملاء الذين اختاروا إضافات", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة من قطاعات متنوعة",
    steps: [
      "📱 إلكترونيات: عميل يضيف هاتف للسلة → تظهر قائمة: [✓] غلاف حماية +٣٩ ⃁، [✓] واقي شاشة +١٥ ⃁، [ ] سماعة لاسلكية +٨٩ ⃁ — يختار ويرى الإجمالي يتحدث.",
      "🌿 عناية: عميلة تشتري شامبو → تُعرض إضافات: [✓] بلسم مكمل +٢٨ ⃁، [ ] ماسك أسبوعي +٤٥ ⃁، [✓] سيروم تقوية +٦٢ ⃁.",
      "🎮 ألعاب: عميل يشتري جهاز تحكم → يرى: [✓] حقيبة حمل +٣٥ ⃁، [✓] بطاريات شحن +٢٩ ⃁، [ ] غطاء زلق مانع +١٩ ⃁.",
      "🍕 مطعم: عميل يطلب بيتزا → يختار من: [✓] صوص إضافي +٦ ⃁، [✓] حافة جبن +١٢ ⃁، [ ] مشروب +١٥ ⃁.",
    ],
    result: "الاختبار المتعدد يرفع متوسط عدد الإضافات المختارة من ٠.٧ إضافة (اقتراح واحد فقط) إلى ٢.٣ إضافة — ثلاثة أضعاف المبيعات الإضافية بنفس الجهد.",
  },
  extraSections: (
    <>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          مثال حي
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يظهر للعميل داخل المتجر؟</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا تبدو واجهة ويدجت الإضافات كما يراها عميلك فعلياً</p>
        <AddonsWidget />
      </div>
    </section>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>لماذا Multi-select أفضل من اقتراح إضافة واحدة؟</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ padding: "24px 28px", background: "rgba(168,85,247,.05)", border: "1px solid rgba(168,85,247,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7", marginBottom: 12 }}>☑️ Multi-select (زيادة)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["العميل يشعر بالتحكم الكامل", "يختار ما يناسب ميزانيته وحاجته", "السعر الإجمالي يتحدث فورياً", "معدل قبول يصل لـ ٤٤٪"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                    <span style={{ color: "#a855f7", fontWeight: 700 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(107,114,128,.05)", border: "1px solid rgba(107,114,128,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--td)", marginBottom: 12 }}>➡️ اقتراح مفرد (التقليدي)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["قرار ثنائي: نعم أو لا", "إضافة واحدة فقط تُعرض في المرة", "لا مرونة في الاختيار", "معدل قبول يتراوح ١٢-١٨٪"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                    <span style={{ color: "var(--td)", fontWeight: 700 }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "فعّل عرض الإضافات الذكي في متجرك",
  ctaDesc: "الإضافة الصغيرة تراكمية — كل طلب مع إضافتين يرفع إيراداتك الشهرية بشكل ملموس.",
  seo: {
    title: "الإضافات (Add-ons) — زيادة لمتجرك",
    description: "استخدم زيادة لعرض إضافات وظيفية تُكمّل منتج العميل الأساسي بأسلوب اختبار متعدد يرفع قيمة الطلب ويزيد الإيرادات.",
    canonical: "/use-cases/addons",
  },
};

export default function Addons() {
  return <UseCaseLayout data={data} />;
}
