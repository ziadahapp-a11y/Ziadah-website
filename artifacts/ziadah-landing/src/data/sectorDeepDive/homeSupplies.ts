import type { SectorDeepDive } from "../sectorDeepDive";

export const homeSuppliesDeepDive: SectorDeepDive = {
  slug: "home-supplies",
  introAr:
    "مستلزمات المنزل تُشترى على نمطين متعاكسين: مستهلكات تنفد بانتظام ويُعاد شراؤها بلا تفكير، وقطع أثاث تُشترى مرة كل سنوات بعد تردد طويل. الأول يعيش على التذكير في موعده، والثاني على إزالة الشك في المقاس واللون. خلطهما في اقتراح واحد يفشل في الاثنين.",
  introEn:
    "Home goods are bought on two opposite patterns: consumables that run out on a rhythm and are reordered without thinking, and furniture bought once every few years after long hesitation. The first lives on a timely reminder, the second on removing doubt about size and colour. Mixing them into one suggestion fails at both.",
  useCases: [
    {
      key: "room-set",
      titleAr: "القطعة داخل غرفتها",
      titleEn: "The piece inside its room",
      triggerAr: "العميل أضاف قطعة أثاث للسلة.",
      triggerEn: "The customer adds a furniture piece to the cart.",
      scenarioAr:
        "تُعرض القطع المكمّلة كما نُسّقت في صورة الغرفة نفسها: الطاولة الجانبية والسجادة والإضاءة التي في الصورة.",
      scenarioEn:
        "The complementary pieces appear as styled in the room photo itself: the side table, the rug and the lamp that were in the shot.",
      whyAr:
        "العميل أعجبته الغرفة لا الكنبة. بيع ما في الصورة يحوّل الإعجاب إلى طلب، وعرض «منتجات ذات صلة» يعيده للتصفّح.",
      whyEn:
        "The customer liked the room, not the sofa. Selling what is in the photo turns that into an order; \"related products\" sends them back to browsing.",
      exampleAr: "كنبة ٢٬٩٠٠ ← «السجادة والطاولة من نفس الصورة، ١٬١٥٠ للاثنتين».",
      exampleEn: "A 2,900 sofa → \"The rug and table from the same photo, 1,150 for both\".",
          widget: {
        titleAr: "الغرفة كاملة",
        titleEn: "The whole room",
        mainAr: "كنبة ثلاثية",
        mainEn: "Three-seat sofa",
        mainPrice: "2900",
        suggest: [
          { ar: "سجادة من نفس الصورة", en: "The rug from the photo", price: "750" },
          { ar: "طاولة جانبية", en: "Side table", price: "400" },
        ],
        ctaAr: "خذ الغرفة بـ1,150",
        ctaEn: "Take the room for 1,150",
      },
    },
    {
      key: "dimension-check",
      titleAr: "المقاس في مكانه قبل الشراء",
      titleEn: "The size in its place, before buying",
      triggerAr: "العميل يتردّد في صفحة قطعة كبيرة.",
      triggerEn: "The customer hesitates on a large piece.",
      scenarioAr:
        "تُعرض الأبعاد بوضوح مع مقارنة مرجعية مألوفة: «أعرض من باب قياسي بـ١٥ سم». التردد هنا مكاني لا سعري.",
      scenarioEn:
        "Dimensions appear plainly with a familiar reference: \"15cm wider than a standard doorway\". The hesitation here is spatial, not financial.",
      whyAr:
        "إرجاع قطعة أثاث لا تمرّ من الباب يكلف شحنة ثقيلة مرتين وهو أغلى إرجاع في التجارة الإلكترونية كلها.",
      whyEn:
        "Returning furniture that will not fit through the door costs two heavy shipments, and is the most expensive return in all of ecommerce.",
      exampleAr: "خزانة عرضها ٩٥ سم ← «الباب القياسي ٨٠ سم، قِس قبل الطلب».",
      exampleEn: "A 95cm-wide wardrobe → \"A standard door is 80cm - measure before ordering\".",
          widget: {
        titleAr: "قِس قبل الطلب",
        titleEn: "Measure before ordering",
        mainAr: "خزانة — عرض 95 سم",
        mainEn: "Wardrobe - 95cm wide",
        mainPrice: "1850",
        suggest: [
          { ar: "الباب القياسي 80 سم", en: "A standard door is 80cm", price: "—" },
        ],
        ctaAr: "أضف للسلة",
        ctaEn: "Add to cart",
      },
    },
    {
      key: "consumable-cycle",
      titleAr: "المستهلكات في دورتها",
      titleEn: "Consumables on their cycle",
      triggerAr: "مضى على شراء مستهلك منزلي دورته المعتادة.",
      triggerEn: "A household consumable has reached its usual cycle.",
      scenarioAr:
        "تذكير بإعادة الشراء بحجم العبوة وحجم الأسرة: منظفات، أكياس، فلاتر. العميل لا يتذكر حتى ينفد، وحينها يشتري من البقالة.",
      scenarioEn:
        "A reorder reminder sized to the pack and the household: detergents, bags, filters. The customer does not remember until it runs out, and then buys from the corner shop.",
      whyAr:
        "المستهلكات المنزلية إيراد متكرر مضمون، والمتجر الذي لا يذكّر يتنازل عنه لأقرب رفّ مهما كان أغلى.",
      whyEn:
        "Household consumables are guaranteed recurring revenue, and a store that does not remind hands it to the nearest shelf however much dearer it is.",
      exampleAr: "منظف ٥ لتر لأسرة من ٥، اشتُري ١ مارس ← تذكير ٢٠ أبريل.",
      exampleEn: "A 5-litre detergent for a household of five, bought 1 March → a reminder on 20 April.",
          widget: {
        titleAr: "موعد إعادة الطلب",
        titleEn: "Time to reorder",
        mainAr: "منظف 5 لتر — اشتُري 1 مارس",
        mainEn: "5L detergent - bought 1 March",
        mainPrice: "65",
        hintAr: "لأسرة من 5، يكفي 7 أسابيع",
        hintEn: "For a household of 5, about 7 weeks",
        suggest: [
          { ar: "نفس المنظف", en: "The same detergent", price: "65" },
        ],
        ctaAr: "أعد الطلب",
        ctaEn: "Reorder",
      },
    },
    {
      key: "bulk-household",
      titleAr: "الكمية بحجم البيت",
      titleEn: "Quantity sized to the household",
      triggerAr: "العميل يشتري صنفاً يُستهلك بكثرة.",
      triggerEn: "The customer buys a high-consumption item.",
      scenarioAr:
        "يُعرض العدد الأكبر بسعر الوحدة: «٦ حبات بـ١١٠ بدل ٦ × ٢٢». المستهلك المنزلي لا يفسد ولا يحتاج تخزيناً خاصاً.",
      scenarioEn:
        "The larger count is priced per unit: \"6 for 110 instead of 6 × 22\". Household consumables do not spoil and need no special storage.",
      whyAr:
        "شراء الكمية يقلّل عدد الشحنات على المتجر ويقلّل عدد القرارات على العميل. الطرفان يربحان وهو نادر.",
      whyEn:
        "Buying in quantity cuts shipments for the store and cuts decisions for the customer. Both sides win, which is rare.",
      exampleAr: "صابون يدين ٢٢ للحبة ← «٦ حبات ١١٠، الحبة ١٨٫٣».",
      exampleEn: "Hand soap at 22 each → \"6 for 110, that's 18.3 each\".",
          widget: {
        titleAr: "بسعر الوحدة",
        titleEn: "Priced per unit",
        mainAr: "صابون يدين — حبة",
        mainEn: "Hand soap - single",
        mainPrice: "22",
        suggest: [
          { ar: "6 حبات — الحبة 18.3", en: "6 pack - 18.3 each", price: "110" },
        ],
        ctaAr: "خذ الستة",
        ctaEn: "Take the six",
      },
    },
    {
      key: "seasonal-home",
      titleAr: "الموسم يغيّر البيت",
      titleEn: "The season changes the house",
      triggerAr: "بداية موسم يغيّر احتياج المنزل.",
      triggerEn: "A season starts that changes what the house needs.",
      scenarioAr:
        "تتقدّم أصناف الموسم: المفارش الثقيلة والسجاد في الشتاء، والمراوح وأدوات الشواء في الصيف، ومستلزمات الاستضافة في رمضان.",
      scenarioEn:
        "Seasonal items move up: heavy bedding and rugs in winter, fans and grilling gear in summer, hosting supplies in Ramadan.",
      whyAr:
        "احتياج المنزل موسمي بشكل حاد في السعودية، والمتجر الذي يعرض نفس الترتيب طوال السنة يبيع الصيف في ديسمبر.",
      whyEn:
        "Household needs here swing hard by season, and a store showing the same ordering all year is selling summer in December.",
      exampleAr: "بداية رمضان ← أطقم الضيافة والصواني في المقدمة.",
      exampleEn: "The start of Ramadan → hosting sets and serving trays at the front.",
          widget: {
        titleAr: "موسم رمضان",
        titleEn: "Ramadan season",
        mainAr: "بداية رمضان",
        mainEn: "Ramadan starts",
        mainPrice: "—",
        suggest: [
          { ar: "طقم ضيافة", en: "Hosting set", price: "320" },
          { ar: "صواني تقديم", en: "Serving trays", price: "185" },
        ],
        ctaAr: "شاهد الكل",
        ctaEn: "See all",
      },
    },
    {
      key: "assembly",
      titleAr: "التركيب مع الطلب",
      titleEn: "Assembly with the order",
      triggerAr: "العميل يشتري قطعة تحتاج تركيباً.",
      triggerEn: "The customer buys a piece that needs assembling.",
      scenarioAr:
        "تُعرض خدمة التركيب بسعرها ومدتها مع الطلب. العميل الذي يكتشف أن عليه التركيب بعد الاستلام يكتب تقييماً سيئاً بحق.",
      scenarioEn:
        "Assembly is offered with its price and duration alongside the order. A customer who discovers after delivery that they must assemble it writes a bad review, fairly.",
      whyAr:
        "التركيب هامش خدمي عالٍ وهو أيضاً أكثر ما يحوّل تجربة أثاث جيدة إلى سيئة حين يُترك للعميل بلا تنبيه.",
      whyEn:
        "Assembly is high-margin service revenue and also the fastest way to turn a good furniture experience bad when it is left to the customer unannounced.",
      exampleAr: "خزانة تحتاج تركيباً ← «تركيب في البيت ١٨٠ ر.س، ٤٥ دقيقة» مع الطلب.",
      exampleEn: "A wardrobe needing assembly → \"Home assembly 180 SAR, 45 minutes\", offered with the order.",
          widget: {
        titleAr: "التركيب",
        titleEn: "Assembly",
        mainAr: "خزانة — تحتاج تركيباً",
        mainEn: "Wardrobe - needs assembling",
        mainPrice: "1850",
        suggest: [
          { ar: "تركيب في البيت — 45 دقيقة", en: "Home assembly - 45 minutes", price: "180" },
        ],
        ctaAr: "أضف التركيب",
        ctaEn: "Add assembly",
      },
    },
  ],
};
