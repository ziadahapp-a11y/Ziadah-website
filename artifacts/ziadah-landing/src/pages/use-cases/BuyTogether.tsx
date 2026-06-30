import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import BuyTogetherWidget from "../../components/widgets/BuyTogetherWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "الشراء معاً",
    subtitle: "اجمع منتجات مُكمّلة في عرض واحد يُقنع العميل باقتناء الطقم كاملاً — بثقة بيانات الطلبات الفعلية وتصميم يُبرز التوافق.",
    tagline: "الطقم الكامل يُباع أفضل من كل قطعة بمفردها",
    icon: "🤝",
  },
  whatWeDoTitle: "ما هو عرض 'الشراء معاً' وكيف يعمل في زيادة؟",
  whatWeDoDesc:
    "طريقة 'الشراء معاً' (Frequently Bought Together) تعرض للعميل مجموعة منتجات جرى اختيارها لأنها تُشترى معاً بكثرة أو تُكمّل بعضها وظيفياً — وذلك في شكل عرض مجمّع مع خيار إضافة الكل للسلة بنقرة واحدة. زيادة يستخرج هذه المجموعات من بيانات الطلبات الفعلية للمتجر باستخدام خوارزميات تحليل الارتباط، ثم يعرضها بتصميم يُبرز التوافق ويُسهّل القرار.",
  strategyTitle: "آليات عرض 'الشراء معاً' في زيادة",
  strategies: [
    {
      icon: "📈",
      title: "تحليل الارتباط الفعلي",
      desc: "يحلل زيادة آلاف الطلبات لاستخراج أكثر المنتجات ارتباطاً بالشراء المشترك — لا اجتهادات يدوية، بل بيانات حقيقية من متجرك.",
      color: "#8b5cf6",
    },
    {
      icon: "🖱️",
      title: "إضافة الكل بنقرة",
      desc: "زر 'أضف الكل للسلة' يضيف جميع منتجات المجموعة دفعة واحدة — يُقلّل الاحتكاك ويُعجّل القرار.",
      color: "#06b6d4",
    },
    {
      icon: "💬",
      title: "رسالة اجتماعية موثوقة",
      desc: "يُرفق العرض بجملة بناءً على بيانات حقيقية مثل 'عملاء اشتروا هذا اشتروا أيضاً...' — تبني ثقة وتُسرّع القرار.",
      color: "#8b5cf6",
    },
    {
      icon: "🎨",
      title: "عرض بصري تركيبي",
      desc: "تُعرض المنتجات بصورة مجتمعة أو شبكة بطاقات تُوضّح التكامل، مع توضيح السعر الإجمالي إذا اختار العميل الطقم كاملاً.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+35%", label: "نسبة الطلبات التي تحتوي على أكثر من منتج", color: "#8b5cf6" },
    { value: "+29%", label: "متوسط قيمة الطلب مع عرض 'الشراء معاً'", color: "#06b6d4" },
    { value: "48%", label: "من العملاء ينقرون على عرض 'الشراء معاً'", color: "#8b5cf6" },
    { value: "+17%", label: "رضا العملاء عن اكتمال تجربة الشراء", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات متنوعة",
    steps: [
      "☕ قهوة: عميل يشاهد آلة قهوة → يرى طقم 'الشراء معاً': آلة + مطحنة + كبسولات مجموعة — 'عملاء اشتروا هذه الآلة اشتروا أيضاً هذه المجموعة'.",
      "📷 تصوير: عميل يشاهد كاميرا → يُعرض له: كاميرا + حقيبة حمل + بطاقة ذاكرة + بطارية احتياطية كطقم واحد.",
      "💪 رياضة: عميل يشاهد حبل تمرين → طقم مقترح: حبل + قفازات + حصيرة تمرين — بزر 'أضف الطقم كاملاً'.",
      "🧴 عناية: عميلة تشاهد غسول الوجه → طقم البشرة: غسول + تونر + مرطب — 'الروتين الأكثر شراءً معاً لدى عملائنا'.",
    ],
    result: "عرض 'الشراء معاً' بخيار إضافة الكل دفعة واحدة يرفع نسبة تبنّي الطقم الكامل من 9% إلى 33% — كل ثلاثة أفراد من كل عشرة يختارون الطقم بدلاً من قطعة واحدة.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يظهر للعميل داخل المتجر؟" : "How does it look to customers in-store?"}
      subtitle={
        isAr
          ? "هكذا تبدو واجهة اقتراح الشراء معاً كما يراها عميلك فعلياً"
          : "This is how the 'Bought Together' suggestion looks to your customer"
      }
      tabs={[
        {
          labelAr: "📱 مثال حي",
          labelEn: "📱 Live Demo",
          content: <BuyTogetherWidget />,
        },
        {
          labelAr: "⚖️ الفرق عن الحزم",
          labelEn: "⚖️ vs Bundle Deals",
          placement: "below",
          content: (
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-card p-8 md:p-10" style={{ width: "100%" }}>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-950" style={{ marginBottom: 20, textAlign: "center" }}>
                {isAr ? "الفرق بين 'الشراء معاً' و'عروض الحزم'" : "'Bought Together' vs. Bundle Deals"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50/60" style={{ padding: "24px 28px" }}>
                  <div className="text-violet-600" style={{ fontSize: 17, fontWeight: 800, marginBottom: 12 }}>{isAr ? "🤝 الشراء معاً" : "🤝 Bought Together"}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {(isAr
                      ? ["مبني على بيانات الارتباط الفعلي", "كل منتج يحتفظ بسعره المستقل", "يُظهر الإجمالي بدون خصم إلزامي", "مناسب لأي نوع من المنتجات"]
                      : ["Based on real association data", "Each product keeps its independent price", "Shows total without mandatory discount", "Suitable for any product type"]
                    ).map((item, i) => (
                      <li key={i} className="text-zinc-600" style={{ display: "flex", gap: 8, fontSize: 14, alignItems: "center" }}>
                        <span className="text-violet-600" style={{ fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50/60" style={{ padding: "24px 28px" }}>
                  <div className="text-violet-700" style={{ fontSize: 17, fontWeight: 800, marginBottom: 12 }}>{isAr ? " عروض الحزم (Bundle)" : " Bundle Deals"}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {(isAr
                      ? ["سعر خاص للمجموعة كوحدة واحدة", "يُبرز التوفير كحافز رئيسي", "يُباع الطقم بسعر أقل من المجموع", "يحفّز على شراء كميات أو مجموعات"]
                      : ["Special price for the group as one unit", "Highlights savings as the main incentive", "Set sold at less than individual total", "Encourages buying quantities or sets"]
                    ).map((item, i) => (
                      <li key={i} className="text-zinc-600" style={{ display: "flex", gap: 8, fontSize: 14, alignItems: "center" }}>
                        <span className="text-violet-700" style={{ fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
  ctaTitle: "فعّل عرض 'الشراء معاً' في متجرك",
  ctaDesc: "بيانات عملاؤك تعرف ما يُشترى معاً — دع زيادة يعرضه تلقائياً لكل زائر.",
  heroEn: {
    tag: "By Display Method",
    title: "Frequently Bought Together",
    subtitle: "Bundle complementary products in a single offer that convinces customers to buy the complete set — backed by real order data and a design that highlights compatibility.",
    tagline: "The complete set sells better than each item alone",
    icon: "🤝",
  },
  whatWeDoTitleEn: "What is 'Frequently Bought Together' and how does it work in Ziadah?",
  whatWeDoDescEn:
    "The 'Frequently Bought Together' method shows the customer a group of products selected because they are frequently purchased together or functionally complement each other — displayed as a bundled offer with a one-click 'Add All to Cart' option. Ziadah extracts these groups from actual store order data using association analysis algorithms, then displays them with a design that highlights compatibility and simplifies the decision.",
  strategyTitleEn: "'Frequently Bought Together' display methods in Ziadah",
  strategiesEn: [
    {
      icon: "📈",
      title: "Real Association Analysis",
      desc: "Ziadah analyzes thousands of orders to extract the most frequently co-purchased products — no manual guesswork, just real data from your store.",
      color: "#8b5cf6",
    },
    {
      icon: "🖱️",
      title: "One-Click Add All",
      desc: "An 'Add All to Cart' button adds all group products at once — reducing friction and speeding up the decision.",
      color: "#06b6d4",
    },
    {
      icon: "💬",
      title: "Trusted Social Proof",
      desc: "The offer includes a data-backed message like 'Customers who bought this also bought...' — building trust and accelerating the decision.",
      color: "#8b5cf6",
    },
    {
      icon: "🎨",
      title: "Visual Composite Display",
      desc: "Products are shown as a group image or card grid highlighting compatibility, with the total price displayed if the customer chooses the complete set.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+35%", label: "Orders containing more than one product", color: "#8b5cf6" },
    { value: "+29%", label: "Average order value with 'Bought Together' offer", color: "#06b6d4" },
    { value: "48%", label: "Of customers click on the 'Bought Together' offer", color: "#8b5cf6" },
    { value: "+17%", label: "Customer satisfaction with the complete purchase experience", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Real examples from various industries",
    steps: [
      "☕ Coffee: Customer views a coffee machine → sees 'Bought Together' set: machine + grinder + capsule collection — 'Customers who bought this machine also bought this set'.",
      "📷 Photography: Customer views a camera → shown: camera + carrying bag + memory card + spare battery as one set.",
      "💪 Fitness: Customer views a resistance band → suggested set: band + gloves + exercise mat — with an 'Add Complete Set' button.",
      "🧴 Skincare: Customer views face wash → skincare set: wash + toner + moisturizer — 'The most popular routine bought together by our customers'.",
    ],
    result: "Showing 'Bought Together' with a one-click add-all option increases complete set adoption from 9% to 33% — three out of every ten customers choose the set instead of a single item.",
  },
  ctaTitleEn: "Activate 'Frequently Bought Together' in your store",
  ctaDescEn: "Your customer data knows what's bought together — let Ziadah display it automatically for every visitor.",
  seo: {
    title: "الشراء معاً (Buy Together) — زيادة",
    titleEn: "Frequently Bought Together — Ziadah",
    description: "اجمع المنتجات المُكمّلة في عرض واحد مقنع. زيادة يحلل الطلبات الفعلية ليقترح التوليفات الأنسب ويرفع قيمة السلة.",
    descriptionEn: "Bundle complementary products in one compelling offer. Ziadah analyzes real orders to suggest the best combinations and increase cart value.",
    canonical: "/use-cases/buy-together",
  },
};

export default function BuyTogether() {
  return <UseCaseLayout data={data} />;
}
