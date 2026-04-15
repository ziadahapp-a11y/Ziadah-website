/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API origin (e.g. http://localhost:3000). Empty = same origin. */
  readonly VITE_API_BASE_URL?: string;
  /** Legacy alias used by some tools; prefer VITE_API_BASE_URL. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
