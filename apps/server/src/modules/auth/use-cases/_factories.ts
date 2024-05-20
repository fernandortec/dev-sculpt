import { DrizzleAccountsRepository } from "@/modules/accounts/repositories/drizzle-accounts-repository";

import { AuthWithPasswordUseCase } from "@/modules/auth/use-cases/auth-with-password-use-case";

import { GetOrCreateAccountUseCase } from "@/modules/auth/use-cases/get-or-create-account-use-case";
import { GetGithubAccessTokenUseCase } from "@/modules/auth/use-cases/github/get-github-access-token-use-case";
import { GetGithubUserUseCase } from "@/modules/auth/use-cases/github/get-github-user-use-case";
import { GenerateGoogleAuthUrlUseCase } from "@/modules/auth/use-cases/google/generate-google-auth-url-use-case";
import { GetGoogleAccessTokenUseCase } from "@/modules/auth/use-cases/google/get-google-access-token-use-case";
import { GetGoogleUserUseCase } from "@/modules/auth/use-cases/google/get-google-user-use-case";
import { GetLinkedinAccessTokenUseCase } from "@/modules/auth/use-cases/linkedin/get-linkedin-access-token-use-case";
import { GetLinkedinUserUseCase } from "@/modules/auth/use-cases/linkedin/get-linkedin-user-use-case";
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

export function makeGenerateGoogleAuthUrlUseCase(): GenerateGoogleAuthUrlUseCase {
	const generateGoogleAuthUrlUseCase = new GenerateGoogleAuthUrlUseCase();

	return generateGoogleAuthUrlUseCase;
}

export function makeGetGoogleAccessTokenUseCase(): GetGoogleAccessTokenUseCase {
	const getGoogleAccessTokenUseCase = new GetGoogleAccessTokenUseCase();
	return getGoogleAccessTokenUseCase;
}

export function makeGetGoogleUserUseCase(): GetGoogleUserUseCase {
	const getGoogleUserUseCase = new GetGoogleUserUseCase();
	return getGoogleUserUseCase;
}

export function makeGetLinkedinAccessTokenUseCase(): GetLinkedinAccessTokenUseCase {
	const getLinkedinAccessTokenUseCase = new GetLinkedinAccessTokenUseCase();
	return getLinkedinAccessTokenUseCase;
}

export function makeGetLinkedinUserUseCase(): GetLinkedinUserUseCase {
	const getLinkedinUserUseCase = new GetLinkedinUserUseCase();
	return getLinkedinUserUseCase;
}
