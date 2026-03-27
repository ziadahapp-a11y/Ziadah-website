/** Flat `content_blocks` keys always start with `ar.` or `en.` */
export function cmsKey(lang: "ar" | "en", ...parts: string[]): string {
  return [lang, ...parts].join(".");
}
