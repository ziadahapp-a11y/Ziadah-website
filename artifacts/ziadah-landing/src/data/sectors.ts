/** قطاعات زيادة — محتوى عربي/إنجليزي لصفحات القطاعات */

import { sectorPageRichBySlug } from "./sectorPageRich";
import { sectorLearningOverrides } from "./sectorLearningOverrides";

export type SectorPhaseCard = {
  emoji: string;
  titleAr: string;
  titleEn: string;
  bulletsAr: string[];
  bulletsEn: string[];
};

export type SectorHelpCard = {
  emoji: string;
  bodyAr: string;
  bodyEn: string;
};

export type SectorBestCard = {
  emoji: string;
  textAr: string;
  textEn: string;
};

export type SectorContent = {
  slug: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  seoDescAr: string;
  seoDescEn: string;
  howToApplyAr: string[];
  howToApplyEn: string[];
  howZiadahHelpsAr: string[];
  howZiadahHelpsEn: string[];
  examplesAr: string[];
  examplesEn: string[];
  experienceAr: string;
  experienceEn: string;
  bestPracticesAr: string[];
  bestPracticesEn: string[];
  /** عرض أقسام كبطاقات بدل القوائم الطويلة */
  useCardLayout?: boolean;
  howToPhaseCards?: SectorPhaseCard[];
  helpCards?: SectorHelpCard[];
  bestCards?: SectorBestCard[];
};

