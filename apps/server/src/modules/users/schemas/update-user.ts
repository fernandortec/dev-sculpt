import { z } from "zod";

export const updateUserSchema = z.object({
	id: z.string().cuid2(),
	bio: z.string().optional(),
	email: z.string().email().optional(),
	name: z.string().optional(),
	role: z.enum(["jobseeker", "recruiter"]).optional(),
	avatarUrl: z.string().optional(),
	companyId: z.string().cuid2().optional(),
	passwordHash: z.string(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
