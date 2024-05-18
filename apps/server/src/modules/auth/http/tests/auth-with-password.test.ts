import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Auth with password", () => {
	it("should be able to authenticate with email and password", async () => {
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

		expect(token).toEqual(expect.any(String));
	});
});
