import { users } from "@/schemas/users";

import { type InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

const providersEnum = pgEnum("provider", ["google", "github", "linkedin"]);

export const accounts = pgTable(
	"accounts",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => ulid())
			.notNull(),

		provider: providersEnum("provider").notNull(),
		providerAccountId: text("provider_account_id").notNull(),

		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
	},
	(table) => ({
		providerUserIdUniqueness: uniqueIndex(
			"accounts_provider_user_id_unique",
		).on(table.provider, table.userId),
	}),
);

export const accountsRelation = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
		relationName: "user_accounts",
	}),
}));

export type Account = InferSelectModel<typeof accounts>;
