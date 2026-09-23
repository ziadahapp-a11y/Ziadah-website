import type { SectorDeepDive } from "../sectorDeepDive";

export const healthFitnessDeepDive: SectorDeepDive = {
  slug: "health-fitness",
  introAr:
    "المكمّلات والمعدات تُشترى لهدف لا لذاتها: خسارة وزن، بناء عضلة، تحمّل. والعميل يعرف هدفه ولا يعرف ما يلزمه له، فيشتري صنفاً واحداً ويتوقف حين لا يرى نتيجة. ثم إن للمكمّل عمراً معلوماً بالجرعة، فتوقيت إعادة الشراء حساب لا تخمين. القطاع منظّم أيضاً: لا وعد بنتيجة ولا ادعاء علاجي.",
  introEn:
    "Supplements and equipment are bought for a goal, not for themselves: losing weight, building muscle, endurance. The customer knows the goal and not what it takes, so they buy one item and stop when they see no result. And a supplement has a life measured in servings, so reorder timing is arithmetic rather than a guess. The sector is regulated too: no promised outcomes, no therapeutic claims.",
  useCases: [
    {
      key: "goal-stack",
      titleAr: "ما يكمّل الهدف لا ما يشبه المنتج",
      titleEn: "What completes the goal, not what resembles the product",
      triggerAr: "العميل أضاف بروتين واي للسلة.",
      triggerEn: "The customer adds whey protein to the cart.",
      scenarioAr:
        "تُعرض المكمّلات التي تخدم نفس الهدف لا نفس الفئة: كرياتين وشيكر، لا نكهة ثانية من نفس البروتين.",
      scenarioEn:
        "Supplements serving the same goal appear, not the same category: creatine and a shaker, rather than a second flavour of the same protein.",
      whyAr:
        "العميل لا يريد بروتيناً بل عضلة. الاقتراح الذي يفهم الهدف يبيع ثلاثة أصناف، والذي يفهم الفئة يعرض نكهة ثانية ولا يبيع شيئاً.",
      whyEn:
        "The customer does not want protein, they want muscle. A suggestion that understands the goal sells three items; one that understands the category offers another flavour and sells nothing.",
      exampleAr: "بروتين واي ← كرياتين ١٢٠ + شيكر ٤٥، لا نكهة فانيلا من نفس العلبة.",
      exampleEn: "Whey protein → creatine at 120 + a shaker at 45, not the vanilla version of the same tub.",
    },
    {
      key: "serving-timing",
      titleAr: "موعد النفاد بالجرعة لا بالتقويم",
      titleEn: "Running out by servings, not by calendar",
      triggerAr: "علبة بـ٣٠ جرعة اشتُريت قبل ٢٦ يوماً.",
      triggerEn: "A 30-serving tub was bought 26 days ago.",
      scenarioAr:
        "يصل التذكير قبل النفاد بأيام، محسوباً بعدد الجرعات ومعدل الاستخدام المعلن. الانقطاع أسبوعاً يكسر البرنامج والعادة معاً.",
      scenarioEn:
        "The reminder arrives days before it runs out, computed from the serving count and the stated usage rate. A week's gap breaks the programme and the habit together.",
      whyAr:
        "العميل الذي ينفد مكمّله ولا يجد بديلاً فوراً يشتري من أقرب متجر لا من متجرك. سباق التذكير هو سباق الاحتفاظ.",
      whyEn:
        "A customer who runs out and cannot reorder instantly buys from the nearest store, not yours. The reminder race is the retention race.",
      exampleAr: "علبة ٣٠ جرعة، جرعة يومياً، اشتُريت ١ مارس ← تذكير ٢٧ مارس.",
      exampleEn: "A 30-serving tub, one a day, bought 1 March → a reminder on 27 March.",
    },
    {
      key: "bulk-value",
      titleAr: "الحجم الأكبر بسعر الجرعة",
      titleEn: "The bigger tub, priced per serving",
      triggerAr: "العميل يشتري نفس المنتج للمرة الثالثة.",
      triggerEn: "The customer buys the same product for a third time.",
      scenarioAr:
        "يُعرض الحجم الأكبر بسعر الجرعة لا بسعر العلبة: «الجرعة ٦٫٥ بدل ٩٫٢». المشتري المتكرر أثبت أنه سيستهلكها.",
      scenarioEn:
        "The larger size is priced per serving rather than per tub: \"6.5 a serving instead of 9.2\". A third-time buyer has proved they will get through it.",
      whyAr:
        "عرض الحجم الكبير على مشترٍ أول مخاطرة، وعرضه على مشترٍ ثالث خدمة. التوقيت هو ما يفرّق بين الاثنين.",
      whyEn:
        "Offering the big tub to a first-time buyer is a gamble; offering it to a third-time buyer is a service. Timing is the whole difference.",
      exampleAr: "الشراء الثالث لعلبة ١ كجم ← «٢٫٥ كجم، الجرعة ٦٫٥ بدل ٩٫٢».",
      exampleEn: "A third 1kg purchase → \"2.5kg, 6.5 per serving instead of 9.2\".",
    },
    {
      key: "equipment-setup",
      titleAr: "ما يلزم المعدة لتُستخدم",
      titleEn: "What the equipment needs to be usable",
      triggerAr: "العميل أضاف أثقالاً أو جهازاً منزلياً.",
      triggerEn: "The customer adds weights or a home machine.",
      scenarioAr:
        "تُعرض الحصيرة والحامل وقفازات القبضة — لا معدّة ثانية. الأثقال بلا حصيرة تكسر أرضية البيت وتنتهي في المستودع.",
      scenarioEn:
        "A mat, a rack and grip gloves appear - not a second machine. Weights without a mat wreck the floor and end up in storage.",
      whyAr:
        "المعدة التي لا تُستخدم لا تُكرَّر ولا تُوصى. بيع ما يجعلها قابلة للاستخدام في البيت يحمي التقييم والإحالة.",
      whyEn:
        "Equipment that goes unused is never repeated and never recommended. Selling what makes it usable at home protects the rating and the referral.",
      exampleAr: "أثقال ٢٠ كجم ← حصيرة أرضية ١٨٠ وحامل ٢٤٠، لا جهاز ثانٍ.",
      exampleEn: "A 20kg weight set → a floor mat at 180 and a rack at 240, not another machine.",
    },
    {
      key: "beginner-path",
      titleAr: "المبتدئ: أقل لا أكثر",
      titleEn: "The beginner: less, not more",
      triggerAr: "عميل جديد بلا سجل شراء في القطاع.",
      triggerEn: "A new customer with no purchase history in the sector.",
      scenarioAr:
        "يُعرض صنفان فقط بحجم صغير، لا حزمة مكمّلات كاملة. المبتدئ الذي يُحمّل بستة منتجات يترك السلة أو يترك البرنامج.",
      scenarioEn:
        "Two items in small sizes, not a full supplement stack. A beginner loaded with six products abandons the cart or abandons the programme.",
      whyAr:
        "الهدف في القطاع ليس أكبر طلب أول بل أول طلب ثانٍ. البيع الزائد للمبتدئ يقتل التكرار الذي هو كل الربح هنا.",
      whyEn:
        "The goal in this sector is not the biggest first order, it is a second order at all. Overselling a beginner kills the repeat, which is where all the margin is.",
      exampleAr: "عميل جديد ← بروتين ١ كجم + شيكر فقط. لا كرياتين ولا حارق ولا فيتامينات.",
      exampleEn: "A new customer → a 1kg protein and a shaker only. No creatine, no burner, no vitamins.",
    },
    {
      key: "subscription",
      titleAr: "الاشتراك الشهري بدل الطلب المتكرر",
      titleEn: "A monthly subscription instead of a repeated order",
      triggerAr: "العميل طلب نفس الأصناف ثلاث مرات بفواصل منتظمة.",
      triggerEn: "The customer has ordered the same items three times at regular intervals.",
      scenarioAr:
        "يُعرض تحويل الطلب المتكرر إلى اشتراك بخصم ثابت وتوصيل في نفس الموعد كل شهر. العميل يشتري هذا فعلاً كل شهر.",
      scenarioEn:
        "Turning the repeated order into a subscription is offered, with a fixed discount and delivery on the same date each month. They are already buying this monthly.",
      whyAr:
        "الاشتراك يحوّل عميلاً متقلباً إلى إيراد متوقع، ويقفل الباب أمام المنافس الذي يذكّر قبلك بيوم.",
      whyEn:
        "A subscription turns a volatile customer into predictable revenue, and shuts the door on the competitor who reminds them a day before you do.",
      exampleAr: "نفس الطلب في يناير وفبراير ومارس ← «اشتراك شهري، ١٠٪ وتوصيل كل ١ من الشهر».",
      exampleEn: "The same order in January, February and March → \"Monthly subscription, 10% off, delivered on the 1st\".",
    },
  ],
};
