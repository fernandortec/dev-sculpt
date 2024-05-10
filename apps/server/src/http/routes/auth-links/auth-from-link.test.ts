import { describe, expect, it } from "bun:test";
import { app } from "@/http/app";

describe("E2E Auth from link", () => {
	it("should be able to authenticate from link", async () => {
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
		const code = authLink.match(/[?&]code=([^&#]+)/)?.[1];

		const authFromLink = await app.request(
			`/auth-links/validate?code=${code}&redirect=http://localhost:3000`,
			{},
		);

		expect(authFromLink.headers.get("location")).toEqual(
			"http://localhost:3000",
		);
		expect(authFromLink.headers.get("set-cookie")).toEqual(expect.any(String));
	});
});
