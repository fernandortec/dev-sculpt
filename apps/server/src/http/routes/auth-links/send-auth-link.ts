import type { JSONResponse } from "@/@types/hono";
import { makeSendAuthLinkUseCase } from "@/use-cases/_factories/auth-links-factories";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const bodySchema = z.object({ email: z.string().email() });

export const sendAuthLink = new Hono().post(
	"/send",
	zValidator("json", bodySchema),
	async (c): Promise<JSONResponse<string>> => {
		const { email } = c.req.valid("json");

		const sendAuthLinkUseCase = makeSendAuthLinkUseCase();

		const redirectUrl = await sendAuthLinkUseCase.execute(email);

		return c.json(redirectUrl);
	},
)
