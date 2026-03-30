import { useRef } from "react";
import { useMarqueeShiftSync } from "@/hooks/useMarqueeShiftSync";

export default function DraggableMarqueeRow({
  directionClass,
  duration,
  children,
}: {
  directionClass: "marquee-rtl" | "marquee-ltr";
  duration: string;
  children: React.ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const dragLayerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startDragXRef = useRef(0);
  const dragXRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startDragXRef.current = dragXRef.current;
    rowRef.current?.classList.add("is-paused", "is-dragging");
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - startXRef.current;
    const nextX = startDragXRef.current + dx;
    dragXRef.current = nextX;
    if (dragLayerRef.current) {
      dragLayerRef.current.style.transform = `translate3d(${nextX}px,0,0)`;
    }
  };

  const stopDrag = () => {
    rowRef.current?.classList.remove("is-dragging", "is-paused");
    pointerIdRef.current = null;
  };

  useMarqueeShiftSync(trackRef);

  return (
    <div
      ref={rowRef}
      className="marquee-row interactive-marquee"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
    >
      <div ref={dragLayerRef} className="interactive-drag-layer">
        <div
          ref={trackRef}
          className={`marquee-track ${directionClass} interactive-track`}
          style={{
            animationDuration: duration,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
