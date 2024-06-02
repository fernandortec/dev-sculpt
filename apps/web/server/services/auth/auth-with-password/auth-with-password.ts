"use server";

import { fetcher } from "@/wrappers/fetch*";
import type { AuthWithPassword } from "@sculpt/server";
import { cookies } from "next/headers";

export async function authWithPassword({
	email,
	password,
}: AuthWithPassword): Promise<void> {
	const response = await fetcher("/auth/standard", {
		method: "POST",
		body: { email, password },
	});

	const { token } = await response.json();

	const cookieStore = cookies();
	cookieStore.set("authorization", token, {
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});
}
