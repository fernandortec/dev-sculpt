"use server";

import { fetcher } from "@/wrappers/fetch*";
import type { User } from "@sculpt/drizzle";
import { redirect } from "next/navigation";

export async function getProfile(): Promise<{ user: User }> {
	const response = await fetcher("/users/me");
	if (!response.ok) return redirect("/signin")

	const user = await response.json();

	return { user };
}
