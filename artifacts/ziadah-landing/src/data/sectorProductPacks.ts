/**
 * EACH SECTOR'S OWN SHELF, FOR THE LIVE EXAMPLES.
 *
 * The live-examples band used to show the same thirteen sheets, in the same
 * wireless earbuds and phone case, on every sector page. A delivery app owner
 * reading about "buy them all" saw a charger. A pack is the five products that
 * band shows for one sector, in the roles the sheets give them:
 *
 *   main  the product the shopper is already looking at
 *   a, b  the two things that most often go with it
 *   c     a small, cheap, repeat-purchase item (the one that gets a quantity offer)
 *   up    the premium step up from `main`: always priced ABOVE it, because the
 *         swap sheet states the difference
 *
 * Photographs exist for some of these and not for others. A product without
 * one wears an icon for its kind (`lib/product-icons.tsx`), never a letter.
 * Both languages are written out: the same product, named the way each
 * audience says it.
 */

export type PackItem = { ar: string; en: string; price: number };

export type ProductPack = {
  main: PackItem;
  a: PackItem;
  b: PackItem;
  c: PackItem;
  /** The premium step up from `main`. Its price must exceed `main`'s. */
  up: PackItem;
  /** The one line under the quantity sheet's title. */
  qtyNote: { ar: string; en: string };
  /** Size options, for a shelf whose products come in sizes. Omitted, no size row. */
  sizes?: string[];
  /** The category tag on a product card ("Audio device" in the frame). */
  tag: { ar: string; en: string };
};

const it = (ar: string, en: string, price: number): PackItem => ({ ar, en, price });

