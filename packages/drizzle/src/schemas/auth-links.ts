import { users } from "@/schemas/users";
import { createId } from "@paralleldrive/cuid2";
import {
	type InferInsertModel,
	type InferSelectModel,
	relations,
} from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const authLinks = pgTable("auth_links", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),

	code: text("code").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow(),

	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
});

export const authLinksRelations = relations(authLinks, ({ one }) => ({
	user: one(users, {
		fields: [authLinks.id],
		references: [users.id],
		relationName: "auth_links_user",
	}),
}));

export type AuthLink = InferSelectModel<typeof authLinks>;
export type CreateAuthLink = InferInsertModel<typeof authLinks>;
