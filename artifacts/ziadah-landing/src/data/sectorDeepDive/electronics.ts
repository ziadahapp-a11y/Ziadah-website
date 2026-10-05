import type { SectorDeepDive } from "../sectorDeepDive";

/**
 * ELECTRONICS - the reference sector for the five-W use-case page.
 *
 * Fifteen moments, tagged so the page can prove its coverage rather than
 * claim it: all five goals and all five presentations are answered here, in
 * this sector's own products and at this sector's own prices.
 *
 * Every moment carries the five Ws as separate fields, because a merchant
 * reading fifteen cards is comparing them, and comparison needs the same five
 * answers in the same five places:
 *   who          which shopper, holding what, at what stage
 *   when         `trigger` - what has just happened
 *   what         `scenario` - what the shopper actually sees
 *   where        `placement` - the surface it renders on
 *   why          why it works HERE and not in general
 */
export const electronicsDeepDive: SectorDeepDive = {
  slug: "electronics",
  introAr:
    "الإلكترونيات قطاع هامشه رقيق على الجهاز وسمين على ما حوله: الجهاز يُقارن سعره في عشرة متاجر، والملحق لا يُقارن. ثم إن الجهاز بلا ملحقه ناقص فعلاً - هاتف بلا حماية يُكسر، وشاشة بلا كيبل مناسب لا تعمل بكامل دقتها. لذلك كل لحظة هنا تدور حول إكمال الجهاز لا حول بيع ثانٍ.",
  introEn:
    "Electronics runs thin margin on the device and fat margin on everything around it: the device's price is compared across ten stores, the accessory is not. And a device without its accessory is genuinely incomplete - an unprotected phone breaks, a monitor without the right cable never reaches its rated resolution. So every moment here is about completing the device rather than selling a second one.",
  useCases: [
    {
      key: "protect-it",
      titleAr: "الحماية مع الجهاز لا بعد كسره",
      titleEn: "Protection with the device, not after it breaks",
      whoAr: "مشترٍ أنفق للتو ثلاثة إلى خمسة آلاف على جهاز، وما زال في لحظة الحرص عليه.",
      whoEn: "A shopper who has just put three to five thousand on a device and is still in the moment of caring about it.",
      placement: "cart-page",
      goal: "more-products",
      presentation: "add-ons",
      triggerAr: "العميل أضاف هاتفاً أو جهازاً لوحياً للسلة.",
      triggerEn: "The customer adds a phone or tablet to the cart.",
      scenarioAr:
        "تُعرض الجراب وحامي الشاشة بالمقاس المطابق للموديل تحديداً، لا كفئة عامة. المقاس الخاطئ هو أكثر سبب إرجاع في الملحقات.",
      scenarioEn:
        "A case and screen protector appear in the exact fit for that model, not as a generic category. The wrong fit is the single biggest cause of accessory returns.",
      whyAr:
        "العميل سيشتري الحماية خلال أسبوعين على أي حال - إما منك أو من محل عند الإشارة. بيعها معه في نفس الطلب يلتقط ربحاً كان سيخرج من الباب.",
      whyEn:
        "The customer will buy protection within a fortnight anyway - from you or from a kiosk at the traffic lights. Selling it in the same order captures margin that was walking out.",
      exampleAr: "آيفون ١٥ برو ← جراب مطابق ١٢٠ + حامي شاشة ٨٥، بالمقاس لا بالفئة.",
      exampleEn: "iPhone 15 Pro → a model-matched case at 120 + a screen protector at 85, by fit and not by category.",
      widget: {
        titleAr: "احمِ جهازك",
        titleEn: "Protect your device",
        mainAr: "آيفون 15 برو",
        mainEn: "iPhone 15 Pro",
        mainPrice: "4999",
        hintAr: "بالمقاس لا بالفئة",
        hintEn: "By exact fit, not category",
        suggest: [
          { ar: "جراب مطابق للموديل", en: "A model-matched case", price: "120" },
          { ar: "حامي شاشة", en: "Screen protector", price: "85" },
        ],
        ctaAr: "أضف الحماية",
        ctaEn: "Add protection",
      },
    },
    {
      key: "make-it-work",
      titleAr: "ما يلزم ليعمل الجهاز أصلاً",
      titleEn: "What the device needs to work at all",
      whoAr: "مشترٍ لا يعرف أن العلبة ناقصة، ولن يعرف إلا بعد أن يفتحها في البيت.",
      whoEn: "A shopper who does not know the box is incomplete, and will not find out until they open it at home.",
      placement: "product-page",
      goal: "more-products",
      presentation: "add-ons",
      triggerAr: "العميل أضاف جهازاً يحتاج كيبلاً أو شاحناً لا يأتي معه.",
      triggerEn: "The customer adds a device that needs a cable or charger not in the box.",
      scenarioAr:
        "ينبّه الاقتراح على النقص صراحة: «لا يأتي معه شاحن» - ويعرض المتوافق. هذا إنقاذ لتجربة الفتح لا بيع إضافي.",
      scenarioEn:
        "The suggestion states the gap outright: \"No charger in the box\" - and offers the compatible one. This rescues the unboxing rather than adding a sale.",
      whyAr:
        "العميل الذي يفتح الصندوق ولا يجد ما يشغّل الجهاز يكتب تقييماً سيئاً عن المتجر لا عن المُصنّع. التنبيه يحمي التقييم قبل أن يرفع السلة.",
      whyEn:
        "A customer who opens the box and cannot power the device writes a bad review about the store, not the manufacturer. The warning protects the rating before it lifts the basket.",
      exampleAr: "هاتف بلا شاحن في العلبة ← «يحتاج شاحن ٢٠ واط» + كيبل مناسب.",
      exampleEn: "A phone with no charger included → \"Needs a 20W charger\" + the right cable.",
      widget: {
        titleAr: "لا يأتي معه شاحن",
        titleEn: "No charger in the box",
        mainAr: "هاتف - العلبة بلا شاحن",
        mainEn: "Phone - no charger included",
        mainPrice: "2899",
        hintAr: "ليعمل من أول يوم",
        hintEn: "So it works on day one",
        suggest: [
          { ar: "شاحن 20 واط", en: "20W charger", price: "95" },
          { ar: "كيبل متوافق", en: "Compatible cable", price: "45" },
        ],
        ctaAr: "أكمل الناقص",
        ctaEn: "Complete the box",
      },
    },
    {
      key: "spec-upgrade",
      titleAr: "ترقية السعة بفرق السعر",
      titleEn: "Storage upgrade by the price difference",
      whoAr: "مشترٍ يوازن بين سعرين ولا يملك ما يترجم فرق السعر إلى فرق في حياته.",
      whoEn: "A shopper weighing two prices with nothing that turns the gap into a difference in their own life.",
      placement: "product-page",
      goal: "product-swap",
      presentation: "related-products",
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
      widget: {
        titleAr: "اختر السعة",
        titleEn: "Choose your storage",
        mainAr: "128 جيجا",
        mainEn: "128GB",
        mainPrice: "4499",
        hintAr: "لا يمكن ترقيتها لاحقاً",
        hintEn: "It cannot be upgraded later",
        suggest: [
          { ar: "256 جيجا - ضعف المساحة", en: "256GB - double the space", price: "+400" },
        ],
        ctaAr: "خذ 256",
        ctaEn: "Take the 256",
      },
    },
    {
      key: "bundle-setup",
      titleAr: "التجهيز كاملاً بسعر حزمة",
      titleEn: "The whole setup at a bundle price",
      whoAr: "عميل يبني مكتباً أو ركن ألعاب، ويشتري أربع قطع خلال شهر بأي حال.",
      whoEn: "Someone building a desk or a gaming corner who will buy four pieces within the month regardless.",
      placement: "product-page",
      goal: "cart-value",
      presentation: "combo",
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
      widget: {
        titleAr: "التجهيز كامل",
        titleEn: "The full setup",
        mainAr: "شاشة 27 بوصة",
        mainEn: "27-inch monitor",
        mainPrice: "1450",
        hintAr: "بدل 2140 لو اشتريتها منفصلة",
        hintEn: "Instead of 2140 bought separately",
        suggest: [
          { ar: "لوحة مفاتيح + ماوس + حامل", en: "Keyboard + mouse + stand", price: "400" },
        ],
        ctaAr: "خذ التجهيز بـ1850",
        ctaEn: "Take the setup for 1850",
      },
    },
    {
      key: "warranty",
      titleAr: "الضمان الممتد عند القرار لا بعده",
      titleEn: "Extended warranty at the decision, not after it",
      whoAr: "مشترٍ لجهاز غالٍ وصل لصفحة الدفع، ملتزم بالشراء ويحسب المخاطرة لا السعر.",
      whoEn: "A high-value buyer who has reached checkout, committed to the purchase and now weighing risk rather than price.",
      placement: "checkout-page",
      goal: "more-products",
      presentation: "add-ons",
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
      exampleAr: "لابتوب ٦٬٥٠٠ ← «ضمان سنتين إضافيتين ٤٥٠، يشمل الكسر العرضي» - مرة واحدة.",
      exampleEn: "A 6,500 laptop → \"Two extra years at 450, accidental damage included\" - shown once.",
      widget: {
        titleAr: "ضمان ممتد",
        titleEn: "Extended warranty",
        mainAr: "لابتوب",
        mainEn: "Laptop",
        mainPrice: "6500",
        suggest: [
          { ar: "سنتان إضافيتان - يشمل الكسر العرضي", en: "Two more years - accidental damage included", price: "450" },
        ],
        ctaAr: "أضف الضمان",
        ctaEn: "Add the warranty",
      },
    },
    {
      key: "consumables",
      titleAr: "المستهلكات في موعد نفادها",
      titleEn: "Consumables when they run out",
      whoAr: "عميل سابق اشترى منك قبل أشهر، ونسي أن للجهاز قطعة تُستبدل.",
      whoEn: "A past customer who bought months ago and has forgotten the device has a part that needs replacing.",
      placement: "thank-you-page",
      goal: "more-products",
      presentation: "related-products",
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
      widget: {
        titleAr: "موعد تغيير الفلتر",
        titleEn: "Time to change the filter",
        mainAr: "فلتر ماء - اشتُري في يناير",
        mainEn: "Water filter - bought in January",
        mainPrice: "180",
        hintAr: "عمره 6 أشهر",
        hintEn: "Six-month life",
        suggest: [
          { ar: "فلتر بديل", en: "Replacement filter", price: "180" },
        ],
        ctaAr: "أعد الطلب",
        ctaEn: "Reorder",
      },
    },
    {
      key: "bought-with-same-device",
      titleAr: "ما اشتراه أصحاب نفس الجهاز فعلاً",
      titleEn: "What owners of the same device actually bought",
      whoAr: "مشترٍ أول مرة لفئة لا يعرفها، ولا يعرف ما الذي سيحتاجه بعد أسبوع.",
      whoEn: "A first-time buyer in a category they do not know, with no idea what they will need a week later.",
      placement: "product-page",
      goal: "more-products",
      presentation: "bought-together",
      triggerAr: "العميل يتصفّح جهازاً اشتراه مئات العملاء قبله.",
      triggerEn: "The customer is viewing a device hundreds of customers bought before them.",
      scenarioAr:
        "تُعرض أكثر ثلاث قطع اشتُريت مع هذا الموديل تحديداً، بنسبة صريحة: «٦٨٪ ممن اشتروا هذه الشاشة أخذوا معها ذراع التثبيت».",
      scenarioEn:
        "The three parts most often bought with this exact model appear with the share stated plainly: \"68% of people who bought this monitor took the arm mount with it\".",
      whyAr:
        "في الإلكترونيات لا يثق المشتري الجديد برأي المتجر، لكنه يثق بسلوك من سبقه. الرقم يُحوّل الاقتراح من بيع إلى معلومة.",
      whyEn:
        "In electronics a new buyer does not trust the store's opinion but does trust the behaviour of those before them. The number turns a pitch into information.",
      exampleAr: "شاشة ٢٧ بوصة ← «٦٨٪ أخذوا ذراع التثبيت، ٤١٪ أخذوا كيبل DisplayPort».",
      exampleEn: "A 27-inch monitor → \"68% took the arm mount, 41% took a DisplayPort cable\".",
      widget: {
        titleAr: "اشتروها مع بعض",
        titleEn: "Bought together",
        mainAr: "شاشة 27 بوصة",
        mainEn: "27-inch monitor",
        mainPrice: "1450",
        hintAr: "68% ممن اشتروا هذه الشاشة",
        hintEn: "68% of people who bought this monitor",
        suggest: [
          { ar: "ذراع تثبيت", en: "Arm mount", price: "260" },
          { ar: "كيبل DisplayPort", en: "DisplayPort cable", price: "70" },
        ],
        ctaAr: "أضف الاثنين",
        ctaEn: "Add both",
      },
    },
    {
      key: "cables-by-quantity",
      titleAr: "الكوابل بالكمية لا بالحبة",
      titleEn: "Cables by the pack, not by the piece",
      whoAr: "عميل يشتري كيبلاً واحداً وهو يملك ثلاثة أجهزة تحتاج نفس الكيبل.",
      whoEn: "A customer buying one cable while owning three devices that take the same cable.",
      placement: "product-page",
      goal: "quantity-offers",
      presentation: "buy-more-save-more",
      triggerAr: "العميل أضاف قطعة استهلاكية رخيصة تُفقد وتتكرر: كيبل، شاحن، بطارية.",
      triggerEn: "The customer adds a cheap, losable, repeat item: a cable, a charger, a battery.",
      scenarioAr:
        "يُعرض جدول تصاعدي صغير: واحد بـ٤٥، ثلاثة بـ١١٠، خمسة بـ١٦٥. لا ضغط ولا مؤقت - الجدول وحده يكفي لأن المنطق ظاهر.",
      scenarioEn:
        "A small progressive table appears: one for 45, three for 110, five for 165. No pressure and no timer - the table is enough because the logic is visible.",
      whyAr:
        "الكيبل يُفقد ويُقص ويُترك في المكتب. من يشتري واحداً يعود بعد شهرين، وغالباً لمتجر آخر. بيع ثلاثة الآن يشتري شهرين من عدم العودة.",
      whyEn:
        "A cable gets lost, frayed, left at the office. Whoever buys one comes back in two months, usually to another store. Selling three now buys two months of not coming back.",
      exampleAr: "كيبل USB-C ٤٥ ← «٣ بـ١١٠ (وفّر ٢٥)، ٥ بـ١٦٥ (وفّر ٦٠)».",
      exampleEn: "A USB-C cable at 45 → \"3 for 110 (save 25), 5 for 165 (save 60)\".",
      widget: {
        titleAr: "خذها بالكمية",
        titleEn: "Take the pack",
        mainAr: "كيبل USB-C",
        mainEn: "USB-C cable",
        mainPrice: "45",
        hintAr: "كلما زادت الكمية قلّ سعر الحبة",
        hintEn: "The more you take, the less each one costs",
        suggest: [
          { ar: "3 كوابل - وفّر 25", en: "3 cables - save 25", price: "110", was: "135" },
          { ar: "5 كوابل - وفّر 60", en: "5 cables - save 60", price: "165", was: "225" },
        ],
        ctaAr: "خذ 3",
        ctaEn: "Take 3",
      },
    },
    {
      key: "free-shipping-gap",
      titleAr: "إكمال عتبة الشحن بقطعة تنفع",
      titleEn: "Closing the shipping gap with something useful",
      whoAr: "عميل سلته أقل بقليل من عتبة الشحن المجاني ويرى رسوم الشحن تُحسب أمامه.",
      whoEn: "A customer sitting just under the free-shipping threshold, watching the delivery fee being added.",
      placement: "cart-page",
      goal: "cart-value",
      presentation: "related-products",
      triggerAr: "قيمة السلة تحت عتبة الشحن المجاني بأقل من ١٠٠ ر.س.",
      triggerEn: "The cart is under the free-shipping threshold by less than 100 SAR.",
      scenarioAr:
        "يُعرض الناقص بالضبط، ومعه قطعتان سعرهما يغطّيه ويستعملهما العميل فعلاً: «ناقص ٥٨ ر.س للشحن المجاني».",
      scenarioEn:
        "The exact gap appears alongside two items priced to cover it that the customer will genuinely use: \"58 SAR away from free delivery\".",
      whyAr:
        "العميل يدفع ٣٠ ر.س شحناً أو يضيف ٥٨ ر.س بضاعة. الثاني أفضل للطرفين، لكنه لا يحدث إلا إذا عرفه ورأى بماذا يكمله.",
      whyEn:
        "The customer pays 30 in delivery or adds 58 in goods. The second is better for both sides, but only happens if they know the gap and can see what closes it.",
      exampleAr: "سلة ١٤٢ وعتبة ٢٠٠ ← «ناقص ٥٨» + حامل جوال ٦٥ أو حافظة كوابل ٦٠.",
      exampleEn: "A 142 cart against a 200 threshold → \"58 to go\" + a phone stand at 65 or a cable case at 60.",
      widget: {
        titleAr: "ناقص 58 ر.س للشحن المجاني",
        titleEn: "58 SAR away from free delivery",
        mainAr: "سلتك الآن",
        mainEn: "Your cart now",
        mainPrice: "142",
        hintAr: "أضف أي واحدة واحذف رسوم الشحن",
        hintEn: "Add either one and the delivery fee goes",
        suggest: [
          { ar: "حامل جوال للمكتب", en: "Desk phone stand", price: "65" },
          { ar: "حافظة كوابل", en: "Cable case", price: "60" },
        ],
        ctaAr: "أكمل العتبة",
        ctaEn: "Close the gap",
      },
    },
    {
      key: "exit-coupon",
      titleAr: "الكوبون عند نية المغادرة لا قبلها",
      titleEn: "The coupon on the way out, not before",
      whoAr: "عميل قارن سعر الجهاز في متجر آخر وهمّ بالخروج ليشتريه هناك.",
      whoEn: "A customer who has price-checked the device elsewhere and is heading out to buy it there.",
      placement: "exit-intent",
      goal: "discount-code",
      presentation: "related-products",
      triggerAr: "مؤشرات مغادرة على سلة فيها جهاز مقارَن السعر.",
      triggerEn: "Exit signals on a cart holding a price-compared device.",
      scenarioAr:
        "يظهر كوبون محدود الوقت على هذه السلة تحديداً، بقيمة أقل من هامش الجهاز وأكبر من فرق السعر المعتاد في السوق.",
      scenarioEn:
        "A time-boxed coupon appears for this cart specifically, worth less than the device's margin and more than the usual price gap in the market.",
      whyAr:
        "في الإلكترونيات الفرق بين متجرين غالباً ٢٪ إلى ٤٪. كوبون ٥٪ يُنهي المقارنة، وهو أرخص بكثير من خسارة الطلب كاملاً بملحقاته.",
      whyEn:
        "In electronics the gap between two stores is usually 2% to 4%. A 5% coupon ends the comparison, and it is far cheaper than losing the whole order with its accessories.",
      exampleAr: "سلة ٥٬٢٠٠ عند المغادرة ← «خصم ٥٪ لمدة ١٥ دقيقة على هذه السلة».",
      exampleEn: "A 5,200 cart at exit → \"5% off for 15 minutes on this cart\".",
      widget: {
        titleAr: "قبل ما تطلع",
        titleEn: "Before you go",
        mainAr: "سلتك",
        mainEn: "Your cart",
        mainPrice: "5200",
        hintAr: "خصم 5% صالح 15 دقيقة",
        hintEn: "5% off, valid for 15 minutes",
        suggest: [
          { ar: "بعد الخصم", en: "After the discount", price: "4940", was: "5200" },
        ],
        ctaAr: "فعّل الخصم",
        ctaEn: "Apply the discount",
      },
    },
    {
      key: "tier-up-browse",
      titleAr: "البديل الأفضل وهو يقارن لا بعد ما قرر",
      titleEn: "The better alternative while comparing, not after deciding",
      whoAr: "متصفّح في صفحة فئة يفتح خمسة موديلات في تبويبات ولم يحسم بعد.",
      whoEn: "A browser on a category page with five models open in tabs and nothing decided.",
      placement: "category-page",
      goal: "product-swap",
      presentation: "related-products",
      triggerAr: "العميل يتصفّح فئة ويمرّ على موديل في الشريحة الدنيا.",
      triggerEn: "The customer is browsing a category and lands on a lower-tier model.",
      scenarioAr:
        "يُعرض الموديل الأعلى بسطر فرق واحد: ما الذي يزيده، وكم يكلّف أكثر. لا جدول مقارنة بعشرة صفوف - صف واحد هو ما يُقرأ.",
      scenarioEn:
        "The higher model appears with a single difference line: what it adds, and what it costs more. Not a ten-row comparison table - one row is what gets read.",
      whyAr:
        "في صفحة الفئة العميل ما زال يقارن، فالترقية مقبولة. بعد ما يدخل صفحة المنتج يكون قد اختار، والترقية تقرأ كمحاولة بيع.",
      whyEn:
        "On the category page the customer is still comparing, so an upgrade is welcome. Once inside the product page they have chosen, and an upgrade reads as a sales push.",
      exampleAr: "سماعة ٣٢٠ ← «بـ١٨٠ أكثر: عزل ضوضاء فعّال وبطارية ضعف المدة».",
      exampleEn: "A 320 headphone → \"For 180 more: active noise cancelling and double the battery\".",
      widget: {
        titleAr: "فرق واحد يستحق",
        titleEn: "One difference worth it",
        mainAr: "سماعة لاسلكية",
        mainEn: "Wireless headphones",
        mainPrice: "320",
        hintAr: "الموديل الأعلى في نفس الفئة",
        hintEn: "The higher model in the same category",
        suggest: [
          { ar: "عزل ضوضاء + بطارية مضاعفة", en: "Noise cancelling + double battery", price: "500" },
        ],
        ctaAr: "شوف الأعلى",
        ctaEn: "See the higher one",
      },
    },
    {
      key: "gaming-combo",
      titleAr: "ركن الألعاب كحزمة لا كقطع",
      titleEn: "The gaming corner as a bundle, not as parts",
      whoAr: "مشترٍ لمنصة ألعاب، أو أب يشتري هدية ولا يعرف ما الذي ينقص المنصة.",
      whoEn: "A console buyer, or a parent buying a gift with no idea what the console is missing.",
      placement: "category-page",
      goal: "cart-value",
      presentation: "combo",
      triggerAr: "العميل في فئة الألعاب أو أضاف منصة للسلة.",
      triggerEn: "The customer is in the gaming category or has added a console to the cart.",
      scenarioAr:
        "تُعرض حزمة جاهزة: يد ثانية + لعبة + اشتراك. مسمّاة بما تعنيه - «يلعبون اثنين من أول يوم» - لا بقائمة قطع.",
      scenarioEn:
        "A ready bundle appears: a second controller + a game + a subscription. Named for what it means - \"two can play on day one\" - not as a parts list.",
      whyAr:
        "المنصة بيد واحدة تجربة ناقصة يكتشفها المشتري في أول جلسة. الحزمة تبيع نتيجة مفهومة، وهي أسهل من إقناعه بثلاث قطع منفصلة.",
      whyEn:
        "A console with one controller is an incomplete experience the buyer discovers in the first session. The bundle sells an outcome, which is easier than arguing for three separate parts.",
      exampleAr: "منصة ألعاب ← «يلعبون اثنين من أول يوم: يد ثانية + لعبة + اشتراك ٣ أشهر، ٧٩٠ بدل ٩٣٠».",
      exampleEn: "A console → \"Two can play on day one: second controller + a game + 3-month subscription, 790 instead of 930\".",
      widget: {
        titleAr: "يلعبون اثنين من أول يوم",
        titleEn: "Two can play on day one",
        mainAr: "منصة ألعاب",
        mainEn: "Game console",
        mainPrice: "2199",
        hintAr: "بدل 930 لو اشتريتها منفصلة",
        hintEn: "Instead of 930 bought separately",
        suggest: [
          { ar: "يد ثانية + لعبة + اشتراك 3 أشهر", en: "Second controller + a game + 3-month subscription", price: "790", was: "930" },
        ],
        ctaAr: "خذ الحزمة",
        ctaEn: "Take the bundle",
      },
    },
    {
      key: "storage-bulk",
      titleAr: "بطاقات الذاكرة بالكمية لمن يصوّر",
      titleEn: "Memory cards by the pack for people who shoot",
      whoAr: "مصوّر أو صانع محتوى يشتري بطاقة واحدة اليوم ويحتاج ثلاثاً خلال الموسم.",
      whoEn: "A photographer or creator buying one card today who will need three before the season ends.",
      placement: "cart-page",
      goal: "quantity-offers",
      presentation: "buy-more-save-more",
      triggerAr: "العميل أضاف بطاقة ذاكرة أو قرصاً خارجياً للسلة.",
      triggerEn: "The customer adds a memory card or an external drive to the cart.",
      scenarioAr:
        "يُعرض سعر الحبة عند كل كمية مع السبب: «بطاقة احتياطية في الحقيبة» - لا مجرد خصم، بل عادة تشغيل معروفة في هذا المجال.",
      scenarioEn:
        "The per-unit price at each quantity appears with the reason: \"a spare in the bag\" - not just a discount, but a working habit everyone in this field knows.",
      whyAr:
        "من يصوّر يعرف أن البطاقة تمتلئ أو تتلف في أسوأ وقت. عرض الكمية هنا لا يُقنع بشراء زائد، بل يوافق عادة موجودة أصلاً.",
      whyEn:
        "Anyone who shoots knows a card fills up or fails at the worst moment. The quantity offer here is not persuading an extra purchase, it is agreeing with a habit that already exists.",
      exampleAr: "بطاقة ١٢٨ جيجا ١٤٠ ← «٢ بـ٢٥٠، ٣ بـ٣٤٥ (١١٥ للحبة)».",
      exampleEn: "A 128GB card at 140 → \"2 for 250, 3 for 345 (115 each)\".",
      widget: {
        titleAr: "بطاقة احتياطية في الحقيبة",
        titleEn: "A spare in the bag",
        mainAr: "بطاقة ذاكرة 128 جيجا",
        mainEn: "128GB memory card",
        mainPrice: "140",
        hintAr: "سعر الحبة ينزل مع الكمية",
        hintEn: "The per-card price drops with quantity",
        suggest: [
          { ar: "بطاقتان - 125 للحبة", en: "Two cards - 125 each", price: "250", was: "280" },
          { ar: "ثلاث - 115 للحبة", en: "Three - 115 each", price: "345", was: "420" },
        ],
        ctaAr: "خذ 3",
        ctaEn: "Take 3",
      },
    },
    {
      key: "search-complete",
      titleAr: "إكمال البحث الناقص",
      titleEn: "Completing the half-finished search",
      whoAr: "عميل يعرف اسم القطعة التي يريدها ويبحث عنها مباشرة - أعلى نية شرائية في المتجر.",
      whoEn: "A customer who knows the part's name and searches for it directly - the highest intent in the store.",
      placement: "search-page",
      goal: "more-products",
      presentation: "related-products",
      triggerAr: "العميل بحث عن قطعة لا تعمل وحدها.",
      triggerEn: "The customer searched for a part that does not work on its own.",
      scenarioAr:
        "تظهر مع النتائج القطعة المكمّلة التي يسأل عنها نصف المشترين بعد يومين: كرت شاشة ← مزوّد طاقة كافٍ، راوتر ← كيبل شبكة طويل.",
      scenarioEn:
        "Alongside the results sits the complementary part half the buyers ask about two days later: a graphics card → a sufficient power supply, a router → a long network cable.",
      whyAr:
        "الباحث عن اسم قطعة محدد قرر الشراء، لكنه غالباً لا يعرف المتطلّب المخفي. إظهاره في نتائج البحث يمنع طلباً مرتجعاً أو تذكرة دعم.",
      whyEn:
        "Someone searching an exact part name has decided to buy but usually does not know the hidden requirement. Showing it in the results prevents a return or a support ticket.",
      exampleAr: "بحث «كرت شاشة ٤٠٧٠» ← «يحتاج مزوّد طاقة ٧٥٠ واط على الأقل» مع المتوافق.",
      exampleEn: "A search for \"4070 graphics card\" → \"Needs at least a 750W power supply\" with the compatible one.",
      widget: {
        titleAr: "يحتاج مزوّد طاقة 750 واط",
        titleEn: "Needs a 750W power supply",
        mainAr: "كرت شاشة 4070",
        mainEn: "4070 graphics card",
        mainPrice: "2750",
        hintAr: "لن يعمل بمزوّد أصغر",
        hintEn: "It will not run on a smaller unit",
        suggest: [
          { ar: "مزوّد طاقة 750 واط", en: "750W power supply", price: "390" },
        ],
        ctaAr: "أضف المتوافق",
        ctaEn: "Add the compatible one",
      },
    },
    {
      key: "remove-rescue",
      titleAr: "إنقاذ السلة عند حذف القطعة الغالية",
      titleEn: "Rescuing the cart when the expensive line is removed",
      whoAr: "عميل تراجع عن أغلى قطعة في سلته - غالباً بسبب السعر لا بسبب الرغبة.",
      whoEn: "A customer who has backed out of the most expensive line in their cart, usually over price rather than desire.",
      placement: "smart-popup",
      goal: "discount-code",
      presentation: "bought-together",
      triggerAr: "العميل حذف أغلى منتج من السلة ولم يغادر.",
      triggerEn: "The customer removes the priciest product from the cart but has not left.",
      scenarioAr:
        "يُعرض بديلان لا خصم مباشر: نفس القطعة بشريحة أدنى، أو نفس القطعة مجدّدة بضمان. والخصم آخر خيار لا أوله.",
      scenarioEn:
        "Two alternatives appear rather than a straight discount: the same part a tier down, or the same part refurbished with warranty. The discount is the last option, not the first.",
      whyAr:
        "حذف القطعة الغالية إشارة ميزانية لا إشارة رفض. من يُعرض عليه خصم فوراً يتعلّم أن ينتظر الخصم؛ ومن يُعرض عليه بديل يشتري اليوم.",
      whyEn:
        "Removing the expensive line is a budget signal, not a rejection. Offer a discount immediately and the customer learns to wait for one; offer an alternative and they buy today.",
      exampleAr: "حذف لابتوب ٦٬٥٠٠ ← «نفس الموديل بذاكرة أقل ٥٬٢٠٠» أو «مجدّد بضمان سنة ٤٬٧٠٠».",
      exampleEn: "A 6,500 laptop removed → \"The same model with less memory at 5,200\" or \"Refurbished with a year's warranty at 4,700\".",
      widget: {
        titleAr: "في بدائل قبل ما تلغي",
        titleEn: "There are alternatives before you cancel",
        mainAr: "لابتوب - حُذف من السلة",
        mainEn: "Laptop - removed from cart",
        mainPrice: "6500",
        hintAr: "نفس الموديل بميزانية أقل",
        hintEn: "The same model on a smaller budget",
        suggest: [
          { ar: "ذاكرة أقل", en: "Less memory", price: "5200", was: "6500" },
          { ar: "مجدّد بضمان سنة", en: "Refurbished, one-year warranty", price: "4700", was: "6500" },
        ],
        ctaAr: "شوف البدائل",
        ctaEn: "See the alternatives",
      },
    },
  ],
};
