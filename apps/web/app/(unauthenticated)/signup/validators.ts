import { z } from "zod";

export const signupSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	role: z.enum(["jobseeker", "recruiter"]),
});

export type SignupSchema = z.infer<typeof signupSchema>;
