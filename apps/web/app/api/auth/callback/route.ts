import { fetcher } from "@/wrappers/fetch*";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<void> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const provider = url.searchParams.get("provider");

	const response = await fetcher(`/auth/${provider}`, {
		method: "POST",
		body: { code },
	});

	if (!response.ok) throw new Error("opa");

	const { token } = await response.json();

	const cookieStore = cookies();
	cookieStore.set("authorization", token, {
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	return redirect("/dashboard");
}
