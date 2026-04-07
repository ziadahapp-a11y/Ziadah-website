import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg px-3 py-2.5",
        "text-sm text-foreground placeholder:text-muted-foreground/70",
        "tracking-[-0.006em] leading-relaxed",
        "bg-transparent",
        "border border-[rgba(127,127,127,0.18)]",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(0,0,0,0.03)]",
        "transition-all duration-150 ease-out",
        "resize-y",
        "focus-visible:outline-none",
        "focus-visible:border-primary/60",
        "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
        "focus-visible:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
