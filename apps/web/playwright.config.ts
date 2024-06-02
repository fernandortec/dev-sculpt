import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "e2e",
	testMatch: "**/*-e2e.test.ts",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",

	use: {
		baseURL: "http://127.0.0.1:3000",
		trace: "on-first-retry",
	},

	webServer: {
		command: "bun dev",
		url: "http://127.0.0.1:3000",
		reuseExistingServer: !process.env.CI,
	},
});
