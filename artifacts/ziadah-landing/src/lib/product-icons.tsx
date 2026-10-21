import {
  Apple, Baby, Beef, Bike, BookOpen, Brush, Cable, Cake, Camera, Carrot, Coffee, Cookie, CreditCard, Crown,
  CupSoda, Drumstick, Dumbbell, Droplets, FlaskConical, Footprints, Gamepad2, Gem, Gift, Glasses,
  GraduationCap, Heart, HeartHandshake, HeartPulse, Flame, Headphones, House, IceCreamCone, Lamp, Laptop,
  LayoutTemplate, Megaphone, Milk, Music, Package, Palette, PenTool, Pill, Pizza, Salad, Sandwich, Scissors,
  Shirt, ShieldCheck, ShoppingBag, Smartphone, Sofa, Soup, SprayCan, Stethoscope, SunMedium, Ticket, Tv,
  Utensils, Watch, BatteryCharging, Bed, Bath, Fish, Plug,
  type LucideIcon,
} from "lucide-react";

/**
 * THE ICON A PRODUCT WEARS WHEN IT HAS NO PHOTOGRAPH.
 *
 * Tiles used to fall back to the product's first letter on a violet field, so a
 * deck of sector moments showed "ش", "ب", "ت" where a shopper expects an
 * object. A letter says nothing about the thing, and it reads as a placeholder
 * somebody forgot. An icon says what kind of thing it is, which is all a tile
 * this size can say anyway.
 *
 * Matched by keyword on the product's name in either language, first rule
 * wins, so the order is the priority: a "gold earring box" is a gift box
 * before it is jewellery. A name nobody matched gets the plain parcel - never
 * a letter.
 */

