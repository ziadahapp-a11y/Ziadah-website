/** هيكل «الحلول» — روابط تتوافق مع `Nav` ومسارات التطبيق */

export type SolutionMatrixEntry = {
  href: string;
  titleKey: string;
  subKey?: string;
};

export type SolutionMatrixGroup = {
  id: string;
  hubHref: string;
  titleKey: string;
  entries: SolutionMatrixEntry[];
};

export const useCasesSolutionsMatrix: SolutionMatrixGroup[] = [
  {
    id: "pages",
    hubHref: "/use-cases/by-pages",
    titleKey: "useCaseByPage",
    entries: [
      { href: "/use-cases/product-page", titleKey: "productPage" },
      { href: "/use-cases/cart", titleKey: "cartPage" },
      { href: "/use-cases/checkout", titleKey: "checkoutPage" },
      { href: "/use-cases/thank-you", titleKey: "thankYouPage" },
      { href: "/use-cases/home", titleKey: "homePage" },
      { href: "/use-cases/category", titleKey: "categoryPage" },
      { href: "/use-cases/all-pages", titleKey: "allPages" },
    ],
  },
  {
    id: "activity",
    hubHref: "/use-cases/by-activity",
    titleKey: "useCaseByActivity",
    entries: [
      { href: "/use-cases/cross-sell", titleKey: "crossSell", subKey: "crossSellSub" },
      { href: "/use-cases/upsell", titleKey: "upsell", subKey: "upsellSub" },
      { href: "/use-cases/add-to-cart", titleKey: "addToCart", subKey: "addToCartSub" },
      { href: "/use-cases/remove-from-cart", titleKey: "removeFromCart", subKey: "removeFromCartSub" },
    ],
  },
  {
    id: "presentation",
    hubHref: "/use-cases/by-presentation",
    titleKey: "useCaseByPresentation",
    entries: [
      { href: "/use-cases/related-products", titleKey: "relatedProducts", subKey: "relatedProductsSub" },
      { href: "/use-cases/addons", titleKey: "addons", subKey: "addonsSub" },
      { href: "/use-cases/buy-together", titleKey: "buyTogether", subKey: "buyTogetherSub" },
      { href: "/use-cases/bundle-deals", titleKey: "bundleDeals", subKey: "bundleDealsSub" },
      { href: "/use-cases/buy-more-save-more", titleKey: "buyMoreSaveMore", subKey: "buyMoreSaveMoreSub" },
    ],
  },
  {
    id: "goal",
    hubHref: "/use-cases/by-goal",
    titleKey: "useCaseByGoal",
    entries: [
      { href: "/use-cases/more-cart-items", titleKey: "goalMoreCartItems" },
      { href: "/use-cases/upsell", titleKey: "goalProductSwap" },
      { href: "/use-cases/buy-more-save-more", titleKey: "goalQuantityOffers" },
      { href: "/use-cases/free-shipping", titleKey: "goalFreeShippingDisplay" },
      { href: "/use-cases/discount-coupon", titleKey: "goalDiscountCoupon" },
    ],
  },
  {
    id: "experience",
    hubHref: "/use-cases/by-experience",
    titleKey: "useCaseByExperience",
    entries: [
      {
        href: "/use-cases/customer-experience",
        titleKey: "customerExperience",
        subKey: "customerExperienceSub",
      },
    ],
  },
];
