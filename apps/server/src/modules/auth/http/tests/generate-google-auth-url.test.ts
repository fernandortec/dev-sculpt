import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Generate google auth URL", () => {
	it("should be able to generate google auth url", async () => {
		const response = await app.request("/auth/google", {
			headers: { "Content-Type": "application/json" },
		});
		
		expect(response.status).toBe(302);
		expect(response.headers.get("location")).toEqual(expect.any(String));
	});
});
