DROP TABLE "auth_links";--> statement-breakpoint
DROP INDEX IF EXISTS "accounts_provider_user_id_unique";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_user_id_unique" ON "accounts" ("provider","user_id");