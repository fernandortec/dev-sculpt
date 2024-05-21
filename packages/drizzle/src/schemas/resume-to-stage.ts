import { resumes } from "@/schemas/resumes";
import { stages } from "@/schemas/stages";
import { type InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const resumeToStage = pgTable("resumes_to_stages", {
	resumeId: text("user_id")
		.notNull()
		.references(() => resumes.id, { onDelete: "cascade" })
		.notNull(),
	stageId: text("stage_id")
		.notNull()
		.references(() => stages.id, { onDelete: "cascade" })
		.notNull(),
});

export const resumesToStagesRelations = relations(resumeToStage, ({ one }) => ({
	resume: one(resumes, {
		fields: [resumeToStage.resumeId],
		references: [resumes.id],
		relationName: "resume_to_stage_resume",
	}),
	stage: one(stages, {
		fields: [resumeToStage.stageId],
		references: [stages.id],
		relationName: "resume_to_stage_stage",
	}),
}));

export type ResumeToStage = InferSelectModel<typeof resumeToStage>;
