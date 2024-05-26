import { env } from "@sculpt/env";
import { Hono } from "hono";

export const generateGithubAuthUrl = new Hono().get(
	"auth/gen-link/github",
	async (c): Promise<Response> => {
		const url = new URL("https://github.com/login/oauth/authorize");
		url.searchParams.append("response_type", "code");
		url.searchParams.append("client_id", env.GITHUB_OAUTH_CLIENT_ID);
		url.searchParams.append("redirect_url", env.GITHUB_OAUTH_REDIRECT_URL);

		return c.body(url.toString());
	},
);
