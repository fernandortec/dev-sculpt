import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import type { OauthUser } from "@/modules/auth/schemas/oauth-user";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";

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
		id,
	}: OauthUser): Promise<GetOrCreateAccountUseCaseResponse> {
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

		const accountExists = await this.accountsRepository.getByUser(
			"github",
			user.id,
		);

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
