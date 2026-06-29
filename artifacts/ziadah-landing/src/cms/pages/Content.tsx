import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CmsApiError, cmsApi, getApiOrigin, type ContentBlockRow } from "../api";
import { useSiteContentMutations } from "../siteContent";
import { useCmsAuth } from "../CmsAuthContext";
import { cn } from "@/lib/utils";
import { CmsPageHeader } from "../components/CmsPageHeader";
import { CmsEmptyHint, CmsInlineError, CmsLoadingLine } from "../components/CmsStates";

function groupBySection(blocks: ContentBlockRow[]) {
  const map = new Map<string, ContentBlockRow[]>();
  for (const b of blocks) {
    const list = map.get(b.section) ?? [];
    list.push(b);
    map.set(b.section, list);
  }
  return map;
}

function BlockEditor({ block }: { block: ContentBlockRow }) {
  const { user } = useCmsAuth();
  const qc = useQueryClient();
  const { patchSiteContent, removeSiteContentKeys } = useSiteContentMutations();
  const canEdit = user?.role === "editor" || user?.role === "super_admin";
  const canDelete = user?.role === "super_admin";

  const [value, setValue] = useState(block.value);
  useEffect(() => {
    setValue(block.value);
  }, [block.id, block.value]);

  const saveMut = useMutation({
    mutationFn: (next: string) =>
      cmsApi.updateContent(block.key, { value: next }),
    onSuccess: (data) => {
      patchSiteContent({ [block.key]: String(data.block.value) });
      setValue(String(data.block.value));
      qc.setQueryData<ContentBlockRow[]>(["cms", "content"], (prev) => {
        if (!prev) return prev;
        return prev.map((b) => (b.id === block.id ? { ...b, ...data.block } : b));
      });
      void qc.invalidateQueries({ queryKey: ["cms", "content"] });
      toast.success("Saved");
    },
    onError: (e: unknown) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMut = useMutation({
    mutationFn: () => cmsApi.deleteContent(block.key),
    onSuccess: () => {
      removeSiteContentKeys([block.key]);
      qc.setQueryData<ContentBlockRow[]>(["cms", "content"], (prev) =>
        prev ? prev.filter((b) => b.id !== block.id) : prev,
      );
      void qc.invalidateQueries({ queryKey: ["cms", "content"] });
      toast.success("Block deleted");
    },
    onError: (e: unknown) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  const onBlur = () => {
    if (!canEdit) return;
    if (value === block.value) return;
    saveMut.mutate(value);
  };

  let control: React.ReactNode;
  switch (block.type) {
    case "boolean":
      control = (
        <div className="flex items-center gap-2">
          <Switch
            checked={value === "true" || value === "1"}
            onCheckedChange={(c) => {
              const next = c ? "true" : "false";
              setValue(next);
              if (canEdit) saveMut.mutate(next);
            }}
            disabled={!canEdit}
          />
          <span className="text-sm text-neutral-500">
            {value === "true" || value === "1" ? "On" : "Off"}
          </span>
        </div>
      );
      break;
    case "number":
      control = (
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          disabled={!canEdit}
        />
      );
      break;
    case "color":
      control = (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="color"
            className="h-9 w-14 cursor-pointer rounded border border-neutral-300 bg-white dark:border-neutral-700"
            value={value.startsWith("#") ? value.slice(0, 7) : "#000000"}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            disabled={!canEdit}
          />
          <Input
            className="max-w-xs"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            disabled={!canEdit}
          />
        </div>
      );
      break;
    case "image_url":
      control = (
        <div className="space-y-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            disabled={!canEdit}
            placeholder="https://…"
          />
          {value.length > 0 && (
            <img
              src={
                value.startsWith("http")
                  ? value
                  : `${getApiOrigin()}${value.startsWith("/") ? value : `/${value}`}`
              }
              alt=""
              className="max-h-40 rounded-md border border-neutral-200 object-contain dark:border-neutral-700"
            />
          )}
        </div>
      );
      break;
    case "richtext":
      control = (
        <Textarea
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          disabled={!canEdit}
          className="font-mono text-sm"
          placeholder="HTML or plain text"
        />
      );
      break;
    default:
      control = (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          disabled={!canEdit}
        />
      );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-medium">{block.label}</div>
          <code className="text-xs text-neutral-500">{block.key}</code>
        </div>
        <Badge variant="secondary">{block.type}</Badge>
      </div>
      <div className="mt-3 space-y-2">
        <Label className="text-neutral-500">Value</Label>
        {control}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
        <span>
          Updated{" "}
          {block.updatedAt
            ? new Date(block.updatedAt).toLocaleString()
            : "—"}
        </span>
        {canEdit && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={saveMut.isPending || value === block.value}
            onClick={() => saveMut.mutate(value)}
          >
            Save
          </Button>
        )}
        {canDelete && (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            disabled={deleteMut.isPending}
            onClick={() => {
              if (
                window.confirm(
                  `Delete block "${block.key}"? This cannot be undone.`,
                )
              ) {
                deleteMut.mutate();
              }
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default function CmsContentPage() {
  const q = useQuery({
    queryKey: ["cms", "content"],
    queryFn: async () => (await cmsApi.listContent()).blocks,
  });

  const pages = useMemo(() => {
    const list = q.data ?? [];
    return [...new Set(list.map((b) => b.page))].sort();
  }, [q.data]);

  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  useEffect(() => {
    if (pages.length && selectedPage === null) {
      setSelectedPage(pages[0] ?? null);
    }
  }, [pages, selectedPage]);

  const filtered = useMemo(() => {
    if (!q.data || !selectedPage) return [];
    return q.data.filter((b) => b.page === selectedPage);
  }, [q.data, selectedPage]);

  const grouped = useMemo(() => groupBySection(filtered), [filtered]);

  if (q.isPending) {
    return (
      <div className="mx-auto max-w-6xl space-y-6" dir="ltr">
        <CmsPageHeader
          title="Content"
          description="Edit text and media keys for the public site."
        />
        <CmsLoadingLine />
      </div>
    );
  }
  if (q.isError) {
    return (
      <div className="mx-auto max-w-6xl space-y-4" dir="ltr">
        <CmsPageHeader
          title="Content"
          description="Edit text and media keys for the public site."
        />
        <CmsInlineError
          message={
            q.error instanceof CmsApiError ? q.error.message : "Failed to load"
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start" dir="ltr">
      <aside className="w-full shrink-0 lg:sticky lg:top-4 lg:w-52 lg:self-start">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Page
        </h2>
        <ul className="space-y-1">
          {pages.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => setSelectedPage(p)}
                className={cn(
                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
                  selectedPage === p
                    ? "bg-violet-100/95 text-violet-950 shadow-[inset_3px_0_0_0_rgb(34, 197, 125)] dark:bg-violet-950/45 dark:text-violet-50"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800/90",
                )}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="min-w-0 flex-1 space-y-8">
        <CmsPageHeader
          title="Content"
          description="Edit text and media keys for the public site."
        />
        {selectedPage &&
          [...grouped.entries()].map(([section, blocks]) => (
            <section key={section}>
              <h3 className="mb-3 text-lg font-medium capitalize text-neutral-900 dark:text-neutral-100">
                {section}
              </h3>
              <div className="space-y-4">
                {blocks.map((b) => (
                  <BlockEditor key={b.id} block={b} />
                ))}
              </div>
            </section>
          ))}
        {pages.length === 0 && (
          <CmsEmptyHint>
            No content blocks yet. Add some via the API or seed script.
          </CmsEmptyHint>
        )}
      </div>
    </div>
  );
}
