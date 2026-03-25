import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import IncreaseConversionWidget from "../../components/widgets/IncreaseConversionWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "رفع معدل التحويل",
    subtitle: "معدل التحويل (CVR) هو النسبة المئوية من زوار متجرك الذين يُتمّون الشراء — رفعه يعني ربح أكثر بنفس عدد الزوار.",
    tagline: "كل 1% في CVR = آلاف ⃁ شهرياً",
    icon: "📈",
  },
  whatWeDoTitle: "لماذا معدل التحويل أكثر أهمية من عدد الزوار؟",
  whatWeDoDesc:
    "المتجر الذي لديه 1000 زائر بمعدل تحويل 3% يحقق 30 طلباً. رفع معدل التحويل لـ 5% يعني 50 طلباً — بنفس ميزانية الإعلانات. معدل التحويل في المتاجر الإلكترونية العربية يتراوح بين 1-3% في المتوسط. زيادة يرفعه عبر منظومة متكاملة: تجربة مخصصة تزيل الاحتكاك، عروض موجّهة تُقلّل التردد، دليل اجتماعي يبني الثقة، وحوافز ذكية في اللحظة المناسبة.",
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
      desc: "أكثر من 70% من تصفح المتاجر يأتي من الهاتف. زيادة يُحسّن ظهور التوصيات ويجعلها سهلة التفاعل على الشاشات الصغيرة.",
      color: "#06b6d4",
    },
  ],
  stats: [
    { value: "+25%", label: "معدل التحويل الإجمالي", color: "#a855f7" },
    { value: "-40%", label: "وقت اتخاذ قرار الشراء", color: "#06b6d4" },
    { value: "+32%", label: "معدل تحويل الزوار الجدد", color: "#10b981" },
    { value: "+45%", label: "معدل تحويل العملاء العائدين", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "حساب تأثير رفع CVR بـ 2%",
    steps: [
      "متجر أزياء يستقبل 8,000 زائر شهرياً بمعدل تحويل 2% = 160 طلباً.",
      "بعد تفعيل زيادة: التخصيص وعروض الكوبون الأول ترفع CVR لـ 4%.",
      "نفس 8,000 زائر → 320 طلباً بمتوسط 400 ⃁ = 128,000 ⃁.",
      "الإيراد السابق: 160 × 400 = 64,000 ⃁. الزيادة: 64,000 ⃁ شهرياً.",
    ],
    result: "مضاعفة الإيراد بدون إنفاق ⃁ واحد إضافي على الإعلانات — فقط بتحسين معدل التحويل.",
  },
  extraSections: (isAr) => (
    <>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          {isAr ? "مثال حي" : "Live Example"}
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>{isAr ? "كيف يُحوّل زيادة الزائر إلى مشترٍ؟" : "How does Ziadah convert visitors into buyers?"}</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>{isAr ? "هكذا يبدو اقتراح رفع التحويل كما يراه عميلك الجديد" : "This is how the conversion boost looks to your new customer"}</p>
        <IncreaseConversionWidget />
      </div>
    </section>
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)" }}>
          <div className="shine"/>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24, textAlign: "center" }}>{isAr ? "العوامل التي ترفع معدل التحويل" : "Factors that increase conversion rate"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {(isAr ? [
              { icon: "🎯", title: "التخصيص", desc: "كل عميل يرى محتوى مناسباً له يختصر رحلة الشراء", color: "#a855f7" },
              { icon: "🤝", title: "الثقة", desc: "آراء حقيقية وإثبات اجتماعي يزيل التردد", color: "#06b6d4" },
              { icon: "⚡", title: "الإلحاح", desc: "عروض محدودة الوقت وعدادات توقيت تحفّز الشراء الآن", color: "#f59e0b" },
              { icon: "💎", title: "القيمة الواضحة", desc: "إظهار التوفير والفوائد بشكل صريح بدون غموض", color: "#10b981" },
              { icon: "🔄", title: "البساطة", desc: "مسار شراء سلس بلا عقبات يقلل الاحتكاك", color: "#ec4899" },
              { icon: "📱", title: "التوافق مع الموبايل", desc: "تجربة سلسة على جميع الأجهزة والشاشات", color: "#4f46e5" },
            ] : [
              { icon: "🎯", title: "Personalization", desc: "Each customer sees relevant content that shortens the buying journey", color: "#a855f7" },
              { icon: "🤝", title: "Trust", desc: "Real reviews and social proof remove hesitation", color: "#06b6d4" },
              { icon: "⚡", title: "Urgency", desc: "Time-limited offers and countdown timers motivate buying now", color: "#f59e0b" },
              { icon: "💎", title: "Clear Value", desc: "Showing savings and benefits explicitly without ambiguity", color: "#10b981" },
              { icon: "🔄", title: "Simplicity", desc: "Smooth buying path without obstacles reduces friction", color: "#ec4899" },
              { icon: "📱", title: "Mobile Compatibility", desc: "Seamless experience across all devices and screens", color: "#4f46e5" },
            ]).map((item, i) => (
              <div key={i} style={{ padding: "20px 20px", background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 14 }}>
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
  heroEn: {
    tag: "By Goals",
    title: "Increase Conversion Rate",
    subtitle: "Conversion rate (CVR) is the percentage of your store visitors who complete a purchase — increasing it means earning more with the same number of visitors.",
    tagline: "Every 1% in CVR = thousands of SAR monthly",
    icon: "📈",
  },
  whatWeDoTitleEn: "Why is conversion rate more important than visitor count?",
  whatWeDoDescEn:
    "A store with 1,000 visitors at a 3% conversion rate gets 30 orders. Raising the conversion rate to 5% means 50 orders — with the same ad budget. The average conversion rate for Arabic e-commerce stores ranges between 1-3%. Ziadah increases it through an integrated system: personalized experiences that remove friction, targeted offers that reduce hesitation, social proof that builds trust, and smart incentives at the right moment.",
  strategyTitleEn: "How does Ziadah increase conversion rate?",
  strategiesEn: [
    {
      icon: "🎯",
      title: "Personalized Experience = Faster Decision",
      desc: "Every customer sees the most relevant products upon arrival. No distraction, no long searches — a direct path from arrival to purchase that shortens decision time.",
      color: "#a855f7",
    },
    {
      icon: "⭐",
      title: "Smart Social Proof",
      desc: "Shows 'Customers like you bought this' with real reviews and ratings from your region or segment — builds trust and reduces purchase fear.",
      color: "#f59e0b",
    },
    {
      icon: "🏷️",
      title: "First Purchase Incentive",
      desc: "For new visitors who haven't purchased yet: offers a special coupon for their first order or a time-limited deal to convince them to try the store.",
      color: "#10b981",
    },
    {
      icon: "📱",
      title: "Mobile Experience Optimization",
      desc: "Over 70% of store browsing comes from phones. Ziadah optimizes recommendation display and makes them easy to interact with on small screens.",
      color: "#06b6d4",
    },
  ],
  statsEn: [
    { value: "+25%", label: "Overall conversion rate", color: "#a855f7" },
    { value: "-40%", label: "Purchase decision time", color: "#06b6d4" },
    { value: "+32%", label: "New visitor conversion rate", color: "#10b981" },
    { value: "+45%", label: "Returning customer conversion rate", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Calculating the impact of raising CVR by 2%",
    steps: [
      "A fashion store receives 8,000 visitors/month at a 2% conversion rate = 160 orders.",
      "After activating Ziadah: personalization and first-order coupons raise CVR to 4%.",
      "Same 8,000 visitors → 320 orders at 400 SAR average = 128,000 SAR.",
      "Previous revenue: 160 × 400 = 64,000 SAR. Increase: 64,000 SAR/month.",
    ],
    result: "Revenue doubled without spending a single extra SAR on ads — just by improving conversion rate.",
  },
  plansEn: ["Starter", "Growth", "Professional", "Business"],
  ctaTitleEn: "Double your revenue with the same number of visitors",
  ctaDescEn: "Raising CVR by a small percentage equals thousands of SAR monthly — activate Ziadah now.",
  seo: {
    title: "رفع معدل التحويل (CVR) — زيادة",
    titleEn: "Increase Conversion Rate (CVR) — Ziadah",
    description: "حوّل زوار متجرك إلى مشترين بمعدلات أعلى مع زيادة. تخصيص ذكي يجعل قرار الشراء أسرع وأسهل لكل عميل.",
    descriptionEn: "Convert your store visitors into buyers at higher rates with Ziadah. Smart personalization makes the purchase decision faster and easier for every customer.",
    canonical: "/use-cases/increase-conversion",
  },
};

export default function IncreaseConversion() {
  return <UseCaseLayout data={data} />;
}
