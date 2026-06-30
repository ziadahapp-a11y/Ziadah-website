import type { ReactNode } from "react";

/**
 * Pass-through stub. The CMS inline-editing system was removed, so `Editable`
 * now just renders its children. The remaining props are accepted for
 * backward-compatibility with existing call sites and are intentionally ignored.
 */
type EditableProps = {
  contentKey?: string;
  type?: string;
  label?: string;
  allowClickThrough?: boolean;
  children: ReactNode;
  className?: string;
};

export function Editable({ children }: EditableProps) {
  return <>{children}</>;
}
