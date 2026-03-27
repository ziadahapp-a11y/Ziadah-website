import { Link } from "wouter";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useCmsAuth } from "@/cms/CmsAuthContext";
import { useCmsEditor } from "@/cms/CmsEditorContext";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";

function getPageName(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/cms/")) {
    const segment = pathname.replace("/cms/", "").split("/")[0] ?? "";
    if (!segment) return "CMS";
    return segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  return firstSegment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function CmsInlineToolbar() {
  const { user, logout, loading } = useCmsAuth();
  const { editMode, toggleEditMode } = useCmsEditor();
  const [loc, navigate] = useLangAwareLocation();

  if (
    loading ||
    !user ||
    (user.role !== "editor" && user.role !== "super_admin")
  ) {
    return null;
  }

  const pageName = getPageName(loc);
  const isSuperAdmin = user.role === "super_admin";

  return (
    <div className="pointer-events-auto fixed inset-x-0 top-0 z-[100060] h-12 border-b border-violet-200/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 dark:border-violet-900/60 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-full max-w-[1600px] items-center gap-3 px-3 md:px-4">
        <div className="min-w-0 flex-1 text-sm font-medium text-neutral-800 dark:text-neutral-100">
          <span className="font-semibold text-violet-700 dark:text-violet-400">Ziadah CMS</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="truncate text-neutral-600 dark:text-neutral-300">{pageName}</span>
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-transparent bg-transparent text-left text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
            onClick={() => toggleEditMode()}
          >
            Edit Mode {editMode ? "ON" : "OFF"}
          </button>
          <Switch
            checked={editMode}
            onCheckedChange={(next) => {
              if (next !== editMode) toggleEditMode();
            }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <Link href="/cms/media">Media Library</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <Link href="/cms/pages">Pages</Link>
          </Button>
          {isSuperAdmin && (
            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Link href="/cms/users">Users</Link>
            </Button>
          )}
          {isSuperAdmin && (
            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Link href="/cms/audit">Audit</Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <Link href="/cms/settings">Settings</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

