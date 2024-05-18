import type { CreateUser } from "@/modules/users/schemas/create-user";
import type { UpdateUser } from "@/modules/users/schemas/update-user";
import type { User } from "@sculpt/drizzle";

export interface UsersRepository {
	create({
		email,
		name,
		role,
		avatarUrl,
	}: CreateUser): Promise<User>;
	update({
		id,
		bio,
		companyId,
		email,
		name,
		role,
		avatarUrl,
	}: UpdateUser): Promise<User>;
	getById(id: string): Promise<User | null>;
	getByEmail(email: string): Promise<User | null>;
	delete(id: string): Promise<void>;
}
