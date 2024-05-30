import { z } from "zod";

export const authWithPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type AuthWithPassword = z.infer<typeof authWithPasswordSchema>;
