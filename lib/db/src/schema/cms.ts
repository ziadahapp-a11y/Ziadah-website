import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const cmsUserRoleEnum = pgEnum("cms_user_role", [
  "super_admin",
  "editor",
  "viewer",
]);

export const contentBlockTypeEnum = pgEnum("content_block_type", [
  "text",
  "richtext",
  "image_url",
  "color",
  "number",
  "boolean",
]);

export const cmsUsersTable = pgTable("cms_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: cmsUserRoleEnum("role").notNull(),
  mustChangePassword: boolean("must_change_password").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  isActive: boolean("is_active").notNull().default(true),
});

export const contentBlocksTable = pgTable("content_blocks", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 512 }).notNull().unique(),
  value: text("value").notNull().default(""),
  type: contentBlockTypeEnum("type").notNull(),
  page: varchar("page", { length: 128 }).notNull(),
  section: varchar("section", { length: 128 }).notNull(),
  label: varchar("label", { length: 512 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedBy: uuid("updated_by").references(() => cmsUsersTable.id, {
    onDelete: "set null",
  }),
});

export const cmsPagesTable = pgTable("cms_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 320 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  metaDescription: text("meta_description").notNull().default(""),
  sectionsConfig: jsonb("sections_config")
    .$type<Array<{ id: string; label: string; hidden: boolean }>>()
    .notNull()
    .default([]),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: uuid("created_by").references(() => cmsUsersTable.id, {
    onDelete: "set null",
  }),
});

export const cmsMediaTable = pgTable("cms_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  filename: varchar("filename", { length: 512 }).notNull(),
  url: text("url").notNull(),
  size: integer("size").notNull(),
  type: varchar("type", { length: 128 }).notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  uploadedBy: uuid("uploaded_by").references(() => cmsUsersTable.id, {
    onDelete: "set null",
  }),
});

export const cmsAuditLogTable = pgTable("cms_audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => cmsUsersTable.id, {
    onDelete: "set null",
  }),
  action: varchar("action", { length: 128 }).notNull(),
  targetTable: varchar("target_table", { length: 128 }).notNull(),
  targetId: uuid("target_id"),
  oldValue: jsonb("old_value"),
  newValue: jsonb("new_value"),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const cmsUsersRelations = relations(cmsUsersTable, ({ many }) => ({
  contentBlockUpdates: many(contentBlocksTable),
  pagesCreated: many(cmsPagesTable),
  mediaUploaded: many(cmsMediaTable),
  auditEntries: many(cmsAuditLogTable),
}));

export const contentBlocksRelations = relations(contentBlocksTable, ({ one }) => ({
  updatedByUser: one(cmsUsersTable, {
    fields: [contentBlocksTable.updatedBy],
    references: [cmsUsersTable.id],
  }),
}));

export const cmsPagesRelations = relations(cmsPagesTable, ({ one }) => ({
  creator: one(cmsUsersTable, {
    fields: [cmsPagesTable.createdBy],
    references: [cmsUsersTable.id],
  }),
}));

export const cmsMediaRelations = relations(cmsMediaTable, ({ one }) => ({
  uploader: one(cmsUsersTable, {
    fields: [cmsMediaTable.uploadedBy],
    references: [cmsUsersTable.id],
  }),
}));

export const cmsAuditLogRelations = relations(cmsAuditLogTable, ({ one }) => ({
  user: one(cmsUsersTable, {
    fields: [cmsAuditLogTable.userId],
    references: [cmsUsersTable.id],
  }),
}));

export type CmsUser = typeof cmsUsersTable.$inferSelect;
export type NewCmsUser = typeof cmsUsersTable.$inferInsert;
export type ContentBlock = typeof contentBlocksTable.$inferSelect;
export type NewContentBlock = typeof contentBlocksTable.$inferInsert;
export type CmsPage = typeof cmsPagesTable.$inferSelect;
export type NewCmsPage = typeof cmsPagesTable.$inferInsert;
export type CmsMedia = typeof cmsMediaTable.$inferSelect;
export type NewCmsMedia = typeof cmsMediaTable.$inferInsert;
export type CmsAuditLog = typeof cmsAuditLogTable.$inferSelect;
export type NewCmsAuditLog = typeof cmsAuditLogTable.$inferInsert;
