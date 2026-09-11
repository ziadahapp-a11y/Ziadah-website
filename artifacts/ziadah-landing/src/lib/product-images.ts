/**
 * Product photography for the storefront previews, keyed by the product name
 * the widget renders.
 *
 * Only names the site ACTUALLY renders are listed. That distinction cost a
 * round: the first list was built from `sectorWidgetShowcaseDemos.ts`, which
 * defines 160 products and renders none of them - the section that consumes it
 * sits behind a condition in `SectorDetail` that no sector currently meets. A
 * render sweep of the home page, the use-case pages and the sector pages finds
 * 50 names, and those 50 are what is here. Regenerate this from a runtime
 * sweep, never from a data file.
 *
 * Both languages point at ONE file. The photograph is of the product, not of
 * the word for it, so an English page and an Arabic page show the same object.
 *
 * Anything unmapped falls back to the initial tile in `ProductTile`, and so
 * does a path whose file is missing - see the `onError` there. A gap costs
 * nothing and the catalogue can keep growing.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  /* ── PHONES AND ACCESSORIES ── */
  "رأس شاحن سريع وكابل": "/products/charger-fast-cable.webp",
  "Fast charger head & cable": "/products/charger-fast-cable.webp",
  "سماعات سلكية": "/products/earphones-wired.webp",
  "Wired earphones": "/products/earphones-wired.webp",
  "غطاء حماية الهاتف": "/products/phone-case.webp",
  "Phone Protective Case": "/products/phone-case.webp",
  "شاحن لاسلكي سريع": "/products/charger-wireless.webp",
  "Fast Wireless Charger": "/products/charger-wireless.webp",
  "سماعات لاسلكية": "/products/earbuds-wireless.webp",
  "Wireless Earbuds": "/products/earbuds-wireless.webp",
  "واقي شاشة زجاجي": "/products/screen-protector.webp",
  "Glass Screen Protector": "/products/screen-protector.webp",

  /* ── FASHION ── */
  "قميص فلانيل رجالي": "/products/shirt-flannel.webp",
  "Men's Flannel Shirt": "/products/shirt-flannel.webp",
  "حذاء جري خفيف": "/products/shoe-running.webp",
  "Lightweight running shoe": "/products/shoe-running.webp",
  "حقيبة يد صغيرة": "/products/fashion-03.webp",
  "Small handbag": "/products/fashion-03.webp",

  /* ── JEWELLERY ── */
  "سلسلة ذهبية بحجر الياقوت": "/products/necklace-gold-ruby.webp",
  "Gold Chain with Ruby Stone": "/products/necklace-gold-ruby.webp",
  "أقراط ذهبية بحجر الياقوت": "/products/earrings-gold-ruby.webp",
  "Gold Earrings with Ruby Stone": "/products/earrings-gold-ruby.webp",
  "مسبحة فضة 925": "/products/prayer-beads-silver.webp",
  "925 Silver Prayer Beads": "/products/prayer-beads-silver.webp",
  "حرز فضة": "/products/amulet-silver.webp",
  "Silver amulet": "/products/amulet-silver.webp",

  /* ── PRAYER BEADS, INCENSE, GIFTING ── */
  "مسبحة باكليت حمراء": "/products/prayer-beads-bakelite-red.webp",
  "Red Bakelite Prayer Beads": "/products/prayer-beads-bakelite-red.webp",
  "مسبحة باكليت": "/products/prayer-beads-bakelite.webp",
  "Bakelite prayer beads": "/products/prayer-beads-bakelite.webp",
  "مسبحة عود طبيعي": "/products/prayer-beads-oud.webp",
  "Natural Oud Prayer Beads": "/products/prayer-beads-oud.webp",
  "مسبحة كهرمان": "/products/prayer-beads-amber.webp",
  "Amber prayer beads": "/products/prayer-beads-amber.webp",
  "بخّاخ عود فاخر": "/products/oud-spray.webp",
  "Premium Oud Spray": "/products/oud-spray.webp",
  "بخور عود أصيل": "/products/incense-oud.webp",
  "Pure oud incense": "/products/incense-oud.webp",
  "بخور فاخر": "/products/incense-premium.webp",
  "Premium incense": "/products/incense-premium.webp",
  "بخور عربي": "/products/incense-arabic.webp",
  "Arabic incense": "/products/incense-arabic.webp",
  "زيت بخور": "/products/incense-oil.webp",
  "Incense oil": "/products/incense-oil.webp",
  "سجادة صلاة": "/products/prayer-rug.webp",
  "Prayer rug": "/products/prayer-rug.webp",
  "صندوق هدايا مخملي": "/products/gift-box-velvet.webp",
  "Velvet Gift Box": "/products/gift-box-velvet.webp",
  "حقيبة هدية": "/products/gift-bag.webp",
  "Gift bag": "/products/gift-bag.webp",
  "تغليف هدية فاخر": "/products/gift-wrap-premium.webp",
  "Premium gift wrap": "/products/gift-wrap-premium.webp",
  "طقم هدايا": "/products/gift-set.webp",
  "Gift set": "/products/gift-set.webp",

  /* ── BEAUTY ── */
  "زيت أرجان طبيعي": "/products/argan-oil.webp",
  "Natural argan oil": "/products/argan-oil.webp",
  "كريم ليلي مرطب": "/products/cream-night.webp",
  "Night cream": "/products/cream-night.webp",
  "واقي شمس صباحي": "/products/sunscreen-am.webp",
  "AM sunscreen": "/products/sunscreen-am.webp",
  "تونر مكمل": "/products/toner.webp",
  "Matching toner": "/products/toner.webp",
  "سيروم ليلي — نفس الخط": "/products/serum-night.webp",
  "Night serum — same line": "/products/serum-night.webp",
  "كريم مرطب SPF 50": "/products/beauty-01.webp",
  "SPF 50 moisturizer": "/products/beauty-01.webp",
  "سيروم فيتامين C": "/products/beauty-02.webp",
  "Vitamin C serum": "/products/beauty-02.webp",
  "غسول لطيف": "/products/beauty-03.webp",
  "Gentle cleanser": "/products/beauty-03.webp",

  /* ── FOOD AND DELIVERY ── */
  "برجر كلاسيك": "/products/burger-classic.webp",
  "Classic Burger": "/products/burger-classic.webp",
  "برجر دبل — مطعم الرياض": "/products/burger-double.webp",
  "Double burger — Riyadh Kitchen": "/products/burger-double.webp",
  "بيتزا عائلية": "/products/pizza-family.webp",
  "Family Pizza": "/products/pizza-family.webp",
  "بطاطس ودجز": "/products/fries-wedges.webp",
  "Wedges Fries": "/products/fries-wedges.webp",
  "بطاطس مقرمشة كبيرة": "/products/fries-large.webp",
  "Large crispy fries": "/products/fries-large.webp",
  "مشروب كولا 500مل": "/products/cola-500ml.webp",
  "Cola 500ml": "/products/cola-500ml.webp",
  "وجبة عائلية ×4": "/products/meal-family.webp",
  "Family meal ×4": "/products/meal-family.webp",
  "مشروبات غازية ×4": "/products/soft-drinks-4.webp",
  "Soft drinks ×4": "/products/soft-drinks-4.webp",
  "شاورما عادي": "/products/shawarma.webp",
  "Regular shawarma wrap": "/products/shawarma.webp",
  "حلى كنافة mini": "/products/kunafa-mini.webp",
  "Mini kunafa": "/products/kunafa-mini.webp",
  "ساندويتش دجاج — عرض": "/products/sandwich-chicken.webp",
  "Chicken sandwich — deal": "/products/sandwich-chicken.webp",
  "مسحب لحم": "/products/beef-musahab.webp",
  "Slow-cooked beef musahab": "/products/beef-musahab.webp",
  "رز بسمتي + سلطة": "/products/rice-basmati-salad.webp",
  "Basmati rice + salad": "/products/rice-basmati-salad.webp",
  "مشروب غازي": "/products/delivery-06.webp",
  "Soft drink": "/products/delivery-06.webp",

  /* ── NOT A PRODUCT, BUT IT RENDERS IN A PRODUCT ROW ──
     A warranty is a line item, not an object, so its tile is the shield the
     rest of the site uses for cover. `سلة غير مكتملة` and
     `خصم 12٪ على الطلب الحالي` are a cart state and an offer; there is nothing
     to photograph, so they keep the letter tile. */
  "ضمان إضافي سنة": "/products/retail-05.webp",
  "One extra year of warranty": "/products/retail-05.webp",
};

/* Arabic copy varies in ways that must not miss a match: tatweel, the alef and
   yaa forms, and the diacritics an author may or may not type. */
function normalise(s: string): string {
  return s
    .trim()
    .replace(/ـ/g, "")
    .replace(/[ً-ْٰ]/g, "")
    .replace(/[آأإ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

const NORMALISED: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCT_IMAGES).map(([k, v]) => [normalise(k), v]),
);

export function productImage(name: string): string | null {
  return PRODUCT_IMAGES[name.trim()] ?? NORMALISED[normalise(name)] ?? null;
}
