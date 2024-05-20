import type { CreateAccount } from "@/modules/accounts/schemas/create-account";
import type { GetByUser } from "@/modules/accounts/schemas/get-by-user";
import type { Account } from "@sculpt/drizzle";

export interface AccountsRepository {
	create({
		provider,
		providerAccountId,
		userId,
	}: CreateAccount): Promise<Account>;
	getByUser({ provider, userId }: GetByUser): Promise<Account | null>;
}
