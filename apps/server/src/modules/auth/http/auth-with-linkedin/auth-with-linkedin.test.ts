import { describe, expect, it } from "bun:test";
import { app } from "@/app";

//https://www.linkedin.com/oauth/v2/authorization?scope=email+profile+openid&response_type=code&client_id=77smbq4s0b153h&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%3Fprovider%3Dlinkedin

describe("E2E Auth with linkedin", () => {
	const mockCode =
		"AQQCLRoylx3L6ysjzZyd7hhZJ6kW8hQVmRVc-1JE_py1y9XVFtX_8Up-ptYz6tLDfG61eEEhSy4GrpNxCXUARMAF-gIANeB7iItuL8d2bb5ZXj9FZcmLjrZluM2xWdm9FvdFasEYI0hhTQtMUqKzGletCZnPnjtyE1EEnaDcD55zAGYxLvwB2ECD6Uruq83FRYcpNLuVC47H0gcmBEQ";

	it.skip("should be able to authenticate with google", async () => {
		const response = await app.request("/auth/linkedin", {
			method: "POST",
			body: JSON.stringify({ code: mockCode }),
			headers: { "Content-Type": "application/json" },
		});

		const { token } = await response.json();
		expect(token).toEqual(expect.any(String));
	});
});
