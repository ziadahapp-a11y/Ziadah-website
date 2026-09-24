import type { SectorDeepDive } from "../sectorDeepDive";

/**
 * MATERIAL: `ZIADAH_CHANNELS_FNB_SPEC.md` sections 8-9 and the interactive
 * prototype. Prices and bundle shapes below are the spec's own fixtures
 * (section 13.3), so a number on this page and a number in a test are the
 * same number.
 */
export const restaurantsCafesDeepDive: SectorDeepDive = {
  introAr:
    "المطعم ليس متجراً إلكترونياً بواجهة مختلفة. الطلب هنا يُبنى في ثوانٍ، أمام طابور أو على طاولة، والقرار شهية لا مقارنة أسعار. لذلك لا تعمل زيادة في مكان واحد بل في كل مكان يُبنى فيه الطلب: على الطاولة، وعلى الكيوسك، وفي يد النادل، وبعد الدفع على الكاشير، وفي تطبيقك ومتجرك. كل لحظة أدناه مأخوذة من طلب حقيقي، والأسعار من قائمة تشغيل فعلية.",
  introEn:
    "A restaurant is not an online store with a different skin. The order is built in seconds, in front of a queue or at a table, and the decision is appetite rather than price comparison. So Ziadah does not sit in one place - it sits everywhere the order is built: the table, the kiosk, the waiter's hand, the cashier after payment, your app and your store. Every moment below comes from a real order, and the prices come from a live menu.",

  channels: [
    {
      code: "qr",
      nameAr: "QR الطاولة",
      nameEn: "Table QR",
      descAr: "الضيف يمسح الكود من جواله ويطلب بنفسه. لا تطبيق يُحمّل ولا طابور.",
      descEn: "The guest scans from their own phone and orders themselves. No app to install, no queue.",
    },
    {
      code: "kiosk",
      nameAr: "الكيوسك",
      nameEn: "Kiosk",
      descAr: "شاشة الطلب الذاتي في الفرع. شاشة واحدة، ولمسة واحدة تفصل بين الصنف والوجبة.",
      descEn: "The self-order screen in the branch. One screen, and one tap between an item and a meal.",
    },
    {
      code: "waiter",
      nameAr: "النادل",
      nameEn: "Waiter",
      descAr: "تطبيق على جوال النادل يعطيه الجملة التي يقولها، ويسجّل ما حصل بعدها.",
      descEn: "An app in the waiter's hand that gives them the sentence to say, and records what happened next.",
    },
    {
      code: "pos",
      nameAr: "الكاشير",
      nameEn: "Cashier (POS)",
      descAr: "بعد الدفع مباشرة، ورسالة الشفت اليومية للفرع. لا يغيّر شاشة الكاشير ولا يبطئ الطابور.",
      descEn: "Right after payment, plus the branch's daily shift script. It never touches the cashier screen or slows the queue.",
    },
    {
      code: "store",
      nameAr: "المتجر الإلكتروني",
      nameEn: "Online store",
      descAr: "طلبات التوصيل والاستلام من متجرك على سلة أو زد.",
      descEn: "Delivery and pickup orders from your Salla or Zid store.",
    },
    {
      code: "mobile_app",
      nameAr: "تطبيق الجوال",
      nameEn: "Mobile app",
      descAr: "تطبيقك الخاص، عبر واجهة زيادة، بنفس المنطق وبتصميمك أنت.",
      descEn: "Your own app, through the Ziadah API, on the same logic and in your own design.",
    },
  ],

  useCases: [
    {
      key: "size-upgrade",
      channel: "kiosk",
      titleAr: "ترقية الحجم بالفرق لا بالسعر",
      titleEn: "Upgrade the size by the difference, not the price",
      triggerAr: "الضيف اختار لاتيه وسط وفتح ورقة الصنف.",
      triggerEn: "The guest picks a medium latte and opens the item sheet.",
      scenarioAr:
        "يظهر خيار الحجم الأكبر ومعه الفرق وحده: «كبير +٣ ر.س»، لا «كبير ٢٢ ر.س». الفرق رقم صغير يُقارن بالكوب، أما السعر الكامل فيُقارن بالميزانية.",
      scenarioEn:
        "The larger size appears with the difference alone: \"Large +3 SAR\", never \"Large 22 SAR\". A difference is a small number compared against the cup; a full price is compared against the budget.",
      whyAr:
        "هامش الترقية في المشروبات من أعلى الهوامش في المقهى، لأن التكلفة الإضافية حليب وكوب لا أكثر. وهي أسهل موافقة في القائمة كلها: لا تضيف صنفاً ولا تطيل الانتظار.",
      whyEn:
        "Size upgrades carry some of the highest margin in a cafe, because the added cost is milk and a cup. It is also the easiest yes on the menu: it adds no item and no waiting time.",
      exampleAr: "لاتيه وسط ١٩ ر.س ← كبير بفرق ٣ ر.س. نفس الكوب، نفس الانتظار.",
      exampleEn: "Medium latte 19 SAR → large for 3 SAR more. Same cup, same wait.",
          widget: {
        titleAr: "اختر حجمك",
        titleEn: "Choose your size",
        mainAr: "لاتيه وسط",
        mainEn: "Medium latte",
        mainPrice: "19",
        hintAr: "ترقية بفرق بسيط",
        hintEn: "A small step up",
        suggest: [
          { ar: "لاتيه كبير", en: "Large latte", price: "+3" },
        ],
        ctaAr: "أضف الكبير",
        ctaEn: "Add the large",
      },
    },
    {
      key: "modifiers",
      channel: "qr",
      titleAr: "الإضافات الثلاث الأكثر طلباً في هذا الفرع",
      titleEn: "The top three add-ons in this branch",
      triggerAr: "الضيف فتح صنفاً له إضافات مدفوعة.",
      triggerEn: "The guest opens an item that has paid modifiers.",
      scenarioAr:
        "بدل قائمة إضافات بعشرين خياراً، ثلاث شرائح فقط: الأكثر طلباً مع هذا الصنف في هذا الفرع تحديداً. اختيار من ثلاثة قرار، واختيار من عشرين عبء.",
      scenarioEn:
        "Instead of a twenty-option modifier list, three chips only: the most-ordered with this item in this branch specifically. Choosing from three is a decision; choosing from twenty is a burden.",
      whyAr:
        "الإضافات هامشها شبه كامل. والترتيب بالفرع لا بالسلسلة يهم: فرع الجامعة يطلب شوت إضافي، وفرع العوائل يطلب كريمة.",
      whyEn:
        "Modifiers are almost pure margin. Ranking by branch rather than by chain matters: the campus branch orders an extra shot, the family branch orders cream.",
      exampleAr: "لاتيه ← شوت إضافي +٤ ر.س، حليب لوز، بندق. ثلاث شرائح، لمسة واحدة.",
      exampleEn: "Latte → extra shot +4 SAR, almond milk, hazelnut. Three chips, one tap.",
          widget: {
        titleAr: "أضف لمستك",
        titleEn: "Make it yours",
        mainAr: "لاتيه كبير",
        mainEn: "Large latte",
        mainPrice: "22",
        hintAr: "الأكثر طلباً في هذا الفرع",
        hintEn: "Most ordered in this branch",
        suggest: [
          { ar: "شوت إضافي", en: "Extra shot", price: "+4" },
          { ar: "حليب لوز", en: "Almond milk", price: "+3" },
          { ar: "بندق", en: "Hazelnut", price: "+3" },
        ],
        ctaAr: "أضف المختار",
        ctaEn: "Add selected",
      },
    },
    {
      key: "meal-combo",
      channel: "kiosk",
      titleAr: "حوّل الصنف إلى وجبة بلمسة",
      titleEn: "Turn the item into a meal in one tap",
      triggerAr: "الضيف أضاف برجر بلا جانبية ولا مشروب.",
      triggerEn: "The guest adds a burger with no side and no drink.",
      scenarioAr:
        "مفتاح واحد: «اجعلها وجبة +٩ ر.س». يُرسل للكاشير كوجبة مركّبة لا كثلاثة أصناف منفصلة، فالمطبخ يقرأها صحيحة والفاتورة تطلع صحيحة.",
      scenarioEn:
        "A single toggle: \"Make it a meal +9 SAR\". It reaches the POS as one combo rather than three loose items, so the kitchen reads it right and the bill prints right.",
      whyAr:
        "الضيف الذي يطلب برجر وحده غالباً سيشتري مشروباً على أي حال. الوجبة تلتقط ذلك الشراء قبل أن يخرج من الباب بدلاً من أن يضيع.",
      whyEn:
        "A guest ordering a lone burger will usually buy a drink anyway. The meal captures that purchase before they leave rather than losing it.",
      exampleAr: "برجر ٣٢ ر.س ← وجبة بـ٤١ ر.س (بطاطس ومشروب مقابل ٩).",
      exampleEn: "Burger 32 SAR → meal at 41 SAR (fries and a drink for 9).",
          widget: {
        titleAr: "اجعلها وجبة",
        titleEn: "Make it a meal",
        mainAr: "برجر كلاسيك",
        mainEn: "Classic burger",
        mainPrice: "32",
        suggest: [
          { ar: "وجبة: بطاطس ومشروب", en: "Meal: fries and a drink", price: "+9" },
        ],
        ctaAr: "أضف الوجبة",
        ctaEn: "Add the meal",
      },
    },
    {
      key: "complement",
      channel: "qr",
      titleAr: "يُطلب معه في هذا الفرع وهذا الوقت",
      titleEn: "Ordered with it, here and now",
      triggerAr: "الضيف فتح سلته قبل الإرسال.",
      triggerEn: "The guest opens their cart before submitting.",
      scenarioAr:
        "بطاقة واحدة بصنف واحد: ما يُطلب فعلاً مع ما في السلة، في هذا الفرع وفي هذه الفترة من اليوم. إن كان في الطلب مشروب أصلاً فلا يُقترح مشروب ثانٍ.",
      scenarioEn:
        "One card with one item: what is actually ordered alongside what is in the cart, in this branch and this daypart. If there is already a drink in the order, no second drink is suggested.",
      whyAr:
        "«يُطلب معه» في الصباح غيره في المساء. الكرواسون يرافق القهوة الساعة الثامنة، والكيك يرافقها الساعة التاسعة مساءً، ونفس الاقتراح في الوقت الخطأ يُرفض.",
      whyEn:
        "What goes with what in the morning is not what goes with it at night. A croissant rides with coffee at eight; cake rides with it at nine in the evening. The same suggestion at the wrong hour gets declined.",
      exampleAr: "شاورما عادي ١٨ ر.س ← «يُطلب معه» كنافة ميني ١٥ ر.س.",
      exampleEn: "Regular shawarma 18 SAR → \"ordered with it\": mini kunafa 15 SAR.",
          widget: {
        titleAr: "يُطلب معه",
        titleEn: "Ordered with it",
        mainAr: "شاورما عادي",
        mainEn: "Regular shawarma",
        mainPrice: "18",
        suggest: [
          { ar: "حلى كنافة mini", en: "Mini kunafa", price: "15" },
        ],
        ctaAr: "أضف الكنافة",
        ctaEn: "Add the kunafa",
      },
    },
    {
      key: "bundle-complete",
      channel: "qr",
      titleAr: "أكمل العرض: ناقص صنف واحد",
      titleEn: "Complete the offer: one item short",
      triggerAr: "السلة فيها اثنان من ثلاثة أصناف في حزمة معرّفة.",
      triggerEn: "The cart holds two of the three items in a defined bundle.",
      scenarioAr:
        "لا يُعرض العرض من البداية بل عند اقترابه: «ناقصك عصير برتقال ويصير فطور بـ٨ ر.س أقل». الاقتراح يسمّي الصنف الناقص بالضبط، فالضيف لا يبحث.",
      scenarioEn:
        "The offer is not advertised up front but at the edge of it: \"One orange juice away from the breakfast bundle, 8 SAR off\". It names the missing item exactly, so the guest does not go hunting.",
      whyAr:
        "العرض المعروض مسبقاً خصم على شيء كان سيُشترى. العرض المعروض عند نقص صنف واحد يضيف ذلك الصنف. الفرق بينهما هو الفرق بين تكلفة وربح.",
      whyEn:
        "An offer shown up front is a discount on something already being bought. An offer shown one item short adds that item. The difference between the two is the difference between a cost and a margin.",
      exampleAr: "قهوة ساخنة + كرواسون زبدة في السلة ← «أضف عصير برتقال ١٤ ووفّر ٨».",
      exampleEn: "Hot coffee + butter croissant in the cart → \"Add an orange juice at 14 and save 8\".",
          widget: {
        titleAr: "أكمل العرض",
        titleEn: "Complete the offer",
        mainAr: "قهوة ساخنة + كرواسون زبدة",
        mainEn: "Hot coffee + butter croissant",
        mainPrice: "31",
        hintAr: "ناقصك صنف واحد",
        hintEn: "One item short",
        suggest: [
          { ar: "عصير برتقال — يكمل فطور الصباح", en: "Orange juice - completes the breakfast", price: "14" },
        ],
        ctaAr: "أكمل الفطور ووفّر 8",
        ctaEn: "Complete it and save 8",
      },
    },
    {
      key: "any-n",
      channel: "store",
      titleAr: "أي ثلاثة من المخبوزات بسعر واحد",
      titleEn: "Any three pastries, one price",
      triggerAr: "الضيف أضاف صنفين من المخبوزات.",
      triggerEn: "The guest adds two pastries.",
      scenarioAr:
        "«أي ٣ مخبوزات بـ٣٠ ر.س» — بلا تحديد أيها. الضيف يختار الثالث بنفسه، فيشعر أنه اختار لا أنه بيع عليه.",
      scenarioEn:
        "\"Any 3 pastries for 30 SAR\" - without naming which. The guest picks the third themselves, so it reads as a choice rather than a sell.",
      whyAr:
        "حزمة «أي ن» تصرّف المخزون بطيء الحركة دون خصمه صراحة، وتحافظ على سعر القائمة لمن يشتري صنفاً واحداً.",
      whyEn:
        "An any-N bundle moves slow stock without visibly discounting it, and keeps the list price intact for anyone buying a single item.",
      exampleAr: "كرواسون زعتر ١٢ + مافن توت ١٢ + دانش جبن ١٣ = ٣٧ ← ٣٠ ر.س.",
      exampleEn: "Zaatar croissant 12 + blueberry muffin 12 + cheese danish 13 = 37 → 30 SAR.",
          widget: {
        titleAr: "أي 3 مخبوزات",
        titleEn: "Any 3 pastries",
        mainAr: "كرواسون زعتر + مافن توت",
        mainEn: "Zaatar croissant + blueberry muffin",
        mainPrice: "24",
        suggest: [
          { ar: "دانش جبن — الثالث", en: "Cheese danish - the third", price: "13" },
        ],
        ctaAr: "خذ الثلاثة بـ30",
        ctaEn: "Take all three for 30",
      },
    },
    {
      key: "cart-ladder",
      channel: "kiosk",
      titleAr: "سلّم السلة: كم يفصلك عن الشريحة التالية",
      titleEn: "The cart ladder: how far to the next tier",
      triggerAr: "قيمة السلة قريبة من شريحة خصم أعلى.",
      triggerEn: "The cart total sits close to a higher discount tier.",
      scenarioAr:
        "شريط تقدّم يقول الفجوة بالريال، ومعه صنفان فقط يسدّانها — سريعا التحضير، وغير ريتيل، ومرتّبان بأقل تجاوز للفجوة لا بأعلى سعر.",
      scenarioEn:
        "A progress bar states the gap in riyals, with exactly two items that close it - fast to prepare, not retail, and sorted by smallest overshoot rather than highest price.",
      whyAr:
        "ترتيب المقترحات بأقل تجاوز لا بأعلى سعر هو الفرق بين مساعدة وابتزاز. الضيف الذي ينقصه ٧ ر.س لا يُعرض عليه صنف بـ٤٢.",
      whyEn:
        "Sorting by smallest overshoot rather than highest price is the difference between helping and squeezing. A guest 7 SAR short is not offered a 42 SAR item.",
      exampleAr: "السلة ٤٣ ر.س، شريحة ٥٠ تعطي ٥٪ ← «٧ ر.س وتوصل». يُقترح كرواسون ١٢ لا علبة كوكيز ٤٢.",
      exampleEn: "Cart at 43 SAR, the 50 tier gives 5% → \"7 SAR to go\". It suggests a 12 SAR croissant, not a 42 SAR cookie box.",
          widget: {
        titleAr: "اشتر أكثر ووفّر أكثر",
        titleEn: "Buy more, save more",
        mainAr: "سلتك الحالية",
        mainEn: "Your cart",
        mainPrice: "43",
        hintAr: "7 ر.س وتوصل لشريحة 5٪",
        hintEn: "7 SAR to the 5% tier",
        suggest: [
          { ar: "كرواسون زبدة", en: "Butter croissant", price: "12" },
          { ar: "كوكيز حبة", en: "Single cookie", price: "8" },
        ],
        ctaAr: "أضف وادخل شريحة 5٪",
        ctaEn: "Add and unlock 5%",
      },
    },
    {
      key: "effective-price",
      channel: "qr",
      titleAr: "فعلياً يكلفك: السعر بعد أثر العرض",
      titleEn: "Actually costs you: the price after the offer kicks in",
      triggerAr: "إضافة صنف سترفع السلة إلى شريحة خصم أعلى.",
      triggerEn: "Adding an item would push the cart into a higher tier.",
      scenarioAr:
        "يُعرض سعران: سعر القائمة، وتحته «فعلياً يكلفك ١٣٫١٠» — لأن إضافته فتحت خصماً على الطلب كله. الرقم محسوب لا تسويقي: هو الفرق بين ما ستدفعه بالصنف وبدونه.",
      scenarioEn:
        "Two prices show: the list price, and under it \"actually costs you 13.10\" - because adding it unlocked a discount on the whole order. The figure is computed, not marketing: it is what you pay with the item minus what you pay without it.",
      whyAr:
        "هذا الرقم هو أصدق حجة في الصفحة، وهو أيضاً ما تُنسب إليه الإيرادات في التقارير. لا يُعرض إلا حين يكون فعلاً أقل من سعر القائمة.",
      whyEn:
        "This is the most honest argument on the page, and it is also what revenue attribution is measured against. It only ever shows when it is genuinely lower than the list price.",
      exampleAr: "تشيز كيك ١٨ ر.س على سلة ٦٢ ← فعلياً ١٣٫١٠ لأن الطلب دخل شريحة الـ٥٪.",
      exampleEn: "Cheesecake 18 SAR on a 62 SAR cart → actually 13.10, because the order crossed the 5% tier.",
          widget: {
        titleAr: "فعلياً يكلفك",
        titleEn: "Actually costs you",
        mainAr: "سلتك الحالية",
        mainEn: "Your cart",
        mainPrice: "62",
        hintAr: "السعر بعد أثر العرض",
        hintEn: "The price after the offer",
        suggest: [
          { ar: "تشيز كيك", en: "Cheesecake", price: "13.10", was: "18" },
        ],
        ctaAr: "أضف التشيز كيك",
        ctaEn: "Add the cheesecake",
      },
    },
    {
      key: "waiter-say",
      channel: "waiter",
      titleAr: "قل للطاولة: جملة جاهزة لا تدريب",
      titleEn: "Say to the table: a ready sentence, not training",
      triggerAr: "النادل أدخل الأصناف ولم يُرسل للمطبخ بعد.",
      triggerEn: "The waiter has entered the items and not yet sent to the kitchen.",
      scenarioAr:
        "بطاقة فيها الجملة المنطوقة حرفياً، وثلاثة أزرار: أضاف / رفض / ما اقترحت. الزر الثالث مهم: يميّز النادل الذي جرّب وفشل عن الذي لم يجرّب.",
      scenarioEn:
        "A card with the spoken sentence verbatim, and three buttons: added / declined / didn't offer. The third matters: it separates a waiter who tried and failed from one who never tried.",
      whyAr:
        "البيع الإضافي في المطاعم يُدرّب عادة في جلسة تُنسى بعد أسبوع. الجملة الجاهزة في اللحظة تُغني عن التدريب، والقياس يُظهر من يستخدمها.",
      whyEn:
        "Upselling in restaurants is normally trained in a session that is forgotten in a week. A ready sentence at the moment replaces the training, and the measurement shows who uses it.",
      exampleAr: "«الشاورما مع كنافة ميني بخمسطعش، تبي أضيفها؟» ← ثلاثة أزرار للنتيجة.",
      exampleEn: "\"The shawarma goes with a mini kunafa for fifteen - want me to add it?\" → three outcome buttons.",
          widget: {
        titleAr: "قل للطاولة",
        titleEn: "Say to the table",
        mainAr: "شاورما عادي × 2",
        mainEn: "Regular shawarma × 2",
        mainPrice: "36",
        hintAr: "الجملة المقترحة",
        hintEn: "The suggested line",
        suggest: [
          { ar: "حلى كنافة mini للطاولة", en: "Mini kunafa for the table", price: "15" },
        ],
        ctaAr: "أضاف",
        ctaEn: "Added",
      },
    },
    {
      key: "dessert-timer",
      channel: "waiter",
      titleAr: "وقت الحلى: التنبيه بعد الأطباق لا قبلها",
      titleEn: "Dessert time: the nudge after the mains, not before",
      triggerAr: "مضت عشرون دقيقة على إرسال الأطباق الرئيسية.",
      triggerEn: "Twenty minutes have passed since the mains went to the kitchen.",
      scenarioAr:
        "الطاولة تتحول إلى «وقت الحلى» في قائمة النادل، مع اقتراح مبني على ما طلبته الطاولة فعلاً. عرض الحلى مع الطلب الأول يُرفض؛ عرضه بعد الأكل يُقبل.",
      scenarioEn:
        "The table flips to \"dessert time\" in the waiter's list, with a suggestion built from what that table actually ordered. Offering dessert with the first order gets declined; offering it after the food gets accepted.",
      whyAr:
        "الحلى أعلى هامش في قائمة المطعم وأكثر صنف يُنسى. التوقيت وحده هو الفرق، ولا أحد في الصالة يملك وقتاً لمتابعة عشرين طاولة بالساعة.",
      whyEn:
        "Dessert is the highest-margin line on a restaurant menu and the most forgotten one. Timing alone is the difference, and nobody on the floor has time to watch twenty tables by the clock.",
      exampleAr: "طاولة طلبت مشاوي ٧:٤٠ ← ٨:٠٠ تنبيه: «كنافة وقهوة عربية للطاولة؟»",
      exampleEn: "A table ordered grills at 7:40 → 8:00 alert: \"Kunafa and Arabic coffee for the table?\"",
          widget: {
        titleAr: "وقت الحلى",
        titleEn: "Dessert time",
        mainAr: "مشاوي مشكّلة — طاولة 7",
        mainEn: "Mixed grills - table 7",
        mainPrice: "145",
        hintAr: "مضى 20 دقيقة على الأطباق",
        hintEn: "20 minutes since the mains",
        suggest: [
          { ar: "كنافة بالقشطة", en: "Kunafa with cream", price: "28" },
          { ar: "قهوة عربية", en: "Arabic coffee", price: "18" },
        ],
        ctaAr: "أضاف",
        ctaEn: "Added",
      },
    },
    {
      key: "post-order",
      channel: "pos",
      titleAr: "بعد الدفع، قبل ما يجهز",
      titleEn: "After payment, before it is ready",
      triggerAr: "الطلب أُغلق على الكاشير والتحضير بدأ.",
      triggerEn: "The order closed on the POS and preparation started.",
      scenarioAr:
        "رسالة واحدة على جوال الضيف أثناء الانتظار: «أضف كذا قبل ما يجهز» — ويُنشأ طلب ثانٍ مرتبط بالأول. لا تلمس شاشة الكاشير ولا تؤخر الطابور خلفه.",
      scenarioEn:
        "One message to the guest's phone during the wait: \"Add this before it's ready\" - and a second order is created, linked to the first. It never touches the cashier screen or delays the queue behind them.",
      whyAr:
        "دقائق الانتظار وقت ميت يقضيه الضيف في جواله أصلاً، وهو الوقت الوحيد الذي لا يزاحم فيه الاقتراحُ طابوراً.",
      whyEn:
        "The wait is dead time the guest already spends on their phone, and it is the only window where a suggestion competes with nothing.",
      exampleAr: "طلب برجر ٨:٠٢ ← ٨:٠٣ رسالة: «كوكيز طازج خرج الآن، ٨ ر.س؟»",
      exampleEn: "Burger ordered 8:02 → 8:03 message: \"Fresh cookies just came out, 8 SAR?\"",
          widget: {
        titleAr: "أضفه لطلبي",
        titleEn: "Add to my order",
        mainAr: "برجر كلاسيك — قيد التحضير",
        mainEn: "Classic burger - in preparation",
        mainPrice: "32",
        hintAr: "طلبك يجهز خلال 8 دقائق",
        hintEn: "Ready in 8 minutes",
        suggest: [
          { ar: "كوكيز طازج، خرج الآن", en: "Fresh cookies, just out", price: "8" },
        ],
        ctaAr: "أضفه قبل ما يجهز",
        ctaEn: "Add before it's ready",
      },
    },
    {
      key: "retail",
      channel: "qr",
      titleAr: "الريتيل: مرة واحدة، بعد أن يذوق",
      titleEn: "Retail: once, and after they have tasted it",
      triggerAr: "الطلب جهز وكان فيه قهوة.",
      triggerEn: "The order is ready and it contained coffee.",
      scenarioAr:
        "اقتراح واحد لا يتكرر: «أعجبتك قهوتنا؟ كيس حبوب ٢٥٠ جم». يظهر بعد إغلاق نافذة التحضير لا قبلها، لأن قبلها الضيف لم يذق بعد.",
      scenarioEn:
        "One suggestion that never repeats: \"Liked our coffee? A 250g bag of beans\". It appears after the preparation window closes, not before - before it, the guest has not tasted anything yet.",
      whyAr:
        "بيع الحبوب هامشه أعلى من الكوب وقيمته أطول أثراً، لكنه يحتاج دليلاً ذوقياً. عرضه مع الطلب يسبق الدليل.",
      whyEn:
        "Selling beans carries more margin than a cup and a longer tail, but it needs proof by taste. Offering it with the order gets ahead of the proof.",
      exampleAr: "لاتيه إسباني في الطلب ← بعد الجهوز: «نفس الحبوب، كيس ٢٥٠ جم».",
      exampleEn: "A Spanish latte in the order → after it is ready: \"The same beans, 250g bag\".",
          widget: {
        titleAr: "أعجبتك قهوتنا؟",
        titleEn: "Liked our coffee?",
        mainAr: "لاتيه إسباني",
        mainEn: "Spanish latte",
        mainPrice: "21",
        hintAr: "بعد أن ذقتها",
        hintEn: "Now that you have tasted it",
        suggest: [
          { ar: "كيس حبوب 250 جم — نفس الحبوب", en: "250g bag - the same beans", price: "65" },
        ],
        ctaAr: "أضف الكيس",
        ctaEn: "Add the bag",
      },
    },
    {
      key: "known-customer",
      channel: "mobile_app",
      titleAr: "العميل المعروف: طلبه المعتاد وصنف لم يجرّبه",
      titleEn: "The known customer: the usual, plus one they have never tried",
      triggerAr: "الضيف عُرف برقمه أو بحساب الولاء.",
      triggerEn: "The guest is recognised by phone or loyalty account.",
      scenarioAr:
        "الطلب المعتاد بلمسة واحدة، وبجانبه صنف واحد لم يطلبه من قبل. الطلب المعتاد يختصر عليه دقيقة، والصنف الجديد هو ما يوسّع ذائقته.",
      scenarioEn:
        "The usual order in one tap, and beside it one item they have never ordered. The usual saves them a minute; the new item is what widens what they order.",
      whyAr:
        "العميل المتكرر يطلب نفس الشيء لأنه أسهل لا لأنه أفضل. اقتراح واحد جديد في كل زيارة يرفع سلة العميل مدى الحياة دون أن يبدو بيعاً.",
      whyEn:
        "A repeat customer orders the same thing because it is easier, not because it is better. One new item per visit lifts their lifetime basket without reading as a sell.",
      exampleAr: "«المعتاد: لاتيه كبير وكرواسون» + «جرّب اللاتيه الإسباني، ٢١ ر.س».",
      exampleEn: "\"The usual: large latte and a croissant\" + \"Try the Spanish latte, 21 SAR\".",
          widget: {
        titleAr: "أهلاً بعودتك",
        titleEn: "Welcome back",
        mainAr: "المعتاد: لاتيه كبير + كرواسون",
        mainEn: "The usual: large latte + croissant",
        mainPrice: "34",
        hintAr: "وصنف لم تجرّبه",
        hintEn: "And one you haven't tried",
        suggest: [
          { ar: "لاتيه إسباني — لم تجرّبه", en: "Spanish latte - never tried", price: "21" },
        ],
        ctaAr: "اطلب المعتاد",
        ctaEn: "Order the usual",
      },
    },
    {
      key: "silence",
      channel: "qr",
      titleAr: "رفض واحد يُسكت الباقي",
      titleEn: "One decline silences the rest",
      triggerAr: "الضيف ضغط «لا، شكراً» على أي اقتراح.",
      triggerEn: "The guest taps \"No thanks\" on any suggestion.",
      scenarioAr:
        "تتوقف كل الاقتراحات لبقية الطلب. يبقى شريط سلّم السلة لأنه معلومة لا مقاطعة، وتختفي أصنافه المقترحة. واقتراح واحد فقط معروض في أي لحظة.",
      scenarioEn:
        "Every proactive suggestion stops for the rest of that order. The cart-ladder bar stays, because it is information rather than an interruption, and its suggested items disappear. Only one suggestion is ever on screen at a time.",
      whyAr:
        "هذه القاعدة هي ما يجعل الباقي مقبولاً. المطعم الذي يقترح ثلاث مرات بعد الرفض يخسر الطلب كله لا الاقتراح، والضيف يتذكر الإلحاح لا العرض.",
      whyEn:
        "This rule is what makes everything above acceptable. A restaurant that suggests three more times after a no loses the order, not the suggestion, and the guest remembers the pestering rather than the offer.",
      exampleAr: "رُفض اقتراح الحلى ← لا مقبلات ولا مشروب ولا ترقية لبقية الجلسة.",
      exampleEn: "The dessert suggestion is declined → no sides, no drink, no upgrade for the rest of the session.",
          widget: {
        titleAr: "طلبك",
        titleEn: "Your order",
        mainAr: "شاورما عادي + مشروب",
        mainEn: "Regular shawarma + a drink",
        mainPrice: "27",
        hintAr: "رفضت اقتراحاً، فتوقفت البقية",
        hintEn: "You declined once, so the rest stopped",
        suggest: [
          { ar: "لا اقتراحات بعد الرفض", en: "No suggestions after a decline", price: "—" },
        ],
        ctaAr: "إتمام الطلب",
        ctaEn: "Checkout",
      },
    },
  ],

  slug: "restaurants-cafes",
};
