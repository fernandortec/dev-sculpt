import { users } from "@/schemas/users";
import { createId } from "@paralleldrive/cuid2";
import {
	type InferInsertModel,
	type InferSelectModel,
	relations,
} from "drizzle-orm";
import { pgEnum, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";

const providersEnum = pgEnum("provider", ["google", "github", "linkedin"]);

export const accounts = pgTable(
	"accounts",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
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
export type CreateAccount = InferInsertModel<typeof accounts>;
export interface UpdateAccount extends Partial<CreateAccount> {
	id: string;
}
