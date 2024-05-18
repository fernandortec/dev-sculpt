import type {
	CreateExperience,
	Experience,
	UpdateExperience,
} from "@sculpt/drizzle";

export interface ExperiencesRepository {
	create({
		companyName,
		employedTimeInMonths,
		isCurrentlyEmployed,
		resumeId,
		description,
		id,
	}: CreateExperience): Promise<Experience>;
	update({
		companyName,
		employedTimeInMonths,
		isCurrentlyEmployed,
		resumeId,
		description,
		id,
	}: UpdateExperience): Promise<Experience>;
	getById(id: string): Promise<Experience | null>;
	delete(id: string): Promise<void>;
}
