import { resumes } from "@/schemas/resumes";
import { companies } from "@/schemas/companies";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userRolesEnum = pgEnum("role", ["jobseeker", "recruiter"]);

export const users = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),

	bio: text("bio"),
	role: userRolesEnum("role").notNull(),
	name: text("name").notNull(),
	email: text("email").unique().notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),

	companyId: text("company_id").references(() => companies.id, {
		onDelete: "set null",
	}),
});

export const usersRelations = relations(users, ({ one }) => ({
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
}));
