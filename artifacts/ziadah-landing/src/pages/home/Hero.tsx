import { Link } from "wouter";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { themeVars } from "@/sections";
import { useEnterOnce } from "@/sections/scroll";
import FannedWidgets from "@/components/home/FannedWidgets";
import { AUTO_LINE } from "@/lib/auto-message";

/**
 * The homepage hero.
 *
 * WHAT THIS REPLACES. A `HeroSplit` on the pale end of the violet family,
 * holding a 440px demo widget that had been fought with twice - once for
 * being squeezed to a third of its column by a `rem` box around `px` type,
 * once for the eight labels that truncated when it was. It opened the page
 * light, which meant the first hard light/dark step on the page did not
 * arrive until the fourth band and the whole run read as one pale wall.
 *
 * WHAT IT IS NOW. The reference's composition: a two-cell grid on the dark
 * end of the family, copy in one cell and the product in the other, with the
 * capability chips hanging in the stage's own gutters rather than on top of
 * the device. Every rule it uses was ported in W1.4 and had no consumer until
 * now.
 *
 * `violet` inverted, not the reference's `blue`: Ziadah has two families and
 * the brand is violet. The composition is the reference's, the hue is not.
 *
 * AUTHORED LINE BREAKS. The headline is three explicit line elements rather
 * than a wrapped string, so the composition holds at any width and survives a
 * copy change instead of re-breaking into two lines and a widow.
 */
export function Hero() {
  const t = useT();
  const { ref, entered } = useEnterOnce<HTMLDivElement>();

  const lines = t({
    ar: ["المنتج المناسب", "للعميل المناسب", "في اللحظة المناسبة"],
    en: ["The right product", "for the right shopper", "at the right moment"],
  });

  return (
    <section
      className="hero-home no-header-offset"
      data-family="violet"
      data-invert=""
      style={themeVars("violet", true)}
    >
      {/* Two soft violet fields behind the composition, so the ground is lit
          rather than a flat rectangle. Decorative, and the only gradient in
          the band. */}
      <span className="hero-home-field" aria-hidden="true" />

      <div className="container hero-home-inner" ref={ref} data-revealed={entered ? "" : undefined}>
        <div className="hero-home-copy">
          <p className="hero-home-eyebrow">
            {t({
              ar: "تطبيق اقتراح المنتجات بالذكاء الاصطناعي",
              en: "AI product suggestions for online stores",
            })}
          </p>
          <h1 className="hero-home-title">
            {lines.map((l, i) => (
              <span key={i} className="hero-home-line">
                {l}
              </span>
            ))}
          </h1>
          <p className="hero-home-lede">
            {t({
              ar: "تطبيق زيادة يقرأ السلة وسجل الطلبات ويقترح لكل عميل منتجات تناسبه في صفحة المنتج والسلة والدفع، فيرتفع متوسط قيمة الطلب بدون إنفاق إعلاني إضافي.",
              en: "The Ziadah app reads the cart and order history and suggests products that fit each shopper on the product page, the cart and checkout, so average order value rises with no extra ad spend.",
            })}
          </p>
          <p className="hero-home-auto">
            <Sparkles className="hero-home-auto-ico" aria-hidden="true" />
            {t(AUTO_LINE)}
          </p>
          <div className="hero-home-actions">
            <Button as={Link} href="/features" variant="secondary" size="lg" data-testid="hero-features">
              {t({ ar: "شوف حالات الاستخدام", en: "See the use cases" })}
            </Button>
            <Button as={Link} href="/calculator" variant="tertiary" size="lg" data-testid="hero-calculator">
              {t({ ar: "احسب أثرها على متجرك", en: "Calculate the impact" })}
            </Button>
          </div>
          <p className="hero-home-note">
            <ShieldCheck className="hero-home-note-ico" aria-hidden="true" />
            {t({
              ar: "تجربة 7 أيام · تثبيت بنقرة · بدون مطوّر",
              en: "7-day trial · one-click install · no developer",
            })}
          </p>
        </div>

        {/* THE DECK, not a device. One screen in a phone said "Ziadah does a
            thing" without saying how many. Five cards, each holding the real
            widget the sector pages render, say the actual thing: these are
            the shapes Ziadah can put on a storefront, and you can go through
            them with the pointer, the keyboard or the dots. */}
        <div className="hero-home-stage">
          <span className="hero-home-glow" aria-hidden="true" />
          <FannedWidgets />
        </div>
      </div>
    </section>
  );
}
