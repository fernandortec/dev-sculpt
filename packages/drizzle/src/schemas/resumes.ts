import { experiences } from "@/schemas/experiences";
import { users } from "@/schemas/users";
import { createId } from "@paralleldrive/cuid2";
import {
	type InferInsertModel,
	type InferSelectModel,
	relations,
} from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const resumes = pgTable("resumes", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),

	skills: text("skills").array().notNull(),
	emailForContact: text("email_for_contact").notNull().unique(),
	phoneNumber: text("phone_number").unique(),

	userId: text("user_id")
		.notNull()
		.references(() => users.id, {
			onDelete: "cascade",
		}),
});

export const resumesRelations = relations(resumes, ({ one, many }) => ({
	user: one(users, {
		fields: [resumes.userId],
		references: [users.id],
		relationName: "resume_user",
	}),
	experiences: many(experiences),
}));

export type Resume = InferSelectModel<typeof resumes>;
export type CreateResume = InferInsertModel<typeof resumes>;
export interface UpdateResume extends Partial<CreateResume> {
	id: string;
}
