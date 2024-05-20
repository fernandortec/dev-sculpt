import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import type { CreateAccount } from "@/modules/accounts/schemas/create-account";
import type { GetByUser } from "@/modules/accounts/schemas/get-by-user";
import { createId } from "@paralleldrive/cuid2";
import type { Account } from "@sculpt/drizzle";

export class InMemoryAccountsRepository implements AccountsRepository {
	private accounts: Account[] = [];

	async create({
		provider,
		providerAccountId,
		userId,
	}: CreateAccount): Promise<Account> {
		const account: Account = {
			id: createId(),
			provider,
			providerAccountId,
			userId,
		};

		this.accounts.push(account);

		return account;
	}

	async getByUser({ provider, userId }: GetByUser): Promise<Account | null> {
		return (
			this.accounts.find(
				(account) => account.provider === provider && account.userId === userId,
			) ?? null
		);
	}
}
