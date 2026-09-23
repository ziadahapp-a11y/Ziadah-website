import type { SectorDeepDive } from "../sectorDeepDive";

export const deliveryAppsDeepDive: SectorDeepDive = {
  slug: "delivery-apps",
  introAr:
    "تطبيق التوصيل ليس متجراً بل سوقاً: المستخدم يفتحه وهو جائع ولا يعرف ماذا يريد، ويغلقه إن لم يقرر خلال دقيقتين. وكل طلب فيه تكلفة توصيل ثابتة تقريباً، فرفع قيمة السلة هو الفرق بين طلب رابح وطلب يغطي المندوب فقط. اللحظات أدناه مكتوبة لهذا الاقتصاد تحديداً.",
  introEn:
    "A delivery app is a marketplace, not a store: the user opens it hungry without knowing what they want, and closes it if they cannot decide in two minutes. Every order carries a near-fixed delivery cost, so raising basket value is the difference between a profitable order and one that only pays the rider. The moments below are written for that economics specifically.",
  useCases: [
    {
      key: "min-order-gap",
      titleAr: "الحد الأدنى للطلب: كم يفصلك عنه",
      titleEn: "Minimum order: how far you are from it",
      triggerAr: "السلة أقل من الحد الأدنى للمطعم.",
      triggerEn: "The basket is under the restaurant's minimum.",
      scenarioAr:
        "الفجوة بالريال مع صنفين يسدّانها بالضبط، مرتّبين بأقل تجاوز. العميل الذي يرى «ناقصك ٩ ر.س» ولا يرى بماذا يسدّها يترك السلة.",
      scenarioEn:
        "The gap in riyals with two items that close it exactly, sorted by smallest overshoot. A user who sees \"9 SAR short\" and no way to close it abandons the basket.",
      whyAr:
        "السلة المتروكة عند الحد الأدنى أكثر تسرّب في تطبيقات التوصيل، وسببها معلوماتي لا سعري: العميل لا يعرف ماذا يضيف.",
      whyEn:
        "Abandonment at the minimum is the biggest leak in delivery apps, and the cause is informational rather than price: the user does not know what to add.",
      exampleAr: "السلة ٤١، الحد ٥٠ ← «كوكيز ٨» أو «مشروب ٩»، لا طبق بـ٣٥.",
      exampleEn: "Basket at 41, minimum 50 → \"cookies 8\" or \"a drink 9\", not a 35 SAR dish.",
    },
    {
      key: "dead-delivery-time",
      titleAr: "وقت الانتظار: النافذة المجانية",
      titleEn: "The wait: the free window",
      triggerAr: "الطلب تأكّد والمندوب في الطريق.",
      triggerEn: "The order is confirmed and the rider is on the way.",
      scenarioAr:
        "أثناء التتبع يُعرض صنف واحد يُضاف كطلب مرتبط من نفس المطعم قبل خروجه. دقائق التتبع وقت ينظر فيه العميل للشاشة أصلاً.",
      scenarioEn:
        "During tracking, one item can be added as a linked order from the same kitchen before it leaves. The tracking minutes are time the user already spends staring at the screen.",
      whyAr:
        "هذه النافذة الوحيدة التي لا يزاحم فيها الاقتراحُ شيئاً: لا طابور ولا تصفّح ولا قرار آخر مفتوح.",
      whyEn:
        "This is the one window where a suggestion competes with nothing: no queue, no browsing, no other open decision.",
      exampleAr: "طلب خرج من المطبخ خلال ٨ دقائق ← «أضف تحلية قبل الخروج».",
      exampleEn: "Order leaving the kitchen in 8 minutes → \"Add a dessert before it goes\".",
    },
    {
      key: "reorder-usual",
      titleAr: "طلبك المعتاد بلمسة",
      titleEn: "Your usual, in one tap",
      triggerAr: "مستخدم متكرر فتح التطبيق في وقته المعتاد.",
      triggerEn: "A repeat user opens the app at their usual hour.",
      scenarioAr:
        "الطلب المعتاد في أعلى الشاشة بلمسة واحدة، ومعه صنف واحد لم يجرّبه من نفس المطعم.",
      scenarioEn:
        "The usual order sits at the top in one tap, with one item from the same restaurant they have never tried.",
      whyAr:
        "المستخدم الذي يقرر بسرعة يطلب أكثر. اختصار القرار يرفع التكرار، والصنف الجديد الوحيد يوسّع السلة دون أن يبطئه.",
      whyEn:
        "A user who decides fast orders more often. Shortening the decision lifts frequency, and the single new item widens the basket without slowing them down.",
      exampleAr: "٩ م خميس ← «المعتاد: شاورما وبيبسي» + «جرّب البطاطس بالجبن».",
      exampleEn: "9pm Thursday → \"The usual: shawarma and a Pepsi\" + \"Try the cheese fries\".",
    },
    {
      key: "group-order",
      titleAr: "الطلب الجماعي: سلة تتضاعف",
      titleEn: "Group ordering: a basket that multiplies",
      triggerAr: "الطلب في وقت غداء العمل أو تجمّع عائلي.",
      triggerEn: "The order falls in a work-lunch or family-gathering window.",
      scenarioAr:
        "تُقترح الأحجام العائلية والصواني بدل الأطباق المفردة، مع رابط يشارك السلة ليضيف كل شخص طلبه.",
      scenarioEn:
        "Family sizes and platters are suggested instead of single plates, with a link that shares the basket so each person adds their own.",
      whyAr:
        "الطلب الجماعي أعلى سلة في التطبيق وأقل تكلفة توصيل لكل ريال. تسهيله تقنياً يضاعف القيمة دون أي خصم.",
      whyEn:
        "A group order is the highest basket in the app and the lowest delivery cost per riyal. Making it technically easy doubles the value with no discount at all.",
      exampleAr: "١٢:٣٠ ظهراً من موقع مكتبي ← «صينية ٦ أشخاص» + رابط مشاركة السلة.",
      exampleEn: "12:30pm from an office location → \"A 6-person platter\" + a basket-sharing link.",
    },
    {
      key: "cross-restaurant",
      titleAr: "الاكتشاف: مطعم قريب لم يجرّبه",
      titleEn: "Discovery: a nearby place they have not tried",
      triggerAr: "المستخدم تصفّح دون أن يطلب لأكثر من دقيقتين.",
      triggerEn: "The user has browsed without ordering for more than two minutes.",
      scenarioAr:
        "يُقترح مطعم واحد قريب يشبه ما يطلبه عادة، بوقت توصيله وتقييمه. اقتراح واحد لا قائمة، لأن القائمة هي المشكلة أصلاً.",
      scenarioEn:
        "One nearby restaurant similar to what they usually order, with its delivery time and rating. One suggestion, not a list - the list is the problem in the first place.",
      whyAr:
        "التصفّح الطويل بلا طلب إشارة شلل اختيار لا عدم رغبة. تضييق الخيارات إلى واحد هو الحل، وتوسيعها يزيد الشلل.",
      whyEn:
        "Long browsing without ordering signals choice paralysis rather than disinterest. Narrowing to one is the fix; widening makes it worse.",
      exampleAr: "٣ دقائق تصفّح بلا طلب ← «مشويات الدانة، ٢٥ دقيقة، ٤٫٧» — اقتراح واحد.",
      exampleEn: "3 minutes browsing with no order → \"Al-Dana Grills, 25 minutes, 4.7\" - one suggestion.",
    },
    {
      key: "peak-prep",
      titleAr: "أصناف سريعة التحضير في الذروة",
      titleEn: "Fast-prep items at peak",
      triggerAr: "المطعم في ذروته ووقت التحضير ارتفع.",
      triggerEn: "The restaurant is at peak and preparation time has risen.",
      scenarioAr:
        "تُرفع الأصناف سريعة التحضير في الترتيب وتُخفض البطيئة. الاقتراح هنا يخدم وقت التوصيل لا قيمة السلة.",
      scenarioEn:
        "Fast-prep items move up the ranking and slow ones move down. The suggestion here serves delivery time rather than basket value.",
      whyAr:
        "التقييم في تطبيقات التوصيل يتبع الوقت لا الطعم. اقتراح صنف بطيء في الذروة يكسب ريالاً ويخسر نجمة.",
      whyEn:
        "Ratings in delivery apps follow time rather than taste. Suggesting a slow item at peak earns a riyal and loses a star.",
      exampleAr: "٨:٣٠ م والمطبخ مزدحم ← تُقترح السندويتشات لا المشاوي.",
      exampleEn: "8:30pm with a busy kitchen → sandwiches are suggested, not grills.",
    },
  ],
};
