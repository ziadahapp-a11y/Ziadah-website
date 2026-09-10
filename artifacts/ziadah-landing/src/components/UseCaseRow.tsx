import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One use case, on one full-width row.
 *
 * WHAT THIS REPLACES. A marquee of 320x520 cards. Seven use cases rendered as
 * twenty-four: each of the two rows repeated its segment three times to loop,
 * and the second row re-added the first three cards to fill its width. A
 * merchant scanning the band saw the same offer slide past four times and had
 * no way to tell the seven apart, which is the one thing the band exists to
 * do.
 *
 * WHAT IT IS NOW. A row per use case, each answering the three questions a
 * store owner actually has - what is this, when do I use it, what does it get
 * me - beside the preview it is describing, at a size where the preview can be
 * read rather than glimpsed.
 *
 * THE ALTERNATION IS `row-reverse`, NOT `order`. On a two-cell grid the
 * flipped row has to swap which cell each child lands in; doing that with
 * `order` leaves the DOM order fixed, so a screen reader on the flipped rows
 * reads the preview before the copy that explains it. `row-reverse` on a flex
 * container paints the same swap and leaves the reading order alone. It is
 * also direction-aware: the flip is relative to the writing direction, so it
 * works in Arabic without a mirrored rule.
 */
export type UseCaseRowProps = {
  /** The use case's name. Rendered as the row's heading. */
  title: string;
  /** One line. What it does. */
  description: string;
  whenToUse: string;
  goal: string;
  example: string;
  /** A caveat under the example. Only the coupon has one. */
  note?: string;
  /** The live widget preview. */
  preview: ReactNode;
  /** Puts the preview on the leading side. The caller alternates it. */
  reverse?: boolean;
  /** Where the row's name links to. */
  href?: string;
  /** The label on that link. */
  hrefLabel?: string;
  onNavigate?: (href: string) => void;
  /** Labels for the three definition terms, in the reader's language. */
  labels: { whenToUse: string; goal: string; example: string };
};

export default function UseCaseRow({
  title,
  description,
  whenToUse,
  goal,
  example,
  note,
  preview,
  reverse = false,
  href,
  hrefLabel,
  onNavigate,
  labels,
}: UseCaseRowProps) {
  return (
    <article className={cn("ucrow", reverse && "ucrow--reverse")}>
      <div className="ucrow-copy">
        <h3 className="ucrow-title">{title}</h3>
        <p className="ucrow-desc">{description}</p>

        {/* A description list, because that is what this is: three terms and
            their values. It reads as a definition list to a screen reader and
            as three labelled lines to everyone else. */}
        <dl className="ucrow-facts">
          <div className="ucrow-fact">
            <dt className="ucrow-fact-k">{labels.whenToUse}</dt>
            <dd className="ucrow-fact-v">{whenToUse}</dd>
          </div>
          <div className="ucrow-fact">
            <dt className="ucrow-fact-k">{labels.goal}</dt>
            <dd className="ucrow-fact-v">{goal}</dd>
          </div>
          <div className="ucrow-fact">
            <dt className="ucrow-fact-k">{labels.example}</dt>
            <dd className="ucrow-fact-v">{example}</dd>
          </div>
        </dl>

        {note ? <p className="ucrow-note">{note}</p> : null}

        {href && hrefLabel ? (
          <a
            className="ucrow-link"
            href={href}
            onClick={
              onNavigate
                ? (e) => {
                    e.preventDefault();
                    onNavigate(href);
                  }
                : undefined
            }
          >
            {hrefLabel}
          </a>
        ) : null}
      </div>

      {/* The stage is a STOREFRONT, so it is the flat near-white a real store
          page is, the same call the marquee card made. The widget inside it is
          the live component, not a picture of one. */}
      <div className="ucrow-stage">
        <div className="ucrow-stage-inner">{preview}</div>
      </div>
    </article>
  );
}
