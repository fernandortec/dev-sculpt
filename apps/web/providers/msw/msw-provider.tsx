"use client";

export function MswMocksProvider(): null {
	async function initMocks() {
		if (typeof window === "undefined") {
			const { server } = await import("./msw-node");
			server.listen({ onUnhandledRequest: "bypass" });
		}
	}

	if (typeof process.env.NEXT_PUBLIC_API_MOCKING === "boolean") {
		initMocks();
	}

	return null;
}
