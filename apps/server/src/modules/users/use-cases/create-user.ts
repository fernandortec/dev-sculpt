import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists";
import type { UsersRepository } from "@/modules/users/users-repository";
import type { CreateUser, User } from "@sculpt/drizzle";

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		name,
		role,
		bio,
		companyId,
		avatarUrl,
	}: CreateUser): Promise<User> {
		const userExists = await this.usersRepository.getByEmail(email);
		if (userExists) throw new ResourceAlreadyExistsError();

		const user = await this.usersRepository.create({
			email,
			name,
			role,
			bio,
			companyId,
			avatarUrl,
		});

		return user;
	}
}
