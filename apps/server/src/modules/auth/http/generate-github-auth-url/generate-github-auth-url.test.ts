import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Generate Github auth URL", () => {
	it("should be able to generate Github auth url", async () => {
		const response = await app.request("auth/gen-link/github", {
			headers: { "Content-Type": "application/json" },
		});

		const url = await response.text();
		expect(url).toEqual(expect.any(String));
	});
});
