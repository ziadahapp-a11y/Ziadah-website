import type { SectorDeepDive } from "../sectorDeepDive";

export const digitalProductsDeepDive: SectorDeepDive = {
  slug: "digital-products",
  introAr:
    "المنتج الرقمي تكلفته الحدّية صفر: النسخة الثانية لا تكلف شيئاً، ولا مخزون ولا شحن ولا مقاس. هذا يقلب الاقتصاد رأساً على عقب — الحزمة هنا ليست تنازلاً عن هامش بل ربح صافٍ إضافي. والمشكلة الحقيقية ليست البيع بل الاستخدام: من يشتري دورة ولا يفتحها لا يشتري الثانية.",
  introEn:
    "A digital product has zero marginal cost: the second copy costs nothing, and there is no stock, no shipping and no size. That inverts the economics - a bundle here is not a margin concession, it is pure additional margin. And the real problem is not selling but using: whoever buys a course and never opens it does not buy the second one.",
  useCases: [
    {
      key: "bundle-free-margin",
      titleAr: "الحزمة التي لا تكلف شيئاً",
      titleEn: "The bundle that costs nothing to make",
      triggerAr: "العميل أضاف منتجاً رقمياً واحداً.",
      triggerEn: "The customer adds a single digital product.",
      scenarioAr:
        "تُعرض حزمة من ثلاثة منتجات بسعر أقل من مجموعها. لا تكلفة إضافية على المتجر إطلاقاً، فكل ريال في الفرق ربح.",
      scenarioEn:
        "A three-product bundle appears at less than the sum of its parts. There is no added cost to the store at all, so every riyal in the difference is margin.",
      whyAr:
        "في السلع المادية الحزمة تنازل عن هامش. هنا هي ربح إضافي بالكامل، ومع ذلك معظم متاجر المنتجات الرقمية تسعّر كأنها تبيع قمصاناً.",
      whyEn:
        "With physical goods a bundle concedes margin. Here it is entirely incremental, and yet most digital stores price as though they were selling shirts.",
      exampleAr: "قالب واحد ١٢٠ ← «الحزمة الكاملة ٨ قوالب بـ٣٩٠ بدل ٩٦٠».",
      exampleEn: "One template at 120 → \"The full pack, 8 templates for 390 instead of 960\".",
          widget: {
        titleAr: "الحزمة الكاملة",
        titleEn: "The full pack",
        mainAr: "قالب واحد",
        mainEn: "One template",
        mainPrice: "120",
        suggest: [
          { ar: "8 قوالب — الحزمة", en: "8 templates - the pack", price: "390", was: "960" },
        ],
        ctaAr: "خذ الحزمة",
        ctaEn: "Take the pack",
      },
    },
    {
      key: "activation",
      titleAr: "التفعيل: من الشراء إلى الاستخدام",
      titleEn: "Activation: from purchase to use",
      triggerAr: "مضى على الشراء أيام بلا تحميل أو دخول.",
      triggerEn: "Days have passed since purchase with no download or login.",
      scenarioAr:
        "رسالة تساعد على البدء لا على الشراء: أول خطوة، أقصر فيديو، ملف البداية. لا عرض جديد إطلاقاً.",
      scenarioEn:
        "A message that helps them start rather than buy: the first step, the shortest video, the starter file. No new offer at all.",
      whyAr:
        "من لم يستخدم ما اشتراه لن يشتري ثانية وسيطلب استرداداً. الاستخدام هو مقدمة الشراء الثاني، ولا شيء آخر.",
      whyEn:
        "Someone who never used what they bought will not buy again and will ask for a refund. Usage is the precondition for the second purchase, and nothing else is.",
      exampleAr: "دورة اشتُريت قبل ٥ أيام بلا دخول ← «ابدأ بالدرس الأول، ٧ دقائق».",
      exampleEn: "A course bought 5 days ago with no login → \"Start with lesson one, 7 minutes\".",
          widget: {
        titleAr: "ابدأ من هنا",
        titleEn: "Start here",
        mainAr: "دورة — اشتُريت قبل 5 أيام",
        mainEn: "A course - bought 5 days ago",
        mainPrice: "—",
        hintAr: "لم تفتحها بعد",
        hintEn: "You haven't opened it yet",
        suggest: [
          { ar: "الدرس الأول — 7 دقائق", en: "Lesson one - 7 minutes", price: "—" },
        ],
        ctaAr: "ابدأ الآن",
        ctaEn: "Start now",
      },
    },
    {
      key: "tier-upgrade",
      titleAr: "الترقية بعد أن يلمس الحد",
      titleEn: "The upgrade after they hit the limit",
      triggerAr: "المستخدم اقترب من حد باقته.",
      triggerEn: "The user approaches their plan's limit.",
      scenarioAr:
        "يُعرض الترقية عند ٨٠٪ من الحد لا عند الاشتراك: «استخدمت ٨ من ١٠ مشاريع». الحاجة أثبتت نفسها قبل العرض.",
      scenarioEn:
        "The upgrade is offered at 80% of the limit rather than at signup: \"8 of your 10 projects used\". The need has proved itself before the offer.",
      whyAr:
        "عرض الباقة الأعلى قبل أن يلمس المستخدم الحد يقرأ كجشع. عرضها وهو يوشك أن يصطدم بالحد يقرأ كتنبيه مفيد.",
      whyEn:
        "Offering the higher plan before they touch the limit reads as greed. Offering it as they are about to hit it reads as a useful heads-up.",
      exampleAr: "٨ من ١٠ مشاريع ← «الباقة الأعلى: مشاريع بلا حد، +٤٠ شهرياً».",
      exampleEn: "8 of 10 projects used → \"The higher plan: unlimited projects, +40 a month\".",
          widget: {
        titleAr: "اقتربت من الحد",
        titleEn: "You're near the limit",
        mainAr: "باقتك — 8 من 10 مشاريع",
        mainEn: "Your plan - 8 of 10 projects",
        mainPrice: "—",
        suggest: [
          { ar: "الباقة الأعلى — مشاريع بلا حد", en: "The higher plan - unlimited", price: "+40/شهر" },
        ],
        ctaAr: "رقّ باقتك",
        ctaEn: "Upgrade",
      },
    },
    {
      key: "instant-upsell",
      titleAr: "الإضافة في صفحة الشكر",
      titleEn: "The add-on on the thank-you page",
      triggerAr: "الدفع تم وصفحة التحميل ظهرت.",
      triggerEn: "Payment is done and the download page appears.",
      scenarioAr:
        "عرض واحد على صفحة التحميل: إضافة مكمّلة بسعر خاص لمرة واحدة. العميل أخرج بطاقته للتو والحاجز النفسي أدنى ما يكون.",
      scenarioEn:
        "One offer on the download page: a complementary add-on at a one-time price. The card is already out and the friction is at its lowest.",
      whyAr:
        "لحظة ما بعد الدفع أعلى لحظة قبول في القمع كله ولا تكلف شيئاً. لكن عرضاً واحداً فقط، لأن الثاني يفسد الثقة التي بُنيت للتو.",
      whyEn:
        "The moment after payment is the highest-acceptance point in the whole funnel and costs nothing. But one offer only - a second one ruins the trust just earned.",
      exampleAr: "بعد شراء قالب ← «ملفات المصدر القابلة للتعديل، ٦٥ ر.س لمرة واحدة».",
      exampleEn: "After buying a template → \"The editable source files, 65 SAR one time\".",
          widget: {
        titleAr: "قبل أن تغادر",
        titleEn: "Before you go",
        mainAr: "تم الشراء — القالب جاهز للتحميل",
        mainEn: "Purchased - ready to download",
        mainPrice: "—",
        suggest: [
          { ar: "ملفات المصدر القابلة للتعديل", en: "The editable source files", price: "65" },
        ],
        ctaAr: "أضفها لمرة واحدة",
        ctaEn: "Add it, one time only",
      },
    },
    {
      key: "license-tier",
      titleAr: "الترخيص التجاري لمن سيستخدمه تجارياً",
      titleEn: "The commercial licence for commercial use",
      triggerAr: "العميل يشتري أصلاً رقمياً له ترخيصان.",
      triggerEn: "The customer buys an asset that has two licence tiers.",
      scenarioAr:
        "يُوضّح الفرق بالاستخدام لا بالاسم: «شخصي: لمشاريعك. تجاري: لمشاريع عملائك». لا مصطلحات قانونية.",
      scenarioEn:
        "The difference is explained by use rather than by name: \"Personal: your own projects. Commercial: your clients' projects\". No legal jargon.",
      whyAr:
        "معظم من يشتري الترخيص الشخصي ويستخدمه تجارياً لا يغشّ بل لم يفهم. التوضيح بالاستخدام يبيع الترخيص الأعلى ويحمي حقوقك معاً.",
      whyEn:
        "Most people who buy the personal licence and use it commercially are not cheating, they misread it. Explaining by use sells the higher tier and protects your rights at once.",
      exampleAr: "قالب ١٢٠ شخصي ← «تجاري ٢٩٠: استخدمه في مشاريع عملائك».",
      exampleEn: "A 120 personal template → \"Commercial at 290: use it in your clients' work\".",
          widget: {
        titleAr: "اختر ترخيصك",
        titleEn: "Choose your licence",
        mainAr: "ترخيص شخصي — لمشاريعك",
        mainEn: "Personal - your own projects",
        mainPrice: "120",
        suggest: [
          { ar: "تجاري — لمشاريع عملائك", en: "Commercial - your clients' work", price: "290" },
        ],
        ctaAr: "خذ التجاري",
        ctaEn: "Take the commercial",
      },
    },
    {
      key: "update-cycle",
      titleAr: "الإصدار الجديد لمن اشترى القديم",
      titleEn: "The new version for whoever bought the old one",
      triggerAr: "صدر إصدار جديد من منتج اشتراه العميل.",
      triggerEn: "A new version ships of a product the customer owns.",
      scenarioAr:
        "يُعرض الإصدار الجديد بسعر ترقية لا بسعر كامل. المالك القديم أسهل عميل في القائمة وأقلهم تكلفة اكتساب.",
      scenarioEn:
        "The new version is offered at an upgrade price rather than the full one. An existing owner is the easiest customer on the list and the cheapest to reach.",
      whyAr:
        "قاعدة العملاء الحاليين هي الأصل الحقيقي في المنتجات الرقمية. بيع الإصدار الجديد لهم بلا تكلفة اكتساب هو أعلى هامش ممكن.",
      whyEn:
        "The existing customer base is the real asset in digital products. Selling the new version to it with zero acquisition cost is the highest margin available.",
      exampleAr: "اشترى الإصدار ٢ ← «الإصدار ٣ بسعر ترقية ٤٥ بدل ١٢٠».",
      exampleEn: "Bought version 2 → \"Version 3 at an upgrade price of 45 instead of 120\".",
          widget: {
        titleAr: "إصدار جديد",
        titleEn: "A new version",
        mainAr: "تملك الإصدار 2",
        mainEn: "You own version 2",
        mainPrice: "—",
        suggest: [
          { ar: "الإصدار 3 — سعر ترقية", en: "Version 3 - upgrade price", price: "45", was: "120" },
        ],
        ctaAr: "رقّ الآن",
        ctaEn: "Upgrade now",
      },
    },
  ],
};
