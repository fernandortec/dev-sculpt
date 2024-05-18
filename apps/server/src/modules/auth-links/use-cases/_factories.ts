import { DrizzleAuthLinksRepository } from "@/modules/auth-links/repositories/drizzle-auth-links-repository";
import { AuthFromLinkUseCase } from "@/modules/auth-links/use-cases/auth-from-link";
import { SendAuthLinkUseCase } from "@/modules/auth-links/use-cases/send-auth-link";
import { DrizzleUsersRepository } from "@/modules/users/repositories/drizzle-users-repository";

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
