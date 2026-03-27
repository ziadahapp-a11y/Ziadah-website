import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CmsApiError, cmsApi } from "../api";
import { useCmsAuth } from "../CmsAuthContext";
import { CmsPageHeader } from "../components/CmsPageHeader";
import { CmsInlineError, CmsLoadingLine } from "../components/CmsStates";

export default function CmsAuditPage() {
  const { user } = useCmsAuth();
  const isAdmin = user?.role === "super_admin";
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const q = useQuery({
    queryKey: ["cms", "audit", page, userId, action, dateFrom, dateTo],
    queryFn: async () =>
      cmsApi.listAudit({
        page,
        pageSize,
        userId: userId.trim() || undefined,
        action: action.trim() || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      }),
    enabled: isAdmin,
  });

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg" dir="ltr">
        <CmsPageHeader
          title="Audit log"
          description="Only super administrators can view the audit log."
        />
      </div>
    );
  }

  const totalPages = q.data
    ? Math.max(1, Math.ceil(q.data.total / pageSize))
    : 1;

  return (
    <div className="mx-auto max-w-6xl space-y-6" dir="ltr">
      <CmsPageHeader
        title="Audit log"
        description="Record of CMS changes."
      />

      <div className="grid gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label>User ID</Label>
          <Input
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setPage(1);
            }}
            placeholder="UUID"
          />
        </div>
        <div className="space-y-2">
          <Label>Action</Label>
          <Input
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setPage(1);
            }}
            placeholder="e.g. UPDATE_CONTENT"
          />
        </div>
        <div className="space-y-2">
          <Label>From (ISO date)</Label>
          <Input
            type="datetime-local"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>To (ISO date)</Label>
          <Input
            type="datetime-local"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {q.isPending && <CmsLoadingLine />}
      {q.isError && (
        <CmsInlineError
          message={
            q.error instanceof CmsApiError ? q.error.message : "Failed to load"
          }
        />
      )}

      {q.isSuccess && (
        <>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead className="max-w-xs">Changes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {q.data.items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-nowrap text-neutral-600">
                      {new Date(row.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {row.userName ?? row.userEmail ?? row.userId ?? "—"}
                    </TableCell>
                    <TableCell className="font-medium">{row.action}</TableCell>
                    <TableCell>
                      <span className="text-xs text-neutral-500">
                        {row.targetTable}
                        {row.targetId ? ` · ${row.targetId.slice(0, 8)}…` : ""}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate font-mono text-xs text-neutral-500">
                      {JSON.stringify({ old: row.oldValue, new: row.newValue })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              Page {q.data.page} of {totalPages} · {q.data.total} entries
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