export const SECTOR_PACKS: Record<string, ProductPack> = {
  "delivery-apps": {
    tag: { ar: "وجبات", en: "Meals" },
    main: it("برجر كلاسيك", "Classic Burger", 28),
    a: it("بطاطس مقرمشة كبيرة", "Large crispy fries", 12),
    b: it("مشروب كولا 500مل", "Cola 500ml", 6),
    c: it("حلى كنافة mini", "Mini kunafa", 9),
    up: it("وجبة عائلية ×4", "Family meal ×4", 95),
    qtyNote: {
      ar: "المشروب يخلص قبل الوجبة. من يطلب واحداً يطلب غيره بعد ربع ساعة.",
      en: "The drink runs out before the meal. Whoever orders one orders another in fifteen minutes.",
    },
  },
  "restaurants-cafes": {
    tag: { ar: "قائمة الطعام", en: "Menu" },
    main: it("شاورما عادي", "Regular shawarma wrap", 22),
    a: it("بطاطس ودجز", "Wedges Fries", 14),
    b: it("مشروبات غازية ×4", "Soft drinks ×4", 20),
    c: it("حلى كنافة mini", "Mini kunafa", 9),
    up: it("برجر دبل — مطعم الرياض", "Double burger — Riyadh Kitchen", 38),
    qtyNote: {
      ar: "الحلى الصغير يُطلب مرة ثانية على الطاولة نفسها.",
      en: "The small dessert gets ordered a second time at the same table.",
    },
  },
  "beauty-care": {
    tag: { ar: "عناية بالبشرة", en: "Skincare" },
    main: it("كريم مرطب SPF 50", "SPF 50 moisturizer", 120),
    a: it("غسول لطيف", "Gentle cleanser", 65),
    b: it("تونر مكمل", "Matching toner", 70),
    c: it("واقي شمس صباحي", "AM sunscreen", 95),
    up: it("سيروم فيتامين C", "Vitamin C serum", 185),
    qtyNote: {
      ar: "الواقي يخلص أسرع من أي خطوة في الروتين. من يشتري واحداً يعود بعد شهر.",
      en: "Sunscreen runs out faster than any other step. Whoever buys one comes back in a month.",
    },
  },
  jewelry: {
    tag: { ar: "مجوهرات", en: "Jewellery" },
    main: it("مسبحة فضة 925", "925 Silver Prayer Beads", 160),
    a: it("حرز فضة", "Silver amulet", 90),
    b: it("صندوق هدايا مخملي", "Velvet Gift Box", 60),
    c: it("حقيبة هدية", "Gift bag", 25),
    up: it("سلسلة ذهبية بحجر الياقوت", "Gold Chain with Ruby Stone", 980),
    qtyNote: {
      ar: "التغليف يُضاف لكل هدية. من يشتري واحداً يحتاج غيره قبل المناسبة التالية.",
      en: "Every gift needs its wrapping. Whoever buys one needs another before the next occasion.",
    },
  },
  gold: {
    tag: { ar: "ذهب", en: "Gold" },
    main: it("خاتم ذهب 18 قيراط", "18k gold ring", 980),
    a: it("علبة حفظ فاخرة", "Luxury storage box", 85),
    b: it("طوق خفيف 21 قيراط", "Light 21k necklace", 1450),
    c: it("حقيبة هدية", "Gift bag", 40),
    up: it("سوار ذهب 21 قيراط", "21k gold bracelet", 1850),
    qtyNote: {
      ar: "علبة الحفظ تُضاف لكل قطعة. من يشتري قطعتين يحتاج علبتين.",
      en: "A storage box goes with every piece. Whoever buys two pieces needs two boxes.",
    },
  },
  electronics: {
    tag: { ar: "إلكترونيات", en: "Electronics" },
    main: it("سماعات لاسلكية", "Wireless Earbuds", 320),
    a: it("غطاء حماية الهاتف", "Phone Protective Case", 120),
    b: it("واقي شاشة زجاجي", "Glass Screen Protector", 85),
    c: it("رأس شاحن سريع وكابل", "Fast charger head & cable", 95),
    up: it("شاحن لاسلكي سريع", "Fast Wireless Charger", 440),
    qtyNote: {
      ar: "الكيبل يُفقد ويُترك. من يشتري واحداً يعود بعد شهرين.",
      en: "A cable gets lost and left behind. Whoever buys one comes back in two months.",
    },
  },
  "ecommerce-platforms": {
    tag: { ar: "منتجات", en: "Products" },
    main: it("سماعات لاسلكية", "Wireless Earbuds", 320),
    a: it("حقيبة يد صغيرة", "Small handbag", 210),
    b: it("زيت أرجان طبيعي", "Natural argan oil", 75),
    c: it("بخور عربي", "Arabic incense", 35),
    up: it("حذاء ركض", "Running shoes", 450),
    qtyNote: {
      ar: "المتجر الواحد يبيع الصنف نفسه بالكمية لمن يكرر الشراء.",
      en: "One store sells the same item in bulk to shoppers who repeat the purchase.",
    },
  },
  "abayas-fashion": {
    tag: { ar: "أزياء", en: "Fashion" },
    sizes: ["52", "54", "56", "58"],
    main: it("عباية كريب سوداء", "Black crepe abaya", 320),
    a: it("طرحة شيفون", "Chiffon scarf", 70),
    b: it("حقيبة يد صغيرة", "Small handbag", 210),
    c: it("بروش معدني", "Metal brooch", 30),
    up: it("عباية مطرزة", "Embroidered abaya", 540),
    qtyNote: {
      ar: "الطرحة تُشترى بألوان متعددة مع العباية نفسها.",
      en: "Scarves are bought in several colours with the same abaya.",
    },
  },
  "health-fitness": {
    tag: { ar: "لياقة", en: "Fitness" },
    main: it("حذاء ركض", "Running shoes", 280),
    a: it("قارورة مياه رياضية", "Sports water bottle", 45),
    b: it("مفرشة يوغا", "Yoga mat", 95),
    c: it("حبل قفز", "Jump rope", 35),
    up: it("بروتين مصل اللبن 2 كغ", "Whey protein 2 kg", 340),
    qtyNote: {
      ar: "الأوزان الخفيفة تُشترى بالأزواج. من يبدأ بواحد يكمل الزوج.",
      en: "Light weights are bought in pairs. Whoever starts with one finishes the pair.",
    },
  },
  clinics: {
    tag: { ar: "عناية طبية", en: "Care" },
    main: it("واقي شمس صباحي", "AM sunscreen", 95),
    a: it("غسول لطيف", "Gentle cleanser", 65),
    b: it("سيروم ليلي", "Night serum", 140),
    c: it("مرطب علاجي", "Medical moisturizer", 80),
    up: it("باقة العناية بعد الجلسة", "Post-session care kit", 320),
    qtyNote: {
      ar: "منتج العناية بعد الجلسة يُكرّر كل ثلاثة أسابيع حتى تكتمل الخطة.",
      en: "A post-session care product repeats every three weeks until the plan is done.",
    },
  },
  charities: {
    tag: { ar: "تبرعات", en: "Donations" },
    main: it("سلة غذائية", "Food basket", 150),
    a: it("سقيا ماء", "Water donation", 30),
    b: it("حقيبة مدرسية", "School bag", 120),
    c: it("كفالة يتيم شهر", "Orphan sponsorship, one month", 100),
    up: it("كسوة شتاء لأسرة", "Winter clothing for a family", 400),
    qtyNote: {
      ar: "المتبرع يكرر التبرع نفسه كل شهر لمن بدأ بواحد.",
      en: "A donor repeats the same donation every month once they start with one.",
    },
  },
  "digital-cards": {
    tag: { ar: "بطاقات", en: "Cards" },
    main: it("بطاقة هدية 100", "Gift card 100", 100),
    a: it("بطاقة ألعاب 50", "Gaming card 50", 50),
    b: it("بطاقة شحن جوال 30", "Mobile top-up card 30", 30),
    c: it("بطاقة موسيقى شهر", "Music subscription, one month", 25),
    up: it("بطاقة هدية 500", "Gift card 500", 500),
    qtyNote: {
      ar: "من يشتري بطاقة واحدة يشتري لغيره قبل المناسبة.",
      en: "Whoever buys one card buys for others before the occasion.",
    },
  },
  "digital-products": {
    tag: { ar: "منتجات رقمية", en: "Digital" },
    main: it("دورة تصميم أساسيات", "Design fundamentals course", 199),
    a: it("كتاب إلكتروني", "E-book", 49),
    b: it("قالب جاهز", "Ready template", 79),
    c: it("باقة أيقونات", "Icon pack", 29),
    up: it("باقة الدورات الكاملة", "The full course bundle", 599),
    qtyNote: {
      ar: "القوالب الصغيرة تُشترى حزماً. من يشتري واحداً يحتاج بقيتها.",
      en: "Small templates are bought in sets. Whoever buys one needs the rest.",
    },
  },
  livestock: {
    tag: { ar: "ذبائح", en: "Livestock" },
    main: it("خروف نعيمي", "Naimi lamb", 1400),
    a: it("خدمة التقطيع", "Cutting service", 40),
    b: it("خدمة التوصيل المبرّد", "Chilled delivery", 60),
    c: it("أكياس تعبئة", "Packing bags", 15),
    up: it("ذبيحة كاملة مع توصيل", "Whole lamb with delivery", 1900),
    qtyNote: {
      ar: "أكياس التعبئة تُطلب بحسب عدد الأسر المستفيدة.",
      en: "Packing bags are ordered by the number of households receiving a share.",
    },
  },
  "home-supplies": {
    tag: { ar: "مستلزمات المنزل", en: "Home" },
    main: it("طقم أكواب زجاج", "Glass cup set", 85),
    a: it("منظف أرضيات", "Floor cleaner", 25),
    b: it("سلة غسيل", "Laundry basket", 60),
    c: it("مناديل ورقية", "Paper tissues", 12),
    up: it("طقم مناشف فاخر", "Premium towel set", 160),
    qtyNote: {
      ar: "المناديل تُستهلك أسرع من أي شيء في القائمة. من يشتري علبة يعود بعد أسبوعين.",
      en: "Tissues go faster than anything on the list. Whoever buys one box is back in two weeks.",
    },
  },
  "service-design": {
    tag: { ar: "خدمات تصميم", en: "Design" },
    main: it("تصميم شعار", "Logo design", 450),
    a: it("بطاقة أعمال", "Business card", 90),
    b: it("قالب منشورات", "Social post template", 120),
    c: it("ستيكرات علامة", "Brand stickers", 40),
    up: it("هوية بصرية كاملة", "Full brand identity", 1800),
    qtyNote: {
      ar: "القوالب تُستخدم شهرياً. من يشتري واحداً يطلب غيره مع كل حملة.",
      en: "Templates are used monthly. Whoever buys one orders another with every campaign.",
    },
  },
};

/** The electronics shelf, which the home page and the solution pages keep. */
export const DEFAULT_PACK: ProductPack = SECTOR_PACKS.electronics;

export function packForSector(slug: string): ProductPack {
  return SECTOR_PACKS[slug] ?? DEFAULT_PACK;
}
