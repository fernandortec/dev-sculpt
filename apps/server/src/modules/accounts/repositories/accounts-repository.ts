import type { Account, CreateAccount } from "@sculpt/drizzle";

export interface AccountsRepository {
	create({
		provider,
		providerAccountId,
		userId,
		id,
	}: CreateAccount): Promise<Account>;
	getByUser(
		provider: "github" | "google" | "linkedin",
		userId: string,
	): Promise<Account | null>;
}
