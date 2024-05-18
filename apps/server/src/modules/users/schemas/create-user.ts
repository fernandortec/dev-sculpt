import { z } from "zod";

export const createUserSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	role: z.enum(["jobseeker", "recruiter"]),
	password: z.string().nullable(),
	avatarUrl: z.string(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
