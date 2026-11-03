import { activeLocale, tr } from "../catalog";

const ATTRS = ["alt", "title", "aria-label", "placeholder", "aria-description", "aria-roledescription", "aria-placeholder"] as const;
const SKIP = new Set(["script", "style"]);

/**
 * Translate the strings a host element is about to render: its text children
 * and the handful of attributes read aloud or shown on hover. Components are
 * left alone; whatever text they render goes through here when it reaches a
 * host element, so one place covers the whole tree.
 */
export function translateProps(type: unknown, props: Record<string, unknown> | null): Record<string, unknown> | null {
  const locale = activeLocale();
  if (locale === "ar" || typeof type !== "string" || SKIP.has(type) || !props) return props;
  let out: Record<string, unknown> | null = null;
  const children = props.children;
  if (typeof children === "string") {
    const t = tr(children, locale);
    if (t !== children) { out = { ...props, children: t }; }
  } else if (Array.isArray(children) && children.some((c) => typeof c === "string")) {
    out = { ...props, children: children.map((c) => (typeof c === "string" ? tr(c, locale) : c)) };
  }
  for (const a of ATTRS) {
    const v = props[a];
    if (typeof v === "string") {
      const t = tr(v, locale);
      if (t !== v) { out = out ?? { ...props }; out[a] = t; }
    }
  }
  return out ?? props;
}
