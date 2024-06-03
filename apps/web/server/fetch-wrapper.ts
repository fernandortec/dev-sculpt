import { env } from "@sculpt/env";
import { cookies } from "next/headers";

export interface ServiceResponse {
	message?: string;
	error?: string;
}

interface FetcherRequest extends Omit<RequestInit, "body"> {
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
	body: { [key: string]: unknown };
	query?: { [key: string]: string };
}

interface FetcherResponse<T> extends Response {
	ok: true;
	json(): Promise<T>;
}

type HttpResponse<T> = { ok: false; error: string } | FetcherResponse<T>;

// biome-ignore lint/suspicious/noExplicitAny:
export async function fetcher<T = any>(
	input: string | URL | globalThis.Request,
	init?: FetcherRequest,
): Promise<HttpResponse<T>> {
	const cookiesStore = cookies();
	const authorization = cookiesStore.get("authorization");

	const parsedInit: RequestInit = {
		...init,
		body: JSON.stringify(init?.body),
		headers: {
			"Content-Type": "application/json",
			Authorization: authorization?.value ?? "",
			...init?.headers,
		},
	};

	const baseURL = new URL(`${env.API_BASE_URL}${input}`);
	if (init?.query) {
		for (const key of Object.keys(init.query)) {
			baseURL.searchParams.append(key, String(init.query[key]));
		}
	}

	const response = await fetch(baseURL, parsedInit);
	if (!response.ok) {
		const errorDetails = {
			message: "The HTTP request encountered an error.",
			response: response,
		};

		const errorMessage = `
        ${errorDetails.message}
        Status: ${errorDetails.response.status} ${errorDetails.response.statusText}
        URL: ${errorDetails.response.url}
    `;

		console.error(errorDetails);
		return { ok: false, error: errorMessage };
	}

	return response as FetcherResponse<T>;
}
