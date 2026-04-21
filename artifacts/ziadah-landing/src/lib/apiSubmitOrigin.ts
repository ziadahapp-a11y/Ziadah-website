/** Origin for public `/api/submit/*` endpoints (store URL analysis). Aligns with `VITE_API_BASE_URL`. */
export function getApiSubmitOrigin(): string {
  const raw =
    import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "";
  const s = typeof raw === "string" ? raw.trim() : "";
  return s.replace(/\/$/, "");
}
