import type { SectorDeepDive } from "../sectorDeepDive";

/**
 * Beauty sells by ROUTINE, not by item. A serum has a step before it and a
 * step after it, and the customer who buys one step and skips the next blames
 * the product when it underperforms. So the moments below are mostly about
 * completing a routine and timing a refill, not about adding a second thing
 * to a basket.
 */
export const beautyCareDeepDive: SectorDeepDive = {
  slug: "beauty-care",
  introAr:
    "منتجات العناية تُباع بالروتين لا بالقطعة. السيروم له خطوة قبله وخطوة بعده، والعميلة التي تشتري خطوة وتترك التي بعدها تلوم المنتج حين لا ينفع. ثم إن لكل عبوة عمراً معروفاً: السيروم ينفد في ستة أسابيع والواقي الشمسي في ثمانية. هاتان الحقيقتان — الروتين والعمر — هما ما تبني عليه زيادة اقتراحاتها هنا، لا «منتجات ذات صلة» عامة.",
  introEn:
    "Skincare sells by routine, not by item. A serum has a step before it and a step after it, and a customer who buys one step and skips the next blames the product when it underdelivers. And every bottle has a known life: a serum runs out in six weeks, a sunscreen in eight. Those two facts - the routine and the shelf life - are what Ziadah builds on here, not generic \"related products\".",
  useCases: [
    {
      key: "routine-step",
      titleAr: "الخطوة التالية في الروتين",
      titleEn: "The next step in the routine",
      triggerAr: "العميلة أضافت سيروم فيتامين سي للسلة.",
      triggerEn: "The customer adds a vitamin C serum to the cart.",
      scenarioAr:
        "يظهر مرطّب وواقٍ شمسي بوصفهما الخطوتين التاليتين، مع سبب لا مع إلحاح: «فيتامين سي يحتاج واقياً شمسياً بعده، وإلا ضاع مفعوله».",
      scenarioEn:
        "A moisturiser and a sunscreen appear as the next two steps, with a reason rather than a push: \"Vitamin C needs sunscreen after it, or its effect is wasted\".",
      whyAr:
        "هذا ليس بيعاً إضافياً بل إنقاذ للمنتج الأول. العميلة التي تستخدم فيتامين سي بلا واقٍ لن ترى نتيجة ولن تعيد الشراء، فالاقتراح يحمي تكرار الشراء لا الطلب الحالي فقط.",
      whyEn:
        "This is not an upsell, it is rescuing the first product. A customer using vitamin C without sunscreen sees no result and does not reorder, so the suggestion protects the repeat purchase, not just this order.",
      exampleAr: "سيروم فيتامين سي ← مرطّب خفيف + واقٍ شمسي SPF 50. الروتين كامل بثلاث خطوات.",
      exampleEn: "Vitamin C serum → a light moisturiser + SPF 50 sunscreen. The routine complete in three steps.",
          widget: {
        titleAr: "أكملي روتينك",
        titleEn: "Complete your routine",
        mainAr: "سيروم فيتامين سي",
        mainEn: "Vitamin C serum",
        mainPrice: "185",
        hintAr: "فيتامين سي يحتاج واقياً بعده",
        hintEn: "Vitamin C needs sunscreen after it",
        suggest: [
          { ar: "مرطّب خفيف", en: "Light moisturiser", price: "140" },
          { ar: "واقٍ شمسي SPF 50", en: "SPF 50 sunscreen", price: "165" },
        ],
        ctaAr: "أضيفي الخطوتين",
        ctaEn: "Add both steps",
      },
    },
    {
      key: "refill-timing",
      titleAr: "توقيت النفاد: قبل أن تنتهي العبوة",
      titleEn: "Refill timing: before the bottle runs out",
      triggerAr: "مضت ستة أسابيع على شراء سيروم بحجم ٣٠ مل.",
      triggerEn: "Six weeks have passed since a 30ml serum was bought.",
      scenarioAr:
        "اقتراح إعادة الشراء يصل قبل النفاد بأيام لا بعده بأسابيع، لأن الانقطاع عن الروتين أسبوعاً واحداً يكسر العادة وقد لا تعود.",
      scenarioEn:
        "The reorder suggestion arrives days before it runs out rather than weeks after, because one week off the routine breaks the habit and she may not come back.",
      whyAr:
        "معظم متاجر العناية تخسر العميلة في الفجوة بين النفاد وتذكّر الشراء. حجم العبوة ومعدل الاستخدام معلومان، فالتوقيت حساب لا تخمين.",
      whyEn:
        "Most beauty stores lose the customer in the gap between running out and remembering to reorder. Bottle size and usage rate are both known, so the timing is arithmetic rather than a guess.",
      exampleAr: "سيروم ٣٠ مل اشتُري في ١ مارس ← تذكير في ٨ أبريل مع عرض على الحجم الأكبر.",
      exampleEn: "A 30ml serum bought on 1 March → a reminder on 8 April, with an offer on the larger size.",
          widget: {
        titleAr: "قارب على النفاد",
        titleEn: "Almost out",
        mainAr: "سيروم 30 مل — اشتُري قبل 6 أسابيع",
        mainEn: "30ml serum - bought 6 weeks ago",
        mainPrice: "185",
        hintAr: "يكفيك 5 أيام تقريباً",
        hintEn: "About 5 days left",
        suggest: [
          { ar: "نفس السيروم 50 مل", en: "The same serum, 50ml", price: "265" },
        ],
        ctaAr: "أعيدي الطلب",
        ctaEn: "Reorder",
      },
    },
    {
      key: "skin-type",
      titleAr: "المطابقة بنوع البشرة لا بالفئة",
      titleEn: "Matching by skin type, not by category",
      triggerAr: "العميلة تصفّحت ثلاثة منتجات للبشرة الدهنية.",
      triggerEn: "The customer has browsed three products for oily skin.",
      scenarioAr:
        "تُرشَّح الاقتراحات لاحقاً بنوع البشرة المستنتج من السلوك، فلا يُعرض كريم ثقيل على بشرة دهنية ولو كان الأكثر مبيعاً في المتجر.",
      scenarioEn:
        "Later suggestions are filtered by the skin type inferred from behaviour, so a heavy cream is never shown for oily skin even if it is the store's bestseller.",
      whyAr:
        "الاقتراح الخاطئ في العناية أسوأ منه في أي قطاع: منتج لا يناسب البشرة يسبب ضرراً مرئياً، والعميلة لا تلوم نفسها بل المتجر.",
      whyEn:
        "A wrong suggestion hurts more here than anywhere else: a product that does not suit the skin does visible damage, and the customer blames the store rather than herself.",
      exampleAr: "سلوك يدل على بشرة دهنية ← جل مائي بدل الكريم الغني، ولو كان الثاني الأعلى مبيعاً.",
      exampleEn: "Behaviour indicating oily skin → a water gel instead of the rich cream, even though the cream outsells it.",
          widget: {
        titleAr: "يناسب بشرتك",
        titleEn: "Suits your skin",
        mainAr: "جل مائي للبشرة الدهنية",
        mainEn: "Water gel for oily skin",
        mainPrice: "150",
        hintAr: "مرشّح حسب سلوكك: بشرة دهنية",
        hintEn: "Filtered to oily skin from your browsing",
        suggest: [
          { ar: "تونر موازن", en: "Balancing toner", price: "110" },
        ],
        ctaAr: "أضيفي التونر",
        ctaEn: "Add the toner",
      },
    },
    {
      key: "shade-match",
      titleAr: "الدرجة المكمّلة لا الدرجة العشوائية",
      titleEn: "The matching shade, not a random one",
      triggerAr: "العميلة أضافت كريم أساس بدرجة محددة.",
      triggerEn: "The customer adds a foundation in a specific shade.",
      scenarioAr:
        "يُقترح الكونسيلر والبودرة بالدرجة المتوافقة مع ما اختارته تحديداً، لا بالدرجة الأكثر مبيعاً. اختيار الدرجة هو أصعب قرار في المكياج أونلاين وأكثر سبب للإرجاع.",
      scenarioEn:
        "Concealer and powder are suggested in the shade that matches what she actually picked, not the best-selling shade. Shade choice is the hardest decision in online make-up and the biggest cause of returns.",
      whyAr:
        "كل إرجاع بسبب درجة خاطئة يكلف الشحن مرتين ويكلف الثقة مرة. المطابقة الصحيحة ترفع الطلب وتخفض الإرجاع في الوقت نفسه.",
      whyEn:
        "Every return over a wrong shade costs shipping twice and trust once. Matching correctly raises the order and lowers returns at the same time.",
      exampleAr: "أساس درجة ٣٢٠ ← كونسيلر ٣٢٠ وبودرة شفافة، لا الدرجة الأكثر مبيعاً.",
      exampleEn: "Foundation in 320 → concealer in 320 and a translucent powder, not the top-selling shade.",
          widget: {
        titleAr: "الدرجة المطابقة",
        titleEn: "The matching shade",
        mainAr: "كريم أساس — درجة 320",
        mainEn: "Foundation - shade 320",
        mainPrice: "195",
        hintAr: "بنفس درجتك لا بالأكثر مبيعاً",
        hintEn: "In your shade, not the bestseller",
        suggest: [
          { ar: "كونسيلر 320", en: "Concealer 320", price: "120" },
          { ar: "بودرة شفافة", en: "Translucent powder", price: "95" },
        ],
        ctaAr: "أضيفي المطابق",
        ctaEn: "Add the match",
      },
    },
    {
      key: "sample-to-full",
      titleAr: "من العينة إلى الحجم الكامل",
      titleEn: "From the sample to the full size",
      triggerAr: "العميلة اشترت حجم سفر أو عينة قبل أسابيع.",
      triggerEn: "The customer bought a travel size or a sample weeks ago.",
      scenarioAr:
        "بعد مدة كافية للتجربة، يُعرض الحجم الكامل مع فرق سعر الوحدة صريحاً: «الحجم الكامل يوفّر ٤٠٪ على المل».",
      scenarioEn:
        "After enough time to have tried it, the full size appears with the unit-price difference spelled out: \"The full size saves 40% per ml\".",
      whyAr:
        "العينة أداة بيع لا منتج. المتجر الذي لا يتابعها بعرض الحجم الكامل في الوقت الصحيح دفع تكلفة التجربة وترك الربح.",
      whyEn:
        "A sample is a sales tool, not a product. A store that does not follow it with the full size at the right moment has paid for the trial and left the margin.",
      exampleAr: "عينة كريم ١٥ مل بـ٤٥ ← الحجم ٥٠ مل بـ١٢٠ (توفير ٤٠٪ على المل).",
      exampleEn: "A 15ml sample at 45 → the 50ml at 120 (40% less per ml).",
          widget: {
        titleAr: "من العينة للحجم الكامل",
        titleEn: "From sample to full size",
        mainAr: "عينة كريم 15 مل",
        mainEn: "15ml sample",
        mainPrice: "45",
        hintAr: "يوفّر 40٪ على المل",
        hintEn: "40% less per ml",
        suggest: [
          { ar: "الحجم الكامل 50 مل", en: "Full size, 50ml", price: "120" },
        ],
        ctaAr: "خذي الحجم الكامل",
        ctaEn: "Take the full size",
      },
    },
    {
      key: "bundle-routine",
      titleAr: "الروتين كاملاً بسعر الحزمة",
      titleEn: "The whole routine at a bundle price",
      triggerAr: "السلة فيها خطوتان من روتين معرّف من ثلاث.",
      triggerEn: "The cart holds two steps of a three-step routine.",
      scenarioAr:
        "«ناقصك التونر ويصير روتين الليل كامل بـ٤٥ أقل» — يسمّي الخطوة الناقصة بالاسم، فالعميلة لا تبحث في مئة منتج عن الخطوة الصحيحة.",
      scenarioEn:
        "\"One toner away from the complete night routine, 45 less\" - it names the missing step, so she is not hunting through a hundred products for the right one.",
      whyAr:
        "بيع الروتين كاملاً يرفع قيمة الطلب ويرفع النتيجة التي تراها العميلة، وهي وحدها ما يعيدها. الحزمة هنا ليست خصماً بل وصفة.",
      whyEn:
        "Selling the whole routine raises the order and raises the result she actually sees, which is the only thing that brings her back. The bundle here is a prescription, not a discount.",
      exampleAr: "غسول + سيروم في السلة ← «أضف التونر، الروتين كامل ٢٦٠ بدل ٣٠٥».",
      exampleEn: "Cleanser + serum in the cart → \"Add the toner: the full routine at 260 instead of 305\".",
          widget: {
        titleAr: "روتين الليل كامل",
        titleEn: "The full night routine",
        mainAr: "غسول + سيروم",
        mainEn: "Cleanser + serum",
        mainPrice: "215",
        hintAr: "ناقصك خطوة واحدة",
        hintEn: "One step short",
        suggest: [
          { ar: "تونر — يكمل الروتين", en: "Toner - completes it", price: "90" },
        ],
        ctaAr: "أكملي بـ260 بدل 305",
        ctaEn: "Complete it: 260 instead of 305",
      },
    },
    {
      key: "free-shipping-gap",
      titleAr: "فجوة الشحن المجاني بأصناف صغيرة",
      titleEn: "Closing the free-shipping gap with small items",
      triggerAr: "السلة أقل من حد الشحن المجاني بمبلغ صغير.",
      triggerEn: "The cart is a small amount below the free-shipping threshold.",
      scenarioAr:
        "تُقترح أصناف صغيرة تسدّ الفجوة تحديداً — ماسك ورقي، حجم سفر، فرشاة — لا منتج بضعف قيمة الفجوة.",
      scenarioEn:
        "Small items that close the gap exactly are suggested - a sheet mask, a travel size, a brush - not a product worth twice the gap.",
      whyAr:
        "قطاع العناية مليء بالأصناف الصغيرة عالية الهامش، وهي أنسب ما يسدّ فجوة شحن دون أن يبدو الاقتراح ابتزازاً.",
      whyEn:
        "Beauty is full of small high-margin items, which are exactly what closes a shipping gap without the suggestion reading as a squeeze.",
      exampleAr: "السلة ١٦٥، الشحن المجاني عند ٢٠٠ ← ماسك ورقي ١٥ × ٢ أو حجم سفر ٣٥.",
      exampleEn: "Cart at 165, free shipping at 200 → two sheet masks at 15, or a travel size at 35.",
          widget: {
        titleAr: "الشحن المجاني",
        titleEn: "Free shipping",
        mainAr: "سلتك الحالية",
        mainEn: "Your cart",
        mainPrice: "165",
        hintAr: "35 ر.س ويصير الشحن مجاناً",
        hintEn: "35 SAR to free shipping",
        suggest: [
          { ar: "ماسك ورقي × 2", en: "Sheet mask × 2", price: "30" },
          { ar: "حجم سفر", en: "Travel size", price: "35" },
        ],
        ctaAr: "أضيفي واحصلي على شحن مجاني",
        ctaEn: "Add and ship free",
      },
    },
    {
      key: "gifting",
      titleAr: "الإهداء: موسم مختلف وقواعد مختلفة",
      titleEn: "Gifting: a different season, different rules",
      triggerAr: "الطلب في موسم إهداء أو العميلة اختارت تغليف هدية.",
      triggerEn: "The order falls in a gifting season, or gift wrapping is selected.",
      scenarioAr:
        "تتغير الاقتراحات كلياً: تُرفع المجموعات الجاهزة والعطور فوق منتجات الروتين، لأن المُهدي لا يعرف نوع بشرة المُهدى إليه ولا يريد أن يخاطر.",
      scenarioEn:
        "The suggestions change entirely: ready gift sets and fragrance rise above routine products, because a gift buyer does not know the recipient's skin type and will not risk it.",
      whyAr:
        "المُهدي يشتري بمنطق معاكس تماماً للمشترية لنفسها: يريد الأمان والمظهر لا الملاءمة. اقتراح سيروم متخصص لهدية اقتراح خاطئ مهما كان جيداً.",
      whyEn:
        "A gift buyer shops on the opposite logic to someone buying for herself: they want safety and presentation, not suitability. Suggesting a specialist serum as a gift is a wrong suggestion however good the serum is.",
      exampleAr: "تغليف هدية مُفعّل ← مجموعة عناية جاهزة ٣٢٠، لا سيروم متخصص للبشرة الحساسة.",
      exampleEn: "Gift wrapping on → a ready 320 SAR care set, not a specialist sensitive-skin serum.",
          widget: {
        titleAr: "هدية جاهزة",
        titleEn: "A ready gift",
        mainAr: "تغليف هدية مُفعّل",
        mainEn: "Gift wrapping on",
        mainPrice: "—",
        hintAr: "آمنة لأي بشرة",
        hintEn: "Safe for any skin",
        suggest: [
          { ar: "مجموعة عناية جاهزة", en: "A ready care set", price: "320" },
        ],
        ctaAr: "أضيفي المجموعة",
        ctaEn: "Add the set",
      },
    },
  ],
};
