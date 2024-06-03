import type { CreateUser } from "@/shared/public-schemas";
import { http, HttpResponse } from "msw";

export const createUserMock = http.post<never, CreateUser>(
	"http://localhost:3001/users",
	async ({ request }): Promise<HttpResponse> => {
		const { email, password } = await request.json();

		if (email === "john@doe.com" && password === "password") {
			return HttpResponse.json({ email: "john@doe.com" }, { status: 200 });
		}

		return new HttpResponse(null, { status: 400 });
	},
);
