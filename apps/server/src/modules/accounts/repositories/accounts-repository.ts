import type { Account, CreateAccount } from "@sculpt/drizzle";

export interface AccountsRepository {
	create({
		provider,
		providerAccountId,
		userId,
		id,
	}: CreateAccount): Promise<Account>;
	getById(id: string): Promise<Account | null>;
}
