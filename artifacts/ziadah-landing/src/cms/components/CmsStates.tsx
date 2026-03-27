import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function CmsInlineError({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/80 dark:bg-red-950/40 dark:text-red-200",
        className,
      )}
      dir="ltr"
    >
      {message}
    </div>
  );
}

export function CmsEmptyHint({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rounded-xl border border-dashed border-neutral-200 bg-neutral-50/80 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-400",
        className,
      )}
      dir="ltr"
    >
      {children}
    </p>
  );
}

export function CmsLoadingLine({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-sm text-neutral-500", className)} dir="ltr">
      <Skeleton className="h-4 w-4 rounded-full" />
      <span>Loading…</span>
    </div>
  );
}

export function CmsStatCardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-9 w-16" />
    </div>
  );
}
