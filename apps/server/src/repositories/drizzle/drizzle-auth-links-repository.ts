import type { AuthLinksRepository } from "@/repositories/auth-links-repository";
import {
	type AuthLink,
	type CreateAuthLink,
	authLinks,
	db,
} from "@sculpt/drizzle";
import { eq } from "drizzle-orm";

export class DrizzleAuthLinksRepository implements AuthLinksRepository {
	async create({ code, userId }: CreateAuthLink): Promise<AuthLink> {
		const [authLink] = await db.insert(authLinks).values({ code, userId });
		return authLink;
	}

	async findByCode(code: string): Promise<AuthLink | null> {
		const [authLink] = await db
			.select()
			.from(authLinks)
			.where(eq(authLinks.code, code));

		return authLink ?? null;
	}

	async delete(code: string): Promise<void> {
		await db.delete(authLinks).where(eq(authLinks.code, code));
	}
}
