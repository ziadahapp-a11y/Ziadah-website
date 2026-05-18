import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

/** Defaults allow `vite build` in CI; set PORT and BASE_PATH when running dev/preview on Replit. */
const rawPort = process.env.PORT ?? "5000";
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

/** Replit proxy: HMR must use the public HTTPS host, not localhost. */
const isReplit = process.env.REPL_ID !== undefined;
const replitDevHost =
  process.env.REPLIT_DEV_DOMAIN ??
  process.env.REPLIT_DOMAINS?.split(",")[0]?.trim();

/** Single `.env` at monorepo root (DATABASE_URL, VITE_*, etc.). */
const envDir = path.resolve(import.meta.dirname, "../..");

/** Phase 5: forward `/api/*` to the API server in dev so `fetch("/api/content")` works with empty VITE_API_BASE_URL. */
const apiProxyTarget =
  process.env.API_SERVER_PROXY_TARGET ?? "http://127.0.0.1:8080";

export default defineConfig({
  base: basePath,
  envDir,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: true,
    watch: isReplit
      ? {
          usePolling: true,
          interval: 200,
        }
      : undefined,
    hmr:
      isReplit && replitDevHost
        ? {
            protocol: "wss",
            host: replitDevHost,
            clientPort: 443,
          }
        : true,
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
