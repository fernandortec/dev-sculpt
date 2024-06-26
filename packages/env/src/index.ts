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
		GITHUB_OAUTH_SECRET_ID: z.string(),
		GITHUB_OAUTH_REDIRECT_URL: z.string().url(),

		GOOGLE_OAUTH_CLIENT_ID: z.string(),
		GOOGLE_OAUTH_SECRET_ID: z.string(),
		GOOGLE_OAUTH_REDIRECT_URL: z.string().url(),

		LINKEDIN_OAUTH_CLIENT_ID: z.string(),
		LINKEDIN_OAUTH_SECRET_ID: z.string(),
		LINKEDIN_OAUTH_REDIRECT_URL: z.string().url(),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_API_MOCKING: z.coerce.boolean().default(false),
	},
	shared: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,

		DATABASE_URL: process.env.DATABASE_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		SERVER_PORT: process.env.SERVER_PORT,
		API_BASE_URL: process.env.API_BASE_URL,
		AUTH_REDIRECT_URL: process.env.AUTH_REDIRECT_URL,

		GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
		GITHUB_OAUTH_SECRET_ID: process.env.GITHUB_OAUTH_SECRET_ID,
		GITHUB_OAUTH_REDIRECT_URL: process.env.GITHUB_OAUTH_REDIRECT_URL,

		GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
		GOOGLE_OAUTH_SECRET_ID: process.env.GOOGLE_OAUTH_SECRET_ID,
		GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL,

		LINKEDIN_OAUTH_CLIENT_ID: process.env.LINKEDIN_OAUTH_CLIENT_ID,
		LINKEDIN_OAUTH_SECRET_ID: process.env.LINKEDIN_OAUTH_SECRET_ID,
		LINKEDIN_OAUTH_REDIRECT_URL: process.env.LINKEDIN_OAUTH_REDIRECT_URL,

		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
	},
	emptyStringAsUndefined: true,
});
