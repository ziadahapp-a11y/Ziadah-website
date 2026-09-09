/**
 * Drops a leading emoji from a line of demo copy.
 *
 * The sector and use-case data writes its examples as
 * "🍕 مطعم: عميل اشترى برغر → يُقترح …" - a category marker in front of a
 * sentence that names the category in its first word. It repeats what the
 * words say and it is the one visual tell the storefront previews were just
 * cleaned of, so it is dropped at RENDER rather than edited out of the
 * twenty-three data files that carry it.
 */
export function stripLeadIcon(text: string): string {
  return text.replace(/^\s*\p{Extended_Pictographic}[\uFE0F\u200D]*\s*/u, "");
}
