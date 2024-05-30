import type { ErrorHandler } from "hono";

export const serverErrorHandler: ErrorHandler = (err, c) => {
	console.error({ type: "Internal server error", err });

	return c.json({ error: err.message }, 500);
};
