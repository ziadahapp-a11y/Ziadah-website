/**
 * The navigation model — every destination the header and footer can reach,
 * as data rather than as JSX.
 *
 * The header used to carry its own menus inline, which meant the desktop bar,
 * the tablet row and the mobile drawer each owned a private copy of the same
 * list and could drift apart. Stating the model once means a destination is
 * added in one place and appears everywhere it belongs, and the mega panel and
 * the mobile drill-down cannot disagree about what exists.
 *
 * Labels are read from `@/i18n/translations` at call time so the model stays
 * language-agnostic; the caller passes the current language's tree in.
 */
import type { t as translations } from "@/i18n/translations";
import { sectors } from "@/data/sectors";

type Tree = (typeof translations)["ar"];

export type NavLink = {
  label: string;
  href: string;
  /** Second line in a mega card or a mobile sub-row. */
  desc?: string;
};

export type NavGroup = {
  title: string;
  items: NavLink[];
};

/** The Zid and Salla listings this app is actually published on. */
export const PLATFORMS = [
  { key: "salla", href: "https://apps.salla.sa/ar/app/1099604538", live: true },
  { key: "zid", href: "https://apps.zid.sa/application/1826", live: true },
  { key: "shopify", href: "#", live: false },
] as const;

/** Where an existing merchant signs in, per platform. */
export const DASHBOARDS = [
  { key: "salla", href: "https://dashboard.ziadah.app/login" },
  { key: "zid", href: "https://web.ziadah.app/" },
] as const;

export const WHATSAPP_SUPPORT_URL = "https://wa.me/966544357555";
export const SUPPORT_EMAIL = "support@ziadah.app";

/**
 * Solutions, grouped the four ways a merchant actually shops for them: by the
 * page they show on, by what the widget does, by how it is presented, and by
 * the number it is meant to move.
 */
export function solutionGroups(tr: Tree): NavGroup[] {
  const n = tr.nav;
  return [
    {
      title: n.useCaseByPage,
      items: [
        { label: n.productPage, href: "/use-cases/product-page" },
        { label: n.cartPage, href: "/use-cases/cart" },
        { label: n.checkoutPage, href: "/use-cases/checkout" },
        { label: n.thankYouPage, href: "/use-cases/thank-you" },
        { label: n.homePage, href: "/use-cases/home" },
        { label: n.categoryPage, href: "/use-cases/category" },
        { label: n.allPages, href: "/use-cases/all-pages" },
      ],
    },
    {
      title: n.useCaseByActivity,
      items: [
        { label: n.crossSell, href: "/use-cases/cross-sell", desc: n.crossSellSub },
        { label: n.upsell, href: "/use-cases/upsell", desc: n.upsellSub },
        { label: n.addToCart, href: "/use-cases/add-to-cart", desc: n.addToCartSub },
        { label: n.removeFromCart, href: "/use-cases/remove-from-cart", desc: n.removeFromCartSub },
      ],
    },
    {
      title: n.useCaseByPresentation,
      items: [
        { label: n.relatedProducts, href: "/use-cases/related-products", desc: n.relatedProductsSub },
        { label: n.addons, href: "/use-cases/addons", desc: n.addonsSub },
        { label: n.buyTogether, href: "/use-cases/buy-together", desc: n.buyTogetherSub },
        { label: n.bundleDeals, href: "/use-cases/bundle-deals", desc: n.bundleDealsSub },
        { label: n.buyMoreSaveMore, href: "/use-cases/buy-more-save-more", desc: n.buyMoreSaveMoreSub },
      ],
    },
    {
      title: n.useCaseByGoal,
      items: [
        { label: n.goalMoreCartItems, href: "/use-cases/more-cart-items" },
        { label: n.goalProductSwap, href: "/use-cases/upsell" },
        { label: n.goalQuantityOffers, href: "/use-cases/buy-more-save-more" },
        { label: n.goalFreeShippingDisplay, href: "/use-cases/free-shipping" },
        { label: n.goalDiscountCoupon, href: "/use-cases/discount-coupon" },
      ],
    },
  ];
}

/**
 * The three entry points into the sector tree, and the top of it rather than a
 * truncated list: `/sectors/ecommerce-stores` is itself an index over the
 * sixteen retail sectors, so putting all sixteen in the header would bury the
 * two non-retail sectors that need their own framing.
 *
 * `ecommerce-stores` is spelled out here because it has no row in
 * `data/sectors` — it is a standalone index page, routed ahead of
 * `/sectors/:slug`. The other two are looked up, so their labels stay tied to
 * the pages they open.
 */
export function sectorEntries(lang: "ar" | "en"): NavLink[] {
  const isAr = lang === "ar";
  const index: NavLink = {
    label: isAr ? "المتاجر الإلكترونية" : "Ecommerce stores",
    href: "/sectors/ecommerce-stores",
    desc: isAr
      ? "ستة عشر قطاعاً للتجزئة، لكل منها دليله"
      : "Sixteen retail sectors, each with its own playbook",
  };
  const rest = ["delivery-apps", "ecommerce-platforms"]
    .map((slug) => sectors.find((s) => s.slug === slug))
    .filter((s): s is (typeof sectors)[number] => Boolean(s))
    .map((s) => ({
      label: isAr ? s.titleAr : s.titleEn,
      href: `/sectors/${s.slug}`,
      desc: isAr ? s.taglineAr : s.taglineEn,
    }));
  return [index, ...rest];
}

/**
 * Every sector, read from the same `data/sectors` the sector pages render, so
 * an index and the pages cannot name different sectors.
 */
export function sectorLinks(lang: "ar" | "en"): NavLink[] {
  const isAr = lang === "ar";
  return sectors.map((s) => ({
    label: isAr ? s.titleAr : s.titleEn,
    href: `/sectors/${s.slug}`,
    desc: isAr ? s.taglineAr : s.taglineEn,
  }));
}
