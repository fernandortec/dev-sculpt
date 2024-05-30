DO $$ BEGIN
 CREATE TYPE "provider" AS ENUM('github', 'google', 'linkedin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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
	"password_hash" text,
	"avatar_url" text NOT NULL,
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
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"current_status" "current_status" NOT NULL,
	"feedback_from_company" text,
	"resume_id" serial NOT NULL,
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
	"id" serial PRIMARY KEY NOT NULL,
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
	"user_id" serial NOT NULL,
	"stage_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"description" text,
	"employed_time_in_months" integer NOT NULL,
	"is_currently_employed" boolean NOT NULL,
	"resume_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" "provider" NOT NULL,
	"provider_account_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hiring_process" ADD CONSTRAINT "hiring_process_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hiring_process" ADD CONSTRAINT "hiring_process_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stages" ADD CONSTRAINT "stages_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes_to_stages" ADD CONSTRAINT "resumes_to_stages_user_id_resumes_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resumes_to_stages" ADD CONSTRAINT "resumes_to_stages_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experiences" ADD CONSTRAINT "experiences_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_user_id_unique" ON "accounts" ("provider","user_id");