import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";

import { createId } from "@paralleldrive/cuid2";
import type { CreateUser, UpdateUser, User } from "@sculpt/drizzle";

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];
	async create({
		email,
		name,
		role,
		bio,
		companyId,
		avatarUrl
	}: CreateUser): Promise<User> {
		const user: User = {
			id: createId(),
			email,
			name,
			role,
			avatarUrl: avatarUrl ?? null,
			bio: bio ?? null,
			companyId: companyId ?? null,
			createdAt: new Date(),
		};

		this.users.push(user);

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
		const userIdx = this.users.findIndex((user) => user.id === id);
		const user = this.users[userIdx];

		if (!user) throw new ResourceNotFoundError();

		const updatedUser: User = {
			...user,
			bio: bio ? bio : user.bio,
			companyId: companyId ? companyId : user.companyId,
			createdAt: createdAt ? createdAt : user.createdAt,
			email: email ? email : user.email,
			name: name ? name : user.name,
			role: role ? role : user.role,
		};

		this.users[userIdx] = updatedUser;

		return updatedUser;
	}
	async getById(id: string): Promise<User | null> {
		const user = this.users.find((user) => user.id === id);
		if (!user) return null;

		return user;
	}
	async getByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);
		if (!user) return null;

		return user;
	}
	async delete(id: string): Promise<void> {
		const userIdx = this.users.findIndex((user) => user.id === id);
		if (userIdx !== 0) throw new ResourceNotFoundError();

		this.users.splice(userIdx);
	}
}
