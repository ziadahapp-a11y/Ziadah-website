import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CmsApiError, cmsApi, type CmsPageRow } from "../api";
import { useCmsAuth } from "../CmsAuthContext";

function PageForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: CmsPageRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { user } = useCmsAuth();
  const canCreate = user?.role === "super_admin";
  const canEdit = user?.role === "editor" || user?.role === "super_admin";
  const canDelete = user?.role === "super_admin";

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    initial?.metaDescription ?? "",
  );
  const [isPublished, setIsPublished] = useState(
    initial?.isPublished ?? false,
  );

  useEffect(() => {
    setSlug(initial?.slug ?? "");
    setTitle(initial?.title ?? "");
    setMetaDescription(initial?.metaDescription ?? "");
    setIsPublished(initial?.isPublished ?? false);
  }, [initial]);

  const createMut = useMutation({
    mutationFn: () =>
      cmsApi.createPage({
        slug,
        title,
        metaDescription,
        isPublished,
      }),
    onSuccess: () => {
      toast.success("Page created");
      onSaved();
      onClose();
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Failed"),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      initial
        ? cmsApi.updatePage(initial.id, {
            slug,
            title,
            metaDescription,
            isPublished,
          })
        : Promise.reject(),
    onSuccess: () => {
      toast.success("Page saved");
      onSaved();
      onClose();
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Failed"),
  });

  const deleteMut = useMutation({
    mutationFn: () =>
      initial ? cmsApi.deletePage(initial.id) : Promise.reject(),
    onSuccess: () => {
      toast.success("Page deleted");
      onSaved();
      onClose();
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Failed"),
  });

  const isCreate = !initial;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pg-slug">Slug</Label>
        <Input
          id="pg-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={!canEdit && !isCreate}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pg-title">Title</Label>
        <Input
          id="pg-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!canEdit && !isCreate}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pg-meta">Meta description</Label>
        <Textarea
          id="pg-meta"
          rows={3}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          disabled={!canEdit && !isCreate}
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="pg-pub"
          checked={isPublished}
          onCheckedChange={setIsPublished}
          disabled={!canEdit && !isCreate}
        />
        <Label htmlFor="pg-pub">Published</Label>
      </div>
      <DialogFooter className="gap-2 sm:gap-0">
        {!isCreate && canDelete && (
          <Button
            type="button"
            variant="destructive"
            disabled={deleteMut.isPending}
            onClick={() => {
              if (window.confirm("Delete this page permanently?")) {
                deleteMut.mutate();
              }
            }}
          >
            Delete
          </Button>
        )}
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {isCreate && canCreate && (
          <Button
            type="button"
            disabled={createMut.isPending}
            onClick={() => createMut.mutate()}
          >
            Create
          </Button>
        )}
        {!isCreate && canEdit && (
          <Button
            type="button"
            disabled={updateMut.isPending}
            onClick={() => updateMut.mutate()}
          >
            Save
          </Button>
        )}
      </DialogFooter>
    </div>
  );
}

export default function CmsPagesPage() {
  const { user } = useCmsAuth();
  const isAdmin = user?.role === "super_admin";
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["cms", "pages"],
    queryFn: async () => (await cmsApi.listPages()).pages,
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CmsPageRow | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-6" dir="ltr">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Pages</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage dynamic CMS pages.
          </p>
        </div>
        {isAdmin && (
          <Button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            New page
          </Button>
        )}
      </div>

      {q.isPending && <p className="text-sm text-neutral-500">Loading…</p>}
      {q.isError && (
        <p className="text-sm text-red-600">
          {q.error instanceof CmsApiError ? q.error.message : "Failed to load"}
        </p>
      )}

      {q.isSuccess && (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {q.data.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>
                    <code className="text-xs">{p.slug}</code>
                  </TableCell>
                  <TableCell>
                    {p.isPublished ? (
                      <span className="text-green-600 dark:text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="text-neutral-500">Draft</span>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {new Date(p.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(p);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit page" : "Create page"}
            </DialogTitle>
          </DialogHeader>
          <PageForm
            key={editing?.id ?? "new"}
            initial={editing}
            onClose={() => setOpen(false)}
            onSaved={() => void qc.invalidateQueries({ queryKey: ["cms", "pages"] })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
