import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { storesTable } from "./stores";

export interface AnchorRecommendation {
  productId: number;
  role: "cross_sell" | "upsell";
  reason: string;
}

export interface AnchorGroup {
  productId: number;
  reason: string;
  recommendations: AnchorRecommendation[];
}

export const analysesTable = pgTable("analyses", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
  mainProductId: integer("main_product_id"),
  mainProductReason: text("main_product_reason"),
  crossSellIds: jsonb("cross_sell_ids").$type<number[]>().default([]),
  crossSellReasons: jsonb("cross_sell_reasons").$type<Record<number, string>>().default({}),
  upsellIds: jsonb("upsell_ids").$type<number[]>().default([]),
  upsellReasons: jsonb("upsell_reasons").$type<Record<number, string>>().default({}),
  summary: text("summary").notNull().default(""),
  anchorsJson: jsonb("anchors_json").$type<AnchorGroup[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAnalysisSchema = createInsertSchema(analysesTable).omit({ id: true, createdAt: true });
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analysesTable.$inferSelect;
