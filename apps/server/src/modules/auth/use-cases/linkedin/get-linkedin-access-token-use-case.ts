import { env } from "@sculpt/env";

export class GetLinkedinAccessTokenUseCase {
	async execute(code: string) {
		const response = await fetch(
			"https://www.linkedin.com/oauth/v2/accessToken",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					grant_type: "authorization_code",
					client_secret: env.LINKEDIN_OAUTH_SECRET_ID,
					client_id: env.LINKEDIN_OAUTH_CLIENT_ID,
					redirect_uri: env.LINKEDIN_OAUTH_REDIRECT_URL,
					code,
				}),
			},
		);

		const { access_token: accessToken } = await response.json();

		return { accessToken };
	}
}
