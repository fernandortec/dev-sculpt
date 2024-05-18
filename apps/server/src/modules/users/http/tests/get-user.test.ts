import { describe, expect, it } from "bun:test";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/test/create-and-auth-user";

describe("E2E Get user", () => {
	it("should be able to get an user", async () => {
		const { token } = await createAndAuthenticateUser();

		const userResponse = await app.request("/users/me", {
			headers: { Authorization: token },
		});

		const user = await userResponse.json();

		expect(user).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				email: "john@doe.com",
				role: "jobseeker",
			}),
		);
	});
});
