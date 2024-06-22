export async function register(): Promise<void> {
	if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PUBLIC_API_MOCKING === "true") {
		const { server } = await import("./providers/msw/msw-node");
		server.listen();
	}
}
