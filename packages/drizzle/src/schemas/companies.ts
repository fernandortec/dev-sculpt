import { jobs } from "@/schemas/jobs";
import { users } from "@/schemas/users";
import { createId } from "@paralleldrive/cuid2";
import {
	type InferInsertModel,
	type InferSelectModel,
	Update,
	relations,
} from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),

	email: text("email").unique().notNull(),
	logoUrl: text("logo_url"),
	corporateTaxCode: text("corporate_tax_code").unique().notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const companiesRelations = relations(companies, ({ many }) => ({
	recruiters: many(users),
	jobs: many(jobs),
}));

export type Company = InferSelectModel<typeof companies>;
export type CreateCompany = InferInsertModel<typeof companies>;
export interface UpdateCompany extends Partial<CreateCompany> {
	id: string;
}
