"use server";

import { fetcher } from "@/wrappers/fetch*";

export async function generateOauthProviderUrl(
	provider: string,
): Promise<string> {
	const response = await fetcher(`/auth/gen-link/${provider}`);
	if(!response.ok) throw new Error('opa')

	const data = await response.text();

	return data;
}
