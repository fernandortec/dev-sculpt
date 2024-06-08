import { z } from "zod";

export const signinInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type SigninInputSchema = z.infer<typeof signinInputSchema>;
