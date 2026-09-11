import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { analytics, installOutboundTracking } from "@/lib/analytics";

/**
 * Site-wide analytics wiring, mounted once inside the router. It does two
 * things and nothing else:
 *   1. fires `page_view` on every route change (referrer = the previous route,
 *      or document.referrer on the first view);
 *   2. installs the single delegated `outbound_click` listener.
 * Both go through the no-op transport, so this is silent in production.
 */
export function Analytics() {
  const [location] = useLocation(); // language-stripped logical route
  const prev = useRef<string | null>(null);

  useEffect(() => installOutboundTracking(), []);

  useEffect(() => {
    const referrer = prev.current ?? (document.referrer || undefined);
    analytics.pageView(referrer);
    prev.current = location;
  }, [location]);

  return null;
}
