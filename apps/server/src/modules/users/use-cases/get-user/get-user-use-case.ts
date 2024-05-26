import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import type { User } from "@sculpt/drizzle";

export class GetUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(userId: string): Promise<User | null> {
		const user = await this.usersRepository.getById(userId);
		return user;
	}
}
