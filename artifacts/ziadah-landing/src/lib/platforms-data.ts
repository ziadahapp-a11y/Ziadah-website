/**
 * WHERE Ziadah runs — and nothing else.
 *
 * This file keeps one line out of the product surface: being published on a
 * store platform's app market is a fact about that PLATFORM, not a Ziadah
 * capability. It is not a product, a feature card, a use case or a benefit,
 * and it must not read as Ziadah's identity — Ziadah is a recommendation
 * engine that connects to a commerce platform, not a plugin for one. What it
 * does lives in the use-case pages; who it is for lives in `data/sectors`;
 * where it runs lives here.
 *
 * `status` is the truth about the connector, not a roadmap promise:
 *   connected  the connector is published and works today
 *   planned    the connector has not shipped
 *
 * "Certified" and "official" are deliberately NOT used. Ziadah is not endorsed
 * by any store platform; what is true is that a connector exists and a
 * merchant can install it.
 *
 * `reads` is the same three sources the support centre already documents
 * (support-data, "كيف يتعلم الذكاء الاصطناعي منتجاتك"), stated in the
 * merchant's words rather than an API's. Nothing here claims a source the
 * product does not already say it uses.
 */
export type PlatformStatus = "connected" | "planned";

type Bilingual = { ar: string; en: string };

export type Platform = {
  slug: string;
  name: Bilingual;
  status: PlatformStatus;
  /** The app-market listing, where one exists. */
  href?: string;
  /** What connecting through this platform actually does. */
  what: Bilingual;
  /** What Ziadah reads from the store. */
  reads: Bilingual;
};

const READS_STANDARD: Bilingual = {
  ar: "أسماء المنتجات وأوصافها، فئاتها وتصنيفاتها الفرعية، وسلوك المشترين — من اشترى ماذا معاً.",
  en: "Product names and descriptions, categories and subcategories, and buyer behaviour — who bought what together.",
};

export const PLATFORMS: Platform[] = [
  {
    slug: "zid",
    name: { ar: "زد", en: "Zid" },
    status: "connected",
    href: "https://apps.zid.sa/application/1826",
    what: {
      ar: "الموصّل منشور في متجر تطبيقات زد. التثبيت من لوحة المتجر نفسها، والربط بضغطة واحدة بدون مطوّر وبدون تعديل على القالب.",
      en: "The connector is published in Zid's app market. It installs from the store dashboard itself and connects in one click, with no developer and no theme edits.",
    },
    reads: READS_STANDARD,
  },
  {
    slug: "salla",
    name: { ar: "سلة", en: "Salla" },
    status: "connected",
    href: "https://apps.salla.sa/ar/app/1099604538",
    what: {
      ar: "الموصّل منشور في متجر تطبيقات سلة، بنفس آلية الربط بضغطة واحدة.",
      en: "The connector is published in Salla's app market, with the same one-click connect.",
    },
    reads: READS_STANDARD,
  },
  {
    slug: "shopify",
    name: { ar: "شوبيفاي", en: "Shopify" },
    status: "planned",
    what: {
      ar: "موصّل شوبيفاي قيد التطوير. لا يوجد تثبيت متاح اليوم.",
      en: "The Shopify connector is in development. There is nothing to install today.",
    },
    reads: READS_STANDARD,
  },
];

export function platformBySlug(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug);
}

/**
 * The division of labour, stated once. The left column is what the store
 * platform owns and Ziadah never touches; the right is what Ziadah adds on
 * top of it. Written as a boundary rather than a comparison, because a
 * merchant is not choosing between the two.
 */
export const RESPONSIBILITIES: { platform: Bilingual[]; ziadah: Bilingual[] } = {
  platform: [
    { ar: "الكتالوج والمخزون والأسعار", en: "Catalogue, stock and pricing" },
    { ar: "سلة الشراء وبوابة الدفع", en: "The cart and the payment gateway" },
    { ar: "الشحن وتتبّع الطلب", en: "Shipping and order tracking" },
    { ar: "حسابات العملاء وبياناتهم", en: "Customer accounts and their data" },
    { ar: "قالب المتجر وهويته", en: "The storefront theme and its identity" },
  ],
  ziadah: [
    { ar: "اختيار المنتج المقترَح لكل عميل", en: "Choosing the suggested product for each customer" },
    { ar: "مكان ظهور الاقتراح وتوقيته", en: "Where a suggestion appears, and when" },
    { ar: "شكل العرض: منتجات ذات صلة، إضافات، حزم، عروض كمية", en: "Its form: related products, add-ons, bundles, quantity offers" },
    { ar: "قياس أثر كل اقتراح على قيمة الطلب", en: "Measuring what each suggestion does to order value" },
    { ar: "تحسين الاختيار تلقائياً مع تراكم الطلبات", en: "Improving the choice automatically as orders accumulate" },
  ],
};
