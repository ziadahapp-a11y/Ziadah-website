import { type ReactNode } from "react";
import { Zap } from "lucide-react";
import { CtaSection } from "@/sections";

/**
 * The closing CTA every marketing page ends on — fifteen standalone pages plus
 * the use-case playbook.
 *
 * It is now the design system's `CtaSection` on the inverted violet family,
 * which is the same band the rest of the site closes with. The dark panel it
 * used to paint by hand — a `mockup-card` with a grid overlay, a blur glow,
 * and `WebkitTextFillColor: "#ffffff"` forced onto the heading to beat a
 * legacy rule — was reproducing what the section triple already does, and
 * doing it in one page's colours rather than the section's.
 *
 * The public API is unchanged: every caller keeps working untouched. `dark`
 * stays accepted and ignored, as it already was.
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
  /** Deprecated: retained for compatibility, and ignored. */
  dark?: boolean;
}) {
  return (
    <CtaSection
      family="violet"
      title={title}
      body={description}
      note={note != null && note !== "" ? note : undefined}
      primary={{
        label: (
          <>
            <Zap className="w-4 h-4" aria-hidden="true" />
            {buttonLabel}
          </>
        ),
        onClick: onActivate,
        testId: "page-closing-cta",
      }}
    />
  );
}
