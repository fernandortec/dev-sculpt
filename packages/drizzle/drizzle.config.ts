import { env } from "@sculpt/env";
import type { Config } from "drizzle-kit";

export default {
	schema: "./src/db/schemas/index.ts",
	out: "./migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
} satisfies Config;
