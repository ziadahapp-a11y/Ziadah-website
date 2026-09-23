import type { SectorDeepDive } from "../sectorDeepDive";

export const electronicsDeepDive: SectorDeepDive = {
  slug: "electronics",
  introAr:
    "الإلكترونيات قطاع هامشه رقيق على الجهاز وسمين على ما حوله: الجهاز يُقارن سعره في عشرة متاجر، والملحق لا يُقارن. ثم إن الجهاز بلا ملحقه ناقص فعلاً — هاتف بلا حماية يُكسر، وشاشة بلا كيبل مناسب لا تعمل بكامل دقتها. لذلك كل لحظة هنا تدور حول إكمال الجهاز لا حول بيع ثانٍ.",
  introEn:
    "Electronics runs thin margin on the device and fat margin on everything around it: the device's price is compared across ten stores, the accessory is not. And a device without its accessory is genuinely incomplete - an unprotected phone breaks, a monitor without the right cable never reaches its rated resolution. So every moment here is about completing the device rather than selling a second one.",
  useCases: [
    {
      key: "protect-it",
      titleAr: "الحماية مع الجهاز لا بعد كسره",
      titleEn: "Protection with the device, not after it breaks",
      triggerAr: "العميل أضاف هاتفاً أو جهازاً لوحياً للسلة.",
      triggerEn: "The customer adds a phone or tablet to the cart.",
      scenarioAr:
        "تُعرض الجراب وحامي الشاشة بالمقاس المطابق للموديل تحديداً، لا كفئة عامة. المقاس الخاطئ هو أكثر سبب إرجاع في الملحقات.",
      scenarioEn:
        "A case and screen protector appear in the exact fit for that model, not as a generic category. The wrong fit is the single biggest cause of accessory returns.",
      whyAr:
        "العميل سيشتري الحماية خلال أسبوعين على أي حال — إما منك أو من محل عند الإشارة. بيعها معه في نفس الطلب يلتقط ربحاً كان سيخرج من الباب.",
      whyEn:
        "The customer will buy protection within a fortnight anyway - from you or from a kiosk at the traffic lights. Selling it in the same order captures margin that was walking out.",
      exampleAr: "آيفون ١٥ برو ← جراب مطابق ١٢٠ + حامي شاشة ٨٥، بالمقاس لا بالفئة.",
      exampleEn: "iPhone 15 Pro → a model-matched case at 120 + a screen protector at 85, by fit and not by category.",
    },
    {
      key: "make-it-work",
      titleAr: "ما يلزم ليعمل الجهاز أصلاً",
      titleEn: "What the device needs to work at all",
      triggerAr: "العميل أضاف جهازاً يحتاج كيبلاً أو شاحناً لا يأتي معه.",
      triggerEn: "The customer adds a device that needs a cable or charger not in the box.",
      scenarioAr:
        "ينبّه الاقتراح على النقص صراحة: «لا يأتي معه شاحن» — ويعرض المتوافق. هذا إنقاذ لتجربة الفتح لا بيع إضافي.",
      scenarioEn:
        "The suggestion states the gap outright: \"No charger in the box\" - and offers the compatible one. This rescues the unboxing rather than adding a sale.",
      whyAr:
        "العميل الذي يفتح الصندوق ولا يجد ما يشغّل الجهاز يكتب تقييماً سيئاً عن المتجر لا عن المُصنّع. التنبيه يحمي التقييم قبل أن يرفع السلة.",
      whyEn:
        "A customer who opens the box and cannot power the device writes a bad review about the store, not the manufacturer. The warning protects the rating before it lifts the basket.",
      exampleAr: "هاتف بلا شاحن في العلبة ← «يحتاج شاحن ٢٠ واط» + كيبل مناسب.",
      exampleEn: "A phone with no charger included → \"Needs a 20W charger\" + the right cable.",
    },
    {
      key: "spec-upgrade",
      titleAr: "ترقية السعة بفرق السعر",
      titleEn: "Storage upgrade by the price difference",
      triggerAr: "العميل يتصفّح أدنى سعة من موديل.",
      triggerEn: "The customer is viewing the lowest storage tier of a model.",
      scenarioAr:
        "يُعرض الفرق للسعة الأعلى مع ما يعنيه عملياً: «+٤٠٠ ر.س = ضعف المساحة، حوالي ٢٠٬٠٠٠ صورة إضافية».",
      scenarioEn:
        "The difference to the higher tier appears with what it means in practice: \"+400 SAR = double the space, roughly 20,000 more photos\".",
      whyAr:
        "السعة قرار لا رجعة فيه: لا يمكن ترقيتها لاحقاً. العميل الذي لا يُنبّه الآن يشتري جهازاً كاملاً بعد سنتين بسبب مساحة.",
      whyEn:
        "Storage is the one irreversible decision: it cannot be upgraded later. A customer not warned now buys a whole new device in two years over space.",
      exampleAr: "١٢٨ جيجا ← «٢٥٦ بـ٤٠٠ أكثر، ضعف المساحة ولا يمكن ترقيتها لاحقاً».",
      exampleEn: "128GB → \"256 for 400 more, double the space, and it cannot be upgraded later\".",
    },
    {
      key: "bundle-setup",
      titleAr: "التجهيز كاملاً بسعر حزمة",
      titleEn: "The whole setup at a bundle price",
      triggerAr: "العميل يشتري قطعة من تجهيز معروف.",
      triggerEn: "The customer buys one piece of a known setup.",
      scenarioAr:
        "تُعرض بقية التجهيز كحزمة: شاشة + لوحة مفاتيح + ماوس + حامل. العميل الذي يبني مكتباً يشتريها كلها، فالسؤال أين يشتريها لا هل.",
      scenarioEn:
        "The rest of the setup is offered as a bundle: monitor + keyboard + mouse + stand. Someone building a desk buys all of it, so the question is where rather than whether.",
      whyAr:
        "تجميع التجهيز في حزمة يمنع العميل من تفريق طلبه على ثلاثة متاجر، وهو ما يفعله افتراضياً حين لا يجد الحزمة.",
      whyEn:
        "Bundling the setup stops the customer splitting the order across three stores, which is the default when no bundle exists.",
      exampleAr: "شاشة ٢٧ بوصة ← «التجهيز كامل ١٨٥٠ بدل ٢١٤٠» مع الحامل والكيبل.",
      exampleEn: "A 27-inch monitor → \"The full setup at 1850 instead of 2140\", stand and cable included.",
    },
    {
      key: "warranty",
      titleAr: "الضمان الممتد عند القرار لا بعده",
      titleEn: "Extended warranty at the decision, not after it",
      triggerAr: "العميل في صفحة الدفع لجهاز مرتفع السعر.",
      triggerEn: "The customer is at checkout for a high-value device.",
      scenarioAr:
        "يُعرض الضمان الممتد بسعره وبما يغطيه في سطر واحد. يُعرض مرة واحدة ولا يُكرر، لأن تكراره يقرأ كخوف من جودة المنتج.",
      scenarioEn:
        "Extended warranty appears with its price and what it covers in one line. It shows once and never repeats - repeating it reads as fear about the product's quality.",
      whyAr:
        "الضمان أعلى هامش في الطلب كله وأقل تكلفة تشغيل. لكنه أيضاً أسرع شيء يفسد الثقة إن أُلحّ عليه.",
      whyEn:
        "Warranty is the highest-margin line in the order and the lowest operational cost. It is also the fastest way to damage trust if pushed.",
      exampleAr: "لابتوب ٦٬٥٠٠ ← «ضمان سنتين إضافيتين ٤٥٠، يشمل الكسر العرضي» — مرة واحدة.",
      exampleEn: "A 6,500 laptop → \"Two extra years at 450, accidental damage included\" - shown once.",
    },
    {
      key: "consumables",
      titleAr: "المستهلكات في موعد نفادها",
      titleEn: "Consumables when they run out",
      triggerAr: "مضى على شراء جهاز له مستهلك معروف العمر.",
      triggerEn: "Time has passed on a device with a consumable of known life.",
      scenarioAr:
        "تذكير بإعادة شراء المستهلك قبل نفاده: فلتر، حبر، رأس فرشاة. العميل لا يتذكر موعد الفلتر لكن المتجر يعرفه.",
      scenarioEn:
        "A reminder to reorder the consumable before it runs out: a filter, ink, a brush head. The customer does not remember the filter schedule; the store does.",
      whyAr:
        "المستهلكات إيراد متكرر مضمون يتسرّب كاملاً للمتاجر الكبرى لمجرد أنها تذكّر والمتجر الصغير لا يذكّر.",
      whyEn:
        "Consumables are guaranteed recurring revenue that leaks entirely to the big marketplaces for one reason: they remind and the smaller store does not.",
      exampleAr: "فلتر ماء اشتُري في يناير بعمر ٦ أشهر ← تذكير في يونيو.",
      exampleEn: "A water filter bought in January with a six-month life → a reminder in June.",
    },
  ],
};
