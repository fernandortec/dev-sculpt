"use server";

import { env } from "@sculpt/env";

export async function generateOauthProviderUrl(
	provider: "github" | "linkedin" | "gmail",
) {
	const response = await fetch(`${env.API_BASE_URL}/auth/gen-link/${provider}`);

	const data = await response.json();

	return data;
}
