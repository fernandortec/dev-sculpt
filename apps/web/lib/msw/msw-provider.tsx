"use client";

export function MswMocksProvider(): null {
	async function initMocks() {
		if (typeof window === "undefined") {
			const { server } = await import("./msw-node");
			server.listen({ onUnhandledRequest: "bypass" });
		} else {
			const { worker } = await import("./msw-browser");
			worker.start({ onUnhandledRequest: "bypass" });
		}
	}

	if (process.env.NEXT_PUBLIC_API_MOCKING) {
		initMocks();
	}

	return null;
}
