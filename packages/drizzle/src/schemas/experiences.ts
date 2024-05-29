import { resumes } from "@/schemas/resumes";
import { type InferSelectModel, relations } from "drizzle-orm";

import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const experiences = pgTable("experiences", {
	id: serial("id").primaryKey().notNull(),

	companyName: text("company_name").notNull(),
	description: text("description"),
	employedTimeInMonths: integer("employed_time_in_months").notNull(),
	isCurrentlyEmployed: boolean("is_currently_employed").notNull(),

	resumeId: serial("resume_id")
		.notNull()
		.references(() => resumes.id, {
			onDelete: "cascade",
		}),
});

export const experiencesRelations = relations(experiences, ({ one }) => ({
	owner: one(resumes, {
		fields: [experiences.resumeId],
		references: [resumes.id],
		relationName: "experience_resume",
	}),
}));

export type Experience = InferSelectModel<typeof experiences>;
