import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-md",
    "px-2 py-0.5",
    "text-xs font-medium leading-none",
    "tracking-[-0.006em]",
    "transition-colors duration-150",
    "border",
    "select-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground border-transparent",
          "shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
        ].join(" "),

        secondary: [
          "bg-secondary text-secondary-foreground",
          "border-[rgba(127,127,127,0.12)]",
        ].join(" "),

        destructive: [
          "bg-destructive text-destructive-foreground border-transparent",
          "shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
        ].join(" "),

        outline: [
          "bg-transparent text-foreground",
          "border-[var(--badge-outline)]",
        ].join(" "),

        // Pill — full-radius, filter-chip style
        pill: [
          "rounded-full px-2.5 py-1",
          "bg-transparent text-muted-foreground",
          "border-[rgba(127,127,127,0.18)]",
          "hover:bg-muted hover:text-foreground",
          "cursor-pointer transition-all duration-150",
        ].join(" "),

        // Success
        success: [
          "bg-[hsl(142_60%_52%)] text-white border-transparent",
          "shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
