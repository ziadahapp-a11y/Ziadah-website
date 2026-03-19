import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import PlatformModal from "../components/PlatformModal";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { SoftwareAppSchema, BreadcrumbSchema } from "../components/JsonLd";
import { useLanguage } from "../i18n/LanguageContext";
import { t } from "../i18n/translations";

const goals = [
  { id: 1, icon: "🛒", title: "إضافة المزيد من المنتجات", titleEn: "Add More Products", subtitle: "زيادة عدد المنتجات في كل طلب", subtitleEn: "Increase the number of products per order", color: "#a855f7", desc: "يقترح الذكاء الاصطناعي منتجات إضافية مرتبطة بما في سلة العميل أو ما يتصفحه. الهدف زيادة عدد المنتجات لا قيمتها فقط.", descEn: "AI suggests additional products related to what's in the customer's cart or what they're browsing. The goal is to increase product count, not just value.", when: "الأنسب عندما يكون متجرك يبيع منتجات صغيرة مكملة بأسعار منخفضة.", whenEn: "Best when your store sells small complementary products at low prices.", example: "عميل اشترى شامبو → يُقترح عليه بلسم الشعر + ماسك الشعر.", exampleEn: "Customer bought shampoo → suggested conditioner + hair mask.", boost: "+28٪ متوسط المنتجات في السلة", boostEn: "+28% average products in cart" },
  { id: 2, icon: "📦", title: "عرض الكميات (Buy X Get Y)", titleEn: "Quantity Offers (Buy X Get Y)", subtitle: "تحفيز الشراء بكميات أكبر", subtitleEn: "Encourage buying in larger quantities", color: "#06b6d4", desc: "يعرض النظام خصوماً تدريجية عند شراء كميات أكبر: اشتر 2 واحصل على خصم 10٪، اشتر 3 وخصم 20٪. يحفز زيادة الكمية لنفس المنتج.", descEn: "The system offers tiered discounts for larger quantities: buy 2 get 10% off, buy 3 get 20% off. Encourages buying more of the same product.", when: "مثالي للمنتجات القابلة للاستهلاك: العطور، المواد الغذائية، مستحضرات التجميل.", whenEn: "Ideal for consumable products: perfumes, food items, cosmetics.", example: "عميل في صفحة مشروب البروتين → يظهر له: 'اشتر 3 واحصل على خصم 15٪'.", exampleEn: "Customer on protein drink page → sees: 'Buy 3 and get 15% off'.", boost: "+35٪ في الكمية المطلوبة", boostEn: "+35% in ordered quantity" },
  { id: 3, icon: "⬆️", title: "استبدال المنتج (Upsell)", titleEn: "Product Swap (Upsell)", subtitle: "عرض بديل أعلى قيمة وجودة", subtitleEn: "Show a higher-value, higher-quality alternative", color: "#10b981", desc: "يقترح النظام نسخة أفضل أو أعلى جودة من المنتج الذي يشاهده العميل. يرفع قيمة الطلب ويقدم تجربة أفضل للعميل.", descEn: "The system suggests a better or higher-quality version of the product the customer is viewing. Raises order value and delivers a better experience.", when: "مفيد جداً عندما يكون لديك فئات متعددة من المنتج: أساسي ومتميز وبريميوم.", whenEn: "Very useful when you have multiple product tiers: basic, premium, and elite.", example: "عميل في صفحة سماعة بسعر 100 ⃁ → يظهر له سماعة بسعر 180 ⃁ بمزايا أفضل.", exampleEn: "Customer on a SAR 100 headphone page → shown a SAR 180 headphone with better features.", boost: "+41٪ في متوسط قيمة الطلب", boostEn: "+41% in average order value" },
  { id: 4, icon: "💰", title: "زيادة قيمة السلة", titleEn: "Increase Cart Value", subtitle: "رفع المبلغ الإجمالي لتجاوز عتبة معينة", subtitleEn: "Raise total amount to cross a specific threshold", color: "#f59e0b", desc: "يعرض منتجات إضافية مختارة ذكياً لمساعدة العميل على تجاوز عتبة الشحن المجاني أو الخصم. 'أضف 30 ⃁ للحصول على شحن مجاني'.", descEn: "Shows smartly selected additional products to help the customer cross the free shipping or discount threshold. 'Add SAR 30 for free shipping'.", when: "ممتاز عندما يكون لديك عتبة للشحن المجاني أو خصم على الطلبات الكبيرة.", whenEn: "Excellent when you have a free shipping threshold or discount on large orders.", example: "سلة بقيمة 170 ⃁ → يقترح منتج بـ35 ⃁ لتصل لـ200 وتحصل على شحن مجاني.", exampleEn: "Cart at SAR 170 → suggests a SAR 35 product to reach 200 and get free shipping.", boost: "+22٪ من الطلبات تتجاوز عتبة الشحن", boostEn: "+22% of orders exceed shipping threshold" },
  { id: 5, icon: "🏷️", title: "إعطاء كود خصم", titleEn: "Discount Code", subtitle: "تحفيز إتمام الشراء بعرض خاص", subtitleEn: "Motivate purchase completion with a special offer", color: "#ec4899", desc: "يولد الذكاء الاصطناعي كوبوناً مخصصاً في اللحظة المناسبة لإقناع العميل المتردد على إتمام الشراء. الكوبون مؤقت ومحدود.", descEn: "AI generates a personalized coupon at the right moment to convince hesitant customers to complete their purchase. The coupon is temporary and limited.", when: "فعّال جداً عند exit intent أو عندما يقضي العميل وقتاً طويلاً في السلة دون شراء.", whenEn: "Very effective on exit intent or when a customer spends too long in the cart without buying.", example: "عميل في السلة منذ 4 دقائق → يظهر له 'خصم 10٪ لمدة 15 دقيقة فقط'.", exampleEn: "Customer in cart for 4 minutes → sees '10% off for 15 minutes only'.", boost: "-38٪ في معدل التخلي عن السلة", boostEn: "-38% in cart abandonment rate" },
];

