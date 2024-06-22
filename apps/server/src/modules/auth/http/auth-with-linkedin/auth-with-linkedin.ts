import {
	makeGetLinkedinAccessTokenUseCase,
	makeGetLinkedinUserUseCase,
	makeGetOrCreateAccountUseCase,
} from "@/modules/auth/use-cases/factories";
import type { JSONResponse } from "@/shared/hono-types";

import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";

type Response = JSONResponse<{ token: string }>;
const bodySchema = z.object({ code: z.string() });

export const authWithLinkedin = new Hono().post(
	"/auth/linkedin",
	zValidator("json", bodySchema),
	async (c): Promise<Response> => {
		const { code } = c.req.valid("json");

		const getLinkedinAccessTokenUseCase = makeGetLinkedinAccessTokenUseCase();
		const getLinkedinUserUseCase = makeGetLinkedinUserUseCase();
		const getOrCreateAccountUseCase = makeGetOrCreateAccountUseCase();

		const { accessToken } = await getLinkedinAccessTokenUseCase.execute(code);
		const { user: oauthUser } =
			await getLinkedinUserUseCase.execute(accessToken);

		const { userId } = await getOrCreateAccountUseCase.execute({
			user: oauthUser,
			provider: "linkedin",
		});

		const token = await sign({ sub: userId }, env.JWT_SECRET);

		return c.json({ token });
	},
);
