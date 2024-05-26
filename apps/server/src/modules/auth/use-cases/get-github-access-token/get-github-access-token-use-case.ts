import { OauthCodeInvalidError } from "@/errors/oauth-code-invalid-error";
import { env } from "@sculpt/env";

export interface GetGithubAccessTokenResponse {
	accessToken: string;
}

export class GetGithubAccessTokenUseCase {
	async execute(code: string): Promise<GetGithubAccessTokenResponse> {
		const githubOauthURL = new URL(
			"https://github.com/login/oauth/access_token",
		);

		githubOauthURL.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
		githubOauthURL.searchParams.set("code", code);
		githubOauthURL.searchParams.set(
			"client_secret",
			env.GITHUB_OAUTH_SECRET_ID,
		);
		githubOauthURL.searchParams.set(
			"redirect_url",
			env.GITHUB_OAUTH_REDIRECT_URL,
		);

		const githubAccessTokenResponse = await fetch(githubOauthURL, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		});
		const { access_token: accessToken } =
			await githubAccessTokenResponse.json();

		if (!accessToken) throw new OauthCodeInvalidError();

		return { accessToken };
	}
}
