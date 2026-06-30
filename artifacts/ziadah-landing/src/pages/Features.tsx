import { useEffect, useState } from "react";
import { t } from "@/i18n/translations";
import PageShell from "../components/PageShell";
import PlatformModal from "../components/PlatformModal";
import PageClosingCta from "../components/PageClosingCta";
import SEO from "../components/SEO";
import { getPageKeywords } from "@/seo/page-keywords";
import { SoftwareAppSchema, BreadcrumbSchema, WebPageSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { useSiteT } from "../cms/siteContent";
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Banknote,
  Tag,
  Link2,
  Plus,
  Gift,
  BarChart3,
  FileText,
  FolderTree,
  CreditCard,
  PartyPopper,
  DoorOpen,
  Home,
  Search,
  Megaphone,
  Shirt,
  Sparkles,
  Apple,
  Laptop,
  Sofa,
  Dumbbell,
  BookOpen,
  HandHeart,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────── data ─────────────────────────── */

const goals = [
  { id: 1, Icon: ShoppingCart, title: "إضافة المزيد من المنتجات", titleEn: "Add More Products", subtitle: "زيادة عدد المنتجات في كل طلب", subtitleEn: "Increase the number of products per order", color: "#22c55e", desc: "يقترح الذكاء الاصطناعي منتجات إضافية مرتبطة بما في سلة العميل أو ما يتصفحه. الهدف زيادة عدد المنتجات لا قيمتها فقط.", descEn: "AI suggests additional products related to what's in the customer's cart or what they're browsing. The goal is to increase product count, not just value.", when: "الأنسب عندما يكون متجرك يبيع منتجات صغيرة مكملة بأسعار منخفضة.", whenEn: "Best when your store sells small complementary products at low prices.", example: "عميل اشترى شامبو → يُقترح عليه بلسم الشعر + ماسك الشعر.", exampleEn: "Customer bought shampoo → suggested conditioner + hair mask.", boost: "+28% متوسط المنتجات في السلة", boostEn: "+28% average products in cart" },
  { id: 2, Icon: Package, title: "عرض الكميات (Buy X Get Y)", titleEn: "Quantity Offers (Buy X Get Y)", subtitle: "تحفيز الشراء بكميات أكبر", subtitleEn: "Encourage buying in larger quantities", color: "#06b6d4", desc: "يعرض النظام خصوماً تدريجية عند شراء كميات أكبر: اشتر 2 واحصل على خصم 10%، اشتر 3 وخصم 20%. يحفز زيادة الكمية لنفس المنتج.", descEn: "The system offers tiered discounts for larger quantities: buy 2 get 10% off, buy 3 get 20% off. Encourages buying more of the same product.", when: "مثالي للمنتجات القابلة للاستهلاك: العطور، المواد الغذائية، مستحضرات التجميل.", whenEn: "Ideal for consumable products: perfumes, food items, cosmetics.", example: "عميل في صفحة مشروب البروتين → يظهر له: 'اشتر 3 واحصل على خصم 15%'.", exampleEn: "Customer on protein drink page → sees: 'Buy 3 and get 15% off'.", boost: "+35% في الكمية المطلوبة", boostEn: "+35% in ordered quantity" },
  { id: 3, Icon: TrendingUp, title: "استبدال المنتج (Upsell)", titleEn: "Product Swap (Upsell)", subtitle: "عرض بديل أعلى قيمة وجودة", subtitleEn: "Show a higher-value, higher-quality alternative", color: "#22c55e", desc: "يقترح النظام نسخة أفضل أو أعلى جودة من المنتج الذي يشاهده العميل. يرفع قيمة الطلب ويقدم تجربة أفضل للعميل.", descEn: "The system suggests a better or higher-quality version of the product the customer is viewing. Raises order value and delivers a better experience.", when: "مفيد جداً عندما يكون لديك فئات متعددة من المنتج: أساسي ومتميز وبريميوم.", whenEn: "Very useful when you have multiple product tiers: basic, premium, and elite.", example: "عميل في صفحة سماعة بسعر 100 ⃁ → يظهر له سماعة بسعر 180 ⃁ بمزايا أفضل.", exampleEn: "Customer on a SAR 100 headphone page → shown a SAR 180 headphone with better features.", boost: "+41% في متوسط قيمة الطلب", boostEn: "+41% in average order value" },
  { id: 4, Icon: Banknote, title: "زيادة قيمة السلة", titleEn: "Increase Cart Value", subtitle: "رفع المبلغ الإجمالي لتجاوز عتبة معينة", subtitleEn: "Raise total amount to cross a specific threshold", color: "#f59e0b", desc: "يعرض منتجات إضافية مختارة ذكياً لمساعدة العميل على تجاوز عتبة الشحن المجاني أو الخصم. 'أضف 30 ⃁ للحصول على شحن مجاني'.", descEn: "Shows smartly selected additional products to help the customer cross the free shipping or discount threshold. 'Add SAR 30 for free shipping'.", when: "ممتاز عندما يكون لديك عتبة للشحن المجاني أو خصم على الطلبات الكبيرة.", whenEn: "Excellent when you have a free shipping threshold or discount on large orders.", example: "سلة بقيمة 170 ⃁ → يقترح منتج بـ35 ⃁ لتصل لـ200 وتحصل على شحن مجاني.", exampleEn: "Cart at SAR 170 → suggests a SAR 35 product to reach 200 and get free shipping.", boost: "+22% من الطلبات تتجاوز عتبة الشحن", boostEn: "+22% of orders exceed shipping threshold" },
  { id: 5, Icon: Tag, title: "إعطاء كود خصم", titleEn: "Discount Code", subtitle: "تحفيز إتمام الشراء بعرض خاص", subtitleEn: "Motivate purchase completion with a special offer", color: "#ec4899", desc: "يولد الذكاء الاصطناعي كوبوناً مخصصاً في اللحظة المناسبة لإقناع العميل المتردد على إتمام الشراء. الكوبون مؤقت ومحدود.", descEn: "AI generates a personalized coupon at the right moment to convince hesitant customers to complete their purchase. The coupon is temporary and limited.", when: "فعّال جداً عند exit intent أو عندما يقضي العميل وقتاً طويلاً في السلة دون شراء.", whenEn: "Very effective on exit intent or when a customer spends too long in the cart without buying.", example: "عميل في السلة منذ 4 دقائق → يظهر له 'خصم 10% لمدة 15 دقيقة فقط'.", exampleEn: "Customer in cart for 4 minutes → sees '10% off for 15 minutes only'.", boost: "-38% في معدل التخلي عن السلة", boostEn: "-38% in cart abandonment rate" },
];

const presentations: {
  Icon: LucideIcon;
  title: string; titleEn: string; color: string;
  desc: string; descEn: string;
  positions: string[]; positionsEn: string[];
  best: string; bestEn: string;
}[] = [
  { Icon: Link2, title: "منتجات ذات صلة", titleEn: "Related Products", color: "#22c55e", desc: "يحلل الذكاء الاصطناعي ما يتصفحه العميل وسلوكه السابق ويقترح منتجات مرتبطة بالموضوع. الأقوى في التأثير لأنه يعكس اهتمامات العميل الحقيقية.", descEn: "AI analyzes customer browsing and past behavior to suggest related products. Most impactful as it reflects the customer's real interests.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة البحث"], positionsEn: ["Product Page", "Home Page", "Search Page"], best: "متاجر الأزياء، الإلكترونيات", bestEn: "Fashion stores, Electronics" },
  { Icon: Plus, title: "إضافات (Add-ons)", titleEn: "Add-ons", color: "#06b6d4", desc: "يقترح منتجات تكمل المنتج الأساسي وتضيف قيمة وظيفية له. عرض طبيعي ومنطقي يشعر العميل أنه يحصل على تجربة أكمل.", descEn: "Suggests products that complement the main product and add functional value. A natural, logical display that makes customers feel they're getting a more complete experience.", positions: ["صفحة المنتج", "السلة", "الدفع"], positionsEn: ["Product Page", "Cart", "Checkout"], best: "الإلكترونيات، الرياضة، العناية", bestEn: "Electronics, Sports, Beauty" },
  { Icon: ShoppingCart, title: "اشتروا مع بعض (BTAT)", titleEn: "Bought Together (BTAT)", color: "#22c55e", desc: "يستند على بيانات تاريخية من آلاف الطلبات ليعرف أي المنتجات يُشترى مجتمعة. 'عملاء اشتروا هذا أيضاً اشتروا...' - اجتماعي وموثوق.", descEn: "Based on historical data from thousands of orders to identify which products are bought together. 'Customers who bought this also bought...' — social and trustworthy.", positions: ["صفحة المنتج", "السلة"], positionsEn: ["Product Page", "Cart"], best: "الطعام، الأزياء، المنزل", bestEn: "Food, Fashion, Home" },
  { Icon: Gift, title: "Combo (حزم ذكية)", titleEn: "Combo (Smart Bundles)", color: "#f59e0b", desc: "يُجمّع منتجين أو أكثر بسعر حزمة خاص يوفر على العميل ويرفع قيمة طلبه. قوي جداً للمنتجات المتكاملة مثل الروتين الكامل أو الطقم الكامل.", descEn: "Bundles two or more products at a special package price that saves the customer money and raises order value. Very powerful for complementary products like full routines or complete sets.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة الفئة"], positionsEn: ["Product Page", "Home Page", "Category Page"], best: "العناية، الأزياء، الغذاء", bestEn: "Beauty, Fashion, Food" },
  { Icon: BarChart3, title: "اشتر أكثر ووفر أكثر", titleEn: "Buy More Save More", color: "#ec4899", desc: "يعرض جدولاً تصاعدياً للخصم مع ازدياد الكمية. يحفز العميل على الشراء أكثر ليستفيد من الخصم الأعلى. فعّال للمنتجات الاستهلاكية.", descEn: "Displays a progressive discount table as quantity increases. Motivates customers to buy more to benefit from higher discounts. Effective for consumable products.", positions: ["صفحة المنتج", "السلة", "Popup"], positionsEn: ["Product Page", "Cart", "Popup"], best: "المواد الغذائية، التجميل", bestEn: "Food products, Cosmetics" },
];

