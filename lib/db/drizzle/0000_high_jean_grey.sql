CREATE TYPE "public"."cms_user_role" AS ENUM('super_admin', 'editor', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."content_block_type" AS ENUM('text', 'richtext', 'image_url', 'color', 'number', 'boolean');--> statement-breakpoint
CREATE TABLE "cms_audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action" varchar(128) NOT NULL,
	"target_table" varchar(128) NOT NULL,
	"target_id" uuid,
	"old_value" jsonb,
	"new_value" jsonb,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cms_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" varchar(512) NOT NULL,
	"url" text NOT NULL,
	"size" integer NOT NULL,
	"type" varchar(128) NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"uploaded_by" uuid
);
--> statement-breakpoint
CREATE TABLE "cms_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(320) NOT NULL,
	"title" varchar(512) NOT NULL,
	"meta_description" text DEFAULT '' NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	CONSTRAINT "cms_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cms_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "cms_user_role" NOT NULL,
	"must_change_password" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_login" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "cms_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "content_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar(512) NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"type" "content_block_type" NOT NULL,
	"page" varchar(128) NOT NULL,
	"section" varchar(128) NOT NULL,
	"label" varchar(512) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" uuid,
	CONSTRAINT "content_blocks_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "cms_audit_log" ADD CONSTRAINT "cms_audit_log_user_id_cms_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."cms_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cms_media" ADD CONSTRAINT "cms_media_uploaded_by_cms_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."cms_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cms_pages" ADD CONSTRAINT "cms_pages_created_by_cms_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."cms_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_blocks" ADD CONSTRAINT "content_blocks_updated_by_cms_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."cms_users"("id") ON DELETE set null ON UPDATE no action;