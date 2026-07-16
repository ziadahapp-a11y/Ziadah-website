/**
 * Plan tiers available per use-case URL, aligned with PricingPage feature matrix.
 * Keys: route pathname (no /en prefix, no query).
 */

export type UseCasePlanKey = "s" | "g" | "p" | "b";

const AR: Record<UseCasePlanKey, string> = {
  s: "الانطلاقة",
  g: "النمو",
  p: "الاحترافية",
  b: "الأعمال",
};

const EN: Record<UseCasePlanKey, string> = {
  s: "Starter",
  g: "Growth",
  p: "Professional",
  b: "Business",
};

/** Canonical pathname → plan keys (ordered low → high). */
export const USE_CASE_PLAN_KEYS: Record<string, readonly UseCasePlanKey[]> = {
  "/use-cases/product-page": ["s", "g", "p", "b"],
  "/use-cases/cart": ["g", "p", "b"],
  "/use-cases/checkout": ["b"],
  "/use-cases/thank-you": ["p", "b"],
  "/use-cases/home": ["b"],
  "/use-cases/category": ["b"],
  "/use-cases/all-pages": ["b"],

  "/use-cases/cross-sell": ["s", "g", "p", "b"],
  "/use-cases/upsell": ["s", "g", "p", "b"],
  "/use-cases/add-to-cart": ["g", "p", "b"],
  "/use-cases/remove-from-cart": ["g", "p", "b"],

  "/use-cases/related-products": ["s", "g", "p", "b"],
  "/use-cases/addons": ["s", "g", "p", "b"],
  "/use-cases/buy-together": ["s", "g", "p", "b"],
  "/use-cases/bundle-deals": ["s", "g", "p", "b"],
  "/use-cases/buy-more-save-more": ["s", "g", "p", "b"],

  "/use-cases/more-cart-items": ["g", "p", "b"],
  "/use-cases/free-shipping": ["p", "b"],
  "/use-cases/discount-coupon": ["g", "p", "b"],

  "/use-cases/increase-aov": ["s", "g", "p", "b"],
  "/use-cases/reduce-abandon": ["g", "p", "b"],
  "/use-cases/increase-conversion": ["s", "g", "p", "b"],
  "/use-cases/customer-experience": ["p", "b"],

  "/use-cases/by-pages": ["s", "g", "p", "b"],
  "/use-cases/by-activity": ["s", "g", "p", "b"],
  "/use-cases/by-presentation": ["s", "g", "p", "b"],
  "/use-cases/by-goal": ["s", "g", "p", "b"],
  "/use-cases/by-experience": ["p", "b"],
};

export function normalizeUseCasePath(path: string): string {
  let p = path.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/^\/en(?=\/|$)/, "");
  const base = p.split("?")[0]?.split("#")[0] ?? p;
  return base || "/";
}

export function planKeysForUseCasePath(path: string): readonly UseCasePlanKey[] | null {
  const n = normalizeUseCasePath(path);
  const keys = USE_CASE_PLAN_KEYS[n];
  return keys ?? null;
}

export function planLabelsForUseCasePath(path: string, lang: "ar" | "en"): string[] {
  const keys = planKeysForUseCasePath(path);
  if (!keys?.length) return [];
  const L = lang === "ar" ? AR : EN;
  return keys.map((k) => L[k]);
}
