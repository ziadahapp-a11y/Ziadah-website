import { ReactNode, CSSProperties } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * The page wrapper.
 *
 * `page` is the design system's own page class, so a page wrapped here gets
 * the system's stacking and rhythm; `landing-shell` stays beside it for the
 * legacy rules still scoped to it. The inline background and colour are gone:
 * a page's ground is the first section's, and forcing `--page-background`
 * here painted over a section that had stamped its own.
 */
export default function PageShell({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { dir } = useLanguage();

  return (
    <div
      className={`page landing-shell min-h-screen-dvh${className ? ` ${className}` : ""}`}
      style={{ direction: dir, position: "relative", ...style }}
    >
      {children}
    </div>
  );
}
