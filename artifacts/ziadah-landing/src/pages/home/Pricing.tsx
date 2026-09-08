import { CheckCircle2 } from "lucide-react";
import { Button, Shell } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { Section, SectionHead } from "@/sections";

/**
 * Pricing.
 *
 * Lifted out of `HomeTrackflow` unchanged. It sits on the system's own price
 * vocabulary already - `.price-grid`, `.price-card`, `.price-flag`,
 * `.price-list`, with the highlighted plan carrying `.is-flipped` so the whole
 * card re-points its colour triple instead of branching on `popular` in eight
 * places. What changes is only that a band is a file now.
 */
export function Pricing({ onActivate }: { onActivate?: () => void }) {
  const t = useT();
  const riyal = t({ ar: "ر.س", en: "SAR" });

  const pricingPlans = [
    { name: t({ ar: "الانطلاقة", en: "Starter" }), price: 29, orders: t({ ar: "5 نقاط ذكاء/شهر", en: "5 AI points/mo" }), popular: false },
    { name: t({ ar: "النمو", en: "Growth" }), price: 290, orders: t({ ar: "50 نقطة ذكاء/شهر", en: "50 AI points/mo" }), popular: false },
    { name: t({ ar: "الاحترافية", en: "Professional" }), price: 790, orders: t({ ar: "500 نقطة ذكاء/شهر", en: "500 AI points/mo" }), popular: true },
    { name: t({ ar: "الأعمال", en: "Business" }), price: 1990, orders: t({ ar: "5,000 نقطة ذكاء/شهر", en: "5,000 AI points/mo" }), popular: false },
  ];

  const planFeatures = [
    t({ ar: "اقتراحات ومبيعات غير محدودة", en: "Unlimited suggestions & sales" }),
    t({ ar: "كل الودجتات وأماكن العرض", en: "All widgets & placements" }),
    t({ ar: "تجربة مجانية 7 أيام", en: "7-day free trial" }),
    t({ ar: "دعم عربي ولوحة بالعربي", en: "Arabic support & dashboard" }),
  ];

  return (
      <Section id="pricing" family="violet">
        <SectionHead
          center
          kicker={t({ ar: "الأسعار", en: "Pricing" })}
          title={t({ ar: "خطط بسيطة وشفافة", en: "Simple, transparent plans" })}
          lead={t({ ar: "اقتراحات ومبيعات غير محدودة في كل الباقات — شاملة الضريبة، وتجربة مجانية 7 أيام.", en: "Unlimited suggestions & sales on every plan — VAT-inclusive, with a 7-day free trial." })}
        />
        <Shell width="wide">
          {/* The system's own price vocabulary. The highlighted plan
              carries `.on-ink`, which re-points the colour triple for the
              whole card, so nothing inside it restates a colour - the old
              version branched on `plan.popular` in eight places. */}
          <div className="price-grid price-grid--4">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`price-card${plan.popular ? " is-flipped" : ""}`}>
                {plan.popular && (
                  <span className="price-flag">{t({ ar: "الأكثر اختياراً", en: "Most popular" })}</span>
                )}
                <h3 className="price-name">{plan.name}</h3>
                <p className="t-display-3 num-ltr">
                  {plan.price.toLocaleString("en-US")}
                  <span className="t-body-18 align-middle ms-1 opacity-70">{riyal}</span>
                  <span className="price-note ms-2">{t({ ar: "/شهرياً", en: "/mo" })}</span>
                </p>
                <p className="price-note">{plan.orders}</p>
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
