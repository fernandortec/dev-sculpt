import type { CreateResume, Resume, UpdateResume } from "@sculpt/drizzle";

export interface ResumesRepository {
	create({
		emailForContact,
		skills,
		userId,
		id,
		phoneNumber,
	}: CreateResume): Promise<Resume>;
	update({
		id,
		emailForContact,
		phoneNumber,
		skills,
		userId,
	}: UpdateResume): Promise<Resume>;
	getById(id: string): Promise<Resume | null>;
	delete(id: string): Promise<void>;
}
