import { env } from "@sculpt/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schemas from "./schemas";

const connection = postgres(env.DATABASE_URL);

export const db = drizzle(connection, { schema: schemas });

export * from "./schemas";