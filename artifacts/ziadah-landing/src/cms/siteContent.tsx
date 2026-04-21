import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { t as staticSiteTranslations } from "@/i18n/translations";
import { applyFlatOverridesToTree } from "@/i18n/mergeStaticWithCms";

function getApiOrigin(): string {
  const raw =
    import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "";
  return typeof raw === "string" ? raw.replace(/\/$/, "") : "";
}

type ApiEnvelope<T> = { success: boolean; data: T; error?: string };

type SiteContentContextValue = {
  /** Flat CMS map; empty if fetch failed or not loaded yet. */
  map: Record<string, string>;
  /** Merged translations (static + CMS overrides for `ar.*` / `en.*` keys only). */
  mergedT: typeof staticSiteTranslations;
  ready: boolean;
  /** Merge keys into the in-memory map (e.g. after a successful CMS save) — updates `useSiteT` / site copy without reload. */
  patchSiteContent: (updates: Record<string, string>) => void;
  /** Remove keys so the site falls back to static defaults for those paths. */
  removeSiteContentKeys: (keys: string[]) => void;
};

function noopPatch(_updates: Record<string, string>) {}

function noopRemove(_keys: string[]) {}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, string> | null>(null);

  const patchSiteContent = useCallback((updates: Record<string, string>) => {
    if (Object.keys(updates).length === 0) return;
    setMap((prev) => ({ ...(prev ?? {}), ...updates }));
  }, []);

  const removeSiteContentKeys = useCallback((keys: string[]) => {
    if (keys.length === 0) return;
    setMap((prev) => {
      const base = { ...(prev ?? {}) };
      for (const k of keys) delete base[k];
      return base;
    });
  }, []);

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
      patchSiteContent,
      removeSiteContentKeys,
    }),
    [map, mergedT, patchSiteContent, removeSiteContentKeys],
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
  const ctx = useContext(SiteContentContext);
  const map = (ctx?.map ?? {}) as Record<string, string>;
  const v = map[key];
  return v !== undefined && v !== "" ? v : fallback;
}

/** Apply successful CMS API saves to the public-site content map (instant React updates). */
export function useSiteContentMutations(): {
  patchSiteContent: (updates: Record<string, string>) => void;
  removeSiteContentKeys: (keys: string[]) => void;
} {
  const ctx = useContext(SiteContentContext);
  return {
    patchSiteContent: ctx?.patchSiteContent ?? noopPatch,
    removeSiteContentKeys: ctx?.removeSiteContentKeys ?? noopRemove,
  };
}
