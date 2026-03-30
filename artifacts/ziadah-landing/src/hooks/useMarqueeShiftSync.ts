import { type RefObject, useLayoutEffect } from "react";

/** يضبط --marquee-shift على المسار بالبكسل (عرض أول .marquee-segment) لحلقة لانهائية بدون قفزة */
export function useMarqueeShiftSync(trackRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncShift = () => {
      const seg = track.querySelector(":scope > .marquee-segment") as HTMLElement | null;
      if (!seg) return;
      const w = seg.getBoundingClientRect().width;
      if (w <= 0) return;
      track.style.setProperty("--marquee-shift", `${-w}px`);
    };

    syncShift();
    requestAnimationFrame(() => {
      requestAnimationFrame(syncShift);
    });
    const ro = new ResizeObserver(syncShift);
    ro.observe(track);
    const firstSeg = track.querySelector(":scope > .marquee-segment") as HTMLElement | null;
    if (firstSeg) ro.observe(firstSeg);
    return () => ro.disconnect();
  }, []);
}
