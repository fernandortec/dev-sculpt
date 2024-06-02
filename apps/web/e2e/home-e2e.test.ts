import { expect, test } from "@playwright/test";

test("should display the home page", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await expect(
		page.getByPlaceholder("Procurar por palavras chaves"),
	).toBeVisible();
	await expect(page.getByRole("button", { name: "Pesquisar" })).toBeVisible();
	await expect(page.getByRole("heading", { name: "Dev Sculpt" })).toBeVisible();
});
