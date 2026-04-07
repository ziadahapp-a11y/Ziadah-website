import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full",
        "bg-primary/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]"
      )}
    >
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary shadow-[0_0_4px_hsl(var(--primary)/0.35)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full",
        "bg-white",
        "border-2 border-primary",
        "shadow-[0_1px_4px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.06)]",
        "transition-all duration-150",
        "hover:scale-110 hover:shadow-[0_2px_8px_hsl(var(--primary)/0.3)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-40",
        "cursor-grab active:cursor-grabbing active:scale-95"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
