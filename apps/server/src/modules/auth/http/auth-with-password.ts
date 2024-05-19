import type { JSONResponse } from "@/@types/hono";
import { makeAuthWithPasswordUseCase } from "@/modules/auth/use-cases/_factories";
import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";

type Response = JSONResponse<{ token: string }>;

const bodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const authWithPassword = new Hono().post(
	"/standard",
	zValidator("json", bodySchema),
	async (c): Promise<Response> => {
		const { email, password } = c.req.valid("json");

		const authWithPasswordUseCase = makeAuthWithPasswordUseCase();

		const { userId } = await authWithPasswordUseCase.execute(email, password);

		const token = await sign({ sub: userId }, env.JWT_SECRET);

		return c.json({ token });
	},
);
