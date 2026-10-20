import type { WidgetKind } from "@/components/widgets/storefrontSets";
import { WIDGET_KINDS } from "@/components/widgets/storefrontSets";

/**
 * WHICH SHAPES A SOLUTION PAGE FANS IN ITS HERO.
 *
 * The sector heroes build their deck from data - each sector file already
 * carries its own moments with its own products. A solution page has no such
 * data: it is about ONE mechanism, and the products it would use are whatever
 * shop you imagine. So the deck here is the mechanism itself, in front, with
 * the shapes that sit next to it in a real shop behind.
 *
 * The lead is always first. That matters: the deck opens on the card the
 * reader came for, and the neighbours are context, not a quiz.
 *
 * "NOT ALL OF THEM NEED TO APPEAR" is the rule, not the exception. A page
 * about coupons fans three cards, a page about every placement fans twelve.
 * A deck padded out to a fixed twelve on every page would say the same thing
 * everywhere, which is the thing a solution page exists not to do.
 */
const DECKS: Record<string, WidgetKind[]> = {
  /* ---- by placement: what that page of a shop can carry ---- */
  "product-page": ["replace", "kit", "quantity", "buythemall"],
  "cart": ["drawer", "cartvalue", "addmore", "coupon"],
  "checkout": ["cartvalue", "addmore", "coupon", "drawer"],
  "thank-you": ["thankyou", "routine", "addmore"],
  "home": ["routine", "buythemall", "kit"],
  "category": ["buythemall", "routine", "kit", "quantity"],
  "add-to-cart": ["drawer", "addmore", "buythemall", "kit"],
  "remove-from-cart": ["replace", "coupon", "cartvalue"],
  /* The page whose whole argument is "everywhere" gets the whole set. */
  "all-pages": WIDGET_KINDS,

  /* ---- by goal: the shapes that move that number ---- */
  "increase-aov": ["bmsm", "kit", "cartvalue", "addmore", "buythemall"],
  "reduce-abandon": ["drawer", "coupon", "cartvalue", "addmore"],
  "increase-conversion": ["replace", "coupon", "cartvalue", "thankyou"],
  "more-cart-items": ["addmore", "cartvalue", "bmsm", "buythemall"],
  "cross-sell": ["buythemall", "kit", "addmore", "routine"],
  "upsell": ["replace", "quantity", "bmsm", "kit"],
  "customer-experience": ["routine", "steps", "drawer", "thankyou"],

  /* ---- by mechanism: the page's own shape, then its relatives ---- */
  "related-products": ["routine", "buythemall", "addmore", "kit"],
  "addons": ["addmore", "kit", "steps", "buythemall"],
  "buy-together": ["buythemall", "kit", "steps", "routine"],
  "bundle-deals": ["kit", "steps", "buythemall", "bmsm"],
  "buy-more-save-more": ["bmsm", "quantity", "cartvalue"],
  "free-shipping": ["cartvalue", "addmore", "drawer"],
  "discount-coupon": ["coupon", "bmsm", "cartvalue"],

  /* ---- the overview pages ---- */
  "by-pages": ["drawer", "replace", "cartvalue", "thankyou", "buythemall"],
  "by-activity": ["kit", "routine", "steps", "bmsm"],
  "by-goal": ["bmsm", "cartvalue", "buythemall", "replace", "coupon"],
  "by-experience": ["routine", "steps", "drawer", "thankyou"],
  /* Same reasoning as `all-pages`: the subject is the set. */
  "by-presentation": WIDGET_KINDS,
};

/**
 * The shapes for a `/use-cases/...` path, or none if the page is not one of
 * the mapped solutions - in which case its hero keeps whatever it had, which
 * is the right outcome for a page nobody has decided the shapes for yet.
 */
export function useCaseDeckKinds(pathname: string): WidgetKind[] {
  const m = pathname.match(/^\/(?:en\/)?use-cases\/([a-z0-9-]+)\/?$/i);
  if (!m) return [];
  return DECKS[m[1].toLowerCase()] ?? [];
}
