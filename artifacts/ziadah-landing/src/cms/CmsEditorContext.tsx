import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCmsAuth } from "./CmsAuthContext";

export type EditableValueType =
  | "text"
  | "richtext"
  | "image_url"
  | "color"
  | "number"
  | "boolean";

export type ActiveEditable = {
  contentKey: string;
  type: EditableValueType;
  label?: string;
};

type CmsEditorState = {
  editMode: boolean;
  panelOpen: boolean;
  activeEditable: ActiveEditable | null;
  setEditMode: (next: boolean) => void;
  toggleEditMode: () => void;
  openEditorFor: (editable: ActiveEditable) => void;
  closeEditor: () => void;
};

const CmsEditorContext = createContext<CmsEditorState | null>(null);

function CmsEditorSessionGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useCmsAuth();
  const { editMode, setEditMode, closeEditor } = useCmsEditor();

  useEffect(() => {
    if (loading) return;
    const canEdit =
      !!user && (user.role === "editor" || user.role === "super_admin");
    if (!canEdit && editMode) {
      closeEditor();
      setEditMode(false);
    }
  }, [loading, user, editMode, setEditMode, closeEditor]);

  return <>{children}</>;
}

export function CmsEditorProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditModeState] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeEditable, setActiveEditable] = useState<ActiveEditable | null>(null);

  const setEditMode = useCallback((next: boolean) => {
    setEditModeState(next);
    if (!next) {
      setPanelOpen(false);
      setActiveEditable(null);
    }
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditModeState((prev) => {
      const next = !prev;
      if (!next) {
        setPanelOpen(false);
        setActiveEditable(null);
      }
      return next;
    });
  }, []);

  const openEditorFor = useCallback((editable: ActiveEditable) => {
    setActiveEditable(editable);
    setPanelOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setPanelOpen(false);
    setActiveEditable(null);
  }, []);

  const value = useMemo(
    () => ({
      editMode,
      panelOpen,
      activeEditable,
      setEditMode,
      toggleEditMode,
      openEditorFor,
      closeEditor,
    }),
    [editMode, panelOpen, activeEditable, setEditMode, toggleEditMode, openEditorFor, closeEditor],
  );

  return (
    <CmsEditorContext.Provider value={value}>
      <CmsEditorSessionGuard>{children}</CmsEditorSessionGuard>
    </CmsEditorContext.Provider>
  );
}

export function useCmsEditor(): CmsEditorState {
  const ctx = useContext(CmsEditorContext);
  if (!ctx) {
    throw new Error("useCmsEditor must be used within CmsEditorProvider");
  }
  return ctx;
}

