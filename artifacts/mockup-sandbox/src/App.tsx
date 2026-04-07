import { useEffect, useState, type ComponentType } from "react";

import { modules as discoveredModules } from "./.generated/mockup-components";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }

      try {
        const mod = await loader();
        if (cancelled) {
          return;
        }
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) {
          return;
        }

        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();

    return () => {
      cancelled = true;
    };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) return null;

  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function getPreviewExamplePath(): string {
  const basePath = getBasePath();
  return `${basePath}/preview/ComponentName`;
}

function Gallery() {
  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Dot-grid background texture */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Radial glow — accent atmosphere at top */}
      <div
        className="absolute inset-x-0 top-0 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg animate-in-up">
        {/* Icon lockup */}
        <div
          className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border"
          style={{
            background: "hsl(var(--card))",
            borderColor: "rgba(127,127,127,0.14)",
            boxShadow:
              "0 0 0 1px rgba(127,127,127,0.06), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            stroke="hsl(var(--primary))"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" />
            <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5Z" />
            <path d="M4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4Z" />
            <path d="M14 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4Z" />
          </svg>
        </div>

        {/* Eyebrow — monospace label */}
        <p
          className="mb-3 text-xs font-medium uppercase tracking-widest"
          style={{
            fontFamily: "var(--font-mono)",
            color: "hsl(var(--primary))",
            letterSpacing: "0.12em",
          }}
        >
          Mockup Canvas
        </p>

        {/* Headline */}
        <h1
          className="mb-4 text-3xl font-semibold text-balance"
          style={{
            color: "hsl(var(--foreground))",
            letterSpacing: "-0.028em",
            lineHeight: "1.12",
          }}
        >
          Component Preview Server
        </h1>

        {/* Description */}
        <p
          className="mb-8 text-base leading-relaxed"
          style={{
            color: "hsl(var(--muted-foreground))",
            letterSpacing: "-0.008em",
          }}
        >
          This server renders individual React components for the workspace
          canvas. Access any component by its preview URL below.
        </p>

        {/* Code path card */}
        <div
          className="w-full rounded-xl px-5 py-4"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid rgba(127,127,127,0.12)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <p
            className="mb-2 text-left text-xs font-medium uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "hsl(var(--muted-foreground))",
              letterSpacing: "0.08em",
            }}
          >
            Preview route
          </p>
          <code
            className="block w-full rounded-lg px-4 py-2.5 text-sm text-left break-all"
            style={{
              fontFamily: "var(--font-mono)",
              background: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
              border: "1px solid rgba(127,127,127,0.10)",
              letterSpacing: "0.01em",
            }}
          >
            {getPreviewExamplePath()}
          </code>
        </div>

        {/* Bottom status indicator */}
        <div className="mt-10 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "hsl(142 60% 52%)" }}
          />
          <span
            className="text-xs"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}
          >
            server running
          </span>
        </div>
      </div>
    </div>
  );
}

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

function App() {
  const previewPath = getPreviewPath();

  if (previewPath) {
    return (
      <PreviewRenderer
        componentPath={previewPath}
        modules={discoveredModules}
      />
    );
  }

  return <Gallery />;
}

export default App;
