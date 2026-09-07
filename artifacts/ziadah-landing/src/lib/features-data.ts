/**
 * THE FEATURE REGISTRY — what Ziadah does, as data.
 *
 * These three lists lived inside `pages/Features.tsx`, which meant the only
 * way to read what a capability does was to render the index that lists all
 * of them. A registry gives each one a slug, so it can have a URL and a page
 * of its own, and it makes "every capability is described somewhere" a
 * checkable fact rather than an intention.
 *
 * Three kinds, because a merchant asks three different questions:
 *   goals          WHAT it moves — the number that goes up
 *   presentations  HOW it looks — the shape the suggestion takes
 *   placements     WHERE it appears — the page it shows on
 *
 * Content is unchanged from the page it came out of. Nothing was rewritten in
 * the lift; only `slug` was added.
 */
import {
  Banknote,
  BarChart3,
  CreditCard,
  DoorOpen,
  FileText,
  FolderTree,
  Gift,
  Home,
  Link2,
  type LucideIcon,
  Megaphone,
  Package,
  PartyPopper,
  Plus,
  Search,
  ShoppingCart,
  Tag,
  TrendingUp,
} from "lucide-react";

export type Goal = (typeof goals)[number];
export type Presentation = (typeof presentations)[number];
export type Placement = (typeof placements)[number];

export const goals = [
  { slug: "more-products", id: 1, Icon: ShoppingCart, title: "إضافة المزيد من المنتجات", titleEn: "Add More Products", subtitle: "زيادة عدد المنتجات في كل طلب", subtitleEn: "Increase the number of products per order", color: "#8b5cf6", desc: "يقترح الذكاء الاصطناعي منتجات إضافية مرتبطة بما في سلة العميل أو ما يتصفحه. الهدف زيادة عدد المنتجات لا قيمتها فقط.", descEn: "AI suggests additional products related to what's in the customer's cart or what they're browsing. The goal is to increase product count, not just value.", when: "الأنسب عندما يكون متجرك يبيع منتجات صغيرة مكملة بأسعار منخفضة.", whenEn: "Best when your store sells small complementary products at low prices.", example: "عميل اشترى شامبو → يُقترح عليه بلسم الشعر + ماسك الشعر.", exampleEn: "Customer bought shampoo → suggested conditioner + hair mask.", boost: "+28% متوسط المنتجات في السلة", boostEn: "+28% average products in cart" },
  { slug: "quantity-offers", id: 2, Icon: Package, title: "عرض الكميات (Buy X Get Y)", titleEn: "Quantity Offers (Buy X Get Y)", subtitle: "تحفيز الشراء بكميات أكبر", subtitleEn: "Encourage buying in larger quantities", color: "#06b6d4", desc: "يعرض النظام خصوماً تدريجية عند شراء كميات أكبر: اشتر 2 واحصل على خصم 10%، اشتر 3 وخصم 20%. يحفز زيادة الكمية لنفس المنتج.", descEn: "The system offers tiered discounts for larger quantities: buy 2 get 10% off, buy 3 get 20% off. Encourages buying more of the same product.", when: "مثالي للمنتجات القابلة للاستهلاك: العطور، المواد الغذائية، مستحضرات التجميل.", whenEn: "Ideal for consumable products: perfumes, food items, cosmetics.", example: "عميل في صفحة مشروب البروتين → يظهر له: 'اشتر 3 واحصل على خصم 15%'.", exampleEn: "Customer on protein drink page → sees: 'Buy 3 and get 15% off'.", boost: "+35% في الكمية المطلوبة", boostEn: "+35% in ordered quantity" },
  { slug: "product-swap", id: 3, Icon: TrendingUp, title: "استبدال المنتج (Upsell)", titleEn: "Product Swap (Upsell)", subtitle: "عرض بديل أعلى قيمة وجودة", subtitleEn: "Show a higher-value, higher-quality alternative", color: "#8b5cf6", desc: "يقترح النظام نسخة أفضل أو أعلى جودة من المنتج الذي يشاهده العميل. يرفع قيمة الطلب ويقدم تجربة أفضل للعميل.", descEn: "The system suggests a better or higher-quality version of the product the customer is viewing. Raises order value and delivers a better experience.", when: "مفيد جداً عندما يكون لديك فئات متعددة من المنتج: أساسي ومتميز وبريميوم.", whenEn: "Very useful when you have multiple product tiers: basic, premium, and elite.", example: "عميل في صفحة سماعة بسعر 100 ⃁ → يظهر له سماعة بسعر 180 ⃁ بمزايا أفضل.", exampleEn: "Customer on a SAR 100 headphone page → shown a SAR 180 headphone with better features.", boost: "+41% في متوسط قيمة الطلب", boostEn: "+41% in average order value" },
  { slug: "cart-value", id: 4, Icon: Banknote, title: "زيادة قيمة السلة", titleEn: "Increase Cart Value", subtitle: "رفع المبلغ الإجمالي لتجاوز عتبة معينة", subtitleEn: "Raise total amount to cross a specific threshold", color: "#f59e0b", desc: "يعرض منتجات إضافية مختارة ذكياً لمساعدة العميل على تجاوز عتبة الشحن المجاني أو الخصم. 'أضف 30 ⃁ للحصول على شحن مجاني'.", descEn: "Shows smartly selected additional products to help the customer cross the free shipping or discount threshold. 'Add SAR 30 for free shipping'.", when: "ممتاز عندما يكون لديك عتبة للشحن المجاني أو خصم على الطلبات الكبيرة.", whenEn: "Excellent when you have a free shipping threshold or discount on large orders.", example: "سلة بقيمة 170 ⃁ → يقترح منتج بـ35 ⃁ لتصل لـ200 وتحصل على شحن مجاني.", exampleEn: "Cart at SAR 170 → suggests a SAR 35 product to reach 200 and get free shipping.", boost: "+22% من الطلبات تتجاوز عتبة الشحن", boostEn: "+22% of orders exceed shipping threshold" },
  { slug: "discount-code", id: 5, Icon: Tag, title: "إعطاء كود خصم", titleEn: "Discount Code", subtitle: "تحفيز إتمام الشراء بعرض خاص", subtitleEn: "Motivate purchase completion with a special offer", color: "#ec4899", desc: "يولد الذكاء الاصطناعي كوبوناً مخصصاً في اللحظة المناسبة لإقناع العميل المتردد على إتمام الشراء. الكوبون مؤقت ومحدود.", descEn: "AI generates a personalized coupon at the right moment to convince hesitant customers to complete their purchase. The coupon is temporary and limited.", when: "فعّال جداً عند exit intent أو عندما يقضي العميل وقتاً طويلاً في السلة دون شراء.", whenEn: "Very effective on exit intent or when a customer spends too long in the cart without buying.", example: "عميل في السلة منذ 4 دقائق → يظهر له 'خصم 10% لمدة 15 دقيقة فقط'.", exampleEn: "Customer in cart for 4 minutes → sees '10% off for 15 minutes only'.", boost: "-38% في معدل التخلي عن السلة", boostEn: "-38% in cart abandonment rate" },
];

