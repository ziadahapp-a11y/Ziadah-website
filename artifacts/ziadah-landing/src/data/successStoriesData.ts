/** Shared success story catalog (Arabic source + English overlays). */

export type StoryData = {
  slug: string;
  store: string;
  sector: string;
  logo: string;
  color: string;
  accent: string;
  challenge: string;
  strategy: string;
  popupType: string;
  conversions: string;
  sales: string;
  url?: string;
  logoUrl?: string;
};

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const stories: StoryData[] = [
  {
    slug: "ribal",
    url: "https://ribalpower.sa",
    logoUrl: favicon("ribalpower.sa"),
    store: "متجر ريبال",
    sector: "مستلزمات التنظيف",
    logo: "ر",
    color: "linear-gradient(135deg,#7c3aed,#6d28d9)",
    accent: "#7c3aed",
    challenge: "استهداف العميل لإتمام طلبه بعرض محفز وبسيط لتقليل السلات المتروكة",
    strategy: "تفعيل نوافذ تسويقية تحفز العميل للطلب عند إضافة منتج للسلة أو بدء الطلب",
    popupType: "Cart Incentive Coupon",
    conversions: "151,507",
    sales: "1,024,379",
  },
  {
    slug: "zona",
    url: "https://zonastore.com",
    logoUrl: favicon("zonastore.com"),
    store: "متجر زونا",
    sector: "منتجات البشرة",
    logo: "ز",
    color: "linear-gradient(135deg,#ec4899,#be185d)",
    accent: "#ec4899",
    challenge: "تحسين تجربة العميل باختيار منتج مجاني عند الشراء",
    strategy: "تفعيل نوافذ تسويقية تحفز العميل لاختيار المنتج الإضافي مجانًا عند إضافة منتج للسلة",
    popupType: "Gift with Purchase",
    conversions: "1,693",
    sales: "224,310",
  },
  {
    slug: "al-tamimi",
    url: "https://altamimitex.net",
    logoUrl: favicon("altamimitex.net"),
    store: "متجر التميمي",
    sector: "الأقمشة الرجالية",
    logo: "ت",
    color: "linear-gradient(135deg,#0d9488,#134e4a)",
    accent: "#14b8a6",
    challenge: "رفع معدل المبيعات للمنتجات الشتوية الجديدة وزيادة حجم السلة الشرائية لكل عميل",
    strategy: "تفعيل حدث إضافة منتج للسلة مع الترويج لمنتجات الموسم عبر نوافذ ذكية تقترح قطعًا إضافية",
    popupType: "Seasonal Upsell",
    conversions: "3,774",
    sales: "932,517",
  },
  {
    slug: "best-clean",
    url: "https://bestcleansa.com",
    logoUrl: favicon("bestcleansa.com"),
    store: "متجر بست كلين",
    sector: "مستلزمات التنظيف",
    logo: "ب",
    color: "linear-gradient(135deg,#06b6d4,#0891b2)",
    accent: "#06b6d4",
    challenge: "كثرة الطلبات على منتج واحد دون تصفح بقية المنتجات بالمتجر",
    strategy: "تفعيل نوافذ تسويقية تحفز العميل بالشراء عند إضافة منتج للسلة وعرض منتجات مكملة",
    popupType: "Bundle Offer",
    conversions: "6,409",
    sales: "703,601",
  },
  {
    slug: "dethar-abayas",
    url: "https://dethar-abaya.com",
    logoUrl: favicon("dethar-abaya.com"),
    store: "متجر دثار للعبايات",
    sector: "عبايات الحج واللباس المحتشم",
    logo: "د",
    color: "linear-gradient(135deg,#059669,#064e3b)",
    accent: "#059669",
    challenge: "العديد من الزوار يدخلون الصفحة الرئيسية دون إتمام عملية الشراء",
    strategy: "تفعيل نافذة تسويقية تظهر مباشرة على الصفحة الرئيسية تبرز الخصم وميزة الشحن المجاني",
    popupType: "Homepage Popup",
    conversions: "388",
    sales: "73,763",
  },
  {
    slug: "close-buy",
    url: "https://closebuy.sa",
    logoUrl: favicon("closebuy.sa"),
    store: "متجر كلوس باي",
    sector: "متجر إلكتروني متنوع",
    logo: "ك",
    color: "linear-gradient(135deg,#06b6d4,#0891b2)",
    accent: "#06b6d4",
    challenge: "إقناع العملاء بإتمام الطلب وكثير منهم كانوا يتركون السلة بدون شراء",
    strategy: "تفعيل حملة لاتفوت كود خصم 5% عبر نافذة ذكية تظهر في الوقت المناسب",
    popupType: "Discount Popup",
    conversions: "716",
    sales: "543,000",
  },
  {
    slug: "dukhoon-emaratia",
    url: "https://dkhoonemirates.com",
    logoUrl: favicon("dkhoonemirates.com"),
    store: "متجر دخون الإماراتية",
    sector: "العود والبخور",
    logo: "خ",
    color: "linear-gradient(135deg,#4f46e5,#4338ca)",
    accent: "#4f46e5",
    challenge: "زيادة حجم الطلب بخصم تحفيزي على منتجات تكميلية لرفع قيمة السلة",
    strategy: "تفعيل نوافذ تسويقية بهدف إضافة المنتجات المقترحة بخصم إضافي عند إضافة منتج للسلة",
    popupType: "Upsell / Cross-sell",
    conversions: "110",
    sales: "14,139",
  },
  {
    slug: "moknah",
    // Low-confidence match — trymoknh.com sells health supplements, may not be the same store. Verify.
    url: "https://trymoknh.com",
    logoUrl: favicon("trymoknh.com"),
    store: "متجر مُكنة",
    sector: "منتجات البشرة",
    logo: "م",
    color: "linear-gradient(135deg,#ec4899,#be185d)",
    accent: "#ec4899",
    challenge: "زيادة حجم الطلب بإضافة الحبة الثانية بخصم تحفيزي لرفع متوسط قيمة السلة",
    strategy: "تفعيل نوافذ تسويقية بهدف زيادة عبوة أخرى من المنتج نفسه عند إضافة منتج للسلة",
    popupType: "Buy More Save More",
    conversions: "982",
    sales: "238,676",
  },
  {
    slug: "skinly",
    url: "https://skin-ly.com",
    logoUrl: favicon("skin-ly.com"),
    store: "متجر skinly",
    sector: "مستحضرات العناية بالبشرة",
    logo: "s",
    color: "linear-gradient(135deg,#f472b6,#db2777)",
    accent: "#ec4899",
    challenge: "استغلال موسم الجمعة البيضاء وزيادة المبيعات بأكبر شكل ممكن خلال الفترة",
    strategy: "تفعيل حدث الإضافة للسلة وإطلاق حملة خصومات وعروض على منتجات متكاملة",
    popupType: "Seasonal Discount Campaign",
    conversions: "86",
    sales: "50,641",
  },
  {
    slug: "fabian",
    url: "https://fabian.sa",
    logoUrl: favicon("fabian.sa"),
    store: "متجر فابيان",
    sector: "عطور",
    logo: "ف",
    color: "linear-gradient(135deg,#a855f7,#7c3aed)",
    accent: "#a855f7",
    challenge: "العميل يضيف المنتج للسلة لكنه لا يكمل الشراء مما يتسبب في ضياع فرص البيع",
    strategy: "تفعيل نوافذ تسويقية بهدف إضافة منتج للسلة لحفز العميل على إكمال الشراء",
    popupType: "Add to Cart Incentive",
    conversions: "1,086",
    sales: "136,871",
  },
  {
    slug: "abaq-alghaim",
    url: "https://abaqstoresa.com",
    logoUrl: favicon("abaqstoresa.com"),
    store: "متجر عبق الغيم",
    sector: "عطور",
    logo: "ع",
    color: "linear-gradient(135deg,#f59e0b,#d97706)",
    accent: "#f59e0b",
    challenge: "حذف الكثير من المنتجات من السلة قبل إتمام الشراء مما يسبب فقدان عدد كبير من الطلبات المحتملة",
    strategy: "تفعيل حدث حذف منتج من السلة وإطلاق حملة ذكية بكود خصم يذكّر العميل ويحفزه على الرجوع وإكمال الطلب",
    popupType: "Cart Abandonment Recovery",
    conversions: "1,122",
    sales: "248,816",
  },
  {
    slug: "honey-duz",
    url: "https://honeydose.sa",
    logoUrl: favicon("honeydose.sa"),
    store: "متجر هني دوز",
    sector: "عسل طبيعي",
    logo: "ه",
    color: "linear-gradient(135deg,#f59e0b,#92400e)",
    accent: "#f59e0b",
    challenge: "انخفاض معدل إتمام الطلب عند اختيار عبوة واحدة فقط مما يقلل من حجم السلة الشرائية",
    strategy: "تفعيل نافذة تسويقية تقدم عرض 2+1 مجانًا مع إبراز قيمة العرض وتشجيع العميل على الاستفادة",
    popupType: "Buy 2 Get 1 Free",
    conversions: "2,458",
    sales: "165,650",
  },
  {
    slug: "quran-society-khamis-mushait",
    url: "https://nabaa.org.sa",
    logoUrl: favicon("nabaa.org.sa"),
    store: "جمعية تحفيظ القرآن - خميس مشيط",
    sector: "موقع التبرعات الإلكترونية",
    logo: "ق",
    color: "linear-gradient(135deg,#6366f1,#4f46e5)",
    accent: "#6366f1",
    challenge: "ضعف التفاعل مع حملات التبرع الإلكتروني وقلة التبرعات المكتملة عبر الموقع",
    strategy: "تفعيل نوافذ تسويقية تظهر برسائل مؤثرة أثناء التصفح وتشجع المتبرع على التبرع فورًا",
    popupType: "Donation Nudge Popup",
    conversions: "16,831",
    sales: "33,229",
  },
];

