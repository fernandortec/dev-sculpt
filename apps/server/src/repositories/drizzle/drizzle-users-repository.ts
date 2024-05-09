import type { UsersRepository } from "@/repositories/users-repository";
import {
	type CreateUser,
	type UpdateUser,
	type User,
	db,
	users,
} from "@sculpt/drizzle";
import { eq } from "drizzle-orm";

export class DrizzleUsersRepository implements UsersRepository {
	async create({
		email,
		name,
		role,
		bio,
		companyId,
		createdAt,
		id,
	}: CreateUser): Promise<User> {
		const [user] = await db
			.insert(users)
			.values({ email, name, role, bio, companyId, createdAt, id })
			.returning();

		return user;
	}
	async update({
		id,
		bio,
		companyId,
		createdAt,
		email,
		name,
		role,
	}: UpdateUser): Promise<User> {
		const [user] = await db
			.update(users)
			.set({ id, bio, companyId, createdAt, email, name, role })
			.returning();

		return user;
	}
	async getById(id: string): Promise<User | null> {
		const [user] = await db.select().from(users).where(eq(users.id, id));
		if (!user) return null;

		return user;
	}
	async getByEmail(email: string): Promise<User | null> {
		const [user] = await db.select().from(users).where(eq(users.email, email));
		if (!user) return null;

		return user;
	}
	async delete(id: string): Promise<void> {
		await db.delete(users).where(eq(users.id, id));
	}
}
