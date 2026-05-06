import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";
import { buildWidgetShowcaseItems } from "@/components/WidgetShowcaseCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteT } from "@/cms/siteContent";

const HERO_WIDGET_BREAKPOINT = "(max-width: 960px)";
const AUTO_INTERVAL_MS = 5500;
const RESUME_AFTER_INTERACTION_MS = 3200;
const SWIPE_THRESHOLD_PX = 42;

type ShowcaseSlice = { widget: ReactNode };

function useHeroWidgetCarouselLayout() {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(HERO_WIDGET_BREAKPOINT);
    const apply = () => setIsNarrow(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  return isNarrow;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  return reduced;
}

/**
 * الهيرو: معاينة عروض الكميات أولاً (عرض الودجت فقط، بدون بطاقة الزجاج)، ثم «الشراء معاً» بدون إطار البطاقة.
 * على الشاشات الضيقة: كاروسيل تلقائي مع نقاط تنقّل ودعم السحب.
 */
export default function HeroUseCaseCarousel() {
  const { lang } = useLanguage();
  const t = useSiteT();
  const tr = t[lang];
  const wLabels = tr.landing.widgetLabels as { label: string; desc: string }[];

  const isNarrow = useHeroWidgetCarouselLayout();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { bundle, volume } = useMemo(() => {
    const all = buildWidgetShowcaseItems(wLabels);
    const byKind = new Map(all.map((item) => [item.kind, item]));
    return {
      bundle: byKind.get("bundle") as ShowcaseSlice | undefined,
      volume: byKind.get("volume") as ShowcaseSlice | undefined,
    };
  }, [wLabels]);

  const slides = useMemo(() => [volume, bundle].filter(Boolean) as ShowcaseSlice[], [volume, bundle]);

  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const interactionResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [interactionHold, setInteractionHold] = useState(false);

  const carouselActive =
    isNarrow && slides.length > 1 && !prefersReducedMotion;

  useEffect(() => {
    setActiveIndex((i) => (slides.length ? Math.min(i, slides.length - 1) : 0));
  }, [slides.length]);

  const clearResumeTimer = useCallback(() => {
    if (interactionResumeTimer.current) {
      clearTimeout(interactionResumeTimer.current);
      interactionResumeTimer.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    interactionResumeTimer.current = setTimeout(() => {
      setInteractionHold(false);
      interactionResumeTimer.current = null;
    }, RESUME_AFTER_INTERACTION_MS);
  }, [clearResumeTimer]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  useEffect(() => {
    if (!carouselActive || interactionHold || slides.length < 2) return;

    const tick = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      setActiveIndex((i) => (i + 1) % slides.length);
    };

    const id = window.setInterval(tick, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [carouselActive, interactionHold, slides.length]);

  const stackStyle = {
    width: "100%" as const,
    alignSelf: "stretch" as const,
    display: "flex" as const,
    flexDirection: "column" as const,
  };

  const regionLabel =
    lang === "ar" ? "معاينة عروض المتجر" : "Store promotion previews";

  const go = useCallback(
    (delta: number) => {
      setInteractionHold(true);
      scheduleResume();
      setActiveIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length, scheduleResume],
  );

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      const start = touchStartX.current;
      touchStartX.current = null;
      if (start == null || slides.length < 2) return;
      const end = e.changedTouches[0]?.clientX;
      if (end == null) return;
      const dx = end - start;
      if (dx > SWIPE_THRESHOLD_PX) go(-1);
      else if (dx < -SWIPE_THRESHOLD_PX) go(1);
    },
    [go, slides.length],
  );

  const onPointerDown = useCallback(() => {
    setInteractionHold(true);
    clearResumeTimer();
  }, [clearResumeTimer]);

  const onPointerUp = useCallback(() => {
    scheduleResume();
  }, [scheduleResume]);

  const dotLabel = (idx: number) =>
    lang === "ar" ? `انتقل إلى الشريحة ${idx + 1}` : `Go to slide ${idx + 1}`;

  if (slides.length === 0) return null;

  if (!carouselActive) {
    return (
      <div
        className={`hero-static-widgets${
          isNarrow && slides.length > 1 && prefersReducedMotion ? " hero-static-widgets--stack-mobile" : ""
        }`}
        aria-hidden={isNarrow ? undefined : true}
        dir="ltr"
      >
        {volume ? (
          <div style={stackStyle}>{volume.widget}</div>
        ) : null}
        {bundle ? (
          <div style={stackStyle}>{bundle.widget}</div>
        ) : null}
      </div>
    );
  }

  const pctPerSlide = slides.length > 0 ? 100 / slides.length : 100;
  const trackStyle =
    slides.length > 0
      ? {
          width: `${slides.length * 100}%`,
          transform: `translateX(-${activeIndex * pctPerSlide}%)`,
        }
      : undefined;

  return (
    <div
      className="hero-static-widgets hero-static-widgets--carousel-mobile"
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      dir="ltr"
    >
      <div
        className="hero-static-widgets__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="hero-static-widgets__track" style={trackStyle}>
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="hero-static-widgets__slide"
              style={{ width: `${pctPerSlide}%` }}
              aria-hidden={idx !== activeIndex}
            >
              <div style={stackStyle}>{slide.widget}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-static-widgets__dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-pressed={idx === activeIndex}
            className={`hero-static-widgets__dot${idx === activeIndex ? " is-active" : ""}`}
            aria-label={dotLabel(idx)}
            onClick={() => {
              setInteractionHold(true);
              scheduleResume();
              setActiveIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}
