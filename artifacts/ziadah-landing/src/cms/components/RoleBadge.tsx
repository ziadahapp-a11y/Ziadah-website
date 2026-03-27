import { cn } from "@/lib/utils";
import type { CmsRole } from "../api";

const styles: Record<CmsRole, string> = {
  super_admin: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
  editor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  viewer: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

const labels: Record<CmsRole, string> = {
  super_admin: "Super admin",
  editor: "Editor",
  viewer: "Viewer",
};

export function RoleBadge({ role }: { role: CmsRole }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        styles[role],
      )}
    >
      {labels[role]}
    </span>
  );
}
