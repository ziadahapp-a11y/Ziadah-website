import type { SectorQuickTip } from "./sectorPageTypes";

/** Three tips shown above sector CTA when `slimSectorPage` is on — one row per vertical */
export const sectorQuickTipsBySlug: Record<string, [SectorQuickTip, SectorQuickTip, SectorQuickTip]> = {
  "delivery-apps": [
    { num: "70/20/10", ar: "70% توصيات مجربة، 20% تحسينات، 10% تجارب جديدة", en: "70% proven, 20% improvements, 10% new tests" },
    { num: "≤2", ar: "حد أقصى توصيتين في نفس الشاشة", en: "Max 2 recommendations per screen" },
    { num: "3 أيام", ar: "أوقف أي عرض ذي نسبة نقر منخفضة لـ 3 أيام تلقائياً", en: "Auto-pause any offer with low CTR for 3 days" },
  ],
  "ecommerce-platforms": [
    { num: "3 مؤشرات", ar: "تجربة + تجارة + عدالة الظهور في مؤشر واحد", en: "Experience + commerce + fairness in one KPI set" },
    { num: "سقف", ar: "سقف ظهور لكل بائع حسب القواعد", en: "Exposure ceiling per vendor under rules" },
    { num: "أسبوعي", ar: "تحديث أوزان أسبوعي للفائزين", en: "Weekly weight refresh for winners" },
  ],
  "abayas-fashion": [
    { num: "وسوم", ar: "وسوم لون + مناسبة + مقاس", en: "Tag by color + occasion + size" },
    { num: "تصوير", ar: "تصوير الأطقم على نفس الموديل", en: "Outfit photography on same model" },
    { num: "≤2", ar: "اقتراحا طقم كحد أقصى لكل شاشة", en: "Max 2 outfit suggestions per screen" },
  ],
  "health-fitness": [
    { num: "هدف", ar: "وسوم هدف: تخسيس / عضلات / طاقة", en: "Tag by goal: cut / bulk / energy" },
    { num: "حزم", ar: "حزم شهرية للمستهلكات", en: "Monthly bundles for consumables" },
    { num: "تقارير", ar: "تقارير منفصلة حسب الهدف", en: "Separate reports by goal" },
  ],
  "digital-products": [
    { num: "مستوى", ar: "وسم مستوى: مبتدئ → محترف", en: "Level tag: beginner → pro" },
    { num: "شكر", ar: "صفحة الشكر لأفضل ترقية تالية", en: "Use thank-you page for next upsell" },
    { num: "30–60 د", ar: "قسيمة مؤقتة 30–60 دقيقة فقط", en: "Timed coupon 30–60 min only" },
  ],
  electronics: [
    { num: "رمز", ar: "حدّث حقول الموديل ورمز المنتج", en: "Keep SKU/model fields updated" },
    { num: "واحد", ar: "إضافة واحدة مركزة عند الدفع", en: "One focused add-on at checkout" },
    { num: "توافق", ar: "تحقق من التوافق قبل العرض", en: "Check compatibility before showing" },
  ],
  jewelry: [
    { num: "واحد", ar: "اقتراح أنيق واحد لكل سياق", en: "One elegant suggestion per context" },
    { num: "عيار", ar: "العيار + الشهادة في كل صورة", en: "Karat + certificate in all images" },
    { num: "أسبوعان", ar: "الحزم قبل الموسم بأسبوعين", en: "Bundle works best 2 weeks before season" },
  ],
  "beauty-care": [
    { num: "بشرة", ar: "تجميع حسب نوع البشرة + الهدف", en: "Group by skin type + goal" },
    { num: "خط", ar: "توصيات من نفس الخط فقط", en: "Same-line suggestions only" },
    { num: "مكوّنات", ar: "قائمة مكوّنات للبشرة الحساسة", en: "Ingredient list for sensitive skin" },
  ],
  "restaurants-cafes": [
    { num: "توفر", ar: "حدّث التوفر لحظياً", en: "Update stock availability live" },
    { num: "ذروة", ar: "حزم الذروة 11ص–2م", en: "Peak-time bundles 11am–2pm" },
    { num: "صورة", ar: "صور شهية إلزامية", en: "Appetite photography mandatory" },
  ],
  "home-supplies": [
    { num: "أبعاد", ar: "الأبعاد + التوافق في العنوان", en: "Dimensions + compatibility in title" },
    { num: "كميات", ar: "اشتر أكثر ووفر على المستهلكات", en: "Buy More Save More on consumables" },
    { num: "موسم", ar: "حزم رمضان والعودة للمدارس", en: "Seasonal bundles (Ramadan, back-to-school)" },
  ],
  "service-design": [
    { num: "ترقية 1", ar: "ترقية واحدة منطقية لكل شراء", en: "Max 1 upsell per purchase — logical jump" },
    { num: "شكر", ar: "صفحة الشكر = أعلى تحويل", en: "Thank-you page = highest CVR point" },
    { num: "ساعتان", ar: "قسيمة ساعتين للباقات المميزة", en: "2-hour coupon for premium packages" },
  ],
  charities: [
    { num: "هدوء", ar: "لغة هادئة — بلا ضغط", en: "Calm language — no pressure" },
    { num: "≤2", ar: "سببان كحد أقصى في الشاشة", en: "Max 2 causes shown at once" },
    { num: "بعد الشكر", ar: "إضافة بعد الشكر = أفضل توقيت", en: "Thank-you add-on = best timing" },
  ],
  clinics: [
    { num: "مراجعة", ar: "مراجعة طبية للنصوص", en: "Medical copy reviewed by specialist" },
    { num: "نبرة", ar: "نبرة إرشاد لا بيع مباشر", en: "Advisory tone not sales tone" },
    { num: "بعد", ar: "بعد الإجراء = أفضل لحظة ترقية", en: "Post-procedure = best upsell moment" },
  ],
  "digital-cards": [
    { num: "كتالوج", ar: "كتالوجات منفصلة لكل منصة", en: "Platform-separated catalogs" },
    { num: "أسبوعي", ar: "المشترون الأسبوعيون = أفضل هدف", en: "Weekly buyers = best upsell targets" },
    { num: "وضوح", ar: "وضوح التسليم الفوري أهم من الخيارات", en: "Instant delivery clarity > options" },
  ],
  gold: [
    { num: "واحد", ar: "اقتراح واحد محترم", en: "One respectful suggestion only" },
    { num: "عيار", ar: "العيار + الشهادة في كل صورة", en: "Karat + certificate visible in all images" },
    { num: "أسبوعان", ar: "حزم الزفاف قبل أسبوعين", en: "Wedding bundles 2 weeks before season" },
  ],
  livestock: [
    { num: "استلام", ar: "نوافذ استلام واضحة تقلل الاتصال", en: "Clear pickup windows reduce calls" },
    { num: "مبكر", ar: "افتح الحجز مبكراً", en: "Open bookings early" },
    { num: "شكر", ar: "صفحة الشكر = لحظة إضافة خيرية", en: "Thank-you page = charity add-on moment" },
  ],
};
