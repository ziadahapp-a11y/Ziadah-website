import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import BuyMoreSaveMoreWidget from "../../components/widgets/BuyMoreSaveMoreWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "اشترِ أكثر ووفّر أكثر",
    subtitle: "حفّز العميل على شراء كميات أكبر من نفس المنتج بعروض تدريجية واضحة — كلما زادت الكمية زاد التوفير.",
    tagline: "عميل يرى التوفير يشتري أكثر — دائماً",
    icon: "📦",
  },
  whatWeDoTitle: "ما هو عرض 'اشترِ أكثر ووفّر أكثر' وكيف يعمل في زيادة؟",
  whatWeDoDesc:
    "عروض الكميات (Buy More Save More / Volume Discounts) تُقدّم للعميل جدولاً تدريجياً: كل ما اشترى كميةً أكبر من نفس المنتج حصل على سعر أقل للوحدة. زيادة يبني هذه العروض تلقائياً ويعرضها بشكل بصري واضح — شريط تقدم أو جدول شرائح — يُظهر للعميل كم يوفر إذا أضاف وحدة إضافية. الذكاء الاصطناعي يحسب شرائح السعر المثلى بناءً على هامش كل منتج ومعدلات شراء المتجر.",
  strategyTitle: "أساليب عرض عروض الكميات في زيادة",
  strategies: [
    {
      icon: "📊",
      title: "جدول الشرائح التدريجي",
      desc: "يعرض جدولاً واضحاً: ١ قطعة = ٤٩ ꜁ | ٢ قطعة = ٤٤ ꜁ لكل قطعة | ٣+ = ٣٩ ꜁ لكل قطعة — العميل يرى الفرق مباشرة.",
      color: "#a855f7",
    },
    {
      icon: "🔋",
      title: "شريط التقدم نحو التوفير",
      desc: "يعرض شريطاً بصرياً يُظهر للعميل كم تبقى لتصل للشريحة التالية — 'أضف قطعة واحدة ووفّر ٣٠ ꜁ إضافية'.",
      color: "#06b6d4",
    },
    {
      icon: "🎯",
      title: "حساب التوفير الفعلي",
      desc: "بدلاً من عرض النسبة فقط، يُظهر زيادة المبلغ الفعلي الذي يوفره العميل عند اختيار كمية أكبر — أكثر إقناعاً وأوضح قيمة.",
      color: "#10b981",
    },
    {
      icon: "⏳",
      title: "عروض كميات محدودة الوقت",
      desc: "يُضيف زيادة عنصر الإلحاح بعروض كميات تنتهي خلال وقت محدد — يُسرّع قرار الشراء بكميات أكبر.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+٦١٪", label: "ارتفاع معدل الشراء بكميات كبيرة عند عرض الشرائح", color: "#a855f7" },
    { value: "+٤٥٪", label: "متوسط إيراد الطلب الواحد مع عروض الكميات", color: "#06b6d4" },
    { value: "+٣٤٪", label: "معدل تكرار الشراء لأن المخزون يستنفد بطيئاً", color: "#10b981" },
    { value: "٢.٨x", label: "متوسط الكمية المشتراة مقارنة بدون عرض الكميات", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات متنوعة",
    steps: [
      "☕ بن وقهوة: كيس قهوة ٢٥٠ غ = ٤٩ ꜁ / كيسين = ٨٩ ꜁ (توفير ٩ ꜁) / ٣ أكياس = ١١٩ ꜁ (توفير ٢٨ ꜁) — شريط يُظهر 'أضف كيساً واحداً أكثر لتوفير ٢٨ ꜁'.",
      "🧴 منظفات منزلية: منظف ليتر = ٢٢ ꜁ / ٣ عبوات = ١٩ ꜁ للعبوة / ٦ عبوات = ١٦ ꜁ للعبوة — جدول شرائح واضح بجانب المنتج.",
      "💊 مكملات غذائية: علبة بروتين = ١٤٩ ꜁ / علبتان = ١٣٩ ꜁ لكل علبة / ٣ علب = ١٢٥ ꜁ لكل علبة — مع توضيح 'كفاية ٣ أشهر بسعر أشهر إضافية'.",
      "🖊️ قرطاسية: قلم = ٨ ꜁ / عبوة ٦ أقلام = ٤٢ ꜁ (توفير ٦ ꜁) / علبة ١٢ قلم = ٧٢ ꜁ (توفير ٢٤ ꜁) — خيارات الكمية بأزرار واضحة.",
    ],
    result: "عرض شريط التقدم 'أضف قطعة واحدة ووفّر X ꜁' يرفع معدل اختيار الكميات الأكبر بنسبة ٤٢٪ مقارنة بجدول الشرائح الثابت — الرسالة الشخصية المباشرة تُحفّز أكثر.",
  },
  extraSections: (
    <>
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
            <div className="shine"/>
            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>أي المنتجات تستفيد أكثر من عروض الكميات؟</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { icon: "🔄", type: "المنتجات الاستهلاكية", examples: "تنظيف، عناية، طعام" },
                { icon: "📦", type: "المنتجات القابلة للتخزين", examples: "قهوة، مكملات، قرطاسية" },
                { icon: "🎁", type: "منتجات الهدايا والمواسم", examples: "شوكولاتة، شمع، عطور" },
                { icon: "🏭", type: "منتجات التجار والمحلات", examples: "مستلزمات، أدوات، مواد" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "20px 24px", background: "rgba(168,85,247,.05)", border: "1px solid rgba(168,85,247,.12)", borderRadius: 14 }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>{item.type}</div>
                  <div style={{ fontSize: 12, color: "var(--td)" }}>{item.examples}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
            مثال حي
          </div>
          <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>كيف يظهر للعميل داخل المتجر؟</h3>
          <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا تبدو واجهة ويدجت عروض الكميات كما يراها عميلك فعلياً</p>
          <BuyMoreSaveMoreWidget />
        </div>
      </section>
    </>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "فعّل عروض الكميات وحفّز الشراء الأكبر",
  ctaDesc: "كل وحدة إضافية تبيعها هي إيراد بلا تكلفة تسويق إضافية — دع زيادة يُدير العروض تلقائياً.",
};

export default function BuyMoreSaveMore() {
  return <UseCaseLayout data={data} />;
}
