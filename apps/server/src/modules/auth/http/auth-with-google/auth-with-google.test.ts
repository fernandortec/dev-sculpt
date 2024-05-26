import { describe, expect, it } from "bun:test";
import { app } from "@/app";

//https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%3Fprovider%3Dgoogle&response_type=code&client_id=265041287621-863isjbq9h28pfm0vpj89rdlbi7msu43.apps.googleusercontent.com

describe("E2E Auth with google", () => {
	const mockCode =
		"4/0AdLIrYcM0f1n16kXtsr0fQ5B_zHJyqIZfoz7ttMbawNe1s8o9hWOzvkc6Dvymt0neaVObg";

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
