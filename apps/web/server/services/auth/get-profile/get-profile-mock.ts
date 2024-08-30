import type { User } from "@sculpt/drizzle";
import { http, HttpResponse } from "msw";

export const getProfileMock = http.get<never, never, User>(
	"http://localhost:3001/users/me",
	async () => {
		return HttpResponse.json({
			avatarUrl: "fake-avatar-url",
			email: "fake-email",
			name: "fake-name",
			bio: "fake-bio",
			companyId: "fake-company-id",
			createdAt: new Date(),
			id: "fake-id",
			passwordHash: "fake-password-hash",
			role: "jobseeker",
		});
	},
);
