import type { ReactNode } from "react";
import { useCmsAuth } from "@/cms/CmsAuthContext";
import { useCmsEditor, type EditableValueType } from "@/cms/CmsEditorContext";

type EditableProps = {
  contentKey: string;
  type?: EditableValueType;
  label?: string;
  children: ReactNode;
  className?: string;
};

export function Editable({
  contentKey,
  type = "text",
  label,
  children,
  className,
}: EditableProps) {
  const { user } = useCmsAuth();
  const { editMode, activeEditable, openEditorFor } = useCmsEditor();

  const canEdit = !!user && (user.role === "editor" || user.role === "super_admin");
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

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={`Edit ${editableLabel}`}
      aria-pressed={isSelected}
      className={`cms-editable ${isSelected ? "is-active" : ""} ${className ?? ""}`.trim()}
      data-cms-key={contentKey}
      data-cms-label={editableLabel}
      data-cms-active={isSelected ? "true" : "false"}
      onClick={(e) => {
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

