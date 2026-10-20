import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * SHOW THE WHOLE SHEET, WHATEVER ITS HEIGHT.
 *
 * The twelve widget shapes are genuinely different heights - the kit builder
 * runs three groups of options, the coupon is four lines - so any fixed box
 * either crops the tall ones or leaves the short ones floating in a well.
 * Both were happening: the kit sheet was cut off at the bottom of its stage,
 * which is the one thing a preview must never do, because a merchant reading
 * a cropped widget cannot tell whether the crop is the design.
 *
 * So the box is fixed and the SHEET is scaled to fit it. The scale is
 * measured, not guessed: the wrapper reports its own height, the sheet
 * reports its natural one, and the ratio is applied as a transform. It never
 * scales UP - a short sheet stays its real size and centres, because a coupon
 * blown up to 1.4x stops looking like the product.
 *
 * `useLayoutEffect` rather than `useEffect`: the scale has to be in place
 * before the browser paints, or the sheet is visibly drawn at full size and
 * then snaps down on every mount and every change of shape.
 *
 * THE TRANSFORM IS WRITTEN TO THE DOM, NOT HELD IN STATE. The first version
 * kept the scale in `useState` and let React render it. Measuring requires
 * clearing the transform first, and clearing it meant React's record of the
 * style no longer matched the DOM - so when the effect set the same scale
 * again, React saw an unchanged prop and wrote nothing, leaving the sheet at
 * its natural size. Every shape rendered unscaled, and two of the twelve ran
 * straight out of their box. One owner for one property.
 */
export default function FitWidget({
  children,
  height = 520,
  className,
}: {
  children: ReactNode;
  /** The box the sheet has to fit into. */
  height?: number;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const b = box.current;
    const i = inner.current;
    if (!b || !i) return;

    const fit = () => {
      /* The sheet's natural size, read with the transform removed: measuring
         a scaled element returns the scaled box, so leaving the old scale on
         would make every pass converge on a smaller number than the last. */
      i.style.transform = "none";
      const nh = i.offsetHeight;
      const nw = i.offsetWidth;
      const bh = b.clientHeight;
      const bw = b.clientWidth;
      if (!nh || !nw) return;
      const next = Math.min(1, bh / nh, bw / nw);
      i.style.transform = next < 1 ? `scale(${next})` : "none";
    };

    fit();
    /* The sheet changes height when the shape changes and the box changes
       width when the column does, so both are watched. */
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    ro.observe(i);
    return () => ro.disconnect();
  }, [children, height]);

  return (
    <div
      ref={box}
      className={`fitw${className ? ` ${className}` : ""}`}
      style={{ height }}
    >
      <div ref={inner} className="fitw-in">
        {children}
      </div>
    </div>
  );
}
