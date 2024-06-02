"use client";

export function MockProvider(): JSX.Element {
	async function initMocks() {
		if (typeof window === "undefined") {
			const { server } = await import("./node");
			server.listen({ onUnhandledRequest: "bypass" });
		} else {
			const { worker } = await import("./browser");
			worker.start({ onUnhandledRequest: "bypass" });
		}
	}

	if (process.env.NEXT_PUBLIC_API_MOCKING) {
		console.log("opaopaopaopa");
		initMocks();
	}

	return <></>;
}
