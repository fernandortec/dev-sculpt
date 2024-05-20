import { z } from "zod";

export const getByUserSchema = z.object({
	provider: z.enum(["github", "google", "linkedin"]),
	userId: z.string(),
});

export type GetByUser = z.infer<typeof getByUserSchema>;
