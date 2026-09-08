import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/mk";
import { useT } from "@/lib/i18n";
import { themeVars } from "@/sections";
import { useEnterOnce } from "@/sections/scroll";
import { DeviceFrame } from "./DeviceFrame";

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
    ar: ["كل عميل", "يشوف", "اللي يناسبه"],
    en: ["Every shopper", "sees what", "actually fits"],
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
              ar: "محرّك توصيات بالذكاء الاصطناعي لمتاجر زد وسلة",
              en: "An AI recommendation engine for Zid and Salla stores",
            })}
          </p>
          <h1 className="hero-home-title">
            {lines.map((l) => (
              <span key={l} className="hero-home-line">
                {l}
              </span>
            ))}
          </h1>
          <p className="hero-home-lede">
            {t({
              ar: "أغلب زوّار متجرك يشترون منتجاً واحداً ويطلعون. زيادة تعرض لكل عميل المنتج المناسب له في صفحة المنتج والسلة والدفع، فيرتفع متوسط قيمة الطلب بدون أي إنفاق إعلاني إضافي.",
              en: "Most of your visitors buy one item and leave. Ziadah shows each shopper the product that fits them on the product page, the cart and checkout, so the average order value rises with no extra ad spend.",
            })}
          </p>
          <div className="hero-home-actions">
            <Button as={Link} href="/features" variant="secondary" size="lg" data-testid="hero-features">
              {t({ ar: "شوف الودجتات", en: "See the widgets" })}
            </Button>
            <Button as={Link} href="/calculator" variant="tertiary" size="lg" data-testid="hero-calculator">
              {t({ ar: "احسب أثرها على متجرك", en: "Calculate the impact" })}
            </Button>
          </div>
          <p className="hero-home-note">
            <ShieldCheck className="hero-home-note-ico" aria-hidden="true" />
            {t({
              ar: "تجربة ٧ أيام · تثبيت بنقرة · بدون مطوّر",
              en: "7-day trial · one-click install · no developer",
            })}
          </p>
        </div>

        <div className="hero-home-stage">
          <span className="hero-home-glow" aria-hidden="true" />

          {/* The frame is exactly the device's width and is the chips'
              positioning context, which is what lets the desktop offsets be
              written from the frame's real bezel - a 0.8rem border plus
              2.4rem of padding - instead of nudged until they looked clear.
              The chips are the frame's SECOND child, not the device's, so on
              mobile they flow underneath it and the frame grows rather than
              the chips landing on the last rows. */}
          <div className="hero-home-frame">
            <div className="hero-home-device">
              <DeviceFrame />
            </div>
            {/* MEASURED. A chip hangs in the stage's own gutter and overlaps
                only the device's 3.2rem bezel, so its whole width has to fit
                that gutter plus the bezel - 167px at 1440, 128px at 1025. The
                labels are short for that reason, not for tone: at "متوسط قيمة
                الطلب" the chip came out 189px and ran past the stage. */}
            <div className="hero-home-chips" aria-hidden="true">
              <span className="hero-home-chip hero-home-chip--a">
                <span className="hero-home-chip-label">{t({ ar: "متوسط الطلب", en: "Order value" })}</span>
                <span className="hero-home-chip-amt num-ltr">+35%</span>
              </span>
              <span className="hero-home-chip hero-home-chip--b">
                <span className="hero-home-chip-label">{t({ ar: "إضافة للسلة", en: "Cart add-ons" })}</span>
                <span className="hero-home-chip-amt num-ltr">34%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
