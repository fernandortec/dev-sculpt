import { GithubCodeInvalidError } from "@/errors/github-code-invalid-error";
import type { OauthUserRepository } from "@/modules/auth/repositories/oauth-user-repository";

export interface GetGithubAccessTokenResponse {
	accessToken: string;
}

export class GetGithubAccessTokenUseCase {
	constructor(private oauthUsersRepository: OauthUserRepository) {}

	async execute(code: string): Promise<GetGithubAccessTokenResponse> {
		const accessToken = await this.oauthUsersRepository.getAccessToken(code);

		if (!accessToken) throw new GithubCodeInvalidError();

		return { accessToken };
	}
}
