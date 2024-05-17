import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		SERVER_PORT: z.coerce.number().default(3333),
		DATABASE_URL: z.string().url(),
		API_BASE_URL: z.string().url(),
		AUTH_REDIRECT_URL: z.string().url(),
		JWT_SECRET: z.string(),

		GITHUB_OAUTH_CLIENT_ID: z.string(),
		GITHUB_OAUTH_CLIENT_SECRET: z.string(),
		GITHUB_OAUTH_REDIRECT_URL: z.string().url(),
	},
	client: {},
	shared: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		SERVER_PORT: process.env.SERVER_PORT,
		API_BASE_URL: process.env.API_BASE_URL,
		AUTH_REDIRECT_URL: process.env.AUTH_REDIRECT_URL,

		GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
		GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
		GITHUB_OAUTH_REDIRECT_URL: process.env.GITHUB_OAUTH_REDIRECT_URL,
	},
	emptyStringAsUndefined: true,
});
