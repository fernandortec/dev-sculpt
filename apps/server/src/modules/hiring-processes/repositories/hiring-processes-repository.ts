import type {
	CreateHiringProcess,
	HiringProcess,
	UpdateHiringProcess,
} from "@sculpt/drizzle";

export interface HiringProcessesRepository {
	create({
		currentStatus,
		jobId,
		resumeId,
		createdAt,
		feedbackFromCompany,
		id,
	}: CreateHiringProcess): Promise<HiringProcess>;
	update({
		id,
		createdAt,
		currentStatus,
		feedbackFromCompany,
		jobId,
		resumeId,
	}: UpdateHiringProcess): Promise<HiringProcess>;
	getById(id: string): Promise<HiringProcess | null>;
	delete(id: string): Promise<void>;
}
