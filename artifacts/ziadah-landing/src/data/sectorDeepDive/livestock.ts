import type { SectorDeepDive } from "../sectorDeepDive";

export const livestockDeepDive: SectorDeepDive = {
  slug: "livestock",
  introAr:
    "الذبائح قطاع موسمي حاد ولوجستي صعب: معظم الطلب في أيام معدودة من السنة، والمنتج حي لا يُخزَّن، والتسليم مرتبط بموعد لا بشحنة. والمشتري يهمّه أمران قبل السعر: أن تكون الذبيحة كما وُصفت، وأن تصل في وقتها بالضبط. كل لحظة أدناه تخدم أحد هذين.",
  introEn:
    "Livestock is sharply seasonal and logistically hard: most of the year's demand falls in a handful of days, the product is alive and cannot be stocked, and delivery is tied to an appointment rather than a shipment. And the buyer cares about two things before price: that the animal is as described, and that it arrives exactly on time. Every moment below serves one of those two.",
  useCases: [
    {
      key: "processing-options",
      titleAr: "التقطيع والتجهيز مع الطلب",
      titleEn: "Cutting and preparation with the order",
      triggerAr: "العميل اختار ذبيحة.",
      triggerEn: "The customer selects an animal.",
      scenarioAr:
        "تُعرض خيارات التجهيز بوضوح: تقطيع، فرم، تغليف بأكياس مفرزة، توزيع على عناوين. كلها خدمات مسعّرة لا افتراضات.",
      scenarioEn:
        "Preparation options are laid out plainly: cutting, mincing, portioned vacuum packing, splitting across addresses. All priced services rather than assumptions.",
      whyAr:
        "التجهيز هو الهامش الحقيقي في هذا القطاع لأن سعر الذبيحة نفسها شبه معلوم للجميع. وهو أيضاً ما يوفّر على العميل يوماً كاملاً.",
      whyEn:
        "Preparation is the real margin here, because the animal's own price is broadly known to everyone. It also saves the customer an entire day.",
      exampleAr: "خروف نعيمي ← «تقطيع ٨٠، فرم الربع ٤٠، تغليف مفرز ٦٠».",
      exampleEn: "A Naimi sheep → \"Cutting 80, mincing a quarter 40, portioned packing 60\".",
          widget: {
        titleAr: "التجهيز",
        titleEn: "Preparation",
        mainAr: "خروف نعيمي",
        mainEn: "Naimi sheep",
        mainPrice: "1450",
        suggest: [
          { ar: "تقطيع", en: "Cutting", price: "80" },
          { ar: "فرم الربع", en: "Mincing a quarter", price: "40" },
          { ar: "تغليف مفرز", en: "Portioned packing", price: "60" },
        ],
        ctaAr: "أضف التجهيز",
        ctaEn: "Add preparation",
      },
    },
    {
      key: "occasion-timing",
      titleAr: "الحجز قبل الموسم لا فيه",
      titleEn: "Booking before the season, not during it",
      triggerAr: "اقترب موسم أضاحي أو عقيقة أو وليمة.",
      triggerEn: "An Eid, aqiqah or banquet season approaches.",
      scenarioAr:
        "يُعرض الحجز المبكر بسعر مثبّت وموعد تسليم مضمون. من يحجز في اليوم نفسه يدفع أكثر وقد لا يجد.",
      scenarioEn:
        "Early booking is offered with a locked price and a guaranteed slot. Whoever books on the day pays more and may find nothing.",
      whyAr:
        "الطاقة الاستيعابية في الموسم محدودة فعلاً. الحجز المبكر يوزّع الطلب على أيام بدل ساعات، وهو فرق بين موسم ناجح وموسم فوضوي.",
      whyEn:
        "Capacity in season is genuinely finite. Early booking spreads demand across days instead of hours, which is the difference between a good season and a chaotic one.",
      exampleAr: "قبل العيد بشهر ← «احجز الآن بسعر اليوم وموعد تسليم مؤكد».",
      exampleEn: "A month before Eid → \"Book now at today's price with a confirmed slot\".",
          widget: {
        titleAr: "احجز مبكراً",
        titleEn: "Book early",
        mainAr: "قبل العيد بشهر",
        mainEn: "A month before Eid",
        mainPrice: "—",
        suggest: [
          { ar: "سعر اليوم مثبّت + موعد مؤكد", en: "Today's price locked + a confirmed slot", price: "1450" },
        ],
        ctaAr: "احجز الآن",
        ctaEn: "Book now",
      },
    },
    {
      key: "size-guidance",
      titleAr: "الحجم بعدد الضيوف لا بالكيلو",
      titleEn: "Size by guest count, not by kilos",
      triggerAr: "العميل يتردّد بين حجمين.",
      triggerEn: "The customer hesitates between two sizes.",
      scenarioAr:
        "يُترجم الوزن إلى عدد أشخاص: «هذا يكفي ١٢-١٥ شخصاً». العميل يعرف عدد ضيوفه ولا يعرف كم كيلو يحتاجون.",
      scenarioEn:
        "Weight is translated into people: \"This serves 12-15\". The customer knows how many guests are coming and not how many kilos that is.",
      whyAr:
        "الترجمة إلى عدد الضيوف ترفع الحجم المختار غالباً، وتمنع الإحراج الذي لا يُنسى حين لا يكفي الطعام في وليمة.",
      whyEn:
        "Translating into guest count usually raises the size chosen, and prevents the kind of embarrassment nobody forgets when the food runs out at a banquet.",
      exampleAr: "٢٥ كجم ← «يكفي ١٢-١٥ شخصاً»، و٣٥ كجم ← «١٨-٢٢ شخصاً».",
      exampleEn: "25kg → \"Serves 12-15\", and 35kg → \"Serves 18-22\".",
          widget: {
        titleAr: "كم شخصاً؟",
        titleEn: "How many people?",
        mainAr: "ذبيحة 25 كجم",
        mainEn: "A 25kg animal",
        mainPrice: "1450",
        hintAr: "الـ25 يكفي 12-15 شخصاً",
        hintEn: "25kg serves 12-15",
        suggest: [
          { ar: "35 كجم — يكفي 18-22 شخصاً", en: "35kg - serves 18-22", price: "1950" },
        ],
        ctaAr: "خذ الأكبر",
        ctaEn: "Take the bigger one",
      },
    },
    {
      key: "delivery-slot",
      titleAr: "موعد التسليم لا يوم التسليم",
      titleEn: "A delivery time, not a delivery day",
      triggerAr: "العميل في خطوة تحديد التسليم.",
      triggerEn: "The customer is at the delivery step.",
      scenarioAr:
        "تُعرض فترات محددة بساعتين لا «خلال اليوم». اللحم الطازج يحتاج شخصاً في البيت، والموعد الغامض يفسد الطلب حرفياً.",
      scenarioEn:
        "Two-hour windows are offered rather than \"sometime today\". Fresh meat needs someone home, and a vague window spoils the order literally.",
      whyAr:
        "هذا القطاع لا يحتمل تسليماً فاشلاً: لا يمكن إعادة المحاولة غداً. دقة الموعد ليست رفاهية بل شرط عمل.",
      whyEn:
        "This sector cannot absorb a failed delivery: there is no trying again tomorrow. Precision is not a nicety here, it is an operating requirement.",
      exampleAr: "«الخميس ٤-٦ م» بدل «الخميس»، مع تأكيد قبل ساعة.",
      exampleEn: "\"Thursday 4-6pm\" instead of \"Thursday\", with a confirmation an hour ahead.",
          widget: {
        titleAr: "موعد التسليم",
        titleEn: "Delivery window",
        mainAr: "الخميس",
        mainEn: "Thursday",
        mainPrice: "—",
        suggest: [
          { ar: "الخميس 4-6 م — مع تأكيد قبل ساعة", en: "Thursday 4-6pm - confirmed an hour ahead", price: "—" },
        ],
        ctaAr: "أكّد الموعد",
        ctaEn: "Confirm the window",
      },
    },
    {
      key: "charity-share",
      titleAr: "التوزيع والصدقة مع الطلب",
      titleEn: "Distribution and charity with the order",
      triggerAr: "الطلب في موسم أضاحي أو عقيقة.",
      triggerEn: "The order falls in an Eid or aqiqah season.",
      scenarioAr:
        "يُعرض توزيع حصة على جهة خيرية باسم العميل مع إثبات. نمط راسخ يحتاج تسهيلاً لا إقناعاً.",
      scenarioEn:
        "Distributing a share to a charity in the customer's name, with proof, is offered. A long-established practice that needs facilitation rather than persuasion.",
      whyAr:
        "كثير من الطلبات يُراد بها التوزيع أصلاً، والعميل يتولاه بنفسه بعناء. تولّيه عنه يرفع قيمة الطلب ويوفّر عليه يوماً.",
      whyEn:
        "Many orders are meant for distribution anyway, and the customer handles it themselves with effort. Handling it for them raises the order and saves them a day.",
      exampleAr: "أضحية ← «وزّع الثلث على جهة خيرية باسمك، ٥٠ ر.س مع إثبات».",
      exampleEn: "An Eid sacrifice → \"Distribute a third to a charity in your name, 50 SAR, with proof\".",
          widget: {
        titleAr: "وزّع حصة",
        titleEn: "Distribute a share",
        mainAr: "أضحية",
        mainEn: "An Eid sacrifice",
        mainPrice: "1450",
        suggest: [
          { ar: "وزّع الثلث باسمك مع إثبات", en: "A third in your name, with proof", price: "50" },
        ],
        ctaAr: "أضف التوزيع",
        ctaEn: "Add distribution",
      },
    },
    {
      key: "repeat-occasion",
      titleAr: "المناسبة السنوية في موعدها",
      titleEn: "The annual occasion, on schedule",
      triggerAr: "اقترب موعد مناسبة طلب فيها العميل العام الماضي.",
      triggerEn: "An occasion the customer ordered for last year is approaching.",
      scenarioAr:
        "تذكير بنفس الطلب السابق بلمسة واحدة: نفس النوع ونفس التجهيز ونفس العنوان. لا يحتاج إعادة اختيار.",
      scenarioEn:
        "A one-tap reminder of last year's order: same type, same preparation, same address. Nothing to re-choose.",
      whyAr:
        "طلبات هذا القطاع سنوية ومتطابقة تقريباً. إعادة الطلب بلمسة تلغي المنافسة لأن العميل لا يصل إلى مرحلة المقارنة.",
      whyEn:
        "Orders here are annual and near-identical. A one-tap repeat removes the competition, because the customer never reaches the comparison stage.",
      exampleAr: "طلب عيد الأضحى الماضي ← «نفس الطلب: نعيمي ٣٠ كجم، مقطّع، نفس العنوان».",
      exampleEn: "Last Eid al-Adha's order → \"The same again: 30kg Naimi, cut, same address\".",
          widget: {
        titleAr: "نفس طلبك",
        titleEn: "The same again",
        mainAr: "عيد الأضحى الماضي: نعيمي 30 كجم، مقطّع",
        mainEn: "Last Eid: 30kg Naimi, cut",
        mainPrice: "1530",
        suggest: [
          { ar: "نفس النوع ونفس التجهيز ونفس العنوان", en: "Same type, same preparation, same address", price: "1530" },
        ],
        ctaAr: "أعد الطلب",
        ctaEn: "Reorder",
      },
    },
  ],
};