const presentations = [
  { icon: "🔗", title: "منتجات ذات صلة", titleEn: "Related Products", color: "#a855f7", desc: "يحلل الذكاء الاصطناعي ما يتصفحه العميل وسلوكه السابق ويقترح منتجات مرتبطة بالموضوع. الأقوى في التأثير لأنه يعكس اهتمامات العميل الحقيقية.", descEn: "AI analyzes customer browsing and past behavior to suggest related products. Most impactful as it reflects the customer's real interests.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة البحث"], positionsEn: ["Product Page", "Home Page", "Search Page"], best: "متاجر الأزياء، الإلكترونيات", bestEn: "Fashion stores, Electronics" },
  { icon: "➕", title: "إضافات (Add-ons)", titleEn: "Add-ons", color: "#06b6d4", desc: "يقترح منتجات تكمل المنتج الأساسي وتضيف قيمة وظيفية له. عرض طبيعي ومنطقي يشعر العميل أنه يحصل على تجربة أكمل.", descEn: "Suggests products that complement the main product and add functional value. A natural, logical display that makes customers feel they're getting a more complete experience.", positions: ["صفحة المنتج", "السلة", "الدفع"], positionsEn: ["Product Page", "Cart", "Checkout"], best: "الإلكترونيات، الرياضة، العناية", bestEn: "Electronics, Sports, Beauty" },
  { icon: "🛒", title: "اشتروا مع بعض (BTAT)", titleEn: "Bought Together (BTAT)", color: "#10b981", desc: "يستند على بيانات تاريخية من آلاف الطلبات ليعرف أي المنتجات يُشترى مجتمعة. 'عملاء اشتروا هذا أيضاً اشتروا...' - اجتماعي وموثوق.", descEn: "Based on historical data from thousands of orders to identify which products are bought together. 'Customers who bought this also bought...' — social and trustworthy.", positions: ["صفحة المنتج", "السلة"], positionsEn: ["Product Page", "Cart"], best: "الطعام، الأزياء، المنزل", bestEn: "Food, Fashion, Home" },
  { icon: "🎁", title: "Combo (حزم ذكية)", titleEn: "Combo (Smart Bundles)", color: "#f59e0b", desc: "يُجمّع منتجين أو أكثر بسعر حزمة خاص يوفر على العميل ويرفع قيمة طلبه. قوي جداً للمنتجات المتكاملة مثل الروتين الكامل أو الطقم الكامل.", descEn: "Bundles two or more products at a special package price that saves the customer money and raises order value. Very powerful for complementary products like full routines or complete sets.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة الفئة"], positionsEn: ["Product Page", "Home Page", "Category Page"], best: "العناية، الأزياء، الغذاء", bestEn: "Beauty, Fashion, Food" },
  { icon: "📊", title: "اشتر أكثر ووفر أكثر", titleEn: "Buy More Save More", color: "#ec4899", desc: "يعرض جدولاً تصاعدياً للخصم مع ازدياد الكمية. يحفز العميل على الشراء أكثر ليستفيد من الخصم الأعلى. فعّال للمنتجات الاستهلاكية.", descEn: "Displays a progressive discount table as quantity increases. Motivates customers to buy more to benefit from higher discounts. Effective for consumable products.", positions: ["صفحة المنتج", "السلة", "Popup"], positionsEn: ["Product Page", "Cart", "Popup"], best: "المواد الغذائية، التجميل", bestEn: "Food products, Cosmetics" },
];

