import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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

type SectionConfig = CmsPageRow["sectionsConfig"][number];

function normalizeSections(
  sections: CmsPageRow["sectionsConfig"] | null | undefined,
): CmsPageRow["sectionsConfig"] {
  if (!Array.isArray(sections)) return [];
  return sections
    .filter((s): s is SectionConfig => !!s && typeof s.id === "string")
    .map((s) => ({
      id: s.id,
      label: s.label || s.id,
      hidden: !!s.hidden,
    }));
}

/** Presets for “Add section” — each may add one or many blocks at once. */
const SECTION_ADD_TEMPLATES: Array<{
  key: string;
  title: string;
  description: string;
  sections: SectionConfig[];
}> = [
  {
    key: "hero",
    title: "Hero",
    description: "Top banner, headline, and primary actions",
    sections: [{ id: "hero", label: "Hero", hidden: false }],
  },
  {
    key: "features",
    title: "Features",
    description: "Feature grid or bullet list",
    sections: [{ id: "features", label: "Features", hidden: false }],
  },
  {
    key: "faq",
    title: "FAQ",
    description: "Questions and expandable answers",
    sections: [{ id: "faq", label: "FAQ", hidden: false }],
  },
  {
    key: "cta",
    title: "CTA",
    description: "Conversion banner or closing pitch",
    sections: [{ id: "cta", label: "Call to action", hidden: false }],
  },
  {
    key: "testimonials",
    title: "Testimonials",
    description: "Quotes, logos, or social proof",
    sections: [{ id: "testimonials", label: "Testimonials", hidden: false }],
  },
  {
    key: "pricing",
    title: "Pricing",
    description: "Plans and comparison table",
    sections: [{ id: "pricing", label: "Pricing", hidden: false }],
  },
  {
    key: "logos",
    title: "Logo strip",
    description: "Trusted-by / partner logos row",
    sections: [{ id: "logos", label: "Logo strip", hidden: false }],
  },
  {
    key: "content",
    title: "Content",
    description: "Rich text or mixed body area",
    sections: [{ id: "content", label: "Content", hidden: false }],
  },
  {
    key: "gallery",
    title: "Gallery",
    description: "Image or media gallery",
    sections: [{ id: "gallery", label: "Gallery", hidden: false }],
  },
  {
    key: "bundle-marketing",
    title: "Marketing bundle",
    description: "Hero, features, and CTA in one step",
    sections: [
      { id: "hero", label: "Hero", hidden: false },
      { id: "features", label: "Features", hidden: false },
      { id: "cta", label: "Call to action", hidden: false },
    ],
  },
];

function allocateUniqueSectionId(baseId: string, occupied: Set<string>): string {
  const trimmed = baseId.trim();
  if (!occupied.has(trimmed)) return trimmed;
  let n = 2;
  while (occupied.has(`${trimmed}-${n}`)) n += 1;
  return `${trimmed}-${n}`;
}

