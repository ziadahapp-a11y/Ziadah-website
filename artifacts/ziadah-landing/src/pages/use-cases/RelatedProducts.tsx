import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import UseCaseLiveShowcase from "../../components/UseCaseLiveShowcase";
import RelatedProductsWidget from "../../components/widgets/RelatedProductsWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب طريقة العرض",
    title: "منتجات ذات صلة",
    subtitle: "اعرض لكل عميل المنتجات الأقرب لاهتمامه — زر الإضافة جاهز مع كل اقتراح، من النقر إلى السلة بثانيتين.",
    tagline: "عميل يرى ما يريد يشتري بلا تفكير",
    icon: "🔎",
  },
  whatWeDoTitle: "ما هي طريقة عرض 'منتجات ذات صلة' وكيف تعمل في زيادة؟",
  whatWeDoDesc:
    "طريقة العرض هذه تُبرز للعميل قائمة منتجات مُختارة ذكياً بجانب أو أسفل المنتج الذي يشاهده، وكل بطاقة مزودة بزر 'أضف إلى السلة' مباشرةً — دون الحاجة لفتح صفحة المنتج. الذكاء الاصطناعي في زيادة يختار ما يُعرض بناءً على: تاريخ تصفح العميل، سجل مشترياته، والمنتجات التي تُشترى معاً بكثرة عبر آلاف الطلبات الفعلية في نفس المتجر. النتيجة: اقتراح في السياق الصحيح بلا إزعاج، وزر إضافة لا يتطلب خطوات إضافية.",
  strategyTitle: "آليات العرض في 'منتجات ذات صلة' بزيادة",
  strategies: [
    {
      icon: "🤖",
      title: "توصيات مخصصة لكل عميل",
      desc: "بناءً على ملف العميل ومشترياته السابقة وتصفحه الحالي، يختار زيادة المنتجات التي تناسبه هو تحديداً — لا قائمة عامة للجميع.",
      color: "#8b5cf6",
    },
    {
      icon: "🛒",
      title: "زر الإضافة المباشر",
      desc: "كل بطاقة منتج مزودة بزر 'أضف إلى السلة' يعمل فورياً دون مغادرة الصفحة الحالية — يقلل الاحتكاك ويرفع معدل التحويل.",
      color: "#06b6d4",
    },
    {
      icon: "📊",
      title: "ترتيب ذكي بالأولوية",
      desc: "المنتجات لا تظهر عشوائياً — يرتبها زيادة حسب احتمالية الشراء لهذا العميل، فيظهر الأعلى ربحاً والأكثر صلة أولاً.",
      color: "#8b5cf6",
    },
    {
      icon: "🔄",
      title: "تحديث ديناميكي",
      desc: "تتحدث القائمة المعروضة في الوقت الفعلي مع تغيّر سلوك العميل أو عند إضافته منتجاً للسلة — لا تكرار ولا قائمة ثابتة.",
      color: "#f59e0b",
    },
  ],
  stats: [
    { value: "+38%", label: "زيادة في معدل إضافة المنتجات للسلة", color: "#8b5cf6" },
    { value: "+26%", label: "متوسط عدد المنتجات في الطلب الواحد", color: "#06b6d4" },
    { value: "42%", label: "من العملاء يتفاعلون مع قائمة الصلة", color: "#8b5cf6" },
    { value: "3 ثوانٍ", label: "متوسط وقت الإضافة من عرض الاقتراح", color: "#f59e0b" },
  ],
  exampleScenario: {
    title: "أمثلة تطبيقية من قطاعات مختلفة",
    steps: [
      "🍔 مطعم: عميل يشاهد طبق برغر → تظهر له منتجات ذات صلة: بطاطس، مشروب، صلصة إضافية — كل واحدة بزر إضافة مستقل.",
      "💄 تجميل: عميلة تشاهد كريم ترطيب → تظهر لها: غسول منسجم + سيروم مكمل + كريم عيون — بزر أضف لكل منتج.",
      "💻 إلكترونيات: عميل يشاهد سماعة → يرى: كيس حمل + وصلة بلوتوث + بطارية محمولة — بزر إضافة سريع.",
      "👟 أزياء: عميل يشاهد حذاء رياضي → تُعرض له: جوارب مناسبة + كيس رياضي + ربطات بديل — يضيف ما يشاء فورياً.",
    ],
    result: "متوسط قبول اقتراح 'منتجات ذات صلة' يبلغ 38% عند استخدام زر الإضافة المباشر مقابل 16% عند الاكتفاء بالرابط — الفارق في التصميم يصنع الفارق في الإيراد.",
  },
  extraSections: (isAr) => (
    <UseCaseLiveShowcase
      isAr={isAr}
      title={isAr ? "كيف يظهر للعميل داخل المتجر؟" : "How does it look to customers in-store?"}
      subtitle={
        isAr
          ? "هكذا تبدو واجهة اقتراح المنتجات ذات الصلة كما يراها عميلك فعلياً"
          : "This is how the related products suggestion looks to your customer"
      }
      tabs={[
        {
          labelAr: "📱 مثال حي",
          labelEn: "📱 Live Demo",
          content: <RelatedProductsWidget />,
        },
        {
          labelAr: "📍 أين تظهر؟",
          labelEn: "📍 Where It Appears",
          placement: "below",
          content: (
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-card" style={{ padding: "36px 40px", width: "100%" }}>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-950" style={{ marginBottom: 20, textAlign: "center" }}>
                {isAr ? "أين تظهر 'منتجات ذات صلة'؟" : "Where do 'Related Products' appear?"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {(isAr
                  ? [
                      { place: "📄 صفحة المنتج", note: "أسفل الوصف أو في الشريط الجانبي" },
                      { place: "🛒 صفحة السلة", note: "قبل الدفع لزيادة قيمة الطلب" },
                      { place: "🏠 الصفحة الرئيسية", note: "بناءً على آخر تصفح للعميل" },
                      { place: "🏷️ صفحة التصنيف", note: "بين المنتجات أو في الشريط الجانبي" },
                    ]
                  : [
                      { place: "📄 Product Page", note: "Below the description or in the sidebar" },
                      { place: "🛒 Cart Page", note: "Before checkout to increase order value" },
                      { place: "🏠 Home Page", note: "Based on the customer's recent browsing" },
                      { place: "🏷️ Category Page", note: "Between products or in the sidebar" },
                    ]
                ).map((item, i) => (
                  <div key={i} className="rounded-xl border border-zinc-200 bg-zinc-50/60" style={{ padding: "20px 24px", textAlign: "center" }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{item.place}</div>
                    <div className="text-zinc-600" style={{ fontSize: 13 }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
  ctaTitle: "فعّل عرض المنتجات ذات الصلة اليوم",
  ctaDesc: "كل زيارة فرصة — دع زيادة يقترح المنتج المناسب بزر الإضافة المباشر.",
  heroEn: {
    tag: "By Display Method",
    title: "Related Products",
    subtitle: "Show each customer the products closest to their interests — an add-to-cart button ready with every suggestion, from click to cart in two seconds.",
    tagline: "A customer who sees what they want buys without thinking",
    icon: "🔎",
  },
  whatWeDoTitleEn: "What is the 'Related Products' display and how does it work in Ziadah?",
  whatWeDoDescEn:
    "This display method highlights a smartly curated list of products beside or below the product the customer is viewing, with each card featuring a direct 'Add to Cart' button — no need to open the product page. Ziadah's AI selects what to show based on: the customer's browsing history, purchase record, and products frequently bought together across thousands of actual orders in the same store. The result: contextually relevant suggestions without annoyance, and an add button that requires no extra steps.",
  strategyTitleEn: "Related Products display methods in Ziadah",
  strategiesEn: [
    {
      icon: "🤖",
      title: "Personalized recommendations",
      desc: "Based on the customer's profile, past purchases, and current browsing, Ziadah selects products suited specifically to them — not a generic list for everyone.",
      color: "#8b5cf6",
    },
    {
      icon: "🛒",
      title: "Direct Add Button",
      desc: "Every product card features an instant 'Add to Cart' button that works without leaving the current page — reducing friction and boosting conversion.",
      color: "#06b6d4",
    },
    {
      icon: "📊",
      title: "Smart Priority Ordering",
      desc: "Products don't appear randomly — Ziadah ranks them by purchase probability for this customer, showing the most relevant and profitable ones first.",
      color: "#8b5cf6",
    },
    {
      icon: "🔄",
      title: "Dynamic Updates",
      desc: "The displayed list updates in real-time as the customer's behavior changes or when they add a product to cart — no repetition, no static list.",
      color: "#f59e0b",
    },
  ],
  statsEn: [
    { value: "+38%", label: "Increase in product add-to-cart rate", color: "#8b5cf6" },
    { value: "+26%", label: "Average number of products per order", color: "#06b6d4" },
    { value: "42%", label: "Of customers interact with the related products list", color: "#8b5cf6" },
    { value: "3 sec", label: "Average time to add from suggestion display", color: "#f59e0b" },
  ],
  exampleScenarioEn: {
    title: "Real examples from different industries",
    steps: [
      "🍔 Restaurant: Customer views a burger → related products appear: fries, drink, extra sauce — each with an independent add button.",
      "💄 Beauty: Customer views a moisturizer → shown: matching cleanser + complementary serum + eye cream — with an add button for each.",
      "💻 Electronics: Customer views headphones → sees: carrying case + Bluetooth adapter + portable battery — with a quick add button.",
      "👟 Fashion: Customer views running shoes → shown: matching socks + gym bag + replacement laces — they add what they want instantly.",
    ],
    result: "Average acceptance of 'Related Products' suggestions reaches 38% with a direct add button vs. 16% with links only — the design difference makes the revenue difference.",
  },
  ctaTitleEn: "Activate related products display today",
  ctaDescEn: "Every visit is an opportunity — let Ziadah suggest the right product with a direct add button.",
  seo: {
    title: "المنتجات ذات الصلة — زيادة",
    titleEn: "Related Products — Ziadah",
    description: "اعرض لكل عميل المنتجات الأقرب لاهتمامه مع زر الإضافة الجاهز. زيادة يُخصّص التوصيات لكل زائر بناءً على سلوكه الفعلي.",
    descriptionEn: "Show each customer the products closest to their interests with a ready add button. Ziadah personalizes recommendations for every visitor based on their actual behavior.",
    canonical: "/use-cases/related-products",
  },
};

export default function RelatedProducts() {
  return <UseCaseLayout data={data} />;
}
