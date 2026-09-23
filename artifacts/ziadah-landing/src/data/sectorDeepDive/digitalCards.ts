import type { SectorDeepDive } from "../sectorDeepDive";

export const digitalCardsDeepDive: SectorDeepDive = {
  slug: "digital-cards",
  introAr:
    "البطاقات الرقمية قطاع سرعة: العميل يدخل وهو يعرف ما يريد بالضبط، ويريد الكود خلال ثانية. الهامش رقيق جداً والمنافسة على السعر شبه مستحيلة، فالربح يأتي من الفئة الأعلى ومن تكرار الشراء لا من رفع السعر. وأي احتكاك في الشراء يفقدك الطلب فوراً لأن البديل على بُعد بحث واحد.",
  introEn:
    "Digital cards are a speed business: the customer arrives knowing exactly what they want and wants the code within a second. Margin is very thin and competing on price is near impossible, so the profit comes from the higher denomination and from repeat purchase, not from raising the price. Any friction loses the order instantly, because the alternative is one search away.",
  useCases: [
    {
      key: "denomination-up",
      titleAr: "الفئة الأعلى بفرق صغير",
      titleEn: "The higher denomination for a small difference",
      triggerAr: "العميل اختار فئة متوسطة من بطاقة.",
      triggerEn: "The customer picks a mid denomination.",
      scenarioAr:
        "تُعرض الفئة الأعلى بفرقها وبما تعنيه: «١٠٠ بدل ٥٠، يكفي الاشتراك شهرين بدل شهر». الفائدة بالوقت لا بالرقم.",
      scenarioEn:
        "The higher denomination appears with its difference and its meaning: \"100 instead of 50 covers two months instead of one\". The benefit stated in time, not in figures.",
      whyAr:
        "الفئة الأعلى تعني زيارة واحدة بدل زيارتين ورسوم معالجة مرة بدل مرتين. العميل يربح والمتجر يربح.",
      whyEn:
        "The higher denomination means one visit instead of two and one processing fee instead of two. Both sides gain.",
      exampleAr: "بطاقة ٥٠ ← «١٠٠ تكفيك شهرين، وتدفع رسوم المعالجة مرة».",
      exampleEn: "A 50 card → \"100 covers two months, and you pay the processing fee once\".",
    },
    {
      key: "cross-platform",
      titleAr: "البطاقة المكمّلة لنفس اللاعب",
      titleEn: "The companion card for the same player",
      triggerAr: "العميل اشترى بطاقة منصة ألعاب.",
      triggerEn: "The customer buys a gaming platform card.",
      scenarioAr:
        "تُعرض بطاقة الاشتراك المكمّلة للمنصة نفسها لا لمنصة أخرى: عضوية الأونلاين مع رصيد المتجر.",
      scenarioEn:
        "The companion subscription for the same platform is offered, not for a different one: the online membership alongside the store credit.",
      whyAr:
        "اللاعب مرتبط بمنصة واحدة. اقتراح بطاقة منصة منافسة عليه دليل على أن المتجر لا يعرفه، وهو أسرع ما يفقد التكرار.",
      whyEn:
        "A gamer is locked to one platform. Suggesting a rival platform's card proves the store does not know them, which is the fastest way to lose the repeat.",
      exampleAr: "رصيد متجر الألعاب ← «عضوية الأونلاين ١٢ شهراً» لنفس المنصة.",
      exampleEn: "Game store credit → \"12-month online membership\" for the same platform.",
    },
    {
      key: "instant-delivery",
      titleAr: "التسليم الفوري كحجة بيع",
      titleEn: "Instant delivery as the argument",
      triggerAr: "العميل يقارن بين متجرك ومتجر آخر.",
      triggerEn: "The customer is comparing your store with another.",
      scenarioAr:
        "يُعرض زمن التسليم صراحة بجانب السعر: «الكود خلال ٣٠ ثانية». في قطاع لا يمكن المنافسة فيه بالسعر، السرعة هي المنتج.",
      scenarioEn:
        "Delivery time is stated beside the price: \"Code in 30 seconds\". In a sector where price competition is impossible, speed is the product.",
      whyAr:
        "العميل الذي يشتري بطاقة يشتريها لأنه يريدها الآن. متجر أرخص بريال ويسلّم بعد ساعة يخسر أمام متجر يسلّم فوراً.",
      whyEn:
        "Someone buying a card is buying it because they want it now. A store a riyal cheaper that delivers in an hour loses to one that delivers instantly.",
      exampleAr: "صفحة بطاقة ← «التسليم خلال ٣٠ ثانية» بجانب السعر لا في الأسفل.",
      exampleEn: "A card page → \"Delivered in 30 seconds\" beside the price, not at the bottom.",
    },
    {
      key: "reorder-rhythm",
      titleAr: "إيقاع إعادة الشراء",
      titleEn: "The reorder rhythm",
      triggerAr: "العميل يشتري نفس البطاقة كل شهر تقريباً.",
      triggerEn: "The customer buys the same card roughly monthly.",
      scenarioAr:
        "تذكير قبل موعده بيوم مع كود جاهز بلمسة. العميل سيشتريها على أي حال، والسؤال من أين.",
      scenarioEn:
        "A reminder a day before it is due, with the code one tap away. They will buy it anyway; the only question is from where.",
      whyAr:
        "لا ولاء في هذا القطاع، فيه عادة فقط. من يذكّر أولاً يملك العادة، ومن يتأخر يوماً يخسرها.",
      whyEn:
        "There is no loyalty in this sector, only habit. Whoever reminds first owns the habit, and a day late loses it.",
      exampleAr: "اشترى في ١ من كل شهر ← تذكير ٣٠ من الشهر بكود جاهز.",
      exampleEn: "Bought on the 1st each month → a reminder on the 30th with the code ready.",
    },
    {
      key: "gift-code",
      titleAr: "البطاقة كهدية",
      titleEn: "The card as a gift",
      triggerAr: "الطلب في موسم إهداء أو العميل يشتري فئة كبيرة.",
      triggerEn: "The order falls in a gift season, or the customer picks a large denomination.",
      scenarioAr:
        "يُعرض إرسال الكود مباشرة للمُهدى إليه مع رسالة، بدل استلامه ثم إعادة إرساله يدوياً.",
      scenarioEn:
        "Sending the code straight to the recipient with a message is offered, instead of receiving it and forwarding it by hand.",
      whyAr:
        "البطاقة الرقمية هدية شائعة وصعبة التقديم: إرسال كود نصي بلا سياق يبدو بارداً. تغليفها رقمياً يرفع القيمة بلا تكلفة.",
      whyEn:
        "A digital card is a common gift and an awkward one to present: forwarding a bare code reads as cold. Wrapping it digitally adds value at no cost.",
      exampleAr: "بطاقة ٢٠٠ ← «أرسلها مباشرة لرقمه مع رسالتك» بدل استلامها.",
      exampleEn: "A 200 card → \"Send it straight to their number with your message\" instead of receiving it.",
    },
  ],
};
