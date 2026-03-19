import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import ProductSwapWidget from "../../components/widgets/ProductSwapWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأنشطة",
    title: "البيع البديل",
    subtitle: "عرض نسخة أفضل وأعلى قيمة من المنتج — زيادة يقنع العميل بالترقية حين يرى الفارق الحقيقي في القيمة لا مجرد السعر.",
    tagline: "ليس كل عميل يعرف أن هناك ما هو أفضل",
    icon: "⬆️",
  },
  whatWeDoTitle: "ما هو البيع البديل وكيف ينفّذه زيادة؟",
  whatWeDoDesc:
    "البيع البديل (Upsell) هو إقناع العميل بالتحوّل من المنتج الذي ينظر إليه إلى نسخة أعلى جودة أو موديل أحدث — لكن بطريقة ذكية تُظهر القيمة لا مجرد الفارق في السعر. زيادة يحسب أولاً هل هذا العميل مرشّح للترقية (بناءً على مشترياته السابقة وميزانيته المعتادة)، ثم يعرض عليه البديل مع إبراز الفروقات الملموسة التي تبرر الفارق في التكلفة. النتيجة: عميل يشعر أنه وجد صفقة أفضل، ومتجر يربح 20-45٪ أكثر من كل طلب.",
  strategyTitle: "أساليب البيع البديل في زيادة",
  strategies: [
    {
      icon: "🏆",
      title: "الفئة الأعلى — القيمة الأوضح",
      desc: "يعرض النسخة المتميزة مع جدول مقارنة واضح يُبرز الفروقات الحقيقية. العميل يرى لماذا يستحق الفارق في السعر.",
      color: "#a855f7",
    },
    {
      icon: "📦",
      title: "الحجم الأكبر — التكلفة أقل",
      desc: "للمنتجات الاستهلاكية يعرض الحجم الأكبر مع حساب التكلفة لكل وحدة. العميل يدرك أن الأكبر أوفر — فيختاره.",
      color: "#06b6d4",
    },
    {
      icon: "⭐",
      title: "الإصدار المتميز (Premium)",
      desc: "يعرض الإصدار Premium أو البريميوم مع تأكيد المزايا الإضافية بشكل جذاب — يناسب العملاء الذين يقدّرون الجودة.",
      color: "#10b981",
    },
    {
      icon: "🔄",
      title: "الموديل الأحدث",
      desc: "للإلكترونيات والتقنية، يقارن بين الموديل الذي يشاهده العميل والأحدث — مع إبراز المزايا الجديدة بأسلوب واضح.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+41٪", label: "متوسط قيمة الطلب", color: "#a855f7" },
    { value:"+28٪", label: "معدل قبول اقتراح الترقية", color: "#06b6d4" },
    { value: "+35٪", label: "رضا العملاء على المدى البعيد", color: "#10b981" },
    { value: "+22٪", label: "معدل تكرار الشراء", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية حقيقية عبر قطاعات",
    steps: [
      "🎧 إلكترونيات: عميل ينظر لسماعة بـ 120 ريال → يرى عرض 'سماعة بـ 190 ريال — عزل صوت فعّال + 20 ساعة بطارية + ضمان سنتان' مع مقارنة مباشرة.",
      "💐 عطور: عميلة تنظر لعطر 30 مل → تجد 'النسخة 100 مل بـ 310 ريال (توفر 35٪ في سعر الـ مل)'.",
      "🌿 عناية: عميل اختار كريم أساسي → يظهر كريم بريميوم بنفس الوزن وبـ 30 ريال إضافية مع قائمة مكونات نشطة أكثر.",
      "📚 كورسات: مشترك في باقة أساسية → يرى ترقية للباقة المتقدمة بفارق 80 ريال مع 3 كورسات إضافية وشهادة.",
    ],
    result: "معدل قبول عرض الترقية يتراوح بين 22 و35٪ عند تقديمه بالطريقة الصحيحة مع إبراز القيمة — وكل قبول يرفع الإيراد مباشرة.",
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
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا تبدو واجهة ويدجت الاستبدال كما يراها عميلك فعلياً</p>
        <ProductSwapWidget />
      </div>
    </section>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>متى يعمل Upsell ومتى لا يعمل؟</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ padding: "24px 28px", background: "rgba(16,185,129,.05)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#10b981", marginBottom: 12 }}>✅ يعمل بشكل ممتاز عندما</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["الفارق في السعر 20-50٪ وليس أكثر", "الفوائد الإضافية واضحة وملموسة", "العميل له تاريخ شراء في الفئة المتميزة", "يُعرض قبل إضافة المنتج للسلة"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "flex-start" }}>
                    <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(225,29,72,.05)", border: "1px solid rgba(225,29,72,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#e11d48", marginBottom: 12 }}>⚠️ لا يعمل بشكل جيد عندما</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["الفارق أكبر من 50٪ بدون مبرر واضح", "النسخة المُقترحة في فئة مختلفة كلياً", "العميل في مرحلة متقدمة من عملية الدفع", "يُعرض بشكل مكثف أكثر من مرة"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "flex-start" }}>
                    <span style={{ color: "#e11d48", fontWeight: 700, flexShrink: 0 }}>✗</span> {item}
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
  ctaTitle: "ارفع قيمة كل طلب بالترقية الذكية",
  ctaDesc: "عميل واحد يختار النسخة الأفضل يساوي طلبين — فعّل Upsell مع زيادة اليوم.",
};

export default function Upsell() {
  return <UseCaseLayout data={data} />;
}
