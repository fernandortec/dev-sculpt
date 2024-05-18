import { app } from "@/app";

interface CreateAndAuthenticateUserResponse {
	token: string;
}

export async function createAndAuthenticateUser(): Promise<CreateAndAuthenticateUserResponse> {
	const userResponse = await app.request("/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: "Fake User",
			email: "john@doe.com",
			role: "jobseeker",
			bio: null,
			companyId: null,
			avatarUrl: null,
		}),
	});

	const user = await userResponse.json();

	// Authenticate user
	return { token: "" };
}
