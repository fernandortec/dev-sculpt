import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import { createId } from "@paralleldrive/cuid2";
import type { Account, CreateAccount } from "@sculpt/drizzle";

export class InMemoryAccountsRepository implements AccountsRepository {
	private accounts: Account[] = [];

	async create({
		provider,
		providerAccountId,
		userId,
		id,
	}: CreateAccount): Promise<Account> {
		const account: Account = {
			id: id ?? createId(),
			provider,
			providerAccountId,
			userId,
		};

		this.accounts.push(account);

		return account;
	}

	async getById(id: string): Promise<Account | null> {
		return this.accounts.find((account) => account.id === id) ?? null;
	}
}
