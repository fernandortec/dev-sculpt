import type { CreateAccount } from "@/modules/accounts/schemas/create-account";
import type { Account } from "@sculpt/drizzle";

export interface AccountsRepository {
	create({
		provider,
		providerAccountId,
		userId,
	}: CreateAccount): Promise<Account>;
	getByUser(
		provider: "github" | "google" | "linkedin",
		userId: string,
	): Promise<Account | null>;
}