export const presentations: {
  slug: string;
  Icon: LucideIcon;
  title: string; titleEn: string; color: string;
  desc: string; descEn: string;
  positions: string[]; positionsEn: string[];
  best: string; bestEn: string;
}[] = [
  { slug: "related-products", Icon: Link2, title: "منتجات ذات صلة", titleEn: "Related Products", color: "#8b5cf6", desc: "يحلل الذكاء الاصطناعي ما يتصفحه العميل وسلوكه السابق ويقترح منتجات مرتبطة بالموضوع. الأقوى في التأثير لأنه يعكس اهتمامات العميل الحقيقية.", descEn: "AI analyzes customer browsing and past behavior to suggest related products. Most impactful as it reflects the customer's real interests.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة البحث"], positionsEn: ["Product Page", "Home Page", "Search Page"], best: "متاجر الأزياء، الإلكترونيات", bestEn: "Fashion stores, Electronics" },
  { slug: "add-ons", Icon: Plus, title: "إضافات (Add-ons)", titleEn: "Add-ons", color: "#06b6d4", desc: "يقترح منتجات تكمل المنتج الأساسي وتضيف قيمة وظيفية له. عرض طبيعي ومنطقي يشعر العميل أنه يحصل على تجربة أكمل.", descEn: "Suggests products that complement the main product and add functional value. A natural, logical display that makes customers feel they're getting a more complete experience.", positions: ["صفحة المنتج", "السلة", "الدفع"], positionsEn: ["Product Page", "Cart", "Checkout"], best: "الإلكترونيات، الرياضة، العناية", bestEn: "Electronics, Sports, Beauty" },
  { slug: "bought-together", Icon: ShoppingCart, title: "اشتروا مع بعض (BTAT)", titleEn: "Bought Together (BTAT)", color: "#8b5cf6", desc: "يستند على بيانات تاريخية من آلاف الطلبات ليعرف أي المنتجات يُشترى مجتمعة. 'عملاء اشتروا هذا أيضاً اشتروا...' - اجتماعي وموثوق.", descEn: "Based on historical data from thousands of orders to identify which products are bought together. 'Customers who bought this also bought...' — social and trustworthy.", positions: ["صفحة المنتج", "السلة"], positionsEn: ["Product Page", "Cart"], best: "الطعام، الأزياء، المنزل", bestEn: "Food, Fashion, Home" },
  { slug: "combo", Icon: Gift, title: "Combo (حزم ذكية)", titleEn: "Combo (Smart Bundles)", color: "#f59e0b", desc: "يُجمّع منتجين أو أكثر بسعر حزمة خاص يوفر على العميل ويرفع قيمة طلبه. قوي جداً للمنتجات المتكاملة مثل الروتين الكامل أو الطقم الكامل.", descEn: "Bundles two or more products at a special package price that saves the customer money and raises order value. Very powerful for complementary products like full routines or complete sets.", positions: ["صفحة المنتج", "الصفحة الرئيسية", "صفحة الفئة"], positionsEn: ["Product Page", "Home Page", "Category Page"], best: "العناية، الأزياء، الغذاء", bestEn: "Beauty, Fashion, Food" },
  { slug: "buy-more-save-more", Icon: BarChart3, title: "اشتر أكثر ووفر أكثر", titleEn: "Buy More Save More", color: "#ec4899", desc: "يعرض جدولاً تصاعدياً للخصم مع ازدياد الكمية. يحفز العميل على الشراء أكثر ليستفيد من الخصم الأعلى. فعّال للمنتجات الاستهلاكية.", descEn: "Displays a progressive discount table as quantity increases. Motivates customers to buy more to benefit from higher discounts. Effective for consumable products.", positions: ["صفحة المنتج", "السلة", "Popup"], positionsEn: ["Product Page", "Cart", "Popup"], best: "المواد الغذائية، التجميل", bestEn: "Food products, Cosmetics" },
];

