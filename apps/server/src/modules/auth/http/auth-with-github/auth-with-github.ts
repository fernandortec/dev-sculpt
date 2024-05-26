import type { JSONResponse } from "@/@types/hono";
import {
	makeGetGithubAccessTokenUseCase,
	makeGetGithubUserUseCase,
	makeGetOrCreateAccountUseCase,
} from "@/modules/auth/use-cases/_factories";
import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";

type Response = JSONResponse<{ token: string }>;

const bodySchema = z.object({ code: z.string() });

export const authWithGithub = new Hono().post(
	"/auth/github",
	zValidator("json", bodySchema),
	async (c): Promise<Response> => {
		const { code } = c.req.valid("json");

		const getGithubAccessTokenUseCase = makeGetGithubAccessTokenUseCase();
		const getGithubUserUseCase = makeGetGithubUserUseCase();
		const getOrCreateAccountUseCase = makeGetOrCreateAccountUseCase();

		const { accessToken } = await getGithubAccessTokenUseCase.execute(code);
		const { user: githubUser } =
			await getGithubUserUseCase.execute(accessToken);

		const { userId } = await getOrCreateAccountUseCase.execute({
			user: githubUser,
			provider: "github",
		});

		const token = await sign({ sub: userId }, env.JWT_SECRET);

		return c.json({ token });
	},
);
