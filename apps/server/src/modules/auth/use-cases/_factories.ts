import { DrizzleAccountsRepository } from "@/modules/accounts/repositories/drizzle-accounts-repository";
import { GetGithubAccessTokenUseCase } from "@/modules/auth/use-cases/get-github-access-token";
import { GetGithubUserUseCase } from "@/modules/auth/use-cases/get-github-user";
import { GetOrCreateAccountUseCase } from "@/modules/auth/use-cases/get-or-create-account";
import { DrizzleUsersRepository } from "@/modules/users/repositories/drizzle-users-repository";

export function makeGetGithubAccessTokenUseCase(): GetGithubAccessTokenUseCase {
	const getGithubAccessTokenUseCase = new GetGithubAccessTokenUseCase();
	return getGithubAccessTokenUseCase;
}

export function makeGetGithubUserUseCase(): GetGithubUserUseCase {
	const getGithubUserUseCase = new GetGithubUserUseCase();
	return getGithubUserUseCase;
}

export function makeGetOrCreateAccountUseCase(): GetOrCreateAccountUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const accountsRepository = new DrizzleAccountsRepository();

	const getOrCreateAccountUseCase = new GetOrCreateAccountUseCase(
		usersRepository,
		accountsRepository,
	);

	return getOrCreateAccountUseCase;
}
