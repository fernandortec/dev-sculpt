import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import type { AuthLinksRepository } from "@/repositories/auth-links-repository";
import dayjs from "dayjs";

interface AuthFromLinkUseCaseResponse {
	userId: string;
}

export class AuthFromLinkUseCase {
	constructor(private authLinksRepository: AuthLinksRepository) {}

	async execute(code: string): Promise<AuthFromLinkUseCaseResponse> {
		const authLink = await this.authLinksRepository.getByCode(code);
		if (!authLink) throw new ResourceNotFoundError();

		const daysSinceAuthLinkWasCreated = dayjs().diff(
			authLink.createdAt,
			"days",
		);

		if (daysSinceAuthLinkWasCreated > 7) {
			throw new Error("Auth link expired, please generate a new one");
		}

		await this.authLinksRepository.delete(code);

		return { userId: authLink.userId };
	}
}
