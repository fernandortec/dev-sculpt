import type { AuthWithPassword } from "@sculpt/server";
import { http, HttpResponse } from "msw";

export const authWithPasswordMock = http.post<never, AuthWithPassword>(
	"/auth/standard",
	async ({ request }) => {
		const { email, password } = await request.json();

		if (email === "john@doe.com" && password === "password") {
			return new HttpResponse("generated-jwt-token", { status: 200 });
		}

		return new HttpResponse(null, { status: 400 });
	},
);
