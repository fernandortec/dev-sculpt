import { companies } from "@/schemas/companies";
import { stages } from "@/schemas/stages";
import { type InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

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
		.$defaultFn(() => ulid())
		.notNull(),

	name: text("name").notNull(),
	stacks: text("stacks").array().notNull(),
	seniority: jobsSenioritySchema("seniority").notNull(),
	description: text("description").notNull(),
	requirements: text("requirements").array().notNull(),
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

export type Job = InferSelectModel<typeof jobs>;
