import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "تقليل التخلي عن السلة",
    subtitle: "٧٠٪ من العملاء يضعون منتجات في سلتهم ولا يكملون الشراء — زيادة يحوّل هؤلاء 'المترددين' إلى مشترين فعليين.",
    tagline: "٧ من كل ١٠ عملاء يمكن إنقاذهم",
    icon: "🛡️",
  },
  whatWeDoTitle: "لماذا التخلي عن السلة مشكلة كبيرة؟",
  whatWeDoDesc:
    "متوسط معدل التخلي عن السلة في التجارة الإلكترونية يبلغ ٦٩-٧٠٪ عالمياً — وفي السوق السعودي يصل أحياناً لـ ٧٥٪. هذا يعني أن ٣ من كل ٤ عملاء أبدوا نية شراء لكنهم لم يُتمّوا. الأسباب متعددة: التردد، غياب حافز للإتمام، عتبة الشحن، أو مجرد انشغال. زيادة يعالج كل هذه الأسباب بأدوات محددة: كوبون مؤقت، تذكير بما في السلة، مؤشر الشحن المجاني، وعرض Exit Intent في آخر لحظة.",
  strategyTitle: "استراتيجيات زيادة لمنع التخلي عن السلة",
  strategies: [
    {
      icon: "🏷️",
      title: "كوبون الإنقاذ المؤقت",
      desc: "بعد X دقيقة في السلة بدون تقدم، يظهر كوبون خصم ٥-١٥٪ لمدة ١٥ دقيقة. الإلحاح الحقيقي يدفع ثلث المترددين للإتمام.",
      color: "#ec4899",
    },
    {
      icon: "🚚",
      title: "مؤشر الشحن المجاني",
      desc: "شريط ملوّن يُظهر للعميل كم تبقّى للوصول لعتبة الشحن المجاني — حافز بصري يدفعه لإضافة منتج بدلاً من المغادرة.",
      color: "#06b6d4",
    },
    {
      icon: "🚪",
      title: "Exit Intent — العرض الأخير",
      desc: "عند محاولة مغادرة المتجر (حركة الماوس نحو إغلاق التبويب) يظهر Popup بعرض خاص فوري. الفرصة الأخيرة قبل الخسارة.",
      color: "#a855f7",
    },
    {
      icon: "⏱️",
      title: "عداد الوقت للعروض",
      desc: "يضع مؤقتاً على السلة للمنتجات المحدودة أو العروض المؤقتة — 'هذا العرض ينتهي خلال ٢٢ دقيقة' يخلق إلحاحاً حقيقياً.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "-٣٨٪", label: "معدل التخلي عن السلة", color: "#ec4899" },
    { value: "+٣١٪", label: "العملاء المسترجعون شهرياً", color: "#10b981" },
    { value: "+١٨٪", label: "معدل إتمام عملية الشراء", color: "#a855f7" },
    { value: "+٢٤٪", label: "إيرادات الشهر الأول", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "كيف يُنقذ زيادة العميل المتردد",
    steps: [
      "عميلة أضافت فستاناً بـ ٣٨٠ ريال للسلة وجلست ٤ دقائق دون تقدم.",
      "زيادة يكتشف أن وقت التردد تجاوز الحد — يُشغّل بروتوكول الإنقاذ.",
      "يظهر بنر خفيف: 'متجر حصري لك: خصم ١٠٪ لمدة ١٢ دقيقة فقط'.",
      "العميلة لم تغادر — شريط الشحن يقول 'أضف ٢٠ ريال للشحن المجاني' فأضافت إكسسواراً صغيراً.",
    ],
    result: "أتمّت الشراء بقيمة ٤٤٠ ريال بدلاً من التخلي عن ٣٨٠ ريال — استرداد قيمة الطلب وزيادته في نفس الوقت.",
  },
  extraSections: (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24, textAlign: "center" }}>أسباب التخلي — وحل زيادة لكل سبب</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { cause: "التردد وعدم الحسم", solution: "كوبون مؤقت يخلق سبباً للشراء الآن", causeColor: "#e11d48", solutionColor: "#10b981" },
              { cause: "تكلفة الشحن مرتفعة", solution: "مؤشر الشحن المجاني + اقتراح منتج صغير للوصول للعتبة", causeColor: "#e11d48", solutionColor: "#10b981" },
              { cause: "العميل أُشتُّت انتباهه", solution: "Exit Intent يسترجعه في اللحظة الأخيرة", causeColor: "#e11d48", solutionColor: "#10b981" },
              { cause: "السلة مكلفة أكثر من المتوقع", solution: "كوبون خصم يجعل السعر في نطاق توقعاته", causeColor: "#e11d48", solutionColor: "#10b981" },
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
                <div style={{ padding: "12px 16px", background: "rgba(225,29,72,.06)", border: "1px solid rgba(225,29,72,.15)", borderRadius: 12, fontSize: 13, color: "var(--tm)" }}>
                  ✗ {row.cause}
                </div>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(124,58,237,.15)", border: "1px solid rgba(124,58,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>→</div>
                <div style={{ padding: "12px 16px", background: "rgba(16,185,129,.06)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 12, fontSize: 13, color: "var(--tm)" }}>
                  ✓ {row.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "وقّف النزيف وحوّل المترددين إلى مشترين",
  ctaDesc: "أدوات منع التخلي جاهزة في زيادة — فعّلها بضغطة زر.",
};

export default function ReduceAbandon() {
  return <UseCaseLayout data={data} />;
}
