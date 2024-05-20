import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import type { OauthUser } from "@/modules/auth/schemas/oauth-user";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";

interface GetOrCreateAccountUseCaseResponse {
	userId: string;
}

interface GetOrCreateAccountUseCaseParams {
	provider: "github" | "linkedin" | "google";
	user: OauthUser;
}

export class GetOrCreateAccountUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private accountsRepository: AccountsRepository,
	) {}

	async execute({
		user: oauthUser,
		provider,
	}: GetOrCreateAccountUseCaseParams): Promise<GetOrCreateAccountUseCaseResponse> {
		const { avatarUrl, email, id, name } = oauthUser;

		let user = await this.usersRepository.getByEmail(email);
		if (!user) {
			user = await this.usersRepository.create({
				avatarUrl,
				email,
				role: "jobseeker",
				name,
				password: null,
			});
		}

		const accountExists = await this.accountsRepository.getByUser({
			provider,
			userId: user.id,
		});

		if (!accountExists) {
			await this.accountsRepository.create({
				provider: "github",
				providerAccountId: id,
				userId: user.id,
			});
		}

		return { userId: user.id };
	}
}
