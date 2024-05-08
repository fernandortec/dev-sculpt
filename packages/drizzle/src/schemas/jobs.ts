import { companies } from "@/schemas/companies";
import { stages } from "@/schemas/stages";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const jobsSenioritySchema = pgEnum("seniority", [
	"intern",
	"junior",
	"mid-level",
	"senior",
	"lead",
	"manager",
	"cto",
]);

export const workLocationType = pgEnum("work_location_type", [
	"remote",
	"on-site",
	"hybrid",
]);

export const jobs = pgTable("jobs", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),

	name: text("name").notNull(),
	stacks: text("stacks").array().notNull(),
	seniority: jobsSenioritySchema("seniority").notNull(),
	description: text("description").notNull(),
	requirementes: text("requirements").array().notNull(),
	workLocationType: workLocationType("work_location_type").notNull(),
	
	createdAt: timestamp("created_at").notNull().defaultNow(),

	companyId: text("company_id")
		.notNull()
		.references(() => companies.id, {
			onDelete: "cascade",
		}),
});

export const jobsRelations = relations(jobs, ({ one, many }) => ({
	company: one(companies, {
		fields: [jobs.companyId],
		references: [companies.id],
		relationName: "job_company",
	}),
	stages: many(stages),
}));
