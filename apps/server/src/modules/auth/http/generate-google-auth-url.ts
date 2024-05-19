import type { JSONResponse } from "@/@types/hono";
import { makeGenerateGoogleAuthUrlUseCase } from "@/modules/auth/use-cases/_factories";

import { Hono } from "hono";

type Response = JSONResponse<{ url: string }>;

export const generateGoogleAuthUrl = new Hono().get(
	"/google",
	async (c): Promise<Response> => {
		const generateGoogleAuthUrlUseCase = makeGenerateGoogleAuthUrlUseCase();

		const { url } = await generateGoogleAuthUrlUseCase.execute();

		return c.json({ url }, 200);
	},
);
