/**
 * THE PLAYABLE STOREFRONT.
 *
 * A sector page could show fifteen pictures of a widget and a merchant would
 * still ask the only question that matters: what does this do in a real
 * shop? So the page stops showing and lets them use it. This is a working
 * storefront for the sector - category, product page, cart, checkout, thank
 * you - and Ziadah's offers fire in it the way they fire in a real store:
 * because of what the shopper just did, not because a slide moved.
 *
 * THE ELEVEN OFFER TYPES are the vocabulary, the same eleven the Figma sector
 * screens and the brand pitch kit use, by the same keys. The demo's job is to
 * put every one of them in front of the visitor through ordinary shopping,
 * and to say which ones they have seen.
 *
 * EVERY PRODUCT HERE HAS A REAL PHOTOGRAPH. The catalogue was chosen from the
 * shots the site actually owns rather than written first and illustrated
 * after, because a demo of a storefront with six grey placeholders in it
 * argues against itself.
 */

/** The eleven, in the order the Figma sector sections list them. */
export const OFFER_TYPES = [
  "plain", "replace", "addmore", "quantity", "steps",
  "buythemall", "box", "bmsm", "cartvalue", "coupon", "thankyou",
] as const;
export type OfferType = (typeof OFFER_TYPES)[number];

export type OfferLabel = { ar: string; en: string; descAr: string; descEn: string };

export const OFFER_LABELS: Record<OfferType, OfferLabel> = {
  plain: {
    ar: "صفحة المنتج", en: "Product page",
    descAr: "نقطة البداية: المنتج بلا أي اقتراح، عشان تشوف الفرق.",
    descEn: "The starting point: the product with no suggestion, so the difference is visible.",
  },
  replace: {
    ar: "استبدال المنتج", en: "Product swap",
    descAr: "بديل أعلى بفرق سعر واضح، يظهر وأنت في صفحة المنتج.",
    descEn: "A higher alternative with the difference stated, on the product page.",
  },
  addmore: {
    ar: "أضف المزيد", en: "Add more",
    descAr: "المكمّلات تظهر لحظة الإضافة للسلة، لا قبلها.",
    descEn: "Complements appear the moment something enters the cart, not before.",
  },
  quantity: {
    ar: "عرض الكميات", en: "Quantity offer",
    descAr: "جدول تصاعدي للقطع التي تُشترى أكثر من مرة.",
    descEn: "A tiered table for the things people buy more than once.",
  },
  steps: {
    ar: "التجهيز بخطوات", en: "Step kit",
    descAr: "الطقم كاملاً خطوة خطوة بسعر أقل من مجموعه.",
    descEn: "The whole kit, step by step, under the sum of its parts.",
  },
  buythemall: {
    ar: "خذها كلها", en: "Buy them all",
    descAr: "ثلاث قطع متطابقة بسعر واحد.",
    descEn: "Three matching pieces at one price.",
  },
  box: {
    ar: "اصنع صندوقك", en: "Build a box",
    descAr: "العميل يختار محتويات الصندوق بنفسه.",
    descEn: "The shopper picks what goes in the box.",
  },
  bmsm: {
    ar: "اشتر أكثر ووفر أكثر", en: "Buy more save more",
    descAr: "خصم يكبر مع عدد القطع في السلة.",
    descEn: "A discount that grows with the number of items in the cart.",
  },
  cartvalue: {
    ar: "رفع قيمة السلة", en: "Cart value",
    descAr: "عتبة الشحن المجاني وما ينقص للوصول لها.",
    descEn: "The free-shipping threshold and what is left to reach it.",
  },
  coupon: {
    ar: "كود الخصم", en: "Coupon",
    descAr: "كوبون في اللحظة التي يتردد فيها العميل.",
    descEn: "A coupon at the moment the shopper hesitates.",
  },
  thankyou: {
    ar: "بعد الشراء", en: "Post-purchase",
    descAr: "بذرة الطلب التالي على صفحة الشكر.",
    descEn: "The seed of the next order, on the thank-you page.",
  },
};

export type DemoProduct = {
  id: string;
  /** The exact string `productImage()` is keyed on, so the shot resolves. */
  nameAr: string;
  nameEn: string;
  price: number;
  was?: number;
  categoryAr: string;
  categoryEn: string;
  rating: number;
  reviews: number;
};

export type SectorStoreDemo = {
  slug: string;
  storeAr: string;
  storeEn: string;
  /** The product the demo opens on. */
  heroId: string;
  /** The upgrade `replace` offers against the hero. */
  upgradeId: string;
  /** What `addmore` suggests once the hero is in the cart. */
  addMoreIds: string[];
  /** The repeat-purchase item `quantity` tiers. */
  quantityId: string;
  /** The kit `steps` and `buythemall` assemble. */
  kitIds: string[];
  /** What the shopper can put in a `box`. */
  boxIds: string[];
  /** The free-shipping threshold, in riyals. */
  freeShipping: number;
  coupon: string;
  couponPct: number;
  /** What `thankyou` offers after the order is placed. */
  thankYouIds: string[];
  products: DemoProduct[];
};

/* ELECTRONICS. Six products, six photographs, no placeholders. A phone
   accessories shop is the honest shape for this catalogue: it is what the
   shots we own actually depict, and every offer type has a natural home in
   it. */
export const electronicsStoreDemo: SectorStoreDemo = {
  slug: "electronics",
  storeAr: "متجر الإلكترونيات",
  storeEn: "The electronics store",
  heroId: "earbuds",
  upgradeId: "wireless-charger",
  addMoreIds: ["case", "screen"],
  quantityId: "charger-cable",
  kitIds: ["earbuds", "case", "screen"],
  boxIds: ["case", "screen", "charger-cable", "wired"],
  freeShipping: 300,
  coupon: "ZIADAH10",
  couponPct: 10,
  thankYouIds: ["wireless-charger", "wired"],
  products: [
    {
      id: "earbuds",
      nameAr: "سماعات لاسلكية", nameEn: "Wireless Earbuds",
      price: 320, was: 399,
      categoryAr: "صوتيات", categoryEn: "Audio",
      rating: 4.7, reviews: 214,
    },
    {
      id: "case",
      nameAr: "غطاء حماية الهاتف", nameEn: "Phone Protective Case",
      price: 120,
      categoryAr: "حماية", categoryEn: "Protection",
      rating: 4.6, reviews: 388,
    },
    {
      id: "screen",
      nameAr: "واقي شاشة زجاجي", nameEn: "Glass Screen Protector",
      price: 85,
      categoryAr: "حماية", categoryEn: "Protection",
      rating: 4.5, reviews: 512,
    },
    {
      id: "wireless-charger",
      nameAr: "شاحن لاسلكي سريع", nameEn: "Fast Wireless Charger",
      price: 180, was: 229,
      categoryAr: "شحن", categoryEn: "Charging",
      rating: 4.8, reviews: 96,
    },
    {
      id: "charger-cable",
      nameAr: "رأس شاحن سريع وكابل", nameEn: "Fast charger head & cable",
      price: 95,
      categoryAr: "شحن", categoryEn: "Charging",
      rating: 4.4, reviews: 173,
    },
    {
      id: "wired",
      nameAr: "سماعات سلكية", nameEn: "Wired earphones",
      price: 140,
      categoryAr: "صوتيات", categoryEn: "Audio",
      rating: 4.3, reviews: 61,
    },
  ],
};

export const storeDemoBySlug: Record<string, SectorStoreDemo> = {
  electronics: electronicsStoreDemo,
};

export function getStoreDemo(slug: string): SectorStoreDemo | undefined {
  return storeDemoBySlug[slug];
}
