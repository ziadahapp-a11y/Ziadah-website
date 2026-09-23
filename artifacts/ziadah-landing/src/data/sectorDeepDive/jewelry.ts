import type { SectorDeepDive } from "../sectorDeepDive";

export const jewelryDeepDive: SectorDeepDive = {
  slug: "jewelry",
  introAr:
    "المجوهرات تُشترى لمناسبة، وغالباً لشخص آخر. المشتري هنا قلق: لا يعرف المقاس، ولا يعرف إن كان الذوق سيعجب، والمبلغ كبير بما يكفي ليؤجّل القرار. لذلك أنجح اللحظات هنا ليست التي تضيف قطعة بل التي تزيل قلقاً: مقاس مضمون، تغليف يليق، وإرجاع واضح.",
  introEn:
    "Jewellery is bought for an occasion, and usually for somebody else. The buyer is anxious: they do not know the size, they do not know whether the taste will land, and the amount is large enough to postpone the decision. So the moments that work best here are not the ones adding a piece - they are the ones removing an anxiety: a guaranteed size, packaging that fits the occasion, and a clear return.",
  useCases: [
    {
      key: "matching-set",
      titleAr: "إكمال الطقم لا إضافة قطعة",
      titleEn: "Completing the set, not adding a piece",
      triggerAr: "العميل أضاف قلادة من تصميم له أقراط وسوار مطابقان.",
      triggerEn: "The customer adds a necklace from a design that has matching earrings and a bracelet.",
      scenarioAr:
        "يُعرض الطقم كاملاً بصورة واحدة تُظهر القطع معاً، مع سعر الطقم. رؤية القطع مجتمعة هي الحجة، لا الخصم.",
      scenarioEn:
        "The full set appears in a single image showing the pieces together, with a set price. Seeing them together is the argument, not the discount.",
      whyAr:
        "المجوهرات تُلبس كطقم لا كقطعة. العميل الذي يشتري قلادة وحدها سيبحث عن أقراط مطابقة لاحقاً، وغالباً في متجر آخر.",
      whyEn:
        "Jewellery is worn as a set, not as a piece. A customer buying a lone necklace will hunt for matching earrings later, usually somewhere else.",
      exampleAr: "قلادة ١٬٤٠٠ ← الطقم الكامل ٣٬٢٠٠ بدل ٣٬٧٥٠، بصورة واحدة تجمع الثلاث.",
      exampleEn: "A 1,400 necklace → the full set at 3,200 instead of 3,750, in one image with all three.",
    },
    {
      key: "size-anxiety",
      titleAr: "قلق المقاس: أزِله قبل الدفع",
      titleEn: "Size anxiety: remove it before checkout",
      triggerAr: "العميل يتردّد في صفحة خاتم أو سوار.",
      triggerEn: "The customer hesitates on a ring or bracelet page.",
      scenarioAr:
        "يُعرض دليل المقاسات وخدمة التعديل المجاني بوضوح، لا في صفحة سياسات بعيدة: «تعديل المقاس مجاناً خلال ٣٠ يوماً».",
      scenarioEn:
        "The size guide and free resizing are shown plainly, not buried in a policy page: \"Free resizing within 30 days\".",
      whyAr:
        "المقاس هو السبب الأول لترك سلة المجوهرات، وليس السعر. إزالة القلق تحوّل تردداً إلى طلب دون خصم ريال واحد.",
      whyEn:
        "Size, not price, is the number one reason a jewellery basket is abandoned. Removing the anxiety converts hesitation into an order without discounting a single riyal.",
      exampleAr: "صفحة خاتم ← «تعديل المقاس مجاناً ٣٠ يوماً» بجانب زر الشراء لا في السياسات.",
      exampleEn: "A ring page → \"Free resizing for 30 days\" beside the buy button, not in the policies.",
    },
    {
      key: "occasion-packaging",
      titleAr: "التغليف الذي يليق بالمناسبة",
      titleEn: "Packaging that matches the occasion",
      triggerAr: "الطلب هدية أو في موسم مناسبات.",
      triggerEn: "The order is a gift, or falls in an occasion season.",
      scenarioAr:
        "تُعرض علبة الإهداء والبطاقة المكتوبة بخط اليد كخيار واحد، لا كخيارين. لحظة الفتح جزء من المنتج في هذا القطاع.",
      scenarioEn:
        "The gift box and a handwritten card are offered as one option, not two. The moment of opening is part of the product in this sector.",
      whyAr:
        "من يدفع ثلاثة آلاف على قلادة لن يتردد في مئة على تغليف يليق، لكنه لن يبحث عنه بنفسه. عرضه في اللحظة الصحيحة هامش شبه كامل.",
      whyEn:
        "Someone spending three thousand on a necklace will not hesitate over a hundred for packaging that fits - but they will not go looking for it. Offering it at the right moment is near-pure margin.",
      exampleAr: "قلادة هدية ← علبة مخملية وبطاقة بخط اليد ١٢٠ ر.س، خيار واحد.",
      exampleEn: "A necklace as a gift → a velvet box and a handwritten card at 120 SAR, as one option.",
    },
    {
      key: "care-kit",
      titleAr: "العناية بالقطعة بعد الشراء",
      titleEn: "Caring for the piece after the purchase",
      triggerAr: "العميل اشترى قطعة فضية أو مرصّعة.",
      triggerEn: "The customer buys a silver or stone-set piece.",
      scenarioAr:
        "تُعرض أدوات العناية بوصفها تعليمات: «الفضة تتأكسد، قماشة التلميع تعيدها». معلومة أولاً ومنتج ثانياً.",
      scenarioEn:
        "Care tools are presented as instructions: \"Silver tarnishes; a polishing cloth brings it back\". Information first, product second.",
      whyAr:
        "القطعة التي تبهت بعد شهرين تصير شكوى في المتجر لا درساً في العناية. بيع أدوات العناية يحمي سمعة القطعة.",
      whyEn:
        "A piece that dulls after two months becomes a complaint about the store rather than a lesson in care. Selling the care kit protects the piece's reputation.",
      exampleAr: "سوار فضة ← «قماشة تلميع ٤٥ ر.س» مع سطر عن سبب التأكسد.",
      exampleEn: "A silver bracelet → \"A polishing cloth, 45 SAR\", with one line on why it tarnishes.",
    },
    {
      key: "occasion-calendar",
      titleAr: "المناسبة قبل موعدها بأسبوعين",
      titleEn: "The occasion, two weeks ahead",
      triggerAr: "اقترب موعد مناسبة اشترى فيها العميل سابقاً.",
      triggerEn: "An occasion on which the customer bought before is approaching.",
      scenarioAr:
        "تذكير قبل وقت كافٍ للشحن والتعديل: «ذكرى زواجك بعد أسبوعين». الشراء المتأخر في المجوهرات مستحيل، فالتوقيت هو الخدمة.",
      scenarioEn:
        "A reminder with enough lead time for shipping and resizing: \"Your anniversary is in two weeks\". Late buying is impossible in jewellery, so timing is the service.",
      whyAr:
        "من اشترى لمناسبة سنوية سيشتري لها مجدداً، والمتجر الذي يذكّره قبل المحل المجاور يكسب الطلب كله.",
      whyEn:
        "Someone who bought for an annual occasion will buy again, and the store that reminds them before the shop next door wins the whole order.",
      exampleAr: "اشترى في ١٢ مارس العام الماضي ← تذكير في ٢٦ فبراير مع القطع المشابهة.",
      exampleEn: "Bought on 12 March last year → a reminder on 26 February with similar pieces.",
    },
    {
      key: "trade-up",
      titleAr: "الترقية بفرق مفهوم",
      titleEn: "Trading up on a difference you can see",
      triggerAr: "العميل يقارن بين قطعتين متقاربتين.",
      triggerEn: "The customer is comparing two close pieces.",
      scenarioAr:
        "يُشرح الفرق بما يُرى لا بمصطلح: «حجر أكبر بنصف قيراط، وفرق ٦٠٠ ر.س»، لا «نقاء VS1 بدل SI2».",
      scenarioEn:
        "The difference is explained in what can be seen rather than in jargon: \"Half a carat bigger, 600 SAR apart\", not \"VS1 clarity instead of SI2\".",
      whyAr:
        "مصطلحات الجودة لا تعني شيئاً لغير المتخصص، وتجعله يؤجّل القرار. ترجمتها إلى فرق مرئي هي ما يحسم.",
      whyEn:
        "Quality jargon means nothing to a non-specialist and makes them postpone. Translating it into a visible difference is what closes.",
      exampleAr: "خاتم ٤٬٢٠٠ ← «نفس التصميم بحجر أكبر، +٦٠٠» مع صورة مقارنة بالحجم الحقيقي.",
      exampleEn: "A 4,200 ring → \"Same design, larger stone, +600\", with a true-size comparison image.",
    },
  ],
};
