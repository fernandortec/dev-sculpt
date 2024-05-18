import type { JSONResponse, OverrideDate } from "@/@types/hono";
import { createUserSchema } from "@/modules/users/schemas/create-user";
import { makeCreateUserUseCase } from "@/modules/users/use-cases/_factories";

import { zValidator } from "@hono/zod-validator";
import type { User } from "@sculpt/drizzle";
import { Hono } from "hono";

export const createUser = new Hono().post(
	"/",
	zValidator("json", createUserSchema),
	async (c): Promise<JSONResponse<OverrideDate<User>>> => {
		const { email, name, role, password, avatarUrl } = c.req.valid("json");

		const createUserUseCase = makeCreateUserUseCase();

		const user = await createUserUseCase.execute({
			email,
			name,
			role,
			avatarUrl,
			password,
		});

		return c.json(user, 201);
	},
);
