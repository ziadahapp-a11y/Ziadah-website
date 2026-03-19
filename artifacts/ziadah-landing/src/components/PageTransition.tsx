import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";

type TransitionPhase = "idle" | "zoom-out" | "zoom-in";

interface ClickOrigin {
  xPct: string;
  yPx: number;
}

let _triggerTransition: ((path: string) => void) | null = null;
let _lastClickX = 0;
let _lastClickY = 0;

if (typeof window !== "undefined") {
  window.addEventListener("click", (e) => {
    _lastClickX = e.clientX;
    _lastClickY = e.clientY;
  }, true);
}

export function navigateTo(path: string) {
  if (_triggerTransition) {
    _triggerTransition(path);
  }
}

// Use this for hash-fragment links like /#faq or /#pricing
// If already on the base path, smooth-scroll directly; otherwise navigate first then scroll
export function navigateToHash(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    navigateTo(href);
    return;
  }
  const hash = href.slice(hashIndex + 1);
  const basePath = href.slice(0, hashIndex) || "/";
  const currentPath = window.location.pathname;

  const scrollToTarget = () => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (currentPath === basePath || (basePath === "/" && currentPath === "/")) {
    scrollToTarget();
  } else {
    navigateTo(basePath);
    // Wait for page transition animation to finish (zoom-out 280ms + zoom-in 250ms = ~530ms)
    // then poll until the target element appears in the DOM (or give up after 3s)
    const start = Date.now();
    const poll = () => {
      if (document.getElementById(hash)) {
        scrollToTarget();
      } else if (Date.now() - start < 3000) {
        setTimeout(poll, 50);
      }
    };
    setTimeout(poll, 620);
  }
}

const ZOOM_OUT_MS = 280;
const ZOOM_IN_MS = 250;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const [origin, setOrigin] = useState<ClickOrigin | null>(null);
  const isTransitioning = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollYRef = useRef(0);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const addTimer = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  };

  const triggerTransition = useCallback((path: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    scrollYRef.current = window.scrollY;

    const xPct = (((_lastClickX || window.innerWidth / 2) / window.innerWidth) * 100).toFixed(1) + "%";
    const yPx = _lastClickY || window.innerHeight / 2;

    setOrigin({ xPct, yPx });
    setPhase("zoom-out");

    addTimer(() => {
      navigate(path);
      window.scrollTo(0, 0);

      addTimer(() => {
        setPhase("zoom-in");

        addTimer(() => {
          setPhase("idle");
          setOrigin(null);
          isTransitioning.current = false;
        }, ZOOM_IN_MS + 40);
      }, 15);
    }, ZOOM_OUT_MS);
  }, [navigate]);

  useEffect(() => {
    _triggerTransition = triggerTransition;
    return () => {
      _triggerTransition = null;
      clearTimers();
    };
  }, [triggerTransition]);

  useEffect(() => {
    if (phase === "idle" || phase === "zoom-in") {
      setDisplayChildren(children);
    }
  }, [children, phase]);

  const getWrapperStyle = (): React.CSSProperties => {
    if (phase === "zoom-out") {
      const transformOrigin = origin
        ? `${origin.xPct} ${origin.yPx}px`
        : "50% 50%";

      return {
        position: "fixed",
        inset: 0,
        top: -scrollYRef.current,
        width: "100%",
        transformOrigin,
        willChange: "transform, opacity, filter",
        transform: "scale(6)",
        opacity: 0,
        filter: "blur(8px)",
        transition: `transform ${ZOOM_OUT_MS}ms cubic-bezier(0.45, 0, 1, 0.5), opacity ${Math.round(ZOOM_OUT_MS * 0.55)}ms ease-in, filter ${ZOOM_OUT_MS}ms ease-in`,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 10000,
      };
    }

    if (phase === "zoom-in") {
      return {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        transformOrigin: "50% 50vh",
        willChange: "transform, opacity, filter",
        animation: `ptZoomIn ${ZOOM_IN_MS}ms cubic-bezier(0.0, 0.0, 0.2, 1) both`,
        pointerEvents: "none",
        userSelect: "none",
      };
    }

    return {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
    };
  };

  return (
    <>
      <style>{`
        @keyframes ptZoomIn {
          from {
            transform: scale(0.12);
            opacity: 0;
            filter: blur(6px);
          }
          50% {
            opacity: 1;
            filter: blur(2px);
          }
          to {
            transform: scale(1);
            opacity: 1;
            filter: blur(0px);
          }
        }
      `}</style>
      {phase !== "idle" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            background: "#080614",
            pointerEvents: "all",
            opacity: phase === "zoom-out" ? 1 : 0,
            transition: phase === "zoom-out"
              ? `opacity ${Math.round(ZOOM_OUT_MS * 0.55)}ms ease-in`
              : `opacity ${ZOOM_IN_MS}ms ease-out`,
          }}
        />
      )}
      <div style={getWrapperStyle()}>
        {displayChildren}
      </div>
    </>
  );
}
