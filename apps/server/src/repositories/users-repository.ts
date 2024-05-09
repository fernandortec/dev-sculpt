import type { CreateUser, UpdateUser, User } from "@sculpt/drizzle";

export interface UsersRepository {
	create({
		email,
		name,
		role,
		bio,
		companyId,
		createdAt,
		id,
	}: CreateUser): Promise<User>;
	update({
		id,
		bio,
		companyId,
		createdAt,
		email,
		name,
		role,
	}: UpdateUser): Promise<User>;
	getById(id: string): Promise<User | null>;
	getByEmail(email: string): Promise<User | null>;
	delete(id: string): Promise<void>;
}
