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
import "../cms.css";

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
              data-active={active ? "true" : "false"}
              className={cn(
                "cms-nav-link flex min-h-10 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
                active
                  ? "bg-violet-100/95 text-violet-950 dark:bg-violet-950/45 dark:text-violet-50"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800/90",
              )}
            >
              <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
              {item.label}
            </Link>
          );
        })}
    </nav>
  );
}

function BrandBlock({ compact }: { compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", compact && "px-1")}>
      <span className="cms-brand-mark shrink-0" aria-hidden>
        Z
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Ziadah CMS
        </div>
        {!compact && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Content & pages
          </div>
        )}
      </div>
    </div>
  );
}

export function CmsLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useCmsAuth();
  const [, navigate] = useLangAwareLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="cms-shell flex min-h-screen flex-col text-neutral-900 md:flex-row dark:bg-neutral-950 dark:text-neutral-100">
      <aside className="cms-sidebar hidden w-[var(--cms-sidebar-w)] shrink-0 flex-col md:flex">
        <div className="border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
          <BrandBlock />
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavLinks />
        </div>
        <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
          {user && (
            <div className="mb-3 rounded-xl border border-neutral-200/80 bg-white/80 p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80">
              <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {user.name}
              </div>
              <div className="mt-0.5 truncate text-xs text-neutral-500">{user.email}</div>
              <div className="mt-2">
                <RoleBadge role={user.role} />
              </div>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 border-neutral-200 dark:border-neutral-700"
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
        <header className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur-sm md:hidden dark:border-neutral-800 dark:bg-neutral-900/90">
          <BrandBlock compact />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="cms-sidebar w-72 border-r-0 p-0">
              <div className="flex h-full flex-col">
                <div className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                  <BrandBlock />
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  <NavLinks onNavigate={() => setOpen(false)} />
                </div>
                {user && (
                  <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
                    <div className="mb-2 truncate text-sm font-medium">{user.name}</div>
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
        <main className="cms-main flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
