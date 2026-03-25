import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { scrollToHashElement } from "@/utils/anchorScroll";

/** يجب أن يبقى متطابقاً مع أنيميشن الـ zoom في PageTransition */
const ZOOM_OUT_MS = 200;
const ZOOM_IN_MS = 220;
/** هامش بعد انتهاء الترانزشن (~90ms الأصلية) قبل استطلاع الـ DOM */
const HASH_POLL_BUFFER_MS = 140;

type TransitionPhase = "idle" | "zoom-out" | "zoom-in";

interface ClickOrigin {
  xPct: string;
  yPx: number;
}

let _triggerTransition: ((path: string) => void) | null = null;
let _lastClickX = 0;
let _lastClickY = 0;

if (typeof window !== "undefined") {
  window.addEventListener(
    "click",
    (e) => {
      _lastClickX = e.clientX;
      _lastClickY = e.clientY;
    },
    true
  );
}

export function navigateTo(path: string) {
  if (_triggerTransition) {
    _triggerTransition(path);
  }
}

/** إزالة base الـ Vite (مثل /app) من pathname */
function stripViteBase(pathname: string): string {
  const raw = import.meta.env.BASE_URL || "/";
  const base = raw.replace(/\/$/, "");
  if (!base) return pathname;
  if (pathname === base || pathname.startsWith(`${base}/`)) {
    let rest = pathname.slice(base.length);
    if (!rest.startsWith("/")) rest = `/${rest}`;
    return rest || "/";
  }
  return pathname;
}

/** مسار منطقي للمقارنة: يتجاهل بادئة /en و base */
function logicalPathname(pathname: string): string {
  let p = stripViteBase(pathname);
  p = p.replace(/\/$/, "") || "/";
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) {
    const rest = p.slice(3).replace(/\/$/, "") || "/";
    return rest;
  }
  return p;
}

function syncUrlHash(hash: string) {
  const path = window.location.pathname;
  const search = window.location.search;
  const next = `${path}${search}#${hash}`;
  const cur = `${path}${search}${window.location.hash}`;
  if (cur !== next) {
    window.history.pushState(null, "", next);
  }
}

export function navigateToHash(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    navigateTo(href);
    return;
  }
  const hash = href.slice(hashIndex + 1).split("?")[0];
  if (!hash) {
    navigateTo(href.slice(0, hashIndex) || "/");
    return;
  }

  let basePath = href.slice(0, hashIndex) || "/";
  basePath = basePath.replace(/\/$/, "") || "/";

  const currentLogical = logicalPathname(window.location.pathname);
  const baseLogical = logicalPathname(basePath);

  const scrollBehavior: ScrollBehavior =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const scrollToTarget = () => {
    if (scrollToHashElement(hash, scrollBehavior)) {
      syncUrlHash(hash);
    }
  };

  if (currentLogical === baseLogical) {
    scrollToTarget();
    return;
  }

  navigateTo(basePath);
  const start = Date.now();
  const poll = () => {
    if (scrollToHashElement(hash, scrollBehavior)) {
      syncUrlHash(hash);
    } else if (Date.now() - start < 3000) {
      setTimeout(poll, 50);
    }
  };
  setTimeout(poll, ZOOM_OUT_MS + ZOOM_IN_MS + HASH_POLL_BUFFER_MS);
}

/** أقصر من السابق + scale أصغر = أقل ضغط على الـ GPU (بدون blur) */
const ZOOM_OUT_SCALE = 2.35;
const ZOOM_IN_FROM = 0.88;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const [origin, setOrigin] = useState<ClickOrigin | null>(null);
  const isTransitioning = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollYRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const addTimer = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  };

  const triggerTransition = useCallback(
    (path: string) => {
      if (isTransitioning.current) return;

      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navigate(path);
        window.scrollTo(0, 0);
        return;
      }

      isTransitioning.current = true;
      scrollYRef.current = window.scrollY;

      const xPct = (((_lastClickX || window.innerWidth / 2) / window.innerWidth) * 100).toFixed(2) + "%";
      const yPx = _lastClickY || window.innerHeight / 2;
      const nextOrigin = { xPct, yPx };

      setOrigin(nextOrigin);
      setPhase("zoom-out");

      addTimer(() => {
        requestAnimationFrame(() => {
          navigate(path);
          window.scrollTo(0, 0);

          requestAnimationFrame(() => {
            setPhase("zoom-in");

            addTimer(() => {
              setPhase("idle");
              setOrigin(null);
              isTransitioning.current = false;
              if (wrapperRef.current) {
                wrapperRef.current.style.removeProperty("will-change");
              }
            }, ZOOM_IN_MS + 50);
          });
        });
      }, ZOOM_OUT_MS);
    },
    [navigate]
  );

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

  const transformOrigin =
    origin ? `${origin.xPct} ${origin.yPx}px` : "50% 45vh";

  const getWrapperStyle = (): React.CSSProperties => {
    if (phase === "zoom-out") {
      return {
        position: "fixed",
        inset: 0,
        top: -scrollYRef.current,
        width: "100%",
        height: `calc(100vh + ${scrollYRef.current}px)`,
        transformOrigin,
        willChange: "transform, opacity",
        animation: `ptZoomOut ${ZOOM_OUT_MS}ms cubic-bezier(0.32, 0, 0.67, 0) both`,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 10000,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      };
    }

    if (phase === "zoom-in") {
      return {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        transformOrigin,
        willChange: "transform, opacity",
        animation: `ptZoomIn ${ZOOM_IN_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both`,
        pointerEvents: "none",
        userSelect: "none",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
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
        @keyframes ptZoomOut {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(${ZOOM_OUT_SCALE});
            opacity: 0;
          }
        }
        @keyframes ptZoomIn {
          from {
            transform: scale(${ZOOM_IN_FROM});
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes ptZoomOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes ptZoomIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }
      `}</style>
      {phase !== "idle" && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            background: "var(--bg)",
            pointerEvents: "all",
            opacity: phase === "zoom-out" ? 1 : 0,
            transition:
              phase === "zoom-out"
                ? `opacity ${Math.round(ZOOM_OUT_MS * 0.5)}ms ease-out`
                : `opacity ${ZOOM_IN_MS}ms ease-out`,
            willChange: phase === "zoom-out" ? "opacity" : "auto",
          }}
        />
      )}
      <div ref={wrapperRef} style={getWrapperStyle()}>
        {displayChildren}
      </div>
    </>
  );
}
