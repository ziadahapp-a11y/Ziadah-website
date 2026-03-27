/**
 * Demo copy for widget previews on sector pages — shallow-merged over `translations.widgets`.
 */

export type BuyMoreSaveMoreDemo = Partial<{
  title: string;
  subtitle: string;
  descLabel: string;
  options: { qty: string; label: string; price: string; origPrice: string | null; badge: string | null }[];
  freeShippingNote: string;
}>;

export type BuyTogetherDemo = Partial<{
  title: string;
  subtitle: string;
  descLabel: string;
  items: {
    emoji: string;
    name: string;
    reviews: string;
    price: number;
    originalPrice: number | null;
    checked: boolean;
    tag: string | null;
  }[];
  currency: string;
  btnBuy: string;
}>;

export type AddonsDemo = Partial<{
  title: string;
  subtitle: string;
  descLabel: string;
  items: { emoji: string; name: string; price: number; checked: boolean }[];
  totalLabel: string;
  currency: string;
  btnAdd: string;
}>;

export type RelatedProductsDemo = Partial<{
  title: string;
  subtitle: string;
  descLabel: string;
  products: { emoji: string; name: string; reviews: string; price: string }[];
  currency: string;
  btnAdd: string;
}>;

export type CouponDemo = Partial<{
  title: string;
  subtitle: string;
  descLabel: string;
  discountAmount: string;
  discountSub: string;
  couponCode: string;
  freeShipping: string;
  expiresLabel: string;
  btnCopy: string;
}>;

export type FreeShippingDemo = Partial<{
  title: string;
  subtitle: string;
  progressTitle: string;
  remainingLabel: string;
  progressNote: string;
  suggestedLabel: string;
  products: { emoji: string; name: string; price: string }[];
  currency: string;
}>;

export type ProductSwapDemo = Partial<{
  title: string;
  subtitle: string;
  descLabel: string;
  specialOfferBadge: string;
  productEmoji: string;
  productName: string;
  reviews: string;
  origPrice: string;
  newPrice: string;
  saveBadge: string;
  warrantyNote: string;
  btnUpgrade: string;
}>;

export type SectorShowcaseDemoBundle = Partial<{
  buyMoreSaveMore: BuyMoreSaveMoreDemo;
  buyTogether: BuyTogetherDemo;
  addons: AddonsDemo;
  relatedProducts: RelatedProductsDemo;
  coupon: CouponDemo;
  freeShipping: FreeShippingDemo;
  productSwap: ProductSwapDemo;
}>;

type LangBundle = { ar: SectorShowcaseDemoBundle; en: SectorShowcaseDemoBundle };

const rev = {
  ar: "4.9 ⭐ · تقييمات موثوقة",
  en: "4.9 ⭐ · verified reviews",
} as const;

function buyMore(
  lang: "ar" | "en",
  tiers: [string, string, string][],
  origForTier2: string,
  origForTier3: string,
  badgeTier2: string,
  badgeTier3: string,
): BuyMoreSaveMoreDemo {
  const cur = lang === "ar" ? " ⃁" : " SAR";
  const [p1, p2, p3] = tiers;
  return {
    options: [
      { qty: p1[0], label: p1[1], price: `${p1[2]}${cur}`, origPrice: null, badge: null },
      { qty: p2[0], label: p2[1], price: `${p2[2]}${cur}`, origPrice: `${origForTier2}${cur}`, badge: badgeTier2 },
      { qty: p3[0], label: p3[1], price: `${p3[2]}${cur}`, origPrice: `${origForTier3}${cur}`, badge: badgeTier3 },
    ],
  };
}

function fsAr(remaining: string, notePrefix: string, products: { emoji: string; name: string; price: string }[]): FreeShippingDemo {
  return {
    remainingLabel: `${remaining} ⃁ متبقية`,
    progressNote: `${notePrefix} ⃁ أكثر للشحن المجاني`,
    products,
  };
}

function fsEn(remaining: string, notePrefix: string, products: { emoji: string; name: string; price: string }[]): FreeShippingDemo {
  return {
    remainingLabel: `${remaining} SAR remaining`,
    progressNote: `Add ${notePrefix} SAR more for free shipping`,
    products,
  };
}

