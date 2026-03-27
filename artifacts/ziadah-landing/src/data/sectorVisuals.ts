/** أمثلة واجهة مرئية لصفحات القطاعات — بنفس أسلوب صفحة الحلول */

export type SectorMiniProduct = {
  nameAr: string;
  nameEn: string;
  price: string;
  emoji: string;
};

export type SectorVisualScenario = {
  accent: string;
  titleAr: string;
  titleEn: string;
  contextAr: string;
  contextEn: string;
  main: SectorMiniProduct;
  suggested: SectorMiniProduct[];
  widgetAr: string;
  widgetEn: string;
  placementAr: string;
  placementEn: string;
};

export type SectorFlowStep = {
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
};

export type SectorVisualBundle = {
  scenarios: SectorVisualScenario[];
  flow: [SectorFlowStep, SectorFlowStep, SectorFlowStep];
};

const flowDefault: SectorVisualBundle["flow"] = [
  {
    icon: "🧠",
    titleAr: "فهم السلوك",
    titleEn: "Behavior signal",
    descAr: "الصفحة الحالية، السلة، والتصنيفات تُغذّي النموذج بلحظة واحدة.",
    descEn: "Current page, cart, and categories feed the model in one shot.",
  },
  {
    icon: "🎯",
    titleAr: "اختيار المنتجات",
    titleEn: "Pick complements",
    descAr: "الذكاء الاصطناعي يطابق المنتجات المكملة والمناسبة لمجالك.",
    descEn: "AI matches complementary SKUs that fit your vertical.",
  },
  {
    icon: "✨",
    titleAr: "عرض في المكان المناسب",
    titleEn: "Show at the right slot",
    descAr: "ويدجت خفيف في صفحة المنتج، السلة، أو الشكر — دون إزعاج التجربة.",
    descEn: "A light widget on product, cart, or thank-you — without breaking UX.",
  },
];

