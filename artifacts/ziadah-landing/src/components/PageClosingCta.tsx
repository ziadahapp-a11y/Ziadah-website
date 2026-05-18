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
  dark = false,
}: {
  title: ReactNode;
  description: ReactNode;
  buttonLabel: ReactNode;
  note?: ReactNode;
  onActivate: () => void;
  /** When true, renders a dark-themed variant that blends with dark pages. */
  dark?: boolean;
}) {
  return (
    <>
      {dark && (
        <style>{`
          section.cta-sec.landing-white-violet.cta-sec--dark {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            padding-top: 40px;
          }
          section.cta-sec.landing-white-violet.cta-sec--dark::before {
            content: '';
            display: block;
            width: min(80%, 720px);
            height: 1px;
            margin: 0 auto 48px;
            background: linear-gradient(90deg, transparent, rgba(168,85,247,.5), transparent);
          }
          section.cta-sec.landing-white-violet.cta-sec--dark .cta-box.gc {
            background: linear-gradient(165deg, rgba(168,85,247,.12) 0%, rgba(15,10,35,.55) 100%) !important;
            border: 1px solid rgba(168,85,247,.32) !important;
            border-image: none !important;
            backdrop-filter: blur(20px) saturate(1.1);
            -webkit-backdrop-filter: blur(20px) saturate(1.1);
            box-shadow: 0 20px 56px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.06) !important;
            border-radius: 24px !important;
          }
          section.cta-sec.landing-white-violet.cta-sec--dark .cta-box .cta-glow {
            background: radial-gradient(ellipse, rgba(168,85,247,.28), transparent 70%) !important;
            background-image: radial-gradient(ellipse, rgba(168,85,247,.28), transparent 70%) !important;
          }
          section.cta-sec.landing-white-violet.cta-sec--dark .cta-box .shine {
            background: rgba(168,85,247,.08);
            background-image: none;
          }
          section.cta-sec.landing-white-violet.cta-sec--dark .cta-box h2 {
            color: #f8fafc !important;
            -webkit-text-fill-color: #f8fafc !important;
            background: none !important;
            background-image: none !important;
            -webkit-background-clip: border-box !important;
            background-clip: border-box !important;
            display: block !important;
          }
          section.cta-sec.landing-white-violet.cta-sec--dark .cta-box p {
            color: rgba(248,250,252,.78) !important;
          }
          section.cta-sec.landing-white-violet.cta-sec--dark .cta-box .cta-note {
            color: rgba(248,250,252,.55) !important;
          }
          [data-theme="light"] section.cta-sec.landing-white-violet.cta-sec--dark .cta-box.gc {
            background: linear-gradient(165deg, rgba(255,255,255,.94) 0%, rgba(255,255,255,.72) 100%) !important;
            border-color: rgba(168,85,247,.22) !important;
            box-shadow: 0 12px 36px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.9) !important;
          }
          [data-theme="light"] section.cta-sec.landing-white-violet.cta-sec--dark .cta-box h2 {
            color: #4c1d95 !important;
            -webkit-text-fill-color: #4c1d95 !important;
          }
          [data-theme="light"] section.cta-sec.landing-white-violet.cta-sec--dark .cta-box p {
            color: rgba(124,58,237,.78) !important;
          }
        `}</style>
      )}
      <section
        className={`cta-sec landing-white-violet${dark ? " cta-sec--dark" : ""}`}
        style={dark
          ? { position: "relative", zIndex: 2 }
          : { background: "#fff", backgroundColor: "#fff", position: "relative", zIndex: 2 }}
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
    </>
  );
}
