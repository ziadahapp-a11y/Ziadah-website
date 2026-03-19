import { useEffect, useState, useRef } from "react";
import Nav from "../components/Nav";
import ParticleBackground from "../components/ParticleBackground";
import PlatformModal from "../components/PlatformModal";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { BreadcrumbSchema } from "../components/JsonLd";

const stories = [
  {
    store: "بست كلين",
    sector: "مستلزمات التنظيف",
    logo: "ب",
    color: "linear-gradient(135deg,#06b6d4,#0891b2)",
    accent: "#06b6d4",
    tagline: "نوافذ ذكية تحوّل كل زيارة إلى فرصة بيع مضاعفة",
    founded: "2020",
    platform: "سلة",
    before: { aov: "90", conv: "1.4٪", monthly: "18,000" },
    after: { aov: "120", conv: "2.2٪", monthly: "38,000" },
    metrics: [
      { label: "زيادة في متوسط قيمة السلة", value: "+33٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+57٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات الشهرية", value: "+111٪", color: "#10b981" },
      { label: "وقت التفعيل", value: "24 ساعة", color: "#f59e0b" },
    ],
    quote: "زيادة غيّر طريقة تعاملنا مع العملاء. صار العميل يكتشف منتجاتنا الثانية بشكل تلقائي والسلة تكبر بدون ما نزيد إعلانات. سهل الإعداد والنتائج جاءت سريعة.",
    person: "فريق بست كلين",
    role: "متجر مستلزمات التنظيف",
    strategy: "تفعيل نوافذ تسويقية ذكية تحفز العميل على الشراء وتعرض منتجات إضافية عند إضافة أي منتج للسلة.",
    results: [
      "ارتفع متوسط قيمة السلة من 90 إلى 120 ⃁",
      "زيادة ملحوظة في تصفح الكتالوج الكامل للمنتجات",
      "تضاعفت المبيعات الشهرية خلال شهرين",
      "رفع متوسط قيمة السلة دون تغيير في الإعلانات",
    ],
  },
  {
    store: "ريبال",
    sector: "مستلزمات التنظيف",
    logo: "ر",
    color: "linear-gradient(135deg,#7c3aed,#5b21b6)",
    accent: "#7c3aed",
    tagline: "151,507 تحويل — الوصول للعميل في اللحظة الصح",
    founded: "2019",
    platform: "سلة",
    before: { aov: "110", conv: "2.3٪", monthly: "65,000" },
    after: { aov: "145", conv: "7.68٪", monthly: "1,024,379" },
    metrics: [
      { label: "إجمالي التحويلات", value: "151,507", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "1.02M ⃁", color: "#06b6d4" },
      { label: "معدل التحويل", value: "7.68٪", color: "#10b981" },
      { label: "عائد على الاستثمار", value: "15x+", color: "#f59e0b" },
    ],
    quote: "زيادة ساعدنا نوصل للعميل في اللحظة الصح بعرض بسيط وفعّال جداً. الأثر على المبيعات والتحويلات كان واضحاً ومقاساً. كمان زيادة خلّتنا نرفع متوسط قيمة الطلب عبر استراتيجية مدروسة لكل عرض ومنتج.",
    person: "فريق ريبال",
    role: "متجر مستلزمات التنظيف — ribalpower.sa",
    strategy: "تفعيل نوافذ تسويقية تحفز العميل على الطلب عند إضافة منتج للسلة أو بدء الطلب، لتقليل السلات المتروكة.",
    results: [
      "151,507 تحويل موثق عبر المنصة",
      "1,024,379 ⃁ إجمالي مبيعات محققة",
      "معدل تحويل استثنائي 7.68٪",
      "رفع متوسط قيمة الطلب عبر استراتيجية مخصصة لكل منتج",
    ],
  },
  {
    store: "زونا",
    sector: "العناية بالبشرة",
    logo: "ز",
    color: "linear-gradient(135deg,#ec4899,#be185d)",
    accent: "#ec4899",
    tagline: "تجربة عميل راقية بهدايا مجانية ذكية تزيد الولاء",
    founded: "2021",
    platform: "سلة",
    before: { aov: "160", conv: "1.8٪", monthly: "28,000" },
    after: { aov: "210", conv: "2.9٪", monthly: "62,000" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+31٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+61٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات الشهرية", value: "+121٪", color: "#10b981" },
      { label: "رضا العملاء", value: "96٪", color: "#f59e0b" },
    ],
    quote: "تجربة المنتج المجاني غيّرت نظرة عملائنا للمتجر. صاروا يشعرون بالتقدير وكأن المتجر يهتم فيهم شخصياً. زيادة سهّل علينا تقديم هذه التجربة بشكل تلقائي وذكي.",
    person: "فريق زونا",
    role: "متجر منتجات العناية بالبشرة",
    strategy: "تفعيل نوافذ تسويقية تحفز العميل لاختيار المنتج الإضافي مجاناً عند إضافة منتج للسلة.",
    results: [
      "ارتفع متوسط الطلب من 160 إلى 210 ⃁",
      "تحسين تجربة العميل بعرض هدايا مجانية بذكاء",
      "رفع رضا العميل وتشجيع تكرار الشراء",
      "زيادة معدل التحويل من 1.8 إلى 2.9٪",
    ],
  },
  {
    store: "مكنة",
    sector: "العناية بالبشرة",
    logo: "م",
    color: "linear-gradient(135deg,#10b981,#059669)",
    accent: "#10b981",
    tagline: "خصم الكمية الذكي يحوّل المشتري الواحد إلى متعدد",
    founded: "2022",
    platform: "زد",
    before: { aov: "120", conv: "2.0٪", monthly: "22,000" },
    after: { aov: "170", conv: "3.2٪", monthly: "55,000" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+42٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+60٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات", value: "+150٪", color: "#10b981" },
      { label: "عائد الاشتراك", value: "12x", color: "#f59e0b" },
    ],
    quote: "النوافذ الذكية غيّرت سلوك العملاء. بدل ما يشتري واحد صار يضيف ثانية للسلة بفضل الخصم الظاهر أمامه مباشرة. النتيجة كانت فورية وواضحة في الأرقام.",
    person: "فريق مكنة",
    role: "متجر منتجات العناية بالبشرة",
    strategy: "تفعيل نوافذ تسويقية بهدف زيادة عبوة أخرى من المنتج نفسه عند إضافة المنتج للسلة، مع خصم تحفيزي واضح.",
    results: [
      "ارتفع متوسط الطلب من 120 إلى 170 ⃁",
      "زيادة متوسط قيمة الطلب عبر خصومات الكمية",
      "تحفيز العميل لشراء أكثر دون زيادة الإعلانات",
      "نوافذ مستهدفة في اللحظة المناسبة",
    ],
  },
  {
    store: "سيار",
    sector: "الأزياء الرجالية",
    logo: "س",
    color: "linear-gradient(135deg,#f59e0b,#d97706)",
    accent: "#f59e0b",
    tagline: "كروس سيل ذكي يرفع قيمة الطلب في أقمشة الرجال",
    founded: "2020",
    platform: "سلة",
    before: { aov: "220", conv: "1.6٪", monthly: "35,000" },
    after: { aov: "295", conv: "2.4٪", monthly: "82,000" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+34٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+50٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات", value: "+134٪", color: "#10b981" },
      { label: "عروض مخصصة لكل منتج", value: "✓", color: "#f59e0b" },
    ],
    quote: "كثير من عملائنا ما كانوا يعرفون أن عندنا منتجات مكملة. الآن زيادة يعرضها لهم في اللحظة المناسبة ويشترونها مباشرة. النتيجة ظهرت في متوسط الطلب بشكل واضح.",
    person: "فريق سيار",
    role: "متجر أشمغة وأقمشة رجالية",
    strategy: "تفعيل نوافذ تسويقية بهدف إضافة المنتجات المقترحة بخصم إضافي عند إضافة منتج للسلة.",
    results: [
      "ارتفع متوسط الطلب من 220 إلى 295 ⃁",
      "زيادة اكتشاف المنتجات التكميلية بشكل ملحوظ",
      "رفع متوسط الطلب عبر cross-sell ذكي",
      "عروض مخصصة لكل منتج بحسب اختيار العميل",
    ],
  },
  {
    store: "دخون الإماراتية",
    sector: "العطور والبخور",
    logo: "د",
    color: "linear-gradient(135deg,#4f46e5,#4338ca)",
    accent: "#4f46e5",
    tagline: "نوافذ موسمية تعزز اكتشاف العود والبخور الفاخر",
    founded: "2019",
    platform: "سلة",
    before: { aov: "350", conv: "1.5٪", monthly: "42,000" },
    after: { aov: "450", conv: "2.3٪", monthly: "95,000" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+29٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+53٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات", value: "+126٪", color: "#10b981" },
      { label: "نوافذ موسمية ذكية", value: "✓", color: "#f59e0b" },
    ],
    quote: "منتجات العود والبخور لها طبيعة خاصة — العميل يريد يكتشف المزيد. زيادة فهم هذا وصار يعرض المنتجات المكملة بأسلوب يناسب تجربة التسوق الفاخرة لدينا.",
    person: "فريق دخون الإماراتية",
    role: "متجر عود وبخور فاخر",
    strategy: "تفعيل نوافذ تسويقية بهدف إضافة المنتجات المقترحة بخصم إضافي عند إضافة منتج للسلة.",
    results: [
      "ارتفع متوسط الطلب من 350 إلى 450 ⃁",
      "تعزيز اكتشاف المنتجات المقترحة بشكل ملحوظ",
      "رفع متوسط الطلب بعروض موسمية مناسبة",
      "نوافذ ذكية تناسب طبيعة منتجات العود",
    ],
  },
  {
    store: "فيبان",
    sector: "العطور والبخور",
    logo: "ف",
    color: "linear-gradient(135deg,#ec4899,#9333ea)",
    accent: "#ec4899",
    tagline: "تقليل السلات المتروكة وتحويل التردد إلى قرار شراء",
    founded: "2021",
    platform: "سلة",
    before: { aov: "190", conv: "1.4٪", monthly: "25,000" },
    after: { aov: "240", conv: "2.3٪", monthly: "58,000" },
    metrics: [
      { label: "زيادة في معدل التحويل", value: "+64٪", color: "#a855f7" },
      { label: "تقليل السلات المتروكة", value: "-42٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات", value: "+132٪", color: "#10b981" },
      { label: "أثر فوري بعد التفعيل", value: "✓", color: "#f59e0b" },
    ],
    quote: "كان عندنا مشكلة كبيرة في السلات المتروكة. زيادة حلها ببساطة — نافذة ذكية في اللحظة المناسبة تحفز العميل على الإتمام. التطبيق سهل وفرق واضح من اليوم الأول.",
    person: "فريق فيبان",
    role: "متجر عطور",
    strategy: "تفعيل نوافذ تسويقية بهدف تحفيز العميل على إكمال الشراء عند إضافة منتج للسلة.",
    results: [
      "تقليل السلات المتروكة بشكل ملحوظ",
      "تحفيز إتمام الشراء في اللحظة الحاسمة",
      "ارتفع متوسط الطلب من 190 إلى 240 ⃁",
      "سهل التطبيق ويُحدث فرقاً فورياً",
    ],
  },
  {
    store: "هني دوز",
    sector: "الغذاء والعسل",
    logo: "ه",
    color: "linear-gradient(135deg,#f59e0b,#92400e)",
    accent: "#f59e0b",
    tagline: "عرض 2+1 يضاعف حجم السلة ورضا العميل",
    founded: "2021",
    platform: "سلة",
    before: { aov: "80", conv: "1.9٪", monthly: "15,000" },
    after: { aov: "125", conv: "2.8٪", monthly: "40,000" },
    metrics: [
      { label: "زيادة في متوسط الطلب", value: "+56٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+47٪", color: "#06b6d4" },
      { label: "زيادة في المبيعات", value: "+167٪", color: "#10b981" },
      { label: "عرض 2+1 مجاناً", value: "✓", color: "#f59e0b" },
    ],
    quote: "العرض 2+1 كان عندنا لكن العملاء ما كانوا يعرفون عنه. زيادة صار يعرضه بشكل واضح وجذاب في اللحظة الصح فارتفعت مبيعاتنا بشكل كبير وصار العملاء يشترون كميات أكبر.",
    person: "فريق هني دوز",
    role: "متجر عسل طبيعي",
    strategy: "تفعيل نافذة تسويقية تقدم عرض 2+1 مجاناً مع إبراز قيمة العرض وتشجيع العميل على الاستفادة.",
    results: [
      "ارتفع متوسط الطلب من 80 إلى 125 ⃁",
      "زيادة حجم السلة عبر عروض 2+1 ذكية",
      "إبراز قيمة العرض بوضوح للعميل",
      "تحسين ملحوظ في متوسط قيمة الطلب",
    ],
  },
  {
    store: "دثار",
    sector: "العبايات",
    logo: "ث",
    color: "linear-gradient(135deg,#059669,#064e3b)",
    accent: "#059669",
    tagline: "تحويل الزوار الجدد إلى مشترين من أول زيارة",
    founded: "2020",
    platform: "سلة",
    before: { aov: "130", conv: "1.7٪", monthly: "20,000" },
    after: { aov: "170", conv: "2.9٪", monthly: "52,000" },
    metrics: [
      { label: "زيادة في معدل التحويل", value: "+71٪", color: "#a855f7" },
      { label: "زيادة في المبيعات", value: "+160٪", color: "#06b6d4" },
      { label: "تحويل الزوار الجدد", value: "✓", color: "#10b981" },
      { label: "الشحن المجاني كحافز", value: "✓", color: "#f59e0b" },
    ],
    quote: "زيادة ساعدنا نوصل للزائر الجديد من أول ثانية. النافذة الذكية بأفضل المنتجات والشحن المجاني حوّلت الزيارات إلى مشتريات فعلية وكان الفرق ملموساً في أرقام المبيعات.",
    person: "فريق دثار",
    role: "متجر عبايات الحج واللباس المحتشم",
    strategy: "تفعيل نافذة تسويقية تظهر مباشرة على الصفحة الرئيسية تُبرز أفضل المنتجات مبيعاً مع توضيح نسبة الخصم وميزة الشحن المجاني.",
    results: [
      "تحويل الزوار الجدد إلى مشترين من أول زيارة",
      "إبراز المنتجات الأكثر مبيعاً فور الدخول",
      "الشحن المجاني كحافز فعّال زاد الإتمام",
      "ارتفع متوسط الطلب من 130 إلى 170 ⃁",
    ],
  },
  {
    store: "جمعية تحفيظ القرآن — خميس مشيط",
    sector: "التبرعات",
    logo: "ق",
    color: "linear-gradient(135deg,#4f46e5,#4338ca)",
    accent: "#4f46e5",
    tagline: "رسائل مؤثرة تحوّل الزوار إلى متبرعين فاعلين",
    founded: "2018",
    platform: "سلة",
    before: { aov: "50", conv: "2.0٪", monthly: "8,000" },
    after: { aov: "70", conv: "3.6٪", monthly: "28,000" },
    metrics: [
      { label: "زيادة في متوسط التبرع", value: "+40٪", color: "#a855f7" },
      { label: "زيادة في معدل التحويل", value: "+80٪", color: "#06b6d4" },
      { label: "زيادة في إجمالي التبرعات", value: "+250٪", color: "#10b981" },
      { label: "مناسب للمواقع غير الربحية", value: "✓", color: "#f59e0b" },
    ],
    quote: "زيادة أثبت أنه مناسب حتى للمنظمات غير الربحية. الرسائل المؤثرة التي تظهر أثناء التصفح شجّعت المتبرعين على المبادرة فوراً وزاد متوسط التبرع بشكل ملحوظ.",
    person: "إدارة الجمعية",
    role: "جمعية تحفيظ القرآن — خميس مشيط",
    strategy: "استخدام تطبيق زيادة لتفعيل نوافذ تسويقية تظهر برسائل مؤثرة أثناء التصفح، وتشجع المتبرع على المبادرة فوراً.",
    results: [
      "رفع معدل التبرع عبر رسائل مؤثرة",
      "تحفيز المبادرة الفورية لدى الزوار",
      "ارتفع متوسط التبرع من 50 إلى 70 ⃁",
      "تضاعفت إجمالي التبرعات الشهرية بشكل ملحوظ",
    ],
  },
  {
    store: "كلوز باي",
    sector: "تسوق متنوع",
    logo: "ك",
    color: "linear-gradient(135deg,#06b6d4,#0891b2)",
    accent: "#06b6d4",
    tagline: "كود خصم 5٪ يُنقذ السلات المتروكة ويضاعف الإيرادات",
    founded: "2021",
    platform: "زد",
    before: { aov: "160", conv: "2.1٪", monthly: "75,000" },
    after: { aov: "200", conv: "3.8٪", monthly: "200,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "716", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "543,000 ⃁", color: "#06b6d4" },
      { label: "توقيت ذكي للنافذة", value: "✓", color: "#10b981" },
      { label: "كود خصم فعّال", value: "✓", color: "#f59e0b" },
    ],
    quote: "كود الخصم 5٪ كان بسيطاً لكن فعله كان كبيراً. العملاء الذين كانوا يترددون صاروا يكملون الطلب مباشرة. النتيجة 716 تحويل و543 ألف ⃁ مبيعات إضافية.",
    person: "فريق كلوز باي",
    role: "متجر تسوق متنوع",
    strategy: "تم تفعيل حملة 'لا تفوت كود خصم 5%' من خلال تطبيق زيادة، عبر نافذة ذكية تظهر للعملاء في الوقت المناسب لتحفيزهم على إتمام الشراء.",
    results: [
      "716 تحويل موثق عبر المنصة",
      "543,000 ⃁ إجمالي مبيعات محققة",
      "تحويل السلات المتروكة إلى مبيعات فعلية",
      "توقيت ذكي للنافذة زاد معدل الإتمام",
    ],
  },
  {
    store: "عبق الغيم",
    sector: "العطور والبخور",
    logo: "ع",
    color: "linear-gradient(135deg,#a855f7,#7c3aed)",
    accent: "#a855f7",
    tagline: "استرداد الطلبات في لحظة الحذف من السلة",
    founded: "2020",
    platform: "سلة",
    before: { aov: "180", conv: "1.8٪", monthly: "35,000" },
    after: { aov: "220", conv: "3.2٪", monthly: "110,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "1,122", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "248,816 ⃁", color: "#06b6d4" },
      { label: "استرداد لحظة الحذف", value: "✓", color: "#10b981" },
      { label: "حملة ذكية موجهة", value: "✓", color: "#f59e0b" },
    ],
    quote: "الفكرة كانت ذكية — تقدم للعميل خصماً بالضبط لما يحاول يحذف المنتج من السلة. هذا التوقيت غيّر كل شيء. 1,122 تحويل و248 ألف ⃁ ما كانت لتحصل بدون زيادة.",
    person: "فريق عبق الغيم",
    role: "متجر عطور ومعطرات",
    strategy: "تفعيل حدث 'حذف منتج من السلة' عبر تطبيق زيادة، وإطلاق حملة ذكية بكود خصم بسيط يظهر للعملاء لحظة محاولة حذف المنتج.",
    results: [
      "1,122 تحويل موثق عبر المنصة",
      "248,816 ⃁ إجمالي مبيعات محققة",
      "استرداد الطلبات في لحظة الحذف من السلة",
      "كود خصم يحوّل قرار الإلغاء إلى شراء",
    ],
  },
  {
    store: "التميمي",
    sector: "الأزياء الرجالية",
    logo: "ت",
    color: "linear-gradient(135deg,#059669,#047857)",
    accent: "#059669",
    tagline: "3,774 تحويل — الترويج الموسمي الذكي يحقق أرقاماً قياسية",
    founded: "2018",
    platform: "زد",
    before: { aov: "280", conv: "1.5٪", monthly: "110,000" },
    after: { aov: "350", conv: "3.05٪", monthly: "450,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "3,774", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "932,517 ⃁", color: "#06b6d4" },
      { label: "معدل التحويل", value: "3.05٪", color: "#10b981" },
      { label: "اقتراحات ذكية موسمية", value: "✓", color: "#f59e0b" },
    ],
    quote: "زيادة ساعدنا نرفع قيمة الطلب دون التأثير على تجربة العميل. العروض تظهر في الوقت الصح وتشجع العميل على إضافة قطع أكثر بدون تردد.",
    person: "فريق التميمي",
    role: "متجر أقمشة ونسيج رجالي — altamimitex.net",
    strategy: "تفعيل حدث 'إضافة منتج للسلة' من خلال تطبيق زيادة، مع الترويج لمنتجات الموسم عبر نوافذ تسويقية ذكية تقترح قطعاً إضافية تناسب اختيارات العميل.",
    results: [
      "3,774 تحويل موثق خلال الموسم",
      "932,517 ⃁ إجمالي مبيعات محققة",
      "معدل تحويل 3.05٪ أعلى من المتوسط",
      "اقتراحات ذكية مبنية على اختيار العميل",
    ],
  },
  {
    store: "Skinly",
    sector: "العناية بالبشرة",
    logo: "S",
    color: "linear-gradient(135deg,#ec4899,#be185d)",
    accent: "#ec4899",
    tagline: "1,005 تحويل في موسم الجمعة البيضاء — الذكاء في التوقيت",
    founded: "2021",
    platform: "سلة",
    before: { aov: "220", conv: "2.5٪", monthly: "120,000" },
    after: { aov: "320", conv: "6.10٪", monthly: "430,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "1,005", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "704,676 ⃁", color: "#06b6d4" },
      { label: "معدل التحويل", value: "6.10٪", color: "#10b981" },
      { label: "استغلال ذكي للمواسم", value: "✓", color: "#f59e0b" },
    ],
    quote: "زيادة ساعدتنا نشتغل مع العملاء في اللحظة الصح دون ما نقاطع تجربة التسوق. العروض الذكية شجّعت العملاء يضيفون منتجات أكثر ويكملون طلباتهم أسرع.",
    person: "فريق Skinly",
    role: "متجر عناية بالبشرة والجمال — skin-ly.com",
    strategy: "تفعيل حدث الإضافة للسلة من خلال تطبيق زيادة، وإطلاق حملة بخصومات وعروض على منتجات متكاملة تدفع العميل لإكمال الطلب.",
    results: [
      "1,005 تحويل موثق في موسم الجمعة البيضاء",
      "704,676 ⃁ إجمالي مبيعات محققة",
      "معدل تحويل استثنائي 6.10٪",
      "رفع قيمة الطلب عبر عروض cross-sell وupsell",
    ],
  },
  {
    store: "فيرزاسكا",
    sector: "العطور والبخور",
    logo: "ف",
    color: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    accent: "#7c3aed",
    tagline: "باقات المعطرات الذكية ترفع قيمة كل طلب",
    founded: "2021",
    platform: "سلة",
    before: { aov: "140", conv: "1.6٪", monthly: "22,000" },
    after: { aov: "190", conv: "2.9٪", monthly: "58,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "957", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "77,000 ⃁", color: "#06b6d4" },
      { label: "ترويج فعّال للباقات", value: "✓", color: "#10b981" },
      { label: "زيادة اكتشاف المنتجات", value: "✓", color: "#f59e0b" },
    ],
    quote: "الباقات المجمعة كانت متاحة لكن العملاء نادراً ما يكتشفونها. زيادة حل هذه المشكلة بنافذة موجهة تظهر في الوقت الصح وترفع متوسط قيمة الطلب بشكل واضح.",
    person: "فريق فيرزاسكا",
    role: "متجر عطور ومعطرات",
    strategy: "تفعيل حدث إضافة منتج للسلة مع ظهور نافذة بخصم على باقة المعطرات.",
    results: [
      "957 تحويل موثق عبر المنصة",
      "77,000 ⃁ إجمالي مبيعات محققة",
      "ترويج فعّال للباقات المجمعة",
      "نوافذ موجهة تزيد اكتشاف المنتجات",
    ],
  },
  {
    store: "فيتنيس نيد",
    sector: "اللياقة البدنية",
    logo: "ن",
    color: "linear-gradient(135deg,#10b981,#059669)",
    accent: "#10b981",
    tagline: "تحويل لحظة الحذف من السلة إلى فرصة بيع ذكية",
    founded: "2020",
    platform: "زد",
    before: { aov: "220", conv: "1.9٪", monthly: "28,000" },
    after: { aov: "280", conv: "3.2٪", monthly: "68,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "207", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "75,722 ⃁", color: "#06b6d4" },
      { label: "استرداد لحظة الحذف", value: "✓", color: "#10b981" },
      { label: "تقليل الطلبات الضائعة", value: "✓", color: "#f59e0b" },
    ],
    quote: "كنا نخسر طلبات كثيرة في لحظة الحذف من السلة. زيادة حل هذه المشكلة بدقة — خصم ذكي يظهر في اللحظة الحاسمة ويحوّل قرار الإلغاء إلى شراء فعلي.",
    person: "فريق فيتنيس نيد",
    role: "متجر مستلزمات لياقة بدنية",
    strategy: "تفعيل حدث 'حذف المنتج من السلة' داخل زيادة، بحيث يشاهد أي عميل يحذف منتجاً نافذة عرض ذكية تقدم له خصماً أو عرضاً خاصاً على نفس المنتج.",
    results: [
      "207 تحويل موثق عبر المنصة",
      "75,722 ⃁ إجمالي مبيعات محققة",
      "تحويل لحظة الحذف من السلة إلى فرصة بيع",
      "خصومات ذكية تُغلق الصفقة في آخر لحظة",
    ],
  },
  {
    store: "كلارا",
    sector: "العناية بالبشرة",
    logo: "ك",
    color: "linear-gradient(135deg,#f59e0b,#d97706)",
    accent: "#f59e0b",
    tagline: "ترويج المنتجات الجديدة بأعلى معدل إضافة للسلة",
    founded: "2022",
    platform: "سلة",
    before: { aov: "180", conv: "1.7٪", monthly: "30,000" },
    after: { aov: "230", conv: "2.8٪", monthly: "95,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "655", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "247,438 ⃁", color: "#06b6d4" },
      { label: "ترويج فعّال للمنتجات الجديدة", value: "✓", color: "#10b981" },
      { label: "خصومات مستهدفة", value: "✓", color: "#f59e0b" },
    ],
    quote: "إطلاق منتجات جديدة كان تحدياً دائماً. زيادة حل المشكلة بنافذة ذكية تعرض المنتج الجديد بخصم في اللحظة المناسبة وتحفز العميل على الإتمام. النتيجة 655 تحويل و247 ألف ⃁.",
    person: "فريق كلارا",
    role: "متجر منتجات تجميل ومستحضرات",
    strategy: "تفعيل حدث الإضافة للسلة عبر زيادة مع إظهار نافذة تسويقية تتضمن تخفيضاً خاصاً على المنتج لتحفيز العملاء على إكمال الشراء.",
    results: [
      "655 تحويل موثق عبر المنصة",
      "247,438 ⃁ إجمالي مبيعات محققة",
      "ترويج فعّال للمنتجات الجديدة",
      "خصومات مستهدفة تحفز الإتمام",
    ],
  },
  {
    store: "كابزون",
    sector: "الأزياء الرجالية",
    logo: "ك",
    color: "linear-gradient(135deg,#06b6d4,#4f46e5)",
    accent: "#06b6d4",
    tagline: "إنقاذ الطلبات في مرحلة الدفع النهائية",
    founded: "2021",
    platform: "زد",
    before: { aov: "150", conv: "1.4٪", monthly: "15,000" },
    after: { aov: "190", conv: "2.2٪", monthly: "38,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "155", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "41,000 ⃁", color: "#06b6d4" },
      { label: "إنقاذ الطلبات عند الدفع", value: "✓", color: "#10b981" },
      { label: "خصم يشجع على العودة", value: "✓", color: "#f59e0b" },
    ],
    quote: "كانت المشكلة أن العملاء يصلون لمرحلة الدفع ثم يتركون. زيادة حل هذا بنافذة ذكية تظهر في آخر لحظة بعرض مقنع. التحسن في معدل الإتمام كان واضحاً.",
    person: "فريق كابزون",
    role: "متجر أزياء وإكسسوارات",
    strategy: "إطلاق حملة عبر حدث 'إتمام الطلب' في زيادة تظهر نافذة تسويقية محفزة في المرحلة الأخيرة من الشراء تقدم خصماً على الطلب القادم أو تخفيضاً على الطلب الحالي.",
    results: [
      "155 تحويل موثق عبر المنصة",
      "41,000 ⃁ إجمالي مبيعات محققة",
      "إنقاذ الطلبات في مرحلة الدفع النهائية",
      "خصم على الطلب التالي يشجع على العودة",
    ],
  },
  {
    store: "ركن الجمال",
    sector: "العناية بالبشرة",
    logo: "ر",
    color: "linear-gradient(135deg,#ec4899,#9333ea)",
    accent: "#ec4899",
    tagline: "حملات المناسبات الوطنية تحقق ذروة المبيعات",
    founded: "2020",
    platform: "سلة",
    before: { aov: "160", conv: "1.8٪", monthly: "30,000" },
    after: { aov: "210", conv: "3.1٪", monthly: "80,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "689", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "119,903 ⃁", color: "#06b6d4" },
      { label: "حملات المناسبات الوطنية", value: "✓", color: "#10b981" },
      { label: "نوافذ موجهة ترفع الإتمام", value: "✓", color: "#f59e0b" },
    ],
    quote: "اليوم الوطني كان دائماً فرصة لكننا ما كنا نعرف كيف نستغلها صح. زيادة ساعدنا نطلق حملة مخصصة للمناسبة وصلنا لأرقام ما حققناها من قبل خلال أيام معدودة.",
    person: "فريق ركن الجمال",
    role: "متجر منتجات التجميل",
    strategy: "إطلاق حملة خاصة باليوم الوطني عبر زيادة مبنية على حدث الإضافة للسلة مع نافذة تسويقية مخصصة وعرض محفّز لإتمام الطلب.",
    results: [
      "689 تحويل موثق خلال اليوم الوطني",
      "119,903 ⃁ إجمالي مبيعات محققة",
      "استغلال ذكي لمواسم الذروة والمناسبات",
      "حملات مخصصة للمناسبات الوطنية",
    ],
  },
  {
    store: "فور هير",
    sector: "العناية بالبشرة",
    logo: "ه",
    color: "linear-gradient(135deg,#f43f5e,#be123c)",
    accent: "#f43f5e",
    tagline: "أعلى ظهور للمنتجات الجديدة من أول لحظة دخول",
    founded: "2021",
    platform: "سلة",
    before: { aov: "140", conv: "1.6٪", monthly: "28,000" },
    after: { aov: "190", conv: "2.8٪", monthly: "70,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "650", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "135,382 ⃁", color: "#06b6d4" },
      { label: "ظهور فوري للمنتج الجديد", value: "✓", color: "#10b981" },
      { label: "استهداف كل زائر من أول لحظة", value: "✓", color: "#f59e0b" },
    ],
    quote: "أطلقنا منتج الموس الوبري الجديد وأردنا أن يعرفه الجميع. زيادة ساعدنا نعرضه لكل زائر من أول ثانية يدخل فيها المتجر. الوعي ارتفع والمبيعات جاءت بسرعة ما توقعناها.",
    person: "فريق فور هير",
    role: "متجر منتجات تجميل نسائية",
    strategy: "تفعيل حدث الصفحة الرئيسية عبر زيادة، بحيث يظهر المنتج الجديد في نافذة تسويقية بارزة فور دخول العميل للمتجر لضمان أعلى نسبة ظهور.",
    results: [
      "650 تحويل موثق عبر المنصة",
      "135,382 ⃁ إجمالي مبيعات محققة",
      "ترويج المنتجات الجديدة بأعلى ظهور ممكن",
      "استهداف كل زائر من أول لحظة دخول",
    ],
  },
  {
    store: "كايزون",
    sector: "الأجهزة المنزلية",
    logo: "ي",
    color: "linear-gradient(135deg,#f59e0b,#92400e)",
    accent: "#f59e0b",
    tagline: "خصم 50٪ على الوحدة الثانية يضاعف حجم الطلب فوراً",
    founded: "2021",
    platform: "زد",
    before: { aov: "180", conv: "1.5٪", monthly: "20,000" },
    after: { aov: "280", conv: "2.6٪", monthly: "58,000" },
    metrics: [
      { label: "إجمالي التحويلات", value: "322", color: "#a855f7" },
      { label: "إجمالي المبيعات", value: "76,257 ⃁", color: "#06b6d4" },
      { label: "خصم 50٪ على الوحدة الثانية", value: "✓", color: "#10b981" },
      { label: "نتائج سريعة وواضحة", value: "✓", color: "#f59e0b" },
    ],
    quote: "الفكرة بسيطة — 50٪ على المفرمة الثانية. لكن تنفيذها بشكل ذكي عبر زيادة غيّر الأرقام. العميل يشوف العرض لما يضيف الأولى فيضيف الثانية مباشرة. نتائج سريعة ومقنعة.",
    person: "فريق كايزون",
    role: "متجر أجهزة مطبخ ومنزلية",
    strategy: "تفعيل حملة عبر زيادة تعرض للعميل خصم 50% على المفرمة الثانية بمجرد إضافة الأولى للسلة، من خلال نافذة تسويقية جذابة داخل المتجر.",
    results: [
      "322 تحويل موثق عبر المنصة",
      "76,257 ⃁ إجمالي مبيعات محققة",
      "زيادة فعّالة لحجم الطلب بخصومات الوحدة الثانية",
      "رفع قيمة السلة دون زيادة الإنفاق الإعلاني",
    ],
  },
];

