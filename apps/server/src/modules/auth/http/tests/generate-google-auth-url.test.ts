import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Generate google auth URL", () => {
	it("should be able to generate google auth url", async () => {
		const authWithGoogleResponse = await app.request("/auth/google", {
			headers: { "Content-Type": "application/json" },
		});

		const { url } = await authWithGoogleResponse.json();
		expect(url).toEqual(expect.any(String));
	});
});