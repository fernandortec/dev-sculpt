import { accounts } from "@/schemas/account";
import { companies } from "@/schemas/companies";
import { resumes } from "@/schemas/resumes";
import { createId } from "@paralleldrive/cuid2";
import {
	type InferInsertModel,
	type InferSelectModel,
	relations,
} from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userRolesEnum = pgEnum("role", ["jobseeker", "recruiter"]);

export const users = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),

	bio: text("bio"),
	role: userRolesEnum("role").notNull(),
	name: text("name").notNull(),
	email: text("email").unique().notNull(),
	avatarUrl: text("avatar_url").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),

	companyId: text("company_id").references(() => companies.id, {
		onDelete: "set null",
	}),
});

export const usersRelations = relations(users, ({ one, many }) => ({
	company: one(companies, {
		fields: [users.companyId],
		references: [companies.id],
		relationName: "recruiter_company",
	}),
	resume: one(resumes, {
		fields: [users.id],
		references: [resumes.userId],
		relationName: "user_resume",
	}),
	accounts: many(accounts),
}));

export type User = InferSelectModel<typeof users>;
export type CreateUser = InferInsertModel<typeof users>;
export interface UpdateUser extends Partial<CreateUser> {
	id: string;
}
