import type { JSONResponse, OverrideDate } from "@/@types/hono";
import { makeCreateUserUseCase } from "@/use-cases/_factories/user-factories";
import { zValidator } from "@hono/zod-validator";
import type { User } from "@sculpt/drizzle";
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
	async (c): Promise<JSONResponse<OverrideDate<User>>> => {
		const { email, name, role, bio, companyId } = c.req.valid("json");

		const createUserUseCase = makeCreateUserUseCase();

		const user = await createUserUseCase.execute({
			email,
			name,
			role,
			bio,
			companyId,
		});

		return c.json(user, 201);
	},
);