/** Preset id → localized demo bundles */
const PRESETS: Record<string, LangBundle> = {
  delivery: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["وجبة واحدة", "بدون خصم", "32"],
          ["وجبتان", "خصم 15%", "54"],
          ["3 وجبات", "خصم 25٪ + مشروب", "72"],
        ],
        "64",
        "96",
        "-15%",
        "-25%",
      ),
      buyTogether: {
        items: [
          { emoji: "🍔", name: "برجر لحم مع جبن", reviews: rev.ar, price: 42, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🥤", name: "عصير برتقال طازج", reviews: rev.ar, price: 14, originalPrice: 18, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🍟", name: "بطاطس مقلية كبيرة", price: 12, checked: true },
          { emoji: "🥫", name: "صوص باربيكيو", price: 3, checked: false },
          { emoji: "🍰", name: "قطعة تشيز كيك", price: 19, checked: true },
          { emoji: "🧊", name: "مشروب غازي", price: 8, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🥗", name: "سلطة خضار بالفيتا", reviews: rev.ar, price: "22" },
          { emoji: "🌯", name: "ساندويش دجاج مشوي", reviews: rev.ar, price: "28" },
        ],
      },
      coupon: { couponCode: "WAJIB12", discountSub: "خصم على طلب التوصيل الآن" },
      freeShipping: fsAr("18", "أضف 18", [
        { emoji: "🫓", name: "حمص بالطحينة", price: "12" },
        { emoji: "🥣", name: "شوربة عدس", price: "14" },
      ]),
      productSwap: {
        productEmoji: "🍕",
        productName: "بيتزا عائلية مقاس كبير",
        reviews: rev.ar,
        origPrice: "68 ⃁",
        newPrice: "58 ⃁",
        saveBadge: "وفّر 10 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 meal", "No discount", "32"],
          ["2 meals", "15% off", "54"],
          ["3 meals", "25% off + drink", "72"],
        ],
        "64",
        "96",
        "-15%",
        "-25%",
      ),
      buyTogether: {
        items: [
          { emoji: "🍔", name: "Cheese beef burger", reviews: rev.en, price: 42, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🥤", name: "Fresh orange juice", reviews: rev.en, price: 14, originalPrice: 18, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🍟", name: "Large fries", price: 12, checked: true },
          { emoji: "🥫", name: "BBQ dip", price: 3, checked: false },
          { emoji: "🍰", name: "Cheesecake slice", price: 19, checked: true },
          { emoji: "🧊", name: "Soft drink", price: 8, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🥗", name: "Feta garden salad", reviews: rev.en, price: "22" },
          { emoji: "🌯", name: "Grilled chicken wrap", reviews: rev.en, price: "28" },
        ],
      },
      coupon: { couponCode: "WAJIB12", discountSub: "Off your delivery order now" },
      freeShipping: fsEn("18", "18", [
        { emoji: "🫓", name: "Hummus", price: "12" },
        { emoji: "🥣", name: "Lentil soup", price: "14" },
      ]),
      productSwap: {
        productEmoji: "🍕",
        productName: "Large family pizza",
        reviews: rev.en,
        origPrice: "68 SAR",
        newPrice: "58 SAR",
        saveBadge: "Save 10 SAR",
      },
    },
  },

  retail: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["الكمية 1", "بدون خصم", "89"],
          ["قطعتان", "خصم 12%", "156"],
          ["3 قطع", "خصم 22٪ + شحن مجاني", "209"],
        ],
        "267",
        "356",
        "-12%",
        "-22%",
      ),
      buyTogether: {
        items: [
          { emoji: "🫖", name: "طقم شاي زجاجي", reviews: rev.ar, price: 129, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🍵", name: "علبة شاي أخضر فاخر", reviews: rev.ar, price: 79, originalPrice: 99, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📦", name: "تغليف هدايا", price: 15, checked: true },
          { emoji: "🎀", name: "بطاقة تهنئة", price: 8, checked: false },
          { emoji: "🛡️", name: "ضمان إضافي سنة", price: 45, checked: false },
          { emoji: "🚚", name: "توصيل سريع", price: 25, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🕯️", name: "شمعة معطرة للمنزل", reviews: rev.ar, price: "49" },
          { emoji: "🧺", name: "سلة تخزين قماش", reviews: rev.ar, price: "62" },
        ],
      },
      coupon: { couponCode: "STORE25" },
      freeShipping: fsAr("55", "أضف 55", [
        { emoji: "☕", name: "كوب حراري سفر", price: "35" },
        { emoji: "📓", name: "مفكرة جلد", price: "42" },
      ]),
      productSwap: {
        productEmoji: "🧴",
        productName: "طقم عناية فاخر ثلاثي",
        reviews: rev.ar,
        origPrice: "199 ⃁",
        newPrice: "169 ⃁",
        saveBadge: "وفّر 30 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["Qty 1", "No discount", "89"],
          ["2 items", "12% off", "156"],
          ["3 items", "22% off + free shipping", "209"],
        ],
        "267",
        "356",
        "-12%",
        "-22%",
      ),
      buyTogether: {
        items: [
          { emoji: "🫖", name: "Glass tea set", reviews: rev.en, price: 129, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🍵", name: "Premium green tea tin", reviews: rev.en, price: 79, originalPrice: 99, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📦", name: "Gift wrapping", price: 15, checked: true },
          { emoji: "🎀", name: "Greeting card", price: 8, checked: false },
          { emoji: "🛡️", name: "Extra 1-year warranty", price: 45, checked: false },
          { emoji: "🚚", name: "Express delivery", price: 25, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🕯️", name: "Scented home candle", reviews: rev.en, price: "49" },
          { emoji: "🧺", name: "Fabric storage basket", reviews: rev.en, price: "62" },
        ],
      },
      coupon: { couponCode: "STORE25" },
      freeShipping: fsEn("55", "55", [
        { emoji: "☕", name: "Travel thermal mug", price: "35" },
        { emoji: "📓", name: "Leather notebook", price: "42" },
      ]),
      productSwap: {
        productEmoji: "🧴",
        productName: "3-piece premium care set",
        reviews: rev.en,
        origPrice: "199 SAR",
        newPrice: "169 SAR",
        saveBadge: "Save 30 SAR",
      },
    },
  },

  fashion: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["قطعة واحدة", "بدون خصم", "189"],
          ["قطعتان", "خصم 18%", "309"],
          ["3 قطع", "خصم 28٪ + شحن مجاني", "409"],
        ],
        "378",
        "567",
        "-18%",
        "-28%",
      ),
      buyTogether: {
        items: [
          { emoji: "🧕", name: "عباية كريب يومي", reviews: rev.ar, price: 349, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🧣", name: "طرحة شيفون مطابقة", reviews: rev.ar, price: 89, originalPrice: 119, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "👜", name: "حقيبة يد صغيرة", price: 159, checked: true },
          { emoji: "🪡", name: "خدمة تعديل مقاس", price: 45, checked: false },
          { emoji: "🧵", name: "حزام إضافي", price: 29, checked: false },
          { emoji: "📏", name: "دليل المقاسات", price: 0, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🥿", name: "حذاء مسطح جلد", reviews: rev.ar, price: "219" },
          { emoji: "⌚", name: "سوار مطلي ذهباً", reviews: rev.ar, price: "129" },
        ],
      },
      coupon: { couponCode: "STYLE18" },
      freeShipping: fsAr("41", "أضف 41", [
        { emoji: "🧴", name: "بخاخ عناية للقماش", price: "39" },
        { emoji: "👝", name: "كيس تخزين موسمي", price: "29" },
      ]),
      productSwap: {
        productEmoji: "🧥",
        productName: "عباية سهرة مطرّزة",
        reviews: rev.ar,
        origPrice: "599 ⃁",
        newPrice: "499 ⃁",
        saveBadge: "وفّر 100 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 item", "No discount", "189"],
          ["2 items", "18% off", "309"],
          ["3 items", "28% off + free shipping", "409"],
        ],
        "378",
        "567",
        "-18%",
        "-28%",
      ),
      buyTogether: {
        items: [
          { emoji: "🧕", name: "Everyday crepe abaya", reviews: rev.en, price: 349, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🧣", name: "Matching chiffon scarf", reviews: rev.en, price: 89, originalPrice: 119, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "👜", name: "Small handbag", price: 159, checked: true },
          { emoji: "🪡", name: "Tailoring adjustment", price: 45, checked: false },
          { emoji: "🧵", name: "Extra belt", price: 29, checked: false },
          { emoji: "📏", name: "Size guide (free)", price: 0, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🥿", name: "Leather flat shoes", reviews: rev.en, price: "219" },
          { emoji: "⌚", name: "Gold-tone bracelet", reviews: rev.en, price: "129" },
        ],
      },
      coupon: { couponCode: "STYLE18" },
      freeShipping: fsEn("41", "41", [
        { emoji: "🧴", name: "Fabric care spray", price: "39" },
        { emoji: "👝", name: "Seasonal dust bag", price: "29" },
      ]),
      productSwap: {
        productEmoji: "🧥",
        productName: "Embroidered evening abaya",
        reviews: rev.en,
        origPrice: "599 SAR",
        newPrice: "499 SAR",
        saveBadge: "Save 100 SAR",
      },
    },
  },

  beauty: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["علبة واحدة", "بدون خصم", "79"],
          ["علبتان", "خصم 15%", "134"],
          ["3 علب", "خصم 25٪ + هدية", "179"],
        ],
        "158",
        "237",
        "-15%",
        "-25%",
      ),
      buyTogether: {
        items: [
          { emoji: "🧴", name: "كريم مرطب SPF 50", reviews: rev.ar, price: 89, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "✨", name: "سيروم فيتامين C", reviews: rev.ar, price: 65, originalPrice: 85, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🧼", name: "غسول لطيف", price: 42, checked: true },
          { emoji: "🪮", name: "فرشاة تطبيق", price: 19, checked: false },
          { emoji: "🎁", name: "عيّنة عطر", price: 12, checked: true },
          { emoji: "🧻", name: "مناديل مزيل مكياج", price: 18, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "💄", name: "أحمر شفاه ثابت", reviews: rev.ar, price: "59" },
          { emoji: "🪞", name: "مرآة مضغوطة LED", reviews: rev.ar, price: "75" },
        ],
      },
      coupon: { couponCode: "GLOW22" },
      freeShipping: fsAr("38", "أضف 38", [
        { emoji: "🧴", name: "ميست مرطّب", price: "28" },
        { emoji: "🧽", name: "إسفنجة تنظيف", price: "22" },
      ]),
      productSwap: {
        productEmoji: "🧪",
        productName: "سيروم ليلي مركّز 50 مل",
        reviews: rev.ar,
        origPrice: "145 ⃁",
        newPrice: "119 ⃁",
        saveBadge: "وفّر 26 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 unit", "No discount", "79"],
          ["2 units", "15% off", "134"],
          ["3 units", "25% off + gift", "179"],
        ],
        "158",
        "237",
        "-15%",
        "-25%",
      ),
      buyTogether: {
        items: [
          { emoji: "🧴", name: "SPF 50 moisturizer", reviews: rev.en, price: 89, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "✨", name: "Vitamin C serum", reviews: rev.en, price: 65, originalPrice: 85, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🧼", name: "Gentle cleanser", price: 42, checked: true },
          { emoji: "🪮", name: "Application brush", price: 19, checked: false },
          { emoji: "🎁", name: "Perfume sample", price: 12, checked: true },
          { emoji: "🧻", name: "Makeup remover wipes", price: 18, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "💄", name: "Long-wear lipstick", reviews: rev.en, price: "59" },
          { emoji: "🪞", name: "LED compact mirror", reviews: rev.en, price: "75" },
        ],
      },
      coupon: { couponCode: "GLOW22" },
      freeShipping: fsEn("38", "38", [
        { emoji: "🧴", name: "Face mist", price: "28" },
        { emoji: "🧽", name: "Cleansing sponge", price: "22" },
      ]),
      productSwap: {
        productEmoji: "🧪",
        productName: "Concentrated night serum 50ml",
        reviews: rev.en,
        origPrice: "145 SAR",
        newPrice: "119 SAR",
        saveBadge: "Save 26 SAR",
      },
    },
  },

  health: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["علبة بروتين", "بدون خصم", "199"],
          ["علبتان", "خصم 10%", "358"],
          ["3 علب", "خصم 18٪ + شيكر", "489"],
        ],
        "398",
        "597",
        "-10%",
        "-18%",
      ),
      buyTogether: {
        items: [
          { emoji: "🏋️", name: "حبل قفز احترافي", reviews: rev.ar, price: 89, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🧃", name: "مشروب إلكتروليت", reviews: rev.ar, price: 12, originalPrice: 16, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🧤", name: "قفازات رفع", price: 45, checked: true },
          { emoji: "🎽", name: "منشفة مايكروفايبر", price: 32, checked: false },
          { emoji: "📿", name: "شريط مقاومة", price: 55, checked: true },
          { emoji: "🥤", name: "زجاجة ماء 750مل", price: 39, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🩹", name: "ضمادات رياضية", reviews: rev.ar, price: "24" },
          { emoji: "🥜", name: "وجبة بروتين بار", reviews: rev.ar, price: "18" },
        ],
      },
      coupon: { couponCode: "FIT15" },
      freeShipping: fsAr("62", "أضف 62", [
        { emoji: "🧴", name: "جل تدليك", price: "35" },
        { emoji: "🧦", name: "جوارب ضغط", price: "42" },
      ]),
      productSwap: {
        productEmoji: "⚡",
        productName: "بروتين مصل لاعبين — 2كغ",
        reviews: rev.ar,
        origPrice: "349 ⃁",
        newPrice: "299 ⃁",
        saveBadge: "وفّر 50 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 protein tub", "No discount", "199"],
          ["2 tubs", "10% off", "358"],
          ["3 tubs", "18% off + shaker", "489"],
        ],
        "398",
        "597",
        "-10%",
        "-18%",
      ),
      buyTogether: {
        items: [
          { emoji: "🏋️", name: "Pro speed rope", reviews: rev.en, price: 89, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🧃", name: "Electrolyte drink", reviews: rev.en, price: 12, originalPrice: 16, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🧤", name: "Lifting gloves", price: 45, checked: true },
          { emoji: "🎽", name: "Microfiber towel", price: 32, checked: false },
          { emoji: "📿", name: "Resistance band set", price: 55, checked: true },
          { emoji: "🥤", name: "750ml water bottle", price: 39, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🩹", name: "Sports tape pack", reviews: rev.en, price: "24" },
          { emoji: "🥜", name: "Protein bar", reviews: rev.en, price: "18" },
        ],
      },
      coupon: { couponCode: "FIT15" },
      freeShipping: fsEn("62", "62", [
        { emoji: "🧴", name: "Massage gel", price: "35" },
        { emoji: "🧦", name: "Compression socks", price: "42" },
      ]),
      productSwap: {
        productEmoji: "⚡",
        productName: "Whey isolate protein 2kg",
        reviews: rev.en,
        origPrice: "349 SAR",
        newPrice: "299 SAR",
        saveBadge: "Save 50 SAR",
      },
    },
  },

  electronics: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["قطعة واحدة", "بدون خصم", "449"],
          ["قطعتان", "خصم 8%", "826"],
          ["3 قطع", "خصم 15٪ + حماية شاشة", "1146"],
        ],
        "898",
        "1347",
        "-8%",
        "-15%",
      ),
      buyTogether: {
        items: [
          { emoji: "📱", name: "غطاء سيليكون للهاتف", reviews: rev.ar, price: 59, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🔌", name: "شاحن سريع 65 واط", reviews: rev.ar, price: 129, originalPrice: 159, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🛡️", name: "واقي شاشة زجاجي", price: 35, checked: true },
          { emoji: "🎧", name: "محول صوت USB-C", price: 49, checked: false },
          { emoji: "🔋", name: "كيبل مغناطيسي", price: 45, checked: true },
          { emoji: "🧲", name: "حامل سيارة", price: 39, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "⌚", name: "سوار ساعة ذكية", reviews: rev.ar, price: "89" },
          { emoji: "💾", name: "ذاكرة خارجية 256غ", reviews: rev.ar, price: "199" },
        ],
      },
      coupon: { couponCode: "TECH40" },
      freeShipping: fsAr("72", "أضف 72", [
        { emoji: "🖱️", name: "فأرة مكتب لاسلكية", price: "42" },
        { emoji: "⌨️", name: "لوحة مفاتيح مضغوطة", price: "65" },
      ]),
      productSwap: {
        productEmoji: "📷",
        productName: "حامل استقرار ثلاثي للجوال",
        reviews: rev.ar,
        origPrice: "189 ⃁",
        newPrice: "149 ⃁",
        saveBadge: "وفّر 40 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 item", "No discount", "449"],
          ["2 items", "8% off", "826"],
          ["3 items", "15% off + screen film", "1146"],
        ],
        "898",
        "1347",
        "-8%",
        "-15%",
      ),
      buyTogether: {
        items: [
          { emoji: "📱", name: "Silicone phone case", reviews: rev.en, price: 59, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🔌", name: "65W fast charger", reviews: rev.en, price: 129, originalPrice: 159, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🛡️", name: "Tempered glass", price: 35, checked: true },
          { emoji: "🎧", name: "USB-C audio dongle", price: 49, checked: false },
          { emoji: "🔋", name: "Magnetic charging cable", price: 45, checked: true },
          { emoji: "🧲", name: "Magnetic car mount", price: 39, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "⌚", name: "Smartwatch strap", reviews: rev.en, price: "89" },
          { emoji: "💾", name: "256GB USB-C drive", reviews: rev.en, price: "199" },
        ],
      },
      coupon: { couponCode: "TECH40" },
      freeShipping: fsEn("72", "72", [
        { emoji: "🖱️", name: "Wireless office mouse", price: "42" },
        { emoji: "⌨️", name: "Compact keyboard", price: "65" },
      ]),
      productSwap: {
        productEmoji: "📷",
        productName: "Phone tripod stabilizer",
        reviews: rev.en,
        origPrice: "189 SAR",
        newPrice: "149 SAR",
        saveBadge: "Save 40 SAR",
      },
    },
  },

  jewelry: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["قطعة واحدة", "بدون خصم", "320"],
          ["قطعتان", "خصم 12%", "563"],
          ["3 قطع", "خصم 20٪ + علبة فاخرة", "768"],
        ],
        "640",
        "960",
        "-12%",
        "-20%",
      ),
      buyTogether: {
        items: [
          { emoji: "💍", name: "خاتم ذهبي عيار 18", reviews: rev.ar, price: 890, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "💎", name: "أقراط مطابقة", reviews: rev.ar, price: 650, originalPrice: 799, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📿", name: "تعليقة إضافية", price: 220, checked: true },
          { emoji: "🧼", name: "منظّف مجوهرات", price: 35, checked: false },
          { emoji: "🎁", name: "تغليف فاخر", price: 25, checked: true },
          { emoji: "📜", name: "شهادة جودة", price: 0, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "⌚", name: "سوار ذهبي خفيف", reviews: rev.ar, price: "420" },
          { emoji: "✨", name: "سلسلة بحجر زركون", reviews: rev.ar, price: "510" },
        ],
      },
      coupon: { couponCode: "Spark20" },
      freeShipping: fsAr("95", "أضف 95", [
        { emoji: "💠", name: "دلاية صغيرة", price: "55" },
        { emoji: "🔗", name: "طقم تمديد السلسلة", price: "65" },
      ]),
      productSwap: {
        productEmoji: "👑",
        productName: "طقم عقد وأقراط فضة مطلية",
        reviews: rev.ar,
        origPrice: "1240 ⃁",
        newPrice: "1080 ⃁",
        saveBadge: "وفّر 160 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 piece", "No discount", "320"],
          ["2 pieces", "12% off", "563"],
          ["3 pieces", "20% off + luxury box", "768"],
        ],
        "640",
        "960",
        "-12%",
        "-20%",
      ),
      buyTogether: {
        items: [
          { emoji: "💍", name: "18K gold ring", reviews: rev.en, price: 890, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "💎", name: "Matching earrings", reviews: rev.en, price: 650, originalPrice: 799, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📿", name: "Extra pendant", price: 220, checked: true },
          { emoji: "🧼", name: "Jewelry cleaner", price: 35, checked: false },
          { emoji: "🎁", name: "Luxury gift wrap", price: 25, checked: true },
          { emoji: "📜", name: "Authenticity card (free)", price: 0, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "⌚", name: "Light gold bracelet", reviews: rev.en, price: "420" },
          { emoji: "✨", name: "Zircon chain necklace", reviews: rev.en, price: "510" },
        ],
      },
      coupon: { couponCode: "Spark20" },
      freeShipping: fsEn("95", "95", [
        { emoji: "💠", name: "Small charm", price: "55" },
        { emoji: "🔗", name: "Chain extender set", price: "65" },
      ]),
      productSwap: {
        productEmoji: "👑",
        productName: "Vermeil necklace & earring set",
        reviews: rev.en,
        origPrice: "1240 SAR",
        newPrice: "1080 SAR",
        saveBadge: "Save 160 SAR",
      },
    },
  },

  foodService: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["طبق واحد", "بدون خصم", "45"],
          ["طبقان", "خصم 12%", "79"],
          ["3 أطباق", "خصم 20٪ + مشروب", "108"],
        ],
        "90",
        "135",
        "-12%",
        "-20%",
      ),
      buyTogether: {
        items: [
          { emoji: "🥘", name: "كبسة دجاج عائلية", reviews: rev.ar, price: 89, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🥗", name: "سلطة تبولة كبيرة", reviews: rev.ar, price: 24, originalPrice: 29, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🫓", name: "خبز تنور", price: 6, checked: true },
          { emoji: "🧄", name: "ثومية إضافية", price: 4, checked: false },
          { emoji: "🍮", name: "مهلبية حلى", price: 15, checked: true },
          { emoji: "☕", name: "قهوة عربية", price: 12, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🧆", name: "صحن فلافل مشكل", reviews: rev.ar, price: "22" },
          { emoji: "🥤", name: "لبن مخفوق فراولة", reviews: rev.ar, price: "18" },
        ],
      },
      coupon: { couponCode: "TABLE9" },
      freeShipping: fsAr("26", "أضف 26", [
        { emoji: "🥙", name: "ساندويش فلافل", price: "14" },
        { emoji: "🧃", name: "عصير طازج", price: "16" },
      ]),
      productSwap: {
        productEmoji: "🍖",
        productName: "مشكل مشاوي لشخصين",
        reviews: rev.ar,
        origPrice: "140 ⃁",
        newPrice: "119 ⃁",
        saveBadge: "وفّر 21 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 dish", "No discount", "45"],
          ["2 dishes", "12% off", "79"],
          ["3 dishes", "20% off + drink", "108"],
        ],
        "90",
        "135",
        "-12%",
        "-20%",
      ),
      buyTogether: {
        items: [
          { emoji: "🥘", name: "Family chicken kabsa", reviews: rev.en, price: 89, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🥗", name: "Large tabbouleh", reviews: rev.en, price: 24, originalPrice: 29, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🫓", name: "Oven bread basket", price: 6, checked: true },
          { emoji: "🧄", name: "Extra garlic dip", price: 4, checked: false },
          { emoji: "🍮", name: "Mahalabia dessert", price: 15, checked: true },
          { emoji: "☕", name: "Arabic coffee", price: 12, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🧆", name: "Mixed falafel plate", reviews: rev.en, price: "22" },
          { emoji: "🥤", name: "Strawberry milkshake", reviews: rev.en, price: "18" },
        ],
      },
      coupon: { couponCode: "TABLE9" },
      freeShipping: fsEn("26", "26", [
        { emoji: "🥙", name: "Falafel wrap", price: "14" },
        { emoji: "🧃", name: "Fresh juice", price: "16" },
      ]),
      productSwap: {
        productEmoji: "🍖",
        productName: "Mixed grill platter (2p)",
        reviews: rev.en,
        origPrice: "140 SAR",
        newPrice: "119 SAR",
        saveBadge: "Save 21 SAR",
      },
    },
  },

  home: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["قطعة واحدة", "بدون خصم", "120"],
          ["قطعتان", "خصم 14%", "206"],
          ["3 قطع", "خصم 22٪ + تركيب مجاني", "281"],
        ],
        "240",
        "360",
        "-14%",
        "-22%",
      ),
      buyTogether: {
        items: [
          { emoji: "🛏️", name: "مفرش قطن فندقي", reviews: rev.ar, price: 249, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🛋️", name: "وسادتان داعمتان", reviews: rev.ar, price: 129, originalPrice: 169, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🧴", name: "معطر أقمشة", price: 34, checked: true },
          { emoji: "🪣", name: "طقم تنظيف زجاج", price: 42, checked: false },
          { emoji: "🌿", name: "نبات صغير ديكور", price: 55, checked: true },
          { emoji: "💡", name: "لمبة LED دافئة", price: 39, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🖼️", name: "إطار جدار خشب", reviews: rev.ar, price: "85" },
          { emoji: "🕰️", name: "ساعة حائط صامتة", reviews: rev.ar, price: "95" },
        ],
      },
      coupon: { couponCode: "HOME30" },
      freeShipping: fsAr("48", "أضف 48", [
        { emoji: "🧹", name: "مكنسة يدوية", price: "28" },
        { emoji: "🧺", name: "سل غسيل قماش", price: "35" },
      ]),
      productSwap: {
        productEmoji: "🪟",
        productName: "ستارة تعتيم كهربائية",
        reviews: rev.ar,
        origPrice: "420 ⃁",
        newPrice: "359 ⃁",
        saveBadge: "وفّر 61 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 item", "No discount", "120"],
          ["2 items", "14% off", "206"],
          ["3 items", "22% off + install", "281"],
        ],
        "240",
        "360",
        "-14%",
        "-22%",
      ),
      buyTogether: {
        items: [
          { emoji: "🛏️", name: "Hotel-grade cotton sheet set", reviews: rev.en, price: 249, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🛋️", name: "Two ergonomic pillows", reviews: rev.en, price: 129, originalPrice: 169, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🧴", name: "Fabric freshener", price: 34, checked: true },
          { emoji: "🪣", name: "Glass cleaning kit", price: 42, checked: false },
          { emoji: "🌿", name: "Small décor plant", price: 55, checked: true },
          { emoji: "💡", name: "Warm LED bulb pack", price: 39, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🖼️", name: "Wood picture frame", reviews: rev.en, price: "85" },
          { emoji: "🕰️", name: "Silent wall clock", reviews: rev.en, price: "95" },
        ],
      },
      coupon: { couponCode: "HOME30" },
      freeShipping: fsEn("48", "48", [
        { emoji: "🧹", name: "Hand broom", price: "28" },
        { emoji: "🧺", name: "Laundry hamper", price: "35" },
      ]),
      productSwap: {
        productEmoji: "🪟",
        productName: "Motorized blackout curtain",
        reviews: rev.en,
        origPrice: "420 SAR",
        newPrice: "359 SAR",
        saveBadge: "Save 61 SAR",
      },
    },
  },

  digital: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["دورة واحدة", "بدون خصم", "149"],
          ["دورتان", "خصم 20%", "238"],
          ["3 دورات", "خصم 30٪ + قوالب", "312"],
        ],
        "298",
        "447",
        "-20%",
        "-30%",
      ),
      buyTogether: {
        items: [
          { emoji: "💻", name: "باقة تصميم UI للمبتدئين", reviews: rev.ar, price: 199, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "📚", name: "كتاب إلكتروني PDF", reviews: rev.ar, price: 49, originalPrice: 69, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🎥", name: "جلسة مسجلة إضافية", price: 79, checked: true },
          { emoji: "📎", name: "حزمة ملفات مشاريع", price: 39, checked: false },
          { emoji: "💬", name: "دردشة مراجعة أسبوعية", price: 99, checked: true },
          { emoji: "🏅", name: "شهادة إتمام", price: 29, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🖌️", name: "حزمة أيقونات جاهزة", reviews: rev.ar, price: "45" },
          { emoji: "🎵", name: "موسيقى خلفية مرخصة", reviews: rev.ar, price: "35" },
        ],
      },
      coupon: { couponCode: "LEARN40" },
      freeShipping: fsAr("33", "أضف 33", [
        { emoji: "📄", name: "قالب عقد جاهز", price: "19" },
        { emoji: "🧩", name: "وحدة Figma", price: "25" },
      ]),
      productSwap: {
        productEmoji: "🚀",
        productName: "ترقية إلى مسار كامل + مرافقة",
        reviews: rev.ar,
        origPrice: "599 ⃁",
        newPrice: "479 ⃁",
        saveBadge: "وفّر 120 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 course", "No discount", "149"],
          ["2 courses", "20% off", "238"],
          ["3 courses", "30% off + templates", "312"],
        ],
        "298",
        "447",
        "-20%",
        "-30%",
      ),
      buyTogether: {
        items: [
          { emoji: "💻", name: "Beginner UI design bundle", reviews: rev.en, price: 199, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "📚", name: "Companion ebook (PDF)", reviews: rev.en, price: 49, originalPrice: 69, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🎥", name: "Extra recorded session", price: 79, checked: true },
          { emoji: "📎", name: "Project file pack", price: 39, checked: false },
          { emoji: "💬", name: "Weekly office hours chat", price: 99, checked: true },
          { emoji: "🏅", name: "Completion certificate", price: 29, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🖌️", name: "Icon starter kit", reviews: rev.en, price: "45" },
          { emoji: "🎵", name: "Licensed audio pack", reviews: rev.en, price: "35" },
        ],
      },
      coupon: { couponCode: "LEARN40" },
      freeShipping: fsEn("33", "33", [
        { emoji: "📄", name: "Contract template", price: "19" },
        { emoji: "🧩", name: "Figma UI kit slice", price: "25" },
      ]),
      productSwap: {
        productEmoji: "🚀",
        productName: "Upgrade to full cohort + mentoring",
        reviews: rev.en,
        origPrice: "599 SAR",
        newPrice: "479 SAR",
        saveBadge: "Save 120 SAR",
      },
    },
  },

  digitalCards: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["بطاقة واحدة", "بدون خصم", "50"],
          ["بطاقتان", "خصم 5%", "95"],
          ["3 بطاقات", "خصم 10٪ + رصيد إضافي", "135"],
        ],
        "100",
        "150",
        "-5%",
        "-10%",
      ),
      buyTogether: {
        items: [
          { emoji: "🎮", name: "بطاقة متجر ألعاب 100", reviews: rev.ar, price: 100, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🎧", name: "بطاقة اشتراك موسيقى 3 أشهر", reviews: rev.ar, price: 45, originalPrice: 55, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📧", name: "تسليم فوري للإيميل", price: 5, checked: true },
          { emoji: "🎀", name: "تصميم بطاقة هدية", price: 10, checked: false },
          { emoji: "🔒", name: "ضمان استرداد 24 ساعة", price: 8, checked: true },
          { emoji: "🌍", name: "منطقة متجر أخرى", price: 12, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "📱", name: "بطاقة تطبيقات 50", reviews: rev.ar, price: "50" },
          { emoji: "🛒", name: "بطاقة سوق إلكتروني", reviews: rev.ar, price: "200" },
        ],
      },
      coupon: { couponCode: "CARD8" },
      freeShipping: fsAr("15", "أضف 15", [
        { emoji: "💳", name: "فئة 15 رصيد", price: "15" },
        { emoji: "⭐", name: "نقاط ولاء", price: "10" },
      ]),
      productSwap: {
        productEmoji: "💎",
        productName: "بطاقة نسخة بلس — سنة",
        reviews: rev.ar,
        origPrice: "220 ⃁",
        newPrice: "189 ⃁",
        saveBadge: "وفّر 31 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 card", "No discount", "50"],
          ["2 cards", "5% off", "95"],
          ["3 cards", "10% off + bonus balance", "135"],
        ],
        "100",
        "150",
        "-5%",
        "-10%",
      ),
      buyTogether: {
        items: [
          { emoji: "🎮", name: "Gaming store card 100", reviews: rev.en, price: 100, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🎧", name: "3-month music sub card", reviews: rev.en, price: 45, originalPrice: 55, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📧", name: "Instant email delivery", price: 5, checked: true },
          { emoji: "🎀", name: "Gift card design", price: 10, checked: false },
          { emoji: "🔒", name: "24h refund guarantee", price: 8, checked: true },
          { emoji: "🌍", name: "Different region SKU", price: 12, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "📱", name: "App store card 50", reviews: rev.en, price: "50" },
          { emoji: "🛒", name: "Marketplace gift card", reviews: rev.en, price: "200" },
        ],
      },
      coupon: { couponCode: "CARD8" },
      freeShipping: fsEn("15", "15", [
        { emoji: "💳", name: "15 SAR top-up", price: "15" },
        { emoji: "⭐", name: "Loyalty points pack", price: "10" },
      ]),
      productSwap: {
        productEmoji: "💎",
        productName: "Plus tier annual pass card",
        reviews: rev.en,
        origPrice: "220 SAR",
        newPrice: "189 SAR",
        saveBadge: "Save 31 SAR",
      },
    },
  },

  clinic: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["جلسة واحدة", "بدون خصم", "250"],
          ["جلستان", "خصم 8%", "460"],
          ["3 جلسات", "خصم 15٪ + تقرير", "638"],
        ],
        "500",
        "750",
        "-8%",
        "-15%",
      ),
      buyTogether: {
        items: [
          { emoji: "🦷", name: "تنظيف أسنان احترافي", reviews: rev.ar, price: 300, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🧴", name: "تبييض معالج منزلي", reviews: rev.ar, price: 180, originalPrice: 220, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📷", name: "صورة أشعة بانوراما", price: 120, checked: true },
          { emoji: "🩺", name: "استشارة سريعة", price: 80, checked: false },
          { emoji: "💊", name: "غسول خاص بعد الجلسة", price: 45, checked: true },
          { emoji: "📅", name: "حجز متابعة خلال أسبوع", price: 0, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🪥", name: "فرشاة كهربائية", reviews: rev.ar, price: "199" },
          { emoji: "🧵", name: "خيط تنظيف معطّر", reviews: rev.ar, price: "35" },
        ],
      },
      coupon: { couponCode: "SMILE25" },
      freeShipping: fsAr("70", "أضف 70", [
        { emoji: "🧪", name: "اختبار حساسية", price: "45" },
        { emoji: "📋", name: "تقرير مختصر", price: "40" },
      ]),
      productSwap: {
        productEmoji: "✨",
        productName: "باقة تجميل ابتسامة كاملة",
        reviews: rev.ar,
        origPrice: "1800 ⃁",
        newPrice: "1549 ⃁",
        saveBadge: "وفّر 251 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 session", "No discount", "250"],
          ["2 sessions", "8% off", "460"],
          ["3 sessions", "15% off + report", "638"],
        ],
        "500",
        "750",
        "-8%",
        "-15%",
      ),
      buyTogether: {
        items: [
          { emoji: "🦷", name: "Professional dental cleaning", reviews: rev.en, price: 300, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🧴", name: "At-home whitening kit", reviews: rev.en, price: 180, originalPrice: 220, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📷", name: "Panoramic X-ray", price: 120, checked: true },
          { emoji: "🩺", name: "Quick clinician consult", price: 80, checked: false },
          { emoji: "💊", name: "Post-care mouth rinse", price: 45, checked: true },
          { emoji: "📅", name: "Follow-up booking (free)", price: 0, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🪥", name: "Electric toothbrush", reviews: rev.en, price: "199" },
          { emoji: "🧵", name: "Waxed floss pack", reviews: rev.en, price: "35" },
        ],
      },
      coupon: { couponCode: "SMILE25" },
      freeShipping: fsEn("70", "70", [
        { emoji: "🧪", name: "Sensitivity screening", price: "45" },
        { emoji: "📋", name: "Short clinical summary", price: "40" },
      ]),
      productSwap: {
        productEmoji: "✨",
        productName: "Full smile makeover package",
        reviews: rev.en,
        origPrice: "1800 SAR",
        newPrice: "1549 SAR",
        saveBadge: "Save 251 SAR",
      },
    },
  },

  charity: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["مساهمة أساسية", "بدون هدية", "50"],
          ["مساهمة مضاعفة", "تقرير تأثير", "95"],
          ["مساهمة موسعة", "شهادة + بادج رقمي", "140"],
        ],
        "100",
        "150",
        "×2",
        "×3",
      ),
      buyTogether: {
        items: [
          { emoji: "🍞", name: "وجبة لعائلة محتاجة", reviews: rev.ar, price: 75, originalPrice: null, checked: true, tag: "هذا التبرع" },
          { emoji: "📦", name: "سلة غذاء طارئ", reviews: rev.ar, price: 120, originalPrice: 145, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "💧", name: "قارورة ماء نظيف", price: 15, checked: true },
          { emoji: "🧸", name: "لعبة تعليمية", price: 35, checked: false },
          { emoji: "📜", name: "إيصال تبرع إلكتروني", price: 0, checked: true },
          { emoji: "🕌", name: "مساهمة إفطار", price: 40, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "📚", name: "حقيبة قرطاسية لطفل", reviews: rev.ar, price: "55" },
          { emoji: "🩹", name: "صندوق إسعافات مدرسية", reviews: rev.ar, price: "65" },
        ],
      },
      coupon: { couponCode: "GIVE10" },
      freeShipping: fsAr("30", "أضف 30", [
        { emoji: "🥛", name: "حليب مجفف", price: "22" },
        { emoji: "🍚", name: "أرز تكافل", price: "18" },
      ]),
      productSwap: {
        productEmoji: "🌟",
        productName: "ترقية إلى راعي شهري",
        reviews: rev.ar,
        origPrice: "200 ⃁",
        newPrice: "179 ⃁",
        saveBadge: "خصم راعٍ",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["Core donation", "No gift", "50"],
          ["Matched gift", "Impact report", "95"],
          ["Major gift", "Certificate + digital badge", "140"],
        ],
        "100",
        "150",
        "×2",
        "×3",
      ),
      buyTogether: {
        items: [
          { emoji: "🍞", name: "Family bread & staples box", reviews: rev.en, price: 75, originalPrice: null, checked: true, tag: "This donation" },
          { emoji: "📦", name: "Emergency food basket", reviews: rev.en, price: 120, originalPrice: 145, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "💧", name: "Clean water bottle", price: 15, checked: true },
          { emoji: "🧸", name: "Learning toy", price: 35, checked: false },
          { emoji: "📜", name: "E-donation receipt", price: 0, checked: true },
          { emoji: "🕌", name: "Iftar meal slot", price: 40, checked: true },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "📚", name: "School kit for a child", reviews: rev.en, price: "55" },
          { emoji: "🩹", name: "First-aid classroom box", reviews: rev.en, price: "65" },
        ],
      },
      coupon: { couponCode: "GIVE10" },
      freeShipping: fsEn("30", "30", [
        { emoji: "🥛", name: "Milk powder pouch", price: "22" },
        { emoji: "🍚", name: "Rice aid pack", price: "18" },
      ]),
      productSwap: {
        productEmoji: "🌟",
        productName: "Upgrade to monthly sponsor",
        reviews: rev.en,
        origPrice: "200 SAR",
        newPrice: "179 SAR",
        saveBadge: "Sponsor deal",
      },
    },
  },

  gold: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["جرام واحد", "سعر اليوم", "285"],
          ["جرامان", "خصم مصنعية 5%", "548"],
          ["3 جرامات", "خصم مصنعية 10٪ + شهادة", "807"],
        ],
        "570",
        "855",
        "-5%",
        "-10%",
      ),
      buyTogether: {
        items: [
          { emoji: "🥇", name: "سبيكة ذهب 24 قيراط", reviews: rev.ar, price: 4500, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🔒", name: "خزنة إيداع شهر", reviews: rev.ar, price: 99, originalPrice: 129, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🪪", name: "توثيق رسمي", price: 75, checked: true },
          { emoji: "📮", name: "تأمين شحن مُدار", price: 45, checked: false },
          { emoji: "🧪", name: "فحص عيار في المعمل", price: 120, checked: true },
          { emoji: "🎁", name: "علبة مخمل", price: 35, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "💠", name: "عملة ذهبية تذكارية", reviews: rev.ar, price: "890" },
          { emoji: "⚖️", name: "ميزان جيب رقمي", reviews: rev.ar, price: "65" },
        ],
      },
      coupon: { couponCode: "INGOT7" },
      freeShipping: fsAr("210", "أضف 210", [
        { emoji: "🔔", name: "جلد حماية للسبيكة", price: "120" },
        { emoji: "📜", name: "شهادة مسبوقة", price: "110" },
      ]),
      productSwap: {
        productEmoji: "🏅",
        productName: "سبيكة كيلو معتمدة — تسليم فرع",
        reviews: rev.ar,
        origPrice: "285000 ⃁",
        newPrice: "279500 ⃁",
        saveBadge: "وفّر مصنعية",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 gram", "Spot price", "285"],
          ["2 grams", "5% making fee off", "548"],
          ["3 grams", "10% making fee off + cert", "807"],
        ],
        "570",
        "855",
        "-5%",
        "-10%",
      ),
      buyTogether: {
        items: [
          { emoji: "🥇", name: "24K gold bullion bar", reviews: rev.en, price: 4500, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🔒", name: "1-month vault slot", reviews: rev.en, price: 99, originalPrice: 129, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "🪪", name: "Assay documentation", price: 75, checked: true },
          { emoji: "📮", name: "Insured courier", price: 45, checked: false },
          { emoji: "🧪", name: "Lab purity test", price: 120, checked: true },
          { emoji: "🎁", name: "Velvet display box", price: 35, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "💠", name: "Commemorative gold coin", reviews: rev.en, price: "890" },
          { emoji: "⚖️", name: "Pocket digital scale", reviews: rev.en, price: "65" },
        ],
      },
      coupon: { couponCode: "INGOT7" },
      freeShipping: fsEn("210", "210", [
        { emoji: "🔔", name: "Bar protective sleeve", price: "120" },
        { emoji: "📜", name: "Pre-printed certificate", price: "110" },
      ]),
      productSwap: {
        productEmoji: "🏅",
        productName: "Certified 1kg bar — branch pickup",
        reviews: rev.en,
        origPrice: "285000 SAR",
        newPrice: "279500 SAR",
        saveBadge: "Making-fee savings",
      },
    },
  },

  livestock: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["كيس واحد", "بدون خصم", "85"],
          ["كيسان", "خصم 7%", "158"],
          ["3 أكياس", "خصم 14٪ + توصيل مزرعة", "219"],
        ],
        "170",
        "255",
        "-7%",
        "-14%",
      ),
      buyTogether: {
        items: [
          { emoji: "🐑", name: "علف أغنام مركّز 25كغ", reviews: rev.ar, price: 185, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🧂", name: "خلطة معادن وأملاح", reviews: rev.ar, price: 42, originalPrice: 55, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "💉", name: "مكمل فيتامينات", price: 65, checked: true },
          { emoji: "🪣", name: "علاف دوّار", price: 120, checked: false },
          { emoji: "📋", name: "جدول تغذية أسبوعي", price: 15, checked: true },
          { emoji: "🚜", name: "توصيل إلى حظيرة", price: 80, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🌾", name: "تبن مكبوس بال", reviews: rev.ar, price: "95" },
          { emoji: "🥛", name: "حليب باشمات معالج", reviews: rev.ar, price: "38" },
        ],
      },
      coupon: { couponCode: "FARM14" },
      freeShipping: fsAr("44", "أضف 44", [
        { emoji: "🏺", name: "معقم حوض الشرب", price: "28" },
        { emoji: "🧴", name: "مطهر خوارجي", price: "32" },
      ]),
      productSwap: {
        productEmoji: "🐄",
        productName: "علف أبقار عالي الطاقة — بالة",
        reviews: rev.ar,
        origPrice: "240 ⃁",
        newPrice: "205 ⃁",
        saveBadge: "وفّر 35 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["1 sack", "No discount", "85"],
          ["2 sacks", "7% off", "158"],
          ["3 sacks", "14% off + farm drop", "219"],
        ],
        "170",
        "255",
        "-7%",
        "-14%",
      ),
      buyTogether: {
        items: [
          { emoji: "🐑", name: "Sheep concentrate feed 25kg", reviews: rev.en, price: 185, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🧂", name: "Mineral salt lick mix", reviews: rev.en, price: 42, originalPrice: 55, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "💉", name: "Vitamin booster shot pack", price: 65, checked: true },
          { emoji: "🪣", name: "Automatic feeder upgrade", price: 120, checked: false },
          { emoji: "📋", name: "Weekly ration chart", price: 15, checked: true },
          { emoji: "🚜", name: "Barn-door delivery", price: 80, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "🌾", name: "Baled hay (local)", reviews: rev.en, price: "95" },
          { emoji: "🥛", name: "Pasteurized colostrum mix", reviews: rev.en, price: "38" },
        ],
      },
      coupon: { couponCode: "FARM14" },
      freeShipping: fsEn("44", "44", [
        { emoji: "🏺", name: "Trough sanitizer tablet", price: "28" },
        { emoji: "🧴", name: "Hoof spray refill", price: "32" },
      ]),
      productSwap: {
        productEmoji: "🐄",
        productName: "High-energy dairy cow ration — bale",
        reviews: rev.en,
        origPrice: "240 SAR",
        newPrice: "205 SAR",
        saveBadge: "Save 35 SAR",
      },
    },
  },

  generic: {
    ar: {
      buyMoreSaveMore: buyMore(
        "ar",
        [
          ["باقة أساسية", "بدون خصم", "499"],
          ["باقتان", "خصم 10%", "898"],
          ["3 باقات", "خصم 18٪ + جلسة مراجعة", "1229"],
        ],
        "998",
        "1497",
        "-10%",
        "-18%",
      ),
      buyTogether: {
        items: [
          { emoji: "📐", name: "ورشة هوية بصرية — يوم", reviews: rev.ar, price: 2500, originalPrice: null, checked: true, tag: "هذا المنتج" },
          { emoji: "🗂️", name: "دليل أسلوب توثيق", reviews: rev.ar, price: 350, originalPrice: 450, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📹", name: "تسجيل جلسة", price: 200, checked: true },
          { emoji: "🎨", name: "لوحة ألوان إضافية", price: 150, checked: false },
          { emoji: "📅", name: "متابعة أسبوعية (4)", price: 800, checked: true },
          { emoji: "✈️", name: "زيارة موقع", price: 1200, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "📊", name: "قالب عرض للعميل", reviews: rev.ar, price: "180" },
          { emoji: "🖋️", name: "عقد خدمات قالب", reviews: rev.ar, price: "90" },
        ],
      },
      coupon: { couponCode: "BRIEF12" },
      freeShipping: fsAr("120", "أضف 120", [
        { emoji: "📝", name: "استبيان تثبيت", price: "70" },
        { emoji: "🔗", name: "لوحة روابط ملهمة", price: "65" },
      ]),
      productSwap: {
        productEmoji: "🏢",
        productName: "باقة شاملة — استراتيجية + تنفيذ",
        reviews: rev.ar,
        origPrice: "12000 ⃁",
        newPrice: "9990 ⃁",
        saveBadge: "وفّر 2010 ⃁",
      },
    },
    en: {
      buyMoreSaveMore: buyMore(
        "en",
        [
          ["Core package", "No discount", "499"],
          ["2 packages", "10% off", "898"],
          ["3 packages", "18% off + review call", "1229"],
        ],
        "998",
        "1497",
        "-10%",
        "-18%",
      ),
      buyTogether: {
        items: [
          { emoji: "📐", name: "Brand identity workshop (1 day)", reviews: rev.en, price: 2500, originalPrice: null, checked: true, tag: "This product" },
          { emoji: "🗂️", name: "Documentation style guide", reviews: rev.en, price: 350, originalPrice: 450, checked: true, tag: null },
        ],
      },
      addons: {
        items: [
          { emoji: "📹", name: "Session recording pack", price: 200, checked: true },
          { emoji: "🎨", name: "Extra palette exploration", price: 150, checked: false },
          { emoji: "📅", name: "Weekly check-ins (×4)", price: 800, checked: true },
          { emoji: "✈️", name: "On-site walkthrough", price: 1200, checked: false },
        ],
      },
      relatedProducts: {
        products: [
          { emoji: "📊", name: "Client presentation deck", reviews: rev.en, price: "180" },
          { emoji: "🖋️", name: "MSA template pack", reviews: rev.en, price: "90" },
        ],
      },
      coupon: { couponCode: "BRIEF12" },
      freeShipping: fsEn("120", "120", [
        { emoji: "📝", name: "Stakeholder intake form", price: "70" },
        { emoji: "🔗", name: "Mood-board link kit", price: "65" },
      ]),
      productSwap: {
        productEmoji: "🏢",
        productName: "Full retainers — strategy + delivery",
        reviews: rev.en,
        origPrice: "12000 SAR",
        newPrice: "9990 SAR",
        saveBadge: "Save 2010 SAR",
      },
    },
  },
} satisfies Record<string, LangBundle>;

