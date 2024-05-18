import { GetGithubAccessTokenUseCase } from "@/use-cases/auth/get-github-access-token";
import { GetGithubUserUseCase } from "@/use-cases/auth/get-github-user";

export function makeGetGithubAccessTokenUseCase(): GetGithubAccessTokenUseCase {
	const getGithubAccessTokenUseCase = new GetGithubAccessTokenUseCase();

	return getGithubAccessTokenUseCase;
}

export function makeGetGithubUserUseCase(): GetGithubUserUseCase {
	const getGithubUserUseCase = new GetGithubUserUseCase();

	return getGithubUserUseCase;
}
