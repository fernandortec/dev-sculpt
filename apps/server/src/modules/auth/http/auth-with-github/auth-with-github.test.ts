import { describe, expect, it } from "bun:test";
import { app } from "@/app";

//https://github.com/login/oauth/authorize?client_id=Ov23li7ArTomAM9romgb&redirect_url=http://localhost:3000/signup

describe("E2E Auth with github", () => {
	const mockCode = "48309ed689de01247c73";

	it.skip("should be able to authenticate with github", async () => {
		const response = await app.request("/auth/github", {
			method: "POST",
			body: JSON.stringify({ code: mockCode }),
			headers: { "Content-Type": "application/json" },
		});

		const { token } = await response.json();
		expect(token).toEqual(expect.any(String));
	});
});
