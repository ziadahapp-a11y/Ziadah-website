import { useLanguage } from "@/i18n/LanguageContext";
import { t as translations } from "@/i18n/translations";

/**
 * The plan table, in one place.
 *
 * It used to be declared twice - once inside `/pricing` with monthly and
 * annual prices, the discount, the annual total and the AI-point allowance,
 * and once inside the home page's pricing band with a monthly price and
 * nothing else. Two tables of the same four plans is one table that can
 * disagree with itself, and the home band could not offer an annual price
 * because it had never been told one.
 *
 * The prices are bilingual-free - a number is a number - but the names and
 * blurbs are not, so this is a hook rather than a constant.
 */

export type PlanKey = "s" | "g" | "p" | "b";
export type BillingMode = "m" | "y";

/**
 * TWO PRICE LISTS, NOT ONE AND A CONVERSION.
 *
 * The dollar prices are not the riyal ones divided at the peg. They are
 * close to it - 790 / 3.75 is 210.7 and the dollar plan is 210 - but the two
 * smaller plans are rounded to a marketing number rather than a rate (29 SAR
 * is 7.73 USD and the plan is 10; 290 is 77.3 and the plan is 80). A site
 * that divides at runtime would quietly contradict the billing system on
 * exactly the two plans most people buy, so both lists are stated.
 */
export type Currency = "sar" | "usd";

export function currencyLabel(c: Currency, isAr: boolean): string {
  if (c === "usd") return isAr ? "$" : "USD";
  /* The official riyal glyph (U+20C1) is not in the loaded font. */
  return isAr ? "ر.س" : "SAR";
}

export type Plan = {
  key: PlanKey;
  name: string;
  desc: string;
  /** Per month, billed monthly. */
  mPrice: string | number;
  /** Per month, billed annually - the number the annual mode shows. */
  yPrice: string | number;
  /** What the annual plan actually charges, once. */
  yAnnual: string | number;
  /** Twelve months at the monthly rate, struck through beside the annual. */
  yOrig: string;
  yDisc: string;
  badge: string | null;
  featured: boolean;
  featIntro: string | null;
  features: string[];
  /** AI points included, monthly and annually. */
  aiPoints: string;
  aiPointsY: string;
};

/** Monthly, monthly-when-annual, the annual charge, and twelve months at the
 *  monthly rate struck beside it. Keyed by plan then currency. */
const PRICES: Record<PlanKey, Record<Currency, {
  m: string | number; y: string | number; annual: string | number; orig: string; disc: string;
}>> = {
  s: {
    sar: { m: 29, y: 24, annual: 290, orig: "348", disc: "17%" },
    usd: { m: 10, y: 8, annual: 100, orig: "120", disc: "17%" },
  },
  g: {
    sar: { m: 290, y: 249, annual: "2,990", orig: "3,480", disc: "14%" },
    usd: { m: 80, y: 67, annual: 800, orig: "960", disc: "17%" },
  },
  p: {
    sar: { m: 790, y: 666, annual: "7,990", orig: "9,480", disc: "16%" },
    usd: { m: 210, y: 175, annual: "2,100", orig: "2,520", disc: "17%" },
  },
  b: {
    sar: { m: "1,990", y: "1,333", annual: "15,990", orig: "23,880", disc: "33%" },
    usd: { m: 530, y: 358, annual: "4,300", orig: "6,360", disc: "32%" },
  },
};

export function usePricingPlans(currency: Currency = "sar"): Plan[] {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ld = translations[lang].landing;
  const px = (k: PlanKey) => PRICES[k][currency];

  return [
    {
      key: "s",
      mPrice: px("s").m,
      yPrice: px("s").y,
      yAnnual: px("s").annual,
      yOrig: px("s").orig,
      yDisc: px("s").disc,
      name: isAr ? "الانطلاقة" : "Starter",
      desc: isAr ? "للمبتدئين والراغبين بالتجربة" : "For beginners",
      badge: null,
      featured: false,
      featIntro: null,
      features: ld.planStarterFeatures as string[],
      aiPoints: "5",
      aiPointsY: "60",
    },
    {
      key: "g",
      mPrice: px("g").m,
      yPrice: px("g").y,
      yAnnual: px("g").annual,
      yOrig: px("g").orig,
      yDisc: px("g").disc,
      name: isAr ? "النمو" : "Growth",
      desc: isAr ? "للتجار الأفراد" : "For individual merchants",
      badge: null,
      featured: false,
      featIntro: ld.planGrowthIntro as string,
      features: ld.planGrowthFeatures as string[],
      aiPoints: "50",
      aiPointsY: "600",
    },
    {
      key: "p",
      mPrice: px("p").m,
      yPrice: px("p").y,
      yAnnual: px("p").annual,
      yOrig: px("p").orig,
      yDisc: px("p").disc,
      name: isAr ? "الاحترافية" : "Professional",
      desc: isAr ? "للشركات والمؤسسات" : "For companies",
      badge: isAr ? "الأكثر طلباً" : "Most Popular",
      featured: true,
      featIntro: ld.planProIntro as string,
      features: ld.planProFeatures as string[],
      aiPoints: "500",
      aiPointsY: "6,000",
    },
    {
      key: "b",
      mPrice: px("b").m,
      yPrice: px("b").y,
      yAnnual: px("b").annual,
      yOrig: px("b").orig,
      yDisc: px("b").disc,
      name: isAr ? "الأعمال" : "Business",
      desc: isAr ? "قيمة مخصصة للمنشآت الكبيرة" : "Custom value for large organizations",
      badge: isAr ? "للمتاجر الكبيرة" : "For Large Stores",
      featured: false,
      featIntro: ld.planBusinessIntro as string,
      features: ld.planBusinessFeatures as string[],
      aiPoints: "5,000",
      aiPointsY: "60,000",
    },
  ];
}

/** The deepest discount any plan offers, for the annual tab's own label. */
export function maxAnnualDiscount(plans: Plan[]): string {
  return plans.reduce((best, p) => (parseInt(p.yDisc, 10) > parseInt(best, 10) ? p.yDisc : best), "0%");
}
