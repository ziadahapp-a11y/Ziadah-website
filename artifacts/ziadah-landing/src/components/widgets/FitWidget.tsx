import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * ONE SIZE FOR EVERY SHEET.
 *
 * Every widget shape is laid out at the same natural width, STANDARD_WIDTH,
 * and shown at the same scale: 1 when the box is wide enough, and the box's
 * width over STANDARD_WIDTH when it is not. The scale never depends on the
 * sheet's height. It used to: each sheet was shrunk until it fitted the box,
 * so the kit (822px tall) was drawn at 0.58 on a phone and the next shape at
 * 0.89, and the text in one was half the size of the text in the other.
 *
 * Height is the content's job now. A shape that would be taller than the
 * stage has fewer items, not a smaller type size (see the packs and
 * storefrontSets); the sheet is measured here and its box follows it.
 *
 * `useLayoutEffect` rather than `useEffect`: the scale has to be in place
 * before the browser paints, or the sheet is drawn at full size and snaps
 * down on every mount and every change of shape.
 *
 * THE TRANSFORM IS WRITTEN TO THE DOM, NOT HELD IN STATE. Measuring requires
 * clearing the transform first, and clearing it through React's `style`
 * desynchronised React's record from the DOM, so an unchanged prop wrote
 * nothing and the sheet stayed at its natural size. One owner per property.
 */
export const STANDARD_WIDTH = 340;

export default function FitWidget({
  children,
  className,
  hug = false,
  fill = false,
  height = 700,
}: {
  children: ReactNode;
  className?: string;
  /** Size the box to the sheet, however tall it is. */
  hug?: boolean;
  /**
   * Take whatever height the parent gives the box, and centre the sheet in
   * it. For a box inside a flex column stretched to match something else,
   * where neither a fixed nor a hugging height is right.
   */
  fill?: boolean;
  /** The box's height at the standard scale, when it neither hugs nor fills; the sheet is centred in it. */
  height?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const b = box.current;
    const i = inner.current;
    if (!b || !i) return;

    const fit = () => {
      /* The sheet's natural size, read with the transform removed: measuring
         a scaled element returns the scaled box. */
      i.style.transform = "none";
      const nh = i.offsetHeight;
      const bw = b.clientWidth;
      if (!nh || !bw) return;
      /* A sheet inside a pinned accordion has to fit the window, or the pin
         holds a band whose bottom is off the screen. Every sheet gets the same
         factor (the room left under the header over the standard height), so
         the shapes stay one size to each other; on a tall screen it is 1. */
      const pin = b.closest<HTMLElement>(".sacc-pin");
      let room = 1;
      if (pin) {
        const narrow = !window.matchMedia("(min-width: 900px)").matches;
        const head = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-dynamic-height")) || 66;
        const chrome = pin.getBoundingClientRect().height - b.getBoundingClientRect().height;
        room = Math.max(narrow ? 0.45 : 0.6, (window.innerHeight - head - 32 - chrome) / height);
      }
      const next = Math.min(1, bw / STANDARD_WIDTH, room);
      const shown = nh * next;
      /* The box is a floor, not a crop: `height` is for the standard scale, so
         it shrinks with it, and a sheet taller than that makes the box taller,
         because a cropped preview cannot be told from a design. */
      if (hug) b.style.height = `${Math.ceil(shown)}px`;
      else if (!fill) b.style.height = `${Math.ceil(Math.max(height * next, shown))}px`;
      const off = hug ? 0 : Math.max(0, (b.clientHeight - shown) / 2);
      const dx = (bw - STANDARD_WIDTH * next) / 2;
      i.style.transform = `translate(${dx}px, ${off}px) scale(${next})`;
    };

    fit();
    /* The sheet changes height when the shape changes and the box changes
       width when the column does, so both are watched. */
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    ro.observe(i);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, [children, hug, fill, height]);

  return (
    <div
      ref={box}
      className={`fitw${className ? ` ${className}` : ""}`}
      style={hug || fill ? undefined : { height }}
    >
      <div ref={inner} className="fitw-in">
        {children}
      </div>
    </div>
  );
}
