import postgres from "postgres";

import { env } from "@sculpt/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const connection = postgres(env.DATABASE_URL, { max: 1 });

const db = drizzle(connection);

await migrate(db, { migrationsFolder: "migrations" });

console.log("Migrations applied successfully!");

await connection.end();

process.exit();
