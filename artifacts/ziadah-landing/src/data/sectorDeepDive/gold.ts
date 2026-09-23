import type { SectorDeepDive } from "../sectorDeepDive";

export const goldDeepDive: SectorDeepDive = {
  slug: "gold",
  introAr:
    "الذهب سلعة وسعرها ليس قرار المتجر: الجرام يتحرك يومياً والربح في الأجرة والتصنيع لا في المعدن. والمشتري هنا نوعان لا نوع واحد: مشترٍ للمناسبة يهمه الشكل، ومشترٍ للادخار يهمه الوزن. اللحظات أدناه تفرّق بينهما، لأن الاقتراح الذي يناسب الأول يهين الثاني.",
  introEn:
    "Gold is a commodity and its price is not the store's decision: the gram moves daily and the margin sits in the making charge, not the metal. And the buyer here is two people, not one: an occasion buyer who cares about the design, and a saver who cares about the weight. The moments below separate them, because a suggestion that suits the first insults the second.",
  useCases: [
    {
      key: "price-lock",
      titleAr: "تثبيت السعر أثناء التردد",
      titleEn: "Locking the price while they hesitate",
      triggerAr: "العميل يتصفّح قطعة وسعر الجرام يتحرك.",
      triggerEn: "The customer is viewing a piece while the gram price moves.",
      scenarioAr:
        "يُعرض سعر اليوم مع مدة ثباته صراحة: «هذا السعر ثابت حتى ٦ مساءً». الشفافية هنا ليست ضغطاً بل واقع السوق.",
      scenarioEn:
        "Today's price is shown with how long it holds, stated plainly: \"This price holds until 6pm\". The transparency here is not pressure, it is how the market works.",
      whyAr:
        "العميل الذي يعود غداً ويجد السعر تغيّر بلا تفسير يفقد الثقة. الإعلان المسبق عن آلية التسعير يحمي الثقة ويحسم التردد في الوقت نفسه.",
      whyEn:
        "A customer who comes back tomorrow to an unexplained different price loses trust. Stating the pricing mechanism up front protects that trust and resolves the hesitation at the same time.",
      exampleAr: "أسورة ٢٢ جرام ← «سعر اليوم ٨٬٤٠٠، ثابت حتى ٦ م».",
      exampleEn: "A 22-gram bangle → \"Today's price 8,400, held until 6pm\".",
    },
    {
      key: "weight-vs-design",
      titleAr: "الوزن أم التصميم: أي مشترٍ هذا",
      titleEn: "Weight or design: which buyer is this",
      triggerAr: "سلوك التصفّح يميل إلى الوزن أو إلى الشكل.",
      triggerEn: "Browsing behaviour leans towards weight or towards design.",
      scenarioAr:
        "المشتري الذي يقارن الأوزان تُعرض له السبائك والقطع بسيطة الأجرة. والمشتري الذي يقارن التصاميم تُعرض له الأطقم والأعمال اليدوية.",
      scenarioEn:
        "A buyer comparing weights is shown bars and low-making-charge pieces. A buyer comparing designs is shown sets and handcrafted work.",
      whyAr:
        "عرض تصميم مزخرف عالي الأجرة على مشترٍ يدّخر يقرأ كمحاولة استغلال. وعرض سبيكة على مشترية عروس يقرأ كعدم فهم. الفرق بين البيعين هو القطاع كله.",
      whyEn:
        "Showing an ornate high-making-charge design to a saver reads as an attempt to take advantage. Showing a bar to someone buying for a wedding reads as not listening. The difference between those two sales is the whole sector.",
      exampleAr: "قارن ثلاث قطع بالوزن ← تُعرض السبائك وأقل الأجور، لا الأطقم المرصّعة.",
      exampleEn: "Compared three pieces by weight → bars and the lowest making charges, not stone-set suites.",
    },
    {
      key: "bridal-set",
      titleAr: "الشبكة كاملة لا قطعة قطعة",
      titleEn: "The bridal set as a whole, not piece by piece",
      triggerAr: "العميل يتصفّح قطعة من قطع الشبكة المعتادة.",
      triggerEn: "The customer is viewing one of the usual bridal pieces.",
      scenarioAr:
        "تُعرض الشبكة كاملة بوزنها الإجمالي وأجرتها مجمّعة، مع صورة تجمع القطع. شراء الشبكة قرار واحد لا أربعة.",
      scenarioEn:
        "The full set appears with its total weight and a combined making charge, in one image with all the pieces. Buying a bridal set is one decision, not four.",
      whyAr:
        "من يشتري الشبكة يشتريها كاملة على أي حال، وتفريقها على أربع زيارات يفتح الباب لمقارنة سعر الجرام عند المنافس بينها.",
      whyEn:
        "Whoever buys a bridal set buys all of it anyway, and splitting it across four visits opens the door to a competitor's gram price in between.",
      exampleAr: "خاتم شبكة ← «الشبكة كاملة ٨٥ جرام، الأجرة مجمّعة» بصورة واحدة.",
      exampleEn: "A bridal ring → \"The full set, 85 grams, one combined making charge\", in a single image.",
    },
    {
      key: "occasion-gold",
      titleAr: "المناسبات التي يُشترى فيها الذهب",
      titleEn: "The occasions gold is bought for",
      triggerAr: "اقترب موسم زواج أو مولود أو عيد.",
      triggerEn: "A wedding, newborn or Eid season approaches.",
      scenarioAr:
        "تتقدّم القطع المناسبة للمناسبة: أساور المواليد الخفيفة، وهدايا العيد الصغيرة، وقطع الشبكة في موسم الأعراس.",
      scenarioEn:
        "Occasion-appropriate pieces move up: light newborn bangles, small Eid gifts, bridal pieces in wedding season.",
      whyAr:
        "الذهب في السعودية يُشترى لمناسبة محددة لا بشكل عشوائي. ترتيب المعروض بالموسم يضاعف الصلة بلا أي خصم.",
      whyEn:
        "Gold here is bought for a specific occasion rather than at random. Ordering the catalogue by season multiplies relevance with no discount at all.",
      exampleAr: "موسم مواليد ← أساور خفيفة ٥-٨ جرام في المقدمة.",
      exampleEn: "Newborn season → light 5-8 gram bangles at the front.",
    },
    {
      key: "trade-in",
      titleAr: "الاستبدال بالقديم",
      titleEn: "Trading the old in",
      triggerAr: "العميل يقارن قطعاً أعلى من ميزانيته الظاهرة.",
      triggerEn: "The customer is comparing pieces above their apparent budget.",
      scenarioAr:
        "يُعرض احتساب الذهب القديم في السعر: «بدّل قديمك واحسم وزنه». يحوّل القطعة التي تبدو بعيدة إلى قريبة.",
      scenarioEn:
        "Trading in old gold against the price is offered: \"Bring your old pieces and we deduct the weight\". It turns a piece that looked out of reach into a close one.",
      whyAr:
        "كل بيت سعودي فيه ذهب قديم لا يُلبس. تذكير العميل بأنه رصيد لا حلية هو ما يفتح الميزانية.",
      whyEn:
        "Every household here has old gold nobody wears. Reminding the customer that it is credit rather than jewellery is what opens the budget.",
      exampleAr: "قطعة ١٢٬٠٠٠ خارج الميزانية ← «بدّل ٣٠ جرام قديم وينزل الفرق ١١٬٠٠٠».",
      exampleEn: "A 12,000 piece out of budget → \"Trade in 30 grams of old gold and the difference drops by 11,000\".",
    },
    {
      key: "certificate",
      titleAr: "الشهادة والدمغة كجزء من العرض",
      titleEn: "The certificate and hallmark as part of the offer",
      triggerAr: "العميل في صفحة قطعة مرتفعة القيمة.",
      triggerEn: "The customer is on a high-value piece.",
      scenarioAr:
        "تُعرض الشهادة والدمغة وسياسة إعادة الشراء بجانب السعر لا في صفحة منفصلة. المشتري يريد ضماناً أنه يستطيع البيع لاحقاً.",
      scenarioEn:
        "The certificate, the hallmark and the buy-back policy sit beside the price rather than on a separate page. The buyer wants assurance they can sell it again later.",
      whyAr:
        "الذهب يُشترى بنية إمكان البيع. المتجر الذي يوضّح إعادة الشراء يبيع أكثر من المتجر الأرخص بلا توضيح.",
      whyEn:
        "Gold is bought with resale in mind. A store that spells out its buy-back outsells a cheaper store that does not.",
      exampleAr: "قطعة ٩٬٥٠٠ ← «دمغة ٢١، شهادة، إعادة شراء بسعر اليوم ناقص الأجرة».",
      exampleEn: "A 9,500 piece → \"21k hallmark, certificate, buy-back at the day's price less the making charge\".",
    },
  ],
};
