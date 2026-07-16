import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Load repo-root `.env` so `pnpm dev:api` picks up DATABASE_URL without manual export. */
const here = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(here, "../../../.env") });