const RAW_RULES: [RegExp, LucideIcon][] = [
  /* food and drink */
  [/برجر|burger/, Beef],
  [/بيتزا|pizza/, Pizza],
  [/ساندويتش|sandwich|شاورما|shawarma|wrap/, Sandwich],
  [/بطاطس|fries|wedges/, Utensils],
  [/كولا|cola|مشروب|drink|soda|عصير|juice|ماء|water/, CupSoda],
  [/قهوه|coffee|لاتيه|latte|كابتشينو|espresso|شاي|tea/, Coffee],
  [/كنافه|حلى|حلا|dessert|kunafa|كيك|cake|تمر|dates|شوكولا|chocolate/, Cake],
  [/كوكيز|cookie|بسكويت|biscuit/, Cookie],
  [/سلطه|salad/, Salad],
  [/شوربه|soup|مسحب|musahab|rice|وجبه|meal|kabsa|كبسه/, Soup],
  [/حليب|milk|لبن|yogurt|زبادي/, Milk],
  [/سمك|fish|روبيان|shrimp/, Fish],
  [/خضار|vegetable|فاكهه|fruit|تفاح|apple/, Apple],
  [/اضحيه|ذبيحه|خروف|نعيمي|لحم|meat|sheep|lamb|تقطيع|ربع|نصف/, Drumstick],
  /* gifts, packaging, incense */
  [/هديه|هدايا|gift|تغليف|wrap|علبه|box|صندوق|حقيبه هدي/, Gift],
  [/بخور|incense|عود|oud|دهن|معطر|perfume|عطر|fragrance|مسك/, Flame],
  [/مسبحه|prayer beads|سبحه|beads|حرز|amulet|سجاده|rug|مصحف/, Gem],
  /* jewellery and gold */
  [/ذهب|gold|سبيكه|bullion|خاتم|ring|سلسله|chain|necklace|طوق|اقراط|earring|سوار|bracelet|ياقوت|ruby|الماس|diamond|فضه|silver|مجوهرات|jewel/, Gem],
  [/ساعه|watch/, Watch],
  [/تاج|crown/, Crown],
  /* fashion */
  [/عباي|عبايه|abaya|فستان|dress|ثوب|thobe|قميص|shirt|بلوزه|جاكيت|jacket|بنطلون|pants/, Shirt],
  [/طرحه|شيله|حجاب|scarf|hijab|شال/, Scissors],
  [/حقيبه|bag|شنطه|محفظه|wallet/, ShoppingBag],
  [/حذاء|shoe|sneaker|جزمه|نعل|صندل|sandal|ركض|running/, Footprints],
  [/نظاره|glasses|sunglasses/, Glasses],
  /* beauty and care */
  [/سيروم|serum|زيت|oil|ارجان|argan|كريم|cream|مرطب|moistur|لوشن|lotion|تونر|toner|غسول|cleanser|قناع|mask/, Droplets],
  [/شمس|sun|spf/, SunMedium],
  [/مكياج|makeup|روج|lipstick|ماسكارا|mascara|بودره|powder|فرشاه|brush/, Brush],
  [/مكمل|supplement|فيتامين|vitamin|حبوب|capsule|دواء|medicine|pill/, Pill],
  [/عياده|clinic|كشف|فحص|استشار|consult|اجراء|procedure/, Stethoscope],
  [/جلسه|session|علاج|treatment|ليزر|laser/, HeartPulse],
  [/مختبر|lab|تحليل|test/, FlaskConical],
  /* electronics */
  [/سماع|earbud|earphone|headphone|airpod/, Headphones],
  [/شاحن|charger|شحن|charging|باوربانك|power bank/, BatteryCharging],
  [/كابل|cable|وصله|adapter/, Cable],
  [/غطاء|case|cover|جراب/, Smartphone],
  [/شاشه|screen|واقي|protector|جوال|phone|هاتف|ايفون|iphone|موبايل/, Smartphone],
  [/لابتوب|laptop|حاسب|computer|تابلت|tablet|ماك|mac/, Laptop],
  [/تلفزيون|tv|شاشه ذكيه/, Tv],
  [/كاميرا|camera|تصوير/, Camera],
  [/سماعه بلوتوث|speaker|مكبر|music|موسيق/, Music],
  [/ضمان|warranty|تامين|insurance|حمايه|protection/, ShieldCheck],
  [/قابس|plug|مقبس|socket/, Plug],
  /* health and fitness */
  [/دمبل|dumbbell|اوزان|weights|حديد|gym|نادي|تمرين|workout|مفرشه يوغا|yoga|بروتين|protein/, Dumbbell],
  [/دراجه|bike|cycling/, Bike],
  /* home */
  [/اريكه|sofa|كنب|كرسي|chair/, Sofa],
  [/اضاءه|lamp|مصباح|ثريا/, Lamp],
  [/سرير|bed|مفرش|sheet|وساده|pillow|لحاف|blanket|بطانيه/, Bed],
  [/حمام|bath|منشفه|towel|مناشف/, Bath],
  [/منظف|cleaner|تنظيف|clean|مطهر|spray|معطر جو/, SprayCan],
  [/مطبخ|kitchen|اواني|اوعيه|cookware|كاس|cup|اكواب|glassware|طقم/, Utensils],
  [/منزل|home|بيت|سله|basket|غسيل|laundry/, House],
  /* digital */
  [/دوره|course|تدريب|training|كتاب|book|ebook|دليل|guide|pdf/, BookOpen],
  [/شهاده|certificate|تعلم|learn|اكاديم/, GraduationCap],
  [/قالب|template|تصميم جاهز|ui kit|mockup/, LayoutTemplate],
  [/شعار|logo|هويه|identity|brand|بوستر|poster|تصميم|design/, Palette],
  [/رسم|draw|illustrat|ستيكر|sticker/, PenTool],
  [/اعلان|ads|حمله|campaign|تسويق|marketing|سوشيال|social/, Megaphone],
  [/بطاقه|card|قسيمه|voucher|كود|code|شحن رصيد|رصيد/, CreditCard],
  [/تذكره|ticket|حجز|booking|اشتراك|subscription/, Ticket],
  [/لعبه|game|العاب|games|بلايستيشن|playstation|ستيم|steam/, Gamepad2],
  /* charity */
  [/تبرع|donat|صدقه|charity|زكاه|zakat|كفاله|sponsor|وقف|waqf/, HeartHandshake],
  [/طفل|child|kid|يتيم|orphan|رضيع|baby|مدرس|school/, Baby],
  [/خير|good|عطاء|give|مساعده|aid/, Heart],
];

/* ASCII alternatives must start a word ("ring" is not "string" or "earring"'s
   tail), and Arabic "رز" (rice) is only rice as a word of its own, not the
   middle of "مطرزة" (embroidered). */
const RULES: [RegExp, LucideIcon][] = RAW_RULES.map(([rx, icon]) => [
  new RegExp(
    rx.source
      .split("|")
      .map((tok) => (/^[a-z0-9 ]+$/.test(tok) ? `\\b${tok}` : tok))
      .join("|") + (icon === Soup ? "|(?:^| )رز(?: |$)" : ""),
  ),
  icon,
]);

function fold(s: string): string {
  return s
    .toLowerCase()
    .replace(/ـ/g, "")
    .replace(/[ً-ْٰ]/g, "")
    .replace(/[آأإ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

export function productIconFor(name: string): LucideIcon {
  const n = fold(name);
  for (const [rx, Icon] of RULES) if (rx.test(n)) return Icon;
  return Package;
}

/** The icon, sized to sit inside a tile of `size` px. */
export function ProductIcon({ name, size = 48 }: { name: string; size?: number }) {
  const Icon = productIconFor(name);
  const px = Math.max(16, Math.round(size * 0.5));
  return <Icon width={px} height={px} strokeWidth={1.75} aria-hidden="true" />;
}
