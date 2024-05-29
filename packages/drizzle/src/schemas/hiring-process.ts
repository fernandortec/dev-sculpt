import { jobs } from "@/schemas/jobs";
import { resumes } from "@/schemas/resumes";
import { type InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const currentHiringStatusEnum = pgEnum("current_status", [
	"approved",
	"rejected",
	"in_progress",
]);

export const hiringProcess = pgTable("hiring_process", {
	id: serial("id").primaryKey().notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	currentStatus: currentHiringStatusEnum("current_status").notNull(),
	feedbackFromCompany: text("feedback_from_company"),

	resumeId: serial("resume_id")
		.notNull()
		.references(() => resumes.id, {
			onDelete: "cascade",
		}),
	jobId: text("job_id")
		.notNull()
		.references(() => jobs.id, {
			onDelete: "cascade",
		}),
});

export const hiringProcessRelations = relations(hiringProcess, ({ one }) => ({
	resume: one(resumes, {
		fields: [hiringProcess.resumeId],
		references: [resumes.id],
		relationName: "hiring_process_resume",
	}),

	job: one(jobs, {
		fields: [hiringProcess.jobId],
		references: [jobs.id],
		relationName: "hiring_process_job",
	}),
}));

export type HiringProcess = InferSelectModel<typeof hiringProcess>;
