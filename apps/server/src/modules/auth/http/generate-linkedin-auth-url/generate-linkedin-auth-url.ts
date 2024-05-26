import { env } from "@sculpt/env";
import { Hono } from "hono";

export const generateLinkedinAuthUrl = new Hono().get(
	"auth/gen-link/linkedin",
	async (c): Promise<Response> => {
		const url = new URL("https://www.linkedin.com/oauth/v2/authorization");
		url.searchParams.append("scope", "email profile openid");
		url.searchParams.append("response_type", "code");
		url.searchParams.append("client_id", env.LINKEDIN_OAUTH_CLIENT_ID);
		url.searchParams.append("redirect_uri", env.LINKEDIN_OAUTH_REDIRECT_URL);

		return c.body(url.toString());
	},
);
