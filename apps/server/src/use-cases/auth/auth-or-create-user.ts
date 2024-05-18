import type { UsersRepository } from "@/repositories/users-repository";
import type { GetGithubUserUseCaseResponse } from "@/use-cases/auth/get-github-user";

type GithubUser = GetGithubUserUseCaseResponse["user"];

interface AuthOrCreateUserResponse {
	id: string;
}

export class AuthOrCreateUser {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		avatarUrl,
		email,
		githubId,
		name,
	}: GithubUser): Promise<void> {
		const userExists = await this.usersRepository.getByEmail(email);
		if (userExists) return;

    await this.usersRepository.create({
      avatarUrl,
      email,
      githubId,
      name,
    });
	}
}
