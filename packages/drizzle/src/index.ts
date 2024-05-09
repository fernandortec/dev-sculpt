import { env } from "@sculpt/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schemas from "./schemas";

const connection = postgres(env.DATABASE_URL);

export const testOnlyConnection = postgres(String(process.env.DATABASE_URL), {
	max: 1,
	max_lifetime: 10,
});

export const db = drizzle(connection, { schema: schemas });

export * from "./schemas";
export { migrate } from "drizzle-orm/postgres-js/migrator";
export { drizzle } from "drizzle-orm/postgres-js";
export { sql } from "drizzle-orm";
