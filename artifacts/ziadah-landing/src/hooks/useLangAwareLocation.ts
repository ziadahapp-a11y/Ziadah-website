import { useBrowserLocation } from "wouter/use-browser-location";
import { useLanguage } from "@/i18n/LanguageContext";
import { stripLocalePrefix, withLocalePrefix } from "@/i18n/languages";

/** Path (with its query and hash kept) minus any language prefix. */
export function stripEnPrefix(path: string) {
  const qIndex = path.indexOf("?");
  const hIndex = path.indexOf("#");
  const cutIndex =
    [qIndex, hIndex].filter((v) => v >= 0).sort((a, b) => a - b)[0] ??
    path.length;
  const pathname = path.slice(0, cutIndex);
  const suffix = path.slice(cutIndex);
  return `${stripLocalePrefix(pathname)}${suffix}`;
}

export function useLangAwareLocation(): [
  string,
  (to: string, options?: { replace?: boolean }) => void,
] {
  const [location, navigate] = useBrowserLocation();
  const { locale } = useLanguage();
  const normalizedLocation = stripEnPrefix(location);

  const langAwareNavigate = (to: string, options?: { replace?: boolean }) => {
    const plainTarget = stripEnPrefix(to);
    navigate(withLocalePrefix(plainTarget, locale), options);
  };

  return [normalizedLocation, langAwareNavigate];
}
