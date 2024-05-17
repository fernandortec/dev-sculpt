import { env } from "@sculpt/env";

export interface GetGithubAccessTokenResponse {
	accessToken: string;
}

export class GetGithubAccessToken {
	async execute(code: string): Promise<GetGithubAccessTokenResponse> {
		const githubOauthURL = new URL(
			"https://github.com/login/oauth/access_token",
		);

		githubOauthURL.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
		githubOauthURL.searchParams.set("code", code);
		githubOauthURL.searchParams.set(
			"client_secret",
			env.GITHUB_OAUTH_CLIENT_SECRET,
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

		const { access_token } = await githubAccessTokenResponse.json();

		return { accessToken: access_token };
	}
}
