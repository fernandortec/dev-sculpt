import type { JSONResponse } from "@/@types/hono";
import {
	makeGetGoogleAccessTokenUseCase,
	makeGetGoogleUserUseCase,
	makeGetOrCreateAccountUseCase,
} from "@/modules/auth/use-cases/factories";

import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";

type Response = JSONResponse<{ token: string }>;
const bodySchema = z.object({ code: z.string() });

export const authWithGoogle = new Hono().post(
	"/auth/google",
	zValidator("json", bodySchema),
	async (c): Promise<Response> => {
		const { code } = c.req.valid("json");

		const getGoogleAccessTokenUseCase = makeGetGoogleAccessTokenUseCase();
		const getGoogleUserUseCase = makeGetGoogleUserUseCase();
		const getOrCreateAccountUseCase = makeGetOrCreateAccountUseCase();

		const { accessToken } = await getGoogleAccessTokenUseCase.execute(code);
		const { user: oauthUser } = await getGoogleUserUseCase.execute(accessToken);

		const { userId } = await getOrCreateAccountUseCase.execute({
			user: oauthUser,
			provider: "google",
		});

		const token = await sign({ sub: userId }, env.JWT_SECRET);

		return c.json({ token });
	},
);
