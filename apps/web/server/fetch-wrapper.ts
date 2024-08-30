import { env } from "@sculpt/env";

interface FetcherRequest extends Omit<RequestInit, "body"> {
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
	body: unknown;
	query?: { [key: string]: string };
	errorToast?: string;
}

interface FetcherResponse<T> extends Response {
	ok: true;
	json(): Promise<T>;
}

// biome-ignore lint/suspicious/noExplicitAny:
export async function fetcher<T = any>(
	input: string | URL | globalThis.Request,
	init?: FetcherRequest,
): Promise<FetcherResponse<T>> {
	const parsedInit: RequestInit = {
		...init,
		body: JSON.stringify(init?.body),
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
	};

	const baseURL = new URL(
		typeof input === "string" && input.includes("http")
			? input
			: `${env.API_BASE_URL}${input}`,
	);

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

		throw new Error(errorMessage);
	}

	return response as FetcherResponse<T>;
}