export const storyEn: Record<
  string,
  {
    store: string;
    sector: string;
    challenge: string;
    strategy: string;
    popupType: string;
  }
> = {
  "متجر ريبال": {
    store: "Ribal Store",
    sector: "Cleaning supplies",
    challenge: "Nudge customers to complete orders with a simple motivating offer and fewer abandoned carts",
    strategy: "Marketing popups that trigger when a product is added to cart or checkout starts",
    popupType: "Cart Incentive Coupon",
  },
  "متجر زونا": {
    store: "Zona Store",
    sector: "Skincare products",
    challenge: "Improve the experience by letting customers choose a free product with purchase",
    strategy: "Popups that prompt a free additional product when adding an item to cart",
    popupType: "Gift with Purchase",
  },
  "متجر التميمي": {
    store: "Al-Tamimi Store",
    sector: "Men's fabrics",
    challenge: "Grow winter collection sales and increase average basket size per customer",
    strategy: "Add-to-cart event with seasonal smart popups suggesting complementary pieces",
    popupType: "Seasonal Upsell",
  },
  "متجر بست كلين": {
    store: "Best Clean Store",
    sector: "Cleaning supplies",
    challenge: "Many orders for one product without browsing the rest of the catalog",
    strategy: "Popups on add-to-cart that motivate purchase and show complementary products",
    popupType: "Bundle Offer",
  },
  "متجر دثار للعبايات": {
    store: "Dethar Abayas",
    sector: "Hajj abayas & modest wear",
    challenge: "Many homepage visitors leave without completing a purchase",
    strategy: "Homepage popup highlighting discount and free shipping",
    popupType: "Homepage Popup",
  },
  "متجر كلوس باي": {
    store: "Close Buy Store",
    sector: "General e-commerce",
    challenge: "Customers abandoning carts instead of completing checkout",
    strategy: "“Don't miss the 5% code” campaign via a smart well-timed popup",
    popupType: "Discount Popup",
  },
  "متجر دخون الإماراتية": {
    store: "Dukhoon Al-Emaratia",
    sector: "Oud & incense",
    challenge: "Grow order size with motivating discounts on complementary items",
    strategy: "Popups suggesting add-ons with an extra discount on add-to-cart",
    popupType: "Upsell / Cross-sell",
  },
  "متجر مُكنة": {
    store: "Moknah Store",
    sector: "Skincare products",
    challenge: "Increase order size with a motivating discount on a second unit",
    strategy: "Popups encouraging another unit of the same product on add-to-cart",
    popupType: "Buy More Save More",
  },
  "متجر skinly": {
    store: "Skinly Store",
    sector: "Advanced skincare",
    challenge: "Maximize White Friday / peak season sales",
    strategy: "Add-to-cart event with bundled discounts and complementary offers",
    popupType: "Seasonal Discount Campaign",
  },
  "متجر فابيان": {
    store: "Fabian Store",
    sector: "Perfumes",
    challenge: "Add-to-cart without checkout — lost sales",
    strategy: "Popups tied to add-to-cart to nudge checkout completion",
    popupType: "Add to Cart Incentive",
  },
  "متجر عبق الغيم": {
    store: "Abaq Al-Ghaym",
    sector: "Perfumes",
    challenge: "Heavy cart removals before checkout and lost potential orders",
    strategy: "Cart-remove event with a smart discount code to return and complete",
    popupType: "Cart Abandonment Recovery",
  },
  "متجر هني دوز": {
    store: "Honey Duz Store",
    sector: "Natural honey",
    challenge: "Low completion when only one unit is selected — smaller baskets",
    strategy: "Popup with a clear 2+1 free offer and highlighted value",
    popupType: "Buy 2 Get 1 Free",
  },
  "جمعية تحفيظ القرآن - خميس مشيط": {
    store: "Quran Memorization Society — Khamis Mushait",
    sector: "Online donations",
    challenge: "Low engagement with online donation campaigns and few completed donations",
    strategy: "Impactful browsing popups that encourage immediate donation",
    popupType: "Donation Nudge Popup",
  },
};

