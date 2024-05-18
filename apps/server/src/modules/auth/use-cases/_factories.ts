import { DrizzleAccountsRepository } from "@/modules/accounts/repositories/drizzle-accounts-repository";
import { AuthWithPasswordUseCase } from "@/modules/auth/use-cases/auth-with-password-use-case";
import { GetGithubAccessTokenUseCase } from "@/modules/auth/use-cases/get-github-access-token-use-case";
import { GetGithubUserUseCase } from "@/modules/auth/use-cases/get-github-user-use-case";
import { GetOrCreateAccountUseCase } from "@/modules/auth/use-cases/get-or-create-account-use-case";
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

export function makeAuthWithPasswordUseCase(): AuthWithPasswordUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const authWithPasswordUseCase = new AuthWithPasswordUseCase(usersRepository);

	return authWithPasswordUseCase;
}
