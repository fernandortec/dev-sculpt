import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { z } from "zod";

const querySchema = z.object({ code: z.string() });

export const authWithGithub = new Hono().post(
	"/auth/github",
	zValidator("query", querySchema),
	async (c) => {
		const { code } = c.req.valid("query");

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
	},
);
