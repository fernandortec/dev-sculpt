import { OauthCodeInvalidError } from "@/errors/oauth-code-invalid-error";
import { googleOauthClient } from "@/helpers/google-oauth-client";

interface GetGithubAccessTokenResponse {
	accessToken: string;
}

export class GetGoogleAccessTokenUseCase {
	async execute(code: string): Promise<GetGithubAccessTokenResponse> {
		const { tokens } = await googleOauthClient.getToken(code);
		if (!tokens.access_token) throw new OauthCodeInvalidError();

		return { accessToken: tokens.access_token };
	}
}
