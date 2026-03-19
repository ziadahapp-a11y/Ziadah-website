import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const ZID_URL = "https://apps.zid.sa/application/1826";
const SALLA_URL = "https://apps.salla.sa/ar/app/1099604538";

const ZidLogo = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#5B21B6" />
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="900" fontFamily="Arial,sans-serif">Z</text>
  </svg>
);

const SallaLogo = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#F59E0B" />
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" fontFamily="Arial,sans-serif">S</text>
  </svg>
);

interface DropdownPosition {
  top: number;
  right: number;
}

interface PlatformPickerButtonProps {
  mode: "dropdown" | "split";
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  splitClassName?: string;
  splitStyle?: React.CSSProperties;
}

export default function PlatformPickerButton({
  mode,
  label = "ابدأ الآن",
  className = "",
  style = {},
  wrapperClassName = "",
  wrapperStyle = {},
  splitClassName = "",
  splitStyle = {},
}: PlatformPickerButtonProps) {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState<DropdownPosition | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const computePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setDropPos({
      top: rect.bottom + window.scrollY + 8,
      right: window.innerWidth - rect.right,
    });
  }, []);

  const handleToggle = () => {
    if (!open) {
      computePosition();
    }
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current && !triggerRef.current.contains(target)) {
        const portal = document.getElementById("platform-picker-portal");
        if (portal && portal.contains(target)) return;
        setOpen(false);
      }
    };
    const handleScroll = () => {
      computePosition();
    };
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", computePosition);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", computePosition);
    };
  }, [open, computePosition]);

  if (mode === "split") {
    return (
      <div style={{ display: "flex", gap: 8, ...splitStyle }} className={splitClassName}>
        <a
          href={SALLA_URL}
          target="_blank"
          rel="noreferrer"
          className={className}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            ...style,
          }}
        >
          <SallaLogo />
          سلة
        </a>
        <a
          href={ZID_URL}
          target="_blank"
          rel="noreferrer"
          className={className}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            ...style,
          }}
        >
          <ZidLogo />
          زد
        </a>
      </div>
    );
  }

  return (
    <>
      <div
        ref={triggerRef}
        className={wrapperClassName}
        style={{ position: "relative", display: "inline-block", ...wrapperStyle }}
      >
        <button
          onClick={handleToggle}
          className={className}
          style={{
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            cursor: "pointer",
            font: "inherit",
            ...style,
          }}
        >
          {label}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transition: "transform .2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              flexShrink: 0,
            }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {open && dropPos && createPortal(
        <div
          id="platform-picker-portal"
          style={{
            position: "absolute",
            top: dropPos.top,
            right: dropPos.right,
            minWidth: 180,
            background: "rgba(10,6,20,0.97)",
            border: "1px solid rgba(124,58,237,.3)",
            borderRadius: 14,
            boxShadow: "0 16px 48px rgba(0,0,0,.7), 0 0 30px rgba(124,58,237,.15)",
            overflow: "hidden",
            zIndex: 99999,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            direction: "rtl",
          }}
        >
          <a
            href={SALLA_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 18px",
              textDecoration: "none",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "var(--font)",
              transition: "background .18s",
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,158,11,.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <SallaLogo />
            <span>سلة</span>
          </a>
          <a
            href={ZID_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 18px",
              textDecoration: "none",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "var(--font)",
              transition: "background .18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ZidLogo />
            <span>زد</span>
          </a>
        </div>,
        document.body
      )}
    </>
  );
}
