import { env } from "@sculpt/env";
import { Auth } from "googleapis";

export interface GenerateGoogleAuthorizationUrlUseCaseResponse {
	url: string;
}

export class GenerateGoogleAuthorizationUrlUseCase {
	async execute(): Promise<GenerateGoogleAuthorizationUrlUseCaseResponse> {
		const oauth2Client = new Auth.OAuth2Client(
			env.GOOGLE_OAUTH_CLIENT_ID,
			env.GOOGLE_OAUTH_SECRET_ID,
			env.OAUTH_REDIRECT_URL,
		);

		const authorizationUrl = oauth2Client.generateAuthUrl({});

		return { url: authorizationUrl };
	}
}