const SECTOR_TO_PRESET: Record<string, keyof typeof PRESETS> = {
  "delivery-apps": "delivery",
  "ecommerce-platforms": "retail",
  "abayas-fashion": "fashion",
  "health-fitness": "health",
  "digital-products": "digital",
  electronics: "electronics",
  jewelry: "jewelry",
  "beauty-care": "beauty",
  "restaurants-cafes": "foodService",
  "home-supplies": "home",
  "service-design": "generic",
  charities: "charity",
  clinics: "clinic",
  "digital-cards": "digitalCards",
  gold: "gold",
  livestock: "livestock",
};

export function getSectorWidgetShowcaseDemos(
  sectorSlug: string | undefined,
  lang: "ar" | "en",
): SectorShowcaseDemoBundle | undefined {
  if (!sectorSlug) return undefined;
  const preset = SECTOR_TO_PRESET[sectorSlug];
  if (!preset) return undefined;
  return PRESETS[preset]?.[lang];
}

/** Shallow merge: only defined keys from patch override base (avoids wiping fields with undefined). */
export function mergeShowcaseDemo<T extends object>(base: T, patch?: Partial<T>): T {
  if (!patch) return base;
  const out = { ...base } as T;
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const v = patch[key];
    if (v !== undefined) (out as Record<string, unknown>)[key as string] = v as unknown;
  }
  return out;
}
