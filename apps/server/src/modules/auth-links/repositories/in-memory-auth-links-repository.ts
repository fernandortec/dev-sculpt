import type { AuthLinksRepository } from "@/modules/auth-links/auth-links-repository";
import { createId } from "@paralleldrive/cuid2";
import type { AuthLink, CreateAuthLink } from "@sculpt/drizzle";

export class InMemoryAuthLinksRepository implements AuthLinksRepository {
	private authLinks: AuthLink[] = [];

	async create({ code, userId, createdAt }: CreateAuthLink): Promise<AuthLink> {
		const authLink: AuthLink = {
			id: createId(),
			code: code,
			userId: userId,
			createdAt: createdAt ?? new Date(),
		};

		this.authLinks.push(authLink);

		return authLink;
	}

	async getByCode(code: string): Promise<AuthLink | null> {
		const authLink = this.authLinks.find((authLink) => authLink.code === code);
		if (!authLink) return null;

		return authLink;
	}

	async delete(code: string): Promise<void> {
		this.authLinks.splice(
			this.authLinks.findIndex((authLink) => authLink.code === code),
			1,
		);
	}
}
