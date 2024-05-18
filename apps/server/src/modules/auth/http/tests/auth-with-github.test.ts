import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Auth with github", () => {
	const mockCode = "0892f41babbd46c5698b"; // Access https://github.com/login/oauth/authorize to fill
	it("should be able to authenticate with github", async () => {
		const authWithGithubResponse = await app.request("/auth/github", {
			method: "POST",
			body: JSON.stringify({ code: mockCode }),
			headers: { "Content-Type": "application/json" },
		});

		const { token } = await authWithGithubResponse.json();
		expect(token).toEqual(expect.any(String));
	});
});
