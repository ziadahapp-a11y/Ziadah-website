// Analytics event layer — SHA-06.
//
// A single, typed source of truth for product analytics, plus a swappable
// transport. The transport is currently a NO-OP: it logs to the console in
// development and does absolutely nothing in production (no network request,
// no console noise, no provider SDK, no credentials). Wiring a real provider
// is a one-file change — see docs/analytics.md and `setAnalyticsTransport`.
//
// GOVERNANCE:
//  §5  This schema is HOLDING-level. Shaa, Raasid, and Aakam emit into the
//      exact same shape — only `BRAND` differs. `tool_start` /
//      `tool_complete` cover this site's calculator; they are typed here but
//      not fired yet.
//  §9  The provider is an open decision (open-decisions SHA06-01). This layer
//      chooses nothing — it only defines the shape a provider will receive.
//  §11 The no-op transport is genuinely silent in production.
//  §12 PDPL: event payloads carry NO personal data. No email, no name, no IP,
//      no user identifier. Only the coarse fields typed below. See the event
//      types — there is nowhere to put personal data by construction.

export type Brand = "shaaa" | "ziadah" | "raasid" | "aakam";
export type Locale = "ar" | "en";

/** This site's brand. Each holding site sets its own; the schema is shared. */
export const BRAND: Brand = "ziadah";

// Every event carries this context. It is filled automatically by `track()`
// from the current document — callers never pass it.
export interface EventContext {
  brand: Brand;
  route: string; // logical route, language prefix stripped (e.g. "/blog/x")
  locale: Locale;
}

// ---- Event catalogue -------------------------------------------------------
// Each entry is the event name + the fields specific to it. The context fields
// (brand/route/locale) are added by `track()` and are NOT repeated here.

interface EventMap {
  page_view: { referrer?: string };
  cta_click: { cta_id: string; destination: string };
  outbound_click: { destination: string };
  form_start: { form_id: string };
  form_submit: { form_id: string; outcome: "success" | "error" | "invalid" };
  language_switch: { from: Locale; to: Locale };
  nav_interaction: { item: string; level: string };
  content_engagement: { content_type: string; content_id: string };

  // For this site's calculator (GOVERNANCE §5). Typed now so the schema does
  // not change when it is instrumented; not fired yet.
  tool_start: { tool_id: string };
  tool_complete: { tool_id: string; outcome: "success" | "error" };
}

export type EventName = keyof EventMap;

/** A fully-formed analytics event as the transport receives it. */
export type AnalyticsEvent = {
  [K in EventName]: EventContext & { name: K } & EventMap[K];
}[EventName];

// ---- Transport -------------------------------------------------------------

export type AnalyticsTransport = (event: AnalyticsEvent) => void;

// The default transport. Silent in production; a readable trace in dev so the
// exit criteria ("demonstrated in the development console") can be shown.
const noopTransport: AnalyticsTransport = (event) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event.name, event);
  }
  // production: intentionally nothing.
};

let transport: AnalyticsTransport = noopTransport;

/**
 * Replace the transport. This is the ENTIRE integration surface for a provider:
 * implement one function that forwards `event` to the provider, then call this
 * once at startup. See docs/analytics.md.
 */
export function setAnalyticsTransport(next: AnalyticsTransport): void {
  transport = next;
}

// ---- Context helpers -------------------------------------------------------

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Current logical route: base + /ar|/en prefix stripped, always leading "/". */
function currentRoute(): string {
  if (typeof window === "undefined") return "/";
  let p = window.location.pathname || "/";
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || "/";
  const m = p.match(/^\/(ar|en)(\/.*)?$/);
  return m ? m[2] || "/" : p;
}

/** Current locale, read from the <html lang> the i18n provider maintains. */
function currentLocale(): Locale {
  if (typeof document === "undefined") return "ar";
  return document.documentElement.getAttribute("lang") === "en" ? "en" : "ar";
}

// ---- Public API ------------------------------------------------------------

/**
 * Emit an analytics event. Context (brand/route/locale) is attached here so
 * call sites stay to the point. Prefer the named helpers on `analytics` below.
 */
export function track<K extends EventName>(name: K, fields: EventMap[K]): void {
  const event = {
    name,
    brand: BRAND,
    route: currentRoute(),
    locale: currentLocale(),
    ...fields,
  } as AnalyticsEvent;
  try {
    transport(event);
  } catch {
    // Analytics must never break the page. Swallow transport errors.
  }
}

/** Named helpers — the vocabulary the app instruments against. */
export const analytics = {
  pageView: (referrer?: string) => track("page_view", { referrer }),
  ctaClick: (cta_id: string, destination: string) => track("cta_click", { cta_id, destination }),
  outboundClick: (destination: string) => track("outbound_click", { destination }),
  formStart: (form_id: string) => track("form_start", { form_id }),
  formSubmit: (form_id: string, outcome: EventMap["form_submit"]["outcome"]) =>
    track("form_submit", { form_id, outcome }),
  languageSwitch: (from: Locale, to: Locale) => track("language_switch", { from, to }),
  navInteraction: (item: string, level: string) => track("nav_interaction", { item, level }),
  contentEngagement: (content_type: string, content_id: string) =>
    track("content_engagement", { content_type, content_id }),
};

// ---- Automatic outbound-link tracking --------------------------------------

/** Is this href a destination that leaves the site? */
function isOutbound(href: string): boolean {
  if (/^(mailto:|tel:)/i.test(href)) return true;
  if (/^https?:\/\//i.test(href)) {
    try {
      return new URL(href).host !== window.location.host;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Install a single delegated click listener that fires `outbound_click` for any
 * anchor leaving the site. One listener covers every external link on every
 * route, so external anchors need no per-link wiring. Anchors that carry a
 * `data-cta` attribute are skipped — those are deliberate CTAs and report a
 * richer `cta_click` at their own handler instead. Returns a cleanup function.
 */
export function installOutboundTracking(): () => void {
  const onClick = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    if (a.hasAttribute("data-cta")) return; // counted as cta_click elsewhere
    const href = a.getAttribute("href") || "";
    if (isOutbound(href)) analytics.outboundClick(href);
  };
  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
