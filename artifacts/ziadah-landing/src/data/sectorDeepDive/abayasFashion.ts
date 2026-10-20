import type { SectorDeepDive } from "../sectorDeepDive";

export const abayasFashionDeepDive: SectorDeepDive = {
  slug: "abayas-fashion",
  introAr:
    "الأزياء قطاع الإرجاع فيه أعلى من أي قطاع آخر، وسببه واحد غالباً: المقاس. والعميلة هنا لا تشتري قطعة بل إطلالة — العباية وحدها ليست إطلالة، والطرحة والحقيبة هما ما يكملانها. لذلك اللحظات أدناه تخدم هدفين معاً: رفع السلة، وخفض الإرجاع الذي يأكل ربح السلة المرفوعة.",
  introEn:
    "Fashion has the highest return rate of any sector, and usually one cause: size. And the customer here is not buying a piece, she is buying a look - an abaya alone is not a look; the scarf and the bag are what complete it. So the moments below serve two goals at once: raising the basket, and cutting the returns that eat the margin on the basket you just raised.",
  useCases: [
    {
      key: "complete-the-look",
      titleAr: "الإطلالة كاملة لا القطعة وحدها",
      titleEn: "The whole look, not the single piece",
      triggerAr: "العميلة أضافت عباية للسلة.",
      triggerEn: "The customer adds an abaya to the cart.",
      scenarioAr:
        "تُعرض الطرحة والحقيبة كما نُسّقتا في صورة المنتج نفسها، لا كمنتجات منفصلة. العميلة أعجبتها الصورة كاملة فبيعوا لها الصورة.",
      scenarioEn:
        "The scarf and the bag appear exactly as styled in the product photo itself, not as separate products. She liked the whole image, so sell her the image.",
      whyAr:
        "صورة المنتج هي الإعلان. عرض القطع التي فيها بالضبط يحوّل الإعجاب بالصورة إلى طلب، بينما عرض «منتجات ذات صلة» يعيدها للتصفّح.",
      whyEn:
        "The product photo is the advert. Offering exactly the pieces in it turns liking the image into an order, whereas \"related products\" sends her back to browsing.",
      exampleAr: "عباية ٤٥٠ ← «الطرحة والحقيبة من نفس الصورة، ٢٢٠ للاثنتين».",
      exampleEn: "A 450 abaya → \"The scarf and bag from the same photo, 220 for both\".",
          widget: {
        titleAr: "الإطلالة كاملة",
        titleEn: "The whole look",
        mainAr: "عباية كريب",
        mainEn: "Crepe abaya",
        mainPrice: "450",
        suggest: [
          { ar: "طرحة من نفس الصورة", en: "The scarf from the photo", price: "120" },
          { ar: "حقيبة من نفس الصورة", en: "The bag from the photo", price: "100" },
        ],
        ctaAr: "خذي الإطلالة بـ220",
        ctaEn: "Take the look for 220",
      },
    },
    {
      key: "size-confidence",
      titleAr: "المقاس الصحيح قبل الطلب",
      titleEn: "The right size before the order",
      triggerAr: "العميلة تتردّد بين مقاسين.",
      triggerEn: "The customer hesitates between two sizes.",
      scenarioAr:
        "تُعرض قياسات القطعة الفعلية بالسنتيمتر ومقارنة بما اشترته سابقاً: «أصغر بمقاس من العباية التي طلبتِها في مارس».",
      scenarioEn:
        "The garment's real measurements in centimetres appear, compared with what she bought before: \"Runs one size smaller than the abaya you ordered in March\".",
      whyAr:
        "الإرجاع بسبب المقاس يكلف شحنتين وربح القطعة كله. سجل المشتريات يعرف مقاسها الحقيقي أفضل من جدول المقاسات.",
      whyEn:
        "A size return costs two shipments and the entire margin on the piece. Her purchase history knows her real size better than any size chart.",
      exampleAr: "تردّد بين M وL ← «طلبتِ M في مارس، هذه القطعة أصغر بمقاس، اختاري L».",
      exampleEn: "Hesitating between M and L → \"You ordered M in March; this runs smaller - take the L\".",
          widget: {
        titleAr: "مقاسك",
        titleEn: "Your size",
        mainAr: "عباية — تتردّدين بين M وL",
        mainEn: "Abaya - between M and L",
        mainPrice: "450",
        hintAr: "طلبتِ M في مارس",
        hintEn: "You ordered M in March",
        suggest: [
          { ar: "L — هذه القطعة أصغر بمقاس", en: "L - this one runs a size small", price: "450" },
        ],
        ctaAr: "اختاري L",
        ctaEn: "Choose L",
      },
    },
    {
      key: "seasonal-fabric",
      titleAr: "القماش بحسب الموسم",
      titleEn: "Fabric by season",
      triggerAr: "العميلة تتصفّح في موسم حار أو بارد.",
      triggerEn: "The customer browses in a hot or a cold season.",
      scenarioAr:
        "تتقدّم الأقمشة المناسبة للموسم في الترتيب: كريب خفيف في الصيف، ومبطّن في الشتاء. القطعة الجميلة في الموسم الخطأ تُرجَع.",
      scenarioEn:
        "Season-appropriate fabrics move up the ranking: light crepe in summer, lined in winter. A beautiful piece in the wrong season comes back.",
      whyAr:
        "الترتيب الموسمي يرفع التحويل ويخفض الإرجاع في آن. العميلة التي تستلم عباية ثقيلة في يوليو لن تلبسها ولو أعجبتها.",
      whyEn:
        "Seasonal ranking lifts conversion and cuts returns at the same time. A customer receiving a heavy abaya in July will not wear it however much she liked it.",
      exampleAr: "تصفّح في يوليو ← الكريب الخفيف أولاً، والمبطّن في آخر الصفحة.",
      exampleEn: "Browsing in July → light crepe first, lined pieces at the end of the page.",
          widget: {
        titleAr: "مناسبة لهذا الموسم",
        titleEn: "Right for this season",
        mainAr: "تصفّح في يوليو",
        mainEn: "Browsing in July",
        mainPrice: "—",
        hintAr: "الأقمشة الخفيفة أولاً",
        hintEn: "Light fabrics first",
        suggest: [
          { ar: "عباية كريب خفيف", en: "Light crepe abaya", price: "420" },
          { ar: "عباية شيفون", en: "Chiffon abaya", price: "390" },
        ],
        ctaAr: "شاهدي الكل",
        ctaEn: "See all",
      },
    },
    {
      key: "size-set",
      titleAr: "نفس التصميم بلون ثانٍ",
      titleEn: "The same design in a second colour",
      triggerAr: "العميلة اشترت قطعة سابقاً وعادت لنفس التصميم.",
      triggerEn: "The customer bought a piece before and returns to the same design.",
      scenarioAr:
        "يُعرض اللون الثاني من نفس التصميم بسعر مخفّض للقطعة الثانية. المقاس مجرّب أصلاً فالمخاطرة صفر والإرجاع شبه معدوم.",
      scenarioEn:
        "The second colour of the same design is offered at a reduced price for the second piece. The fit is already proven, so the risk is zero and returns are near nil.",
      whyAr:
        "أعلى سلة في الأزياء وأقل إرجاع فيها هما نفس الشيء: تصميم جرّبته العميلة ونجح. تكراره بلون ثانٍ ربح بلا مخاطرة.",
      whyEn:
        "The highest basket in fashion and the lowest return rate are the same thing: a design she has tried and that worked. Repeating it in another colour is margin with no risk.",
      exampleAr: "عباية سوداء اشتُريت ونجح مقاسها ← «نفس القصّة بالكحلي، الثانية بـ٢٠٪ أقل».",
      exampleEn: "A black abaya bought and fitting well → \"The same cut in navy, 20% off the second\".",
          widget: {
        titleAr: "بلون ثانٍ",
        titleEn: "In a second colour",
        mainAr: "عباية سوداء — نجح مقاسها",
        mainEn: "The black one - it fitted",
        mainPrice: "450",
        hintAr: "الثانية بـ20٪ أقل",
        hintEn: "20% off the second",
        suggest: [
          { ar: "نفس القصّة بالكحلي", en: "The same cut in navy", price: "360", was: "450" },
        ],
        ctaAr: "أضيفي الكحلي",
        ctaEn: "Add the navy",
      },
    },
    {
      key: "free-shipping-fashion",
      titleAr: "فجوة الشحن بإكسسوار لا بقطعة ثانية",
      titleEn: "Closing the shipping gap with an accessory, not a second garment",
      triggerAr: "السلة قريبة من حد الشحن المجاني.",
      triggerEn: "The cart is close to the free-shipping threshold.",
      scenarioAr:
        "يُقترح إكسسوار صغير يسدّ الفجوة — طرحة، حزام، بروش — لا عباية ثانية بضعف الفجوة. الإكسسوار لا يُرجَع تقريباً.",
      scenarioEn:
        "A small accessory closes the gap - a scarf, a belt, a brooch - rather than a second abaya worth twice the gap. Accessories are almost never returned.",
      whyAr:
        "دفع العميلة لقطعة ثانية كبيرة لسد فجوة شحن يرفع السلة اليوم ويرفع الإرجاع بعد أسبوع، والنتيجة خسارة صافية.",
      whyEn:
        "Pushing a second large garment to close a shipping gap raises the basket today and raises returns next week, which nets out negative.",
      exampleAr: "السلة ٣٨٠، الشحن المجاني ٤٠٠ ← طرحة ٤٥ لا عباية ٣٩٠.",
      exampleEn: "Cart at 380, free shipping at 400 → a 45 SAR scarf, not a 390 SAR abaya.",
          widget: {
        titleAr: "الشحن المجاني",
        titleEn: "Free shipping",
        mainAr: "سلتك",
        mainEn: "Your cart",
        mainPrice: "380",
        hintAr: "20 ر.س ويصير الشحن مجاناً",
        hintEn: "20 SAR to free shipping",
        suggest: [
          { ar: "طرحة", en: "A scarf", price: "45" },
          { ar: "حزام", en: "A belt", price: "55" },
        ],
        ctaAr: "أضيفي واحصلي على شحن مجاني",
        ctaEn: "Add and ship free",
      },
    },
    {
      key: "restock-alert",
      titleAr: "عودة المقاس النافد",
      titleEn: "When her size is back",
      triggerAr: "العميلة فتحت قطعة ومقاسها غير متوفر.",
      triggerEn: "The customer opens a piece and her size is out of stock.",
      scenarioAr:
        "يُعرض تنبيه عند التوفّر لمقاسها هي، ومعه قطعتان قريبتان بمقاسها متوفر الآن. لا تُترك أمام صفحة مسدودة.",
      scenarioEn:
        "An alert for her size specifically is offered, along with two close pieces available in her size right now. She is never left at a dead end.",
      whyAr:
        "الصفحة المسدودة تنهي الزيارة. تحويلها إلى خيارين متوفرين وتنبيه لاحق يحتفظ بالزيارة وبالعميلة معاً.",
      whyEn:
        "A dead-end page ends the visit. Turning it into two available options plus a later alert keeps both the visit and the customer.",
      exampleAr: "مقاس M نافد ← «نبّهيني عند التوفّر» + قطعتان بنفس القصّة متوفرتان بـM.",
      exampleEn: "M out of stock → \"Notify me\" + two pieces in the same cut available in M.",
          widget: {
        titleAr: "مقاسك نافد",
        titleEn: "Your size is out",
        mainAr: "عباية — M غير متوفر",
        mainEn: "Abaya - M out of stock",
        mainPrice: "—",
        suggest: [
          { ar: "نفس القصّة، متوفرة بـM", en: "The same cut, available in M", price: "430" },
          { ar: "قصّة قريبة، متوفرة بـM", en: "A close cut, available in M", price: "395" },
        ],
        ctaAr: "نبّهيني عند التوفّر",
        ctaEn: "Notify me when it's back",
      },
    },
  ],
};