const SECTOR_ICONS: Record<string, string> = {
  "الكل": "✦",
  "مستلزمات التنظيف": "🧴",
  "العناية بالبشرة": "💄",
  "العطور والبخور": "🕌",
  "الأزياء الرجالية": "👔",
  "الغذاء والعسل": "🍯",
  "اللياقة البدنية": "💪",
  "التبرعات": "🤲",
  "الأجهزة المنزلية": "🏠",
  "العبايات": "🌙",
  "تسوق متنوع": "🛍️",
};

const sectors = [
  { name: "مستلزمات التنظيف", icon: "🧴", stores: "+45 متجر", avg: "+32% مبيعات" },
  { name: "العناية بالبشرة", icon: "💄", stores: "+120 متجر", avg: "+38% مبيعات" },
  { name: "العطور والبخور", icon: "🕌", stores: "+80 متجر", avg: "+34% مبيعات" },
  { name: "الأزياء الرجالية", icon: "👔", stores: "+150 متجر", avg: "+35% مبيعات" },
  { name: "الغذاء والعسل", icon: "🍯", stores: "+60 متجر", avg: "+28% مبيعات" },
  { name: "اللياقة البدنية", icon: "💪", stores: "+40 متجر", avg: "+30% مبيعات" },
  { name: "التبرعات", icon: "🤲", stores: "+30 متجر", avg: "+50% تبرعات" },
  { name: "الأجهزة المنزلية", icon: "🏠", stores: "+55 متجر", avg: "+26% مبيعات" },
  { name: "العبايات", icon: "🌙", stores: "+35 متجر", avg: "+32% مبيعات" },
  { name: "تسوق متنوع", icon: "🛍️", stores: "+25 متجر", avg: "+29% مبيعات" },
];