function mergeSectionsInto(
  prev: CmsPageRow["sectionsConfig"],
  toAdd: SectionConfig[],
): CmsPageRow["sectionsConfig"] {
  const occupied = new Set(prev.map((s) => s.id.trim()));
  const next = [...prev];
  for (const s of toAdd) {
    const id = allocateUniqueSectionId(s.id, occupied);
    occupied.add(id);
    next.push({
      id,
      label: s.label,
      hidden: !!s.hidden,
    });
  }
  return next;
}

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
  const [sectionsConfig, setSectionsConfig] = useState<CmsPageRow["sectionsConfig"]>(
    normalizeSections(initial?.sectionsConfig),
  );
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [customSectionId, setCustomSectionId] = useState("");
  const [customSectionLabel, setCustomSectionLabel] = useState("");
  const [isPublished, setIsPublished] = useState(
    initial?.isPublished ?? false,
  );

  useEffect(() => {
    setSlug(initial?.slug ?? "");
    setTitle(initial?.title ?? "");
    setMetaDescription(initial?.metaDescription ?? "");
    setSectionsConfig(normalizeSections(initial?.sectionsConfig));
    setAddSectionOpen(false);
    setCustomSectionId("");
    setCustomSectionLabel("");
    setIsPublished(initial?.isPublished ?? false);
  }, [initial]);

  const createMut = useMutation({
    mutationFn: () => {
      const normalizedSections = sectionsConfig.map((s) => ({
        id: s.id.trim(),
        label: s.label.trim() || s.id.trim(),
        hidden: !!s.hidden,
      }));
      return cmsApi.createPage({
        slug,
        title,
        metaDescription,
        sectionsConfig: normalizedSections,
        isPublished,
      });
    },
    onSuccess: () => {
      toast.success("Page created");
      onSaved();
      onClose();
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Failed"),
  });

  const updateMut = useMutation({
    mutationFn: () => {
      if (!initial) return Promise.reject();
      const normalizedSections = sectionsConfig.map((s) => ({
        id: s.id.trim(),
        label: s.label.trim() || s.id.trim(),
        hidden: !!s.hidden,
      }));
      return cmsApi.updatePage(initial.id, {
        slug,
        title,
        metaDescription,
        sectionsConfig: normalizedSections,
        isPublished,
      });
    },
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
  const mutateSection = (
    index: number,
    fn: (section: SectionConfig) => SectionConfig,
  ) => {
    setSectionsConfig((prev) =>
      prev.map((s, i) => (i === index ? fn(s) : s)),
    );
  };

  const moveSection = (from: number, to: number) => {
    setSectionsConfig((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      if (!item) return prev;
      next.splice(to, 0, item);
      return next;
    });
  };

  const duplicateSection = (index: number) => {
    setSectionsConfig((prev) => {
      const source = prev[index];
      if (!source) return prev;
      const baseId = `${source.id}-copy`;
      let candidate = baseId;
      let suffix = 2;
      const ids = new Set(prev.map((s) => s.id));
      while (ids.has(candidate)) {
        candidate = `${baseId}-${suffix}`;
        suffix += 1;
      }
      const clone: SectionConfig = {
        id: candidate,
        label: `${source.label} (copy)`,
        hidden: source.hidden,
      };
      const next = [...prev];
      next.splice(index + 1, 0, clone);
      return next;
    });
  };

  const appendTemplate = (sections: SectionConfig[]) => {
    setSectionsConfig((prev) => mergeSectionsInto(prev, sections));
    setAddSectionOpen(false);
    toast.success(
      sections.length > 1 ? `Added ${sections.length} sections` : "Section added",
    );
  };

  const addCustomSection = () => {
    const id = customSectionId.trim();
    if (!id) {
      toast.error("Section ID is required");
      return;
    }
    appendTemplate([
      { id, label: customSectionLabel.trim() || id, hidden: false },
    ]);
    setCustomSectionId("");
    setCustomSectionLabel("");
  };

  const validateSections = (): boolean => {
    const ids = new Set<string>();
    for (const s of sectionsConfig) {
      const id = s.id.trim();
      if (!id) {
        toast.error("Section ID cannot be empty");
        return false;
      }
      if (ids.has(id)) {
        toast.error(`Duplicate section ID: ${id}`);
        return false;
      }
      ids.add(id);
    }
    return true;
  };

  const handleCreate = () => {
    if (!validateSections()) return;
    createMut.mutate();
  };

  const handleSave = () => {
    if (!validateSections()) return;
    updateMut.mutate();
  };

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

      <div className="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Sections
          </p>
          <p className="text-xs text-neutral-500">
            Configure section order and visibility for this page.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => setAddSectionOpen(true)}
          disabled={!canEdit && !isCreate}
        >
          Add section…
        </Button>

        <Dialog open={addSectionOpen} onOpenChange={setAddSectionOpen}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add section</DialogTitle>
              <DialogDescription>
                Pick a template (IDs auto-adjust if a slug is already used) or add a custom block.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SECTION_ADD_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.key}
                  type="button"
                  className="rounded-lg border border-neutral-200 bg-white p-3 text-left transition-colors hover:border-violet-300 hover:bg-violet-50/50 dark:border-neutral-700 dark:bg-neutral-950 dark:hover:border-violet-900 dark:hover:bg-violet-950/30"
                  onClick={() => appendTemplate(tpl.sections)}
                >
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {tpl.title}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{tpl.description}</div>
                </button>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Custom section
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  placeholder="Section ID (e.g. my-block)"
                  value={customSectionId}
                  onChange={(e) => setCustomSectionId(e.target.value)}
                />
                <Input
                  placeholder="Label (optional)"
                  value={customSectionLabel}
                  onChange={(e) => setCustomSectionLabel(e.target.value)}
                />
              </div>
              <Button type="button" className="w-full sm:w-auto" onClick={addCustomSection}>
                Add custom section
              </Button>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddSectionOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="space-y-2">
          {sectionsConfig.length === 0 && (
            <p className="text-xs text-neutral-500">No sections configured yet.</p>
          )}
          {sectionsConfig.map((section, index) => (
            <div
              key={section.id}
              className="rounded-md border border-neutral-200 p-2 dark:border-neutral-800"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <Input
                  value={section.id}
                  onChange={(e) =>
                    mutateSection(index, (s) => ({ ...s, id: e.target.value }))
                  }
                  disabled={!canEdit && !isCreate}
                />
                <Input
                  value={section.label}
                  onChange={(e) =>
                    mutateSection(index, (s) => ({ ...s, label: e.target.value }))
                  }
                  disabled={!canEdit && !isCreate}
                />
                <div className="flex flex-wrap items-center gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => moveSection(index, index - 1)}
                    disabled={index === 0 || (!canEdit && !isCreate)}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => moveSection(index, index + 1)}
                    disabled={index === sectionsConfig.length - 1 || (!canEdit && !isCreate)}
                  >
                    Down
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => duplicateSection(index)}
                    disabled={!canEdit && !isCreate}
                  >
                    Duplicate
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={section.hidden ? "secondary" : "outline"}
                    onClick={() =>
                      mutateSection(index, (s) => ({ ...s, hidden: !s.hidden }))
                    }
                    disabled={!canEdit && !isCreate}
                  >
                    {section.hidden ? "Hidden" : "Visible"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      setSectionsConfig((prev) => prev.filter((_, i) => i !== index))
                    }
                    disabled={!canEdit && !isCreate}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
            onClick={handleCreate}
          >
            Create
          </Button>
        )}
        {!isCreate && canEdit && (
          <Button
            type="button"
            disabled={updateMut.isPending}
            onClick={handleSave}
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
