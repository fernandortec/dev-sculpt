import { accounts } from "@/schemas/accounts";
import { companies } from "@/schemas/companies";
import { resumes } from "@/schemas/resumes";
import type { Override } from "@sculpt/tsconfig";
import { type InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const userRolesEnum = pgEnum("role", ["jobseeker", "recruiter"]);

export const users = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => ulid())
		.notNull(),

	bio: text("bio"),
	role: userRolesEnum("role").notNull(),
	name: text("name").notNull(),
	email: text("email").unique().notNull(),
	passwordHash: text("password_hash"),
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
export type HttpUser = Override<User, { createdAt: string }>;
