import { makeAuthFromLinkUseCase } from "@/use-cases/_factories/auth-links-factories";
import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { z } from "zod";

const querySchema = z.object({ code: z.string(), redirect: z.string().url() });

export const authFromLink = new Hono().get(
	"/validate",
	zValidator("query", querySchema),
	async (c): Promise<Response> => {
		const { code, redirect } = c.req.valid("query");

		const authLinkUseCase = makeAuthFromLinkUseCase();

		const { userId } = await authLinkUseCase.execute(code);

		const token = await sign({ sub: userId }, env.JWT_SECRET);

		setCookie(c, "auth", token, {
			maxAge: 20000,
			path: "/",
		});

		return c.redirect(redirect, 302);
	},
);
