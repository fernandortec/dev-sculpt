import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import type { AuthLinksRepository } from "@/modules/auth-links/auth-links-repository";
import type { UsersRepository } from "@/modules/users/users-repository";
import { createId } from "@paralleldrive/cuid2";
import { env } from "@sculpt/env";

export class SendAuthLinkUseCase {
	constructor(
		private authLinksRepository: AuthLinksRepository,
		private usersRepository: UsersRepository,
	) {}

	async execute(email: string): Promise<string> {
		const userExists = await this.usersRepository.getByEmail(email);
		if (!userExists) throw new ResourceNotFoundError();

		const authCode = createId();

		console.log(authCode);

		await this.authLinksRepository.create({
			code: authCode,
			userId: userExists.id,
		});

		const authLink = new URL("/auth-links/authenticate", env.API_BASE_URL);

		authLink.searchParams.set("code", authCode);
		authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL);

		return authLink.toString();

		//send - mail
	}
}
