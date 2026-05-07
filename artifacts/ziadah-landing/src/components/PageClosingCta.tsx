import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

function ClosingCtaGlassCard({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div ref={ref} className={`gc ${className}`} style={style}>
      <div className="shine" />
      {children}
    </div>
  );
}

export default function PageClosingCta({
  title,
  description,
  buttonLabel,
  note,
  onActivate,
}: {
  title: ReactNode;
  description: ReactNode;
  buttonLabel: ReactNode;
  note?: ReactNode;
  onActivate: () => void;
}) {
  return (
    <section
      className="cta-sec landing-white-violet"
      style={{ background: "#fff", backgroundColor: "#fff", position: "relative", zIndex: 2 }}
    >
      <div className="wrap">
        <ClosingCtaGlassCard className="cta-box rv">
          <div className="cta-glow" />
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="cta-btns">
            <button
              type="button"
              onClick={onActivate}
              className="cta-btn cb-zid"
              style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M9 2L3 10h6l-2 6 8-10H9l2-6z" fill="#fff" />
              </svg>
              {buttonLabel}
            </button>
          </div>
          {note != null && note !== "" ? (
            <div className="cta-note text-[16px]">{note}</div>
          ) : null}
        </ClosingCtaGlassCard>
      </div>
    </section>
  );
}
