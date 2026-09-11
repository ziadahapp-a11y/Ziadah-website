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

export function usePricingPlans(): Plan[] {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const ld = translations[lang].landing;

  return [
    {
      key: "s",
      name: isAr ? "الانطلاقة" : "Starter",
      desc: isAr ? "للمبتدئين والراغبين بالتجربة" : "For beginners",
      mPrice: 29,
      yPrice: 24,
      yAnnual: 290,
      yOrig: "348",
      yDisc: "17%",
      badge: null,
      featured: false,
      featIntro: null,
      features: ld.planStarterFeatures as string[],
      aiPoints: "5",
      aiPointsY: "60",
    },
    {
      key: "g",
      name: isAr ? "النمو" : "Growth",
      desc: isAr ? "للتجار الأفراد" : "For individual merchants",
      mPrice: 290,
      yPrice: 249,
      yAnnual: "2,990",
      yOrig: "3,480",
      yDisc: "14%",
      badge: null,
      featured: false,
      featIntro: ld.planGrowthIntro as string,
      features: ld.planGrowthFeatures as string[],
      aiPoints: "50",
      aiPointsY: "600",
    },
    {
      key: "p",
      name: isAr ? "الاحترافية" : "Professional",
      desc: isAr ? "للشركات والمؤسسات" : "For companies",
      mPrice: 790,
      yPrice: 666,
      yAnnual: "7,990",
      yOrig: "9,480",
      yDisc: "16%",
      badge: isAr ? "الأكثر طلباً" : "Most Popular",
      featured: true,
      featIntro: ld.planProIntro as string,
      features: ld.planProFeatures as string[],
      aiPoints: "500",
      aiPointsY: "6,000",
    },
    {
      key: "b",
      name: isAr ? "الأعمال" : "Business",
      desc: isAr ? "قيمة مخصصة للمنشآت الكبيرة" : "Custom value for large organizations",
      mPrice: "1,990",
      yPrice: "1,333",
      yAnnual: "15,990",
      yOrig: "23,880",
      yDisc: "33%",
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
