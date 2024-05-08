import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		SERVER_PORT: z.coerce.number().default(3333),
		DATABASE_URL: z.string().url(),
		JWT_SECRET: z.string(),
	},
	client: {},
	shared: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		SERVER_PORT: process.env.SERVER_PORT,
	},
	emptyStringAsUndefined: true,
});
