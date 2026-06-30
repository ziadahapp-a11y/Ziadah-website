import { type ReactNode } from "react";
import { CheckCircle2, Zap } from "lucide-react";

/**
 * Closing CTA shared across marketing + use-case pages.
 *
 * Re-themed to the TrackFlow design system: a dark `mockup-card` panel with a
 * faint grid + green glow, white heading, muted subtitle, and an inverted
 * (white) primary button — matching the final CTA on the home page
 * (`src/pages/HomeTrackflow.tsx`). The public API is unchanged so every caller
 * keeps working; the `dark` prop is now a no-op (the CTA is always the dark
 * panel) but kept for compatibility.
 */
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
  /** Deprecated: retained for compatibility; the CTA is always the dark panel now. */
  dark?: boolean;
}) {
  return (
    <section className="py-24 px-4 bg-white" style={{ position: "relative", zIndex: 2 }}>
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-3xl mockup-card overflow-hidden shadow-card-lg relative p-10 md:p-14 text-center">
          <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{title}</h2>
            <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl mx-auto">{description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onActivate}
                className="inline-flex items-center justify-center gap-2 text-base h-12 px-8 rounded-md bg-white text-zinc-950 hover:bg-zinc-100 font-semibold transition-colors"
                style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}
              >
                <Zap className="w-4 h-4" />
                {buttonLabel}
              </button>
            </div>
            {note != null && note !== "" ? (
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  {note}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
