import { makeAuthFromLinkUseCase } from "@/use-cases/_factories/auth-links-factories";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const querySchema = z.object({ code: z.string(), redirect: z.string().url() });

export const authFromLink = new Hono().post(
	"/validate",
	zValidator("query", querySchema),
	async (c): Promise<void> => {
		const { code, redirect } = c.req.valid("query");

		const authLinkUseCase = makeAuthFromLinkUseCase();

		const { userId } = await authLinkUseCase.execute(code);

		c.redirect(redirect);
	},
);
