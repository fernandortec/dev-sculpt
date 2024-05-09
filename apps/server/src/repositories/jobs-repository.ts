import type { CreateJob, Job, UpdateJob } from "@sculpt/drizzle";

export interface JobsRepository {
	create({
		companyId,
		description,
		name,
		requirementes,
		seniority,
		stacks,
		workLocationType,
		createdAt,
		id,
	}: CreateJob): Promise<Job>;
	update({
		companyId,
		description,
		name,
		requirementes,
		seniority,
		stacks,
		workLocationType,
		createdAt,
		id,
	}: UpdateJob): Promise<Job>;
	getById(id: string): Promise<Job | null>;
	delete(id: string): Promise<void>;
}