export const sectors: SectorContent[] = [
  {
    slug: "delivery-apps",
    icon: "🛵",
    titleAr: "تطبيقات التوصيل",
    titleEn: "Delivery Apps",
    taglineAr: "دليل شامل لتطبيق كل حلول زيادة في تطبيقات التوصيل",
    taglineEn: "A complete playbook for all Ziadah solutions in delivery apps",
    seoDescAr:
      "صفحة شاملة لتطبيقات التوصيل: جميع حالات الاستخدام والخصائص، خطة تفعيل خطوة بخطوة، أمثلة عملية، وتشغيل يومي قابل للتطبيق والمشاركة مع فريق المنتج والتسويق.",
    seoDescEn:
      "Comprehensive delivery-app guide: all use cases and features, step-by-step activation, practical examples, and an execution-ready operating model for product and growth teams.",
    howToApplyAr: [
      "المرحلة 1 (تهيئة البيانات): نظّف الكتالوج وموحّد أسماء الأصناف، وحدد الفئات الرئيسية (مطاعم، بقالة، صيدلية، حلويات) ثم الفئات الدقيقة داخل كل مسار.",
      "المرحلة 1: أضف وسوم تشغيلية على المنتجات (وقت الاستهلاك، حالة الطقس، وقت الذروة، هامش الربح، سرعة التحضير) حتى يتخذ المحرك قرارات توصية أدق.",
      "المرحلة 2 (خرائط التوافق): ابنِ مصفوفة علاقات واضحة (طبق رئيسي -> مشروب/مقبل/حلى) و(سلة ناقصة الحد -> إضافات سريعة) و(عميل متكرر -> عروض ترقية).",
      "المرحلة 2: جهّز مسارات الشرائح (عميل جديد، عميل عائد، عميل عالي التكرار، عميل منخفض السلة) لأن كل شريحة تحتاج نوع عرض مختلف.",
      "المرحلة 3 (أماكن الظهور): فعّل حالات الاستخدام عبر الرحلة كاملة: صفحة المنتج، إضافة للسلة، السلة، صفحة الدفع، وما قبل الحذف من السلة.",
      "فعّل خصائص العرض بالتدرج: منتجات ذات صلة -> إضافات (Add-ons) -> الشراء معاً -> عروض الحزم -> اشتر أكثر ووفر أكثر.",
      "فعّل خصائص الهدف بالتدرج: زيادة عدد المنتجات -> استبدال المنتج (Upsell) -> عروض الكمية -> الوصول للشحن المجاني -> قسيمة الخصم.",
      "المرحلة 4 (الحوكمة): حدّد قواعد لمنع الإزعاج (حد أقصى 1-2 توصية بكل نقطة، وتجميد التوصية بعد الرفض المتكرر).",
      "المرحلة 5 (القياس): راقب CTR، معدل إضافة التوصية، AOV uplift، conversion uplift، وتأثير كل use case بشكل منفصل.",
      "المرحلة 6 (التحسين الأسبوعي): ارفع وزن العروض الفائزة، أوقف العروض منخفضة العائد، وأعد توزيع الظهور بين الذروة وخارج الذروة.",
    ],
    howToApplyEn: [
      "Phase 1 (data readiness): normalize catalog naming, define primary verticals (restaurants, grocery, pharmacy, desserts), then granular subcategories.",
      "Phase 1: add operational tags (consumption time, weather, peak period, margin band, prep speed) so the engine can rank recommendations with context.",
      "Phase 2 (compatibility maps): build explicit mappings (main meal -> drink/side/dessert), (near-threshold cart -> quick add-ons), and (repeat buyer -> premium swap).",
      "Phase 2: define user cohorts (new, returning, high-frequency, low-basket) because each cohort needs a different recommendation strategy.",
      "Phase 3 (placement rollout): activate use cases across the full journey: product page, add-to-cart moment, cart, checkout, and pre-remove flows.",
      "Roll out presentation features progressively: Related Products -> Add-ons -> Buy Together -> Bundle Deals -> Buy More Save More.",
      "Roll out goal features progressively: More Cart Items -> Product Swap (Upsell) -> Quantity Offers -> Free Shipping Threshold -> Discount Coupon.",
      "Phase 4 (governance): enforce anti-fatigue rules (max 1-2 recommendations per touchpoint, cooldown after repeated rejection).",
      "Phase 5 (measurement): track CTR, recommendation add rate, AOV uplift, conversion uplift, and per-use-case contribution.",
      "Phase 6 (weekly optimization): scale winners, pause low-yield offers, and rebalance placements across peak/off-peak windows.",
    ],
    howZiadahHelpsAr: [
      "يغطي كل use cases المتاحة في المنصة لتطبيقات التوصيل: Cross-sell، Upsell، Add-ons، Related Products، Buy Together، Bundle Deals، Buy More Save More، Discount Coupon، Free Shipping Display، Remove-from-cart retention.",
      "يفعّل جميع نقاط الرحلة: صفحة المنتج، السلة، الدفع، الإضافة للسلة، الحذف من السلة، وصفحات التصنيف/الرئيسية عند الحاجة.",
      "يرفع متوسط السلة AOV من خلال اقتراح إضافات ذات احتكاك منخفض (مشروبات، صوصات، حلويات سريعة) في اللحظة الأعلى قابلية للقبول.",
      "يرفع التحويل عبر عروض احتفاظ ذكية قبل الهجر: قسيمة مخصصة، إغلاق فجوة الشحن المجاني، أو بديل منتج أعلى قيمة مبرر سياقيًا.",
      "يرفع عدد المنتجات في الطلب عبر Bundles وBuy Together بشكل متوافق مع نوع الطلب ووقت اليوم.",
      "يحسّن تجربة العميل عبر تقليل العروض العشوائية وتقديم توصيات مفهومة (لماذا هذا العرض؟) بدل الإلحاح البيعي.",
      "يدعم فرق النمو بتقارير تفصيلية على مستوى الحملة والمنتج والنقطة داخل الرحلة، مما يسهّل مضاعفة ما ينجح فعليًا.",
      "يمكّن التشغيل التلقائي مع إمكانية التحكم اليدوي عند الحملات الموسمية (رمضان، نهاية الأسبوع، مباريات، العروض اللحظية).",
    ],
    howZiadahHelpsEn: [
      "Covers the full use-case stack for delivery apps: Cross-sell, Upsell, Add-ons, Related Products, Buy Together, Bundle Deals, Buy More Save More, Discount Coupon, Free Shipping Display, and remove-from-cart retention.",
      "Activates recommendations across all relevant touchpoints: product page, cart, checkout, add-to-cart moment, remove-from-cart, and category/home where relevant.",
      "Increases AOV with low-friction micro add-ons (drinks, sauces, quick desserts) at the highest-intent moments.",
      "Improves conversion using smart retention logic before abandonment: personalized coupons, free-shipping gap closure, or context-aware premium swaps.",
      "Grows item count per order using bundles and buy-together constructs tuned to order type and time of day.",
      "Improves UX by reducing noisy suggestions and exposing understandable recommendation intent instead of aggressive selling.",
      "Enables growth teams with campaign-level, SKU-level, and touchpoint-level reporting to scale what truly performs.",
      "Supports autonomous optimization plus manual overrides for seasonal pushes (Ramadan, weekends, match nights, flash campaigns).",
    ],
    examplesAr: [
      "Use case: Product page cross-sell -> عميل يشاهد بيتزا عائلية، تظهر توصية مباشرة بمشروب 1 لتر + بطاطس ودجز بنسبة قبول أعلى.",
      "Use case: Add-ons -> عند الضغط على إضافة البرجر، يظهر اختيار إضافات سريعة (جبن إضافي، صوص، بطاطس) دون مغادرة السياق.",
      "Use case: Buy together -> سلة تحتوي وجبة فردية، يقترح النظام ترقية إلى وجبة ثنائية بسعر أفضل للوحدة.",
      "Use case: Bundle deals -> حزمة غداء مكتب (ساندويتش + مشروب + حلى) بسعر مخفّض من عناصر منفصلة.",
      "Use case: Buy more save more -> 1 مشروب = سعر عادي، 2 = خصم 10%، 3 = خصم 15% + أولوية تحضير.",
      "Use case: Upsell -> العميل يختار وجبة صغيرة، يظهر بديل متوسط مع قيمة غذائية أعلى وفارق سعري واضح.",
      "Use case: Free shipping threshold -> يتبقى 9 ريال للشحن المجاني، يقترح النظام عنصرًا سريعًا يملأ الفجوة.",
      "Use case: Discount coupon retention -> قبل مغادرة السلة يظهر كود شخصي صالح دقائق لإنهاء الطلب الآن.",
      "Use case: Remove-from-cart rescue -> عند حذف طبق رئيسي، يقترح النظام بديلًا أقل سعرًا بدل خسارة الطلب كاملًا.",
      "Use case: Category/home personalization -> في وقت الإفطار، تبرز أصناف خفيفة وسريعة التوصيل حسب تاريخ العميل.",
    ],
    examplesEn: [
      "Use case: Product-page cross-sell -> family pizza view triggers a drink + wedges recommendation with high acceptance probability.",
      "Use case: Add-ons -> on burger add-to-cart, quick extras appear (extra cheese, sauce, fries) without context switching.",
      "Use case: Buy-together -> single-meal cart prompts a two-person combo with better unit economics.",
      "Use case: Bundle deals -> office lunch bundle (sandwich + drink + dessert) at a package discount.",
      "Use case: Buy-more-save-more -> 1 drink = base price, 2 = 10% off, 3 = 15% off + prep priority.",
      "Use case: Upsell -> small meal selection prompts a medium upgrade with clear value framing.",
      "Use case: Free-shipping threshold -> cart is 9 SAR short; engine suggests a fast-moving filler item.",
      "Use case: Discount coupon retention -> pre-exit personalized coupon appears with short expiry to close now.",
      "Use case: Remove-from-cart rescue -> removing a core item triggers a lower-price alternative to save the order.",
      "Use case: Category/home personalization -> at breakfast peaks, quick-serve items are ranked by user history.",
    ],
    experienceAr:
      "هذه الصفحة مصممة كوثيقة تشغيل ومشاركة: تغطي البنية، الخصائص، كل حالات الاستخدام، مسارات التفعيل، وآلية القياس. في تطبيقات التوصيل، عامل الوقت حاسم؛ لذلك النجاح يأتي من توصيات عالية الصلة، قصيرة، وتظهر في نقطة قرار صحيحة، مع دورة تحسين أسبوعية مبنية على البيانات.",
    experienceEn:
      "This page is built as a shareable operating document: architecture, features, full use-case coverage, rollout paths, and measurement model. In delivery apps, time pressure dominates behavior, so wins come from concise, high-relevance recommendations shown at the right decision moments with weekly data-led optimization.",
    bestPracticesAr: [
      "استخدم إطار 70/20/10: 70% توصيات مجربة الأداء، 20% تحسينات تدريجية، 10% تجارب جديدة.",
      "افصل القياس حسب نوع الطلب (فردي/عائلي/مكتبي) وحسب الوقت (ذروة/غير ذروة) لتجنّب قرارات مضللة.",
      "لا تعرض أكثر من توصيتين متزامنتين في نفس الشاشة لتقليل الحمل المعرفي.",
      "اربط كل توصية بسبب واضح للمستخدم (يكمل الطلب، يوفر قيمة، يسرع الوصول للشحن المجاني).",
      "تأكد من توفر المخزون الفعلي قبل عرض التوصية حتى لا تتدهور الثقة.",
      "استخدم إيقاف تلقائي للعروض الضعيفة (مثلاً CTR منخفض لـ 3 أيام متتالية).",
      "راجع أثر كل use case على هامش الربح وليس المبيعات فقط.",
      "حوّل الحملات الناجحة إلى قوالب تشغيلية يمكن نسخها عبر المدن والفروع.",
    ],
    bestPracticesEn: [
      "Use a 70/20/10 model: 70% proven recommendations, 20% iterative improvements, 10% exploratory tests.",
      "Segment reporting by order type (single/family/office) and by time window (peak/off-peak) to avoid false conclusions.",
      "Do not show more than two simultaneous recommendations per screen.",
      "Attach clear shopper-facing rationale for each recommendation (completion, value, free-shipping progress).",
      "Guarantee real stock availability before surfacing recommendations.",
      "Auto-pause weak creatives/rules (e.g., persistently low CTR for 3 consecutive days).",
      "Evaluate each use case on margin contribution, not only topline sales.",
      "Turn winning campaigns into reusable operating templates across cities and branches.",
    ],
    useCardLayout: true,
    howToPhaseCards: [
      {
        emoji: "📦",
        titleAr: "المرحلة 01 — تهيئة البيانات",
        titleEn: "Phase 01 — Data Readiness",
        bulletsAr: [
          "نظّف الكتالوج وحدد الفئات: مطاعم، بقالة، صيدلية، حلويات.",
          "أضف وسوماً: وقت الذروة، هامش الربح، سرعة التحضير.",
        ],
        bulletsEn: [
          "Clean the catalog and define categories: restaurants, grocery, pharmacy, desserts.",
          "Add tags: peak time, margin band, prep speed.",
        ],
      },
      {
        emoji: "🗺️",
        titleAr: "المرحلة 02 — خرائط التوافق",
        titleEn: "Phase 02 — Compatibility Maps",
        bulletsAr: [
          "طبق رئيسي → مشروب/مقبل/حلى | سلة ناقصة → إضافات سريعة.",
          "شرائح: جديد، عائد، عالي التكرار، منخفض السلة.",
        ],
        bulletsEn: [
          "Main → drink/starter/dessert | low cart → quick add-ons.",
          "Cohorts: new, returning, high-frequency, low-basket.",
        ],
      },
      {
        emoji: "📍",
        titleAr: "المرحلة 03 — التفعيل التدريجي",
        titleEn: "Phase 03 — Progressive Rollout",
        bulletsAr: [
          "صفحة المنتج → السلة → الدفع → ما قبل الحذف.",
          "Related → Add-ons → Bundles → Buy More Save More → Coupon.",
        ],
        bulletsEn: [
          "Product page → cart → checkout → pre-remove.",
          "Related → Add-ons → Bundles → Buy More Save More → Coupon.",
        ],
      },
      {
        emoji: "🛡️",
        titleAr: "المرحلة 04 — الحوكمة",
        titleEn: "Phase 04 — Governance",
        bulletsAr: [
          "حد أقصى 1-2 توصية لكل نقطة في الرحلة.",
          "تجميد التوصية بعد الرفض المتكرر.",
        ],
        bulletsEn: [
          "Max 1–2 recommendations per journey touchpoint.",
          "Freeze a recommendation after repeated rejection.",
        ],
      },
      {
        emoji: "📊",
        titleAr: "المرحلة 05 — القياس",
        titleEn: "Phase 05 — Measurement",
        bulletsAr: [
          "CTR + معدل الإضافة + AOV uplift + Conversion uplift.",
          "افصل حسب نوع الطلب ووقت اليوم.",
        ],
        bulletsEn: [
          "CTR + attach rate + AOV uplift + conversion uplift.",
          "Split by order type and time of day.",
        ],
      },
      {
        emoji: "⚡",
        titleAr: "المرحلة 06 — التحسين الأسبوعي",
        titleEn: "Phase 06 — Weekly Optimization",
        bulletsAr: [
          "ارفع وزن الفائزين + أوقف منخفضي العائد تلقائياً.",
          "حوّل الناجحين لقوالب قابلة للنسخ عبر المدن.",
        ],
        bulletsEn: [
          "Raise winner weights + auto-pause low-yield offers.",
          "Turn winners into copyable templates across cities.",
        ],
      },
    ],
    helpCards: [
      {
        emoji: "🧩",
        bodyAr:
          "يغطي كل use cases المتاحة في المنصة لتطبيقات التوصيل: Cross-sell، Upsell، Add-ons، Related Products، Buy Together، Bundle Deals، Buy More Save More، Discount Coupon، Free Shipping Display، Remove-from-cart retention.",
        bodyEn:
          "Covers the full use-case stack for delivery apps: Cross-sell, Upsell, Add-ons, Related Products, Buy Together, Bundle Deals, Buy More Save More, Discount Coupon, Free Shipping Display, and remove-from-cart retention.",
      },
      {
        emoji: "🛤️",
        bodyAr:
          "يفعّل جميع نقاط الرحلة: صفحة المنتج، السلة، الدفع، الإضافة للسلة، الحذف من السلة، وصفحات التصنيف/الرئيسية عند الحاجة.",
        bodyEn:
          "Activates recommendations across all relevant touchpoints: product page, cart, checkout, add-to-cart moment, remove-from-cart, and category/home where relevant.",
      },
      {
        emoji: "🛒",
        bodyAr:
          "يرفع متوسط السلة AOV من خلال اقتراح إضافات ذات احتكاك منخفض (مشروبات، صوصات، حلويات سريعة) في اللحظة الأعلى قابلية للقبول.",
        bodyEn:
          "Increases AOV with low-friction micro add-ons (drinks, sauces, quick desserts) at the highest-intent moments.",
      },
      {
        emoji: "🎯",
        bodyAr:
          "يرفع التحويل عبر عروض احتفاظ ذكية قبل الهجر: قسيمة مخصصة، إغلاق فجوة الشحن المجاني، أو بديل منتج أعلى قيمة مبرر سياقيًا.",
        bodyEn:
          "Improves conversion using smart retention logic before abandonment: personalized coupons, free-shipping gap closure, or context-aware premium swaps.",
      },
      {
        emoji: "📦",
        bodyAr:
          "يرفع عدد المنتجات في الطلب عبر Bundles وBuy Together بشكل متوافق مع نوع الطلب ووقت اليوم.",
        bodyEn:
          "Grows item count per order using bundles and buy-together constructs tuned to order type and time of day.",
      },
      {
        emoji: "✨",
        bodyAr:
          "يحسّن تجربة العميل عبر تقليل العروض العشوائية وتقديم توصيات مفهومة (لماذا هذا العرض؟) بدل الإلحاح البيعي.",
        bodyEn:
          "Improves UX by reducing noisy suggestions and exposing understandable recommendation intent instead of aggressive selling.",
      },
      {
        emoji: "📈",
        bodyAr:
          "يدعم فرق النمو بتقارير تفصيلية على مستوى الحملة والمنتج والنقطة داخل الرحلة، مما يسهّل مضاعفة ما ينجح فعليًا.",
        bodyEn:
          "Enables growth teams with campaign-level, SKU-level, and touchpoint-level reporting to scale what truly performs.",
      },
      {
        emoji: "🎛️",
        bodyAr:
          "يمكّن التشغيل التلقائي مع إمكانية التحكم اليدوي عند الحملات الموسمية (رمضان، نهاية الأسبوع، مباريات، العروض اللحظية).",
        bodyEn:
          "Supports autonomous optimization plus manual overrides for seasonal pushes (Ramadan, weekends, match nights, flash campaigns).",
      },
    ],
    bestCards: [
      { emoji: "7️⃣", textAr: "استخدم إطار 70/20/10: 70% توصيات مجربة الأداء، 20% تحسينات تدريجية، 10% تجارب جديدة.", textEn: "Use a 70/20/10 model: 70% proven recommendations, 20% iterative improvements, 10% exploratory tests." },
      { emoji: "📐", textAr: "افصل القياس حسب نوع الطلب (فردي/عائلي/مكتبي) وحسب الوقت (ذروة/غير ذروة) لتجنّب قرارات مضللة.", textEn: "Segment reporting by order type (single/family/office) and by time window (peak/off-peak) to avoid false conclusions." },
      { emoji: "2️⃣", textAr: "لا تعرض أكثر من توصيتين متزامنتين في نفس الشاشة لتقليل الحمل المعرفي.", textEn: "Do not show more than two simultaneous recommendations per screen." },
      { emoji: "💬", textAr: "اربط كل توصية بسبب واضح للمستخدم (يكمل الطلب، يوفر قيمة، يسرع الوصول للشحن المجاني).", textEn: "Attach clear shopper-facing rationale for each recommendation (completion, value, free-shipping progress)." },
      { emoji: "📦", textAr: "تأكد من توفر المخزون الفعلي قبل عرض التوصية حتى لا تتدهور الثقة.", textEn: "Guarantee real stock availability before surfacing recommendations." },
      { emoji: "⏸️", textAr: "استخدم إيقاف تلقائي للعروض الضعيفة (مثلاً CTR منخفض لـ 3 أيام متتالية).", textEn: "Auto-pause weak creatives/rules (e.g., persistently low CTR for 3 consecutive days)." },
      { emoji: "💰", textAr: "راجع أثر كل use case على هامش الربح وليس المبيعات فقط.", textEn: "Evaluate each use case on margin contribution, not only topline sales." },
      { emoji: "📋", textAr: "حوّل الحملات الناجحة إلى قوالب تشغيلية يمكن نسخها عبر المدن والفروع.", textEn: "Turn winning campaigns into reusable operating templates across cities and branches." },
    ],
  },
  {
    slug: "ecommerce-platforms",
    icon: "🧩",
    titleAr: "منصات التسوق الإلكترونية",
    titleEn: "Ecommerce Platforms",
    taglineAr: "مرجع شامل لمنصات التسوق: كل الخصائص واليوز كيسس بالتفصيل",
    taglineEn: "Complete marketplace reference: all features and use cases in detail",
    seoDescAr:
      "دليل تفصيلي شامل لمنصات التسوق الإلكترونية متعددة البائعين: التطبيق الكامل لحلول زيادة، جميع حالات الاستخدام، الحوكمة، القياس، وتحسين التحويل والـAOV على مستوى المنصة والبائع.",
    seoDescEn:
      "A full implementation guide for multi-vendor ecommerce platforms: complete Ziadah feature coverage, all use cases, governance, measurement, and AOV/conversion optimization at platform and seller levels.",
    howToApplyAr: [
      "المرحلة 1 (بنية المنصة): وحّد taxonomy والسمات الأساسية عبر كل البائعين (العلامة، الفئة، النطاق السعري، الجودة، التوفر، زمن الشحن).",
      "المرحلة 1: أنشئ درجات جودة بيانات للبائعين (Data Quality Score) ولا تُدخل الموردين الأقل من الحد الأدنى إلى التوصيات الحساسة.",
      "المرحلة 2 (حوكمة العرض): عرّف قواعد موازنة بين الصلة، الأداء، وتنوع البائعين حتى لا تهيمن متاجر محددة على كل الظهور.",
      "المرحلة 2: ابنِ سياسات عدالة للبائعين الجدد (Cold-start boost مضبوط) دون الإضرار بمعدل التحويل العام.",
      "المرحلة 3 (تفعيل كامل اليوز كيسس): فعّل Related Products، Add-ons، Buy Together، Bundle Deals، Buy More Save More، Cross-sell، Upsell، Free Shipping، Discount Coupon، Remove-from-cart rescue.",
      "المرحلة 3: فعّل نقاط الرحلة داخل المنصة: صفحة المنتج، البحث، التصنيف، السلة، الدفع، الإضافة للسلة، الحذف من السلة.",
      "المرحلة 4 (استراتيجية الشحن): أدمج تكلفة/سرعة الشحن في قرار التوصية لأن المنصات متعددة الموردين تتأثر لوجستيًا أكثر من المتاجر الفردية.",
      "المرحلة 5 (التقارير): أنشئ لوحات مزدوجة: لوحة إدارة المنصة + لوحة أداء لكل بائع (CTR، Conversion، AOV uplift، Margin uplift).",
      "المرحلة 6 (التشغيل): اعمل بمراجعة أسبوعية للسياسات العامة ومراجعة يومية للعروض ذات التأثير الكبير في المواسم.",
    ],
    howToApplyEn: [
      "Phase 1 (platform foundation): standardize taxonomy and core attributes across sellers (brand, category, price band, quality tier, stock, shipping SLA).",
      "Phase 1: enforce seller data-quality scoring and gate low-quality feeds from sensitive recommendation surfaces.",
      "Phase 2 (exposure governance): define balancing rules between relevance, performance, and seller diversity to prevent over-concentration.",
      "Phase 2: implement calibrated cold-start boosts for new sellers without harming overall conversion.",
      "Phase 3 (full use-case rollout): enable Related Products, Add-ons, Buy Together, Bundle Deals, Buy More Save More, Cross-sell, Upsell, Free Shipping, Discount Coupon, and remove-from-cart rescue.",
      "Phase 3: activate touchpoints across product, search, category, cart, checkout, add-to-cart, and remove-from-cart.",
      "Phase 4 (shipping-aware ranking): incorporate shipping cost/speed into recommendation ranking for multi-vendor logistics reality.",
      "Phase 5 (reporting): run dual dashboards: platform-operator view + per-seller performance view (CTR, conversion, AOV uplift, margin uplift).",
      "Phase 6 (operations): weekly policy reviews plus daily tuning for high-impact campaigns during seasonal peaks.",
    ],
    howZiadahHelpsAr: [
      "يغطي كل خصائص التوصية في بيئة المنصات وليس فقط متجرًا واحدًا: يوصي داخل البائع نفسه أو عبر بائعين مختلفين وفق قواعد المنصة.",
      "يرفع عمق الاكتشاف (Discovery Depth) عبر ترتيب ديناميكي للمنتجات حسب نية العميل الفعلية وليس مجرد الشعبية العامة.",
      "يحسّن التحويل بتجربة شخصية على مستوى الجلسة (صفحات شوهدت، زمن التصفح، حساسية السعر، سلوك الإضافة/الحذف).",
      "يرفع AOV عبر تجميع منتجات مكملة من بائع واحد أو عدة بائعين عندما تكون تجربة الدفع/الشحن مناسبة.",
      "يدعم احتفاظ العميل داخل المنصة عبر تقليل نهايات الطريق المسدودة (Dead-end pages) بتوصيات خروج ذكية.",
      "يمكّن إدارة المنصة من تحقيق توازن عملي بين عدالة الظهور للبائعين والأداء التجاري القابل للنمو.",
      "يوفر تحليلات عميقة تُظهر أي use case أنجح لكل فئة ولكل بائع، مما يجعل قرارات التوسّع دقيقة.",
      "يدعم فرق المبيعات في إقناع البائعين بالانضمام إلى برامج توصية مشتركة مبنية على بيانات حقيقية.",
    ],
    howZiadahHelpsEn: [
      "Supports the full recommendation stack in marketplace environments, not just single-store logic: intra-seller and cross-seller recommendations under platform policy.",
      "Improves discovery depth with intent-driven ranking instead of generic popularity bias.",
      "Improves conversion with session-level personalization (view sequence, dwell time, price sensitivity, add/remove behavior).",
      "Increases AOV by building complementary sets across one or multiple sellers when checkout/shipping logic supports it.",
      "Improves retention by reducing dead-end browsing paths through smart exit recommendations.",
      "Helps operators balance seller fairness and commercial performance with measurable controls.",
      "Delivers granular analytics showing which use case wins by category and by seller, enabling precise scaling decisions.",
      "Arms commercial teams with performance evidence to onboard sellers into recommendation-led growth programs.",
    ],
    examplesAr: [
      "Use case: Search results personalization -> عميل يبحث عن \"كرسي مكتب\"، ترتّب النتائج حسب راحته السعرية وسلوكاته السابقة بدل الترتيب العام.",
      "Use case: Cross-seller related products -> مشاهدة لابتوب من بائع A تتبعها توصية ماوس ولوحة مفاتيح من بائع B بتوافق أعلى.",
      "Use case: Add-ons -> عند إضافة كاميرا، تظهر بطاقة بطارية وذاكرة من نفس البائع أو بائع أسرع شحنًا.",
      "Use case: Buy together -> منصة الأدوات المنزلية تعرض مجموعة جاهزة (مثقاب + رؤوس + نظارة حماية).",
      "Use case: Bundle deals -> حزمة تجهيز مكتب منزلي من عدة بائعين مع توفير موحّد.",
      "Use case: Buy more save more -> اشتري قطعتين من مستلزمات المدرسة لتحصل على خصم تدريجي في موسم العودة.",
      "Use case: Upsell -> عميل يشاهد سماعة اقتصادية، يظهر بديل أعلى تقييمًا مع فارق سعر منطقي.",
      "Use case: Free shipping display -> السلة أقل من الحد، تقترح المنصة منتجًا سريع الشحن لسد الفجوة.",
      "Use case: Discount coupon -> عميل متردد في الدفع يحصل على عرض قصير المدة مرتبط بفئته المهتم بها.",
      "Use case: Remove-from-cart rescue -> حذف منتج مرتفع السعر يؤدي لاقتراح بديل قريب وظيفيًا بسعر أقل.",
    ],
    examplesEn: [
      "Use case: Search personalization -> a 'desk chair' query is ranked by inferred price comfort and intent, not default popularity.",
      "Use case: Cross-seller related products -> laptop view from seller A triggers compatible mouse/keyboard from seller B.",
      "Use case: Add-ons -> camera add-to-cart surfaces memory and battery options from same seller or faster-shipping alternatives.",
      "Use case: Buy-together -> DIY marketplace suggests a ready set (drill + bits + safety glasses).",
      "Use case: Bundle deals -> home-office setup bundle combines multi-seller items with a unified value proposition.",
      "Use case: Buy-more-save-more -> school-supplies season applies progressive discounts for higher quantities.",
      "Use case: Upsell -> budget headset view triggers a top-rated premium alternative with clear value delta.",
      "Use case: Free-shipping threshold -> cart gap is closed with a fast-shipping, relevant add-on.",
      "Use case: Discount coupon -> hesitant checkout user receives a short-lived, category-aligned incentive.",
      "Use case: Remove-from-cart rescue -> removing a high-priced item prompts a functionally similar lower-price substitute.",
    ],
    experienceAr:
      "هذه الصفحة تم إعدادها كمرجع شامل قابل للمشاركة مع فرق المنصات والبائعين: من الحوكمة والبيانات إلى التطبيق العملي لكل use case. نجاح المنصات يعتمد على موازنة دقيقة بين الصلة، عدالة الظهور، وتجربة شحن متماسكة؛ وزيادة يوفّر إطارًا تشغيليًا يحقق ذلك مع قياس واضح.",
    experienceEn:
      "This page is structured as a shareable marketplace handbook for operator and seller teams: from data governance to practical execution of every use case. Marketplace success depends on balancing relevance, fair exposure, and coherent shipping UX; Ziadah provides an operational framework with transparent measurement.",
    bestPracticesAr: [
      "اعتمد KPI ثلاثي: جودة التجربة (CTR/Engagement)، جودة التجارة (Conversion/AOV)، وعدالة السوق (Share of exposure by seller tier).",
      "طبّق ceiling للظهور على مستوى البائع/المنتج لتفادي الاحتكار غير المقصود.",
      "استخدم قواعد استبعاد قوية (مخزون منخفض، شحن بطيء، تقييمات ضعيفة) قبل أي توصية.",
      "صمّم تجارب منفصلة لفئات المنصة الكبرى بدل سياسة واحدة للجميع.",
      "حدّث أوزان الترتيب أسبوعيًا بناءً على نتائج فعلية وليس افتراضات فريق العمل.",
      "افتح برنامج توصيات مشترك للبائعين مع متطلبات جودة واضحة وعائد متوقع.",
      "راقب الأداء في المواسم الثقيلة بشكل يومي (العروض الكبرى) مع خطط تدخل سريعة.",
      "وثّق كل تجربة A/B ونتيجتها لتكوين playbook داخلي يمكن نسخه عبر الفئات.",
    ],
    bestPracticesEn: [
      "Track a three-axis KPI system: experience quality (CTR/engagement), commerce quality (conversion/AOV), and marketplace fairness (exposure share by seller tier).",
      "Apply exposure ceilings at seller/SKU levels to prevent unintentional concentration.",
      "Use strict exclusion rules (low stock, slow shipping, weak ratings) before recommendation serving.",
      "Design category-specific policies instead of one generic marketplace policy.",
      "Refresh ranking weights weekly from observed performance, not static assumptions.",
      "Run a seller recommendation program with clear quality requirements and expected ROI.",
      "Monitor high-traffic seasons daily with rapid intervention playbooks.",
      "Document every A/B test and outcome to build an internal reusable playbook.",
    ],
  },
  {
    slug: "abayas-fashion",
    icon: "🧕",
    titleAr: "عبايات وأزياء",
    titleEn: "Abayas & Fashion",
    taglineAr: "تجارة أنيقة بدون تعقيد",
    taglineEn: "Elegant commerce without complexity",
    seoDescAr:
      "كيف تطبّق زيادة في متجر العبايات والأزياء: إطقم، إكسسوارات، وبيع إضافي ذكي مع أمثلة وأفضل الممارسات.",
    seoDescEn:
      "How Ziadah serves fashion & abaya stores: outfits, accessories, and smart upsells with examples and best practices.",
    howToApplyAr: [
      "فعّل التطبيق من سلة أو زد واختر أماكن ظهور الويدجت (صفحة المنتج، السلة، الفئة).",
      "صنّف منتجاتك بدقة (لون، مقاس، مناسبة) لتحسين جودة التوصيات.",
      "حدّد منتجات مكملة ثابتة (شيل، حجاب، إكسسوار) كمرشحات أولية إن رغبت.",
    ],
    howToApplyEn: [
      "Enable the app from Salla or Zid and choose widget placements (product, cart, category).",
      "Tag products clearly (color, size, occasion) to improve recommendation quality.",
      "Optionally pin complementary items (shawl, hijab, accessories) as soft anchors.",
    ],
    howZiadahHelpsAr: [
      "يقترح إطقماً كاملاً أو قطعاً تكمل اللون والمناسبة.",
      "يرفع متوسط السلة عبر منتجات صغيرة مكملة تُشترى مع العباية.",
      "يقلل التردد بعرض بدائل أعلى جودة (Upsell) عندما يناسب السلوك.",
    ],
    howZiadahHelpsEn: [
      "Suggests full outfits or pieces that match color and occasion.",
      "Raises AOV via small add-ons often bought with the main garment.",
      "Reduces hesitation with premium alternatives (upsell) when behavior fits.",
    ],
    examplesAr: [
      "عميلة تتصفح عباية سوداء → توصية بشيل بلون متناسق وحقيبة صغيرة.",
      "سلة فيها عباية صيفية → اقتراح نظارات أو حذاء مسطح من نفس الطابع.",
    ],
    examplesEn: [
      "Customer views a black abaya → coordinated shawl and small bag suggestions.",
      "Summer abaya in cart → sunglasses or flats in the same style family.",
    ],
    experienceAr:
      "متاجر الأزياء تحتاج توازناً بين الإلهام والبساطة؛ زيادة تختار اللحظة والمكان المناسبين لعرض الإضافات دون إزعاج واجهة العلامة.",
    experienceEn:
      "Fashion brands need inspiration without clutter; Ziadah picks the right moment and placement so add-ons feel native to your brand UI.",
    bestPracticesAr: [
      "صوّر الإطقم على نفس الموديل لرفع ثقة الشراء المجمّع.",
      "استخدم عروض كميات خفيفة على الإكسسوارات المتكررة الشراء.",
      "راجع تقارير التحويل أسبوعياً واضبط الفئات الأضعف.",
    ],
    bestPracticesEn: [
      "Show outfits on-model to lift bundle confidence.",
      "Use light quantity deals on repeat-purchase accessories.",
      "Review conversion weekly and tune weaker categories.",
    ],
  },
  {
    slug: "health-fitness",
    icon: "💪",
    titleAr: "الصحة واللياقة",
    titleEn: "Health & Fitness",
    taglineAr: "قدّم منتجاتك بصورة مقنعة لعميلك",
    taglineEn: "Present your products convincingly",
    seoDescAr: "حلول زيادة لمتاجر المكملات والرياضة: تغذية، معدات، وروتين شراء متكرر.",
    seoDescEn: "Ziadah for supplements & fitness: nutrition, gear, and repeat-buy journeys.",
    howToApplyAr: [
      "اربط المنتجات بتصنيفات هدف واضحة (تنشيف، عضلات، طاقة).",
      "فعّل التوصيات في صفحة المنتج والسلة حيث قرار الجرعة والكمية يُتخذ.",
    ],
    howToApplyEn: [
      "Group products by clear goals (cut, bulk, energy).",
      "Enable recommendations on product and cart where dose and quantity decisions happen.",
    ],
    howZiadahHelpsAr: [
      "يقترح مكملاً يكمّل البرنامج (مثلاً أوميغا مع بروتين).",
      "يعزز «اشترِ أكثر ووفّر» على المنتجات ذات الاستهلاك الدوري.",
    ],
    howZiadahHelpsEn: [
      "Suggests stack items that complete the program (e.g. omega with protein).",
      "Boosts buy-more-save-more on consumables with predictable repurchase.",
    ],
    examplesAr: [
      "مشروب بروتين في السلة → كولاجين أو مالتودكسترين حسب سلوك الشريحة.",
      "عميل يتصفح أحذية جري → شراب تقني أو زجاجة ماء من نفس النطاق السعري.",
    ],
    examplesEn: [
      "Protein in cart → collagen or carb companion based on segment behavior.",
      "Customer browses running shoes → technical socks or bottle in a similar band.",
    ],
    experienceAr:
      "قطاع اللياقة يعتمد على الثقة والتكرار؛ التوصيات تُقنِع عندما تبدو كخطة وليس كإعلان.",
    experienceEn:
      "Fitness relies on trust and habit; recommendations work when they read as a plan, not an ad.",
    bestPracticesAr: [
      "اذكر الاستخدام المقترح باختصار في وصف المنتج لدعم الذكاء الاصطناعي السياقي.",
      "وفّر حزماً شهرية للمنتجات عالية التكرار.",
    ],
    bestPracticesEn: [
      "Keep suggested use cases in descriptions to help contextual AI.",
      "Offer monthly bundles for high-frequency SKUs.",
    ],
  },
  {
    slug: "digital-products",
    icon: "📦",
    titleAr: "المنتجات الرقمية",
    titleEn: "Digital Products",
    taglineAr: "تاجر بمنتجات رقمية بدون صعوبات تقنية",
    taglineEn: "Sell digital goods without technical friction",
    seoDescAr: "زيادة للكتب الإلكترونية، الدورات، والتراخيص: تسليم فوري وتوصيات ذكية.",
    seoDescEn: "Ziadah for ebooks, courses, and licenses: instant delivery and smart bundles.",
    howToApplyAr: [
      "صنّف المنتجات الرقمية بمستوى (مبتدئ، متوسط، احترافي) لربط المسار التعليمي.",
      "استخدم صفحة الشكر لعرض منتج رقمي تكميلي بعد الشراء.",
    ],
    howToApplyEn: [
      "Tag digital SKUs by level (beginner → pro) to chain learning paths.",
      "Use thank-you page for a complementary digital upsell after purchase.",
    ],
    howZiadahHelpsAr: [
      "يقترح حزمة كورس + قالب أو ملحق بعد أول شراء.",
      "يقلل هجر السلة بكوبون لحظي للمنتجات الرقمية ذات الصلة.",
    ],
    howZiadahHelpsEn: [
      "Suggests course + template bundles after a first digital buy.",
      "Reduces abandonment with timely coupons on related digital items.",
    ],
    examplesAr: [
      "شراء قالب تصميم → اقتراح أيقونات أو خط من نفس البائع.",
      "كورس برمجة → مستوى أعلى أو مشروع عملي مرتبط.",
    ],
    examplesEn: [
      "Template purchase → icon pack or font from the same creator.",
      "Coding course → advanced module or capstone project upsell.",
    ],
    experienceAr:
      "المنتج الرقمي يُباع بالوضوح والتسلسل؛ زيادة تربط الخطوة التالية المنطقية بعد الشراء.",
    experienceEn:
      "Digital goods sell on clarity and sequence; Ziadah surfaces the logical next step post-purchase.",
    bestPracticesAr: [
      "وضّح الترخيص ومدة الوصول في كل صفحة.",
      "قدّم تجربة مجانية جزئية لرفع التحويل للدورة الكاملة.",
    ],
    bestPracticesEn: [
      "State license and access duration on every page.",
      "Offer a partial preview to lift conversion to the full course.",
    ],
  },
  {
    slug: "electronics",
    icon: "📱",
    titleAr: "الإلكترونيات",
    titleEn: "Electronics",
    taglineAr: "أسهل تجربة لبيع الإلكترونيات",
    taglineEn: "The smoothest electronics shopping experience",
    seoDescAr: "ملحقات، ضمان، وترقية جهاز عبر زيادة في متاجر الإلكترونيات.",
    seoDescEn: "Accessories, warranties, and device upgrades with Ziadah.",
    howToApplyAr: [
      "اربط كل جهاز بملحقاته الرسمية في الكتالوج.",
      "فعّل الإضافات (Add-ons) في السلة وصفحة الدفع.",
    ],
    howToApplyEn: [
      "Link each device to its official accessories in the catalog.",
      "Turn on add-ons on cart and checkout.",
    ],
    howZiadahHelpsAr: [
      "يقترح حماية شاشة، غطاء، أو شاحن مناسب للموديل.",
      "يعرض بديلاً بمواصفات أعلى عند اهتمام المستخدم بالأداء.",
    ],
    howZiadahHelpsEn: [
      "Suggests cases, screen protectors, or chargers matched to the model.",
      "Shows a higher-spec alternative when browsing signals performance interest.",
    ],
    examplesAr: [
      "هاتف في السلة → سماعات أو ساعة من نفس المنظومة.",
      "لابتوب → حقيبة أو ترقية ذاكرة إن توفرت.",
    ],
    examplesEn: [
      "Phone in cart → earbuds or watch from the same ecosystem.",
      "Laptop → bag or RAM upgrade when available.",
    ],
    experienceAr:
      "عميل الإلكترونيات يقرر بالمواصفات والمطابقة؛ التوصيات تنجح عند التطابق الدقيق للموديل.",
    experienceEn:
      "Electronics buyers decide on specs and compatibility; wins come from exact model matching.",
    bestPracticesAr: [
      "حافظ على حقول SKU والموديل محدثة في المنصة.",
      "لا تفرط في عدد التوصيات في الدفع — اقتراح واحد مركز.",
    ],
    bestPracticesEn: [
      "Keep SKU/model fields up to date.",
      "Keep checkout suggestions minimal — one focused add-on.",
    ],
  },
  {
    slug: "jewelry",
    icon: "💎",
    titleAr: "المجوهرات",
    titleEn: "Jewelry",
    taglineAr: "مزايا متعددة تبرز تميّز مجوهراتك",
    taglineEn: "Multiple advantages that highlight your jewelry",
    seoDescAr: "تنسيق طقم، هدايا، وشراء إضافي لمتاجر الذهب والفضة والأحجار.",
    seoDescEn: "Sets, gifting, and AOV for gold, silver, and gemstone stores.",
    howToApplyAr: [
      "صنّف بالعيار، اللون، والمناسبة (زواج، يومي، هدية).",
      "استخدم صور عالية الدقة لأن التوصية البصرية تقود القرار.",
    ],
    howToApplyEn: [
      "Tag by karat, color, and occasion (wedding, daily, gift).",
      "Use high-res imagery; visual similarity drives decisions.",
    ],
    howZiadahHelpsAr: [
      "يقترح قطعة مكمّلة للطقم (سوار مع خاتم).",
      "يعرض هدايا في نطاق سعري محدد حسب سلة العميل.",
    ],
    howZiadahHelpsEn: [
      "Suggests pieces that complete a set (bracelet with ring).",
      "Shows gifts within a price band inferred from the cart.",
    ],
    examplesAr: [
      "سلسلة → أقراط بنفس الحجر أو الطابع.",
      "خاتم خطوبة → ساعة أو علبة هدايا فاخرة.",
    ],
    examplesEn: [
      "Necklace → earrings with the same stone or motif.",
      "Engagement ring → watch or premium gift box.",
    ],
    experienceAr:
      "المجوهرات قرار عاطفي وثقة؛ قلّل الضوضاء واختَر توصية واحدة أنيقة لكل سياق.",
    experienceEn:
      "Jewelry is emotional; reduce noise with one elegant suggestion per context.",
    bestPracticesAr: [
      "اذكر الأبعاد والوزن بوضوح لتقليل الإرجاع.",
      "وفّر خيار تغليف هدايا كإضافة خفيفة في السلة.",
    ],
    bestPracticesEn: [
      "State dimensions and weight clearly to limit returns.",
      "Offer gift wrap as a light cart add-on.",
    ],
  },
  {
    slug: "beauty-care",
    icon: "✨",
    titleAr: "العناية والتجميل",
    titleEn: "Beauty & Personal Care",
    taglineAr: "مع سلة تفهم عميلك الباحث عن الجمال",
    taglineEn: "With Salla, understand your beauty-seeking customer",
    seoDescAr: "روتين عناية، عطور، ومكياج — زيادة تربط المنتجات في رحلة جمال متكاملة.",
    seoDescEn: "Skincare routines, fragrance, makeup — connected beauty journeys.",
    howToApplyAr: [
      "جمّع المنتجات في «روتينات» حسب نوع البشرة أو الهدف.",
      "فعّل الشراء معاً على المنتجات ذات الاستخدام المتتابع.",
    ],
    howToApplyEn: [
      "Group SKUs into routines by skin type or goal.",
      "Enable bought-together for sequential use products.",
    ],
    howZiadahHelpsAr: [
      "يقترح خطوة الروتين التالية (منظّف → سيروم).",
      "يعزز عروض الكمية على المستهلكات السريعة.",
    ],
    howZiadahHelpsEn: [
      "Suggests the next routine step (cleanser → serum).",
      "Pushes quantity deals on fast-moving consumables.",
    ],
    examplesAr: [
      "كريم ليلي → واقي شمس صباحي من نفس الخط.",
      "عطر → لوشن جسم بنفس العائلة العطرية.",
    ],
    examplesEn: [
      "Night cream → AM sunscreen from the same line.",
      "Fragrance → body lotion from the same scent family.",
    ],
    experienceAr:
      "عميل الجمال يبحث عن تجانس العلامة؛ التوصيات القريبة من الخط ترفع الثقة.",
    experienceEn:
      "Beauty shoppers want brand coherence; same-line suggestions lift trust.",
    bestPracticesAr: [
      "اذكر قائمة المكوّنات للبشرة الحساسة.",
      "استخدم صور قبل/بعد المعتمدة من العلامة فقط.",
    ],
    bestPracticesEn: [
      "List ingredients for sensitive-skin transparency.",
      "Use brand-approved before/after assets only.",
    ],
  },
  {
    slug: "restaurants-cafes",
    icon: "🍽️",
    titleAr: "المطاعم والمقاهي",
    titleEn: "Restaurants & Cafés",
    taglineAr: "حلول مُخصَّصة لبيع المأكولات والمشروبات",
    taglineEn: "Tailored solutions for food & beverage sales",
    seoDescAr: "باقات وجبات، إضافات، ومشروبات مقترحة لمتاجر الطعام عبر التجارة الإلكترونية.",
    seoDescEn: "Meal bundles, sides, and drinks for F&B ecommerce.",
    howToApplyAr: [
      "حدّد أوقات الذروة ومنتجاتها في التصنيفات لسهولة التعلم.",
      "فعّل الحزم (Combo) للوجبات الكاملة.",
    ],
    howToApplyEn: [
      "Structure categories around peak items so ML learns patterns.",
      "Enable combos for full meals.",
    ],
    howZiadahHelpsAr: [
      "يقترح مقبلات أو مشروباً يكمل الطبق الرئيسي.",
      "يرفع قيمة الطلب بتجميع عائلي أو وجبة غداء مكتب.",
    ],
    howZiadahHelpsEn: [
      "Suggests sides or drinks that pair with the main dish.",
      "Raises tickets via family bundles or office lunch sets.",
    ],
    examplesAr: [
      "برجر → بطاطس ومشروب بسعر حزمة.",
      "قهوة مختصة → حلوى صغيرة من نفس المخبز.",
    ],
    examplesEn: [
      "Burger → fries and drink bundle.",
      "Specialty coffee → pastry from the same kitchen.",
    ],
    experienceAr:
      "الطعام قرار سريع وشهي؛ اعرض الإضافات بلغة واضحة وصور شهية.",
    experienceEn:
      "Food decisions are fast and sensory; pair add-ons with clear copy and appetite imagery.",
    bestPracticesAr: [
      "حدّث توفر المكونات لأن التوصية الخاطئة تُحبط العميل.",
      "اذكر السعرات أو المحتوى عند الحاجة للامتثال.",
    ],
    bestPracticesEn: [
      "Keep ingredient availability fresh to avoid disappointment.",
      "Disclose calories or allergens where required.",
    ],
  },
  {
    slug: "home-supplies",
    icon: "🏠",
    titleAr: "مستلزمات المنزل",
    titleEn: "Home Essentials",
    taglineAr: "تجربة مريحة لك ولعميلك",
    taglineEn: "A comfortable experience for you and your customer",
    seoDescAr: "تجميع غرف، إعادة شراء مستلزمات، وتوصيات عملية لمتجر المنزل.",
    seoDescEn: "Room bundles, refills, and practical recommendations.",
    howToApplyAr: [
      "صنّف حسب الغرفة والاستخدام (مطبخ، حمام، غسيل).",
      "فعّل «اشترِ أكثر ووفّر» على المستهلكات الثقيلة.",
    ],
    howToApplyEn: [
      "Tag by room and chore (kitchen, bath, laundry).",
      "Use buy-more-save-more on heavy consumables.",
    ],
    howZiadahHelpsAr: [
      "يقترح قطعة تكمل طقم المفروشات أو التخزين.",
      "يذكّر بشراء دوري للفلاتر والبطاريات.",
    ],
    howZiadahHelpsEn: [
      "Suggests pieces that complete a storage or linen set.",
      "Nudges periodic buys for filters and batteries when data supports it.",
    ],
    examplesAr: [
      "منظم خزانة → صناديق إضافية بنفس المقاس.",
      "مكنسة كهربائية → أكياس غبار متوافقة.",
    ],
    examplesEn: [
      "Closet organizer → extra bins in the same system.",
      "Vacuum → compatible dust bags.",
    ],
    experienceAr:
      "مستلزمات المنزل غالباً عملية؛ ساعد العميل على إنهاء القائمة دفعة واحدة.",
    experienceEn:
      "Home supplies are task-driven; help shoppers complete the checklist in one go.",
    bestPracticesAr: [
      "اذكر الأبعاد والتوافق في العنوان أو الوصف.",
      "قدّم شروط شحن واضحة للأصناف الثقيلة.",
    ],
    bestPracticesEn: [
      "Put dimensions and compatibility in titles or descriptions.",
      "State shipping rules clearly for bulky items.",
    ],
  },
  {
    slug: "service-design",
    icon: "🎨",
    titleAr: "تصميم الخدمات",
    titleEn: "Creative & Design Services",
    taglineAr: "تسليم فوري لمنتجاتك",
    taglineEn: "Instant delivery for your deliverables",
    seoDescAr: "باقات تصميم، مراجعات، ومنتجات رقمية مصاحبة لخدماتك الإبداعية.",
    seoDescEn: "Design packages, revisions, and digital upsells for creative services.",
    howToApplyAr: [
      "عرّف منتجات الخدمة كباقات ساعات أو مراحل تسليم واضحة.",
      "استخدم صفحة الشكر لبيع أصل قابل للتحميل أو قالب إضافي.",
    ],
    howToApplyEn: [
      "Sell services as hour packs or staged milestones.",
      "Use thank-you page for a downloadable asset or template upsell.",
    ],
    howZiadahHelpsAr: [
      "يقترح ترقية من شعار إلى هوية كاملة عند إشارات الاهتمام.",
      "يربط عميل الهوية بطباعة أو موك أب لاحق.",
    ],
    howZiadahHelpsEn: [
      "Suggests upgrading from logo to full identity when signals show.",
      "Links branding buyers to print or mockup services later.",
    ],
    examplesAr: [
      "شراء هوية بصرية → أيقونات سوشيال إضافية.",
      "تصميم موقع → صيانة شهرية أو استضافة.",
    ],
    examplesEn: [
      "Brand kit → extra social icons.",
      "Web design → monthly care or hosting.",
    ],
    experienceAr:
      "خدمات التصميم تُباع بالثقة والمراحل؛ التوصية بعد الدفع تبدو طبيعية.",
    experienceEn:
      "Design sells on trust and phases; post-payment upsells feel natural.",
    bestPracticesAr: [
      "حدّد عدد التعديلات في كل باقة بوضوح.",
      "استخدم ملفات معاينة مائية قبل التسليم النهائي.",
    ],
    bestPracticesEn: [
      "Spell out revision counts per package.",
      "Use watermarked previews before final delivery.",
    ],
  },
  {
    slug: "charities",
    icon: "🤲",
    titleAr: "الجمعيات الخيرية",
    titleEn: "Charities",
    taglineAr: "سهّل عمل الخير وأنت أهله",
    taglineEn: "Make giving easy — you set the tone",
    seoDescAr: "مشاريع تكميلية، تبرع متكرر، وزيادة مبلغ التبرع بذكاء وبموثوقية.",
    seoDescEn: "Complementary causes, recurring gifts, and ethical uplift prompts.",
    howToApplyAr: [
      "صف كل مشروع تبرع بنتيجة ملموسة (وجبة، كسوة، علاج).",
      "فعّل التبرع الشهري ووضّح أين يذهب المال.",
    ],
    howToApplyEn: [
      "Describe each fund with a tangible outcome (meal, clothing, care).",
      "Enable monthly giving with transparent allocation copy.",
    ],
    howZiadahHelpsAr: [
      "يقترح مبلغاً إضافياً مناسباً بعد أول تبرع.",
      "يربط المتبرع بمشروع ذي صلة باهتماماته السابقة.",
    ],
    howZiadahHelpsEn: [
      "Suggests a respectful top-up after a first donation.",
      "Connects donors to related projects based on past interest.",
    ],
    examplesAr: [
      "تبرع كسوة شتاء → مشروع غذائي في نفس المنطقة.",
      "كفالة طالب → تبرع إضافي لحقيبة مدرسية.",
    ],
    examplesEn: [
      "Winter clothing fund → food aid in the same region.",
      "Student sponsorship → small add-on for school supplies.",
    ],
    experienceAr:
      "الخير يحتاج احتراماً للخصوصية ولغة هادئة؛ تجنّب الضغط المبالغ فيه.",
    experienceEn:
      "Charity UX demands respect and calm copy; avoid aggressive pressure.",
    bestPracticesAr: [
      "اعرض تقارير أثر دورية لبناء الثقة.",
      "امتثل لأنظمة جمع التبرعات في منطقتك.",
    ],
    bestPracticesEn: [
      "Publish periodic impact reports.",
      "Comply with local fundraising regulations.",
    ],
  },
  {
    slug: "clinics",
    icon: "🩺",
    titleAr: "العيادات",
    titleEn: "Clinics",
    taglineAr: "حجز مواعيد تلقائي بدون إدخال يدوي",
    taglineEn: "Automatic booking without manual entry",
    seoDescAr: "تجارب ما بعد الزيارة، مستلزمات، وخدمات مكملة لعيادات التجميل والأسنان.",
    seoDescEn: "Post-visit care, supplies, and adjunct services for clinics selling online.",
    howToApplyAr: [
      "ربط المنتجات بخدمات العيادة (تبييض، متابعة، عناية منزلية).",
      "استخدم التوصيات بعد الحجز أو شراء حزمة العناية.",
    ],
    howToApplyEn: [
      "Link products to procedures (whitening, follow-up, home care).",
      "Trigger recommendations after booking or care-package purchase.",
    ],
    howZiadahHelpsAr: [
      "يقترح منتج عناية منزلية مناسب للإجراء الذي اختاره العميل.",
      "يعرض باقة متابعة أو فحص دوري بلغة واضحة.",
    ],
    howZiadahHelpsEn: [
      "Suggests home-care SKUs aligned with the chosen procedure.",
      "Offers follow-up bundles or recall visits with clear messaging.",
    ],
    examplesAr: [
      "حجز تنظيف أسنان → فرشاة أو خيط مائي موصى به.",
      "جلسة ليزر → كريم هدئان بعد الإجراء.",
    ],
    examplesEn: [
      "Cleaning appointment → recommended brush or water flosser.",
      "Laser session → post-care soothing cream.",
    ],
    experienceAr:
      "العيادة تبيع ثقة طبية؛ أي توصية يجب أن تبدو استشارية لا تسويقية عدوانياً.",
    experienceEn:
      "Clinics sell medical trust; suggestions should feel advisory, not pushy.",
    bestPracticesAr: [
      "راجع أي نص طبي مع الفريق المختص.",
      "التزم بخصوصية البيانات الصحية في المنصة.",
    ],
    bestPracticesEn: [
      "Have clinical staff review health-related copy.",
      "Respect health data privacy on your stack.",
    ],
  },
  {
    slug: "digital-cards",
    icon: "🎴",
    titleAr: "البطاقات الرقمية",
    titleEn: "Digital Cards & Vouchers",
    taglineAr: "حوّل شغفك إلى مصدر دخل",
    taglineEn: "Turn your passion into income",
    seoDescAr: "بطاقات شحن، اشتراكات، ومنتجات رقمية مصغّرة مع توصيات ذكية.",
    seoDescEn: "Top-ups, subs, and micro-digital goods with smart cross-sell.",
    howToApplyAr: [
      "صنّف البطاقات حسب المنصة والفئة السعرية.",
      "فعّل عروض شراء متعدد لنفس الفئة.",
    ],
    howToApplyEn: [
      "Tag cards by platform and price tier.",
      "Enable multi-buy offers within the same tier.",
    ],
    howZiadahHelpsAr: [
      "يقترح بطاقة بقيمة أعلى عند سلوك شراء متكرر.",
      "يربط بطاقة لعب بإضافة رقمية داخل اللعبة إن وُجدت.",
    ],
    howZiadahHelpsEn: [
      "Suggests a higher denomination for repeat buyers.",
      "Pairs a game card with an in-game digital add-on when relevant.",
    ],
    examplesAr: [
      "بطاقة 50 → اقتراح 100 عند عميل يشتري أسبوعياً.",
      "اشتراك موسيقى → سماعات من المتجر الشريك.",
    ],
    examplesEn: [
      "50 card → 100 suggestion for weekly buyers.",
      "Music sub → partner store headphones.",
    ],
    experienceAr:
      "البطاقات الرقمية عملية؛ سرعة الدفع والوضوح أهم من الإغراق بالخيارات.",
    experienceEn:
      "Digital cards are utilitarian; speed and clarity beat endless options.",
    bestPracticesAr: [
      "أظهر شروط الاسترداد بوضوح.",
      "راقب الاحتيال وحدود الشراء لكل عميل.",
    ],
    bestPracticesEn: [
      "Show refund rules clearly.",
      "Monitor fraud and per-customer purchase limits.",
    ],
  },
  {
    slug: "gold",
    icon: "🪙",
    titleAr: "الذهب",
    titleEn: "Gold & Bullion",
    taglineAr: "متجرك يبيع الذهب طول اليوم",
    taglineEn: "Your store sells gold around the clock",
    seoDescAr: "أسعار لحظية، ثقة، وتوصيات مكملة لمتاجر المجوهرات الذهبية.",
    seoDescEn: "Spot pricing, trust, and complementary sales for gold merchants.",
    howToApplyAr: [
      "زامن أوصاف الأوزان والعيار مع تحديثات الأسعار في المنصة.",
      "صنّف القطع حسب المناسبة والوزن.",
    ],
    howToApplyEn: [
      "Keep weight and karat copy aligned with platform price updates.",
      "Tag pieces by occasion and weight band.",
    ],
    howZiadahHelpsAr: [
      "يقترح قطعة تكمل الطقم أو سلسلة بنفس العيار.",
      "يعرض خيارات هدايا في نطاق سعري قريب من سلة العميل.",
    ],
    howZiadahHelpsEn: [
      "Suggests pieces that complete a set or match karat.",
      "Shows gift options near the cart’s price band.",
    ],
    examplesAr: [
      "سوار ذهب → طوق خفيف بنفس التصميم.",
      "سبيكة صغيرة → علبة حفظ أو شهادة مصداقية إضافية.",
    ],
    examplesEn: [
      "Gold bracelet → lightweight necklace in the same line.",
      "Small bar → storage capsule or extra assay info product.",
    ],
    experienceAr:
      "الذهب يُباع بالثقة والشفافية؛ أي توصية يجب أن تحترم السعر والعيار المعروضين.",
    experienceEn:
      "Gold sells on trust; suggestions must respect displayed price and karat.",
    bestPracticesAr: [
      "اذكر سياسة الاستبدال والعيار في كل صفحة.",
      "وفّر شهادات أو مختومات واضحة في الصور.",
    ],
    bestPracticesEn: [
      "State exchange policy and karat on every page.",
      "Show certifications or hallmarks clearly in imagery.",
    ],
  },
  {
    slug: "livestock",
    icon: "🐑",
    titleAr: "الذبائح",
    titleEn: "Qurbani & Livestock",
    taglineAr: "رتّب طلباتك بدون أي اتصالات مع عميلك",
    taglineEn: "Organize orders without calling each customer",
    seoDescAr: "حجوزات مواسم، إضافات تغليف، وتوصيات مكملة لمتاجر الأضاحي واللحوم.",
    seoDescEn: "Seasonal bookings, packaging add-ons for qurbani and meat merchants.",
    howToApplyAr: [
      "عرّف منتجات الموسم مبكراً مع فترات الحجز الواضحة.",
      "فعّل الإضافات مثل التقطيع، التغليف، أو التبرع بالجلد.",
    ],
    howToApplyEn: [
      "Launch seasonal SKUs early with clear booking windows.",
      "Enable add-ons: cutting style, packaging, or donation options.",
    ],
    howZiadahHelpsAr: [
      "يقترح خدمة تقطيع أو توصيل مناسبة لحجم الطلب.",
      "يرفع قيمة الطلب بمنتجات تكميلية (توابل، صلصات) إن رغبت.",
    ],
    howZiadahHelpsEn: [
      "Suggests cutting or delivery services suited to order size.",
      "Raises AOV with complementary pantry items if you sell them.",
    ],
    examplesAr: [
      "طلب ضأن كامل → تقطيع جاهز للطبخ العائلي.",
      "حجز موسمي → تبرع بجزء ثابت من الثمن.",
    ],
    examplesEn: [
      "Whole lamb → family-style butcher cut.",
      "Seasonal booking → fixed charity portion add-on.",
    ],
    experienceAr:
      "طلبات الأضاحي حساسة زمنياً؛ وضّح المواعيد والاستلام لتقليل الاتصالات.",
    experienceEn:
      "Qurbani is time-sensitive; clear pickup windows reduce support calls.",
    bestPracticesAr: [
      "أرسل تذكيراً تلقائياً عبر المنصة قبل يوم الاستلام.",
      "وثّق سياسة الإلغاء وفق الأنظمة المحلية.",
    ],
    bestPracticesEn: [
      "Use platform reminders before pickup day.",
      "Document cancellation rules per local regulation.",
    ],
  },
];

export function getSectorBySlug(slug: string): SectorContent | undefined {
  const base = sectors.find((s) => s.slug === slug);
  if (!base) return undefined;
  const ov = sectorLearningOverrides[slug];
  const merged: SectorContent = { ...base, ...(ov ?? {}) };
  const rich = sectorPageRichBySlug[slug];
  if (rich) {
    merged.taglineAr = rich.heroSubAr;
    merged.taglineEn = rich.heroSubEn;
    if (!ov?.seoDescAr) {
      merged.seoDescAr = rich.heroSubAr;
      merged.seoDescEn = rich.heroSubEn;
    }
  }
  return merged;
}

export function getSectorSeoTitle(sector: SectorContent, lang: "ar" | "en"): string {
  const name = lang === "ar" ? sector.titleAr : sector.titleEn;
  return lang === "ar" ? `${name} — زيادة وذكاء اصطناعي للمتجر` : `${name} — Ziadah AI for your store`;
}
