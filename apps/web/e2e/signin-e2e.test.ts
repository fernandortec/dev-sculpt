import { expect, test } from "@playwright/test";

test("should sign in and redirect", async ({ page }) => {
	await page.goto("/signin", { waitUntil: "networkidle" });

	await page.getByPlaceholder("name@example.com").fill("john@doe.com");
	await page.getByPlaceholder("********").fill("password");
	await page.getByRole("button", { name: "Continuar", exact: true }).click();

	await page.waitForURL("dashboard");
	expect(page.url()).toContain("/dashboard");
});

test("should pop up error form message", async ({ page }) => {
	await page.goto("/signin", { waitUntil: "networkidle" });

	await page.getByPlaceholder("name@example.com").fill("notjohndoe@gmail.com");
	await page.getByPlaceholder("********").fill("notpassword");
	await page.getByRole("button", { name: "Continuar", exact: true }).click();

	await expect(page.getByText("Credenciais inválidas!")).toBeVisible();
});
