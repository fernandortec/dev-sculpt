import { makeCreateUserUseCase } from "@/modules/users/use-cases/factories";
import { createUserSchema } from "@/modules/users/schemas/create-user";
import { zValidator } from "@hono/zod-validator";
import type { JSONResponse } from "@/shared/hono-types";
import type { User } from "@sculpt/drizzle";
import type { Override } from "@sculpt/tsconfig";
import { Hono } from "hono";

export type CreateUserResponse = {
	user: Override<User, { createdAt: string }>;
};

export const createUser = new Hono().post(
	"/users",
	zValidator("json", createUserSchema),
	async (c): Promise<JSONResponse<CreateUserResponse>> => {
		const { email, name, role, password, avatarUrl } = c.req.valid("json");

		const createUserUseCase = makeCreateUserUseCase();

		const user = await createUserUseCase.execute({
			email,
			name,
			role,
			avatarUrl,
			password,
		});

		return c.json({ user }, 201);
	},
);
