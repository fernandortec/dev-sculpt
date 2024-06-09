import { expect, test } from "@playwright/test";

test("should sign up and redirect", async ({ page }) => {
	await page.goto("/signup", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Nome e sobrenome").fill("John Doe");
	await page.getByPlaceholder("Email").fill("john@doe.com");
	await page.getByPlaceholder("Senha").fill("password");

	await page.getByRole("combobox").click();
	await page.getByLabel("Estou procurando oportunidades").click();
	await page.getByRole("button", { name: "Começar" }).click();

	await page.waitForURL("dashboard");
	expect(page.url()).toContain("/dashboard");
});

test("should pop up error form message", async ({ page }) => {
	await page.goto("/signup", { waitUntil: "networkidle" });

	await page.getByPlaceholder("Nome e sobrenome").fill("Not John Doe");
	await page.getByPlaceholder("Email").fill("notjohn@doe.com");
	await page.getByPlaceholder("Senha").fill("notpassword");

	await page.getByRole("combobox").click();
	await page.getByLabel("Estou procurando oportunidades").click();
	await page.getByRole("button", { name: "Começar" }).click();

	await expect(
		page.getByText("Houve um erro ao criar o usuário"),
	).toBeVisible();
});
