import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { scrollToHashElement } from "@/utils/anchorScroll";

/** أنيميشن خفيف (translate + scale بسيط) + مدة أوطى = أقل ضغط على GPU من zoom كبير */
const EXIT_MS = 260;
const ENTER_MS = 300;
const EXIT_EASE = "cubic-bezier(0.4, 0, 0.68, 0.38)";
const ENTER_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const HASH_POLL_BUFFER_MS = 120;

type TransitionPhase = "idle" | "zoom-out" | "zoom-in";

interface ClickOrigin {
  xPct: string;
  yPx: number;
}

let _triggerTransition: ((path: string) => void) | null = null;
/** تنقّل مباشر من الراوتر — يُستخدم عندما لا يكون انتقال الصفحة جاهزاً أو أثناء انتقال عالق */
let _directNavigate: ((path: string) => void) | null = null;
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

/** يبدأ تحميل شُرَح الصفحة مبكراً أثناء خروج الصفحة الحالية (يقلّل وميض Suspense) */
const ROUTE_PRELOADS: Record<string, () => Promise<unknown>> = {
  "/success-stories": () => import("@/pages/SuccessStories"),
  "/support": () => import("@/pages/Support"),
  "/features": () => import("@/pages/Features"),
  "/calculator": () => import("@/pages/Calculator"),
  "/blog": () => import("@/pages/Blog"),
  "/privacy": () => import("@/pages/Privacy"),
  "/terms": () => import("@/pages/Terms"),
  "/use-cases/product-page": () => import("@/pages/use-cases/ProductPage"),
  "/use-cases/cart": () => import("@/pages/use-cases/CartPage"),
  "/use-cases/thank-you": () => import("@/pages/use-cases/ThankYouPage"),
  "/use-cases/home": () => import("@/pages/use-cases/HomePage"),
  "/use-cases/category": () => import("@/pages/use-cases/CategoryPage"),
  "/use-cases/all-pages": () => import("@/pages/use-cases/AllPages"),
  "/use-cases/cross-sell": () => import("@/pages/use-cases/CrossSell"),
  "/use-cases/upsell": () => import("@/pages/use-cases/Upsell"),
  "/use-cases/increase-aov": () => import("@/pages/use-cases/IncreaseAOV"),
  "/use-cases/reduce-abandon": () => import("@/pages/use-cases/ReduceAbandon"),
  "/use-cases/increase-conversion": () => import("@/pages/use-cases/IncreaseConversion"),
  "/use-cases/related-products": () => import("@/pages/use-cases/RelatedProducts"),
  "/use-cases/addons": () => import("@/pages/use-cases/Addons"),
  "/use-cases/buy-together": () => import("@/pages/use-cases/BuyTogether"),
  "/use-cases/bundle-deals": () => import("@/pages/use-cases/BundleDeals"),
  "/use-cases/buy-more-save-more": () => import("@/pages/use-cases/BuyMoreSaveMore"),
  "/use-cases/checkout": () => import("@/pages/use-cases/CheckoutPage"),
  "/use-cases/add-to-cart": () => import("@/pages/use-cases/AddToCartPage"),
  "/use-cases/remove-from-cart": () => import("@/pages/use-cases/RemoveFromCartPage"),
  "/use-cases/customer-experience": () => import("@/pages/use-cases/CustomerExperience"),
  "/use-cases/more-cart-items": () => import("@/pages/use-cases/MoreCartItems"),
  "/use-cases/free-shipping": () => import("@/pages/use-cases/FreeShippingDisplay"),
  "/use-cases/discount-coupon": () => import("@/pages/use-cases/DiscountCoupon"),
  "/sectors": () => import("@/pages/Sectors"),
};

function preloadRoute(path: string) {
  const raw = path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  if (raw === "/") return;
  const load = ROUTE_PRELOADS[raw];
  if (load) {
    void load();
    return;
  }
  if (raw.startsWith("/blog/") && raw !== "/blog") void import("@/pages/BlogPost");
  else if (raw.startsWith("/support/article/")) void import("@/pages/SupportArticle");
  else if (raw.startsWith("/sectors/") && raw !== "/sectors") void import("@/pages/SectorDetail");
}

