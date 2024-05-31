import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { MustHavePasswordError } from "@/errors/must-have-password-error";
import { serverErrorHandler } from "@/middlewares/server-error-handler";
import { zErrHandler } from "@/middlewares/zod-error-handler";
import { authWithPasswordSchema } from "@/modules/auth/schemas/auth-with-password";
import { makeAuthWithPasswordUseCase } from "@/modules/auth/use-cases/factories";
import type { JSONResponse } from "@/shared/hono";
import { zValidator } from "@hono/zod-validator";
import { env } from "@sculpt/env";
import { Hono } from "hono";
import { sign } from "hono/jwt";

type Response = JSONResponse<{ token: string }>;

export const authWithPassword = new Hono()
	.post(
		"/auth/standard",
		zValidator("json", authWithPasswordSchema, zErrHandler),
		async (c): Promise<Response> => {
			const { email, password } = c.req.valid("json");

			const authWithPasswordUseCase = makeAuthWithPasswordUseCase();

			const { userId } = await authWithPasswordUseCase.execute(email, password);

			const token = await sign({ sub: userId }, env.JWT_SECRET);

			return c.json({ token }, 200);
		},
	)
	.onError((err, c) => {
		switch (err.constructor) {
			case MustHavePasswordError:
				return c.json({ message: err.message }, 409);
			case InvalidCredentialsError:
				return c.json({ message: err.message }, 400);
			default:
				return serverErrorHandler(err, c);
		}
	});
