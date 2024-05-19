import { env } from "@sculpt/env";
import { Auth } from "googleapis";

export const googleOauthClient = new Auth.OAuth2Client(
	env.GOOGLE_OAUTH_CLIENT_ID,
	env.GOOGLE_OAUTH_SECRET_ID,
	env.GOOGLE_OAUTH_REDIRECT_URL,
);
