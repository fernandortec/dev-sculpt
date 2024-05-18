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

	const authLinkResponse = await app.request("/auth-links/send", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: user.email,
		}),
	});

	const authLink = await authLinkResponse.json();
	const code = authLink.match(/[?&]code=([^&#]+)/)?.[1];

	const authFromLinkResponse = await app.request(
		`/auth-links/validate?code=${code}&redirect=http://localhost:3000`,
		{},
	);

	const fullToken = authFromLinkResponse.headers.get("set-cookie");
	const token = fullToken?.match(/auth=([^;]+)/)?.[1];

	return { token: String(token) };
}
