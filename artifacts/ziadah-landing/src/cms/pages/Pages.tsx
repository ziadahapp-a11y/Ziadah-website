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
import { Badge } from "@/components/ui/badge";
import { CmsPageHeader } from "../components/CmsPageHeader";
import { CmsInlineError, CmsLoadingLine } from "../components/CmsStates";

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
      <CmsPageHeader
        title="Pages"
        description="Manage dynamic CMS pages."
        actions={
          isAdmin ? (
            <Button
              type="button"
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              New page
            </Button>
          ) : undefined
        }
      />

      {q.isPending && <CmsLoadingLine />}
      {q.isError && (
        <CmsInlineError
          message={
            q.error instanceof CmsApiError ? q.error.message : "Failed to load"
          }
        />
      )}

      {q.isSuccess && (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
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
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs dark:bg-neutral-800">
                      {p.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    {p.isPublished ? (
                      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
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
