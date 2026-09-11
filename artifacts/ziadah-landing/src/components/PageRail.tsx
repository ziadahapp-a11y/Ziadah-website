import { Shell } from "@/components/mk";
import { useLanguage } from "@/i18n/LanguageContext";
import { getMotionRuntime, scrollToTarget } from "@/motion/runtime";
import { getAnchorScrollTopOffset } from "@/utils/anchorScroll";

export type RailItem = { id: string; ar: string; en: string };

/**
 * The on-this-page rail: a long page's own contents, sticky under the header.
 *
 * Three pages had grown their own copy of this — the use-case playbook and
 * both of `SectorDetail`'s two layouts — each with its own `top: 0`, its own
 * chip styling and its own `scrollIntoView`. They differed in ways nobody
 * chose.
 *
 * Two things it fixes as well as sharing. The offset is
 * `--header-dynamic-height`, so the rail sits under the header rather than
 * behind it and re-seats itself if an announcement bar is ever added. And the
 * jump goes through the motion runtime, so it does not fight Lenis the way a
 * bare `scrollIntoView({ behavior: "smooth" })` does.
 */
export function PageRail({ items, className }: { items: RailItem[]; className?: string }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    scrollToTarget(getMotionRuntime(), el, -getAnchorScrollTopOffset());
  };

  if (items.length === 0) return null;

  return (
    <nav className={`uc-rail${className ? ` ${className}` : ""}`} aria-label={isAr ? "أقسام هذه الصفحة" : "Sections on this page"}>
      <Shell className="uc-rail-inner">
        {items.map((item) => (
          <button key={item.id} type="button" className="uc-rail-link" onClick={() => jump(item.id)}>
            {isAr ? item.ar : item.en}
          </button>
        ))}
      </Shell>
    </nav>
  );
}

/**
 * Read progress for a long page. Its own element rather than a section
 * property: it reports the whole document, not the band it sits in.
 */
export function PageProgress({ value }: { value: number }) {
  return (
    <div
      className="uc-progress"
      style={{ transform: `scaleX(${Math.min(100, Math.max(0, value)) / 100})` }}
      aria-hidden="true"
    />
  );
}