const allSectors = Array.from(new Set(stories.map(s => s.sector)));

function StoryCard({ s, index }: { s: typeof stories[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`story-card-v2 rv d${(index % 3) + 1}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="story-accent-line" style={{ background: s.color }} />

      <div className="story-header-v2">
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          <div className="story-logo-v2" style={{ background: s.color }}>
            {s.logo}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 22, fontWeight: 900, margin: 0, color: "var(--t)" }}>{s.store}</h3>
              <span className="platform-tag-v2">{s.platform}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--td)", marginTop: 4 }}>
              <span className="sector-badge-v2">
                {SECTOR_ICONS[s.sector] || "◆"} {s.sector}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="story-tagline-v2">{s.tagline}</div>

      <div className="story-metrics-v2">
        {s.metrics.map(m => (
          <div key={m.label} className="metric-card-v2">
            <div className="metric-value-v2" style={{ color: m.color }}>{m.value}</div>
            <div className="metric-label-v2">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="story-comparison-v2">
        <div className="comparison-box-v2 before-box">
          <div className="comparison-label-v2">قبل زيادة</div>
          <div className="comparison-row">
            <span className="comparison-key">متوسط الطلب</span>
            <span className="comparison-val">{s.before.aov} ⃁</span>
          </div>
          <div className="comparison-row">
            <span className="comparison-key">التحويل</span>
            <span className="comparison-val">{s.before.conv}</span>
          </div>
          <div className="comparison-row">
            <span className="comparison-key">المبيعات الشهرية</span>
            <span className="comparison-val">{s.before.monthly} ⃁</span>
          </div>
        </div>
        <div className="comparison-arrow-v2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="rgba(168,85,247,.15)" />
            <path d="M8 14H20M14 8L20 14L14 20" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="comparison-box-v2 after-box">
          <div className="comparison-label-v2 after-label">بعد زيادة</div>
          <div className="comparison-row">
            <span className="comparison-key">متوسط الطلب</span>
            <span className="comparison-val highlight">{s.after.aov} ⃁</span>
          </div>
          <div className="comparison-row">
            <span className="comparison-key">التحويل</span>
            <span className="comparison-val highlight">{s.after.conv}</span>
          </div>
          <div className="comparison-row">
            <span className="comparison-key">المبيعات الشهرية</span>
            <span className="comparison-val highlight">{s.after.monthly} ⃁</span>
          </div>
        </div>
      </div>

      <div className="story-quote-v2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(168,85,247,.3)" style={{ flexShrink: 0, marginTop: 2 }}>
          <path d="M11 7.5V11H7.5C7.5 12.3807 8.61929 13.5 10 13.5V15.5C7.51472 15.5 5.5 13.4853 5.5 11V7.5H11ZM18.5 7.5V11H15C15 12.3807 16.1193 13.5 17.5 13.5V15.5C15.0147 15.5 13 13.4853 13 11V7.5H18.5Z"/>
        </svg>
        <p style={{ margin: 0, fontSize: 14, color: "var(--tm)", lineHeight: 1.9, fontStyle: "italic" }}>{s.quote}</p>
      </div>

      <div className="story-footer-v2">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="story-person-avatar" style={{ background: s.color }}>{s.logo}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t)" }}>{s.person}</div>
            <div style={{ fontSize: 12, color: "var(--td)" }}>{s.role}</div>
          </div>
        </div>
        <button
          className="expand-btn-v2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "إخفاء التفاصيل" : "عرض التفاصيل"}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
            <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={`story-details-v2 ${expanded ? "expanded" : ""}`}>
        <div className="details-inner-v2">
          <div className="strategy-box-v2">
            <div className="strategy-title-v2">الاستراتيجية</div>
            <p style={{ margin: 0, fontSize: 14, color: "var(--tm)", lineHeight: 1.8 }}>{s.strategy}</p>
          </div>
          <div className="results-box-v2">
            <div className="results-title-v2">النتائج الموثقة</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {s.results.map(r => (
                <div key={r} className="result-item-v2">
                  <span className="result-check-v2">✓</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const [activeSector, setActiveSector] = useState("الكل");
  const [visible, setVisible] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [stickyFilter, setStickyFilter] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.querySelectorAll(".story-card-v2.rv").forEach(el => el.classList.add("on"));
  }, [activeSector, visible]);

  useEffect(() => {
    const handleScroll = () => {
      setStickyFilter(window.scrollY > 480);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectorChange = (sector: string) => {
    if (sector === activeSector) return;
    setVisible(false);
    setTimeout(() => {
      setActiveSector(sector);
      setVisible(true);
    }, 220);
  };

  const filteredStories = activeSector === "الكل"
    ? stories
    : stories.filter(s => s.sector === activeSector);

  const sectorCounts: Record<string, number> = { "الكل": stories.length };
  allSectors.forEach(sec => {
    sectorCounts[sec] = stories.filter(s => s.sector === sec).length;
  });

  const filterTabs = ["الكل", ...allSectors];

  return (
    <>
    <SEO
      title="قصص النجاح — متاجر زادت مبيعاتها مع زيادة"
      description="اكتشف كيف حققت متاجر سعودية رائدة نتائج استثنائية مع زيادة: من ريبال بـ 151,507 تحويل إلى التميمي بـ 932,517 ريال مبيعات. قصص نجاح حقيقية وأرقام موثقة."
      canonical="/success-stories"
    />
    <BreadcrumbSchema items={[{ name: "الرئيسية", url: "/" }, { name: "قصص النجاح", url: "/success-stories" }]} />
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font)", direction: "rtl", color: "var(--t)" }}>
      <style>{`
        .story-accent-line {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 3px;
          border-radius: 16px 16px 0 0;
        }
        .story-card-v2 {
          background: var(--s1);
          border: 1px solid var(--b1);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          backdrop-filter: blur(20px);
        }
        .story-card-v2:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 64px rgba(0,0,0,.4), 0 0 0 1px rgba(168,85,247,.15);
          border-color: rgba(168,85,247,.2);
        }
        .story-header-v2 {
          padding: 28px 32px 0;
          display: flex;
          align-items: flex-start;
          gap: 16;
        }
        .story-logo-v2 {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 900;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 6px 24px rgba(0,0,0,.3);
        }
        .platform-tag-v2 {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          color: var(--td);
        }
        .sector-badge-v2 {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--td);
          font-weight: 500;
        }
        .story-tagline-v2 {
          padding: 16px 32px 0;
          font-size: 17px;
          font-weight: 700;
          color: var(--t);
          line-height: 1.6;
        }
        .story-metrics-v2 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 20px 32px;
        }
        .metric-card-v2 {
          padding: 16px 14px;
          background: rgba(0,0,0,.2);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 14px;
          text-align: center;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .metric-card-v2:hover {
          border-color: rgba(168,85,247,.25);
          background: rgba(0,0,0,.3);
        }
        .metric-value-v2 {
          font-size: 24px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .metric-label-v2 {
          font-size: 11px;
          color: var(--td);
          font-weight: 500;
          line-height: 1.4;
        }
        .story-comparison-v2 {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 12px;
          align-items: center;
          padding: 0 32px 20px;
        }
        .comparison-box-v2 {
          padding: 16px 18px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .before-box {
          background: rgba(0,0,0,.15);
          border: 1px solid rgba(255,255,255,.05);
        }
        .after-box {
          background: rgba(124,58,237,.08);
          border: 1px solid rgba(124,58,237,.2);
        }
        .comparison-label-v2 {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--td);
          margin-bottom: 4px;
        }
        .comparison-label-v2.after-label {
          color: #c084fc;
        }
        .comparison-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .comparison-key {
          font-size: 12px;
          color: var(--td);
        }
        .comparison-val {
          font-size: 14px;
          font-weight: 800;
          color: var(--t);
        }
        .comparison-val.highlight {
          color: #a855f7;
        }
        .comparison-arrow-v2 {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .story-quote-v2 {
          display: flex;
          gap: 12px;
          padding: 0 32px 20px;
          align-items: flex-start;
        }
        .story-footer-v2 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          border-top: 1px solid rgba(255,255,255,.06);
        }
        .story-person-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .expand-btn-v2 {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid rgba(168,85,247,.25);
          background: rgba(168,85,247,.08);
          color: #c084fc;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font);
          transition: all 0.2s ease;
        }
        .expand-btn-v2:hover {
          background: rgba(168,85,247,.15);
          border-color: rgba(168,85,247,.4);
        }
        .story-details-v2 {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }
        .story-details-v2.expanded {
          max-height: 500px;
        }
        .details-inner-v2 {
          padding: 0 32px 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .strategy-box-v2 {
          padding: 20px;
          background: rgba(124,58,237,.06);
          border: 1px solid rgba(124,58,237,.15);
          border-radius: 14px;
        }
        .strategy-title-v2 {
          font-size: 13px;
          font-weight: 800;
          color: #c084fc;
          margin-bottom: 10px;
        }
        .results-box-v2 {
          padding: 20px;
          background: rgba(16,185,129,.06);
          border: 1px solid rgba(16,185,129,.15);
          border-radius: 14px;
        }
        .results-title-v2 {
          font-size: 13px;
          font-weight: 800;
          color: #10b981;
          margin-bottom: 10px;
        }
        .result-item-v2 {
          display: flex;
          gap: 8px;
          font-size: 13px;
          color: var(--tm);
          line-height: 1.6;
          align-items: flex-start;
        }
        .result-check-v2 {
          color: #10b981;
          font-weight: 800;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .filter-btn-v2 {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 12px;
          border: 1.5px solid var(--b1);
          background: var(--s1);
          color: var(--td);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.22s ease;
          font-family: var(--font);
          backdrop-filter: blur(12px);
        }
        .filter-btn-v2:hover {
          border-color: rgba(168,85,247,.4);
          color: var(--t);
          background: rgba(168,85,247,.08);
        }
        .filter-btn-v2.active {
          background: linear-gradient(135deg,#7c3aed,#a855f7);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 20px rgba(124,58,237,.35);
        }
        .filter-count-v2 {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          background: rgba(255,255,255,.15);
          line-height: 1;
        }
        .filter-btn-v2.active .filter-count-v2 {
          background: rgba(255,255,255,.25);
        }
        .filter-btn-v2:not(.active) .filter-count-v2 {
          background: rgba(168,85,247,.12);
          color: #a855f7;
        }
        .filter-scroll-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .filter-scroll-wrap {
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .filter-scroll-wrap::-webkit-scrollbar {
            display: none;
          }
        }
        .sticky-filter-bar {
          position: fixed;
          top: 80px;
          right: 0;
          left: 0;
          z-index: 800;
          padding: 14px 5%;
          background: rgba(10,10,20,.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,.06);
          transform: translateY(-100%);
          transition: transform 0.3s ease;
        }
        .sticky-filter-bar.visible {
          transform: translateY(0);
        }
        .stories-fade-v2 {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .stories-fade-v2.hidden {
          opacity: 0;
          transform: translateY(12px);
        }
        .stories-fade-v2.shown {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-stat-v2 {
          padding: 20px 32px;
          background: var(--s1);
          border: 1px solid var(--b1);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero-stat-v2:hover {
          transform: translateY(-4px);
          border-color: rgba(168,85,247,.3);
          box-shadow: 0 12px 40px rgba(0,0,0,.3);
        }
        .hero-stat-v2::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 2px;
          border-radius: 16px 16px 0 0;
        }
        .sector-card-v2 {
          padding: 24px 22px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .sector-card-v2:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,.3);
          border-color: rgba(168,85,247,.25);
        }
        .sector-card-v2::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #a855f7, #06b6d4);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .sector-card-v2:hover::after {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .sectors-grid-v2 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .story-metrics-v2 { grid-template-columns: 1fr 1fr !important; }
          .story-comparison-v2 { grid-template-columns: 1fr !important; gap: 8px !important; }
          .comparison-arrow-v2 { transform: rotate(90deg); justify-self: center; }
          .story-header-v2 { padding: 24px 20px 0 !important; }
          .story-tagline-v2 { padding: 12px 20px 0 !important; font-size: 15px !important; }
          .story-metrics-v2 { padding: 16px 20px !important; }
          .story-comparison-v2 { padding: 0 20px 16px !important; }
          .story-quote-v2 { padding: 0 20px 16px !important; }
          .story-footer-v2 { padding: 14px 20px !important; }
          .details-inner-v2 { grid-template-columns: 1fr !important; padding: 0 20px 20px !important; }
          .sectors-grid-v2 { grid-template-columns: 1fr 1fr !important; }
          .hero-stat-v2 { padding: 16px 20px; }
        }
        @media (max-width: 480px) {
          .story-metrics-v2 { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .metric-value-v2 { font-size: 20px !important; }
          .metric-card-v2 { padding: 12px 10px !important; }
          .sectors-grid-v2 { grid-template-columns: 1fr !important; }
          .filter-btn-v2 { padding: 8px 12px; font-size: 12px; gap: 4px; }
          .hero-stat-v2 { padding: 14px 16px; }
          .story-footer-v2 { flex-direction: column; gap: 12px; align-items: flex-start !important; }
        }
      `}</style>
      <div className="bg-wrap">
        <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>
        <div className="bg-grid"/>
      </div>
      <div className="noise"/>
      <ParticleBackground />
      <Nav />

      <section style={{ paddingTop: 140, paddingBottom: 24, textAlign: "center", position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>قصص نجاح حقيقية</div>
        <h1 className="st rv d1" style={{ fontSize: "clamp(42px,5vw,72px)", marginTop: 10, marginBottom: 12 }}>
          <span style={{ background: "linear-gradient(135deg,#a855f7,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>أثر مستدام</span>
          <br />
          <span style={{ fontSize: "clamp(24px,3vw,36px)", color: "var(--tm)", fontWeight: 700 }}>بأرقام موثقة من تجار حقيقيين</span>
        </h1>
        <p className="ssub rv d2" style={{ margin: "0 auto 28px", maxWidth: 600, fontSize: "clamp(14px,1.8vw,17px)", lineHeight: 1.8, color: "var(--td)" }}>
          +700 متجر استخدم زيادة لتحقيق نتائج استثنائية. نشاركك قصصهم الحقيقية بأرقام واضحة ونتائج ملموسة.
        </p>
        <div className="rv d3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            ["700+", "متجر نشط", "#a855f7"],
            ["10M+", "⃁ مبيعات إضافية", "#06b6d4"],
            ["35%", "متوسط زيادة الطلب", "#10b981"],
            ["90%", "رضا التجار", "#f59e0b"],
          ].map(([v, l, c]) => (
            <div key={l} className="hero-stat-v2" style={{ "--accent": c } as React.CSSProperties}>
              <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 2, background: c as string, borderRadius: "16px 16px 0 0" }} />
              <div style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: c as string, lineHeight: 1, marginBottom: 6 }}>{v}</div>
              <div style={{ fontSize: 13, color: "var(--td)", fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, paddingLeft: "5%", paddingRight: "5%", marginBottom: 20, marginTop: 8 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            ref={filterRef}
            className="rv d2 filter-scroll-wrap"
          >
            {filterTabs.map(sector => (
              <button
                key={sector}
                className={`filter-btn-v2${activeSector === sector ? " active" : ""}`}
                onClick={() => handleSectorChange(sector)}
              >
                <span>{SECTOR_ICONS[sector] || "◆"}</span>
                <span>{sector}</span>
                <span className="filter-count-v2">{sectorCounts[sector] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className={`sticky-filter-bar ${stickyFilter ? "visible" : ""}`}>
        <div className="filter-scroll-wrap" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filterTabs.map(sector => (
            <button
              key={sector}
              className={`filter-btn-v2${activeSector === sector ? " active" : ""}`}
              onClick={() => handleSectorChange(sector)}
              style={{ padding: "7px 14px", fontSize: 12 }}
            >
              <span>{SECTOR_ICONS[sector] || "◆"}</span>
              <span>{sector}</span>
              <span className="filter-count-v2">{sectorCounts[sector] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      <section style={{ position: "relative", zIndex: 2, paddingLeft: "5%", paddingRight: "5%", paddingBottom: 80 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {activeSector !== "الكل" && (
            <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 15, color: "var(--td)" }}>
                عرض <span style={{ color: "var(--p3)", fontWeight: 800 }}>{filteredStories.length}</span> قصة في قطاع{" "}
                <span style={{ color: "var(--t)", fontWeight: 700 }}>{activeSector}</span>
              </div>
              <button
                onClick={() => handleSectorChange("الكل")}
                style={{ fontSize: 12, color: "var(--td)", background: "rgba(168,85,247,.08)", border: "1px solid rgba(168,85,247,.2)", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontFamily: "var(--font)", transition: "all 0.2s" }}
              >
                عرض الكل
              </button>
            </div>
          )}
          <div
            className={`stories-fade-v2 ${visible ? "shown" : "hidden"}`}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {filteredStories.map((s, i) => (
              <StoryCard key={s.store + s.sector} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="stag rv" style={{ display: "inline-flex" }}><span className="stag-dot"/>حسب القطاع</div>
            <h2 className="st rv d1 font-semibold" style={{ marginBottom: 12 }}>نجاح في كل قطاع</h2>
            <p className="ssub rv d2" style={{ margin: "0 auto", color: "var(--td)" }}>زيادة يعمل مع جميع أنواع المتاجر — اكتشف النتائج في مجالك</p>
          </div>
          <div className="sectors-grid-v2 rv d2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {sectors.map(s => {
              const count = stories.filter(st => st.sector === s.name).length;
              return (
                <div
                  key={s.name}
                  className="gc sector-card-v2"
                  onClick={() => {
                    handleSectorChange(s.name);
                    window.scrollTo({ top: 520, behavior: "smooth" });
                  }}
                >
                  <div className="shine"/>
                  <div style={{ fontSize: 38, lineHeight: 1, flexShrink: 0 }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4, color: "var(--t)" }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "var(--td)", marginBottom: 6 }}>{s.stores} · {s.avg}</div>
                    {count > 0 && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#a855f7", fontWeight: 700, background: "rgba(168,85,247,.1)", padding: "3px 10px", borderRadius: 8 }}>
                        {count} قصة نجاح
                      </div>
                    )}
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 2, padding: "0 5% 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="gc cta-box rv" style={{ padding: "72px 56px" }}>
            <div className="shine"/><div className="cta-glow"/>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: 16, position: "relative", zIndex: 1 }}>متجرك القادم في قائمة النجاح</h2>
            <p style={{ color: "var(--tm)", fontSize: 17, marginBottom: 40, position: "relative", zIndex: 1 }}>انضم لـ +700 متجر وابدأ رحلتك اليوم</p>
            <div className="cta-btns">
              <button onClick={() => setPlatformModalOpen(true)} className="cta-btn cb-zid" style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff"/></svg>فعّل الآن</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    <PlatformModal open={platformModalOpen} onClose={() => setPlatformModalOpen(false)} />
    </>
  );
}
