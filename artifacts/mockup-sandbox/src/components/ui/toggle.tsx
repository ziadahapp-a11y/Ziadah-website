import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-lg",
    "text-sm font-medium tracking-[-0.006em]",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-40",
    "data-[state=on]:bg-primary/15 data-[state=on]:text-primary",
    "data-[state=on]:shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted/70 hover:text-foreground",
        ].join(" "),
        outline: [
          "border border-[rgba(127,127,127,0.18)] bg-transparent",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
          "hover:bg-muted/70 hover:text-foreground",
        ].join(" "),
      },
      size: {
        default: "h-9 px-3 min-w-9",
        sm:      "h-8 px-2 min-w-8 text-xs",
        lg:      "h-10 px-3.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
