import type { ReactNode } from "react";
import { useCmsAuth } from "@/cms/CmsAuthContext";
import { useCmsEditor, type EditableValueType } from "@/cms/CmsEditorContext";

type EditableProps = {
  contentKey: string;
  type?: EditableValueType;
  label?: string;
  /** عند true: النقر العادي يصل للعنصر الأب (روابط/أزرار الناف). Shift+نقر يفتح المحرر. */
  allowClickThrough?: boolean;
  children: ReactNode;
  className?: string;
};

export function Editable({
  contentKey,
  type = "text",
  label,
  allowClickThrough = false,
  children,
  className,
}: EditableProps) {
  const { user, loading } = useCmsAuth();
  const { editMode, activeEditable, openEditorFor } = useCmsEditor();

  const canEdit =
    !loading &&
    !!user &&
    (user.role === "editor" || user.role === "super_admin");
  const active = canEdit && editMode;
  const isSelected = activeEditable?.contentKey === contentKey;
  const editableLabel = label ?? contentKey;

  const openCurrentEditor = () => {
    openEditorFor({
      contentKey,
      type,
      label: editableLabel,
    });
  };

  if (!active) {
    return <>{children}</>;
  }

  const editHint = allowClickThrough ? "Shift+click to edit" : `Edit ${editableLabel}`;

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={editHint}
      title={allowClickThrough ? editHint : undefined}
      aria-pressed={isSelected}
      className={`cms-editable ${isSelected ? "is-active" : ""} ${className ?? ""}`.trim()}
      data-cms-key={contentKey}
      data-cms-label={editableLabel}
      data-cms-active={isSelected ? "true" : "false"}
      onClick={(e) => {
        if (allowClickThrough) {
          if (e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            openCurrentEditor();
          }
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        openCurrentEditor();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          openCurrentEditor();
        }
      }}
    >
      <span className="cms-editable-label">{editableLabel}</span>
      {children}
    </span>
  );
}

