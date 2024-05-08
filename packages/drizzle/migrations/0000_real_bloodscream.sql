DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('jobseeker', 'recruiter');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "current_status" AS ENUM('approved', 'rejected', 'in_progress');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "seniority" AS ENUM('intern', 'junior', 'mid-level', 'senior', 'lead', 'manager', 'cto');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "work_location_type" AS ENUM('remote', 'on-site', 'hybrid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('closed', 'open');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"bio" text,
	"role" "role" NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"company_id" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"logo_url" text,
	"corporate_tax_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "companies_email_unique" UNIQUE("email"),
	CONSTRAINT "companies_corporate_tax_code_unique" UNIQUE("corporate_tax_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hiring_process" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"current_status" "current_status" NOT NULL,
	"feedback_from_company" text,
	"resume_id" text NOT NULL,
	"job_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"stacks" text[] NOT NULL,
	"seniority" "seniority" NOT NULL,
	"description" text NOT NULL,
	"requirements" text[] NOT NULL,
	"work_location_type" "work_location_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"company_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resumes" (
	"id" text PRIMARY KEY NOT NULL,
	"skills" text[] NOT NULL,
	"email_for_contact" text NOT NULL,
	"phone_number" text,
	"user_id" text NOT NULL,
	CONSTRAINT "resumes_email_for_contact_unique" UNIQUE("email_for_contact"),
	CONSTRAINT "resumes_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stages" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"stacks" text[] NOT NULL,
	"status" "status" DEFAULT 'open' NOT NULL,
	"description" text NOT NULL,
	"job_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resumes_to_stages" (
	"user_id" text NOT NULL,
	"stage_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hiring_process" ADD CONSTRAINT "hiring_process_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hiring_process" ADD CONSTRAINT "hiring_process_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stages" ADD CONSTRAINT "stages_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes_to_stages" ADD CONSTRAINT "resumes_to_stages_user_id_resumes_id_fk" FOREIGN KEY ("user_id") REFERENCES "resumes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes_to_stages" ADD CONSTRAINT "resumes_to_stages_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "stages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
