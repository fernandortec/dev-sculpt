import type { AuthLink, CreateAuthLink } from "@sculpt/drizzle";

export interface AuthLinksRepository {
	create({ code, userId }: CreateAuthLink): Promise<AuthLink>;
	findByCode(code: string): Promise<AuthLink | null>;
	delete(code: string): Promise<void>;
}
