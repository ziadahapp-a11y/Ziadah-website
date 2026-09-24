import type { SectorDeepDive } from "../sectorDeepDive";

/**
 * A clinic does not sell products, it books time. The unit is the
 * APPOINTMENT, the constraint is the calendar, and the whole sector is
 * regulated: nothing here may read as a medical recommendation, and nothing
 * may promise an outcome. So the moments below suggest sessions, packages,
 * preparation and aftercare - never a diagnosis, never a treatment the
 * patient did not already ask about.
 */
export const clinicsDeepDive: SectorDeepDive = {
  slug: "clinics",
  introAr:
    "العيادة لا تبيع منتجاً بل تحجز وقتاً. الوحدة هنا موعد، والقيد تقويم لا مخزون، والقطاع منظّم: لا يجوز لأي اقتراح أن يقرأ كتوصية طبية ولا أن يعد بنتيجة. لذلك كل لحظة أدناه تقترح جلسة أو باقة أو تحضيراً أو متابعة — ولا تقترح تشخيصاً، ولا إجراءً لم يسأل عنه المراجع بنفسه.",
  introEn:
    "A clinic does not sell a product, it books time. The unit is an appointment, the constraint is a calendar rather than stock, and the sector is regulated: no suggestion may read as medical advice or promise an outcome. So every moment below suggests a session, a package, preparation or follow-up - never a diagnosis, and never a procedure the patient did not ask about themselves.",
  useCases: [
    {
      key: "package-vs-single",
      titleAr: "الباقة بدل الجلسة المفردة",
      titleEn: "The package instead of the single session",
      triggerAr: "المراجع يحجز جلسة واحدة من إجراء يحتاج عادة سلسلة.",
      triggerEn: "The patient books a single session of a procedure that normally needs a series.",
      scenarioAr:
        "تُعرض الباقة مع عدد الجلسات وسعر الجلسة داخلها: «٦ جلسات — الجلسة ٣٢٠ بدل ٤٥٠». لا وعد بنتيجة، رقم فقط.",
      scenarioEn:
        "The package appears with its session count and the per-session price inside it: \"6 sessions - 320 each instead of 450\". No outcome promised, just the arithmetic.",
      whyAr:
        "المراجع الذي يحجز جلسة واحدة من سلسلة سيحجز الباقي على أي حال أو ينقطع. الباقة تثبّت الالتزام وتملأ التقويم مقدماً، وهي أهم رقم في اقتصاد العيادة.",
      whyEn:
        "A patient booking one session of a series will either book the rest anyway or drop out. The package locks in the commitment and fills the calendar in advance, which is the number a clinic's economics turn on.",
      exampleAr: "جلسة ليزر ٤٥٠ ← باقة ٦ جلسات ١٩٢٠ (الجلسة ٣٢٠).",
      exampleEn: "One laser session at 450 → a 6-session package at 1920 (320 each).",
          widget: {
        titleAr: "باقة أم جلسة؟",
        titleEn: "Package or one session?",
        mainAr: "جلسة ليزر واحدة",
        mainEn: "One laser session",
        mainPrice: "450",
        hintAr: "توفير 780 ر.س",
        hintEn: "Saves 780 SAR",
        suggest: [
          { ar: "باقة 6 جلسات — الجلسة 320", en: "6-session package - 320 each", price: "1920" },
        ],
        ctaAr: "احجز الباقة",
        ctaEn: "Book the package",
      },
    },
    {
      key: "aftercare",
      titleAr: "منتجات ما بعد الجلسة",
      titleEn: "Aftercare products",
      triggerAr: "الجلسة انتهت والإجراء له متطلبات عناية معروفة.",
      triggerEn: "The session is done and the procedure has known aftercare requirements.",
      scenarioAr:
        "تُعرض مستلزمات ما بعد الجلسة المعتمدة في العيادة — واقٍ شمسي طبي، مرطّب مهدّئ — بوصفها جزءاً من التعليمات لا عرضاً تجارياً.",
      scenarioEn:
        "The clinic's own approved aftercare appears - a medical sunscreen, a calming moisturiser - framed as part of the instructions rather than as an offer.",
      whyAr:
        "العناية بعد الجلسة تحدد النتيجة فعلاً، والمراجع الذي يشتريها من صيدلية عشوائية قد يشتري الخطأ. البيع هنا يخدم النتيجة قبل أن يخدم الفاتورة.",
      whyEn:
        "Aftercare genuinely determines the result, and a patient who buys it from a random pharmacy may buy the wrong thing. Selling it here serves the outcome before it serves the bill.",
      exampleAr: "بعد جلسة تقشير ← واقٍ شمسي طبي ١٨٠ ومرطّب مهدّئ ١٤٠ ضمن تعليمات الخروج.",
      exampleEn: "After a peel → a 180 SAR medical sunscreen and a 140 SAR calming moisturiser, inside the discharge instructions.",
          widget: {
        titleAr: "تعليمات ما بعد الجلسة",
        titleEn: "After your session",
        mainAr: "جلسة تقشير — اكتملت",
        mainEn: "Peel session - done",
        mainPrice: "—",
        hintAr: "ضمن تعليمات الخروج",
        hintEn: "Part of your discharge instructions",
        suggest: [
          { ar: "واقٍ شمسي طبي", en: "Medical sunscreen", price: "180" },
          { ar: "مرطّب مهدّئ", en: "Calming moisturiser", price: "140" },
        ],
        ctaAr: "أضف للطلب",
        ctaEn: "Add to order",
      },
    },
    {
      key: "follow-up",
      titleAr: "موعد المتابعة قبل أن يغادر",
      titleEn: "The follow-up before they leave",
      triggerAr: "الجلسة انتهت والبروتوكول يقتضي متابعة بعد مدة معروفة.",
      triggerEn: "The session ends and the protocol calls for follow-up after a known interval.",
      scenarioAr:
        "يُقترح موعد المتابعة بتاريخه وهو ما زال في العيادة، لا برسالة بعد شهر. الحجز وهو حاضر أسهل عشر مرات من إعادة استقطابه.",
      scenarioEn:
        "The follow-up is offered with its date while they are still in the clinic, not in a message a month later. Booking while they are present is ten times easier than winning them back.",
      whyAr:
        "الفجوة بين الجلسة والمتابعة هي المكان الذي تخسر فيه العيادات المراجعين. سدّها لا يحتاج حملة تسويق بل اقتراحاً في اللحظة الصحيحة.",
      whyEn:
        "The gap between a session and its follow-up is where clinics lose patients. Closing it does not need a marketing campaign, just a suggestion at the right moment.",
      exampleAr: "جلسة اليوم ← «المتابعة بعد ٤ أسابيع، الثلاثاء ١٤ الساعة ٦ مساءً» بضغطة.",
      exampleEn: "Today's session → \"Follow-up in 4 weeks: Tuesday the 14th at 6pm\", in one tap.",
          widget: {
        titleAr: "موعد المتابعة",
        titleEn: "Your follow-up",
        mainAr: "جلسة اليوم — اكتملت",
        mainEn: "Today's session - done",
        mainPrice: "—",
        hintAr: "البروتوكول: بعد 4 أسابيع",
        hintEn: "Protocol: 4 weeks out",
        suggest: [
          { ar: "الثلاثاء 14، 6:00 م", en: "Tuesday the 14th, 6:00pm", price: "—" },
        ],
        ctaAr: "أكّد الموعد",
        ctaEn: "Confirm the slot",
      },
    },
    {
      key: "prep-instructions",
      titleAr: "تحضير ما قبل الموعد",
      titleEn: "Preparation before the appointment",
      triggerAr: "الحجز تم والإجراء له شروط تحضير.",
      triggerEn: "A booking is made for a procedure with preparation requirements.",
      scenarioAr:
        "تصل تعليمات التحضير قبل الموعد بوقت كافٍ، ومعها ما يلزم شراؤه إن لزم. الموعد الذي يُلغى لعدم التحضير خسارة مزدوجة: وقت ضائع في التقويم ومراجع محبط.",
      scenarioEn:
        "Preparation instructions arrive with enough lead time, with anything that needs buying alongside them. An appointment cancelled for lack of preparation is a double loss: a hole in the calendar and a frustrated patient.",
      whyAr:
        "الإلغاء في اللحظة الأخيرة أغلى مشكلة تشغيلية في العيادة، وأكثر أسبابه بساطة: المراجع لم يعرف ما عليه فعله قبل الحضور.",
      whyEn:
        "Last-minute cancellation is the most expensive operational problem a clinic has, and its commonest cause is the simplest: the patient did not know what to do beforehand.",
      exampleAr: "حجز يوم الخميس ← تذكير الثلاثاء بتعليمات التحضير وما يُشترى مسبقاً.",
      exampleEn: "A Thursday booking → a Tuesday reminder with the preparation steps and anything to buy first.",
          widget: {
        titleAr: "قبل موعدك",
        titleEn: "Before your appointment",
        mainAr: "موعد الخميس 5:00 م",
        mainEn: "Thursday 5:00pm",
        mainPrice: "—",
        hintAr: "تذكير قبل يومين",
        hintEn: "A reminder two days out",
        suggest: [
          { ar: "الامتناع عن الطعام 6 ساعات", en: "No food for 6 hours", price: "—" },
          { ar: "غسول مطهّر", en: "Antiseptic wash", price: "65" },
        ],
        ctaAr: "فهمت",
        ctaEn: "Got it",
      },
    },
    {
      key: "complementary-service",
      titleAr: "الخدمة المكمّلة في نفس الزيارة",
      titleEn: "The complementary service in the same visit",
      triggerAr: "المراجع يحجز خدمة لها خدمة مكمّلة شائعة.",
      triggerEn: "The patient books a service that commonly pairs with another.",
      scenarioAr:
        "يُعرض ضمّ الخدمة المكمّلة لنفس الزيارة مع توفير الوقت صريحاً: «في نفس الموعد، ٢٠ دقيقة إضافية». الوقت هنا حجة أقوى من السعر.",
      scenarioEn:
        "Adding the paired service to the same visit is offered with the time saving stated: \"In the same appointment, 20 minutes more\". Time is a stronger argument here than price.",
      whyAr:
        "كل زيارة إضافية تكلف المراجع مواصلات وإجازة من العمل. ضمّ خدمتين في زيارة يرفع قيمة الموعد ويخفض عبء المراجع في آن.",
      whyEn:
        "Every extra visit costs the patient travel and time off work. Combining two services in one visit raises the value of the appointment and lowers their burden at once.",
      exampleAr: "تنظيف أسنان ← «تبييض في نفس الموعد، ٤٠ دقيقة إضافية» بدل زيارة ثانية.",
      exampleEn: "A dental cleaning → \"Whitening in the same appointment, 40 minutes more\" instead of a second visit.",
          widget: {
        titleAr: "في نفس الموعد",
        titleEn: "In the same appointment",
        mainAr: "تنظيف أسنان",
        mainEn: "Dental cleaning",
        mainPrice: "350",
        hintAr: "يوفّر عليك زيارة ثانية",
        hintEn: "Saves you a second visit",
        suggest: [
          { ar: "تبييض — 40 دقيقة إضافية", en: "Whitening - 40 minutes more", price: "900" },
        ],
        ctaAr: "أضف للموعد",
        ctaEn: "Add to the appointment",
      },
    },
    {
      key: "seasonal-checkup",
      titleAr: "الفحص الدوري في وقته",
      titleEn: "The periodic check-up, on time",
      triggerAr: "مضى على آخر زيارة للمراجع المدة المعتادة بين الفحوص.",
      triggerEn: "The usual interval between check-ups has passed since the patient's last visit.",
      scenarioAr:
        "تذكير بالفحص الدوري بلغة محايدة: «مضى ستة أشهر على آخر تنظيف» — حقيقة لا نصيحة، والقرار للمراجع.",
      scenarioEn:
        "A neutral reminder: \"Six months since your last cleaning\" - a fact rather than advice, and the decision stays with the patient.",
      whyAr:
        "العيادة تعرف تاريخ آخر زيارة ولا أحد غيرها يعرفه. تحويل تلك المعرفة إلى تذكير في وقته هو أرخص مصدر مواعيد لدى أي عيادة.",
      whyEn:
        "The clinic knows the date of the last visit and nobody else does. Turning that into a timely reminder is the cheapest source of appointments any clinic has.",
      exampleAr: "آخر تنظيف في مارس ← تذكير في سبتمبر مع أقرب ثلاثة مواعيد متاحة.",
      exampleEn: "Last cleaning in March → a September reminder with the next three open slots.",
          widget: {
        titleAr: "فحصك الدوري",
        titleEn: "Your check-up",
        mainAr: "آخر تنظيف: مارس",
        mainEn: "Last cleaning: March",
        mainPrice: "—",
        hintAr: "مضى ستة أشهر",
        hintEn: "Six months have passed",
        suggest: [
          { ar: "الأحد 12، 4:00 م", en: "Sunday the 12th, 4:00pm", price: "—" },
          { ar: "الثلاثاء 14، 6:00 م", en: "Tuesday the 14th, 6:00pm", price: "—" },
        ],
        ctaAr: "احجز",
        ctaEn: "Book",
      },
    },
    {
      key: "family-slot",
      titleAr: "مواعيد العائلة في زيارة واحدة",
      titleEn: "The family's appointments in one visit",
      triggerAr: "المراجع حجز لنفسه وله أفراد عائلة مسجّلون.",
      triggerEn: "A patient books for themselves and has family members on file.",
      scenarioAr:
        "يُقترح حجز متتالٍ لأفراد العائلة في نفس الفترة، فتصير الزيارة واحدة بدل ثلاث. يُعرض للمسجّلين فقط وبموافقة مسبقة.",
      scenarioEn:
        "Back-to-back slots for family members in the same window are offered, turning three visits into one. Shown only for members already on file, and only with prior consent.",
      whyAr:
        "العائلة السعودية تنسّق زياراتها أصلاً، والعيادة التي لا تسهّل ذلك تدفع العائلة لتقسيم زياراتها بين عيادتين.",
      whyEn:
        "Families already coordinate their visits, and a clinic that does not make that easy pushes them to split between two clinics.",
      exampleAr: "حجز الأب الخميس ٥ م ← «الأبناء ٥:٣٠ و٦ م في نفس الزيارة؟»",
      exampleEn: "Father booked Thursday 5pm → \"The children at 5:30 and 6 in the same visit?\"",
          widget: {
        titleAr: "مواعيد العائلة",
        titleEn: "The family's slots",
        mainAr: "موعدك: الخميس 5:00 م",
        mainEn: "Yours: Thursday 5:00pm",
        mainPrice: "—",
        hintAr: "زيارة واحدة بدل ثلاث",
        hintEn: "One visit instead of three",
        suggest: [
          { ar: "عبدالله — 5:30 م", en: "Abdullah - 5:30pm", price: "—" },
          { ar: "سارة — 6:00 م", en: "Sara - 6:00pm", price: "—" },
        ],
        ctaAr: "احجز الثلاثة",
        ctaEn: "Book all three",
      },
    },
    {
      key: "no-show-recovery",
      titleAr: "استعادة الموعد الملغى",
      titleEn: "Recovering the cancelled slot",
      triggerAr: "موعد أُلغي أو لم يحضر صاحبه.",
      triggerEn: "An appointment is cancelled or missed.",
      scenarioAr:
        "يُعرض الموعد الشاغر فوراً على قائمة الانتظار لنفس الخدمة، ويُعرض على الملغي أقرب بديل. الفتحة تُملأ في دقائق بدل أن تضيع.",
      scenarioEn:
        "The freed slot is offered immediately to the waiting list for that service, and the person who cancelled is offered the nearest alternative. The hole is filled in minutes instead of being lost.",
      whyAr:
        "ساعة فارغة في تقويم العيادة تكلفة كاملة لا تُسترد: الطاقم حاضر والإيجار يجري. ملء الفتحة أهم من بيع أي شيء إضافي.",
      whyEn:
        "An empty hour in a clinic calendar is a full unrecoverable cost: the staff are there and the rent is running. Filling the hole matters more than selling anything extra.",
      exampleAr: "إلغاء موعد ٤ م ← عرض فوري على قائمة انتظار نفس الخدمة، ودُفع بديل للملغي.",
      exampleEn: "A 4pm cancellation → offered instantly to that service's waiting list, with an alternative pushed to the person who cancelled.",
          widget: {
        titleAr: "موعد شاغر",
        titleEn: "A slot just opened",
        mainAr: "اليوم 4:00 م — أُلغي",
        mainEn: "Today 4:00pm - cancelled",
        mainPrice: "—",
        hintAr: "أنت الأول في قائمة الانتظار",
        hintEn: "You are first on the waiting list",
        suggest: [
          { ar: "لك إن أردت، خلال 10 دقائق", en: "Yours if you want it, within 10 minutes", price: "—" },
        ],
        ctaAr: "احجزه",
        ctaEn: "Take it",
      },
    },
  ],
};
