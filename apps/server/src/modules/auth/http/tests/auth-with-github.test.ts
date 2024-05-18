import { describe, it } from "bun:test";
import { app } from "@/app";
import { env } from "@sculpt/env";

describe("E2E Auth with github", () => {
	const mockCode = "6bdb67da620364ea8025"; // Access https://github.com/login/oauth/authorize to fill
	it("should be able to authenticate with github", async () => {
		const response = await app.request("/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "Fake User",
				email: "jane@doe.com",
				role: "jobseeker",
				bio: null,
				companyId: null,
			}),
		});

		const user = await response.json();

		const authWithGithubResponse = await app.request(
			`/auth/github?code=${mockCode}`,
			{
				headers: { "Content-Type": "application/json" },
			},
		);

		const githubUser = await authWithGithubResponse.json();
		console.log(githubUser);
	});
});
