import { useBrowserLocation } from "wouter/use-browser-location";
import { useLanguage } from "@/i18n/LanguageContext";

export function stripEnPrefix(path: string) {
  const qIndex = path.indexOf("?");
  const hIndex = path.indexOf("#");
  const cutIndex =
    [qIndex, hIndex].filter((v) => v >= 0).sort((a, b) => a - b)[0] ??
    path.length;
  const pathname = path.slice(0, cutIndex);
  const suffix = path.slice(cutIndex);

  if (pathname === "/en") return `/${suffix}`;
  if (pathname.startsWith("/en/")) return `${pathname.slice(3)}${suffix}`;
  return path;
}

export function useLangAwareLocation() {
  const [location, navigate] = useBrowserLocation();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const normalizedLocation = stripEnPrefix(location);

  const langAwareNavigate = (to: string, options?: { replace?: boolean }) => {
    const plainTarget = stripEnPrefix(to);
    const nextPath = isEn
      ? plainTarget === "/"
        ? "/en"
        : `/en${plainTarget}`
      : plainTarget;
    navigate(nextPath, options);
  };

  return [normalizedLocation, langAwareNavigate] as const;
}
