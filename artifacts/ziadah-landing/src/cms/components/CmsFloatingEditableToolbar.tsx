import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCmsAuth } from "@/cms/CmsAuthContext";
import { useCmsEditor } from "@/cms/CmsEditorContext";

type ToolbarPosition = {
  top: number;
  left: number;
  placement: "top" | "bottom";
};

const TOOLBAR_ESTIMATED_WIDTH = 320;
const VIEWPORT_PADDING = 12;

export function CmsFloatingEditableToolbar() {
  const { user, loading } = useCmsAuth();
  const { editMode, activeEditable, panelOpen, openEditorFor, closeEditor } = useCmsEditor();
  const [position, setPosition] = useState<ToolbarPosition | null>(null);

  const canEdit =
    !loading &&
    !!user &&
    (user.role === "editor" || user.role === "super_admin");

  const targetElement = useMemo(() => {
    if (!activeEditable) return null;
    const candidates = document.querySelectorAll<HTMLElement>("[data-cms-key]");
    return Array.from(candidates).find(
      (el) => el.dataset.cmsKey === activeEditable.contentKey,
    ) ?? null;
  }, [activeEditable]);

  useEffect(() => {
    if (!editMode || !activeEditable || !targetElement) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = targetElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const minX = VIEWPORT_PADDING + TOOLBAR_ESTIMATED_WIDTH / 2;
      const maxX = window.innerWidth - VIEWPORT_PADDING - TOOLBAR_ESTIMATED_WIDTH / 2;
      const left = Math.min(Math.max(centerX, minX), maxX);
      const canPlaceTop = rect.top > 74;
      setPosition({
        top: canPlaceTop ? rect.top - 10 : rect.bottom + 10,
        left,
        placement: canPlaceTop ? "top" : "bottom",
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [editMode, activeEditable, targetElement]);

  if (!canEdit || !editMode || !activeEditable || !position) {
    return null;
  }

  return (
    <div
      className={`cms-float-toolbar cms-float-toolbar--${position.placement}`}
      style={{ top: position.top, left: position.left }}
      role="toolbar"
      aria-label="Inline editable toolbar"
    >
      <div className="cms-float-toolbar__meta">
        <span className="cms-float-toolbar__label">{activeEditable.label ?? "Editable"}</span>
        <span className="cms-float-toolbar__key">{activeEditable.contentKey}</span>
      </div>
      <div className="cms-float-toolbar__actions">
        <Button
          type="button"
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => openEditorFor(activeEditable)}
        >
          {panelOpen ? "Focus panel" : "Edit"}
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={closeEditor}>
          Close
        </Button>
      </div>
    </div>
  );
}

