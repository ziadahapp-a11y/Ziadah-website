import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base — physical micro-interaction, OpenType features, accessible focus
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg",
    "text-sm font-medium leading-none",
    "font-feature-settings-['cv01','ss03']",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // Physical press feedback
    "active:scale-[0.97] active:translate-y-px",
    "select-none cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — indigo brand fill
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "hover:brightness-110 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08)]",
        ].join(" "),

        // Destructive
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[0_1px_3px_rgba(0,0,0,0.12)]",
          "hover:brightness-110 hover:-translate-y-px",
        ].join(" "),

        // Outline — translucent border, ghost fill
        outline: [
          "border bg-transparent text-foreground",
          "[border-color:var(--button-outline)]",
          "hover:bg-[var(--elevate-1)] hover:-translate-y-px",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        ].join(" "),

        // Secondary — muted surface
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-[var(--button-outline)]",
          "hover:bg-muted hover:-translate-y-px",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        ].join(" "),

        // Ghost — no background, just hover
        ghost: [
          "bg-transparent text-foreground",
          "border border-transparent",
          "hover:bg-[var(--elevate-1)] hover:border-[var(--button-outline)]",
        ].join(" "),

        // Link — inline anchor style
        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:text-primary",
          "p-0 h-auto",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 px-3 py-1.5 text-xs rounded-md",
        lg:      "h-11 px-6 py-2.5 text-base rounded-xl",
        xl:      "h-12 px-8 py-3 text-base rounded-xl",
        icon:    "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
