import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import {
	type Account,
	type CreateAccount,
	accounts,
	db,
} from "@sculpt/drizzle";
import { eq } from "drizzle-orm";

export class DrizzleAccountsRepository implements AccountsRepository {
	async create({
		provider,
		providerAccountId,
		userId,
	}: CreateAccount): Promise<Account> {
		const [account] = await db
			.insert(accounts)
			.values({ provider, providerAccountId, userId });

		return account;
	}
	async getById(id: string): Promise<Account | null> {
		const [account] = await db
			.select()
			.from(accounts)
			.where(eq(accounts.id, id));

		return account;
	}
}
