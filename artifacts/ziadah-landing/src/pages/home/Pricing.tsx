import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, Shell } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { Section, SectionHead } from "@/sections";
import { usePricingPlans, maxAnnualDiscount, type BillingMode } from "@/lib/pricing-data";

/**
 * Pricing.
 *
 * The band sits on the system's own price vocabulary - `.price-grid`,
 * `.price-card`, `.price-flag`, `.price-list` - with the highlighted plan
 * carrying `.is-flipped` so the whole card re-points its colour triple
 * instead of branching on `popular` in eight places.
 *
 * MONTHLY / ANNUAL. The band used to show a monthly price and nothing else,
 * because it kept its own four-plan table with one number per plan while
 * `/pricing` kept a second table with the annual price, the annual total and
 * the discount. Both read `usePricingPlans` now, so a price cannot be right
 * on one page and stale on the other, and the toggle is the same `.hero-tab`
 * control `/pricing` uses - a merchant who follows the link should not meet a
 * different switch for the same choice.
 *
 * The annual figure is the PER-MONTH price when billed annually, with the
 * once-a-year total under it. A plan page that shows the annual total as the
 * headline number and the monthly one as a footnote makes the two modes look
 * like different products.
 */
export function Pricing({ onActivate }: { onActivate?: () => void }) {
  const t = useT();
  const riyal = t({ ar: "ر.س", en: "SAR" });
  const plans = usePricingPlans();
  const [mode, setMode] = useState<BillingMode>("y");
  const annual = mode === "y";

  const planFeatures = [
    t({ ar: "اقتراحات ومبيعات غير محدودة", en: "Unlimited suggestions & sales" }),
    t({ ar: "كل حالات الاستخدام وأماكن العرض", en: "All use cases & placements" }),
    t({ ar: "تجربة مجانية 7 أيام", en: "7-day free trial" }),
    t({ ar: "دعم عربي ولوحة بالعربي", en: "Arabic support & dashboard" }),
  ];

  return (
    <Section id="pricing" family="violet">
      <SectionHead
        center
        kicker={t({ ar: "الأسعار", en: "Pricing" })}
        title={t({ ar: "خطط بسيطة وشفافة", en: "Simple, transparent plans" })}
        lead={t({
          ar: "اقتراحات ومبيعات غير محدودة في كل الباقات — شاملة الضريبة، وتجربة مجانية 7 أيام.",
          en: "Unlimited suggestions & sales on every plan — VAT-inclusive, with a 7-day free trial.",
        })}
      />

      {/* The same control `/pricing` carries, so the choice looks identical
          wherever a merchant meets it. `role="tablist"` because the two are
          one choice, not two independent buttons. */}
      <div className="hero-tabs hero-tabs--spaced" role="tablist" aria-label={t({ ar: "دورة الفوترة", en: "Billing period" })}>
        <button
          type="button"
          role="tab"
          aria-selected={!annual}
          className="hero-tab"
          onClick={() => setMode("m")}
          data-testid="home-billing-monthly"
        >
          {t({ ar: "شهري", en: "Monthly" })}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={annual}
          className="hero-tab"
          onClick={() => setMode("y")}
          data-testid="home-billing-yearly"
        >
          {t({ ar: "سنوي", en: "Yearly" })}
          <span className="hero-tab-note">
            {t({ ar: `وفّر حتى ${maxAnnualDiscount(plans)}`, en: `Save up to ${maxAnnualDiscount(plans)}` })}
          </span>
        </button>
      </div>

      <Shell width="wide">
        <div className="price-grid price-grid--4">
          {plans.map((plan) => (
            <div key={plan.key} className={`price-card${plan.featured ? " is-flipped" : ""}`}>
              {plan.featured && (
                <span className="price-flag">{t({ ar: "الأكثر اختياراً", en: "Most popular" })}</span>
              )}
              <h3 className="price-name">{plan.name}</h3>

              {/* The struck-through twelve-months-at-the-monthly-rate figure
                  only exists in annual mode, so it renders only there rather
                  than being hidden with a class. */}
              {annual && (
                <p className="card-eyebrow num-ltr line-through">
                  {plan.yOrig} {riyal}
                </p>
              )}

              <p className="t-display-3 num-ltr">
                {annual ? plan.yPrice : plan.mPrice}
                <span className="t-body-18 align-middle ms-1 opacity-70">{riyal}</span>
                <span className="price-note ms-2">{t({ ar: "/شهرياً", en: "/mo" })}</span>
              </p>

              <p className="price-note">
                {annual
                  ? t({
                      ar: `يُدفع ${plan.yAnnual} ${riyal} سنوياً · ${plan.aiPointsY} نقطة ذكاء`,
                      en: `Billed ${plan.yAnnual} ${riyal}/year · ${plan.aiPointsY} AI points`,
                    })
                  : t({
                      ar: `${plan.aiPoints} نقطة ذكاء/شهر`,
                      en: `${plan.aiPoints} AI points/mo`,
                    })}
              </p>

              <Button variant="primary" block onClick={onActivate}>
                {t({ ar: "فعّل الآن", en: "Activate now" })}
              </Button>

              <ul className="price-list">
                {planFeatures.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
