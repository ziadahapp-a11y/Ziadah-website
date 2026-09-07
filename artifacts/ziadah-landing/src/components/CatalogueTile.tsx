import type { ReactNode } from "react";
import { themeVars, type Family } from "@/sections";

/**
 * The catalogue card's 16:9 thumbnail.
 *
 * MEASURED slot: `.cat-card-media`, `aspect-ratio: 16 / 9`, 1.6rem radius,
 * clipped. The reference fills it with editorial photography and product
 * renders, all proprietary and not shipped - so it was standing empty, twenty
 * flat `--general-gray-light` slabs across `/features` and `/blog`.
 *
 * Shaa has no photo library, so inventing one is not on the table. What the
 * catalogue does have is a taxonomy: every card carries a group or a category.
 * The tile makes that taxonomy the artwork - the section marker set large on
 * that section's own colour field, the way a magazine marks its departments -
 * with the item's mark or its state on the corner.
 *
 * The five colour fields are the site's own families, cycled by the card's
 * position in its own listing, so a grid reads as a set rather than as twenty
 * identical boxes. Nothing here introduces a colour: `themeVars` stamps the
 * same pairs every themed section uses, and ink is always `--color-secondary`
 * on `--color-primary`, the pair the contrast audit already covers.
 */
/* One family, three tones. This cycled four hues, which made a listing look
   like four different products; the site has one brand family, so a card is
   dealt a TONE of it - pale blue, navy, or the neutral canvas - and the grid
   still reads as a set rather than twenty identical boxes. */
const CYCLE: { family: Family; invert: boolean }[] = [
  { family: "blue", invert: false },
  { family: "blue", invert: true },
  { family: "grey", invert: true },
];

export function CatalogueTile({
  index,
  label,
  badge,
  mark,
}: {
  index: number;
  /** the card's own department - the group on /features, the category on /blog */
  label?: string;
  /** short state word, e.g. live / soon */
  badge?: string;
  mark?: ReactNode;
}) {
  const tone = CYCLE[index % CYCLE.length];
  /* Two treatments, because the two catalogues carry different signals.
     `/features` items have their own mark, so the tile is that mark on the
     field - setting the group name here as well would just repeat the
     category line the card already renders underneath. Blog posts have no
     mark, so their department name IS the artwork, magazine-style. */
  return (
    <span
      className={`cat-tile${label ? "" : " cat-tile--mark"}`}
      style={themeVars(tone.family, tone.invert)}
    >
      {mark ? <span className="cat-tile-mark">{mark}</span> : null}
      {label ? <span className="cat-tile-label">{label}</span> : null}
      {badge ? <span className="cat-tile-badge">{badge}</span> : null}
      {label ? <span className="cat-tile-rule" /> : null}
    </span>
  );
}
