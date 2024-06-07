"use server";

import { toaster } from "@/lib/toast/toaster";
import type { ServiceResponse } from "@/services/types";
import { fetcher } from "@/wrappers/fetch*";
import type { User } from "@sculpt/drizzle";

export async function getProfile(): Promise<ServiceResponse<{ user: User }>> {
	const response = await fetcher("/users/me");

	if (!response.ok) return toaster("error", "Failed to fetch user profile");
	const user = await response.json();
  
  toaster("success", 'opaopapoaop')

	return { user };
}
