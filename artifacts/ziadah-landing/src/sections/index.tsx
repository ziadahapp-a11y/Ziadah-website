import { useState } from "react";
import type { ComponentType, CSSProperties, ElementType, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, Shell } from "@/components/mk";
import { Reveal } from "@/motion/components";
import { useEnterOnce, useScrollActive } from "./scroll";

/* =====================================================================
   Section library

   The reference site is data-driven: a page is an ordered list of shared
   sections, never bespoke markup. These are those sections, ported from the
   reverse-engineered recreation (`components/sections/*`) with this site's
   content and RTL direction.

   Every section paints `--color-primary` / `--color-secondary`, which the
   page stamps per instance — colour is a page property, not a section one.
   ===================================================================== */

/* ---------- THEMING ---------------------------------------------------
   MEASURED, verbatim from the reference's `Sections.tsx`. Five families, each
   a {base, light, dark} triple. A section stamps the triple inline and every
   component reads `--color-primary` / `--color-secondary` / `--color` with a
   fallback. No component names a colour.

   `invert` swaps which end of the pair is the ground, which is how the
   reference alternates bands down a page: light ground with dark type, then
   dark ground with light type, in the same family. */

/* TWO families, not five. The reference carried five because it changed hue
   as you scrolled; Ziadah is violet on white, so `green`, `purple` and
   `orange` were defined-but-unreachable - no section named them, and their
   triples were the last hard-coded warm hexes in the codebase. Removed. Status
   colours (success, error, warning) are their own tokens in `index.css` and
   are not a section family. */
export type Family = "violet" | "grey";

const FAMILIES: Record<
  Family,
  { base: string; light: string; dark: string; floor: string; floorInv: string }
> = {
  // `floor` / `floorInv` are the smallest ink opacity that reaches 4.5:1 on
  // this family's own pair, computed from the two hex values by the WCAG
  // relative-luminance formula and taken against the worst ground muted text
  // actually sits on: the section ground under two 8% card tints
  // (qa/results/contrast-floors.md). A measured step above its family's
  // floor is untouched; one below it is lifted to exactly the floor and no
  // further - the smallest step that passes.
  /* THE BRAND FAMILY. `base` is the violet the site already runs on; `light`
     and `dark` are read off Ziadah's own mark (`public/logo-ar.svg`), so the
     ground and the ink stay the same hue as the logo rather than being picked
     to look adjacent to it.

     The pair carries 14.38:1 at full strength, which is why the muted tier
     survives on violet: the floors below are the smallest ink opacity that
     still reaches 4.5:1 on this pair, computed the same way as grey's. */
  violet: { base: "#7c3aed", light: "#eedaff", dark: "#1f0236", floor: "64%", floorInv: "59%" },
  grey:   { base: "#c8ceda", light: "#f7f9fc", dark: "#0a0a0a", floor: "60%", floorInv: "51%" },
};

export function themeVars(family: Family, invert = false): CSSProperties {
  const f = FAMILIES[family];
  return {
    ["--color" as string]: f.base,
    ["--color-primary" as string]: invert ? f.dark : f.light,
    ["--color-secondary" as string]: invert ? f.light : f.dark,
    // The opposite pair, stamped alongside, so a block that flips to the
    // family's other end can just read it. Deriving it by swapping the two
    // custom properties on one element is a cycle and resolves to nothing.
    ["--color-flip-primary" as string]: invert ? f.light : f.dark,
    ["--color-flip-secondary" as string]: invert ? f.dark : f.light,
    ["--ink-floor" as string]: invert ? f.floorInv : f.floor,
    ["--ink-floor-flip" as string]: invert ? f.floor : f.floorInv,
  };
}

/**
 * Everything a themed section needs: the inline triple, plus the data
 * attributes the header's hit test and the QA suite read. `data-family` is how
 * a full-page screenshot can be asserted section by section.
 */
export function sectionTheme(family: Family = "grey", invert = false) {
  return {
    style: themeVars(family, invert),
    "data-family": family,
    ...(invert ? { "data-invert": "" } : null),
  };
}

/** The button variant that reads against a section's own ground. */
export function groundVariant(invert = false): "primary" | "secondary" {
  return invert ? "secondary" : "primary";
}

/* ---------- HERO SPLIT ---------------------------------------------- */

