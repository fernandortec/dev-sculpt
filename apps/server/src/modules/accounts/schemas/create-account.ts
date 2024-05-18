import { z } from "zod";

export const createAccountSchema = z.object({
	provider: z.enum(["github", "google", "linkedin"]),
	providerAccountId: z.string(),
	userId: z.string(),
});

export type CreateAccount = z.infer<typeof createAccountSchema>;
