import { app } from "@/app";

interface CreateAndAuthenticateUserResponse {
	token: string;
}

export async function createAndAuthenticateUser(): Promise<CreateAndAuthenticateUserResponse> {
		await app.request("/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "Fake User",
				email: "john@doe.com",
				role: "jobseeker",
				password: "anypassword",
				avatarUrl: "https://example.com/avatar.png",
			}),
		});

		const response = await app.request("/auth/standard", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: "john@doe.com",
				password: "anypassword",
			}),
		});

		const { token } = await response.json();

		return { token };
}
