import { googleOauthClient } from "@/helpers/google-oauth-client";
import { env } from "@sculpt/env";

export interface GenerateGoogleAuthUrlUseCaseResponse {
	url: string;
}

export class GenerateGoogleAuthUrlUseCase {
	async execute(): Promise<GenerateGoogleAuthUrlUseCaseResponse> {
		const authorizationUrl = googleOauthClient.generateAuthUrl({
			scope: [
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email",
			],
			redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URL,
		});

		return { url: authorizationUrl };
	}
}
