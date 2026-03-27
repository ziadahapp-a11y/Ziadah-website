/** قطاعات زيادة — محتوى عربي/إنجليزي لصفحات القطاعات */

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
};

export const sectors: SectorContent[] = [
  {
    slug: "delivery-apps",
    icon: "🛵",
    titleAr: "تطبيقات التوصيل",
    titleEn: "Delivery Apps",
    taglineAr: "زد قيمة الطلبات في لحظة اتخاذ القرار",
    taglineEn: "Lift basket value at the decision moment",
    seoDescAr:
      "كيف تستخدم زيادة في تطبيقات التوصيل: إضافات الوجبة، عروض الحد الأدنى، وتجارب طلب أسرع مع أمثلة عملية.",
    seoDescEn:
      "How Ziadah works for delivery apps: meal add-ons, threshold nudges, and faster ordering journeys with practical examples.",
    howToApplyAr: [
      "قسّم القائمة حسب المناسبات (فطور، غداء، عشاء) لتكون التوصيات أكثر دقة.",
      "فعّل الودجت في صفحة السلة وقبل الدفع لرفع قيمة السلة بسرعة.",
      "اربط كل طبق بإضافات واضحة مثل المشروب أو المقبلات أو الصوص.",
    ],
    howToApplyEn: [
      "Structure your menu by moments (breakfast, lunch, dinner) for cleaner recommendations.",
      "Enable widgets on cart and pre-checkout steps to quickly raise basket size.",
      "Map each main item to clear add-ons like drinks, sides, and sauces.",
    ],
    howZiadahHelpsAr: [
      "يقترح إضافات صغيرة ذات قبول عالٍ ترفع قيمة الطلب بدون تعقيد.",
      "يدفع العميل للوصول لحد الشحن المجاني بعرض منتجات مناسبة.",
      "يعرض بدائل أعلى قيمة عند توفر مؤشرات اهتمام واضحة.",
    ],
    howZiadahHelpsEn: [
      "Suggests high-acceptance micro add-ons that increase ticket size with low friction.",
      "Nudges customers toward free-delivery thresholds with relevant items.",
      "Surfaces higher-value alternatives when intent signals are strong.",
    ],
    examplesAr: [
      "طلب برجر في السلة → بطاطس + مشروب بعرض شراء معاً.",
      "سلة قريبة من الحد الأدنى للتوصيل المجاني → اقتراح حلى سريع.",
    ],
    examplesEn: [
      "Burger in cart → fries + drink via a buy-together offer.",
      "Cart close to free-delivery threshold → quick dessert recommendation.",
    ],
    experienceAr:
      "في تطبيقات التوصيل، السرعة تحكم القرار. التوصية الناجحة تكون قصيرة وواضحة وفي المكان المناسب قبل الدفع.",
    experienceEn:
      "Speed drives decisions in delivery apps. Winning recommendations are short, clear, and placed right before checkout.",
    bestPracticesAr: [
      "قلّل عدد الاقتراحات إلى 1-2 فقط في كل خطوة لتفادي التشتت.",
      "اعرض السعر النهائي للإضافة بوضوح قبل التأكيد.",
      "راجع أداء الاقتراحات حسب أوقات الذروة يومياً.",
    ],
    bestPracticesEn: [
      "Keep recommendations to 1-2 options per step to avoid overload.",
      "Show final add-on price clearly before confirmation.",
      "Review recommendation performance by peak hours daily.",
    ],
  },
  {
    slug: "ecommerce-platforms",
    icon: "🧩",
    titleAr: "منصات التسوق الإلكترونية",
    titleEn: "Ecommerce Platforms",
    taglineAr: "توصيات ذكية لتجربة اكتشاف أوسع داخل المنصة",
    taglineEn: "Smart recommendations for broader discovery journeys",
    seoDescAr:
      "زيادة لمنصات التسوق الإلكترونية: توصيات عبر البائعين، تحسين الاكتشاف، ورفع متوسط الطلبات في بيئات متعددة الموردين.",
    seoDescEn:
      "Ziadah for ecommerce platforms: cross-seller recommendations, stronger discovery, and higher AOV in multi-vendor environments.",
    howToApplyAr: [
      "وحّد تصنيفات المنتجات بين البائعين لتقليل التشابه الخاطئ في التوصيات.",
      "فعّل الودجت في صفحات البحث والتصنيف والسلة لزيادة فرص الاكتشاف.",
      "حدّد قواعد جودة للبائعين الجدد قبل إدخال منتجاتهم إلى محرك التوصية.",
    ],
    howToApplyEn: [
      "Standardize product taxonomy across sellers to reduce noisy recommendations.",
      "Enable widgets on search, category, and cart pages to expand discovery.",
      "Define quality rules for new sellers before feeding products to the recommendation engine.",
    ],
    howZiadahHelpsAr: [
      "يربط العميل بمنتجات مكملة حتى لو كانت من بائع آخر داخل المنصة.",
      "يرفع معدل الاستكشاف بتخصيص النتائج حسب السلوك الفعلي للمتصفح.",
      "يحسّن فرص التحويل عبر ترتيب عروض أعلى صلة في كل جلسة.",
    ],
    howZiadahHelpsEn: [
      "Connects shoppers with complementary products even across different sellers.",
      "Improves discovery rate by personalizing results from real browsing behavior.",
      "Boosts conversion odds by ranking higher-relevance offers per session.",
    ],
    examplesAr: [
      "عميل يشاهد سماعات من بائع A → اقتراح حامل جوال من بائع B.",
      "بحث عن مستلزمات المكتب → ترتيب حزمة منتجات متكاملة من عدة متاجر.",
    ],
    examplesEn: [
      "Customer views headphones from seller A → phone stand suggestion from seller B.",
      "Office-supplies search → curated multi-seller bundle recommendations.",
    ],
    experienceAr:
      "منصات التسوق تحتاج توازنًا بين تنوع الموردين وجودة الترتيب. زيادة تعطي الأولوية للصلة لضمان تجربة اكتشاف مفيدة.",
    experienceEn:
      "Marketplace platforms need a balance between seller diversity and ranking quality. Ziadah prioritizes relevance for meaningful discovery.",
    bestPracticesAr: [
      "راقب جودة بيانات البائعين لأن دقة التوصية تعتمد عليها مباشرة.",
      "فعّل حدود تكرار للمنتج نفسه حتى لا تتكرر النتائج للمستخدم.",
      "استخدم تقارير الأداء حسب البائع لتطوير الكتالوج بشكل مستمر.",
    ],
    bestPracticesEn: [
      "Audit seller data quality regularly; recommendation quality depends on it.",
      "Set repetition caps so users do not see the same item too often.",
      "Use seller-level performance reports to improve catalog health continuously.",
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
  return sectors.find((s) => s.slug === slug);
}

export function getSectorSeoTitle(sector: SectorContent, lang: "ar" | "en"): string {
  const name = lang === "ar" ? sector.titleAr : sector.titleEn;
  return lang === "ar" ? `${name} — زيادة وذكاء اصطناعي للمتجر` : `${name} — Ziadah AI for your store`;
}
