import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { t as staticSiteTranslations } from "@/i18n/translations";
import { applyFlatOverridesToTree } from "@/i18n/mergeStaticWithCms";

function getApiOrigin(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  return typeof raw === "string" ? raw.replace(/\/$/, "") : "";
}

type ApiEnvelope<T> = { success: boolean; data: T; error?: string };

type SiteContentContextValue = {
  /** Flat CMS map; empty if fetch failed or not loaded yet. */
  map: Record<string, string>;
  /** Merged translations (static + CMS overrides for `ar.*` / `en.*` keys only). */
  mergedT: typeof staticSiteTranslations;
  ready: boolean;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const url = `${getApiOrigin()}/api/content`;
    fetch(url)
      .then((r) => r.json() as Promise<ApiEnvelope<Record<string, string>>>)
      .then((body) => {
        if (cancelled) return;
        if (body.success && body.data && typeof body.data === "object") {
          setMap(body.data);
        } else {
          setMap({});
        }
      })
      .catch(() => {
        if (!cancelled) setMap({});
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mergedT = useMemo(() => {
    if (!map || Object.keys(map).length === 0) {
      return staticSiteTranslations;
    }
    return applyFlatOverridesToTree(staticSiteTranslations, map);
  }, [map]);

  const value = useMemo(
    (): SiteContentContextValue => ({
      map: map ?? {},
      mergedT,
      ready: map !== null,
    }),
    [map, mergedT],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

/** Full translation tree with CMS overrides applied (same shape as static `t`). */
export function useSiteT(): typeof staticSiteTranslations {
  const ctx = useContext(SiteContentContext);
  return ctx?.mergedT ?? staticSiteTranslations;
}

export function useSiteContentMap(): Record<string, string> {
  const ctx = useContext(SiteContentContext);
  return ctx?.map ?? {};
}

/**
 * Single CMS string by flat key (any namespace: `blog.slug.title`, `ar.nav.home`, …).
 * Falls back silently when the API is down or the key is missing.
 */
export function useCMSContent(key: string, fallback: string): string {
  const { map } = useContext(SiteContentContext) ?? { map: {} };
  const v = map[key];
  return v !== undefined && v !== "" ? v : fallback;
}
