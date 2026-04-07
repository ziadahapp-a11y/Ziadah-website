import { ReactNode, CSSProperties } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import SitePageBackground from "./SitePageBackground";

/** غلاف الصفحة: خلفية الصفحة الرئيسية + `landing-shell` للتكديس مع المحتوى. */
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
      className={`landing-shell${className ? ` ${className}` : ""}`}
      style={{
        background: "#05000f",
        minHeight: "100vh",
        fontFamily: "var(--font)",
        direction: dir,
        color: "var(--t)",
        position: "relative",
        transition: "var(--theme-transition)",
        ...style,
      }}
    >
      <SitePageBackground />
      {children}
    </div>
  );
}
