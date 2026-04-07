/** مسارات `public/platform/` مع احترام BASE_URL (نفس المنطق في Nav / Footer / PlatformModal) */
export function platformAsset(path: string) {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  return `${base}${path.replace(/^\//, "")}`;
}

export function platformZidLogoSrc(_theme?: "dark" | "light") {
  return platformAsset("platform/zid-logo-dark.png");
}

export function platformSallaLogoSrc(_theme?: "dark" | "light") {
  return platformAsset("platform/salla-logo-dark.png");
}
