import type { SectorDeepDive } from "../sectorDeepDive";

export const ecommercePlatformsDeepDive: SectorDeepDive = {
  slug: "ecommerce-platforms",
  introAr:
    "المنصة متعددة البائعين تحلّ مشكلة معاكسة لمشكلة المتجر: لا تعاني من قلة المعروض بل من فرطه. المشتري يغرق في آلاف المنتجات من مئات البائعين، والمنصة تربح عمولة على كل طلب لا هامشاً على منتج. لذلك هدف الاقتراح هنا ليس رفع سلة واحدة بل تقصير الطريق إلى القرار، وتوزيع الظهور بعدل بين البائعين حتى لا تفقد المنصة جانب العرض.",
  introEn:
    "A multi-vendor marketplace has the opposite problem to a store: not too little supply but far too much. The buyer drowns in thousands of products from hundreds of sellers, and the platform earns a commission per order rather than a margin per product. So the goal here is not lifting one basket - it is shortening the path to a decision, and distributing visibility fairly across sellers so the platform does not lose its supply side.",
  useCases: [
    {
      key: "narrow-not-widen",
      titleAr: "تضييق الخيارات لا توسيعها",
      titleEn: "Narrowing the options, not widening them",
      triggerAr: "المشتري تصفّح طويلاً بلا إضافة للسلة.",
      triggerEn: "The buyer has browsed a long time without adding to cart.",
      scenarioAr:
        "يُعرض ثلاثة منتجات فقط بفروق واضحة بينها، لا أربعون نتيجة. التصفّح الطويل شلل اختيار، وعرض المزيد يزيده.",
      scenarioEn:
        "Three products with clear differences between them, not forty results. Long browsing is choice paralysis, and showing more makes it worse.",
      whyAr:
        "التوصية في المنصات وظيفتها عكس وظيفتها في المتجر: المتجر يوسّع الاكتشاف والمنصة تحسم القرار.",
      whyEn:
        "Recommendation on a marketplace does the opposite job to recommendation in a store: a store widens discovery, a marketplace closes a decision.",
      exampleAr: "٦ دقائق تصفّح بلا إضافة ← ٣ خيارات: الأرخص، الأعلى تقييماً، الأسرع وصولاً.",
      exampleEn: "6 minutes browsing with nothing added → 3 options: cheapest, best rated, fastest to arrive.",
          widget: {
        titleAr: "ثلاثة خيارات",
        titleEn: "Three options",
        mainAr: "6 دقائق تصفّح بلا إضافة",
        mainEn: "6 minutes browsing, nothing added",
        mainPrice: "—",
        hintAr: "ثلاثة لا أربعون",
        hintEn: "Three, not forty",
        suggest: [
          { ar: "الأعلى تقييماً — 4.8", en: "Best rated - 4.8", price: "320" },
          { ar: "الأسرع وصولاً — غداً", en: "Fastest - tomorrow", price: "345" },
          { ar: "الأرخص", en: "Cheapest", price: "295" },
        ],
        ctaAr: "اختر",
        ctaEn: "Choose",
      },
    },
    {
      key: "same-seller-basket",
      titleAr: "تجميع الطلب عند بائع واحد",
      titleEn: "Consolidating the order with one seller",
      triggerAr: "السلة فيها منتج من بائع له منتجات أخرى مناسبة.",
      triggerEn: "The cart holds an item from a seller with other suitable products.",
      scenarioAr:
        "تُعرض منتجات نفس البائع لتوفير الشحن: «أضف من نفس البائع، شحنة واحدة». مصلحة الطرفين متطابقة هنا.",
      scenarioEn:
        "Products from the same seller are offered to save shipping: \"Add from the same seller, one shipment\". Both sides' interests align here.",
      whyAr:
        "الطلب المقسوم على ثلاثة بائعين يعني ثلاث شحنات وثلاث فرص تأخير وثلاث فرص لتقييم سيئ. التجميع يرفع السلة ويخفض المخاطرة.",
      whyEn:
        "An order split across three sellers means three shipments, three chances of delay and three chances of a bad rating. Consolidating raises the basket and lowers the risk.",
      exampleAr: "منتج من بائع «أ» ← «منتجان آخران من نفس البائع، شحنة واحدة وتوفير ٢٥».",
      exampleEn: "An item from seller A → \"Two more from the same seller: one shipment, 25 saved\".",
          widget: {
        titleAr: "من نفس البائع",
        titleEn: "From the same seller",
        mainAr: "منتج من متجر الرياض",
        mainEn: "An item from Riyadh Store",
        mainPrice: "180",
        hintAr: "شحنة واحدة",
        hintEn: "One shipment",
        suggest: [
          { ar: "منتج ثانٍ — نفس البائع", en: "A second item - same seller", price: "120" },
          { ar: "منتج ثالث — نفس البائع", en: "A third - same seller", price: "95" },
        ],
        ctaAr: "أضف ووفّر 25 شحناً",
        ctaEn: "Add and save 25 on shipping",
      },
    },
    {
      key: "seller-fairness",
      titleAr: "توزيع الظهور بين البائعين",
      titleEn: "Spreading visibility across sellers",
      triggerAr: "عدة بائعين يعرضون منتجاً متكافئاً.",
      triggerEn: "Several sellers offer an equivalent product.",
      scenarioAr:
        "يُوزَّع الظهور بين البائعين المتكافئين بدل تثبيت الأكبر دائماً، مع مراعاة التقييم ووقت التسليم.",
      scenarioEn:
        "Visibility rotates among equivalent sellers instead of pinning the largest one permanently, weighted by rating and delivery time.",
      whyAr:
        "المنصة التي يظهر فيها بائع واحد دائماً تفقد البائعين الآخرين، وفقدان جانب العرض يقتل المنصة أسرع من فقدان جانب الطلب.",
      whyEn:
        "A marketplace where one seller always appears loses the others, and losing the supply side kills a marketplace faster than losing the demand side.",
      exampleAr: "٥ بائعين لنفس المنتج ← دوران الظهور بينهم بوزن التقييم لا بحجم البائع.",
      exampleEn: "5 sellers of the same item → rotation weighted by rating rather than by seller size.",
          widget: {
        titleAr: "بائعون متكافئون",
        titleEn: "Equivalent sellers",
        mainAr: "نفس المنتج — 5 بائعين",
        mainEn: "The same item - 5 sellers",
        mainPrice: "—",
        hintAr: "مرتّب بالتقييم لا بحجم البائع",
        hintEn: "Ranked by rating, not seller size",
        suggest: [
          { ar: "بائع 4.9 — يصل غداً", en: "Seller at 4.9 - arrives tomorrow", price: "295" },
          { ar: "بائع 4.8 — يصل غداً", en: "Seller at 4.8 - arrives tomorrow", price: "290" },
        ],
        ctaAr: "اختر البائع",
        ctaEn: "Choose a seller",
      },
    },
    {
      key: "category-crossing",
      titleAr: "العبور بين الفئات",
      titleEn: "Crossing between categories",
      triggerAr: "المشتري أتمّ طلباً في فئة واحدة.",
      triggerEn: "The buyer completes an order in one category.",
      scenarioAr:
        "يُعرض منتج من فئة مجاورة يشتريها نفس النمط من المشترين. المشتري في فئة واحدة يظن أن المنصة متخصصة فيها وحدها.",
      scenarioEn:
        "A product from an adjacent category that this type of buyer also purchases is shown. A buyer active in one category assumes the marketplace only does that category.",
      whyAr:
        "أهم رقم في المنصة هو عدد الفئات التي يشتري منها المستخدم الواحد. كل فئة إضافية تضاعف قيمته مدى الحياة.",
      whyEn:
        "The most important number on a marketplace is how many categories a single user buys from. Each extra category multiplies their lifetime value.",
      exampleAr: "أتمّ طلب إلكترونيات ← «مشترو الإلكترونيات يشترون هذا من قسم المكتب».",
      exampleEn: "Completed an electronics order → \"Electronics buyers also buy this from Office\".",
          widget: {
        titleAr: "من قسم آخر",
        titleEn: "From another aisle",
        mainAr: "أتممت طلب إلكترونيات",
        mainEn: "You completed an electronics order",
        mainPrice: "—",
        suggest: [
          { ar: "منظّم مكتب — مشترو الإلكترونيات يشترونه", en: "A desk organiser - electronics buyers buy this", price: "140" },
        ],
        ctaAr: "شاهد القسم",
        ctaEn: "See the aisle",
      },
    },
    {
      key: "delivery-certainty",
      titleAr: "اليقين في التسليم كترتيب",
      titleEn: "Delivery certainty as a ranking signal",
      triggerAr: "المشتري يقارن عروضاً متقاربة السعر.",
      triggerEn: "The buyer compares offers at similar prices.",
      scenarioAr:
        "يُرفَع العرض الأعلى يقيناً في التسليم لا الأرخص بريال. «يصل غداً» تحسم أكثر من «أرخص بريالين».",
      scenarioEn:
        "The offer with the highest delivery certainty ranks above the one a riyal cheaper. \"Arrives tomorrow\" closes better than \"two riyals less\".",
      whyAr:
        "المنصة تُقيَّم بتجربة التسليم لا بالسعر. ترتيب العروض بالسعر وحده يكسب طلباً اليوم ويخسر مستخدماً بعد تأخيرة واحدة.",
      whyEn:
        "A marketplace is judged on delivery, not on price. Ranking on price alone wins an order today and loses a user after one late arrival.",
      exampleAr: "عرضان بفارق ٣ ر.س ← يتقدّم «يصل غداً» على «يصل خلال ٥ أيام».",
      exampleEn: "Two offers 3 SAR apart → \"Arrives tomorrow\" outranks \"Arrives in 5 days\".",
          widget: {
        titleAr: "أيهما يصل أولاً",
        titleEn: "Which arrives first",
        mainAr: "عرضان بفارق 3 ر.س",
        mainEn: "Two offers, 3 SAR apart",
        mainPrice: "—",
        suggest: [
          { ar: "يصل غداً", en: "Arrives tomorrow", price: "298" },
          { ar: "يصل خلال 5 أيام", en: "Arrives in 5 days", price: "295" },
        ],
        ctaAr: "اختر الأسرع",
        ctaEn: "Take the faster one",
      },
    },
    {
      key: "new-seller-cold-start",
      titleAr: "البائع الجديد بلا تاريخ",
      titleEn: "The new seller with no history",
      triggerAr: "بائع جديد أضاف منتجاته ولا بيانات عنه.",
      triggerEn: "A new seller has listed products with no data behind them.",
      scenarioAr:
        "تُعطى منتجاته ظهوراً محسوباً في بداياته بدل انتظار بيانات لن تأتي بلا ظهور. حلقة مفرغة تُكسر بقرار لا بخوارزمية.",
      scenarioEn:
        "Their products get a measured share of visibility early, instead of waiting for data that cannot arrive without visibility. A loop broken by a decision rather than by an algorithm.",
      whyAr:
        "الخوارزمية التي ترتّب بالأداء وحده تخنق كل بائع جديد، فلا ينضم أحد. المنصة تحتاج ضخ بائعين أكثر مما تحتاج ترتيباً مثالياً.",
      whyEn:
        "An algorithm ranking purely on performance strangles every new seller, so nobody joins. A marketplace needs a flow of sellers more than it needs a perfect ranking.",
      exampleAr: "بائع جديد ← حصة ظهور محددة أول ٣٠ يوماً، ثم الترتيب بالأداء.",
      exampleEn: "A new seller → a fixed share of impressions for 30 days, then ranked on performance.",
          widget: {
        titleAr: "بائع جديد",
        titleEn: "A new seller",
        mainAr: "منتج بلا تاريخ بيع",
        mainEn: "An item with no sales history",
        mainPrice: "260",
        suggest: [
          { ar: "حصة ظهور أول 30 يوماً", en: "A share of impressions for 30 days", price: "—" },
        ],
        ctaAr: "اعرض المنتج",
        ctaEn: "List the item",
      },
    },
  ],
};