export function navigateTo(path: string) {
  if (_triggerTransition) {
    _triggerTransition(path);
  } else if (_directNavigate) {
    _directNavigate(path);
    window.scrollTo(0, 0);
  }
}

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
  setTimeout(poll, EXIT_MS + ENTER_MS + HASH_POLL_BUFFER_MS);
}

const EXIT_Y = 10;
const ENTER_Y = 14;
const EXIT_SCALE = 0.985;
const ENTER_SCALE_FROM = 1.012;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const [origin, setOrigin] = useState<ClickOrigin | null>(null);
  const isTransitioning = useRef(false);
  const phaseRef = useRef<TransitionPhase>("idle");
  phaseRef.current = phase;
  const pendingPathRef = useRef<string | null>(null);
  const scrollYRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const triggerTransition = useCallback(
    (path: string) => {
      /** إن كان انتقالاً قيد التنفيذ، نُكمِل بالتنقّل المباشر وإلا يُلغى النقر بلا أثر */
      if (isTransitioning.current) {
        navigate(path);
        window.scrollTo(0, 0);
        return;
      }

      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navigate(path);
        window.scrollTo(0, 0);
        return;
      }

      isTransitioning.current = true;
      preloadRoute(path);
      scrollYRef.current = window.scrollY;
      pendingPathRef.current = path;

      const xPct = (((_lastClickX || window.innerWidth / 2) / window.innerWidth) * 100).toFixed(2) + "%";
      const yPx = _lastClickY || window.innerHeight / 2;
      setOrigin({ xPct, yPx });
      setPhase("zoom-out");
    },
    [navigate]
  );

  const onWrapperAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      const p = phaseRef.current;
      if (p === "zoom-out") {
        const target = pendingPathRef.current;
        if (target) {
          requestAnimationFrame(() => {
            navigate(target);
            window.scrollTo(0, 0);
            requestAnimationFrame(() => setPhase("zoom-in"));
          });
        }
        return;
      }
      if (p === "zoom-in") {
        setPhase("idle");
        setOrigin(null);
        pendingPathRef.current = null;
        isTransitioning.current = false;
        wrapperRef.current?.style.removeProperty("will-change");
      }
    },
    [navigate]
  );

  useEffect(() => {
    _triggerTransition = triggerTransition;
    _directNavigate = navigate;
    return () => {
      _triggerTransition = null;
      _directNavigate = null;
    };
  }, [triggerTransition, navigate]);

  useEffect(() => {
    if (phase === "idle" || phase === "zoom-in") {
      setDisplayChildren(children);
    }
  }, [children, phase]);

  const transformOrigin = origin ? `${origin.xPct} ${origin.yPx}px` : "50% 42vh";

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
        animation: `ptExit ${EXIT_MS}ms ${EXIT_EASE} both`,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 10000,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      };
    }

    if (phase === "zoom-in") {
      return {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        transformOrigin,
        willChange: "transform, opacity",
        animation: `ptEnter ${ENTER_MS}ms ${ENTER_EASE} both`,
        pointerEvents: "none",
        userSelect: "none",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
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
        @keyframes ptExit {
          from {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
          }
          to {
            transform: translate3d(0, -${EXIT_Y}px, 0) scale(${EXIT_SCALE});
            opacity: 0;
          }
        }
        @keyframes ptEnter {
          from {
            transform: translate3d(0, ${ENTER_Y}px, 0) scale(${ENTER_SCALE_FROM});
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes ptExit {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes ptEnter {
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
            /* أثناء zoom-in الشاشة شفافة — لا تمنع النقرات على الشريط السفلي/التنقل */
            pointerEvents: phase === "zoom-out" ? "auto" : "none",
            opacity: phase === "zoom-out" ? 1 : 0,
            transition:
              phase === "zoom-out"
                ? `opacity ${Math.round(EXIT_MS * 0.45)}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : `opacity ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            willChange: phase === "zoom-out" ? "opacity" : "auto",
          }}
        />
      )}
      <div
        ref={wrapperRef}
        style={getWrapperStyle()}
        onAnimationEnd={onWrapperAnimationEnd}
      >
        {displayChildren}
      </div>
    </>
  );
}
