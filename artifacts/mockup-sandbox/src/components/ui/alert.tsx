import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  [
    "relative w-full rounded-xl border px-4 py-3.5 text-sm",
    "tracking-[-0.006em]",
    "[&>svg+div]:translate-y-[-2px]",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-[14px] [&>svg]:text-foreground",
    "[&>svg~*]:pl-7",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-card text-foreground",
          "border-[rgba(127,127,127,0.14)]",
          "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
        ].join(" "),
        destructive: [
          "bg-destructive/8 text-destructive",
          "border-destructive/25",
          "[&>svg]:text-destructive",
        ].join(" "),
        success: [
          "bg-[hsl(142_60%_52%/0.08)] text-[hsl(142_50%_35%)]",
          "border-[hsl(142_60%_52%/0.25)]",
          "[&>svg]:text-[hsl(142_60%_40%)]",
        ].join(" "),
        warning: [
          "bg-[hsl(38_95%_55%/0.08)] text-[hsl(32_90%_35%)]",
          "border-[hsl(38_95%_55%/0.25)]",
          "[&>svg]:text-[hsl(38_90%_42%)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-[-0.012em]", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
