import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import BuyMoreSaveMoreWidget from "../../components/widgets/BuyMoreSaveMoreWidget";
import WidgetTabs from "../../components/WidgetTabs";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الأهداف",
    title: "عروض الكميات",
    subtitle: "حفّز العميل على شراء كميات أكبر من نفس المنتج بعروض تدريجية واضحة — كلما زادت الكمية زاد التوفير.",
    tagline: "نفس المنتج، كميات أكثر، ربح أعلى",
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
      desc: "يعرض جدولاً واضحاً: 1 قطعة = 49 ⃁ | 2 قطعة = 44 ⃁ لكل قطعة | 3+ = 39 ⃁ لكل قطعة — العميل يرى الفرق مباشرة.",
      color: "#a855f7",
    },
    {
      icon: "🔋",
      title: "شريط التقدم نحو التوفير",
      desc: "يعرض شريطاً بصرياً يُظهر للعميل كم تبقى لتصل للشريحة التالية — 'أضف قطعة واحدة ووفّر 30 ⃁ إضافية'.",
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
    { value: "+61%", label: "ارتفاع معدل الشراء بكميات كبيرة عند عرض الشرائح", color: "#a855f7" },
    { value: "+45%", label: "متوسط إيراد الطلب الواحد مع عروض الكميات", color: "#06b6d4" },
    { value: "+34%", label: "معدل تكرار الشراء لأن المخزون يستنفد بطيئاً", color: "#10b981" },
    { value: "2.8x", label: "متوسط الكمية المشتراة مقارنة بدون عرض الكميات", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات متنوعة",
    steps: [
      "☕ بن وقهوة: كيس قهوة 250 غ = 49 ⃁ / كيسين = 89 ⃁ (توفير 9 ⃁) / 3 أكياس = 119 ⃁ (توفير 28 ⃁) — شريط يُظهر 'أضف كيساً واحداً أكثر لتوفير 28 ⃁'.",
      "🧴 منظفات منزلية: منظف ليتر = 22 ⃁ / 3 عبوات = 19 ⃁ للعبوة / 6 عبوات = 16 ⃁ للعبوة — جدول شرائح واضح بجانب المنتج.",
      "💊 مكملات غذائية: علبة بروتين = 149 ⃁ / علبتان = 139 ⃁ لكل علبة / 3 علب = 125 ⃁ لكل علبة — مع توضيح 'كفاية 3 أشهر بسعر أشهر إضافية'.",
      "🖊️ قرطاسية: قلم = 8 ⃁ / عبوة 6 أقلام = 42 ⃁ (توفير 6 ⃁) / علبة 12 قلم = 72 ⃁ (توفير 24 ⃁) — خيارات الكمية بأزرار واضحة.",
    ],
    result: "عرض شريط التقدم 'أضف قطعة واحدة ووفّر X ⃁' يرفع معدل اختيار الكميات الأكبر بنسبة 42% مقارنة بجدول الشرائح الثابت — الرسالة الشخصية المباشرة تُحفّز أكثر.",
  },
  extraSections: (isAr) => (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 80px" }}>
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          {isAr ? "مثال حي" : "Live Example"}
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>{isAr ? "كيف يظهر للعميل داخل المتجر؟" : "How does it look to customers in-store?"}</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>{isAr ? "هكذا تبدو واجهة اقتراح عروض الكميات كما يراها عميلك فعلياً" : "This is how the volume offer looks to your customer"}</p>
        <WidgetTabs
          isAr={isAr}
          fullWidthContent
          tabs={[
            {
              labelAr: "📱 مثال حي",
              labelEn: "📱 Live Demo",
              content: <BuyMoreSaveMoreWidget />,
            },
            {
              labelAr: "🏷️ مناسب لأي منتج؟",
              labelEn: "🏷️ Best Product Fits",
              content: (
                <div style={{ border: "1px solid var(--b1)", borderRadius: 20, padding: "36px 40px", backdropFilter: "blur(24px)", width: "100%" }}>
                  <div className="shine"/>
                  <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, textAlign: "center" }}>{isAr ? "أي المنتجات تستفيد أكثر من عروض الكميات؟" : "Which products benefit most from volume offers?"}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                    {(isAr ? [
                      { icon: "🔄", type: "المنتجات الاستهلاكية", examples: "تنظيف، عناية، طعام" },
                      { icon: "📦", type: "المنتجات القابلة للتخزين", examples: "قهوة، مكملات، قرطاسية" },
                      { icon: "🎁", type: "منتجات الهدايا والمواسم", examples: "شوكولاتة، شمع، عطور" },
                      { icon: "🏭", type: "منتجات التجار والمحلات", examples: "مستلزمات، أدوات، مواد" },
                    ] : [
                      { icon: "🔄", type: "Consumable products", examples: "Cleaning, skincare, food" },
                      { icon: "📦", type: "Storable products", examples: "Coffee, supplements, stationery" },
                      { icon: "🎁", type: "Gift & seasonal products", examples: "Chocolate, candles, perfumes" },
                      { icon: "🏭", type: "Wholesale & business products", examples: "Supplies, tools, materials" },
                    ]).map((item, i) => (
                      <div key={i} style={{ padding: "20px 24px", background: "rgba(168,85,247,.05)", border: "1px solid rgba(168,85,247,.12)", borderRadius: 14 }}>
                        <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>{item.type}</div>
                        <div style={{ fontSize: 12, color: "var(--td)" }}>{item.examples}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  ),
  plans: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "فعّل عروض الكميات",
  ctaDesc: "زيادة يُنشئ عروض الكميات تلقائياً ويُحفّز العميل لشراء أكثر بنفس منتجك.",
  heroEn: {
    tag: "By Goals",
    title: "Quantity Offers",
    subtitle: "Motivate customers to buy larger quantities of the same product with clear tiered offers — the more they buy, the more they save.",
    tagline: "Same product, bigger quantities, higher profit",
    icon: "📦",
  },
  whatWeDoTitleEn: "What is 'Buy More, Save More' and how does it work in Ziadah?",
  whatWeDoDescEn:
    "Volume discount offers (Buy More Save More) present the customer with a tiered pricing table: the more units they buy of the same product, the lower the per-unit price. Ziadah builds these offers automatically and displays them visually — a progress bar or tier table — showing exactly how much they save by adding one more unit. AI calculates the optimal price tiers based on each product's margin and store purchase patterns.",
  strategyTitleEn: "Volume Offer Display Methods in Ziadah",
  strategiesEn: [
    {
      icon: "📊",
      title: "Tiered Pricing Table",
      desc: "Displays a clear table: 1 unit = 49 SAR | 2 units = 44 SAR each | 3+ = 39 SAR each — the customer sees the difference instantly.",
      color: "#a855f7",
    },
    {
      icon: "🔋",
      title: "Savings Progress Bar",
      desc: "Shows a visual bar indicating how close the customer is to the next tier — 'Add one more unit and save an extra 30 SAR'.",
      color: "#06b6d4",
    },
    {
      icon: "🎯",
      title: "Actual Savings Calculator",
      desc: "Instead of just showing percentages, Ziadah displays the exact amount saved when choosing a larger quantity — more convincing and clearer value.",
      color: "#10b981",
    },
    {
      icon: "⏳",
      title: "Time-Limited Volume Offers",
      desc: "Ziadah adds urgency with volume deals that expire within a set time — accelerating the decision to buy in larger quantities.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+61%", label: "Increase in bulk purchase rate when tiers are displayed", color: "#a855f7" },
    { value: "+45%", label: "Average order revenue with volume offers", color: "#06b6d4" },
    { value: "+34%", label: "Repeat purchase rate as stock depletes slowly", color: "#10b981" },
    { value: "2.8x", label: "Average quantity purchased vs. without volume offers", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Real examples from various industries",
    steps: [
      "☕ Coffee: 250g bag = 49 SAR / 2 bags = 89 SAR (save 9 SAR) / 3 bags = 119 SAR (save 28 SAR) — a bar shows 'Add one more bag to save 28 SAR'.",
      "🧴 Cleaning supplies: 1L cleaner = 22 SAR / 3 bottles = 19 SAR each / 6 bottles = 16 SAR each — a clear tier table beside the product.",
      "💊 Supplements: Protein box = 149 SAR / 2 boxes = 139 SAR each / 3 boxes = 125 SAR each — with a note: '3-month supply at the price of extra months'.",
      "🖊️ Stationery: Pen = 8 SAR / 6-pack = 42 SAR (save 6 SAR) / 12-pack = 72 SAR (save 24 SAR) — quantity options with clear buttons.",
    ],
    result: "Showing a progress bar 'Add one more unit and save X SAR' increases the rate of choosing larger quantities by 42% compared to a static tier table — a direct, personal message motivates more.",
  },
  plansEn: ["Starter", "Growth", "Professional", "Business"],
  ctaTitleEn: "Activate quantity offers",
  ctaDescEn: "Ziadah automatically generates quantity offers and motivates customers to buy more of your products.",
  seo: {
    title: "عروض الكميات — زيادة",
    titleEn: "Quantity Offers — Ziadah",
    description: "زيادة يُحفّز عملاءك لشراء كميات أكبر بنفس المنتج عبر عروض تدريجية واضحة. النتائج: وحدات أكثر في كل طلب وإيرادات أعلى.",
    descriptionEn: "Motivate your customers to buy larger quantities with smart tiered offers. Ziadah automatically creates incentive tier tables for your Zid and Salla store.",
    canonical: "/use-cases/buy-more-save-more",
  },
};

export default function BuyMoreSaveMore() {
  return <UseCaseLayout data={data} />;
}