export function findStoryBySlug(slug: string): StoryData | undefined {
  return stories.find((s) => s.slug === slug);
}

/** Maps Analyze form industry value → Arabic sector labels used in success stories */
const INDUSTRY_TO_SECTORS: Record<string, string[]> = {
  fashion: ["الأقمشة الرجالية", "عبايات الحج واللباس المحتشم"],
  electronics: ["متجر إلكتروني متنوع"],
  beauty: ["منتجات البشرة", "مستحضرات العناية بالبشرة"],
  home: ["مستلزمات التنظيف"],
  food: ["عسل طبيعي", "متجر إلكتروني متنوع"],
  sports: ["متجر إلكتروني متنوع"],
  health: ["منتجات البشرة", "مستحضرات العناية بالبشرة"],
  toys: ["متجر إلكتروني متنوع"],
  jewelry: ["عطور", "العود والبخور"],
  automotive: ["متجر إلكتروني متنوع"],
  other: [],
};

export function pickSuccessStoriesForIndustry(industry: string | null | undefined, limit = 3): StoryData[] {
  const key = (industry ?? "").trim();
  const sectors = INDUSTRY_TO_SECTORS[key] ?? INDUSTRY_TO_SECTORS.other;
  const matched = sectors.length ? stories.filter((s) => sectors.includes(s.sector)) : [];
  const pool = matched.length ? matched : stories;
  return pool.slice(0, limit);
}
