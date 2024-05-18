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
				bio: null,
				companyId: null,
				avatarUrl: null,
			}),
		});

		const user = await response.json();

		expect(user).toEqual(
			expect.objectContaining({
				role: "jobseeker",
				bio: null,
				email: "john@doe.com",
			}),
		);
	});
});
