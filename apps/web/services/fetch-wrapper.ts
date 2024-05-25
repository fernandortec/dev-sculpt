import { env } from "@sculpt/env";
import { cookies } from "next/headers";

interface FetcherRequest extends Omit<RequestInit, "body"> {
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
	body: { [key: string]: unknown };
	query?: { [key: string]: string };
}

export async function fetcher(
	input: string | URL | globalThis.Request,
	init?: FetcherRequest,
): Promise<Response> {
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

	const baseURL = new URL(`${env.API_BASE_URL}/${input}`);
	if (init?.query) {
		for (const key of Object.keys(init.query)) {
			baseURL.searchParams.append(key, String(init.query[key]));
		}
	}

	const response = await fetch(baseURL, parsedInit);

	if (!response.ok) {
		const errorDetails = {
			message: "The HTTP request encountered an error.",
			status: response.status,
			statusText: response.statusText,
			url: response.url,
			stack: new Error().stack?.split("\n").slice(1).join("\n"),
		};

		const errorMessage = `
        ${errorDetails.message}
        Status: ${errorDetails.status} ${errorDetails.statusText}
        URL: ${errorDetails.url}
        Stack Trace: ${errorDetails.stack}
    `;

		throw new Error(errorMessage);
	}

	return response;
}
