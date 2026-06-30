import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import CustomerPersonalizationDemo from "../../components/CustomerPersonalizationDemo";

const comparisonRowsAr = [
  ["أساس التوصية", "الأكثر مبيعاً عاماً", "ملف شخصي فردي"],
  ["وقت التعلم", "لا يتعلم", "يتحسن مع كل طلب"],
  ["تخصيص المناسبات", "يدوي من التاجر", "تلقائي 100%"],
  ["عدد الإشارات المحللة", "3-5", "أكثر من 40 إشارة"],
  ["معدل التحويل المتوقع", "1%-2%", "4%-8%"],
  ["الوقت المطلوب من التاجر", "ساعات أسبوعياً", "صفر"],
];

const comparisonRowsEn = [
  ["Recommendation basis", "Generic bestsellers", "Individual profile"],
  ["Learning over time", "Does not learn", "Improves with every order"],
  ["Seasonal / occasion tuning", "Manual merchant work", "100% automatic"],
  ["Signals analyzed", "3–5", "40+ signals"],
  ["Expected conversion", "1%–2%", "4%–8%"],
  ["Weekly merchant time", "Hours per week", "Zero"],
];

const data: UseCasePageData = {
  hero: {
    tag: "تجربة العميل",
    title: "تخصيص التجربة",
    subtitle:
      "زيادة يبني لكل زائر تدفقاً وعرضاً مخصصاً: يتذكر المشتريات والتفاعلات ويقارنها بأنماط عملاء مشابهين، ثم يقترح المنتجات المناسبة في التوقيت الصحيح — ليشعر كل عميل أن المتجر صُمّم له.",
    tagline: "من نفس المحرك، منطق مختلف لكل عميل",
    icon: "✨",
  },
  whatWeDoTitle: "محرك التوصيات الذكي — ماذا يفعل فعلياً؟",
  whatWeDoDesc:
    "في أجزاء من الثانية، يحوّل زيادة سلوك الزائر إلى قرار عرض: من أين دخل؟ ماذا مرّر المؤشر عليه وكم بقي؟ هل كبّر صورة المنتج؟ هل أضاف للسلة ثم أزال؟ تُضاف هذه الإشارات إلى ملف يتعاظم مع الوقت — ثم تُقارن بأنماط آلاف العملاء المشابهين، وتُوزن مع التقويم التجاري والموسم. كل ذلك دون جداول يدوية ولا قواعد «إن كان فإن» من عندك.",
  strategyTitle: "أركان التخصيص في زيادة",
  strategies: [
    {
      icon: "🪪",
      title: "طبقة الهوية الكاملة",
      desc: "بناء ملف زائر غني: مصدر الزيارة، الجهاز، المنطقة، تاريخ التصفح والشراء — أساس لا يُبنى التوصية بدونه.",
      color: "#22c55e",
    },
    {
      icon: "⚡",
      title: "إشارات النية اللحظية",
      desc: "زمن التمرير على عنصر، تكبير الصور، الإضافة والإزالة من السلة، التنقل بين الصفحات — لغة سلوك تُقرأ فوراً.",
      color: "#06b6d4",
    },
    {
      icon: "🧠",
      title: "ذاكرة تراكمية",
      desc: "المشتريات السابقة، المنتجات التي شاهدها دون شراء، العودات المتكررة، وأوقات النشاط المفضلة — كلها تغذي النموذج مع الوقت.",
      color: "#22c55e",
    },
    {
      icon: "👥",
      title: "ذكاء المجتمع",
      desc: "أنماط مستخرجة من عملاء يشبهون هذا الزائر في السلوك والاهتمام — توصيات مدعومة بسلوك حقيقي لا بتخمين.",
      color: "#f59e0b",
    },
    {
      icon: "🌙",
      title: "السياق الزمني والموسمي",
      desc: "رمضان، ما قبل العيد، الجمعة السوداء، نهاية الأسبوع، وساعات الذروة — تُرجّح المنتجات والعروض المناسبة للحظة.",
      color: "#ec4899",
    },
  ],
  stats: [
    { value: "+18–34%", label: "متوسط قيمة الطلب خلال أول 6 أسابيع", color: "#22c55e" },
    { value: "حتى 3×", label: "معدل التحويل مقارنة بالأساس", color: "#06b6d4" },
    { value: "+40", label: "إشارة سلوكية في المزيج", color: "#22c55e" },
    { value: "<80ms", label: "زمن توليد التوصية", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "نورة وناصر في نفس المتجر — تجربتان مختلفتان تماماً",
    steps: [
      "نورة دخلت من إعلان رمضان على تجميل: المحرك يرفع أوزان العطور والهدايا الموسمية ويخفّض إلكترونيات الرياضة.",
      "تمرّرت طويلاً على كريمات البشرة وكبّرت صورة طقم عناية — تُسجَّل كإشارات نية قوية قبل الشراء.",
      "ناصر زار من بحث عن «آيفون»: يُكتشف نمط تقني رياضي من مشترياته السابقة وساعته القديمة في الملف.",
      "لناصر تظهر إكمالات تقنية ولياقة؛ لنورة تظهر عطور رمضان وبخور يكمّل سلّة العناية — من نفس المحرك، بمنطق مختلف.",
    ],
    result: "في deployments مشابهة: ارتفع متوسط قيمة الطلب بين 18% و34% في أول ستة أسابيع، ووصل معدل التحويل إلى ضعف أو ثلاثة أضعاف في فئات مختارة — دون ساعات إعداد أسبوعية من التاجر.",
  },
  ctaTitle: "اجعل كل عميل يشعر أن المتجر صُمّم له",
  ctaDesc: "فعّل محرك التوصيات الذكي من زيادة واترك التخصيص العميق للذكاء الاصطناعي.",
  extraSections: (isAr) => (
    <>
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 48px" }}>
        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
          <div className="gc rv" style={{ padding: "36px 28px", borderRadius: 20, overflow: "hidden" }}>
            <div className="shine" />
            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, textAlign: "center" }}>
              {isAr ? "مقارنة سريعة" : "Quick comparison"}
            </h3>
            <p style={{ fontSize: 14, color: "var(--tm)", textAlign: "center", marginBottom: 24, lineHeight: 1.7 }}>
              {isAr
                ? "لماذا التوصيات التقليدية تتوقف مبكراً بينما محرك زيادة يستمر بالتعلم؟"
                : "Why traditional recommendations plateau while Ziadah's engine keeps learning."}
            </p>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 520,
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr>
                    {(isAr ? ["المعيار", "الأدوات التقليدية", "زيادة AI"] : ["Criteria", "Traditional tools", "Ziadah AI"]).map(
                      (h, i) => (
                        <th
                          key={h}
                          style={{
                            textAlign: i === 0 ? "start" : "center",
                            padding: "14px 16px",
                            background: i === 2 ? "rgba(22, 163, 74,.12)" : "rgba(22, 163, 74,.06)",
                            borderBottom: "1px solid var(--b1)",
                            fontWeight: 900,
                            color: i === 2 ? "var(--p4)" : "var(--t)",
                            borderRadius: i === 0 ? "12px 0 0 0" : i === 2 ? "0 12px 0 0" : 0,
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(isAr ? comparisonRowsAr : comparisonRowsEn).map((row, ri) => (
                    <tr key={ri}>
                      <td
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid var(--b1)",
                          fontWeight: 700,
                          color: "var(--t)",
                          background: "var(--s2)",
                        }}
                      >
                        {row[0]}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid var(--b1)",
                          textAlign: "center",
                          color: "var(--tm)",
                          background: "var(--s2)",
                        }}
                      >
                        {row[1]}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid var(--b1)",
                          textAlign: "center",
                          fontWeight: 700,
                          color: "#22c55e",
                          background: "rgba(16,185,129,.06)",
                        }}
                      >
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <CustomerPersonalizationDemo isAr={isAr} />
    </>
  ),
  heroEn: {
    tag: "Customer experience",
    title: "Personalized experience",
    subtitle:
      "Ziadah builds a tailored flow and display for each visitor: it remembers purchases and interactions, compares them with similar shoppers, and suggests the right products at the right time — so every customer feels the store was built for them.",
    tagline: "Same engine, different logic for each customer",
    icon: "✨",
  },
  whatWeDoTitleEn: "The smart recommendations engine — what it actually does",
  whatWeDoDescEn:
    "In milliseconds, Ziadah turns behavior into a display decision: where did they land? What did they hover on and for how long? Did they zoom product images? Add to cart and remove? Those signals feed a profile that grows over time — then they're matched to patterns from thousands of similar customers and weighted with your commercial calendar and season. No manual spreadsheets, no hand-written if/then rules.",
  strategyTitleEn: "The pillars of personalization in Ziadah",
  strategiesEn: [
    {
      icon: "🪪",
      title: "Full identity layer",
      desc: "A rich visitor profile: traffic source, device, region, browsing and purchase history — the foundation recommendations are built on.",
      color: "#22c55e",
    },
    {
      icon: "⚡",
      title: "Real-time intent signals",
      desc: "Hover dwell time, image zoom, cart add/remove, path between pages — behavior read as it happens.",
      color: "#06b6d4",
    },
    {
      icon: "🧠",
      title: "Cumulative memory",
      desc: "Past purchases, viewed-not-bought products, repeat visits, and preferred activity windows — all feeding the model over time.",
      color: "#22c55e",
    },
    {
      icon: "👥",
      title: "Community intelligence",
      desc: "Patterns from customers who behave like this visitor — recommendations grounded in real cohort behavior, not guesswork.",
      color: "#f59e0b",
    },
    {
      icon: "🌙",
      title: "Temporal & seasonal context",
      desc: "Ramadan, pre-Eid, Black Friday, weekends, peak hours — boosting the products and offers that fit the moment.",
      color: "#ec4899",
    },
  ],
  statsEn: [
    { value: "+18–34%", label: "Average order value in first 6 weeks", color: "#22c55e" },
    { value: "Up to 3×", label: "Conversion vs. baseline", color: "#06b6d4" },
    { value: "40+", label: "Behavioral signals in the mix", color: "#22c55e" },
    { value: "<80ms", label: "Recommendation generation time", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Noura and Nasser in the same store — two completely different experiences",
    steps: [
      "Noura arrived from a Ramadan beauty ad: the engine raises weights for seasonal perfumes and gifts and de-emphasizes sports electronics.",
      "She lingered on skincare creams and zoomed a care set — logged as strong pre-purchase intent signals.",
      "Nasser came from an iPhone search: a tech-and-fitness pattern is inferred from past purchases and his old watch in the profile.",
      "Nasser sees tech and fitness complements; Noura sees Ramadan scents and incense that complete a care basket — same engine, different logic.",
    ],
    result: "In comparable deployments: AOV rose between 18% and 34% in the first six weeks, and conversion reached 2–3× in selected categories — without weekly manual setup from the merchant.",
  },
  ctaTitleEn: "Make every customer feel the store was built for them",
  ctaDescEn: "Activate Ziadah's smart recommendations engine and let deep personalization run on autopilot.",
  seo: {
    title: "تخصيص التجربة — محرك التوصيات الذكي | زيادة",
    titleEn: "Personalized Customer Experience — Ziadah",
    description:
      "زيادة: ملف هوية وتحديث مستمر لإشارات النية، ذاكرة تراكمية لمشتريات العميل السابقة، ذكاء مجتمعي، وسياق موسمي — لتجربة عميل مخصصة لكل زائر.",
    descriptionEn:
      "Ziadah's AI recommendations: identity layer, real-time intent, cumulative memory, community intelligence, and seasonal context — a personalized experience for every visitor.",
    canonical: "/use-cases/customer-experience",
  },
};

export default function CustomerExperience() {
  return <UseCaseLayout data={data} />;
}
