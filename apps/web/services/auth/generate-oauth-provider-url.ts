"use server";

import { fetcher } from "../fetch-wrapper";

export async function generateOauthProviderUrl(
	provider: string,
): Promise<string> {
	const response = await fetcher(`/auth/gen-link/${provider}`);
	const data = await response.text();

	return data;
}
