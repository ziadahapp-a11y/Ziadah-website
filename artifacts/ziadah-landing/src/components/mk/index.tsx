import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =====================================================================
   Design-system primitives.

   Thin wrappers over the class contract in `styles/system.css` — the styling
   lives in CSS, these components only guarantee the *anatomy* that CSS needs
   (the two-layer button label, the container, the section head).
   ===================================================================== */

export type BtnVariant = "primary" | "secondary" | "tertiary" | "invert";
export type BtnSize = "small" | "sm" | "base" | "lg" | "xl" | "icon";

/** Names carried over from the previous system, mapped onto the four real
 *  variants so existing call sites keep their intent. `ink` was the solid
 *  dark button, `outline`/`ghost` the two quiet ones. */
const VARIANT_ALIAS: Record<string, BtnVariant> = {
  primary: "primary",
  ink: "secondary",
  secondary: "secondary",
  outline: "tertiary",
  ghost: "tertiary",
  tertiary: "tertiary",
  invert: "invert",
};

/**
 * The CLASS each variant emits, which is not always the variant's own name.
 *
 * `invert` collides with Tailwind's `invert` filter utility, and a utility
 * always beats the components layer — so `.button.invert` was painted through
 * `filter: invert(1)`: the deep violet ground came out lime and the white
 * label came out black. The variant keeps its name in the API; only the class
 * changes, to match the `is-*` convention the same stylesheet already uses for
 * sizes.
 */
const VARIANT_CLASS: Record<BtnVariant, string> = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  invert: "is-invert",
};

/**
 * The button's class contract. Height is explicit (4.2rem, 5.6rem large), the
 * variant sets four custom properties and nothing else, and every hover state
 * lives behind `@media (hover: hover)` in CSS.
 *
 * Prefer `<Button>` below, which also emits the two-layer label. This helper
 * remains for the cases where the class string has to be handed to a
 * third-party component (Radix triggers, `asChild` slots).
 */
export function mkBtn(
  variant: BtnVariant | "ink" | "outline" | "ghost" = "primary",
  size: BtnSize = "base",
  extra?: string,
): string {
  return cn(
    "button",
    VARIANT_CLASS[VARIANT_ALIAS[variant] ?? "primary"],
    size === "lg" && "is-large",
    size === "xl" && "is-xl",
    (size === "sm" || size === "small") && "is-small",
    size === "icon" && "is-icon",
    extra,
  );
}

/**
 * The button, with the measured anatomy: the resting label and a duplicate
 * that waits one line below and rises as the first leaves. The duplicate is
 * `aria-hidden` — screen readers and the accessible name see one label.
 */
/* A button may render as `<a>` (an external destination, a mail link) or as
   `<button>` (an in-app action). Both attribute sets are accepted; `type` is
   taken from the button side, since the two disagree on it. */
type ButtonElementProps = Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "type"> &
  Omit<
    ComponentPropsWithoutRef<"a">,
    "children" | "className" | "type" | keyof ComponentPropsWithoutRef<"button">
  > & { type?: "button" | "submit" | "reset" };

export function Button({
  as,
  variant = "primary",
  size = "base",
  block,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  variant?: BtnVariant | "ink" | "outline" | "ghost";
  size?: BtnSize;
  block?: boolean;
  className?: string;
  children?: ReactNode;
} & ButtonElementProps) {
  const Tag = (as || "button") as ElementType;
  return (
    <Tag
      className={mkBtn(variant, size, cn(block && "is-block", className))}
      {...(Tag === "button" ? { type: rest.type ?? "button" } : null)}
      {...rest}
    >
      {/* MEASURED anatomy: the holder is the clipping box that owns the
          control's height; inside it the resting label translates out while a
          duplicate rises from below. The duplicate is aria-hidden, so the
          accessible name stays single. */}
      <span className="button-holder">
        <span className="button-label">
          <span className="button-text">{children}</span>
        </span>
        <span className="button-hover-label" aria-hidden="true">
          <span className="button-text">{children}</span>
        </span>
      </span>
    </Tag>
  );
}

/**
 * The content container. The gutter is taken out of `width` rather than
 * applied as padding, so a child with its own background paints edge to edge
 * inside the content box instead of under a transparent gutter.
 */
export function Shell({
  as,
  width,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  width?: "narrow" | "wide";
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">) {
  const Tag = (as || "div") as ElementType;
  return (
    <Tag
      className={cn("container", width === "narrow" && "container--narrow", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** A "LIVE" / "SOON" status pill, used in the menu, mobile nav and grids. */
export function Pill({ tone, children }: { tone: "live" | "soon"; children: ReactNode }) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}
