import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import ReduceAbandonWidget from "../../components/widgets/ReduceAbandonWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "تقليل التخلي عن السلة",
    subtitle: "70٪ من العملاء يضعون منتجات في سلتهم ولا يكملون الشراء — زيادة يحوّل هؤلاء 'المترددين' إلى مشترين فعليين.",
    tagline: "7 من كل 10 عملاء يمكن إنقاذهم",
    icon: "🛡️",
  },
  whatWeDoTitle: "لماذا التخلي عن السلة مشكلة كبيرة؟",
  whatWeDoDesc:
    "متوسط معدل التخلي عن السلة في التجارة الإلكترونية يبلغ 69-70٪ عالمياً — وفي السوق السعودي يصل أحياناً لـ 75٪. هذا يعني أن 3 من كل 4 عملاء أبدوا نية شراء لكنهم لم يُتمّوا. الأسباب متعددة: التردد، غياب حافز للإتمام، عتبة الشحن، أو مجرد انشغال. زيادة يعالج كل هذه الأسباب بأدوات محددة: كوبون مؤقت، تذكير بما في السلة، مؤشر الشحن المجاني، وعرض Exit Intent في آخر لحظة.",
  strategyTitle: "استراتيجيات زيادة لمنع التخلي عن السلة",
  strategies: [
    {
      icon: "🏷️",
      title: "كوبون الإنقاذ المؤقت",
      desc: "بعد X دقيقة في السلة بدون تقدم، يظهر كوبون خصم 5-15٪ لمدة 15 دقيقة. الإلحاح الحقيقي يدفع ثلث المترددين للإتمام.",
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
      desc: "يضع مؤقتاً على السلة للمنتجات المحدودة أو العروض المؤقتة — 'هذا العرض ينتهي خلال 22 دقيقة' يخلق إلحاحاً حقيقياً.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "-38٪", label: "معدل التخلي عن السلة", color: "#ec4899" },
    { value: "+31٪", label: "العملاء المسترجعون شهرياً", color: "#10b981" },
    { value: "+18٪", label: "معدل إتمام عملية الشراء", color: "#a855f7" },
    { value: "+24٪", label: "إيرادات الشهر الأول", color: "#06b6d4" },
  ],
  exampleScenario: {
    title: "كيف يُنقذ زيادة العميل المتردد",
    steps: [
      "عميلة أضافت فستاناً بـ 380 ⃁ للسلة وجلست 4 دقائق دون تقدم.",
      "زيادة يكتشف أن وقت التردد تجاوز الحد — يُشغّل بروتوكول الإنقاذ.",
      "يظهر بنر خفيف: 'متجر حصري لك: خصم 10٪ لمدة 12 دقيقة فقط'.",
      "العميلة لم تغادر — شريط الشحن يقول 'أضف 20 ⃁ للشحن المجاني' فأضافت إكسسواراً صغيراً.",
    ],
    result: "أتمّت الشراء بقيمة 440 ⃁ بدلاً من التخلي عن 380 ⃁ — استرداد قيمة الطلب وزيادته في نفس الوقت.",
  },
  extraSections: (isAr) => (
    <>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          {isAr ? "مثال حي" : "Live Example"}
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>{isAr ? "كيف تظهر رسالة الإنقاذ للعميل؟" : "How does the rescue message appear to the customer?"}</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>{isAr ? "هكذا يبدو اقتراح منع التخلي كما يراه عميلك فعلياً" : "See the abandonment prevention prompt exactly as your customer would"}</p>
        <ReduceAbandonWidget />
      </div>
    </section>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24, textAlign: "center" }}>{isAr ? "أسباب التخلي — وحل زيادة لكل سبب" : "Abandonment reasons — and Ziadah's solution for each"}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(isAr ? [
              { cause: "التردد وعدم الحسم", solution: "كوبون مؤقت يخلق سبباً للشراء الآن" },
              { cause: "تكلفة الشحن مرتفعة", solution: "مؤشر الشحن المجاني + اقتراح منتج صغير للوصول للعتبة" },
              { cause: "العميل أُشتُّت انتباهه", solution: "Exit Intent يسترجعه في اللحظة الأخيرة" },
              { cause: "السلة مكلفة أكثر من المتوقع", solution: "كوبون خصم يجعل السعر في نطاق توقعاته" },
            ] : [
              { cause: "Hesitation and indecision", solution: "Timed coupon creates a reason to buy now" },
              { cause: "High shipping cost", solution: "Free shipping indicator + small product suggestion to reach threshold" },
              { cause: "Customer got distracted", solution: "Exit Intent recovers them at the last moment" },
              { cause: "Cart more expensive than expected", solution: "Discount coupon brings price within expectations" },
            ]).map((row, i) => (
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
    </>
  ),
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "وقّف النزيف وحوّل المترددين إلى مشترين",
  ctaDesc: "أدوات منع التخلي جاهزة في زيادة — فعّلها بضغطة زر.",
  heroEn: {
    tag: "By Goals",
    title: "Reduce Cart Abandonment",
    subtitle: "70% of customers add products to their cart but don't complete the purchase — Ziadah converts these 'hesitators' into actual buyers.",
    tagline: "7 out of 10 customers can be saved",
    icon: "🛡️",
  },
  whatWeDoTitleEn: "Why is cart abandonment a major problem?",
  whatWeDoDescEn:
    "The average cart abandonment rate in e-commerce is 69-70% globally — and in the Saudi market it sometimes reaches 75%. This means 3 out of 4 customers who showed purchase intent didn't complete. The reasons vary: hesitation, lack of incentive to complete, shipping threshold, or simply being distracted. Ziadah addresses each reason with specific tools: a timed coupon, cart reminder, free shipping indicator, and an Exit Intent offer at the last moment.",
  strategyTitleEn: "Ziadah's strategies to prevent cart abandonment",
  strategiesEn: [
    {
      icon: "🏷️",
      title: "Timed Rescue Coupon",
      desc: "After X minutes in the cart without progress, a 5-15% discount coupon appears for 15 minutes. Real urgency pushes a third of hesitators to complete.",
      color: "#ec4899",
    },
    {
      icon: "🚚",
      title: "Free Shipping Indicator",
      desc: "A colored bar shows the customer how much is left to reach the free shipping threshold — a visual incentive that pushes them to add a product instead of leaving.",
      color: "#06b6d4",
    },
    {
      icon: "🚪",
      title: "Exit Intent — Last Offer",
      desc: "When attempting to leave the store (mouse moving toward closing the tab), a popup with a special instant offer appears. The last chance before losing the sale.",
      color: "#a855f7",
    },
    {
      icon: "⏱️",
      title: "Countdown Timer for Offers",
      desc: "Adds a timer on the cart for limited products or temporary offers — 'This offer ends in 22 minutes' creates real urgency.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "-38%", label: "Cart abandonment rate", color: "#ec4899" },
    { value: "+31%", label: "Recovered customers monthly", color: "#10b981" },
    { value: "+18%", label: "Purchase completion rate", color: "#a855f7" },
    { value: "+24%", label: "First month revenue", color: "#06b6d4" },
  ],
  exampleScenarioEn: {
    title: "How Ziadah rescues a hesitating customer",
    steps: [
      "A customer added a dress for 380 SAR to the cart and sat for 4 minutes without progress.",
      "Ziadah detects the hesitation time exceeded the threshold — triggers the rescue protocol.",
      "A subtle banner appears: 'Exclusive for you: 10% off for the next 12 minutes only'.",
      "The customer didn't leave — the shipping bar says 'Add 20 SAR for free shipping' so she added a small accessory.",
    ],
    result: "She completed the purchase at 440 SAR instead of abandoning 380 SAR — recovering the order value and increasing it at the same time.",
  },
  plansEn: ["Growth", "Professional", "Business"],
  ctaTitleEn: "Stop the bleeding and convert hesitators into buyers",
  ctaDescEn: "Cart abandonment prevention tools are ready in Ziadah — activate them with one click.",
  seo: {
    title: "تقليل التخلي عن السلة — زيادة",
    titleEn: "Reduce Cart Abandonment — Ziadah",
    description: "استعِد 70٪ من العملاء المترددين مع زيادة. كوبونات إنقاذ مؤقتة وعروض ذكية تُحوّل التخلي عن السلة إلى إتمام للشراء.",
    descriptionEn: "Recover 70% of hesitating customers with Ziadah. Timed rescue coupons and smart offers convert cart abandonment into completed purchases.",
    canonical: "/use-cases/reduce-abandon",
  },
};

export default function ReduceAbandon() {
  return <UseCaseLayout data={data} />;
}
