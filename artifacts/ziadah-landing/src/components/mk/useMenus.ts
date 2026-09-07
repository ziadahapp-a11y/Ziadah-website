import { useCallback, useEffect, useRef, useState } from "react";
import { useMotion } from "@/motion/MotionProvider";

/* Mega-menu and mobile-panel behaviour.
   Everything here works with the motion libraries absent — these are plain DOM
   listeners and React state, so navigation keeps functioning if the motion
   bundle fails to load. */

const DESKTOP_MIN = 1025; // matches the CSS breakpoint that reveals .nav-row
const HOVER_CLOSE_DELAY = 120;

export type MegaMenu = {
  openKey: string | null;
  /** Props for the <ul data-menu-root> that wraps the nav items. */
  rootProps: {
    ref: React.RefObject<HTMLUListElement | null>;
    onBlur: (e: React.FocusEvent) => void;
  };
  /** Props for one <li> nav item. */
  itemProps: (key: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  /** Props for the button that opens a panel. */
  triggerProps: (key: string) => {
    "aria-expanded": boolean;
    "aria-haspopup": true;
    onClick: (e: React.MouseEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    ref: (el: HTMLButtonElement | null) => void;
  };
  /** Props for the panel itself. `extra` carries a layout modifier. */
  panelProps: (key: string, extra?: string) => {
    className: string;
    ref: (el: HTMLDivElement | null) => void;
  };
  closeAll: () => void;
};

export function useMegaMenu(): MegaMenu {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const rootRef = useRef<HTMLUListElement | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement | null>());
  const panels = useRef(new Map<string, HTMLDivElement | null>());
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Whether the currently open panel was opened by hover rather than by an
  // explicit activation. A mouse click that follows a hover-open would
  // otherwise read as "toggle off" and shut the panel the pointer just opened.
  const openedByHover = useRef(false);

  const closeAll = useCallback(() => setOpenKey(null), []);

  // Close on outside click and on Escape (returning focus to the trigger,
  // which is what makes the menu usable from the keyboard alone).
  useEffect(() => {
    if (!openKey) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-menu-item]")) return;
      setOpenKey(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = triggers.current.get(openKey);
      setOpenKey(null);
      trigger?.focus();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openKey]);

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  return {
    openKey,
    rootProps: {
      ref: rootRef,
      onBlur: (e: React.FocusEvent) => {
        // Tabbing out of the whole menu closes it.
        if (!rootRef.current) return;
        const next = e.relatedTarget as Node | null;
        if (next && rootRef.current.contains(next)) return;
        setOpenKey(null);
      },
    },
    itemProps: (key: string) => ({
      onMouseEnter: () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        if (window.innerWidth < DESKTOP_MIN) return;
        openedByHover.current = true;
        setOpenKey(key);
      },
      onMouseLeave: () => {
        // Hover intent: a short grace period so crossing the gap between the
        // trigger and the panel doesn't close it.
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => {
          setOpenKey((cur) => (cur === key ? null : cur));
        }, HOVER_CLOSE_DELAY);
      },
    }),
    triggerProps: (key: string) => ({
      "aria-expanded": openKey === key,
      "aria-haspopup": true as const,
      onClick: (e: React.MouseEvent) => {
        // `detail === 0` is a keyboard activation (Enter/Space), which always
        // toggles. A real pointer click on a panel that hover already opened is
        // a move toward the menu, not a dismissal.
        //
        // The check has to happen inside the functional update, not against
        // `openKey` from this render: a pointer click arrives in the same task
        // as the `mouseenter` that opened the panel, so the render closure
        // still says `null` and a naive toggle would close what hover had just
        // opened.
        const fromKeyboard = e.detail === 0;
        setOpenKey((cur) => {
          if (cur === key && !fromKeyboard && openedByHover.current) return cur;
          openedByHover.current = false;
          return cur === key ? null : key;
        });
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowDown") return;
        e.preventDefault();
        openedByHover.current = false;
        setOpenKey(key);
        // Wait for the panel to become focusable before moving into it.
        requestAnimationFrame(() => {
          panels.current.get(key)?.querySelector<HTMLElement>(".mega-card, .mega-link")?.focus();
        });
      },
      ref: (el: HTMLButtonElement | null) => {
        triggers.current.set(key, el);
      },
    }),
    panelProps: (key: string, extra?: string) => ({
      className: [openKey === key ? "mega is-open" : "mega", extra].filter(Boolean).join(" "),
      ref: (el: HTMLDivElement | null) => {
        panels.current.set(key, el);
      },
    }),
    closeAll,
  };
}

export type Drawer = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  drawerRef: React.RefObject<HTMLElement | null>;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * The mobile navigation panel. The panel itself is a full-viewport fixed
 * layer; this hook owns what CSS cannot: the scroll lock (both the body and
 * Lenis, or the wheel still drives the virtual scroll), Escape, and focus.
 */
export function useDrawer(): Drawer {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const { lenis } = useMotion();

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    /* MEASURED: the reference locks with `html.no-scroll { overflow: hidden }`
       (spec/05-header.md probe 25) - the class on <html>, not an inline style on
       <body>. `system.css` already carries that rule; this is what makes it live.
       Lenis is stopped as well, because the virtual scroller ignores overflow. */
    document.documentElement.classList.add("no-scroll");
    lenis?.stop();

    // Move focus into the panel — the toggle stays in the header as the close
    // control, so focusing it back would be a no-op for a keyboard user.
    const focusTimer = requestAnimationFrame(() => {
      drawerRef.current?.querySelector<HTMLElement>(".mob-row")?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("no-scroll");
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Restore focus to whatever opened the panel, but only after a real close —
  // not on first mount.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !isOpen) lastFocus.current?.focus?.();
    wasOpen.current = isOpen;
  }, [isOpen]);

  return { isOpen, open, close, drawerRef, closeBtnRef };
}
