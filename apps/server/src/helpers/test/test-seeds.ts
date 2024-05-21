import {
	accounts,
	companies,
	db,
	experiences,
	hiringProcess,
	jobs,
	resumeToStage,
	resumes,
	stages,
	users,
} from "@sculpt/drizzle";

import { faker } from "@faker-js/faker";
import { hash } from "bcrypt-ts";

await db.delete(resumeToStage);
await db.delete(stages);
await db.delete(resumes);
await db.delete(users);
await db.delete(accounts);
await db.delete(companies);
await db.delete(jobs);
await db.delete(experiences);
await db.delete(hiringProcess);

console.log("Database cleaned!");

const [jobseeker, recruiter] = await db
	.insert(users)
	.values([
		{
			name: "Fernando Rodrigues",
			email: "fernandorfigueiredotec@gmail.com",
			avatarUrl: faker.image.avatarGitHub(),
			role: "recruiter",
			passwordHash: await hash("12345678", 0),
		},
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			avatarUrl: faker.image.avatarGitHub(),
			role: "recruiter",
			passwordHash: faker.internet.password(),
		},
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			avatarUrl: faker.image.avatarGitHub(),
			role: "jobseeker",
			passwordHash: faker.internet.password(),
		},
	])
	.returning();

console.log("Users created!");

await db.insert(accounts).values([
	{
		provider: "github",
		providerAccountId: faker.database.mongodbObjectId(),
		userId: jobseeker.id,
	},
]);

await db.insert(accounts).values([
	{
		provider: "linkedin",
		providerAccountId: faker.database.mongodbObjectId(),
		userId: recruiter.id,
	},
]);

console.log("Accounts created!");

const [firstCompany, secondCompany] = await db
	.insert(companies)
	.values([
		{
			corporateTaxCode: faker.company.buzzNoun(),
			email: faker.internet.exampleEmail(),
			logoUrl: faker.image.urlLoremFlickr(),
		},
		{
			corporateTaxCode: faker.company.buzzNoun(),
			email: faker.internet.exampleEmail(),
			logoUrl: faker.image.urlLoremFlickr(),
		},
	])
	.returning();

console.log("Companies created!");

const [firstResume, secondResume] = await db
	.insert(resumes)
	.values([
		{
			emailForContact: faker.internet.email(),
			userId: jobseeker.id,
			skills: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
		},
		{
			emailForContact: faker.internet.email(),
			userId: jobseeker.id,
			skills: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
		},
	])
	.returning();

console.log("Resumes created!");

await db
	.insert(experiences)
	.values([
		{
			companyName: faker.company.name(),
			employedTimeInMonths: faker.number.int({ max: 128, min: 12 }),
			isCurrentlyEmployed: faker.helpers.arrayElement([true, false]),
			resumeId: firstResume.id,
		},
		{
			companyName: faker.company.name(),
			employedTimeInMonths: faker.number.int({ max: 128, min: 12 }),
			isCurrentlyEmployed: faker.helpers.arrayElement([true, false]),
			resumeId: secondResume.id,
		},
	])
	.returning();

console.log("Companies created!");

const [firstJob, secondJob] = await db
	.insert(jobs)
	.values([
		{
			name: faker.company.name(),
			companyId: firstCompany.id,
			description: faker.lorem.paragraphs(),
			requirements: faker.helpers.arrayElements([
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
			]),
			seniority: faker.helpers.arrayElement([
				"junior",
				"mid-level",
				"senior",
			]) as
				| "intern"
				| "junior"
				| "mid-level"
				| "senior"
				| "lead"
				| "manager"
				| "cto",
			stacks: faker.helpers.arrayElements([
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
			]),
			workLocationType: faker.helpers.arrayElement([
				"hybrid",
				"remote",
				"on-site",
			]) as "hybrid" | "remote" | "on-site",
		},
		{
			companyId: secondCompany.id,
			description: faker.lorem.paragraphs(),
			name: faker.company.name(),
			requirements: faker.helpers.arrayElements([
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
			]),
			seniority: faker.helpers.arrayElement([
				"junior",
				"mid-level",
				"senior",
			]) as
				| "intern"
				| "junior"
				| "mid-level"
				| "senior"
				| "lead"
				| "manager"
				| "cto",
			stacks: faker.helpers.arrayElements([
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
			]),
			workLocationType: faker.helpers.arrayElement([
				"hybrid",
				"remote",
				"on-site",
			]) as "hybrid" | "remote" | "on-site",
		},
	])
	.returning();

console.log("Jobs created!");

const [firstStage, secondStage] = await db
	.insert(stages)
	.values([
		{
			description: faker.lorem.paragraphs(3),
			jobId: firstJob.id,
			name: faker.commerce.productName(),
			stacks: faker.helpers.arrayElements([
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
			]),
		},
		{
			description: faker.lorem.paragraphs(3),
			jobId: secondJob.id,
			name: faker.commerce.productName(),
			stacks: faker.helpers.arrayElements([
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
				faker.lorem.word(),
			]),
		},
	])
	.returning();

await db
	.insert(resumeToStage)
	.values([{ resumeId: firstResume.id, stageId: firstStage.id }]);

await db
	.insert(resumeToStage)
	.values([{ resumeId: secondResume.id, stageId: secondStage.id }]);

console.log("Database seeded!");
process.exit(0);
