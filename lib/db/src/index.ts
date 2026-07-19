import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Run without a database instead of crashing at startup: the server boots
  // and non-database routes (e.g. health checks) work; only database-backed
  // features are unavailable until DATABASE_URL is configured.
  // eslint-disable-next-line no-console
  console.warn(
    "DATABASE_URL is not set — starting without a database. Database-backed routes will return errors until it is configured.",
  );
}

export const pool = new Pool(
  connectionString ? { connectionString } : {},
);
export const db = drizzle(pool, { schema });

export * from "./schema";
