/** مسارات `public/platform/` مع احترام BASE_URL (نفس المنطق في Nav / Footer / PlatformModal) */
export function platformAsset(path: string) {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  return `${base}${path.replace(/^\//, "")}`;
}

export function platformZidLogoSrc(theme: "dark" | "light") {
  return theme === "light"
    ? platformAsset("platform/zid-logo-light.png")
    : platformAsset("platform/zid-logo-dark.png");
}

export function platformSallaLogoSrc(theme: "dark" | "light") {
  return theme === "light"
    ? platformAsset("platform/salla-logo-light.png")
    : platformAsset("platform/salla-logo-dark.png");
}
