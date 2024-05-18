import type { OauthUserRepository } from "@/modules/auth/repositories/oauth-user-repository";
import { env } from "@sculpt/env";

export interface GithubUser {
	githubId: string;
	avatarUrl: string;
	email: string;
	name: string;
}

export class GithubOauthUserRepository implements OauthUserRepository {
	async getAccessToken(code: string): Promise<string | null> {
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

		return access_token || null;
	}

	async getUser(accessToken: string): Promise<GithubUser> {
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		const { id, avatar_url, email, name } = await githubUserResponse.json();

		return { githubId: id, avatarUrl: avatar_url, email, name };
	}
}
