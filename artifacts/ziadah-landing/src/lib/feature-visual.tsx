import type { ComponentType } from "react";
import RelatedProductsWidget from "@/components/widgets/RelatedProductsWidget";
import AddonsWidget from "@/components/widgets/AddonsWidget";
import BuyTogetherWidget from "@/components/widgets/BuyTogetherWidget";
import BundleDealsWidget from "@/components/widgets/BundleDealsWidget";
import BuyMoreSaveMoreWidget from "@/components/widgets/BuyMoreSaveMoreWidget";
import ProductSwapWidget from "@/components/widgets/ProductSwapWidget";
import CouponWidget from "@/components/widgets/CouponWidget";
import CrossSellWidget from "@/components/widgets/CrossSellWidget";
import FreeShippingThresholdWidget from "@/components/widgets/FreeShippingThresholdWidget";
import HomePageWidget from "@/components/widgets/HomePageWidget";
import CategoryPageWidget from "@/components/widgets/CategoryPageWidget";
import IncreaseAOVWidget from "@/components/widgets/IncreaseAOVWidget";
import AddToCartWidget from "@/components/widgets/AddToCartWidget";

/**
 * Which storefront surface each capability actually shows.
 *
 * The reference's product template reads a `visual-manifest` so the hero can
 * carry THE PRODUCT rather than a decorative mark - a device for something the
 * customer holds, a dashboard for something the merchant configures. Ziadah's
 * equivalent is the widget previews: they already draw the exact surface a
 * merchant would see in their own store, and they were rebuilt to read as real
 * storefront UI rather than a template.
 *
 * Before this, `/features/:slug` put the capability's lucide icon in a pill in
 * the hero and showed the product nowhere on the page. Nineteen pages about
 * storefront widgets, and not one of them showed the widget.
 *
 * A capability with no surface of its own falls back to `null` and the page
 * drops the media column rather than forcing an unrelated screen into it.
 */
const VISUAL_OF: Record<string, ComponentType> = {
  /* Goals — what the merchant is trying to move. */
  "more-products": CrossSellWidget,
  "quantity-offers": BuyMoreSaveMoreWidget,
  "product-swap": ProductSwapWidget,
  "cart-value": FreeShippingThresholdWidget,
  "discount-code": CouponWidget,

  /* Presentations — the shape the suggestion takes. */
  "related-products": RelatedProductsWidget,
  "add-ons": AddonsWidget,
  "bought-together": BuyTogetherWidget,
  combo: BundleDealsWidget,
  "buy-more-save-more": BuyMoreSaveMoreWidget,

  /* Placements — where on the storefront it appears. Each takes the widget
     that genuinely runs at that placement, which is why `checkout-page` gets
     the add-ons preview (a light complementary item is what runs there) and
     `cart-page` gets the cart-value one. */
  "product-page": RelatedProductsWidget,
  "category-page": CategoryPageWidget,
  "cart-page": IncreaseAOVWidget,
  "checkout-page": AddonsWidget,
  "thank-you-page": AddToCartWidget,
  "exit-intent": CouponWidget,
  "home-page": HomePageWidget,
  "search-page": RelatedProductsWidget,
  "smart-popup": CouponWidget,
};

export function featureVisual(slug: string): ComponentType | null {
  return VISUAL_OF[slug] ?? null;
}
