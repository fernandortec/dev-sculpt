import { UnauthenticatedError } from "@/errors/unauthenticated-error";
import { env } from "@sculpt/env";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export interface AuthInContext {
	Variables: {
		userId: { userId: string };
	};
}

export const auth = createMiddleware<AuthInContext>(
	async (c, next): Promise<void> => {
		const authorization = c.req.header("authorization");
		if (!authorization) throw new UnauthenticatedError();

		const payload = await verify(authorization, env.JWT_SECRET);

		c.set("userId", { userId: payload.sub });

		await next();
	},
);
