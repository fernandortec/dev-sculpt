import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetcher } from "../../../../server/fetch-wrapper";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<void> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const provider = url.searchParams.get("provider");

	const response = await fetcher(`/auth/${provider}`, {
		method: "POST",
		body: { code },
	});

	const { token } = await response.json();

	const cookieStore = cookies();
	cookieStore.set("authorization", token, {
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	return redirect("/dashboard");
}
