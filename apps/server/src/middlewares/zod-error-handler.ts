import type { Context, TypedResponse } from "hono";
import type { ZodError } from "zod";

type Result =
	| {
			success: true;
			data: unknown;
	  }
	| {
			success: false;
			error: ZodError;
			data: unknown;
	  };

// biome-ignore lint/suspicious/noConfusingVoidType:
type ErrResponse = void | Response;

export async function zErrHandler(
	result: Result,
	c: Context,
): Promise<ErrResponse> {
	if (!result.success) {
		const error = result.error.issues;

		return c.json({ message: "zod-error", error: error }, 400);
	}

	return result.data;
}
