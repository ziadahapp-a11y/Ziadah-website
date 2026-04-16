import { pgTable, text, serial, timestamp, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const storesTable = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  platform: text("platform"),
  status: text("status").notNull().default("pending"),
  productCount: integer("product_count").notNull().default(0),
  industry: text("industry"),
  monthlyUsers: integer("monthly_users"),
  conversionRate: real("conversion_rate"),
  avgOrderValue: real("avg_order_value"),
  currency: text("currency"),
  currencySymbol: text("currency_symbol"),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
  lastAnalyzedAt: timestamp("last_analyzed_at", { withTimezone: true }),
  /** Set when status becomes "error" (scraping or AI failure); cleared on new successful runs */
  lastError: text("last_error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStoreSchema = createInsertSchema(storesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof storesTable.$inferSelect;
