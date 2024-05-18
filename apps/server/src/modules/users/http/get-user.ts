import { auth } from "@/middlewares/auth";
import { db, users } from "@sculpt/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const getUser = new Hono().use(auth).get("/me", async (c) => {
	const { userId } = c.get("userId");

	const [user] = await db.select().from(users).where(eq(users.id, userId));

	return c.json(user);
});
