import type { SectorDeepDive } from "../sectorDeepDive";

/**
 * A charity has no margin, no basket and no customer. It has a DONOR, and the
 * only two numbers that matter are whether they give again and whether they
 * give monthly. So "raising order value" here means raising a single gift
 * into a recurring one, and every moment below is written to respect a donor
 * rather than convert a shopper: no urgency theatre, no guilt, no inflated
 * impact claims - a charity that pushes too hard loses the donor for life.
 */
export const charitiesDeepDive: SectorDeepDive = {
  slug: "charities",
  introAr:
    "الجمعية ليس لها هامش ولا سلة ولا عميل. لها متبرّع، ورقمان فقط يهمّان: هل يتبرّع مرة أخرى، وهل يتحول إلى تبرّع شهري. لذلك «رفع قيمة الطلب» هنا يعني تحويل تبرّع واحد إلى متكرر، وكل لحظة أدناه مكتوبة لتحترم متبرّعاً لا لتحوّل مشترياً: بلا استعجال مصطنع، وبلا استدرار شفقة، وبلا مبالغة في الأثر. الجمعية التي تضغط تخسر المتبرّع مدى الحياة لا هذه المرة فقط.",
  introEn:
    "A charity has no margin, no basket and no customer. It has a donor, and only two numbers matter: whether they give again, and whether they move to monthly. So \"raising order value\" here means turning a single gift into a recurring one, and every moment below is written to respect a donor rather than convert a shopper - no manufactured urgency, no guilt, no inflated impact claims. A charity that pushes too hard loses the donor for life, not just this gift.",
  useCases: [
    {
      key: "one-off-to-monthly",
      titleAr: "من تبرّع واحد إلى شهري",
      titleEn: "From one gift to monthly",
      triggerAr: "المتبرّع أتمّ تبرّعاً لمرة واحدة.",
      triggerEn: "The donor completes a one-off gift.",
      scenarioAr:
        "بعد الشكر لا قبله، يُعرض تحويل المبلغ نفسه إلى شهري مع أثره التراكمي: «٢٠٠ شهرياً = كفالة طالب سنة كاملة». الرقم نفسه، أفق مختلف.",
      scenarioEn:
        "After the thank-you, never before it, the same amount is offered as monthly with its cumulative effect: \"200 a month covers a student for a full year\". Same figure, different horizon.",
      whyAr:
        "المتبرّع الشهري يساوي أضعاف المتبرّع العارض، واللحظة الوحيدة التي يكون فيها مستعداً للالتزام هي بعد تبرّع أتمّه للتو وهو راضٍ عنه.",
      whyEn:
        "A monthly donor is worth many times an occasional one, and the only moment they are open to committing is right after a gift they have just made and feel good about.",
      exampleAr: "تبرّع ٢٠٠ ر.س ← «اجعله شهرياً: ٢٠٠ × ١٢ يكفل طالباً سنة كاملة».",
      exampleEn: "A 200 SAR gift → \"Make it monthly: 200 × 12 covers one student for a year\".",
    },
    {
      key: "completion-gap",
      titleAr: "إكمال مشروع قارب على الاكتمال",
      titleEn: "Completing a project that is nearly there",
      triggerAr: "المتبرّع يتصفّح مشروعاً بلغ ٩٠٪ من هدفه.",
      triggerEn: "The donor is viewing a project that has reached 90% of its goal.",
      scenarioAr:
        "يُعرض المبلغ المتبقي بالضبط: «باقي ٤٠٠ ر.س ويكتمل حفر البئر». التبرّع الذي يُكمل مشروعاً له أثر نفسي أكبر من تبرّع يُضاف إلى صندوق مفتوح.",
      scenarioEn:
        "The exact remaining amount is shown: \"400 SAR left and the well is complete\". A gift that finishes something lands differently from a gift added to an open fund.",
      whyAr:
        "«أتممت مشروعاً» شعور يختلف تماماً عن «ساهمت في صندوق». الرقم المحدد والنهاية المرئية هما ما يحوّل التصفّح إلى تبرّع.",
      whyEn:
        "\"I finished something\" is a different feeling from \"I contributed to a fund\". A specific figure and a visible finish line are what turn browsing into giving.",
      exampleAr: "بئر بلغت ١١٬٦٠٠ من ١٢٬٠٠٠ ← «أتمّها بـ٤٠٠ ر.س».",
      exampleEn: "A well at 11,600 of 12,000 → \"Finish it with 400 SAR\".",
    },
    {
      key: "zakat-season",
      titleAr: "موسم الزكاة ورمضان",
      titleEn: "Zakat season and Ramadan",
      triggerAr: "المتبرّع يزور الموقع في رمضان أو قرب موعد زكاته.",
      triggerEn: "The donor visits during Ramadan or near their zakat due date.",
      scenarioAr:
        "تتصدّر المشاريع المستحقة للزكاة، وتُعرض حاسبة الزكاة قبل قائمة المشاريع. المتبرّع في رمضان يبحث عن قناة صحيحة لا عن إقناع.",
      scenarioEn:
        "Zakat-eligible projects come first, and the zakat calculator appears before the project list. A donor in Ramadan is looking for the right channel, not for persuasion.",
      whyAr:
        "معظم تبرّعات السنة تقع في شهر واحد. الجمعية التي تعرض في رمضان نفس ترتيب بقية السنة تضيّع الموسم الذي يمولها.",
      whyEn:
        "Most of the year's giving happens in one month. A charity that shows the same ordering in Ramadan as in March wastes the season that funds it.",
      exampleAr: "زيارة في رمضان ← حاسبة الزكاة أولاً، ثم المشاريع المستحقة مرتّبة بالقرب من الاكتمال.",
      exampleEn: "A Ramadan visit → the zakat calculator first, then eligible projects ordered by how close they are to completion.",
    },
    {
      key: "impact-report",
      titleAr: "أثر تبرّعك السابق قبل طلب التالي",
      titleEn: "What your last gift did, before asking for the next",
      triggerAr: "مضى على تبرّع سابق وقت كافٍ ليظهر أثره.",
      triggerEn: "Enough time has passed on a previous gift for its effect to be visible.",
      scenarioAr:
        "تصل رسالة أثر أولاً بلا طلب فيها إطلاقاً: «بئرك تعمل منذ ثلاثة أشهر، تخدم ٤٠ أسرة». طلب التبرّع التالي يأتي في رسالة منفصلة لاحقاً.",
      scenarioEn:
        "An impact message arrives first with no ask in it at all: \"Your well has been running three months, serving 40 families\". The next ask comes in a separate message later.",
      whyAr:
        "الجمعية التي لا تخبر المتبرّع بما حدث بتبرّعه تطلب منه أن يثق مرتين. إظهار الأثر أولاً هو ما يجعل الطلب الثاني مقبولاً.",
      whyEn:
        "A charity that never tells a donor what happened is asking them to trust twice. Showing the effect first is what makes the second ask welcome.",
      exampleAr: "تبرّع بئر في يناير ← أبريل: «بئرك تعمل، ٤٠ أسرة» بلا أي طلب.",
      exampleEn: "A well funded in January → April: \"Your well is running, 40 families\", with no ask attached.",
    },
    {
      key: "amount-ladder",
      titleAr: "سلّم المبالغ بالأثر لا بالرقم",
      titleEn: "The amount ladder, by effect rather than by figure",
      triggerAr: "المتبرّع في شاشة اختيار المبلغ.",
      triggerEn: "The donor is on the amount screen.",
      scenarioAr:
        "كل مبلغ مكتوب بما يفعله لا برقمه وحده: «١٠٠ = سلة غذائية لأسرة، ٣٠٠ = ثلاث أسر، ٥٠٠ = أسرة شهراً كاملاً». الترتيب يبدأ من المتوسط لا من الأعلى.",
      scenarioEn:
        "Every amount is written as what it does rather than as a figure alone: \"100 = a food basket for a family, 300 = three families, 500 = one family for a whole month\". The ladder starts from the middle, not the top.",
      whyAr:
        "المبلغ المجرّد يُقارن بالميزانية، والمبلغ المترجم إلى أثر يُقارن بالأثر. والبدء بالأعلى يقرأ كضغط ويخفض المتوسط بدل أن يرفعه.",
      whyEn:
        "A bare figure is compared against a budget; a figure translated into effect is compared against the effect. And leading with the highest amount reads as pressure and lowers the average rather than raising it.",
      exampleAr: "١٠٠ سلة غذائية · ٣٠٠ ثلاث أسر · ٥٠٠ أسرة شهراً — الافتراضي ٣٠٠.",
      exampleEn: "100 one basket · 300 three families · 500 a family for a month - with 300 preselected.",
    },
    {
      key: "recurring-recovery",
      titleAr: "استعادة تبرّع شهري توقّف",
      titleEn: "Recovering a lapsed monthly gift",
      triggerAr: "فشلت عملية خصم شهرية أو انتهت صلاحية البطاقة.",
      triggerEn: "A monthly charge fails, or the card expires.",
      scenarioAr:
        "رسالة تشغيلية هادئة بلا لوم: «بطاقتك انتهت، تبرّعك الشهري متوقف» مع رابط تحديث واحد. لا استدرار ولا تذكير بالأثر الضائع.",
      scenarioEn:
        "A calm operational message with no blame: \"Your card expired, the monthly gift is paused\", and one link to update it. No guilt, no reminder of what was lost.",
      whyAr:
        "معظم انقطاع التبرّع الشهري سببه تقني لا قرار. معاملته كقرار — برسائل عاطفية — تحوّل مشكلة بطاقة إلى انسحاب حقيقي.",
      whyEn:
        "Most lapsed monthly giving is technical, not a decision. Treating it as a decision, with emotional messaging, turns a card problem into a real withdrawal.",
      exampleAr: "فشل خصم ١ مايو ← رسالة واحدة بلا لوم ورابط تحديث البطاقة.",
      exampleEn: "A failed charge on 1 May → one blame-free message and a link to update the card.",
    },
    {
      key: "cause-match",
      titleAr: "مشروع من نفس القضية لا من كل القضايا",
      titleEn: "A project in the same cause, not from all of them",
      triggerAr: "المتبرّع تبرّع سابقاً لمشاريع تعليم.",
      triggerEn: "The donor has previously given to education projects.",
      scenarioAr:
        "تُعرض عليه مشاريع التعليم أولاً لا كل ما في الجمعية. المتبرّع يختار قضية لا جمعية، واقتراح قضية أخرى عليه يبدو كأن أحداً لم ينتبه لما اختاره.",
      scenarioEn:
        "Education projects come first, not everything the charity runs. A donor picks a cause rather than an organisation, and suggesting a different one reads as nobody having noticed what they chose.",
      whyAr:
        "لكل متبرّع قضية يعود إليها. احترام ذلك الاختيار يرفع معدل التبرّع الثاني أكثر من أي صياغة في نص الطلب.",
      whyEn:
        "Every donor has a cause they return to. Respecting that choice lifts second-gift rates more than any rewording of the ask.",
      exampleAr: "تبرّع سابق لكفالة طالب ← أولاً: مشاريع تعليم. لا إغاثة ولا مساجد.",
      exampleEn: "A previous student sponsorship → education projects first. Not relief, not mosques.",
    },
    {
      key: "gift-on-behalf",
      titleAr: "التبرّع صدقةً عن شخص",
      titleEn: "Giving on behalf of someone",
      triggerAr: "الموسم مناسبة، أو المتبرّع اختار الإهداء.",
      triggerEn: "It is an occasion season, or the donor chooses to dedicate the gift.",
      scenarioAr:
        "خيار «صدقة عن» مع بطاقة تُرسل للمُهدى إليه أو لأهله. نوع تبرّع مختلف كلياً: مناسبته مناسبة اجتماعية لا حملة.",
      scenarioEn:
        "A \"on behalf of\" option with a card sent to the recipient or their family. An entirely different kind of gift: its occasion is a social one, not a campaign.",
      whyAr:
        "الصدقة عن الوالدين أو عن متوفٍّ نمط راسخ في السعودية وقناة تبرّع لا تنافس القنوات الأخرى بل تضاف إليها.",
      whyEn:
        "Giving on behalf of parents or of someone who has passed is a deeply established pattern here, and a channel that adds to the others rather than competing with them.",
      exampleAr: "«صدقة جارية عن والدي» ← بطاقة باسمه تُرسل للعائلة.",
      exampleEn: "\"An ongoing charity on behalf of my father\" → a card in his name sent to the family.",
    },
  ],
};
