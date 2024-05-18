import type { GetGithubUserUseCaseResponse } from "@/modules/auth/use-cases/get-github-user";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import type { User } from "@sculpt/drizzle";

type GithubUser = GetGithubUserUseCaseResponse["user"];

interface AuthOrCreateUserResponse {
	user: User;
}

export class AuthOrCreateUser {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		avatarUrl,
		email,
		name,
	}: GithubUser): Promise<AuthOrCreateUserResponse> {
		const userExists = await this.usersRepository.getByEmail(email);
		if (userExists) return { user: userExists };

		const user = await this.usersRepository.create({
			avatarUrl,
			email,
			role: "jobseeker",
			name,
		});

		return { user };
	}
}
