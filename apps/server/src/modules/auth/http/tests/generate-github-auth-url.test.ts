import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Generate Github auth URL", () => {
	it("should be able to generate Github auth url", async () => {
		const response = await app.request("/gen-link/github", {
			headers: { "Content-Type": "application/json" },
		});

		expect(response.status).toBe(302);
		expect(response.headers.get("location")).toEqual(expect.any(String));
	});
});