const activities = [
  { num: "1", title: "صفحة المنتج", titleEn: "Product Page", desc: "الاقتراح يظهر أسفل أو بجانب المنتج الرئيسي. أعلى معدل ظهور - العميل في مرحلة الاهتمام والتفكير.", descEn: "Suggestions appear below or beside the main product. Highest impression rate — the customer is in the interest and consideration stage.", icon: "📄", avail: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"], availEn: ["Starter", "Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Add-ons", "Upsell", "Combo"], tacticsEn: ["Related Products", "Add-ons", "Upsell", "Combo"] },
  { num: "2", title: "صفحة الفئة", titleEn: "Category Page", desc: "يظهر بين بطاقات المنتجات. يستهدف العميل وهو يتصفح ويقارن - فرصة ذهبية للتوجيه الذكي.", descEn: "Appears between product cards. Targets customers as they browse and compare — a golden opportunity for smart guidance.", icon: "📁", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Combo", "اشتر أكثر"], tacticsEn: ["Related Products", "Combo", "Buy More"] },
  { num: "3", title: "صفحة السلة", titleEn: "Cart Page", desc: "آخر فرصة قبل الدفع لإضافة منتجات. العميل جاهز للشراء - الاقتراح هنا يرفع قيمة الطلب بشكل مباشر.", descEn: "Last chance before checkout to add products. The customer is ready to buy — suggestions here directly increase order value.", icon: "🛒", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["BTAT", "Add-ons", "كوبون", "زيادة القيمة"], tacticsEn: ["BTAT", "Add-ons", "Coupon", "Value Boost"] },
  { num: "4", title: "صفحة الدفع (Checkout)", titleEn: "Checkout Page", desc: "اقتراحات خفيفة الوزن في صفحة الدفع لا تشتت التركيز لكنها تضيف قيمة. تحويل عالي لأن العميل ملتزم بالشراء.", descEn: "Lightweight suggestions on the checkout page that don't distract but add value. High conversion because the customer is committed to buying.", icon: "💳", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["Add-ons صغيرة", "منتج مكمل واحد"], tacticsEn: ["Small Add-ons", "One complementary product"] },
  { num: "5", title: "صفحة الشكر (Post-Purchase)", titleEn: "Thank You Page (Post-Purchase)", desc: "بعد إتمام الشراء مباشرة. العميل راضٍ ومتحمس - أفضل وقت لعرض منتج تكميلي أو دعوته للشراء مرة أخرى.", descEn: "Right after purchase completion. The customer is satisfied and excited — best time to show a complementary product or invite them to buy again.", icon: "🎉", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["منتج تكميلي", "Upsell للطلب التالي"], tacticsEn: ["Complementary product", "Upsell for next order"] },
  { num: "6", title: "نافذة Exit Intent", titleEn: "Exit Intent Popup", desc: "تظهر عند محاولة العميل مغادرة المتجر. الفرصة الأخيرة لإقناعه بالبقاء والشراء.", descEn: "Appears when the customer tries to leave the store. The last chance to convince them to stay and buy.", icon: "🚪", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["كوبون خصم", "عرض محدود الوقت"], tacticsEn: ["Discount coupon", "Limited-time offer"] },
  { num: "7", title: "الصفحة الرئيسية", titleEn: "Home Page", desc: "يرحّب بالعميل العائد باقتراحات مبنية على آخر زيارته. تجربة مخصصة من أول لحظة في المتجر.", descEn: "Welcomes returning customers with suggestions based on their last visit. A personalized experience from the very first moment in the store.", icon: "🏠", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Combo", "المشتريات السابقة"], tacticsEn: ["Related Products", "Combo", "Past Purchases"] },
  { num: "8", title: "صفحة البحث", titleEn: "Search Page", desc: "عندما يبحث العميل عن منتج محدد، يظهر له في نتائج البحث توصيات ذكية تكمل بحثه.", descEn: "When a customer searches for a specific product, smart recommendations appear in the search results to complement their search.", icon: "🔍", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "بدائل أفضل"], tacticsEn: ["Related Products", "Better alternatives"] },
  { num: "9", title: "Popup ذكي", titleEn: "Smart Popup", desc: "يظهر في الوقت المناسب بناءً على سلوك العميل. قوي لكن يُستخدم بحكمة لتجنب الإزعاج.", descEn: "Appears at the right time based on customer behavior. Powerful but used wisely to avoid annoyance.", icon: "📢", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["عرض محدود", "Combo خاص", "كوبون"], tacticsEn: ["Limited offer", "Special Combo", "Coupon"] },
];

const usecases = [
  { sector: "الأزياء والموضة", sectorEn: "Fashion & Apparel", icon: "👗", color: "#a855f7", strategies: ["تجميع الإطقم الكاملة", "عرض الإكسسوارات المكملة", "Upsell للفئة الأعلى", "كوبون للشراء الأول"], strategiesEn: ["Bundle complete outfits", "Show complementary accessories", "Upsell to premium tier", "First-purchase coupon"], result: "+35٪ متوسط الطلب", resultEn: "+35% average order value", stores: "+230 متجر", storesEn: "+230 stores" },
  { sector: "الجمال والعناية", sectorEn: "Beauty & Skincare", icon: "💄", color: "#ec4899", strategies: ["روتين العناية الكامل", "تجميع المنتجات المتكاملة", "Buy 3 وفر 20٪", "عرض نسخة الحجم الكبير"], strategiesEn: ["Complete skincare routine", "Bundle complementary products", "Buy 3 save 20%", "Show larger size version"], result: "+32٪ متوسط الطلب", resultEn: "+32% average order value", stores: "+140 متجر", storesEn: "+140 stores" },
  { sector: "الغذاء والمشروبات", sectorEn: "Food & Beverages", icon: "🍯", color: "#f59e0b", strategies: ["حزم التوفير الشهرية", "اشتر أكثر ووفر أكثر", "منتجات مكملة للوجبة", "اشتراكات دورية"], strategiesEn: ["Monthly savings bundles", "Buy more save more", "Meal complementary products", "Recurring subscriptions"], result: "+28٪ متوسط الطلب", resultEn: "+28% average order value", stores: "+180 متجر", storesEn: "+180 stores" },
  { sector: "الإلكترونيات والتقنية", sectorEn: "Electronics & Technology", icon: "💻", color: "#06b6d4", strategies: ["ملحقات الجهاز (Add-ons)", "الحماية والضمان الممتد", "Upsell للموديل الأحدث", "حزمة الإعداد الكامل"], strategiesEn: ["Device accessories (Add-ons)", "Protection & extended warranty", "Upsell to newer model", "Complete setup bundle"], result: "+22٪ متوسط الطلب", resultEn: "+22% average order value", stores: "+90 متجر", storesEn: "+90 stores" },
  { sector: "المنزل والديكور", sectorEn: "Home & Decor", icon: "🏠", color: "#10b981", strategies: ["تجميع مستلزمات الغرفة", "منتجات ذات صلة بالديكور", "Combo للأثاث المتكامل", "خصم الكميات"], strategiesEn: ["Bundle room essentials", "Decor-related products", "Combo for matching furniture", "Volume discounts"], result: "+26٪ متوسط الطلب", resultEn: "+26% average order value", stores: "+70 متجر", storesEn: "+70 stores" },
  { sector: "الرياضة واللياقة", sectorEn: "Sports & Fitness", icon: "🏋️", color: "#4f46e5", strategies: ["حزمة المستلزمات الرياضية", "منتجات التغذية + معدات", "روتين التمرين الكامل", "Upsell للإصدار المتميز"], strategiesEn: ["Sports essentials bundle", "Nutrition products + equipment", "Complete workout routine", "Upsell to premium edition"], result: "+30٪ متوسط الطلب", resultEn: "+30% average order value", stores: "+60 متجر", storesEn: "+60 stores" },
  { sector: "الكتب والتعليم", sectorEn: "Books & Education", icon: "📚", color: "#8b5cf6", strategies: ["سلسلة الكتب المرتبطة", "المستلزمات الدراسية", "Bundle الكورس + الكتاب", "اشتر 3 واحصل على خصم"], strategiesEn: ["Related book series", "School supplies", "Course + book bundle", "Buy 3 get a discount"], result: "+18٪ متوسط الطلب", resultEn: "+18% average order value", stores: "+40 متجر", storesEn: "+40 stores" },
  { sector: "التبرعات والخيرية", sectorEn: "Donations & Charity", icon: "🤲", color: "#059669", strategies: ["مشاريع تبرع مكملة", "زيادة مبلغ التبرع", "اشترك تبرعياً شهرياً", "عرض المشاريع ذات الأولوية"], strategiesEn: ["Complementary donation projects", "Increase donation amount", "Monthly donation subscription", "Show priority projects"], result: "+48٪ متوسط التبرع", resultEn: "+48% average donation", stores: "+40 منظمة", storesEn: "+40 organizations" },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState<"goals" | "presentations" | "activities" | "usecases">("goals");
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const { lang, dir, isAr } = useLanguage();
  const ft = t[lang].features;

  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
    <SEO
      title={ft.seoTitle}
      description={ft.seoDesc}
      canonical="/features"
    />
    <SoftwareAppSchema />
    <BreadcrumbSchema items={[{ name: ft.breadcrumbHome, url: "/" }, { name: ft.breadcrumbFeatures, url: "/features" }]} />
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: dir, color: "var(--t)" }}>
      <div className="bg-wrap">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="bg-grid"/>
      </div>
      <div className="noise"/>
      <ParticleBackground />
      <Nav />

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 56, textAlign: "center", position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>{ft.heroTag}</div>
        <h1 className="st rv d1" style={{ fontSize: "clamp(38px,5vw,64px)", marginTop: 8 }} dangerouslySetInnerHTML={{ __html: ft.heroTitle }} />
        <p className="ssub rv d2" style={{ margin: "0 auto 48px" }}>{ft.heroSub}</p>

        {/* Tabs */}
        <div className="feat-tabs rv d3" style={{ display: "inline-flex", gap: 4, padding: 4, background: "var(--s1)", border: "1px solid var(--b1)", borderRadius: 16, backdropFilter: "blur(20px)" }}>
          {[
            { id: "goals" as const, label: ft.tabGoals },
            { id: "presentations" as const, label: ft.tabPresentations },
            { id: "activities" as const, label: ft.tabActivities },
            { id: "usecases" as const, label: ft.tabUsecases },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: activeTab === tab.id ? "rgba(124,58,237,.2)" : "transparent", color: activeTab === tab.id ? "var(--p)" : "var(--tm)", fontFamily: "var(--font)", fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 500, cursor: "pointer", transition: "all .25s", borderColor: activeTab === tab.id ? "rgba(124,58,237,.4)" : "transparent", outline: activeTab === tab.id ? "1px solid rgba(124,58,237,.3)" : "none" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* GOALS */}
      {activeTab === "goals" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
            {goals.map((g, i) => (
              <div key={g.id} className={`gc rv d${(i%2)+1}`} style={{ padding: 0, overflow: "hidden" }}>
                <div className="shine"/>
                <div className="feat-goals-outer" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto" }}>
                  <div style={{ width: 8, background: g.color, opacity: 0.7 }}/>
                  <div style={{ padding: "32px 36px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                      <div style={{ fontSize: 36, lineHeight: 1 }}>{g.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                          <h3 style={{ fontSize: 20, fontWeight: 900 }}>{isAr ? g.title : g.titleEn}</h3>
                          <span style={{ padding: "2px 10px", borderRadius: 50, background: `rgba(168,85,247,.1)`, border: `1px solid rgba(168,85,247,.2)`, fontSize: 11, color: g.color, fontWeight: 700 }}>{ft.goalLabel} #{g.id}</span>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--td)" }}>{isAr ? g.subtitle : g.subtitleEn}</div>
                      </div>
                    </div>
                    <div className="feat-goals-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{ft.descLabel}</div>
                        <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7 }}>{isAr ? g.desc : g.descEn}</p>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{ft.whenLabel}</div>
                        <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7 }}>{isAr ? g.when : g.whenEn}</p>
                        <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(0,0,0,.25)", borderRadius: 10, fontSize: 13, color: "var(--tm)", lineHeight: 1.6 }}>
                          <span style={{ color: g.color, fontWeight: 700 }}>{ft.exampleLabel}</span>{isAr ? g.example : g.exampleEn}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--td)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{ft.expectedResult}</div>
                        <div style={{ padding: "16px 20px", background: `rgba(168,85,247,.08)`, border: `1px solid rgba(168,85,247,.2)`, borderRadius: 12, textAlign: "center" }}>
                          {(() => { const boost = isAr ? g.boost : g.boostEn; return (<><div style={{ fontSize: 28, fontWeight: 900, color: g.color }}>{boost.split(" ")[0]}</div><div style={{ fontSize: 12, color: "var(--td)", marginTop: 4 }}>{boost.substring(boost.indexOf(" ") + 1)}</div></>); })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRESENTATIONS */}
      {activeTab === "presentations" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div className="feat-presentations-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {presentations.map((p, i) => (
              <div key={isAr ? p.title : p.titleEn} className={`gc rv d${(i%2)+1}`} style={{ padding: "36px 32px" }}>
                <div className="shine"/>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `rgba(168,85,247,.1)`, border: "1px solid rgba(168,85,247,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{isAr ? p.title : p.titleEn}</div>
                    <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{ft.presentationLabel} #{i + 1}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.75, marginBottom: 20 }}>{isAr ? p.desc : p.descEn}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {(isAr ? p.positions : p.positionsEn).map(pos => (
                    <span key={pos} style={{ padding: "4px 12px", borderRadius: 50, background: "rgba(0,0,0,.3)", border: "1px solid var(--b1)", fontSize: 12, color: "var(--td)" }}>{pos}</span>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: p.color, fontWeight: 700 }}>{ft.bestFor}{isAr ? p.best : p.bestEn}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACTIVITIES */}
      {activeTab === "activities" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="feat-activities-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 48 }}>
              {activities.map((a, i) => (
                <div key={a.num} className={`gc rv d${(i%3)+1}`} style={{ padding: "28px 24px" }}>
                  <div className="shine"/>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{a.icon}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800 }}>{isAr ? a.title : a.titleEn}</div>
                      <div style={{ fontSize: 11, color: "var(--p3)", fontWeight: 700 }}>{ft.activityLabel} {a.num}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--tm)", lineHeight: 1.7, marginBottom: 14 }}>{isAr ? a.desc : a.descEn}</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: "var(--td)", fontWeight: 700, marginBottom: 6 }}>{ft.availableTactics}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {(isAr ? a.tactics : a.tacticsEn).map(tc => (
                        <span key={tc} style={{ padding: "3px 9px", borderRadius: 50, background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.18)", fontSize: 11, color: "#06b6d4" }}>{tc}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--td)", fontWeight: 700, marginBottom: 6 }}>{ft.availablePlans}</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {(isAr ? a.avail : a.availEn).map(pkg => (
                        <span key={pkg} style={{ padding: "3px 9px", borderRadius: 50, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.18)", fontSize: 11, color: "var(--p3)" }}>{pkg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Journey map */}
            <div className="gc rv" style={{ padding: "36px 40px" }}>
              <div className="shine"/>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{ft.journeyMapTitle}</div>
                <div style={{ fontSize: 13, color: "var(--td)", marginTop: 6 }}>{ft.journeyMapSub}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
                {activities.map((a, i) => (
                  <div key={a.num} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ textAlign: "center", padding: "0 8px" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(124,58,237,.14)", border: "1px solid rgba(124,58,237,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto 8px" }}>{a.icon}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", maxWidth: 70, textAlign: "center", margin: "0 auto" }}>{isAr ? a.title : a.titleEn}</div>
                    </div>
                    {i < activities.length - 1 && <div style={{ width: 30, height: 1, background: "linear-gradient(90deg,rgba(124,58,237,.5),rgba(6,182,212,.5))", flexShrink: 0 }}/>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USE CASES */}
      {activeTab === "usecases" && (
        <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
          <div className="feat-usecases-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
            {usecases.map((u, i) => (
              <div key={isAr ? u.sector : u.sectorEn} className={`gc rv d${(i%2)+1}`} style={{ padding: "32px 28px" }}>
                <div className="shine"/>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 36 }}>{u.icon}</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{isAr ? u.sector : u.sectorEn}</div>
                      <div style={{ fontSize: 12, color: "var(--td)", marginTop: 2 }}>{isAr ? u.stores : u.storesEn}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center", padding: "10px 16px", background: `rgba(168,85,247,.08)`, border: "1px solid rgba(168,85,247,.2)", borderRadius: 12, flexShrink: 0 }}>
                    {(() => { const result = isAr ? u.result : u.resultEn; return (<><div style={{ fontSize: 22, fontWeight: 900, color: u.color }}>{result.split(" ")[0]}</div><div style={{ fontSize: 11, color: "var(--td)", marginTop: 2, whiteSpace: "nowrap" }}>{result.substring(result.indexOf(" ") + 1)}</div></>); })()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--td)", fontWeight: 700, marginBottom: 10 }}>{ft.bestStrategies}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {(isAr ? u.strategies : u.strategiesEn).map(s => (
                      <div key={s} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--tm)", alignItems: "center" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: u.color, flexShrink: 0 }}/>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="gc cta-box rv" style={{ padding: "72px 56px" }}>
            <div className="shine"/><div className="cta-glow"/>
            <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 900, marginBottom: 16, position: "relative", zIndex: 1 }}>{ft.ctaTitle}</h2>
            <p style={{ color: "var(--tm)", marginBottom: 36, position: "relative", zIndex: 1 }}>{ft.ctaSub}</p>
            <div className="cta-btns">
              <button onClick={() => setPlatformModalOpen(true)} className="cta-btn cb-zid" style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff"/></svg>{ft.ctaBtn}</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
