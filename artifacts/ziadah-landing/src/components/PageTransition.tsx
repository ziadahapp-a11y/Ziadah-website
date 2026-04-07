import { useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { scrollToHashElement } from "@/utils/anchorScroll";

const NAV_GUARD_MS = 180;
const HASH_POLL_BUFFER_MS = 120;

let _triggerTransition: ((path: string) => void) | null = null;
/** تنقّل مباشر من الراوتر — يُستخدم عندما لا يكون انتقال الصفحة جاهزاً أو أثناء انتقال عالق */
let _directNavigate: ((path: string) => void) | null = null;

/** يبدأ تحميل شُرَح الصفحة مبكراً أثناء خروج الصفحة الحالية (يقلّل وميض Suspense) */
const ROUTE_PRELOADS: Record<string, () => Promise<unknown>> = {
  "/": () => import("@/pages/Landing"),
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
  "/use-cases/by-pages": () => import("@/pages/use-cases/UseCasesByPages"),
  "/use-cases/by-activity": () => import("@/pages/use-cases/UseCasesByActivity"),
  "/use-cases/by-presentation": () => import("@/pages/use-cases/UseCasesByPresentation"),
  "/use-cases/by-goal": () => import("@/pages/use-cases/UseCasesByGoal"),
  "/use-cases/by-experience": () => import("@/pages/use-cases/UseCasesByExperience"),
  "/sectors": () => import("@/pages/Sectors"),
};

function preloadRoute(path: string) {
  const raw = path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
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
  } else if (typeof window !== "undefined") {
    const rawBase = import.meta.env.BASE_URL || "/";
    const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    window.location.assign(`${base}${normalized}`);
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
  setTimeout(poll, NAV_GUARD_MS + HASH_POLL_BUFFER_MS);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [loc, navigate] = useLocation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const prevLoc = useRef(loc);

  const triggerTransition = useCallback(
    (path: string) => {
      preloadRoute(path);
      navigate(path);
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
    if (loc === prevLoc.current) return;
    prevLoc.current = loc;
    const el = wrapRef.current;
    if (!el) return;
    el.classList.remove("page-transition-in");
    void el.offsetWidth;
    el.classList.add("page-transition-in");
  }, [loc]);

  return (
    <div ref={wrapRef} className="page-transition-wrap page-transition-in">
      {children}
    </div>
  );
}
