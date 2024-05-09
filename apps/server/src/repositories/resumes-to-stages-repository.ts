import type { CreateResumeToStage, ResumeToStage } from "@sculpt/drizzle";

export interface ResumesToStagesRepository {
	create({ resumeId, stageId }: CreateResumeToStage): Promise<ResumeToStage>;
	getByIds(resumeId: string, stageId: string): Promise<ResumeToStage | null>;
	delete(resumeId: string, stageId: string): Promise<void>;
}
