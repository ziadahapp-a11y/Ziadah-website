/** ملخص قصير لكل مجموعة في خريطة الحلول — يظهر في تبويبات القطاع */

export type MatrixGroupSummary = { ar: string; en: string };

export const solutionMatrixGroupSummaries: Record<string, MatrixGroupSummary> = {
  pages: {
    ar: "كل صفحات المتجر: رئيسية، تصنيف، منتج، سلة، دفع، شكر — وربطها برحلة واحدة.",
    en: "Every store page: home, category, product, cart, checkout, thank-you — one connected journey.",
  },
  activity: {
    ar: "أفعال العميل: بيع تكميلي، ترقية، لحظة الإضافة للسلة، والاحتفاظ عند الحذف.",
    en: "Shopper actions: cross-sell, upsell, add-to-cart moment, and save-on-remove.",
  },
  presentation: {
    ar: "أشكال العرض: ذات صلة، إضافات، شراء معاً، حزم، وشراء أكثر ووفر أكثر.",
    en: "How it looks: related, add-ons, buy together, bundles, and tier savings.",
  },
  goal: {
    ar: "أهدافك: زيادة بنود السلة، ترقية المنتج، عروض الكمية، الشحن المجاني، والكوبون.",
    en: "Your goals: more items, upgrade SKU, quantity deals, free shipping, coupons.",
  },
  experience: {
    ar: "تجربة متسقة: إيقاع واضح وإزعاج أقل عبر كل لمسات الرحلة.",
    en: "Cohesive experience: clear rhythm and less fatigue across touchpoints.",
  },
};

export function getMatrixGroupSummary(groupId: string, lang: "ar" | "en"): string {
  const s = solutionMatrixGroupSummaries[groupId];
  if (!s) return "";
  return lang === "ar" ? s.ar : s.en;
}
