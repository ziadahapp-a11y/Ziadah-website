import type { SectorContent } from "./sectors";

/** يدمج مع القطاع الأساسي — بطاقات المراحل، المساعدة، وأفضل الممارسات، وأمثلة محدثة */
export const sectorLearningOverrides: Partial<Record<string, Partial<SectorContent>>> = {
  "delivery-apps": {
    taglineAr:
      "زيادة يتابع عميلك من لحظة فتح التطبيق لما يضغط اطلب — يقترح الإضافة الصح في الوقت الصح بالذكاء الاصطناعي",
    taglineEn:
      "Ziadah tracks your customer from app open to order placed — suggesting the right addition at the right moment with AI",
    seoDescAr:
      "تطبيقات التوصيل مع زيادة: كل حالات الاستخدام، تتبع الرحلة، محرك قطاعي، قياس CTR وAOV، وجدول خصائص كامل — من البرجر للبقالة والصيدلية.",
    seoDescEn:
      "Delivery apps with Ziadah: every use case, journey tracking, sector AI context, CTR/AOV measurement, and a full feature matrix — food, grocery, and pharmacy.",
    examplesAr: [
      "🍔 Cross-sell طعام — بيتزا عائلية → مشروب 1 لتر + بطاطس ودجز — AOV +34%",
      "➕ Add-ons — برجر دبل → جبن إضافي + صوص حار — Attachment +35%",
      "📦 Bundle — ساندويتش → حزمة غداء مكتب كاملة -18% — AOV +60%",
      "🛒 Buy More Save More بقالة — 1 مياه → 3 عبوات -15% — Basket +40%",
      "💊 Related صيدلية — أموكسيسيلين → بروبيوتيك + فيتامين C — Attachment +35%",
      "🗑️ Cart Rescue — حذف ستيك → دجاج مشوي 54ر.س — استرداد 30%",
    ],
    examplesEn: [
      "🍔 Food cross-sell — family pizza → 1L drink + wedges — AOV +34%",
      "➕ Add-ons — double burger → cheese + hot sauce — Attachment +35%",
      "📦 Bundle — sandwich → office lunch bundle -18% — AOV +60%",
      "🛒 Grocery BMSM — 1 water → 3-pack -15% — Basket +40%",
      "💊 Pharmacy related — amoxicillin → probiotic + vitamin C — Attachment +35%",
      "🗑️ Cart rescue — remove steak → grilled chicken — 30% saved orders",
    ],
    experienceAr:
      "في التوصيل، السرعة والصلة هما كل شيء: زيادة يقيس كل use case على حدة، يفعّل عشر نقاط في الرحلة، ويمنحك قوالب تُنسخ بين المدن بعد ما يثبت فعلياً.",
    experienceEn:
      "In delivery, speed and relevance are everything: Ziadah measures each use case separately, activates ten journey touchpoints, and turns winners into city-playbooks once proven.",
  },
  "ecommerce-platforms": {
    useCardLayout: true,
    taglineAr: "زيادة يوازن بين صلة التوصية وعدالة ظهور البائعين وتجربة شحن متكاملة في بيئة متعددة البائعين",
    taglineEn: "Ziadah balances recommendation relevance, vendor exposure fairness, and integrated shipping in a multi-vendor environment",
    seoDescAr:
      "منصات التسوق مع زيادة: توصيات داخل وعبر البائعين، لوحتان للمنصة وللبائع، وشحن يدخل قرار التوصية.",
    seoDescEn:
      "Marketplaces with Ziadah: intra- and cross-seller recommendations, dual dashboards, shipping-aware ranking.",
    howToPhaseCards: [
      { emoji: "📦", titleAr: "بنية المنصة", titleEn: "Platform foundation", bulletsAr: ["وحّد taxonomy والسمات عبر البائعين + Data Quality Score + استبعد الموردين دون الحد"], bulletsEn: ["Unify taxonomy + DQS + gate low-quality feeds"] },
      { emoji: "⚖️", titleAr: "حوكمة العرض", titleEn: "Exposure governance", bulletsAr: ["موازنة الصلة والأداء وتنوع البائعين + Cold-start boost"], bulletsEn: ["Balance relevance, performance, diversity + cold-start"] },
      { emoji: "📍", titleAr: "تفعيل اليوز كيسس", titleEn: "Use-case rollout", bulletsAr: ["Related، Add-ons، Buy Together، Bundles، Cross، Upsell، شحن، كوبون، Rescue"], bulletsEn: ["Full feature stack across journey"] },
      { emoji: "🚚", titleAr: "استراتيجية الشحن", titleEn: "Shipping strategy", bulletsAr: ["أدمج تكلفة/سرعة الشحن في قرار التوصية"], bulletsEn: ["Cost/speed in ranking"] },
      { emoji: "📊", titleAr: "لوحتا التقارير", titleEn: "Dual dashboards", bulletsAr: ["لوحة المنصة + لوحة لكل بائع"], bulletsEn: ["Operator + per-seller views"] },
      { emoji: "⚡", titleAr: "الإيقاع التشغيلي", titleEn: "Ops cadence", bulletsAr: ["مراجعة أسبوعية + يومية في المواسم"], bulletsEn: ["Weekly policies + daily peaks"] },
    ],
    helpCards: [
      { emoji: "🧩", bodyAr: "يوصي داخل بائع واحد أو عبر بائعين مختلفين وفق قواعد المنصة", bodyEn: "Intra- or cross-seller under platform rules" },
      { emoji: "🔍", bodyAr: "يرفع عمق الاكتشاف بترتيب ديناميكي حسب نية العميل الفعلية", bodyEn: "Intent-driven discovery depth" },
      { emoji: "🎯", bodyAr: "يحسّن التحويل بتجربة شخصية على مستوى الجلسة", bodyEn: "Session-level personalization" },
      { emoji: "📦", bodyAr: "يرفع AOV بتجميع منتجات مكملة من بائع أو عدة بائعين", bodyEn: "Complementary sets across sellers" },
      { emoji: "🔄", bodyAr: "يقلل Dead-end pages بتوصيات خروج ذكية", bodyEn: "Smart exit paths" },
      { emoji: "⚖️", bodyAr: "يوازن عملياً بين عدالة الظهور للبائعين والأداء التجاري", bodyEn: "Fairness + performance balance" },
      { emoji: "📈", bodyAr: "تحليلات أي use case أنجح لكل فئة ولكل بائع", bodyEn: "Use-case analytics by category & seller" },
      { emoji: "🤝", bodyAr: "يدعم فرق المبيعات بدليل بيانات لإقناع البائعين بالانضمام", bodyEn: "Sales enablement with data" },
    ],
    bestCards: [
      { emoji: "📏", textAr: "KPI ثلاثي: تجربة + تجارة + عدالة الظهور", textEn: "Triple KPI: experience + commerce + fairness" },
      { emoji: "🔝", textAr: "طبّق ceiling للظهور لكل بائع", textEn: "Exposure ceilings per seller" },
      { emoji: "🚫", textAr: "قواعد استبعاد قوية: مخزون منخفض، شحن بطيء، تقييمات ضعيفة", textEn: "Strict exclusions" },
      { emoji: "🗂️", textAr: "سياسات منفصلة لكل فئة رئيسية", textEn: "Category-specific policies" },
      { emoji: "🔄", textAr: "حدّث أوزان الترتيب أسبوعياً", textEn: "Weekly weight refresh" },
      { emoji: "🤝", textAr: "برنامج توصيات مشترك بمتطلبات جودة", textEn: "Joint program with quality bar" },
      { emoji: "📅", textAr: "راقب المواسم الثقيلة يومياً", textEn: "Daily monitoring in peaks" },
      { emoji: "📋", textAr: "وثّق A/B لتكوين playbook داخلي", textEn: "Document tests → playbook" },
    ],
    examplesAr: [
      "🔍 Search — كرسي مكتب → ترتيب حسب النطاق السعري — CTR +40%",
      "🔗 Cross-vendor — لابتوب A → ماوس ولوحة B أسرع شحناً — AOV +25%",
      "➕ Add-ons — كاميرا → ذاكرة + بطارية — Attachment +35%",
      "📦 Bundle — حزمة مكتب منزلي من 4 بائعين -18% — AOV +60%",
      "⬆️ Upsell — سماعة اقتصادية → ANC + ضمان — Margin +22%",
      "🗑️ Cart Rescue — هاتف غالٍ → بديل وظيفي — استرداد 30%",
    ],
    examplesEn: [
      "🔍 Search personalization — desk chair by price comfort — CTR +40%",
      "🔗 Cross-vendor laptop → mouse/keyboard faster ship — AOV +25%",
      "➕ Camera add-ons — memory + battery — Attachment +35%",
      "📦 Home office bundle 4 sellers -18% — AOV +60%",
      "⬆️ Headset upsell to ANC + warranty — Margin +22%",
      "🗑️ Phone rescue — functional substitute — 30% recovery",
    ],
    experienceAr:
      "المنصات تحتاج توازناً دقيقاً بين الصلة وعدالة الظهور والشحن؛ زيادة يعطيك لوحتين للقياس وقواعد واضحة للبائعين الجدد دون كسر التحويل.",
    experienceEn:
      "Marketplaces need relevance, fair exposure, and shipping coherence; Ziadah gives dual dashboards and calibrated new-seller boosts without hurting conversion.",
  },
};
