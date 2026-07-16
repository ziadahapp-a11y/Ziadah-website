import { ReactNode, CSSProperties } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

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
      className={`landing-shell min-h-screen-dvh${className ? ` ${className}` : ""}`}
      style={{
        background: "var(--page-background)",
        fontFamily: "var(--font)",
        direction: dir,
        color: "var(--t)",
        position: "relative",
        transition: "var(--theme-transition)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
