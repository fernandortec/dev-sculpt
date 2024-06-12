import { experiences } from "@/schemas/experiences";
import { users } from "@/schemas/users";
import { type InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const resumes = pgTable("resumes", {
	id: serial("id").primaryKey().notNull(),

	skills: text("skills").array().notNull(),
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
