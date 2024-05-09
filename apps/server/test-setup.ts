import { afterEach, beforeEach } from "bun:test";
import { createId } from "@paralleldrive/cuid2";
import { drizzle, migrate, sql, testOnlyConnection } from "@sculpt/drizzle";

async function updateDatabaseSchemaOnTesting(): Promise<void> {
	if (!process.env.IS_E2E) return;
	if (!process.env.DATABASE_URL) throw new Error("Unset Database URL");

	const schema = createId();
	
	const databaseUrl = new URL(process.env.DATABASE_URL);
	databaseUrl.searchParams.set("search_path", schema);

	process.env.DATABASE_URL = databaseUrl.toString();

	const db = drizzle(testOnlyConnection);

	beforeEach(async () => {
		await migrate(db, {
			migrationsFolder: "../../packages/drizzle/migrations",
			migrationsSchema: schema,
		});

		afterEach(async () => {
			await db.execute(sql.raw(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`));
		});
	});
}

await updateDatabaseSchemaOnTesting();
