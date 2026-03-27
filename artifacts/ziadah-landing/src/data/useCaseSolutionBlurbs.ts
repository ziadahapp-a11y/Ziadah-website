/**
 * سطر واحد لكل مسار حل — يعكس صفحات حالات الاستخدام ويربط «الخريطة» بالمتجر.
 */

export type UseCaseBlurb = { ar: string; en: string };

export const useCaseSolutionBlurbs: Record<string, UseCaseBlurb> = {
  "/use-cases/product-page": {
    ar: "اقتراحات مكمّلة وبدائل وترقيات على صفحة المنتج — حيث يقرر العميل.",
    en: "Complements, alternatives, and upgrades on the PDP — where decisions happen.",
  },
  "/use-cases/cart": {
    ar: "رفع قيمة السلة قبل الدفع: عروض لحظية، شحن مجاني، وإضافات ذكية.",
    en: "Lift cart value before checkout: timely offers, free shipping, smart add-ons.",
  },
  "/use-cases/checkout": {
    ar: "لحظة الدفع: عروض خفيفة لا تعيق إتمام الطلب وتزيد القبول.",
    en: "Checkout moment: light offers that don’t block completion and lift acceptance.",
  },
  "/use-cases/thank-you": {
    ar: "بعد الشراء: بذرة الطلب التالي بعرض مخصص على صفحة الشكر.",
    en: "Post-purchase: seed the next order with a tailored thank-you offer.",
  },
  "/use-cases/home": {
    ar: "الصفحة الرئيسية: ترحيب وترتيب يعكسان سلوك كل زائر.",
    en: "Home: welcome and ranking that reflect each visitor’s behavior.",
  },
  "/use-cases/category": {
    ar: "تصنيف: ترتيب ووسوم ثقة تختصر مسار الاختيار.",
    en: "Category: ordering and trust cues that shorten the path to choice.",
  },
  "/use-cases/all-pages": {
    ar: "تغطية كاملة لرحلة العميل من أول زيارة حتى الشكر.",
    en: "Full journey coverage from first visit through thank-you.",
  },
  "/use-cases/cross-sell": {
    ar: "منتجات تكمّل ما في السلة أو السلة السابقة — دون إزعاج.",
    en: "Items that complement cart or history — without noisy prompts.",
  },
  "/use-cases/upsell": {
    ar: "ترقية لنسخة أفضل أو حزمة أعلى قيمة عند الاهتمام الطويل.",
    en: "Upgrade to a better SKU or bundle when intent is strong.",
  },
  "/use-cases/add-to-cart": {
    ar: "لحظة الإضافة: إضافات سريعة بشيت أو بطاقة خفيفة.",
    en: "Add moment: quick add-ons via sheet or light cards.",
  },
  "/use-cases/remove-from-cart": {
    ar: "عند الحذف: احتفاظ ببديل أو عرض يحافظ على الزخم.",
    en: "On remove: retention swap or offer that keeps momentum.",
  },
  "/use-cases/related-products": {
    ar: "ذات صلة حقيقية بالمنتج الحالي وليس «الأكثر مبيعاً» فقط.",
    en: "True related picks for the current SKU — not bestsellers-only.",
  },
  "/use-cases/addons": {
    ar: "إضافات صغيرة ترفع هامش الطلب دون تضخيم السلة.",
    en: "Small add-ons that lift margin without bloating the cart.",
  },
  "/use-cases/buy-together": {
    ar: "شراء معاً: حزم منطقية من سلوك مشابه لعملائك.",
    en: "Buy together: bundles learned from peers’ behavior.",
  },
  "/use-cases/bundle-deals": {
    ar: "عروض حزم بسعر أفضل من الشراء المنفصل.",
    en: "Bundle pricing better than buying items separately.",
  },
  "/use-cases/buy-more-save-more": {
    ar: "شراء أكثر وفر أكثر — شرائح كمية واضحة.",
    en: "Tiered quantity savings with clear thresholds.",
  },
  "/use-cases/more-cart-items": {
    ar: "هدف: زيادة عدد بنود السلة بعروض مناسبة للكمية.",
    en: "Goal: more line items with quantity-aware offers.",
  },
  "/use-cases/free-shipping": {
    ar: "عرض وصول للشحن المجاني مع منتج يسد الفجوة.",
    en: "Free-shipping progress with a filler SKU to close the gap.",
  },
  "/use-cases/discount-coupon": {
    ar: "كوبونات بمدى زمني قصير — خروج، سلة، أو لحظة قرار.",
    en: "Short-window codes — exit, cart, or decision moments.",
  },
  "/use-cases/customer-experience": {
    ar: "تجربة متسقة: إيقاع، إزعاج منخفض، ووضوح في كل لمسة.",
    en: "Consistent UX: rhythm, low fatigue, clarity at every touch.",
  },
};

export function getUseCaseBlurb(href: string): UseCaseBlurb | undefined {
  return useCaseSolutionBlurbs[href];
}
