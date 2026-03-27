import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { CmsApiError, cmsApi } from "../api";
import { useCmsAuth } from "../CmsAuthContext";
import { CmsPageHeader } from "../components/CmsPageHeader";
import { CmsInlineError, CmsStatCardSkeleton } from "../components/CmsStates";

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string | number;
  href?: string;
}) {
  const inner = (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-50">
        {value}
      </div>
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50">
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function CmsDashboard() {
  const { user } = useCmsAuth();
  const isAdmin = user?.role === "super_admin";

  const blocksQ = useQuery({
    queryKey: ["cms", "content"],
    queryFn: async () => (await cmsApi.listContent()).blocks.length,
  });

  const pagesQ = useQuery({
    queryKey: ["cms", "pages"],
    queryFn: async () => (await cmsApi.listPages()).pages.length,
  });

  const usersQ = useQuery({
    queryKey: ["cms", "users"],
    queryFn: async () => (await cmsApi.listUsers()).users.length,
    enabled: isAdmin,
  });

  const auditQ = useQuery({
    queryKey: ["cms", "audit", "recent"],
    queryFn: async () =>
      (
        await cmsApi.listAudit({
          page: 1,
          pageSize: 8,
        })
      ).items,
    enabled: isAdmin,
  });

  const usersCount =
    isAdmin && usersQ.data !== undefined
      ? usersQ.data
      : isAdmin
        ? "…"
        : "—";

  const statsLoading =
    blocksQ.isPending ||
    pagesQ.isPending ||
    (isAdmin && usersQ.isPending);

  return (
    <div className="mx-auto max-w-5xl space-y-8" dir="ltr">
      <CmsPageHeader
        title="Dashboard"
        description="Overview of your site content and activity."
      />

      {statsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CmsStatCardSkeleton />
          <CmsStatCardSkeleton />
          <CmsStatCardSkeleton />
          <CmsStatCardSkeleton />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Content blocks"
            value={blocksQ.data ?? "—"}
            href="/cms/content"
          />
          <StatCard title="Pages" value={pagesQ.data ?? "—"} href="/cms/pages" />
          <StatCard
            title="Users"
            value={usersCount}
            href={isAdmin ? "/cms/users" : undefined}
          />
          <StatCard
            title="Recent changes"
            value={isAdmin ? (auditQ.data?.length ?? "—") : "—"}
          />
        </div>
      )}

      {isAdmin && (
        <div>
          <h2 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
            Recent activity
          </h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            {auditQ.isPending && (
              <p className="p-4 text-sm text-neutral-500">Loading activity…</p>
            )}
            {auditQ.isError && (
              <div className="p-4">
                <CmsInlineError
                  message={
                    auditQ.error instanceof CmsApiError
                      ? auditQ.error.message
                      : "Could not load audit log."
                  }
                />
              </div>
            )}
            {auditQ.isSuccess && auditQ.data.length === 0 && (
              <p className="p-4 text-sm text-neutral-500">No activity yet.</p>
            )}
            {auditQ.isSuccess && auditQ.data.length > 0 && (
              <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {auditQ.data.map((row) => (
                  <li
                    key={row.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {row.action}
                    </span>
                    <span className="text-neutral-500">
                      {row.userName ?? row.userEmail ?? "System"} ·{" "}
                      {new Date(row.timestamp).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            href="/cms/audit"
            className="mt-3 inline-block text-sm font-medium text-violet-700 hover:underline dark:text-violet-400"
          >
            View full audit log
          </Link>
        </div>
      )}
    </div>
  );
}
