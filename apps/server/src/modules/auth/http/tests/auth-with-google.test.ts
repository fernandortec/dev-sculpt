import { describe, expect, it } from "bun:test";
import { app } from "@/app";

describe("E2E Auth with google", () => {
	const mockCode =
		"4/0AdLIrYfRQ1Ia8rRTCgOWQ-XCzNn1RQRa3zpwAK0HvZIWZ40dt5JRyLN4DuO4on1PKfajAw";

	it.skip("should be able to authenticate with google", async () => {
		const response = await app.request("/auth/google", {
			method: "POST",
			body: JSON.stringify({ code: mockCode }),
			headers: { "Content-Type": "application/json" },
		});

		const { token } = await response.json();
		expect(token).toEqual(expect.any(String));
	});
});
