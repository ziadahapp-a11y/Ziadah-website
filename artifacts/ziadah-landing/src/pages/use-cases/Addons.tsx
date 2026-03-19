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
    { value: "+44٪", label: "معدل قبول قائمة الإضافات", color: "#a855f7" },
    { value: "+31٪", label: "متوسط قيمة الطلب مع إضافة واحدة على الأقل", color: "#06b6d4" },
    { value: "2.3", label: "متوسط عدد الإضافات المختارة في كل طلب", color: "#10b981" },
    { value: "+22٪", label: "تكرار الشراء من العملاء الذين اختاروا إضافات", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة من قطاعات متنوعة",
    steps: [
      "📱 إلكترونيات: عميل يضيف هاتف للسلة → تظهر قائمة: [✓] غلاف حماية +39 ⃁، [✓] واقي شاشة +15 ⃁، [ ] سماعة لاسلكية +89 ⃁ — يختار ويرى الإجمالي يتحدث.",
      "🌿 عناية: عميلة تشتري شامبو → تُعرض إضافات: [✓] بلسم مكمل +28 ⃁، [ ] ماسك أسبوعي +45 ⃁، [✓] سيروم تقوية +62 ⃁.",
      "🎮 ألعاب: عميل يشتري جهاز تحكم → يرى: [✓] حقيبة حمل +35 ⃁، [✓] بطاريات شحن +29 ⃁، [ ] غطاء زلق مانع +19 ⃁.",
      "🍕 مطعم: عميل يطلب بيتزا → يختار من: [✓] صوص إضافي +6 ⃁، [✓] حافة جبن +12 ⃁، [ ] مشروب +15 ⃁.",
    ],
    result: "الاختبار المتعدد يرفع متوسط عدد الإضافات المختارة من 0.7 إضافة (اقتراح واحد فقط) إلى 2.3 إضافة — ثلاثة أضعاف المبيعات الإضافية بنفس الجهد.",
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
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>هكذا تبدو واجهة اقتراح الإضافات كما يراها عميلك فعلياً</p>
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
                {["العميل يشعر بالتحكم الكامل", "يختار ما يناسب ميزانيته وحاجته", "السعر الإجمالي يتحدث فورياً", "معدل قبول يصل لـ 44٪"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--tm)", alignItems: "center" }}>
                    <span style={{ color: "#a855f7", fontWeight: 700 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(107,114,128,.05)", border: "1px solid rgba(107,114,128,.15)", borderRadius: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--td)", marginBottom: 12 }}>➡️ اقتراح مفرد (التقليدي)</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["قرار ثنائي: نعم أو لا", "إضافة واحدة فقط تُعرض في المرة", "لا مرونة في الاختيار", "معدل قبول يتراوح 12-18٪"].map((item, i) => (
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
  heroEn: {
    tag: "By Display Method",
    title: "Add-ons",
    subtitle: "Show customers functional add-ons that complement their main product — using a multi-select approach that maximizes acceptance and increases order value.",
    tagline: "Small add-ons make a big difference in revenue",
    icon: "➕",
  },
  whatWeDoTitleEn: "What are Add-ons and how does Ziadah implement them?",
  whatWeDoDescEn:
    "Add-ons present the customer with a list of additional products that functionally complement or enhance their main purchase — not a replacement or competitor, but a complement. What makes Ziadah's implementation unique is the multi-select approach: instead of suggesting one add-on, it displays a selectable assortment with a total price that updates instantly with each selection. AI chooses what to display based on actual store data and personalizes the list for each customer.",
  strategyTitleEn: "Add-on display methods in Ziadah",
  strategiesEn: [
    {
      icon: "☑️",
      title: "Multi-Select Checkboxes",
      desc: "Customers see a list of add-ons with checkboxes — they select what they want and see the total update instantly. Significantly improves add-on acceptance rates.",
      color: "#a855f7",
    },
    {
      icon: "🎯",
      title: "Product-Specific Suggestions",
      desc: "Each product has a custom add-on list tailored specifically to it — no generic lists. Ziadah learns from order data which add-ons are most accepted with each specific product.",
      color: "#06b6d4",
    },
    {
      icon: "💰",
      title: "Highlight Add-on Value",
      desc: "Each add-on displays its price clearly with a brief value message — 'Protect your phone' or 'Complete your set' — making the choice logical and easy.",
      color: "#10b981",
    },
    {
      icon: "📍",
      title: "Right Moment Display",
      desc: "The add-on list appears when adding the product to cart or on the product page — at the moment when the customer is in a buying mindset.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+44%", label: "Add-on list acceptance rate", color: "#a855f7" },
    { value: "+31%", label: "Average order value with at least one add-on", color: "#06b6d4" },
    { value: "2.3", label: "Average number of add-ons selected per order", color: "#10b981" },
    { value: "+22%", label: "Repeat purchases from customers who chose add-ons", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Examples from various industries",
    steps: [
      "📱 Electronics: Customer adds a phone to cart → list appears: [✓] Protective case +39 SAR, [✓] Screen protector +15 SAR, [ ] Wireless earbuds +89 SAR — they select and see the total update.",
      "🌿 Haircare: Customer buys shampoo → add-ons shown: [✓] Matching conditioner +28 SAR, [ ] Weekly mask +45 SAR, [✓] Strengthening serum +62 SAR.",
      "🎮 Gaming: Customer buys a controller → sees: [✓] Carrying case +35 SAR, [✓] Rechargeable batteries +29 SAR, [ ] Anti-slip grip cover +19 SAR.",
      "🍕 Restaurant: Customer orders pizza → selects from: [✓] Extra sauce +6 SAR, [✓] Cheese crust +12 SAR, [ ] Drink +15 SAR.",
    ],
    result: "Multi-select increases the average number of add-ons selected from 0.7 (single suggestion) to 2.3 — three times the additional sales with the same effort.",
  },
  plansEn: ["Starter", "Growth", "Professional", "Business"],
  ctaTitleEn: "Activate smart add-on offers in your store",
  ctaDescEn: "Small add-ons are cumulative — every order with two add-ons noticeably boosts your monthly revenue.",
  seo: {
    title: "الإضافات (Add-ons) — زيادة لمتجرك",
    titleEn: "Add-ons — Ziadah for Your Store",
    description: "استخدم زيادة لعرض إضافات وظيفية تُكمّل منتج العميل الأساسي بأسلوب اختبار متعدد يرفع قيمة الطلب ويزيد الإيرادات.",
    descriptionEn: "Use Ziadah to display functional add-ons that complement the customer's main product with a multi-select approach that boosts order value and revenue.",
    canonical: "/use-cases/addons",
  },
};

export default function Addons() {
  return <UseCaseLayout data={data} />;
}
