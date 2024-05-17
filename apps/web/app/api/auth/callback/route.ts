import { redirect } from "next/navigation";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");

	console.log(code);
	redirect("https://nextjs.org/");
}
