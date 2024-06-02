export async function register(): Promise<void> {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { server } = await import("./lib/msw/msw-node");
		server.listen();
	}
}
