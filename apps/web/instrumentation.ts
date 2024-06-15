export async function register(): Promise<void> {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { server } = await import("./providers/msw/msw-node");
		server.listen();
	}
}
