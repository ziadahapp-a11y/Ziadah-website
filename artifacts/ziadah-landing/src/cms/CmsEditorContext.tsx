import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

export function CmsEditorProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeEditable, setActiveEditable] = useState<ActiveEditable | null>(null);

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => {
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
    [editMode, panelOpen, activeEditable, toggleEditMode, openEditorFor, closeEditor],
  );

  return (
    <CmsEditorContext.Provider value={value}>{children}</CmsEditorContext.Provider>
  );
}

export function useCmsEditor(): CmsEditorState {
  const ctx = useContext(CmsEditorContext);
  if (!ctx) {
    throw new Error("useCmsEditor must be used within CmsEditorProvider");
  }
  return ctx;
}

