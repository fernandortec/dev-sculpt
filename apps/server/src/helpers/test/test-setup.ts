import { afterEach, beforeEach } from "bun:test";
import { drizzle, migrate, postgres, sql } from "@sculpt/drizzle/pkgs";
import { ulid } from "ulid";

async function updateDatabaseSchemaOnTesting(): Promise<void> {
	if (!process.env.IS_E2E) return;
	if (!process.env.DATABASE_URL) throw new Error("Unset Database URL");

	const schema = ulid();

	const databaseUrl = new URL(process.env.DATABASE_URL);
	databaseUrl.searchParams.set("search_path", schema);

	process.env.DATABASE_URL = databaseUrl.toString();

	const connection = postgres(String(process.env.DATABASE_URL), {
		max: 1,
		max_lifetime: 5,
	});

	const db = drizzle(connection);

	beforeEach(async () => {
		await migrate(db, {
			migrationsFolder: "../../packages/drizzle/migrations",
			migrationsSchema: schema,
		});
	});

	afterEach(async () => {
		await db.execute(sql.raw(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`));
	});
}

await updateDatabaseSchemaOnTesting();