export const placements: {
  slug: string;
  num: string;
  Icon: LucideIcon;
  title: string; titleEn: string;
  desc: string; descEn: string;
  avail: string[]; availEn: string[];
  tactics: string[]; tacticsEn: string[];
}[] = [
  { slug: "product-page", num: "1", Icon: FileText, title: "صفحة المنتج", titleEn: "Product Page", desc: "الاقتراح يظهر أسفل أو بجانب المنتج الرئيسي. أعلى معدل ظهور - العميل في مرحلة الاهتمام والتفكير.", descEn: "Suggestions appear below or beside the main product. Highest impression rate — the customer is in the interest and consideration stage.", avail: ["الانطلاقة", "النمو", "الاحترافية", "الأعمال"], availEn: ["Starter", "Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Add-ons", "Upsell", "Combo"], tacticsEn: ["Related Products", "Add-ons", "Upsell", "Combo"] },
  { slug: "category-page", num: "2", Icon: FolderTree, title: "صفحة الفئة", titleEn: "Category Page", desc: "يظهر بين بطاقات المنتجات. يستهدف العميل وهو يتصفح ويقارن - فرصة ذهبية للتوجيه الذكي.", descEn: "Appears between product cards. Targets customers as they browse and compare — a golden opportunity for smart guidance.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Combo", "اشتر أكثر"], tacticsEn: ["Related Products", "Combo", "Buy More"] },
  { slug: "cart-page", num: "3", Icon: ShoppingCart, title: "صفحة السلة", titleEn: "Cart Page", desc: "آخر فرصة قبل الدفع لإضافة منتجات. العميل جاهز للشراء - الاقتراح هنا يرفع قيمة الطلب بشكل مباشر.", descEn: "Last chance before checkout to add products. The customer is ready to buy — suggestions here directly increase order value.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["BTAT", "Add-ons", "كوبون", "زيادة القيمة"], tacticsEn: ["BTAT", "Add-ons", "Coupon", "Value Boost"] },
  { slug: "checkout-page", num: "4", Icon: CreditCard, title: "صفحة الدفع (Checkout)", titleEn: "Checkout Page", desc: "اقتراحات خفيفة الوزن في صفحة الدفع لا تشتت التركيز لكنها تضيف قيمة. تحويل عالي لأن العميل ملتزم بالشراء.", descEn: "Lightweight suggestions on the checkout page that don't distract but add value. High conversion because the customer is committed to buying.", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["Add-ons صغيرة", "منتج مكمل واحد"], tacticsEn: ["Small Add-ons", "One complementary product"] },
  { slug: "thank-you-page", num: "5", Icon: PartyPopper, title: "صفحة الشكر (Post-Purchase)", titleEn: "Thank You Page (Post-Purchase)", desc: "بعد إتمام الشراء مباشرة. العميل راضٍ ومتحمس - أفضل وقت لعرض منتج تكميلي أو دعوته للشراء مرة أخرى.", descEn: "Right after purchase completion. The customer is satisfied and excited — best time to show a complementary product or invite them to buy again.", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["منتج تكميلي", "Upsell للطلب التالي"], tacticsEn: ["Complementary product", "Upsell for next order"] },
  { slug: "exit-intent", num: "6", Icon: DoorOpen, title: "نافذة Exit Intent", titleEn: "Exit Intent Popup", desc: "تظهر عند محاولة العميل مغادرة المتجر. الفرصة الأخيرة لإقناعه بالبقاء والشراء.", descEn: "Appears when the customer tries to leave the store. The last chance to convince them to stay and buy.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["كوبون خصم", "عرض محدود الوقت"], tacticsEn: ["Discount coupon", "Limited-time offer"] },
  { slug: "home-page", num: "7", Icon: Home, title: "الصفحة الرئيسية", titleEn: "Home Page", desc: "يرحّب بالعميل العائد باقتراحات مبنية على آخر زيارته. تجربة مخصصة من أول لحظة في المتجر.", descEn: "Welcomes returning customers with suggestions based on their last visit. A personalized experience from the very first moment in the store.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "Combo", "المشتريات السابقة"], tacticsEn: ["Related Products", "Combo", "Past Purchases"] },
  { slug: "search-page", num: "8", Icon: Search, title: "صفحة البحث", titleEn: "Search Page", desc: "عندما يبحث العميل عن منتج محدد، يظهر له في نتائج البحث توصيات ذكية تكمل بحثه.", descEn: "When a customer searches for a specific product, smart recommendations appear in the search results to complement their search.", avail: ["النمو", "الاحترافية", "الأعمال"], availEn: ["Growth", "Professional", "Business"], tactics: ["منتجات ذات صلة", "بدائل أفضل"], tacticsEn: ["Related Products", "Better alternatives"] },
  { slug: "smart-popup", num: "9", Icon: Megaphone, title: "Popup ذكي", titleEn: "Smart Popup", desc: "يظهر في الوقت المناسب بناءً على سلوك العميل. قوي لكن يُستخدم بحكمة لتجنب الإزعاج.", descEn: "Appears at the right time based on customer behavior. Powerful but used wisely to avoid annoyance.", avail: ["الاحترافية", "الأعمال"], availEn: ["Professional", "Business"], tactics: ["عرض محدود", "Combo خاص", "كوبون"], tacticsEn: ["Limited offer", "Special Combo", "Coupon"] },
];


/** Every capability in one list, for the index and for route matching. */
export const ALL_FEATURES = [
  ...goals.map((f) => ({ ...f, kind: "goal" as const })),
  ...presentations.map((f) => ({ ...f, kind: "presentation" as const })),
  ...placements.map((f) => ({ ...f, kind: "placement" as const })),
];

export type Feature = (typeof ALL_FEATURES)[number];

export const FEATURE_COUNT = ALL_FEATURES.length;

export function featureBySlug(slug: string): Feature | undefined {
  return ALL_FEATURES.find((f) => f.slug === slug);
}

export function featureHref(f: { slug: string }): string {
  return `/features/${f.slug}`;
}
