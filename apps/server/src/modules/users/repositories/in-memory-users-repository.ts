import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import type { CreateUser } from "@/modules/users/schemas/create-user";
import type { UpdateUser } from "@/modules/users/schemas/update-user";
import type { User } from "@sculpt/drizzle";

import { createId } from "@paralleldrive/cuid2";
import { hash } from "bcrypt-ts";

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];
	async create({
		email,
		name,
		role,
		avatarUrl,
		password,
	}: CreateUser): Promise<User> {
		const user: User = {
			id: createId(),
			email,
			name,
			role,
			avatarUrl,
			bio: null,
			companyId: null,
			passwordHash: password,
			createdAt: new Date(),
		};

		this.users.push(user);

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
		const userIdx = this.users.findIndex((user) => user.id === id);
		const user = this.users[userIdx];

		if (!user) throw new ResourceNotFoundError();

		const updatedUser: User = {
			...user,
			bio: bio ? bio : user.bio,
			companyId: companyId ? companyId : user.companyId,
			email: email ? email : user.email,
			name: name ? name : user.name,
			role: role ? role : user.role,
			passwordHash: passwordHash ? passwordHash : user.passwordHash,
			avatarUrl: avatarUrl ? avatarUrl : user.avatarUrl,
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
