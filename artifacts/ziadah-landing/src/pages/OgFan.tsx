import { Helmet } from "react-helmet-async";
import { DEFAULT_PACK, packForSector } from "@/data/sectorProductPacks";
import { StorefrontWidget, WIDGET_KINDS, widgetKindHref, type WidgetKind } from "@/components/widgets/storefrontSets";

/**
 * THREE REAL WIDGET SHEETS, FANNED, ON A TRANSPARENT PAGE.
 *
 * The preview card of every page has a widget on it, the way the home page's
 * hero does: the prerender opens this route, photographs `#og-fan` with a
 * transparent background, and sets the picture on the card. The sheets are the
 * real `StorefrontWidget`, with the page's own sector shelf when it has one,
 * and the centre sheet is the shape the page is about when it is about one.
 *
 *   /__og-fan?path=/use-cases/addons       centre = the shape that page explains
 *   /__og-fan?path=/sectors/clinics        the clinics shelf, centre = related
 *   /__og-fan                              the default shelf, centre = related
 *
 * Not linked, not in the sitemap, kept out of indexes.
 */
const SIDES: WidgetKind[] = ["drawer", "quantity", "kit", "related"];

export default function OgFan() {
  const q = new URLSearchParams(window.location.search);
  const path = (q.get("path") ?? "").replace(/^\/en(?=\/|$)/, "");
  const sector = /^\/sectors\/([^/]+)$/.exec(path)?.[1];
  const pack = sector ? packForSector(sector) : DEFAULT_PACK;
  const centre: WidgetKind = WIDGET_KINDS.find((k) => widgetKindHref(k) === path) ?? "related";
  const [a, b] = SIDES.filter((k) => k !== centre);

  const sheet = (kind: WidgetKind, style: React.CSSProperties) => (
    <div style={{ position: "absolute", width: 340, ...style }}>
      <StorefrontWidget kind={kind} pack={pack} />
    </div>
  );

  return (
    <>
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <style>{`
        .site-header, .site-footer, footer, [data-header] { display: none !important; }
        html, body { background: transparent !important; overflow: hidden; }
      `}</style>
      <div id="og-fan" data-ready="" style={{ position: "fixed", left: 0, top: 0, width: 900, height: 900 }}>
        {sheet(a, { left: 70, top: 120, transform: "rotate(-10deg) scale(0.92)", transformOrigin: "bottom left", opacity: 0.96 })}
        {sheet(b, { right: 70, top: 120, transform: "rotate(10deg) scale(0.92)", transformOrigin: "bottom right", opacity: 0.96 })}
        {sheet(centre, { left: 280, top: 30, filter: "drop-shadow(0 30px 40px rgba(0,0,0,.35))" })}
      </div>
    </>
  );
}
