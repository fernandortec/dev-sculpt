"use server";

import { fetcher } from "@/wrappers/fetch*";

export async function generateOauthProviderUrl(
	provider: string,
): Promise<string> {
	const response = await fetcher(`/auth/gen-link/${provider}`);
	if(!response.ok) return '' //treat error

	const data = await response.text();

	return data;
}
