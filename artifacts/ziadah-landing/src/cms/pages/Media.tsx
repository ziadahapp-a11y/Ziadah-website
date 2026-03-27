import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CmsApiError, cmsApi, getApiOrigin, type CmsMediaRow } from "../api";
import { CmsPageHeader } from "../components/CmsPageHeader";
import { CmsInlineError, CmsLoadingLine } from "../components/CmsStates";

function mediaSrc(url: string) {
  if (url.startsWith("http")) return url;
  return `${getApiOrigin()}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function CmsMediaPage() {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const q = useQuery({
    queryKey: ["cms", "media"],
    queryFn: async () => (await cmsApi.listMedia()).media,
  });

  const uploadMut = useMutation({
    mutationFn: (file: File) => cmsApi.uploadMedia(file),
    onSuccess: () => {
      toast.success("Uploaded");
      void qc.invalidateQueries({ queryKey: ["cms", "media"] });
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Upload failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => cmsApi.deleteMedia(id),
    onSuccess: () => {
      toast.success("Deleted");
      void qc.invalidateQueries({ queryKey: ["cms", "media"] });
    },
    onError: (e: unknown) =>
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed"),
  });

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const file = files[0];
    if (!file) return;
    uploadMut.mutate(file);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6" dir="ltr">
      <CmsPageHeader
        title="Media"
        description="Upload images; files are stored on the API server."
      />

      <div
        className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver
            ? "border-violet-500 bg-violet-50/80 dark:border-violet-400 dark:bg-violet-950/40"
            : "border-neutral-300 bg-white/60 dark:border-neutral-700 dark:bg-neutral-900/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Drag and drop an image here, or{" "}
          <button
            type="button"
            className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-800 dark:text-violet-400"
            onClick={() => inputRef.current?.click()}
          >
            browse
          </button>
        </p>
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {q.data.map((m: CmsMediaRow) => (
            <div
              key={m.id}
              className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <button
                type="button"
                className="aspect-square w-full bg-neutral-100 dark:bg-neutral-800"
                onClick={async () => {
                  const full = mediaSrc(m.url);
                  try {
                    await navigator.clipboard.writeText(full);
                    toast.success("URL copied");
                  } catch {
                    toast.error("Could not copy");
                  }
                }}
              >
                <img
                  src={mediaSrc(m.url)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
              <div className="flex items-center justify-between gap-1 p-2">
                <p className="truncate text-xs text-neutral-500">{m.filename}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-red-600"
                  onClick={() => {
                    if (window.confirm("Delete this file?")) {
                      deleteMut.mutate(m.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
