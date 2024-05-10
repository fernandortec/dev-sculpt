import { describe, expect, it } from "bun:test";
import { app } from "@/http/app";

describe("E2E Send auth link", () => {
	it("should be able to send an auth link", async () => {
		const response = await app.request("/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "Fake User",
				email: "john@doe.com",
				role: "jobseeker",
				bio: null,
				companyId: null,
			}),
		});

		const user = await response.json();

		const authLinkResponse = await app.request("/auth-links/send", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: user.email,
			}),
		});

		const authLink = await authLinkResponse.json();

		expect(authLink).toEqual(expect.any(String));
		expect(authLink).toContain("authenticate");
	});
});
