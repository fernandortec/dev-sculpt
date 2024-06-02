import { expect, test } from "@playwright/test";

test("should sign in and redirect", async ({ page }) => {
	await page.goto("/signin", { waitUntil: "networkidle" });

	await page.getByPlaceholder("name@example.com").fill("ajohn@doe.com");
	await page.getByPlaceholder("********").fill("password");
	await page.getByRole("button", { name: "Continuar", exact: true }).click();

	await page.waitForTimeout(2000);

	expect(page.url()).toContain("/dashboard");
});

test("should pop up toast if credentials are invalid", async ({ page }) => {
	await page.goto("/signin", { waitUntil: "networkidle" });

	await page.getByPlaceholder("name@example.com").fill("notjohndoe@gmail.com");
	await page.getByPlaceholder("********").fill("notpassword");
	await page.getByRole("button", { name: "Continuar", exact: true }).click();

	await expect(page.getByText("Credenciais inválidas!")).toBeVisible();
});
