import { EmailMustBeSetError } from "@/errors/email-must-be-set-error";
import { OauthCodeInvalidError } from "@/errors/oauth-code-invalid-error";
import type { OauthUser } from "@/modules/auth/schemas/oauth-user";

export interface GetGithubUserUseCaseResponse {
	user: OauthUser;
}

export class GetGithubUserUseCase {
	async execute(accessToken: string): Promise<GetGithubUserUseCaseResponse> {
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		const {
			id: githubId,
			avatar_url: avatarUrl,
			email,
			name,
		} = await githubUserResponse.json();

		if (!githubId) throw new OauthCodeInvalidError();
		if (!email || email === null) throw new EmailMustBeSetError();

		return { user: { id: githubId, avatarUrl, email, name } };
	}
}
