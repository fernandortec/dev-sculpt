import {
	makeGetGithubAccessTokenUseCase,
	makeGetGithubUserUseCase,
} from "@/use-cases/_factories/auth-factories";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const querySchema = z.object({ code: z.string() });

export const authWithGithub = new Hono().get(
	"/github",
	zValidator("query", querySchema),
	async (c) => {
		const { code } = c.req.valid("query");

		const getGithubAccessTokenUseCase = makeGetGithubAccessTokenUseCase();
		const getGithubUserUseCase = makeGetGithubUserUseCase();

		const { accessToken } = await getGithubAccessTokenUseCase.execute(code);
		const { user } = await getGithubUserUseCase.execute(accessToken);

		console.log(user);

		return c.json({ user });
	},
);
