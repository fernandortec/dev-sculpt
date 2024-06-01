import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import type { CreateUser } from "@/modules/users/schemas/create-user";
import type { UpdateUser } from "@/modules/users/schemas/update-user";
import { type User, db, users } from "@sculpt/drizzle";
import { eq } from "drizzle-orm";

export class DrizzleUsersRepository implements UsersRepository {
	async create({
		email,
		name,
		role,
		avatarUrl,
		password,
	}: CreateUser): Promise<User> {
		const [user] = await db
			.insert(users)
			.values({
				email,
				name,
				role,
				avatarUrl,
				passwordHash: password,
			})
			.returning();

		if (!user) throw new Error();

		return user;
	}
	async update({
		id,
		bio,
		companyId,
		email,
		name,
		role,
		passwordHash,
		avatarUrl,
	}: UpdateUser): Promise<User> {
		const [user] = await db
			.update(users)
			.set({ id, bio, companyId, email, name, role, passwordHash, avatarUrl })
			.returning();

		if (!user) throw new Error();

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
