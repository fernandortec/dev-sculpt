import { GetGithubAccessTokenUseCase } from "@/modules/auth/use-cases/get-github-access-token";
import { GetGithubUserUseCase } from "@/modules/auth/use-cases/get-github-user";

export function makeGetGithubAccessTokenUseCase(): GetGithubAccessTokenUseCase {
	const getGithubAccessTokenUseCase = new GetGithubAccessTokenUseCase();

	return getGithubAccessTokenUseCase;
}

export function makeGetGithubUserUseCase(): GetGithubUserUseCase {
	const getGithubUserUseCase = new GetGithubUserUseCase();

	return getGithubUserUseCase;
}
