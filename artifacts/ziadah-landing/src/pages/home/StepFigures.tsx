import { type ReactNode } from "react";
import { useT } from "@/lib/i18n";
import { PLATFORMS } from "@/lib/platforms-data";
import { placements, presentations } from "@/lib/features-data";

/**
 * The four how-it-works step screens: Ziadah's own product UI, drawn in CSS
 * inside the reference's measured figure box. Not screenshots, not gradients.
 *
 * WHAT THIS REPLACES. A single hand-built preview panel that cross-faded four
 * states, painted with fixed zinc and violet hexes and wrapped in a phone
 * chrome of its own - so it could only ever read on the one ground it was
 * authored against, and the four steps beside it were four card buttons in a
 * column. The figures are per-step now and take the section's own pair.
 *
 * Two of the four read from data rather than from a list written here:
 * connectors come from `platforms-data` and placements from `features-data`.
 * A diagram is a claim like any other sentence, and a hand-written one drifts
 * the moment either registry changes.
 */
function Screen({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="stepfig">
      <p className="stepfig-title">{title}</p>
      {children}
    </div>
  );
}

export function useStepFigures(): ReactNode[] {
  const t = useT();

  const connect = (
    <Screen title={t({ ar: "ربط المتجر", en: "Store connection" })}>
      <ul className="stepfig-rows">
        {PLATFORMS.map((p) => ({
          k: p.slug,
          label: t(p.name),
          state:
            p.status === "connected"
              ? t({ ar: "متصل", en: "Connected" })
              : t({ ar: "قيد التطوير", en: "In development" }),
          live: p.status === "connected",
        })).map((r) => (
          <li key={r.k} className="stepfig-row">
            <span className={`stepfig-dot${r.live ? " is-live" : ""}`} aria-hidden="true" />
            <span className="stepfig-row-label">{r.label}</span>
            <span className={`stepfig-state${r.live ? " is-live" : ""}`}>{r.state}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );

  /* The placements a merchant switches on, straight out of the registry, so
     this screen cannot offer one `/features` does not publish. */
  const pick = (
    <Screen title={t({ ar: "أماكن العرض", en: "Placements" })}>
      <ul className="stepfig-grid">
        {placements.slice(0, 6).map((p, i) => (
          <li key={p.slug} className="stepfig-tile">
            <span className="stepfig-tile-label">{t({ ar: p.title, en: p.titleEn })}</span>
            <span className={`stepfig-switch${i < 4 ? " is-on" : ""}`} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </Screen>
  );

  /* What the engine chose to show, and how often. The presentations are the
     registry's own five, so the ways of showing a suggestion here are the
     ways the site documents. */
  const learn = (
    <Screen title={t({ ar: "ما يختاره المحرك", en: "What the engine picks" })}>
      <ul className="stepfig-rows">
        {presentations.slice(0, 4).map((p, i) => (
          <li key={p.slug} className="stepfig-row">
            <span className="stepfig-dot is-live" aria-hidden="true" />
            <span className="stepfig-row-label">{t({ ar: p.title, en: p.titleEn })}</span>
            <span className="stepfig-state num-ltr">{["34%", "28%", "21%", "17%"][i]}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );

  const measure = (
    <Screen title={t({ ar: "النتائج", en: "Results" })}>
      <div className="stepfig-stats">
        <div className="stepfig-stat">
          <span className="stepfig-stat-label">{t({ ar: "متوسط قيمة الطلب", en: "Average order value" })}</span>
          <span className="stepfig-stat-num num-ltr">+35%</span>
        </div>
        <div className="stepfig-stat">
          <span className="stepfig-stat-label">{t({ ar: "سلال فيها إضافة", en: "Carts with an add-on" })}</span>
          <span className="stepfig-stat-num num-ltr">34%</span>
        </div>
      </div>
      <div className="stepfig-chart" aria-hidden="true">
        {[34, 46, 41, 63, 70, 88].map((h, i) => (
          <span key={i} className="stepfig-bar" style={{ height: `${h}%` }} />
        ))}
      </div>
    </Screen>
  );

  return [connect, pick, learn, measure];
}
