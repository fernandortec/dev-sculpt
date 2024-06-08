"use server";

import type { ServiceResponse } from "@/services/types";
import { fetcher } from "@/wrappers/fetch*";
import type { User } from "@sculpt/drizzle";

export async function getProfile(): Promise<ServiceResponse<{ user: User }>> {
	const response = await fetcher("/users/me");
	if (!response.ok) return { error: response.error };

	const user = await response.json();

	return { content: user };
}
