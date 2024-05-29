import { toast } from "sonner";
import type { SafeParseSuccess, TypeOf, ZodSchema } from "zod";

export function safeParser<T extends ZodSchema>(
	schema: T,
	value: unknown,
): SafeParseSuccess<TypeOf<T>> {
	const data = schema.safeParse(value);
	if (!data.success) {
		toast.error("Dados inválidos");
		throw new Error("Invalid data");
	}

	return data;
}
