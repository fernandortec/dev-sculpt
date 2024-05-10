import { DrizzleAuthLinksRepository } from "@/repositories/drizzle/drizzle-auth-links-repository";
import { DrizzleUsersRepository } from "@/repositories/drizzle/drizzle-users-repository";
import { AuthFromLinkUseCase } from "@/use-cases/auth-links/auth-from-link";
import { SendAuthLinkUseCase } from "@/use-cases/auth-links/send-auth-link";

export function makeSendAuthLinkUseCase(): SendAuthLinkUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const authLinksRepository = new DrizzleAuthLinksRepository();

	const sendAuthLinkUseCase = new SendAuthLinkUseCase(
		authLinksRepository,
		usersRepository,
	);

	return sendAuthLinkUseCase;
}

export function makeAuthFromLinkUseCase(): AuthFromLinkUseCase {
	const authLinksRepository = new DrizzleAuthLinksRepository();
	const authFromLinkUseCase = new AuthFromLinkUseCase(authLinksRepository);

	return authFromLinkUseCase;
}
