import { makeGenerateGoogleAuthUrlUseCase } from "@/modules/auth/use-cases/_factories";
import { Hono } from "hono";

export const generateGoogleAuthUrl = new Hono().get(
	"auth/gen-link/google",
	async (c): Promise<Response> => {
		const generateGoogleAuthUrlUseCase = makeGenerateGoogleAuthUrlUseCase();

		const { url } = await generateGoogleAuthUrlUseCase.execute();

		return c.body(url);
	},
);
