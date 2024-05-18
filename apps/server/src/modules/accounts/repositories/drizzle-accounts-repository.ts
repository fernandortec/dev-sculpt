import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import {
	type Account,
	type CreateAccount,
	accounts,
	db,
} from "@sculpt/drizzle";
import { and, eq } from "drizzle-orm";

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
	async getByUser(
		provider: "github" | "google" | "linkedin",
		userId: string,
	): Promise<Account | null> {
		const [account] = await db
			.select()
			.from(accounts)
			.where(and(eq(accounts.provider, provider), eq(accounts.userId, userId)));

		return account ?? null;
	}
}
