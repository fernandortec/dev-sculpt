import type { AuthWithPassword } from "@/shared/public-schemas";
import { http, HttpResponse } from "msw";

export const authWithPasswordMock = http.post<never, AuthWithPassword>(
	"http://localhost:3001/auth/standard",
	async ({ request }) => {
		const { email, password } = await request.json();

		if (email === "john@doe.com" && password === "password") {
			return HttpResponse.json({ token: "valid" }, { status: 200 });
		}

		return new HttpResponse(null, { status: 400 });
	},
);
