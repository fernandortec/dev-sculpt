import { EmailMustBeSetError } from "@/errors/email-must-be-set-error";
import { GithubCodeInvalidError } from "@/errors/github-code-invalid-error";
import type { GithubUser } from "@/modules/auth/repositories/github-oauth-user-repository";
import type { OauthUserRepository } from "@/modules/auth/repositories/oauth-user-repository";

export interface GetGithubUserUseCaseResponse {
	user: GithubUser;
}

export class GetGithubUserUseCase {
	constructor(private oauthUsersRepository: OauthUserRepository) {}
	async execute(accessToken: string): Promise<GetGithubUserUseCaseResponse> {
		const { avatarUrl, githubId, email, name } =
			await this.oauthUsersRepository.getUser(accessToken);

		if (!githubId) throw new GithubCodeInvalidError();
		if (!email || email === null) throw new EmailMustBeSetError();

		return { user: { githubId, avatarUrl, email, name } };
	}
}
