/**
 * THE ONE SENTENCE THE SITE LEADS WITH.
 *
 * Activate the app and Ziadah sets everything up by itself with AI. It is
 * written once, here, because it is said in a dozen places - the home hero,
 * every sector page, every solution page, every closing band, the page
 * descriptions - and a sentence said a dozen times in a dozen wordings stops
 * being a promise and becomes a mood.
 *
 * "تطبيق زيادة" is masculine throughout, so the verb is too: "يضبط".
 */
export const AUTO_LINE = {
  ar: "فعّل التطبيق، وزيادة يضبط كل شي بنفسه بالذكاء الاصطناعي",
  en: "Activate the app, and Ziadah sets everything up by itself with AI",
} as const;

/** What the merchant does, and what Ziadah does: the two halves of the line. */
export const AUTO_SPLIT = {
  you: {
    title: { ar: "أنت تفعّل", en: "You activate" },
    body: {
      ar: "تثبّت التطبيق من لوحة زد أو سلة بنقرة. هذا كل اللي عليك.",
      en: "Install the app from your Zid or Salla dashboard in one click. That is all you do.",
    },
  },
  ziadah: {
    title: { ar: "وزيادة يضبط الباقي", en: "Ziadah sets up the rest" },
    body: {
      ar: "يقرأ كتالوجك وطلباتك، يختار الأماكن والأشكال والعروض، يضبطها، ثم يختبرها ويحسّنها مع كل طلب.",
      en: "It reads your catalogue and orders, picks the places, shapes and offers, sets them up, then tests and improves them with every order.",
    },
  },
} as const;
