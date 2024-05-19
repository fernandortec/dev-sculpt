import { EmailMustBeSetError } from "@/errors/email-must-be-set-error";
import { googleOauthClient } from "@/helpers/google-oauth-client";
import type { OauthUser } from "@/modules/auth/schemas/oauth-user";
import { google } from "googleapis";

interface GetGoogleUserUseCaseResponse {
	user: OauthUser;
}

export class GetGoogleUserUseCase {
	async execute(accessToken: string): Promise<GetGoogleUserUseCaseResponse> {
		googleOauthClient.setCredentials({ access_token: accessToken });

		const oauth2 = google.oauth2({
			auth: googleOauthClient,
			version: "v2",
		});

		const { data } = await oauth2.userinfo.get({});
		if (!data.email) throw new EmailMustBeSetError();

		return {
			user: {
				id: String(data.id),
				avatarUrl: String(data.picture),
				email: String(data.email),
				name: String(data.name),
			},
		};
	}
}