export function HeroSplit({
  eyebrow,
  title,
  body,
  actions,
  note,
  media,
  family,
  invert,
  tall,
  compact,
  className,
  id,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  note?: ReactNode;
  media?: ReactNode;
  family?: Family;
  invert?: boolean;
  tall?: boolean;
  /**
   * The display tier is measured off the reference's own hero, whose authored
   * lines run five to ten characters. A hero whose headline is a full sentence
   * - which Ziadah's Arabic hero is - overflows that tier and wraps to six
   * lines. `compact` is the same step `HeroLede` already uses for the same
   * reason, exposed here so a split hero can reach for it too.
   */
  compact?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      /* `no-header-offset` is the system's own opt-out, and this hero needs
         it: `.hero-container` already clears the header with a margin of
         `--header-dynamic-height + 7rem`, so letting `.page > section
         :first-of-type` add the header height again counts it twice. */
      className={cn("hero-split no-header-offset", tall && "is-tall", className)}
      {...sectionTheme(family, invert)}
    >
      <Shell className="hero-container">
        <div className="hero-grid-wrapper">
          <div className="hero-col-text">
            <div className="hero-block-text">
              <div className="hero-text-a">
                {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
                <h1 className={cn("hero-title", compact && "hero-title--compact")}>{title}</h1>
              </div>
              <div className="hero-text-b">
                {body ? <p className="hero-body" data-hero-el>{body}</p> : null}
                {actions ? <div className="hero-buttons" data-hero-el>{actions}</div> : null}
                {note ? <div className="hero-note" data-hero-el>{note}</div> : null}
              </div>
            </div>
          </div>
          {media ? (
            <div className="hero-col-media">
              <div className="hero-media" data-hero-visual>{media}</div>
            </div>
          ) : null}
        </div>
      </Shell>
    </section>
  );
}

/**
 * The compact opener used by index and article routes: the same type scale and
 * the same header clearance as `HeroSplit`, without the media column or the
 * full-viewport minimum.
 */
export function HeroLede({
  eyebrow,
  title,
  body,
  actions,
  family,
  invert,
  center = true,
  compact,
  ground,
  children,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  family?: Family;
  invert?: boolean;
  center?: boolean;
  /**
   * A directory opener - a help centre, an index - is a signpost. It keeps the
   * hero's structure but drops the display tier and the viewport floor, so the
   * page hands the reader its contents instead of a headline.
   */
  compact?: boolean;
  /**
   * A background layer for the whole hero - `ArtGround`, never content. It is
   * rendered as a sibling of the container rather than inside it so it can
   * span the section (which is already `position: relative; overflow: hidden`)
   * without the text block having to size it, and so a page cannot
   * accidentally put a paragraph in the ground by passing it as `children`.
   */
  ground?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    /* `hero-split` floors at 100vh, measured off the reference's product hero -
       which carries a media column. A lede hero is text only, so that floor
       gave a 900px box to ~340px of content. It gets its own, shorter floor. */
    <section
      /* Same reason as `HeroSplit`: the container carries the clearance. */
      className={cn(
        "hero-split hero-split--lede no-header-offset",
        compact && "hero-split--compact",
        className,
      )}
      {...sectionTheme(family, invert)}
    >
      {ground}
      <Shell className="hero-container">
        <div className={cn(center && "mx-auto max-w-[96rem] text-center")}>
          {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
          <h1 className={cn("hero-title", compact && "hero-title--compact")}>{title}</h1>
          {body ? (
            <p className={cn("hero-body", center && "mx-auto lg:mx-auto")} data-hero-el>
              {body}
            </p>
          ) : null}
          {actions ? (
            <div className={cn("hero-buttons", center && "justify-center")} data-hero-el>
              {actions}
            </div>
          ) : null}
          {children}
        </div>
      </Shell>
    </section>
  );
}

/* ---------- SECTION SHELL -------------------------------------------- */

export function Section({
  as = "section",
  family,
  invert,
  tight,
  flushTop,
  flushBottom,
  className,
  children,
  id,
  style,
}: {
  as?: ElementType;
  family?: Family;
  invert?: boolean;
  tight?: boolean;
  flushTop?: boolean;
  flushBottom?: boolean;
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
}) {
  const Tag = as;
  return (
    <Tag
      id={id}
      className={cn(
        "section",
        tight && "section--tight",
        flushTop && "section--flush-top",
        flushBottom && "section--flush-bottom",
        className,
      )}
      {...sectionTheme(family, invert)}
      style={{ ...sectionTheme(family, invert).style, ...style }}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow + display heading + lede, at the measured section scale. */
export function SectionHead({
  kicker,
  title,
  lead,
  center,
  as = "h2",
  size = "lg",
  className,
  children,
}: {
  kicker?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
  /**
   * Three steps, because a page has three kinds of section head. `lg` is the
   * page's own argument; `md` is a real section that is not the argument;
   * `sm` is a sub-section inside a block that already has a display heading.
   * The 6.4rem default over two compact cards reads as a heading looking for a
   * section rather than a section with a heading.
   */
  size?: "lg" | "md" | "sm";
  className?: string;
  children?: ReactNode;
}) {
  const Heading = as;
  return (
    <header className={cn("section-head", center && "section-head--center", className)}>
      {kicker ? <p className="t-eyebrow">{kicker}</p> : null}
      {title ? (
        <Heading
          className={cn(
            size === "sm"
              ? "section-head-title--sm"
              : size === "md"
                ? "section-head-title--md"
                : "faq-heading !mb-0",
          )}
        >
          {title}
        </Heading>
      ) : null}
      {lead ? <p className="hero-body lg:!max-w-[68rem]">{lead}</p> : null}
      {children}
    </header>
  );
}

/* ---------- CARDS GRID ----------------------------------------------- */

export type GridCard = {
  key: string;
  eyebrow?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  foot?: ReactNode;
  badge?: ReactNode;
  onClick?: () => void;
  testId?: string;
};

/**
 * MEASURED anatomy: a flat 8% tint of the section's own ink, 1.6rem radius,
 * 34rem minimum, the title pinned to the top with a 4rem gap and the body
 * pushed to the bottom by `justify-content: space-between`.
 */
export function CardsGrid({
  cards,
  columns = 3,
  compact,
  className,
}: {
  cards: GridCard[];
  columns?: 2 | 3 | 4;
  /** Drops the 34rem floor — for rows of short items like contact links. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "cards-grid",
        columns === 2 && "cards-grid--2",
        columns === 4 && "cards-grid--4",
        className,
      )}
    >
      {cards.map((c, i) => (
        <Reveal
          as="article"
          key={c.key}
          index={i % 3}
          className={cn("card", compact && "card--short", c.onClick && "card--clickable")}
        >
          <div>
            <div className="card-head">
              {c.icon ? <span className="card-ico" aria-hidden="true">{c.icon}</span> : null}
              {c.badge}
            </div>
            {c.eyebrow ? <p className="card-eyebrow mt-6">{c.eyebrow}</p> : null}
            <h3 className={cn("card-title mt-6", !compact && "card-title--spaced")}>
              {c.onClick ? (
                <button
                  type="button"
                  className="card-link"
                  onClick={c.onClick}
                  data-testid={c.testId}
                >
                  {c.title}
                </button>
              ) : (
                c.title
              )}
            </h3>
          </div>
          <div className="grid gap-4">
            {c.body ? <p className="card-body-text">{c.body}</p> : null}
            {c.foot ? <div className="card-foot">{c.foot}</div> : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- SCROLLABLE LIST -------------------------------------------
   The reference's signature scroll section: a figure column pinned mid
   viewport while the rows scroll past it, exactly one active at a time. */

export type ListRow = {
  key: string;
  title: ReactNode;
  body?: ReactNode;
  figure?: ReactNode;
  onSelect?: () => void;
};

export function ScrollableList({
  heading,
  eyebrow,
  rows,
  family,
  invert,
  className,
  id,
  pinned,
  mobileFigures = "each",
}: {
  heading?: ReactNode;
  eyebrow?: ReactNode;
  rows: ListRow[];
  family?: Family;
  invert?: boolean;
  className?: string;
  id?: string;
  /**
   * One persistent element in the sticky column instead of the per-row figure
   * stack. This is how the reference builds its own calculator: `/money`
   * carries `{ k: 'list', heading: 'Calculate potential Money Account
   * earnings' }`, an interactive pinned column beside scrolling rows.
   *
   * The per-row stack is decorative and correctly `aria-hidden`. A pinned
   * INTERACTIVE panel must not be, or its controls are unreachable, so this
   * branch drops that attribute.
   */
  pinned?: ReactNode;
  /**
   * How the figure column becomes a mobile composition.
   *
   * `each` (the default) gives every row its own figure inline - right where
   * the rows carry genuinely different pictures, as the homepage's four steps
   * and the sector journeys do.
   *
   * `lead` puts ONE figure between the head and the rows and drops the rest.
   * Measured on `/ar/features/cashback` at 390: the two lists rendered the
   * same product screen ten times down the page, each differing only by a
   * highlighted line that the row's own title states in words directly under
   * it. That is not a small screen showing the desktop composition; it is the
   * desktop composition's mechanism - a sticky column that cross-fades -
   * flattened into ten copies of one picture.
   */
  mobileFigures?: "each" | "lead";
}) {
  const { active, select, register } = useScrollActive(rows.length);
  const lead = mobileFigures === "lead" ? rows.find((r) => r.figure)?.figure : null;
  return (
    <section
      id={id}
      className={cn(
        "scrollable-list",
        mobileFigures === "lead" && "slist--lead",
        /* A PINNED figure is the section's ONLY copy of that element, unlike
           the per-row stack which every row repeats in `.slist-row-media`.
           The stylesheet needs to know the difference so it does not hide the
           thing itself on a phone - see `.slist--pinned` in sections.css. */
        pinned && "slist--pinned",
        className,
      )}
      {...sectionTheme(family, invert)}
    >
      <div className="slist-outer">
        <Shell className="slist-container">
          <div className="slist-grid">
            {(heading || eyebrow) && (
              <header className="slist-head">
                {eyebrow ? <p className="t-eyebrow !mb-0">{eyebrow}</p> : null}
                {heading ? <h2 className="slist-title">{heading}</h2> : null}
              </header>
            )}

            {pinned ? (
              <div className="slist-figures">
                <div className="slist-pinned">{pinned}</div>
              </div>
            ) : (
              <div className="slist-figures" aria-hidden="true">
                <div className="slist-figure-stack">
                  {rows.map((r, i) => (
                    <div
                      key={r.key}
                      className={cn("slist-figure-item", i === active && "is-active")}
                    >
                      <div className="slist-figure">{r.figure}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lead ? (
              <div className="slist-lead-figure" aria-hidden="true">{lead}</div>
            ) : null}

            <ol className="slist-rows">
              {rows.map((r, i) => (
                <li
                  key={r.key}
                  ref={register(i)}
                  className={cn("slist-row", i === active && "is-active")}
                >
                  <div
                    className="slist-row-inner"
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                  >
                    <h3 className="slist-row-title">{r.title}</h3>
                    {r.body ? <p className="slist-row-body">{r.body}</p> : null}
                    {r.figure ? <div className="slist-row-media">{r.figure}</div> : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Shell>
      </div>
    </section>
  );
}

/* ---------- SKEWING TITLE ---------------------------------------------
   A pinned scroll-reveal: the runway is one viewport taller than the title
   and the title pins inside it while the words resolve. */

export function SkewingTitle({
  children,
  family,
  invert,
  className,
  lead,
  actions,
}: {
  children: ReactNode;
  family?: Family;
  invert?: boolean;
  className?: string;
  /**
   * The reference's skew is a full-viewport moment carrying one line. Reproduced
   * literally on a product page it became a 1350px section that asks "ready to
   * start?" and gives the reader nothing to act on. The lead and the actions
   * are what the section is for; the reveal is now an entrance, not a runway.
   */
  lead?: ReactNode;
  actions?: ReactNode;
}) {
  const { ref, entered } = useEnterOnce<HTMLHeadingElement>();
  return (
    <div className={cn("skewing-title", className)} {...sectionTheme(family, invert)}>
      <div className="skewing-runway">
        <div className="skewing-inner">
          <Shell>
            <div className="skewing-content">
              <h2 className="skewing-text" ref={ref} data-revealed={entered ? "" : undefined}>
                {children}
              </h2>
              {lead ? <p className="skewing-lead">{lead}</p> : null}
              {actions ? <div className="skewing-actions">{actions}</div> : null}
            </div>
          </Shell>
        </div>
      </div>
    </div>
  );
}

/* ---------- FAQ -------------------------------------------------------
   MEASURED: hairline rules, no boxes. `<details>` so it works with no JS. */

export function FaqBlock({
  heading,
  items,
  family,
  invert,
  id,
  className,
}: {
  heading?: ReactNode;
  items: { q: ReactNode; a: ReactNode }[];
  family?: Family;
  invert?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("faq-block", className)} {...sectionTheme(family, invert)}>
      <Shell>
        {heading ? <h2 className="faq-heading">{heading}</h2> : null}
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={i} className="faq-item">
              {/* The question is a real heading: `<summary>` alone keeps the
                  question out of the document outline, and eight of them
                  disappearing from a page is a real structural loss. */}
              <summary className="faq-summary">
                <h3 className="!font-medium">{f.q}</h3>
                <ChevronDown className="faq-icon" aria-hidden="true" />
              </summary>
              <div className="faq-answer">{f.a}</div>
            </details>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* ---------- RELATED ---------------------------------------------------- */

export function RelatedGrid({
  heading,
  items,
  className,
}: {
  heading?: ReactNode;
  /**
   * `body` and `Icon` are what turn a card from a label into a destination.
   * Without them the product template's related grid rendered three 160px
   * boxes each holding a system name and its group - measured, 70% of the
   * card was empty - and a reader had no reason to pick one over another.
   */
  items: {
    key: string;
    title: ReactNode;
    meta?: ReactNode;
    body?: ReactNode;
    Icon?: ComponentType<{ className?: string }>;
    onClick: () => void;
  }[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={cn("related", className)}>
      {heading ? <h2 className="related-heading">{heading}</h2> : null}
      <div className="related-grid">
        {items.map((r, i) => {
          const { Icon } = r;
          return (
            <Reveal as="article" key={r.key} index={i % 3} className="related-card">
              {Icon ? (
                <span className="related-mark" aria-hidden="true"><Icon /></span>
              ) : null}
              <h3 className="!font-medium">
                <button type="button" className="card-link" onClick={r.onClick}>
                  {r.title}
                </button>
              </h3>
              {r.body ? <p className="related-body">{r.body}</p> : null}
              {r.meta ? <div className="related-meta">{r.meta}</div> : null}
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- LOGO TICKER ------------------------------------------------
   MEASURED: two rows of chips sliding in OPPOSITE directions as the page
   scrolls. Not a time-based marquee — with no scrolling, velocity is zero. */

/**
 * MEASURED 12.8rem on the reference's product template - a `--color-primary`
 * bleed that overlaps the section above it. Structural, not decorative: it is
 * what joins two differently-grounded sections in the reference's page rhythm.
 */
export type CatalogueCard = {
  key: string;
  category?: ReactNode;
  title: ReactNode;
  excerpt?: ReactNode;
  meta?: ReactNode;
  media?: ReactNode;
  onClick?: () => void;
};

/**
 * The reference's catalogue index template (`News.module.css`), measured at
 * 104rem on `/news` at 1440: ONE contained section holding a scrolling
 * sub-nav, an optional featured slot and a card grid that steps 1 / 2 / 3
 * columns at 768 and 1025.
 *
 * The reference serves `/news` and `/news/guides` from this one component and
 * toggles the featured block with a prop rather than forking it. Every Shaa
 * listing route uses it for the same reason.
 */
export function CatalogueIndex({
  subNav,
  current,
  onNav,
  featured,
  cards,
  footer,
  perPage = 10,
  title,
}: {
  subNav?: { key: string; label: ReactNode }[];
  current?: string;
  onNav?: (key: string) => void;
  featured?: ReactNode;
  cards: CatalogueCard[];
  footer?: ReactNode;
  /* MEASURED `articlesPerPage: 10` (data/news/index.json). Pagination is part
     of the template, not an optimisation: the reference's listing pages show
     one page of ten and a pagination rail, which is what keeps the section at
     its measured height instead of growing with the archive. */
  perPage?: number;
  /* DOCUMENTED DEVIATION D-08: the reference's listing template renders no
     `h1` at all - its first heading is the featured block's `h2`. That leaves
     the page with no document outline root, which the width sweep flags. The
     heading is rendered visually hidden, so the silhouette is byte-identical
     to the reference and the outline is repaired. */
  title?: ReactNode;
}) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(cards.length / perPage));
  const safePage = Math.min(page, pages - 1);
  const shown = cards.slice(safePage * perPage, safePage * perPage + perPage);
  return (
    <div className="page">
      <Shell>
        {title ? <h1 className="sr-only">{title}</h1> : null}
        {subNav && subNav.length > 0 ? (
          <nav className="cat-subnav" aria-label="Sections">
            {subNav.map((l) => (
              <button
                key={l.key}
                type="button"
                aria-current={l.key === current ? "page" : undefined}
                onClick={() => { setPage(0); onNav?.(l.key); }}
              >
                {l.label}
              </button>
            ))}
          </nav>
        ) : null}

        {featured ? <section className="cat-featured">{featured}</section> : null}

        <section className="cat-grid" aria-labelledby="cat-grid-heading">
          {/* The cards are `h3`. Without a level between them and the page
              `h1` the outline skips a level, so the grid names itself - the
              heading is for the outline and for a screen reader, not for the
              silhouette. */}
          <h2 id="cat-grid-heading" className="sr-only">
            {title ?? "Articles"}
          </h2>
          {shown.map((c) => (
            <Reveal key={c.key}>
              <article
                className="cat-card"
                onClick={c.onClick}
                role={c.onClick ? "link" : undefined}
                tabIndex={c.onClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (c.onClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    c.onClick();
                  }
                }}
              >
                <div className="cat-card-media" aria-hidden="true" data-art-slot="catalogue-card">
                  {c.media}
                </div>
                {c.category ? <span className="cat-card-cat">{c.category}</span> : null}
                <h3 className="cat-card-title">{c.title}</h3>
                {c.excerpt ? <p className="cat-card-excerpt">{c.excerpt}</p> : null}
                {c.meta ? <span className="cat-card-date">{c.meta}</span> : null}
              </article>
            </Reveal>
          ))}
        </section>

        {pages > 1 ? (
          <nav className="cat-pagination" aria-label="Pagination">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-current={i === safePage ? "page" : undefined}
                onClick={() => {
                  setPage(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        ) : null}

        {footer}
      </Shell>
    </div>
  );
}

export function FlapTop({
  family,
  invert,
  children,
}: {
  family?: Family;
  invert?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="flap-top" {...sectionTheme(family, invert)}>
      <Shell>{children}</Shell>
    </section>
  );
}

/* ---------- LEGAL ------------------------------------------------------
   MEASURED: the document body IS the site grid; each clause is one row that
   splits into a sticky title column and a body column at 768 and again at
   1025. Pure CSS sticky — it works with scripting off. */

export function LegalPage({
  title,
  lede,
  clauses,
  family = "grey",
  invert,
}: {
  title: ReactNode;
  lede?: ReactNode;
  clauses: { key: string; title: ReactNode; body: ReactNode }[];
  family?: Family;
  invert?: boolean;
}) {
  // The reference's legal route is a single `.page` child: `LegalPage_legal
  // container`, measured 740rem for its 28 clauses. Without the `.page`
  // wrapper the clause list becomes the section run and the header theme
  // detector has nothing to read.
  return (
    <div className="page">
      <Shell as="div" className="legal" {...sectionTheme(family, invert)}>
        <h1 className="legal-title">{title}</h1>
        {lede ? <p className="legal-lede">{lede}</p> : null}
        {clauses.map((c, i) => (
          <section className="clause" key={c.key}>
            <h2 className="clause-title">{c.title}</h2>
            <div className="clause-body article-copy">
              <Reveal index={Math.min(i, 4)} y={16}>{c.body}</Reveal>
            </div>
          </section>
        ))}
      </Shell>
    </div>
  );
}

/* ---------- CTA --------------------------------------------------------
   The measured `block--content` composition used as a full-bleed closer. */

export function CtaSection({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  note,
  family = "grey",
  invert = true,
  id,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  primary?: { label: ReactNode; onClick: () => void; testId?: string };
  secondary?: { label: ReactNode; onClick: () => void };
  note?: ReactNode;
  family?: Family;
  invert?: boolean;
  id?: string;
}) {
  return (
    <Section id={id} family={family} invert={invert}>
      <Shell>
        <div className="block block--content !min-h-0">
          {eyebrow ? <p className="t-eyebrow !mb-0">{eyebrow}</p> : null}
          <h2 className="block-heading-m">{title}</h2>
          {body ? <p className="block-body">{body}</p> : null}
          <div className="hero-buttons justify-center !mt-0">
            {primary ? (
              <Button variant="invert" size="lg" onClick={primary.onClick} data-testid={primary.testId}>
                {primary.label}
              </Button>
            ) : null}
            {secondary ? (
              <Button variant="tertiary" size="lg" onClick={secondary.onClick}>
                {secondary.label}
              </Button>
            ) : null}
          </div>
          {note ? <p className="t-sm text-ink-muted">{note}</p> : null}
        </div>
      </Shell>
    </Section>
  );
}

/* ---------- MEDIA SLOT -------------------------------------------------
   Proprietary artwork is not reproduced. The slot keeps the measured aspect
   box, radius and position and renders as a flat tint of the section's own
   token, so the composition reads correctly with no artwork shipped. */

export function MediaSlot({
  ratio = "1 / 1",
  className,
  children,
  label,
}: {
  ratio?: string;
  className?: string;
  children?: ReactNode;
  label?: string;
}) {
  return (
    <div
      className={cn("media-slot", className)}
      style={{ ["--aspect-ratio" as string]: ratio }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </div>
  );
}
