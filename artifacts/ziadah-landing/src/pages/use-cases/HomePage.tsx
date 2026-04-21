import UseCaseLayout, { UseCasePageData } from "../../components/UseCaseLayout";
import HomePageWidget from "../../components/widgets/HomePageWidget";

const data: UseCasePageData = {
  hero: {
    tag: "حسب الصفحات",
    title: "الصفحة الرئيسية",
    subtitle: "أول ما يراه العميل في متجرك — انطباع أول ذكي يُرحّب بكل زائر بتجربة مخصصة بناءً على تاريخه وسلوكه.",
    tagline: "كل عميل يرى متجراً مختلفاً مصمماً له شخصياً",
    icon: "🏠",
  },
  whatWeDoTitle: "كيف يعمل زيادة في الصفحة الرئيسية؟",
  whatWeDoDesc:
    "الصفحة الرئيسية في معظم المتاجر عبارة عن نفس العرض للجميع. زيادة يغيّر هذا تماماً: للعميل العائد يعرض ما تركه في آخر زيارة والمنتجات المرتبطة بمشترياته. للزائر الجديد يعرض أبرز المنتجات وأعلاها تقييماً. للعميل المتكرر يعرض عروض الولاء والكومبو الموفّر. كل زيارة للصفحة الرئيسية أصبحت تجربة مخصصة تزيد التفاعل وتختصر طريق الشراء.",
  strategyTitle: "استراتيجيات زيادة في الصفحة الرئيسية",
  strategies: [
    {
      icon: "🔄",
      title: "استكمل ما تركته",
      desc: "للعميل العائد يعرض المنتجات التي تصفّحها في آخر زيارة مع رسالة 'ما زلت مهتماً؟' تختصر عليه وقت البحث.",
      color: "#a855f7",
    },
    {
      icon: "⭐",
      title: "الأعلى تقييماً في فئتك",
      desc: "يعرض المنتجات الأكثر مبيعاً وتقييماً في الفئات التي أبدى العميل اهتماماً بها — تجربة تشعر العميل الجديد بالثقة.",
      color: "#f59e0b",
    },
    {
      icon: "🎁",
      title: "حزم Combo موفّرة",
      desc: "يعرض حزماً مدروسة من المنتجات المكمّلة بسعر إجمالي منخفض. مثالية للعملاء الذين لم يقرروا بعد ماذا يريدون.",
      color: "#10b981",
    },
    {
      icon: "🕐",
      title: "عروض محدودة الوقت",
      desc: "يضع عدادات عكسية وعروضاً مؤقتة في أعلى الصفحة بناءً على عادات الشراء — يخلق إلحاحاً حقيقياً وليس مصطنعاً.",
      color: "#06b6d4",
    },
  ],
  stats: [
    { value: "+34%", label: "وقت التصفح في الموقع", color: "#a855f7" },
    { value: "+29%", label: "معدل الانتقال للمنتجات", color: "#06b6d4" },
    { value: "+22%", label: "معدل التحويل للعملاء العائدين", color: "#10b981" },
    { value: "-18%", label: "معدل الارتداد من الصفحة الرئيسية", color: "#ec4899" },
  ],
  exampleScenario: {
    title: "عميل يعود لمتجر ملابس رياضية",
    steps: [
      "زار العميل المتجر قبل أسبوع وتصفّح أحذية الجري لكن لم يشترِ.",
      "في عودته اليوم تستقبله الصفحة الرئيسية بقسم مخصص: 'أحذية الجري الأكثر مبيعاً هذا الأسبوع'.",
      "يظهر تحته كومبو: 'حذاء جري + جوارب رياضية + حزام مائي' بخصم 18%.",
      "في الزاوية العلوية: 'عرض ينتهي خلال 3 ساعات' على الحذاء الذي تصفّحه سابقاً.",
    ],
    result: "العميل انتقل مباشرة للمنتج وأتم الشراء مع الكومبو — وقت الشراء انخفض من 12 دقيقة إلى 3 دقائق.",
  },
  extraSections: (isAr) => (
    <section style={{ position: "relative", zIndex: 2, padding: "0 5% 60px" }}>
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 14px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", color: "#7c3aed", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }}/>
          {isAr ? "مثال حي" : "Live Example"}
        </div>
        <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, marginBottom: 8 }}>{isAr ? "كيف تظهر الصفحة الرئيسية المُخصَّصة؟" : "How does the personalized home page look?"}</h3>
        <p style={{ fontSize: 14, color: "var(--tm)", marginBottom: 32, lineHeight: 1.7 }}>{isAr ? "هكذا يستقبل عميلك العائد الصفحة الرئيسية المُصمَّمة خصيصاً له" : "This is how your returning customer is greeted by a home page designed just for them"}</p>
        <HomePageWidget />
      </div>
    </section>
  ),
  plans: ["النمو", "الاحترافية", "الأعمال"],
  ctaTitle: "اجعل كل زائر يشعر أن المتجر بُني له",
  ctaDesc: "تجربة مخصصة من اللحظة الأولى = عميل يشتري ويعود.",
  heroEn: {
    tag: "By Pages",
    title: "Home Page",
    subtitle: "The first thing the customer sees in your store — a smart first impression that welcomes every visitor with a personalized experience based on their history and behavior.",
    tagline: "Every customer sees a different store designed personally for them",
    icon: "🏠",
  },
  whatWeDoTitleEn: "How does Ziadah work on the home page?",
  whatWeDoDescEn:
    "The home page in most stores shows the same content to everyone. Ziadah changes this completely: for returning customers it shows what they left in their last visit and products related to their purchases. For new visitors it shows top-rated and best-selling products. For repeat customers it shows loyalty offers and money-saving combos. Every home page visit becomes a personalized experience that increases engagement and shortens the path to purchase.",
  strategyTitleEn: "Ziadah's strategies on the home page",
  strategiesEn: [
    {
      icon: "🔄",
      title: "Continue Where You Left Off",
      desc: "For returning customers, shows products they browsed in their last visit with a 'Still interested?' message that saves them search time.",
      color: "#a855f7",
    },
    {
      icon: "⭐",
      title: "Top Rated in Your Category",
      desc: "Shows the best-selling and highest-rated products in categories the customer has shown interest in — an experience that gives new customers confidence.",
      color: "#f59e0b",
    },
    {
      icon: "🎁",
      title: "Money-Saving Combo Bundles",
      desc: "Displays curated bundles of complementary products at a lower total price. Perfect for customers who haven't decided what they want yet.",
      color: "#10b981",
    },
    {
      icon: "🕐",
      title: "Limited-Time Offers",
      desc: "Places countdown timers and temporary offers at the top of the page based on buying habits — creates real urgency, not manufactured.",
      color: "#06b6d4",
    },
  ],
  statsEn: [
    { value: "+34%", label: "Browse time on site", color: "#a855f7" },
    { value: "+29%", label: "Product click-through rate", color: "#06b6d4" },
    { value: "+22%", label: "Returning customer conversion rate", color: "#10b981" },
    { value: "-18%", label: "Home page bounce rate", color: "#ec4899" },
  ],
  exampleScenarioEn: {
    title: "A customer returns to a sportswear store",
    steps: [
      "The customer visited the store a week ago and browsed running shoes but didn't buy.",
      "On returning today, the home page greets them with a custom section: 'Best-selling running shoes this week'.",
      "Below it, a combo appears: 'Running shoes + sports socks + hydration belt' at 18% off.",
      "In the top corner: 'Offer expires in 3 hours' on the shoe they previously browsed.",
    ],
    result: "The customer went directly to the product and completed the purchase with the combo — purchase time dropped from 12 minutes to 3 minutes.",
  },
  plansEn: ["Growth", "Professional", "Business"],
  ctaTitleEn: "Make every visitor feel the store was built for them",
  ctaDescEn: "A personalized experience from the first moment = a customer who buys and returns.",
  seo: {
    title: "تخصيص الصفحة الرئيسية — زيادة",
    titleEn: "Home Page Personalization — Ziadah",
    description: "رحّب بكل زائر بتجربة مخصصة في صفحتك الرئيسية. زيادة يُعرّف كل عميل ويقدّم توصيات بناءً على سلوكه وتاريخ شراءه.",
    descriptionEn: "Welcome every visitor with a personalized experience on your home page. Ziadah identifies each customer and delivers recommendations based on their behavior and purchase history.",
    canonical: "/use-cases/home",
  },
};

export default function HomePage() {
  return <UseCaseLayout data={data} />;
}
