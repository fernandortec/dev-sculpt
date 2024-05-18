import { z } from "zod";

export const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string(),
	role: z.enum(["jobseeker", "recruiter"]),
	avatarUrl: z.string(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
