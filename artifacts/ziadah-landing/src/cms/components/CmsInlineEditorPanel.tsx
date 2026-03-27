import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useCmsAuth } from "@/cms/CmsAuthContext";
import { useCmsEditor } from "@/cms/CmsEditorContext";
import { useSiteContentMap, useSiteContentMutations } from "@/cms/siteContent";
import { CmsApiError, cmsApi } from "@/cms/api";

function buildInitialValue(raw: string, type: string): string | boolean {
  if (type === "boolean") {
    return raw === "true" || raw === "1";
  }
  return raw;
}

function normalizeForType(value: string | boolean, type: string): string {
  if (type === "boolean") {
    return value ? "true" : "false";
  }
  if (type === "number") {
    const next = String(value).trim();
    return next.length === 0 ? "0" : next;
  }
  return String(value);
}

export function CmsInlineEditorPanel() {
  const { user, loading } = useCmsAuth();
  const { panelOpen, activeEditable, closeEditor } = useCmsEditor();
  const contentMap = useSiteContentMap();
  const { patchSiteContent } = useSiteContentMutations();
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const richTextRef = useRef<HTMLTextAreaElement | null>(null);
  const prevContentKeyRef = useRef<string | undefined>(undefined);

  const currentValue = useMemo(() => {
    if (!activeEditable) return "";
    return contentMap[activeEditable.contentKey] ?? "";
  }, [activeEditable, contentMap]);

  const [draft, setDraft] = useState<string | boolean>(currentValue);

  const contentKey = activeEditable?.contentKey;
  const syncType = activeEditable?.type ?? "text";

  useEffect(() => {
    if (!activeEditable || !contentKey) return;
    const v = contentMap[contentKey] ?? "";
    setDraft(buildInitialValue(v, syncType));
    if (prevContentKeyRef.current !== contentKey) {
      prevContentKeyRef.current = contentKey;
      setSavedAt(null);
    }
  }, [activeEditable, contentKey, syncType, contentMap]);

  const canEdit =
    !loading &&
    !!user &&
    (user.role === "editor" || user.role === "super_admin");

  if (!canEdit || !activeEditable) {
    return null;
  }

  const type = activeEditable.type;
  const label = activeEditable.label ?? activeEditable.contentKey;
  const normalizedDraft = normalizeForType(draft, type);
  const normalizedCurrentValue = normalizeForType(
    buildInitialValue(currentValue, type),
    type,
  );
  const isDirty = normalizedDraft !== normalizedCurrentValue;

  const applyRichTextWrap = (before: string, after = before) => {
    const el = richTextRef.current;
    const base = String(draft);
    if (!el) {
      setDraft(`${base}${before}${after}`);
      return;
    }
    const start = el.selectionStart ?? base.length;
    const end = el.selectionEnd ?? base.length;
    const selected = base.slice(start, end);
    const replacement = `${before}${selected || "text"}${after}`;
    const next = `${base.slice(0, start)}${replacement}${base.slice(end)}`;
    setDraft(next);
    window.requestAnimationFrame(() => {
      el.focus();
      const cursor = start + replacement.length;
      el.setSelectionRange(cursor, cursor);
    });
  };

  const saveDraft = async () => {
    if (!isDirty || saving) return;
    setSaving(true);
    try {
      const data = await cmsApi.updateContent(activeEditable.contentKey, {
        value: normalizedDraft,
      });
      const persisted =
        data.block?.value !== undefined ? String(data.block.value) : normalizedDraft;
      patchSiteContent({ [activeEditable.contentKey]: persisted });
      setSavedAt(Date.now());
      toast.success("Saved");
    } catch (e) {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const resetDraft = () => {
    setDraft(buildInitialValue(normalizedCurrentValue, type));
  };

  const discardAndClose = () => {
    closeEditor();
  };

  return (
    <aside
      className={`fixed right-0 top-12 z-[10010] h-[calc(100vh-48px)] w-[380px] transform border-l border-neutral-200 bg-white shadow-2xl transition-transform duration-200 dark:border-neutral-800 dark:bg-neutral-950 ${
        panelOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Inline CMS editor panel"
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {label}
              </h3>
              <p className="mt-0.5 truncate text-xs text-neutral-500">
                {activeEditable.contentKey}
              </p>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={closeEditor}>
              Close
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {type === "text" && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-500">Text</p>
              <Input
                value={String(draft)}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Enter text"
              />
            </div>
          )}

          {type === "richtext" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-neutral-500">Rich text</p>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs"
                    onClick={() => applyRichTextWrap("<strong>", "</strong>")}
                  >
                    B
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs"
                    onClick={() => applyRichTextWrap("<em>", "</em>")}
                  >
                    I
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs"
                    onClick={() => applyRichTextWrap('<a href="">', "</a>")}
                  >
                    Link
                  </Button>
                </div>
              </div>
              <Textarea
                ref={richTextRef}
                rows={8}
                value={String(draft)}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Enter rich text / HTML"
              />
            </div>
          )}

          {type === "image_url" && (
            <div className="space-y-3">
              <p className="text-xs font-medium text-neutral-500">Image URL</p>
              <Input
                value={String(draft)}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="https://..."
              />
              {String(draft).length > 0 && (
                <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <img src={String(draft)} alt="" className="h-44 w-full object-contain bg-neutral-50 dark:bg-neutral-900" />
                </div>
              )}
              <Button asChild type="button" variant="outline" className="w-full">
                <Link href="/cms/media">Browse Media</Link>
              </Button>
            </div>
          )}

          {type === "color" && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-500">Color</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-9 w-12 cursor-pointer rounded border border-neutral-300 bg-transparent p-0 dark:border-neutral-700"
                  value={String(draft).startsWith("#") ? String(draft).slice(0, 7) : "#000000"}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <Input value={String(draft)} onChange={(e) => setDraft(e.target.value)} />
              </div>
            </div>
          )}

          {type === "number" && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-500">Number</p>
              <Input
                type="number"
                value={String(draft)}
                onChange={(e) => setDraft(e.target.value)}
              />
            </div>
          )}

          {type === "boolean" && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-500">Boolean</p>
              <div className="flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-3 dark:border-neutral-800">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {Boolean(draft) ? "Enabled" : "Disabled"}
                </span>
                <Switch
                  checked={Boolean(draft)}
                  onCheckedChange={(v) => setDraft(v)}
                />
              </div>
            </div>
          )}

          {!["text", "richtext", "image_url", "color", "number", "boolean"].includes(type) && (
            <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
              <p className="font-semibold">Unsupported field type</p>
              <p>
                This editable is configured as <code>{type}</code>. Switch its content type in CMS
                content management or update this panel renderer.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950/50">
            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Status</p>
            <p className="mt-1 text-xs text-neutral-500">
              {isDirty
                ? "Unsaved changes"
                : savedAt
                  ? `Saved ${new Date(savedAt).toLocaleTimeString()}`
                  : "No pending changes"}
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/60">
            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">History</p>
            <p className="text-xs text-neutral-500">
              Last 3 changes will appear here in Step 5 after API wiring.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
          <div className="flex flex-wrap gap-2">
            <Button type="button" className="flex-1" onClick={saveDraft} disabled={!isDirty || saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={resetDraft} disabled={!isDirty || saving}>
              Reset to current
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={discardAndClose}>
              Discard
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

