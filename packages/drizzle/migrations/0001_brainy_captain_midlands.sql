CREATE TABLE IF NOT EXISTS "experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"description" text,
	"employed_time_in_months" integer NOT NULL,
	"is_currently_employed" boolean NOT NULL,
	"resume_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experiences" ADD CONSTRAINT "experiences_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
