import { useMemo, useState } from "react";
import UseCaseRow from "@/components/UseCaseRow";
import {
  buildWidgetShowcaseItems,
  SHAPED_KINDS,
  type ShapeFor,
  type WidgetShowcaseKind,
} from "@/components/WidgetShowcaseCard";
import type { ProductShape } from "@/components/widgets/kit";
import { navigateTo } from "@/components/PageTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { t as siteTranslations } from "@/i18n/translations";
import { Section as DsSection, SectionHead } from "@/sections";
import { Shell } from "@/components/mk";
import FitWidget from "@/components/widgets/FitWidget";

/* READING ORDER, not data order. `widgetLabels` is indexed against
   `widgetElements()` and cannot be reordered; this is the order a merchant
   meets the seven in, which runs from the lightest ask to the heaviest:
   discover, then complete, then bundle, then buy more, then close a shipping
   gap, then upgrade - and the coupon last, because it is the only one that
   costs margin. */
const ROW_ORDER: WidgetShowcaseKind[] = [
  "related",
  "addons",
  "bundle",
  "volume",
  "shipping",
  "swap",
  "coupon",
];

const KIND_TO_URL: Record<WidgetShowcaseKind, string> = {
  volume: "/use-cases/buy-more-save-more",
  bundle: "/use-cases/buy-together",
  addons: "/use-cases/addons",
  related: "/use-cases/related-products",
  coupon: "/use-cases/discount-coupon",
  shipping: "/use-cases/free-shipping",
  swap: "/use-cases/upsell",
};

/**
 * The home page's use-case band (#widgets-showcase): seven rows, one per use
 * case.
 *
 * WHAT THIS DROPPED. A `variant="sector"` that rendered the same seven widgets
 * as a two-row marquee with sector-themed demo products. Its only caller sat
 * behind `showPlatformHub && !visualBundle` in `SectorDetail`, and both
 * platform-hub sectors carry a visual bundle, so the condition was never true
 * and the marquee rendered on zero routes. The prop, the marquee, the card
 * renderer and the sector demo lookup went with it.
 */
export default function WidgetsShowcaseSection() {
  const { lang } = useLanguage();
  const t = siteTranslations;
  const tr = t[lang];

  const wLabels = tr.landing.widgetLabels;
  /* THE THREE SHAPES, CYCLED DOWN THE BAND.
     The file defines list, grid and carousel, and a band that shows one of
     them seven times demonstrates a layout rather than a system. The cycle
     runs over the kinds that HAVE a collection - Quantity and the coupon have
     no products to lay out, so they sit out rather than consuming a turn and
     breaking the rhythm for the rows that follow. */
  const shapeFor = useMemo<ShapeFor>(() => {
    const cycle: ProductShape[] = ["grid", "list", "carousel"];
    const assigned = new Map<WidgetShowcaseKind, ProductShape>();
    let i = 0;
    for (const kind of ROW_ORDER) {
      if (!SHAPED_KINDS.has(kind)) continue;
      assigned.set(kind, cycle[i % cycle.length]!);
      i += 1;
    }
    return (kind) => assigned.get(kind) ?? "list";
  }, []);

  const allWidgets = useMemo(
    () => buildWidgetShowcaseItems(wLabels, undefined, shapeFor),
    [wLabels, shapeFor],
  );

  /* The seven, once each, in reading order. The marquee showed twenty-four
     cards for these seven - three looped copies of each row, and the second
     row re-added the first three to fill its width - so the same offer slid
     past four times and no two use cases could be told apart. */
  const rows = useMemo(
    () =>
      ROW_ORDER.map((kind) => allWidgets.find((w) => w.kind === kind)).filter(
        (w): w is (typeof allWidgets)[number] => Boolean(w),
      ),
    [allWidgets],
  );

  /* ONE ROW AT A TIME, BECAUSE SEVEN STACKED ROWS WERE A THIRD OF THE PAGE.
     Measured: the band ran 5,803px at 1440 and 8,712px at 390 - 32% of the
     whole home page - for seven repetitions of one idea. Worse, each row put
     315px of copy beside a stage up to 958px tall, so roughly 640px of every
     row was blank column next to the text. That is what "the elements are
     badly distributed" looks like in numbers.

     Seven tabs and one row says the same thing in about 900px, and says it
     better: the seven are now a set a merchant can compare by clicking rather
     than a scroll they have to survive. The stage is fitted rather than free,
     so switching tabs does not jump the page - the tallest preview and the
     shortest now occupy the same box. */
  const [active, setActive] = useState(0);
  const row = rows[active] ?? rows[0];

  /* On the design system rather than beside it. This used to paint its own
     ground, its own 80px padding and its own head out of the legacy `.tc /
     .stag / .st / .ssub` classes, which made it one of two bands on the home
     page that broke the colour rhythm around them. */
  return (
    <DsSection id="widgets-showcase" family="grey">
      <SectionHead
        center
        kicker={tr.landing.widgetsTag}
        title={tr.landing.widgetsTitle}
        lead={tr.landing.widgetsSubtitle}
      />
      <Shell>
        {/* The seven, as a tab strip. `aria-pressed` rather than a tablist
            role: the panel below is not swapped wholesale, it is one row whose
            contents change, and claiming a tablist would promise arrow-key
            navigation between panels that do not exist. */}
        <div className="ucrow-tabs" role="group" aria-label={tr.landing.widgetsTag}>
          {rows.map((item, i) => (
            <button
              key={item.kind}
              type="button"
              className="chip is-small"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {row ? (
          <div className="ucrow-one">
            <UseCaseRow
              key={row.kind}
              title={row.label}
              description={row.desc}
              whenToUse={row.whenToUse}
              goal={row.goal}
              example={row.example}
              note={row.note}
              preview={<FitWidget height={560}>{row.widget}</FitWidget>}
              href={KIND_TO_URL[row.kind]}
              hrefLabel={tr.landing.widgetRowLink}
              onNavigate={navigateTo}
              labels={{
                whenToUse: tr.landing.widgetRowWhen,
                goal: tr.landing.widgetRowGoal,
                example: tr.landing.widgetRowExample,
              }}
            />
          </div>
        ) : null}
      </Shell>
    </DsSection>
  );
}
