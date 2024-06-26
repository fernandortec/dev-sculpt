import { jobs } from "@/schemas/jobs";
import { users } from "@/schemas/users";
import { type InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const companies = pgTable("companies", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => ulid())
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
