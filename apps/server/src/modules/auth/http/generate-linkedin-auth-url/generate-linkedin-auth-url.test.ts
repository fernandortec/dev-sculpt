import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Generate LinkedIn auth URL", () => {
	it("should be able to generate LinkedIn auth url", async () => {
		const response = await app.request("auth/gen-link/linkedin", {
			headers: { "Content-Type": "application/json" },
		});

		const url = await response.text()
		expect(url).toEqual(expect.any(String));
	});
});
