/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API origin (e.g. http://localhost:3000). Empty = same origin. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
