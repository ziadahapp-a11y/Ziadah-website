import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  Files,
  ImageIcon,
  Users,
  ScrollText,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCmsAuth } from "../CmsAuthContext";
import { useLangAwareLocation } from "@/hooks/useLangAwareLocation";
import { RoleBadge } from "./RoleBadge";
import type { CmsRole } from "../api";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: CmsRole[] | null;
};

const nav: NavItem[] = [
  { href: "/cms/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: null },
  { href: "/cms/content", label: "Content", icon: FileText, roles: null },
  { href: "/cms/pages", label: "Pages", icon: Files, roles: null },
  { href: "/cms/media", label: "Media", icon: ImageIcon, roles: null },
  {
    href: "/cms/users",
    label: "Users",
    icon: Users,
    roles: ["super_admin"],
  },
  {
    href: "/cms/audit",
    label: "Audit",
    icon: ScrollText,
    roles: ["super_admin"],
  },
  { href: "/cms/settings", label: "Settings", icon: Settings, roles: null },
];

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const [loc] = useLocation();
  const { user } = useCmsAuth();

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {nav
        .filter((item) => {
          if (!item.roles) return true;
          return user && item.roles.includes(user.role);
        })
        .map((item) => {
          const active = loc === item.href || loc.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
    </nav>
  );
}

export function CmsLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useCmsAuth();
  const [, navigate] = useLangAwareLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 md:flex-row dark:bg-neutral-950 dark:text-neutral-100">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-neutral-200 bg-white md:flex dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
          <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Ziadah CMS
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavLinks />
        </div>
        <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
          {user && (
            <div className="mb-3 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="mt-1 truncate text-xs text-neutral-500">
                {user.email}
              </div>
              <div className="mt-2">
                <RoleBadge role={user.role} />
              </div>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
            type="button"
            onClick={() => {
              logout();
              navigate("/cms/login");
            }}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 md:hidden dark:border-neutral-800 dark:bg-neutral-900">
          <span className="font-semibold">CMS</span>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" size="icon" aria-label="Menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-full flex-col">
                <div className="border-b p-4">
                  <div className="text-xs font-semibold uppercase text-neutral-500">
                    Ziadah CMS
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  <NavLinks onNavigate={() => setOpen(false)} />
                </div>
                {user && (
                  <div className="border-t p-3">
                    <div className="mb-2 text-sm font-medium">{user.name}</div>
                    <RoleBadge role={user.role} />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        logout();
                        navigate("/cms/login");
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
