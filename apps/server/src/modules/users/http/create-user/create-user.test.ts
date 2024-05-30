import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Create user", () => {
	it("should be able to create an user", async () => {
		const response = await app.request("/users", {
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

		const { user } = await response.json();

		expect(user).toEqual(
			expect.objectContaining({
				role: "jobseeker",
				bio: null,
				email: "john@doe.com",
			}),
		);
	});
});