export const sectorVisualsBySlug: Record<string, SectorVisualBundle> = {
  "abayas-fashion": {
    scenarios: [
      {
        accent: "#a855f7",
        titleAr: "إطقم لونية متناسقة",
        titleEn: "Coordinated color set",
        contextAr: "عميلة تتصفح عباية سوداء مخملية",
        contextEn: "Shopper viewing a black velvet abaya",
        main: { nameAr: "عباية سوداء — مخمل", nameEn: "Black abaya — velvet", price: "289 ⃁", emoji: "🖤" },
        suggested: [
          { nameAr: "شيل حرير بنفسجي غامق", nameEn: "Deep purple silk shawl", price: "79 ⃁", emoji: "🧣" },
          { nameAr: "حقيبة يد صغيرة", nameEn: "Mini handbag", price: "129 ⃁", emoji: "👜" },
        ],
        widgetAr: "اشتروا معاً",
        widgetEn: "Bought together",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#ec4899",
        titleAr: "صيفي + إكسسوار",
        titleEn: "Summer + accessory",
        contextAr: "سلة فيها عباية صيفية خفيفة",
        contextEn: "Cart has a lightweight summer abaya",
        main: { nameAr: "عباية صيف — كتان", nameEn: "Summer abaya — linen", price: "199 ⃁", emoji: "☀️" },
        suggested: [
          { nameAr: "نظارة شمسية", nameEn: "Sunglasses", price: "95 ⃁", emoji: "🕶️" },
          { nameAr: "حذاء مسطح", nameEn: "Flat shoes", price: "110 ⃁", emoji: "🥿" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "صفحة السلة",
        placementEn: "Cart page",
      },
      {
        accent: "#7c3aed",
        titleAr: "ترقية للفئة الأعلى",
        titleEn: "Upsell tier",
        contextAr: "وقت طويل على صفحة عباية أساسية",
        contextEn: "Long dwell on a basic abaya PDP",
        main: { nameAr: "عباية يومية — قياسي", nameEn: "Daily abaya — standard", price: "149 ⃁", emoji: "👗" },
        suggested: [
          { nameAr: "نسخة فاخرة مطرزة", nameEn: "Premium embroidered", price: "349 ⃁", emoji: "✨" },
        ],
        widgetAr: "استبدال (Upsell)",
        widgetEn: "Upsell",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
    ],
    flow: flowDefault,
  },
  "health-fitness": {
    scenarios: [
      {
        accent: "#10b981",
        titleAr: "مكدس تغذية",
        titleEn: "Nutrition stack",
        contextAr: "مشروب بروتين في السلة",
        contextEn: "Protein shake in cart",
        main: { nameAr: "واي بروتين 2كغ", nameEn: "Whey protein 2kg", price: "220 ⃁", emoji: "🥤" },
        suggested: [
          { nameAr: "أوميغا 3", nameEn: "Omega-3", price: "65 ⃁", emoji: "🐟" },
          { nameAr: "شيكر 700مل", nameEn: "Shaker 700ml", price: "35 ⃁", emoji: "🧴" },
        ],
        widgetAr: "اشتروا معاً",
        widgetEn: "Bought together",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#06b6d4",
        titleAr: "جري + مستلزمات",
        titleEn: "Running + gear",
        contextAr: "تصفح حذاء جري",
        contextEn: "Browsing running shoes",
        main: { nameAr: "حذاء جري Pro", nameEn: "Running shoe Pro", price: "450 ⃁", emoji: "👟" },
        suggested: [
          { nameAr: "شراب تقني (طقم)", nameEn: "Technical socks (pack)", price: "45 ⃁", emoji: "🧦" },
          { nameAr: "زجاجة ماء 750مل", nameEn: "Water bottle 750ml", price: "39 ⃁", emoji: "💧" },
        ],
        widgetAr: "منتجات ذات صلة",
        widgetEn: "Related products",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#f59e0b",
        titleAr: "اشتر أكثر ووفر",
        titleEn: "Buy more save more",
        contextAr: "مكمل متكرر الشراء",
        contextEn: "Repeat-buy supplement",
        main: { nameAr: "كرياتين 300غ", nameEn: "Creatine 300g", price: "89 ⃁", emoji: "💪" },
        suggested: [
          { nameAr: "خصم عند شراء 2", nameEn: "2+ tier discount", price: "−15%", emoji: "📦" },
        ],
        widgetAr: "كميات",
        widgetEn: "Quantity tiers",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
    ],
    flow: flowDefault,
  },
  "digital-products": {
    scenarios: [
      {
        accent: "#6366f1",
        titleAr: "قالب + أصول",
        titleEn: "Template + assets",
        contextAr: "شراء قالب تصميم",
        contextEn: "Design template purchase",
        main: { nameAr: "قالب متجر إلكتروني", nameEn: "Ecommerce UI kit", price: "120 ⃁", emoji: "📐" },
        suggested: [
          { nameAr: "حزمة أيقونات", nameEn: "Icon pack", price: "45 ⃁", emoji: "🎨" },
          { nameAr: "خط عربي احترافي", nameEn: "Pro Arabic font", price: "80 ⃁", emoji: "🔤" },
        ],
        widgetAr: "Combo",
        widgetEn: "Combo",
        placementAr: "صفحة الشكر",
        placementEn: "Thank-you page",
      },
      {
        accent: "#8b5cf6",
        titleAr: "كورس ثم مستوى أعلى",
        titleEn: "Course then advanced",
        contextAr: "شراء كورس برمجة مبتدئ",
        contextEn: "Beginner coding course bought",
        main: { nameAr: "كورس JS أساسي", nameEn: "JS fundamentals", price: "199 ⃁", emoji: "💻" },
        suggested: [
          { nameAr: "مشروع عملي متقدم", nameEn: "Advanced capstone", price: "249 ⃁", emoji: "🚀" },
        ],
        widgetAr: "Upsell",
        widgetEn: "Upsell",
        placementAr: "بعد الدفع",
        placementEn: "Post-checkout",
      },
      {
        accent: "#a855f7",
        titleAr: "كوبون لحظي",
        titleEn: "Timely coupon",
        contextAr: "سلة رقمية بدون إتمام",
        contextEn: "Digital cart abandoned",
        main: { nameAr: "كتاب PDF", nameEn: "PDF ebook", price: "49 ⃁", emoji: "📚" },
        suggested: [
          { nameAr: "خصم 10% — 20 دقيقة", nameEn: "10% off — 20 min", price: "كوبون", emoji: "🏷️" },
        ],
        widgetAr: "كوبون خصم",
        widgetEn: "Discount coupon",
        placementAr: "السلة / خروج",
        placementEn: "Cart / exit",
      },
    ],
    flow: flowDefault,
  },
  electronics: {
    scenarios: [
      {
        accent: "#06b6d4",
        titleAr: "نظام بيئي واحد",
        titleEn: "Same ecosystem",
        contextAr: "هاتف في السلة",
        contextEn: "Phone in cart",
        main: { nameAr: "هاتف ذكي — Pro", nameEn: "Smartphone — Pro", price: "3,299 ⃁", emoji: "📱" },
        suggested: [
          { nameAr: "سماعات لاسلكية", nameEn: "Wireless earbuds", price: "499 ⃁", emoji: "🎧" },
          { nameAr: "غطاء حماية", nameEn: "Case + glass", price: "89 ⃁", emoji: "🛡️" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "السلة / الدفع",
        placementEn: "Cart / checkout",
      },
      {
        accent: "#10b981",
        titleAr: "لابتوب + حقيبة",
        titleEn: "Laptop + bag",
        contextAr: "تصفح لابتوب للأعمال",
        contextEn: "Business laptop PDP",
        main: { nameAr: "لابتوب 14\"", nameEn: 'Laptop 14"', price: "4,500 ⃁", emoji: "💻" },
        suggested: [
          { nameAr: "حقيبة لابتوب", nameEn: "Laptop backpack", price: "199 ⃁", emoji: "🎒" },
          { nameAr: "ترقية ذاكرة", nameEn: "RAM upgrade", price: "350 ⃁", emoji: "🧩" },
        ],
        widgetAr: "ذات صلة",
        widgetEn: "Related",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#f59e0b",
        titleAr: "بديل أعلى",
        titleEn: "Higher-tier swap",
        contextAr: "مقارنة بين موديلين",
        contextEn: "Comparing two models",
        main: { nameAr: "تابلت أساسي", nameEn: "Tablet base", price: "899 ⃁", emoji: "📲" },
        suggested: [
          { nameAr: "تابلت Pro — شاشة أفضل", nameEn: "Tablet Pro — better display", price: "1,299 ⃁", emoji: "⭐" },
        ],
        widgetAr: "Upsell",
        widgetEn: "Upsell",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
    ],
    flow: flowDefault,
  },
  jewelry: {
    scenarios: [
      {
        accent: "#eab308",
        titleAr: "إكمال الطقم",
        titleEn: "Complete the set",
        contextAr: "سلسلة ذهب في السلة",
        contextEn: "Gold necklace in cart",
        main: { nameAr: "سلسلة 21 قيراط", nameEn: "21k necklace", price: "2,100 ⃁", emoji: "📿" },
        suggested: [
          { nameAr: "أقراط مطابقة", nameEn: "Matching earrings", price: "890 ⃁", emoji: "✨" },
        ],
        widgetAr: "اشتروا معاً",
        widgetEn: "Bought together",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#f472b6",
        titleAr: "هدية في النطاق",
        titleEn: "Gift in range",
        contextAr: "خاتم خطوبة بسعر معيّن",
        contextEn: "Engagement ring at a price point",
        main: { nameAr: "خاتم الماس", nameEn: "Diamond ring", price: "5,500 ⃁", emoji: "💍" },
        suggested: [
          { nameAr: "ساعة أنيقة — نطاق قريب", nameEn: "Elegant watch — nearby band", price: "4,800 ⃁", emoji: "⌚" },
        ],
        widgetAr: "ذات صلة",
        widgetEn: "Related",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#a855f7",
        titleAr: "تغليف هدية",
        titleEn: "Gift wrap",
        contextAr: "قبل الدفع",
        contextEn: "Pre-checkout",
        main: { nameAr: "سوار فضة", nameEn: "Silver bracelet", price: "320 ⃁", emoji: "🔗" },
        suggested: [
          { nameAr: "علبة فاخرة + بطاقة", nameEn: "Premium box + card", price: "45 ⃁", emoji: "🎁" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "الدفع",
        placementEn: "Checkout",
      },
    ],
    flow: flowDefault,
  },
  "beauty-care": {
    scenarios: [
      {
        accent: "#ec4899",
        titleAr: "خطوة الروتين التالية",
        titleEn: "Next routine step",
        contextAr: "منظّف في السلة",
        contextEn: "Cleanser in cart",
        main: { nameAr: "غسول لطيف", nameEn: "Gentle cleanser", price: "75 ⃁", emoji: "🧴" },
        suggested: [
          { nameAr: "سيروم ليلي — نفس الخط", nameEn: "Night serum — same line", price: "120 ⃁", emoji: "🌙" },
          { nameAr: "واقي شمس صباحي", nameEn: "AM sunscreen", price: "95 ⃁", emoji: "☀️" },
        ],
        widgetAr: "Combo روتين",
        widgetEn: "Routine combo",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#f472b6",
        titleAr: "عطر + لوشن",
        titleEn: "Fragrance + lotion",
        contextAr: "عطر نسائي",
        contextEn: "Women's fragrance PDP",
        main: { nameAr: "عطر 50مل", nameEn: "Perfume 50ml", price: "350 ⃁", emoji: "🌸" },
        suggested: [
          { nameAr: "لوشن جسم — نفس العائلة", nameEn: "Body lotion — same family", price: "120 ⃁", emoji: "🧴" },
        ],
        widgetAr: "اشتروا معاً",
        widgetEn: "Bought together",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#a855f7",
        titleAr: "شراء كميات",
        titleEn: "Volume deal",
        contextAr: "كريم مرطّب سريع الاستهلاك",
        contextEn: "Fast-moving moisturizer",
        main: { nameAr: "كريم 200مل", nameEn: "Cream 200ml", price: "89 ⃁", emoji: "✨" },
        suggested: [
          { nameAr: "اشترِ 2 ووفّر 15%", nameEn: "Buy 2 save 15%", price: "عرض", emoji: "📦" },
        ],
        widgetAr: "اشتر أكثر",
        widgetEn: "Buy more save more",
        placementAr: "السلة",
        placementEn: "Cart",
      },
    ],
    flow: flowDefault,
  },
  "restaurants-cafes": {
    scenarios: [
      {
        accent: "#f97316",
        titleAr: "وجبة كاملة",
        titleEn: "Full meal deal",
        contextAr: "برجر في السلة",
        contextEn: "Burger in cart",
        main: { nameAr: "برجر لحم كلاسيك", nameEn: "Classic beef burger", price: "32 ⃁", emoji: "🍔" },
        suggested: [
          { nameAr: "بطاطس + مشروب", nameEn: "Fries + drink", price: "+18 ⃁", emoji: "🍟" },
        ],
        widgetAr: "Combo",
        widgetEn: "Combo",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#eab308",
        titleAr: "قهوة + حلوى",
        titleEn: "Coffee + pastry",
        contextAr: "إسبريسو مزدوج",
        contextEn: "Double espresso",
        main: { nameAr: "إسبريسو ×2", nameEn: "Double espresso", price: "14 ⃁", emoji: "☕" },
        suggested: [
          { nameAr: "كرواسون زبدة", nameEn: "Butter croissant", price: "9 ⃁", emoji: "🥐" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#84cc16",
        titleAr: "غداء مكتب",
        titleEn: "Office lunch",
        contextAr: "سلة غداء جماعية",
        contextEn: "Group lunch cart",
        main: { nameAr: "صحن رئيسي ×4", nameEn: "Main bowls ×4", price: "120 ⃁", emoji: "🍱" },
        suggested: [
          { nameAr: "مشروبات + سلطات", nameEn: "Drinks + salads", price: "65 ⃁", emoji: "🥗" },
        ],
        widgetAr: "اشتروا معاً",
        widgetEn: "Bought together",
        placementAr: "السلة",
        placementEn: "Cart",
      },
    ],
    flow: flowDefault,
  },
  "home-supplies": {
    scenarios: [
      {
        accent: "#22c55e",
        titleAr: "نظام تخزين",
        titleEn: "Storage system",
        contextAr: "منظم خزانة في السلة",
        contextEn: "Closet organizer in cart",
        main: { nameAr: "صندوق تخزين L", nameEn: "Storage box L", price: "45 ⃁", emoji: "📦" },
        suggested: [
          { nameAr: "صندوق نفس المقاس ×2", nameEn: "Same size ×2", price: "85 ⃁", emoji: "📦" },
        ],
        widgetAr: "كميات",
        widgetEn: "Quantity tiers",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#10b981",
        titleAr: "مكنسة + أكياس",
        titleEn: "Vacuum + bags",
        contextAr: "مكنسة كهربائية",
        contextEn: "Vacuum cleaner PDP",
        main: { nameAr: "مكنسة Robot", nameEn: "Robot vacuum", price: "1,200 ⃁", emoji: "🤖" },
        suggested: [
          { nameAr: "أكياس غبار متوافقة", nameEn: "Compatible dust bags", price: "39 ⃁", emoji: "🛍️" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#059669",
        titleAr: "مطبخ كامل",
        titleEn: "Kitchen bundle",
        contextAr: "أواني طهي",
        contextEn: "Cookware browsing",
        main: { nameAr: "طقم قدور", nameEn: "Pot set", price: "280 ⃁", emoji: "🍳" },
        suggested: [
          { nameAr: "ملاعق خشب + لوح تقطيع", nameEn: "Wood utensils + board", price: "75 ⃁", emoji: "🪵" },
        ],
        widgetAr: "Combo",
        widgetEn: "Combo",
        placementAr: "الفئة",
        placementEn: "Category",
      },
    ],
    flow: flowDefault,
  },
  "service-design": {
    scenarios: [
      {
        accent: "#8b5cf6",
        titleAr: "شعار → هوية",
        titleEn: "Logo → identity",
        contextAr: "شراء باقة شعار",
        contextEn: "Logo package purchased",
        main: { nameAr: "تصميم شعار", nameEn: "Logo design", price: "500 ⃁", emoji: "🎨" },
        suggested: [
          { nameAr: "هوية كاملة + أيقونات سوشيال", nameEn: "Full brand + social icons", price: "1,200 ⃁", emoji: "📣" },
        ],
        widgetAr: "Upsell",
        widgetEn: "Upsell",
        placementAr: "صفحة الشكر",
        placementEn: "Thank-you page",
      },
      {
        accent: "#a855f7",
        titleAr: "موقع + صيانة",
        titleEn: "Site + care",
        contextAr: "تصميم موقع لصفحة واحدة",
        contextEn: "One-page web design",
        main: { nameAr: "صفحة هبوط", nameEn: "Landing page", price: "800 ⃁", emoji: "🌐" },
        suggested: [
          { nameAr: "صيانة شهرية", nameEn: "Monthly maintenance", price: "199 ⃁", emoji: "🔧" },
        ],
        widgetAr: "ذات صلة",
        widgetEn: "Related",
        placementAr: "بعد الدفع",
        placementEn: "Post-checkout",
      },
      {
        accent: "#6366f1",
        titleAr: "مراجعة إضافية",
        titleEn: "Extra revision pack",
        contextAr: "سلة خدمة إبداعية",
        contextEn: "Creative service cart",
        main: { nameAr: "باقة 10 ساعات", nameEn: "10-hour pack", price: "2,000 ⃁", emoji: "⏱️" },
        suggested: [
          { nameAr: "+5 مراجعات", nameEn: "+5 revisions", price: "150 ⃁", emoji: "✏️" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "الدفع",
        placementEn: "Checkout",
      },
    ],
    flow: flowDefault,
  },
  charities: {
    scenarios: [
      {
        accent: "#059669",
        titleAr: "مشروع مكمّل",
        titleEn: "Related cause",
        contextAr: "تبرع كسوة شتاء",
        contextEn: "Winter clothing donation",
        main: { nameAr: "كسوة شتاء — عائلة", nameEn: "Winter clothing — family", price: "200 ⃁", emoji: "🧥" },
        suggested: [
          { nameAr: "سلة غذائية — نفس المنطقة", nameEn: "Food basket — same region", price: "150 ⃁", emoji: "🍲" },
        ],
        widgetAr: "ذات صلة",
        widgetEn: "Related",
        placementAr: "صفحة التبرع",
        placementEn: "Donation page",
      },
      {
        accent: "#10b981",
        titleAr: "زيادة بسيطة",
        titleEn: "Gentle top-up",
        contextAr: "بعد إتمام تبرع",
        contextEn: "After completing a gift",
        main: { nameAr: "تبرع مكتمل", nameEn: "Donation complete", price: "100 ⃁", emoji: "🤲" },
        suggested: [
          { nameAr: "أضف 20 ⃁ لوجبة إضافية", nameEn: "Add SAR 20 for a meal", price: "+20 ⃁", emoji: "➕" },
        ],
        widgetAr: "زيادة مبلغ",
        widgetEn: "Amount uplift",
        placementAr: "صفحة الشكر",
        placementEn: "Thank-you page",
      },
      {
        accent: "#14b8a6",
        titleAr: "تبرع شهري",
        titleEn: "Monthly giving",
        contextAr: "اهتمام سابق بالتعليم",
        contextEn: "Past interest in education",
        main: { nameAr: "كفالة طالب", nameEn: "Student sponsorship", price: "300 ⃁", emoji: "📚" },
        suggested: [
          { nameAr: "اشتراك شهري أقل ضغطاً", nameEn: "Softer monthly plan", price: "/شهر", emoji: "📅" },
        ],
        widgetAr: "اشتراك",
        widgetEn: "Subscription",
        placementAr: "الصفحة الرئيسية",
        placementEn: "Home",
      },
    ],
    flow: flowDefault,
  },
  clinics: {
    scenarios: [
      {
        accent: "#0ea5e9",
        titleAr: "بعد تنظيف أسنان",
        titleEn: "After dental cleaning",
        contextAr: "حجز تنظيف مكتمل",
        contextEn: "Cleaning appointment booked",
        main: { nameAr: "جلسة تنظيف", nameEn: "Cleaning session", price: "200 ⃁", emoji: "🦷" },
        suggested: [
          { nameAr: "فرشاة + خيط موصى به", nameEn: "Recommended brush + floss", price: "85 ⃁", emoji: "🪥" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "صفحة الشكر",
        placementEn: "Thank-you page",
      },
      {
        accent: "#38bdf8",
        titleAr: "عناية بعد ليزر",
        titleEn: "Post-laser care",
        contextAr: "حزمة جلسة ليزر",
        contextEn: "Laser session package",
        main: { nameAr: "جلسة ليزر وجه", nameEn: "Face laser session", price: "450 ⃁", emoji: "✨" },
        suggested: [
          { nameAr: "كريم هدئان طبي", nameEn: "Soothing medical cream", price: "120 ⃁", emoji: "🧴" },
        ],
        widgetAr: "ذات صلة",
        widgetEn: "Related",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#0284c7",
        titleAr: "متابعة دورية",
        titleEn: "Recall visit",
        contextAr: "شراء باقة عناية",
        contextEn: "Care package purchase",
        main: { nameAr: "باقة تبييض منزلي", nameEn: "Home whitening kit", price: "350 ⃁", emoji: "😁" },
        suggested: [
          { nameAr: "موعد فحص بعد 6 أشهر", nameEn: "6-month recall slot", price: "مجاناً", emoji: "📅" },
        ],
        widgetAr: "Upsell خدمة",
        widgetEn: "Service upsell",
        placementAr: "بعد الدفع",
        placementEn: "Post-checkout",
      },
    ],
    flow: flowDefault,
  },
  "digital-cards": {
    scenarios: [
      {
        accent: "#d946ef",
        titleAr: "قيمة أعلى",
        titleEn: "Higher denomination",
        contextAr: "عميل يشتري أسبوعياً",
        contextEn: "Weekly repeat buyer",
        main: { nameAr: "بطاقة 50", nameEn: "SAR 50 card", price: "50 ⃁", emoji: "🎴" },
        suggested: [
          { nameAr: "بطاقة 100 — أوفر لك", nameEn: "SAR 100 — better value", price: "100 ⃁", emoji: "💳" },
        ],
        widgetAr: "Upsell",
        widgetEn: "Upsell",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#a855f7",
        titleAr: "لعب + إضافة رقمية",
        titleEn: "Game + digital add-on",
        contextAr: "بطاقة متجر ألعاب",
        contextEn: "Game store card",
        main: { nameAr: "بطاقة PlayStation", nameEn: "PlayStation card", price: "100 ⃁", emoji: "🎮" },
        suggested: [
          { nameAr: "اشتراك شهر إضافي", nameEn: "Extra month sub", price: "40 ⃁", emoji: "➕" },
        ],
        widgetAr: "Combo",
        widgetEn: "Combo",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#ec4899",
        titleAr: "شريك سماعات",
        titleEn: "Headphone partner",
        contextAr: "بطاقة موسيقى",
        contextEn: "Music subscription card",
        main: { nameAr: "بطاقة اشتراك موسيقى", nameEn: "Music sub card", price: "60 ⃁", emoji: "🎵" },
        suggested: [
          { nameAr: "سماعات من المتجر الشريك", nameEn: "Partner store headphones", price: "199 ⃁", emoji: "🎧" },
        ],
        widgetAr: "ذات صلة",
        widgetEn: "Related",
        placementAr: "صفحة الشكر",
        placementEn: "Thank-you page",
      },
    ],
    flow: flowDefault,
  },
  gold: {
    scenarios: [
      {
        accent: "#ca8a04",
        titleAr: "طقم متناسق",
        titleEn: "Matching set",
        contextAr: "سوار ذهب في السلة",
        contextEn: "Gold bracelet in cart",
        main: { nameAr: "سوار 21 قيراط", nameEn: "21k bracelet", price: "3,400 ⃁", emoji: "✨" },
        suggested: [
          { nameAr: "طوق خفيف — نفس الخط", nameEn: "Light necklace — same line", price: "2,900 ⃁", emoji: "📿" },
        ],
        widgetAr: "اشتروا معاً",
        widgetEn: "Bought together",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#eab308",
        titleAr: "سبيكة + حفظ",
        titleEn: "Bar + storage",
        contextAr: "سبيكة صغيرة",
        contextEn: "Small gold bar",
        main: { nameAr: "سبيكة 10غ", nameEn: "10g bar", price: "2,800 ⃁", emoji: "🪙" },
        suggested: [
          { nameAr: "علبة حفظ معتمدة", nameEn: "Certified capsule", price: "120 ⃁", emoji: "📦" },
        ],
        widgetAr: "إضافات",
        widgetEn: "Add-ons",
        placementAr: "الدفع",
        placementEn: "Checkout",
      },
      {
        accent: "#f59e0b",
        titleAr: "هدية بقيمة قريبة",
        titleEn: "Gift near price band",
        contextAr: "سلة بمجوهرات يومية",
        contextEn: "Daily jewelry cart",
        main: { nameAr: "خاتم ذهب", nameEn: "Gold ring", price: "900 ⃁", emoji: "💍" },
        suggested: [
          { nameAr: "أقراط — نفس النطاق", nameEn: "Earrings — same band", price: "850 ⃁", emoji: "✨" },
        ],
        widgetAr: "ذات صلة",
        widgetEn: "Related",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
    ],
    flow: flowDefault,
  },
  livestock: {
    scenarios: [
      {
        accent: "#78716c",
        titleAr: "تقطيع عائلي",
        titleEn: "Family butcher cut",
        contextAr: "ضأن كامل في السلة",
        contextEn: "Whole lamb in cart",
        main: { nameAr: "ضأن كامل — حجز", nameEn: "Whole lamb — booking", price: "2,800 ⃁", emoji: "🐑" },
        suggested: [
          { nameAr: "تقطيع جاهز للطبخ", nameEn: "Ready family cuts", price: "+120 ⃁", emoji: "🔪" },
        ],
        widgetAr: "إضافات خدمة",
        widgetEn: "Service add-ons",
        placementAr: "السلة",
        placementEn: "Cart",
      },
      {
        accent: "#a8a29e",
        titleAr: "توابل ومقبلات",
        titleEn: "Spices & sides",
        contextAr: "طلب لحم مقطّع",
        contextEn: "Cut meat order",
        main: { nameAr: "لحم مفروم 2كغ", nameEn: "Ground meat 2kg", price: "140 ⃁", emoji: "🥩" },
        suggested: [
          { nameAr: "بهارات + صلصة", nameEn: "Spice + sauce kit", price: "35 ⃁", emoji: "🌶️" },
        ],
        widgetAr: "Combo",
        widgetEn: "Combo",
        placementAr: "صفحة المنتج",
        placementEn: "Product page",
      },
      {
        accent: "#57534e",
        titleAr: "تبرع جلد/جزء",
        titleEn: "Charity portion",
        contextAr: "حجز موسم أضاحي",
        contextEn: "Seasonal qurbani booking",
        main: { nameAr: "حجز أضحية", nameEn: "Qurbani booking", price: "1,800 ⃁", emoji: "🕌" },
        suggested: [
          { nameAr: "تبرع ثابت من الثمن", nameEn: "Fixed charity add-on", price: "+50 ⃁", emoji: "🤲" },
        ],
        widgetAr: "إضافة خيرية",
        widgetEn: "Charity add-on",
        placementAr: "الدفع",
        placementEn: "Checkout",
      },
    ],
    flow: flowDefault,
  },
};

export function getSectorVisuals(slug: string): SectorVisualBundle | undefined {
  return sectorVisualsBySlug[slug];
}