const activities: {
  num: string;
  Icon: LucideIcon;
  title: string; titleEn: string;
  desc: string; descEn: string;
  avail: string[]; availEn: string[];
  tactics: string[]; tacticsEn: string[];
}[] = [
  { num: "1", Icon: FileText, title: "صفحة المنتج", titleEn: "Product Page", desc: "الاقتراح يظهر أسفل أو بجانب المنتج الرئيسي. أعلى معدل ظهور - العميل في مرحلة الاهتمام والتفكير.", descEn: "Suggestions appear below or beside the main product. Highest impression rate — the customer is in the interest and consideration stage.", avail: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"], availEn: ["Starter", "Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Add-ons", "Upsell", "Combo"], tacticsEn: ["Related Products", "Add-ons", "Upsell", "Combo"] },
  { num: "2", Icon: FolderTree, title: "صفحة الفئة", titleEn: "Category Page", desc: "يظهر بين بطاقات المنتجات. يستهدف العميل وهو يتصفح ويقارن - فرصة ذهبية للتوجيه الذكي.", descEn: "Appears between product cards. Targets customers as they browse and compare — a golden opportunity for smart guidance.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Combo", "اشتر أكثر"], tacticsEn: ["Related Products", "Combo", "Buy More"] },
  { num: "3", Icon: ShoppingCart, title: "صفحة السلة", titleEn: "Cart Page", desc: "آخر فرصة قبل الدفع لإضافة منتجات. العميل جاهز للشراء - الاقتراح هنا يرفع قيمة الطلب بشكل مباشر.", descEn: "Last chance before checkout to add products. The customer is ready to buy — suggestions here directly increase order value.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["BTAT", "Add-ons", "كوبون", "زيادة القيمة"], tacticsEn: ["BTAT", "Add-ons", "Coupon", "Value Boost"] },
  { num: "4", Icon: CreditCard, title: "صفحة الدفع (Checkout)", titleEn: "Checkout Page", desc: "اقتراحات خفيفة الوزن في صفحة الدفع لا تشتت التركيز لكنها تضيف قيمة. تحويل عالي لأن العميل ملتزم بالشراء.", descEn: "Lightweight suggestions on the checkout page that don't distract but add value. High conversion because the customer is committed to buying.", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["Add-ons صغيرة", "منتج مكمل واحد"], tacticsEn: ["Small Add-ons", "One complementary product"] },
  { num: "5", Icon: PartyPopper, title: "صفحة الشكر (Post-Purchase)", titleEn: "Thank You Page (Post-Purchase)", desc: "بعد إتمام الشراء مباشرة. العميل راضٍ ومتحمس - أفضل وقت لعرض منتج تكميلي أو دعوته للشراء مرة أخرى.", descEn: "Right after purchase completion. The customer is satisfied and excited — best time to show a complementary product or invite them to buy again.", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["منتج تكميلي", "Upsell للطلب التالي"], tacticsEn: ["Complementary product", "Upsell for next order"] },
  { num: "6", Icon: DoorOpen, title: "نافذة Exit Intent", titleEn: "Exit Intent Popup", desc: "تظهر عند محاولة العميل مغادرة المتجر. الفرصة الأخيرة لإقناعه بالبقاء والشراء.", descEn: "Appears when the customer tries to leave the store. The last chance to convince them to stay and buy.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["كوبون خصم", "عرض محدود الوقت"], tacticsEn: ["Discount coupon", "Limited-time offer"] },
  { num: "7", Icon: Home, title: "الصفحة الرئيسية", titleEn: "Home Page", desc: "يرحّب بالعميل العائد باقتراحات مبنية على آخر زيارته. تجربة مخصصة من أول لحظة في المتجر.", descEn: "Welcomes returning customers with suggestions based on their last visit. A personalized experience from the very first moment in the store.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Combo", "المشتريات السابقة"], tacticsEn: ["Related Products", "Combo", "Past Purchases"] },
  { num: "8", Icon: Search, title: "صفحة البحث", titleEn: "Search Page", desc: "عندما يبحث العميل عن منتج محدد، يظهر له في نتائج البحث توصيات ذكية تكمل بحثه.", descEn: "When a customer searches for a specific product, smart recommendations appear in the search results to complement their search.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "بدائل أفضل"], tacticsEn: ["Related Products", "Better alternatives"] },
  { num: "9", Icon: Megaphone, title: "Popup ذكي", titleEn: "Smart Popup", desc: "يظهر في الوقت المناسب بناءً على سلوك العميل. قوي لكن يُستخدم بحكمة لتجنب الإزعاج.", descEn: "Appears at the right time based on customer behavior. Powerful but used wisely to avoid annoyance.", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["عرض محدود", "Combo خاص", "كوبون"], tacticsEn: ["Limited offer", "Special Combo", "Coupon"] },
];

const usecases: {
  sector: string; sectorEn: string;
  Icon: LucideIcon;
  color: string;
  strategies: string[]; strategiesEn: string[];
  result: string; resultEn: string;
  stores: string; storesEn: string;
}[] = [
  { sector: "الأزياء والموضة", sectorEn: "Fashion & Apparel", Icon: Shirt, color: "#22c55e", strategies: ["تجميع الإطقم الكاملة", "عرض الإكسسوارات المكملة", "Upsell للفئة الأعلى", "كوبون للشراء الأول"], strategiesEn: ["Bundle complete outfits", "Show complementary accessories", "Upsell to premium tier", "First-purchase coupon"], result: "+35% متوسط الطلب", resultEn: "+35% average order value", stores: "+230 متجر", storesEn: "+230 stores" },
  { sector: "الجمال والعناية", sectorEn: "Beauty & Skincare", Icon: Sparkles, color: "#ec4899", strategies: ["روتين العناية الكامل", "تجميع المنتجات المتكاملة", "Buy 3 وفر 20%", "عرض نسخة الحجم الكبير"], strategiesEn: ["Complete skincare routine", "Bundle complementary products", "Buy 3 save 20%", "Show larger size version"], result: "+32% متوسط الطلب", resultEn: "+32% average order value", stores: "+140 متجر", storesEn: "+140 stores" },
  { sector: "الغذاء والمشروبات", sectorEn: "Food & Beverages", Icon: Apple, color: "#f59e0b", strategies: ["حزم التوفير الشهرية", "اشتر أكثر ووفر أكثر", "منتجات مكملة للوجبة", "اشتراكات دورية"], strategiesEn: ["Monthly savings bundles", "Buy more save more", "Meal complementary products", "Recurring subscriptions"], result: "+28% متوسط الطلب", resultEn: "+28% average order value", stores: "+180 متجر", storesEn: "+180 stores" },
  { sector: "الإلكترونيات والتقنية", sectorEn: "Electronics & Technology", Icon: Laptop, color: "#06b6d4", strategies: ["ملحقات الجهاز (Add-ons)", "الحماية والضمان الممتد", "Upsell للموديل الأحدث", "حزمة الإعداد الكامل"], strategiesEn: ["Device accessories (Add-ons)", "Protection & extended warranty", "Upsell to newer model", "Complete setup bundle"], result: "+22% متوسط الطلب", resultEn: "+22% average order value", stores: "+90 متجر", storesEn: "+90 stores" },
  { sector: "المنزل والديكور", sectorEn: "Home & Decor", Icon: Sofa, color: "#22c55e", strategies: ["تجميع مستلزمات الغرفة", "منتجات ذات صلة بالديكور", "Combo للأثاث المتكامل", "خصم الكميات"], strategiesEn: ["Bundle room essentials", "Decor-related products", "Combo for matching furniture", "Volume discounts"], result: "+26% متوسط الطلب", resultEn: "+26% average order value", stores: "+70 متجر", storesEn: "+70 stores" },
  { sector: "الرياضة واللياقة", sectorEn: "Sports & Fitness", Icon: Dumbbell, color: "#6366f1", strategies: ["حزمة المستلزمات الرياضية", "منتجات التغذية + معدات", "روتين التمرين الكامل", "Upsell للإصدار المتميز"], strategiesEn: ["Sports essentials bundle", "Nutrition products + equipment", "Complete workout routine", "Upsell to premium edition"], result: "+30% متوسط الطلب", resultEn: "+30% average order value", stores: "+60 متجر", storesEn: "+60 stores" },
  { sector: "الكتب والتعليم", sectorEn: "Books & Education", Icon: BookOpen, color: "#22c55e", strategies: ["سلسلة الكتب المرتبطة", "المستلزمات الدراسية", "Bundle الكورس + الكتاب", "اشتر 3 واحصل على خصم"], strategiesEn: ["Related book series", "School supplies", "Course + book bundle", "Buy 3 get a discount"], result: "+18% متوسط الطلب", resultEn: "+18% average order value", stores: "+40 متجر", storesEn: "+40 stores" },
  { sector: "التبرعات والخيرية", sectorEn: "Donations & Charity", Icon: HandHeart, color: "#15803d", strategies: ["مشاريع تبرع مكملة", "زيادة مبلغ التبرع", "اشترك تبرعياً شهرياً", "عرض المشاريع ذات الأولوية"], strategiesEn: ["Complementary donation projects", "Increase donation amount", "Monthly donation subscription", "Show priority projects"], result: "+48% متوسط التبرع", resultEn: "+48% average donation", stores: "+40 منظمة", storesEn: "+40 organizations" },
];

/* ─────────────────────────── component ─────────────────────────── */

export default function Features() {
  const [activeTab, setActiveTab] = useState<"goals" | "presentations" | "activities" | "usecases">("goals");
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const t = useSiteT();
  const { lang, isAr, dir } = useLanguage();
  const ft = t[lang].features;
  const ld = t[lang].landing;
  const pk = getPageKeywords("/features");

  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeTab]);

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  } as const;

  const tabs = [
    { id: "goals" as const, label: ft.tabGoals },
    { id: "presentations" as const, label: ft.tabPresentations },
    { id: "activities" as const, label: ft.tabActivities },
    { id: "usecases" as const, label: ft.tabUsecases },
  ];

  return (
    <>
    <SEO
      titleAr={t.ar.features.seoTitle}
      titleEn={t.en.features.seoTitle}
      descriptionAr={t.ar.features.seoDesc}
      descriptionEn={t.en.features.seoDesc}
      canonical="/features"
      keywordsAr={pk?.keywordsAr}
      keywordsEn={pk?.keywordsEn}
    />
    <SoftwareAppSchema />
    <BreadcrumbSchema items={[{ name: ft.breadcrumbHome, url: "/" }, { name: ft.breadcrumbFeatures, url: "/features" }]} />
    <WebPageSchema
      name={lang === "ar" ? t.ar.features.seoTitle : t.en.features.seoTitle}
      description={lang === "ar" ? t.ar.features.seoDesc : t.en.features.seoDesc}
      url="/features"
    />
    <PageShell className="relative overflow-x-clip bg-white" style={{ background: "#fff", color: "#09090b" }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section dir={dir} className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-4 border-b border-zinc-200">
        <div className="absolute inset-0 bg-grid-fade opacity-60 -z-10" style={gridStyle} />
        <div className="container mx-auto relative max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 border border-green-200 mb-6 rv">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-green-700">{ft.heroTag}</span>
          </div>
          <h1
            className="rv d1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mb-6 leading-[1.08]"
            dangerouslySetInnerHTML={{ __html: ft.heroTitle }}
          />
          <p className="rv d2 text-lg text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">{ft.heroSub}</p>

          {/* Tabs */}
          <div className="rv d3 inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-50 border border-zinc-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  activeTab === tab.id
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ GOALS ══════════════════ */}
      {activeTab === "goals" && (
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl flex flex-col gap-6">
            {goals.map((g, i) => {
              const boost = isAr ? g.boost : g.boostEn;
              return (
                <div
                  key={g.id}
                  className={`rv d${(i % 2) + 1} rounded-2xl border border-zinc-200 bg-white p-7 md:p-8 hover:border-zinc-300 hover:shadow-card transition-all`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-950 flex items-center justify-center">
                      <g.Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1">
                        <h3 className="text-xl font-bold text-zinc-950">{isAr ? g.title : g.titleEn}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-green-100 border border-green-200 text-[11px] font-bold text-green-700">
                          {ft.goalLabel} <span className="num-ltr">#{g.id}</span>
                        </span>
                      </div>
                      <div className="text-sm text-zinc-500">{isAr ? g.subtitle : g.subtitleEn}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-green-600 uppercase mb-2">{ft.descLabel}</div>
                      <p className="text-sm text-zinc-600 leading-relaxed">{isAr ? g.desc : g.descEn}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-green-600 uppercase mb-2">{ft.whenLabel}</div>
                      <p className="text-sm text-zinc-600 leading-relaxed">{isAr ? g.when : g.whenEn}</p>
                      <div className="mt-3 rounded-lg bg-zinc-50 border border-zinc-200 p-3.5 text-sm text-zinc-700 leading-relaxed">
                        <span className="font-bold text-green-600">{ft.exampleLabel}</span>{isAr ? g.example : g.exampleEn}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-green-600 uppercase mb-2">{ft.expectedResult}</div>
                      <div className="rounded-xl border border-green-200 bg-green-50/60 p-5 text-center">
                        <div className="text-3xl font-extrabold text-green-600 num-ltr">{boost.split(" ")[0]}</div>
                        <div className="text-xs text-zinc-500 mt-1.5">{boost.substring(boost.indexOf(" ") + 1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══════════════════ PRESENTATIONS ══════════════════ */}
      {activeTab === "presentations" && (
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {presentations.map((p, i) => (
              <div
                key={isAr ? p.title : p.titleEn}
                className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all`}
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-950 flex items-center justify-center">
                    <p.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-zinc-950">{isAr ? p.title : p.titleEn}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{ft.presentationLabel} <span className="num-ltr">#{i + 1}</span></div>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-5">{isAr ? p.desc : p.descEn}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isAr ? p.positions : p.positionsEn).map(pos => (
                    <span key={pos} className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-600">{pos}</span>
                  ))}
                </div>
                <div className="text-xs font-bold text-green-600">{ft.bestFor}{isAr ? p.best : p.bestEn}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════ ACTIVITIES ══════════════════ */}
      {activeTab === "activities" && (
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activities.map((a, i) => (
                <div
                  key={a.num}
                  className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 shrink-0 rounded-lg bg-zinc-950 flex items-center justify-center">
                      <a.Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-zinc-950">{isAr ? a.title : a.titleEn}</div>
                      <div className="text-[11px] font-bold text-green-600">{ft.activityLabel} <span className="num-ltr">{a.num}</span></div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">{isAr ? a.desc : a.descEn}</p>
                  <div className="mb-4">
                    <div className="text-[11px] font-bold text-zinc-500 mb-2">{ft.availableTactics}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? a.tactics : a.tacticsEn).map(tc => (
                        <span key={tc} className="px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-[11px] font-medium text-green-700">{tc}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-zinc-500 mb-2">{ft.availablePlans}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? a.avail : a.availEn).map(pkg => (
                        <span key={pkg} className="px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-medium text-zinc-600">{pkg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Journey map */}
            <div className="rv mt-10 rounded-2xl border border-zinc-200 bg-white p-7 md:p-10 shadow-card">
              <div className="text-center mb-8">
                <div className="text-lg md:text-xl font-bold text-zinc-950">{ft.journeyMapTitle}</div>
                <div className="text-sm text-zinc-500 mt-1.5">{ft.journeyMapSub}</div>
              </div>
              <div className="flex items-center overflow-x-auto pb-2">
                {activities.map((a, i) => (
                  <div key={a.num} className="flex items-center shrink-0">
                    <div className="text-center px-2">
                      <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-2">
                        <a.Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-[11px] font-bold text-zinc-700 whitespace-nowrap max-w-[80px] text-center mx-auto truncate">{isAr ? a.title : a.titleEn}</div>
                    </div>
                    {i < activities.length - 1 && <div className="w-8 h-px bg-gradient-to-r from-emerald-300 to-green-100 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════ USE CASES ══════════════════ */}
      {activeTab === "usecases" && (
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {usecases.map((u, i) => {
              const result = isAr ? u.result : u.resultEn;
              return (
                <div
                  key={isAr ? u.sector : u.sectorEn}
                  className={`rv d${(i % 3) + 1} rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-card transition-all`}
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-950 flex items-center justify-center">
                        <u.Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-zinc-950">{isAr ? u.sector : u.sectorEn}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{isAr ? u.stores : u.storesEn}</div>
                      </div>
                    </div>
                    <div className="shrink-0 text-center rounded-xl border border-green-200 bg-green-50/60 px-3.5 py-2.5">
                      <div className="text-xl font-extrabold text-green-600 num-ltr">{result.split(" ")[0]}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5 whitespace-nowrap">{result.substring(result.indexOf(" ") + 1)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-zinc-500 mb-2.5">{ft.bestStrategies}</div>
                    <div className="flex flex-col gap-2">
                      {(isAr ? u.strategies : u.strategiesEn).map(s => (
                        <div key={s} className="flex items-center gap-2 text-sm text-zinc-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <PageClosingCta
        title={ft.ctaTitle}
        description={ft.ctaSub}
        buttonLabel={ld.ctaBtn}
        onActivate={() => setPlatformModalOpen(true)}
      />
    </PageShell>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
