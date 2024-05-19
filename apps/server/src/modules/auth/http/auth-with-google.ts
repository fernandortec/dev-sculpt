import {
	makeGetGoogleAccessTokenUseCase,
	makeGetGoogleUserUseCase,
} from "@/modules/auth/use-cases/_factories";
import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";

const bodySchema = z.object({ code: z.string() });

export const authWithGoogle = new Hono().post(
	"/auth/google",
	zValidator("json", bodySchema),
	async (c) => {
		const { code } = c.req.valid("json");

		const getGoogleAccessTokenUseCase = makeGetGoogleAccessTokenUseCase();
		const getGoogleUserUseCase = makeGetGoogleUserUseCase();

		const { accessToken } = await getGoogleAccessTokenUseCase.execute(code);
		const { user } = await getGoogleUserUseCase.execute(accessToken);

		const token = await sign({ sub: user.id }, env.JWT_SECRET);

		return c.json({ token });
	},
);
