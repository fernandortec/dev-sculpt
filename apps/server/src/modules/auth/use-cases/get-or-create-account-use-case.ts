import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import type { GetGithubUserUseCaseResponse } from "@/modules/auth/use-cases/get-github-user-use-case";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";

type GithubUser = GetGithubUserUseCaseResponse["user"];

interface GetOrCreateAccountUseCaseResponse {
	userId: string;
}

export class GetOrCreateAccountUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private accountsRepository: AccountsRepository,
	) {}

	async execute({
		avatarUrl,
		email,
		name,
		githubId,
	}: GithubUser): Promise<GetOrCreateAccountUseCaseResponse> {
		let user = await this.usersRepository.getByEmail(email);
		if (!user) {
			user = await this.usersRepository.create({
				avatarUrl,
				email,
				role: "jobseeker",
				name,
			});
		}

		const accountExists = await this.accountsRepository.getByUser(
			"github",
			user.id,
		);

		if (!accountExists) {
			await this.accountsRepository.create({
				provider: "github",
				providerAccountId: githubId,
				userId: user.id,
			});
		}

		return { userId: user.id };
	}
}
