import { useLanguage } from "@/i18n/LanguageContext";

/**
 * Bilingual value picker.
 *
 * This is the reference's own hook, at the reference's own path, so the ported
 * home-page components keep their import lines verbatim and a future sync
 * stays a diff. It is a thin read of Ziadah's `LanguageContext` - the single
 * source of the active language - and not a second language store.
 *
 * The same helper existed as `useT` inside `@/components/trackflow`, bundled
 * with that module's legacy band and card primitives. Importing a translation
 * helper should not drag a design system in with it, so it lives here.
 */
export type Bi<T> = { ar: T; en: T };

export function useT() {
  const { lang } = useLanguage();
  return function t<T>(values: Bi<T>): T {
    return values[lang];
  };
}
