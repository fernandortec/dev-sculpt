import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import type { CreateUser } from "@/modules/users/schemas/create-user";
import type { User } from "@sculpt/drizzle";
import { hash } from "bcrypt-ts";

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		name,
		role,
		avatarUrl,
		password,
	}: CreateUser): Promise<User> {
		const userExists = await this.usersRepository.getByEmail(email);
		if (userExists) throw new ResourceAlreadyExistsError();

		const passwordHash = await hash(password, 6);

		const user = await this.usersRepository.create({
			email,
			name,
			role,
			password: passwordHash,
			avatarUrl,
		});

		return user;
	}
}
