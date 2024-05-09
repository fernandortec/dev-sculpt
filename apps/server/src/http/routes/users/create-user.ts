import { zValidator } from "@hono/zod-validator";
import { db, users } from "@sculpt/drizzle";
import { Hono } from "hono";
import { z } from "zod";

const bodySchema = z.object({
	name: z.string(),
	role: z.enum(["jobseeker", "recruiter"]),
	email: z.string().email(),
	bio: z.string().nullable(),
	companyId: z.string().nullable(),
});

export const createUser = new Hono().post(
	"/",
	zValidator("json", bodySchema),
	async (c) => {
		const { email, name, role, bio, companyId } = c.req.valid("json");

		const [user] = await db
			.insert(users)
			.values({ email, name, role, bio, companyId })
			.returning();

		return c.json(user, 201);
	},
);
