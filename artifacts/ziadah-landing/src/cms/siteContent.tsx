import { type ReactNode } from "react";
import { t as staticSiteTranslations } from "@/i18n/translations";

/**
 * Static site content layer.
 *
 * The CMS (admin, auth, inline editing, and the `/api/content` fetch) has been
 * removed — the marketing site now ships entirely static copy from
 * `@/i18n/translations`. These exports keep the original signatures so existing
 * consumers compile unchanged; they simply always resolve to the static defaults.
 */

export function SiteContentProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/** Full translation tree (same shape as static `t`). */
export function useSiteT(): typeof staticSiteTranslations {
  return staticSiteTranslations;
}

/** Flat CMS map — always empty now, so callers fall back to static content. */
export function useSiteContentMap(): Record<string, string> {
  return {};
}

/** Single string by flat key — always returns the static fallback. */
export function useCMSContent(_key: string, fallback: string): string {
  return fallback;
}

/** Content mutations are no-ops without a CMS. */
export function useSiteContentMutations(): {
  patchSiteContent: (updates: Record<string, string>) => void;
  removeSiteContentKeys: (keys: string[]) => void;
} {
  return {
    patchSiteContent: () => {},
    removeSiteContentKeys: () => {},
  };
}
