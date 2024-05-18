import { jobs } from "@/schemas/jobs";
import { createId } from "@paralleldrive/cuid2";
import { type InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const stageStatusEnum = pgEnum("status", ["closed", "open"]);

export const stages = pgTable("stages", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),

	name: text("name").notNull(),
	stacks: text("stacks").array().notNull(),
	status: stageStatusEnum("status").notNull().default("open"),
	description: text("description").notNull(),

	jobId: text("job_id")
		.notNull()
		.references(() => jobs.id, {
			onDelete: "cascade",
		}),
});

export const stagesRelations = relations(stages, ({ one, many }) => ({
	job: one(jobs, {
		fields: [stages.jobId],
		references: [jobs.id],
		relationName: "stage_job",
	}),
}));

export type Stage = InferSelectModel<typeof stages>;