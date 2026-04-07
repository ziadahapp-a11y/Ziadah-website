import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout & shape
          "flex h-9 w-full rounded-lg px-3 py-1",
          // Typography
          "text-sm text-foreground placeholder:text-muted-foreground/70",
          "tracking-[-0.006em]",
          // Surface
          "bg-transparent",
          "border border-[rgba(127,127,127,0.18)]",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(0,0,0,0.03)]",
          // Transitions
          "transition-all duration-150 ease-out",
          // Focus — on-brand ring
          "focus-visible:outline-none",
          "focus-visible:border-primary/60",
          "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
          "focus-visible:shadow-[0_0_0_3px_hsl(var(--primary)/0.15),inset_0_1px_2px_rgba(0,0,0,0.03)]",
          // States
          "disabled:cursor-not-allowed disabled:opacity-40",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          // MD text size correction
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
