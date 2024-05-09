import type { CreateStage, Stage, UpdateStage } from "@sculpt/drizzle";

export interface StagesRepository {
	create({
		description,
		jobId,
		name,
		stacks,
		id,
		status,
	}: CreateStage): Promise<Stage>;
	update({
		id,
		description,
		jobId,
		name,
		stacks,
		status,
	}: UpdateStage): Promise<Stage>;
	getById(id: string): Promise<Stage | null>;
	delete(id: string): Promise<void>;
}
