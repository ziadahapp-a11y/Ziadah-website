import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Absolute path to the on-disk uploads directory.
 *
 * Resolution order:
 *  1. `UPLOADS_DIR` env var, if set.
 *  2. A writable temp directory when the api-server root is not writable
 *     (e.g. serverless platforms like Vercel expose a read-only filesystem
 *     except for the OS temp dir). Uploads there are ephemeral.
 *  3. `<api-server root>/uploads` for a normal long-running server.
 */
function resolveUploadsDir(): string {
  if (process.env.UPLOADS_DIR) {
    return path.resolve(process.env.UPLOADS_DIR);
  }
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "ziadah-uploads");
  }
  return path.resolve(__dirname, "../../uploads");
}

export const uploadsDir = resolveUploadsDir();

export function ensureUploadsDir(): void {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (err) {
    // Never let a non-writable filesystem crash startup; uploads simply
    // remain unavailable until a writable UPLOADS_DIR is configured.
    // eslint-disable-next-line no-console
    console.warn(
      `Could not create uploads directory "${uploadsDir}": ${(err as Error).message}. File uploads are disabled.`,
    );
  }
}
