import { type ComponentType, type ReactNode } from "react";
import { useEnterOnce } from "@/sections/scroll";

/**
 * The homepage's editorial grid.
 *
 * Two columns of cards with an offset row rhythm, collapsing to one
 * interleaved column below 1025. A card is one of exactly two things:
 *
 *   media    a Ziadah product surface fills the card; the caption sits on a
 *            scrim at the foot
 *   heading  a display line, one optional support line, an optional mark
 *
 * The variants are deliberately few. The homepage's old failure was not too
 * few card types - it was three scroll scenes stacking a headline, a phone and
 * a grid inside one 100svh box with only `z-index` between them. A grid cannot
 * do that: every card owns a cell.
 */
export type BoardTile = {
  key: string;
  variant: "media" | "heading";
  tone: "ink" | "pale" | "white";
  size: "tall" | "short";
  title: ReactNode;
  support?: ReactNode;
  /** media only: the product surface that fills the card. */
  art?: ReactNode;
  /** heading only: a small mark above the line. */
  Icon?: ComponentType<{ className?: string }>;
};

function Card({ tile, order }: { tile: BoardTile; order: number }) {
  const cls = `bcard bcard--${tile.variant} bcard--${tile.tone} bcard--${tile.size}`;
  /* `order` interleaves the two columns on mobile, where `.bboard-col` is
     `display: contents` and the cards become items of the board itself. On
     desktop each column's orders are already ascending, so it is a no-op. */
  const style = { order, "--bcard-delay": `${order * 70}ms` } as React.CSSProperties;

  if (tile.variant === "media") {
    return (
      <article className={cls} style={style}>
        {/* The surface is the picture. It carries no meaning the caption does
            not already carry, so it is decorative and the caption is the
            accessible name of the card. */}
        <span className="bcard-stage" aria-hidden="true" data-art-slot="board-media">
          {tile.art}
        </span>
        <div className="bcard-caption">
          <h3 className="bcard-title">{tile.title}</h3>
          {tile.support ? <p className="bcard-support">{tile.support}</p> : null}
        </div>
      </article>
    );
  }

  const { Icon } = tile;
  return (
    <article className={cls} style={style}>
      {Icon ? (
        <span className="bcard-mark" aria-hidden="true"><Icon /></span>
      ) : (
        <span aria-hidden="true" />
      )}
      <div className="bcard-body">
        <h3 className="bcard-title">{tile.title}</h3>
        {tile.support ? <p className="bcard-support">{tile.support}</p> : null}
      </div>
    </article>
  );
}

export function BentoBoard({ left, right }: { left: BoardTile[]; right: BoardTile[] }) {
  const { ref, entered } = useEnterOnce<HTMLDivElement>();
  /* Authored reading order on mobile is left, right, left, right - the board's
     own alternation - rather than the whole left column then the whole right. */
  const orderOf = (side: 0 | 1, i: number) => i * 2 + side;
  return (
    <div className="bboard" ref={ref} data-revealed={entered ? "" : undefined}>
      <div className="bboard-col bboard-col--left">
        {left.map((t, i) => <Card key={t.key} tile={t} order={orderOf(0, i)} />)}
      </div>
      <div className="bboard-col bboard-col--right">
        {right.map((t, i) => <Card key={t.key} tile={t} order={orderOf(1, i)} />)}
      </div>
    </div>
  );
}

/** A trailing row of compact heading tiles under a board. */
export function BentoStrip({ tiles }: { tiles: BoardTile[] }) {
  const { ref, entered } = useEnterOnce<HTMLDivElement>();
  return (
    <div className="bstrip" ref={ref} data-revealed={entered ? "" : undefined}>
      {tiles.map((t, i) => <Card key={t.key} tile={t} order={i} />)}
    </div>
  );
}

/** The head above a board: eyebrow, display line, lede. */
export function BoardHead({
  eyebrow, title, lede,
}: { eyebrow?: ReactNode; title: ReactNode; lede?: ReactNode }) {
  return (
    <header className="bhead">
      <div>
        {eyebrow ? <p className="bhead-eyebrow">{eyebrow}</p> : null}
        <h2 className="bhead-title">{title}</h2>
      </div>
      {lede ? <p className="bhead-lede">{lede}</p> : null}
    </header>
  );
}
