import { EmailMustBeSetError } from "@/errors/email-must-be-set-error";
import { GithubCodeInvalidError } from "@/errors/github-code-invalid-error";

export interface GetGithubUserUseCaseResponse {
	user: {
		githubId: string;
		avatarUrl: string;
		email: string;
		name: string;
	};
}

export class GetGithubUserUseCase {
	async execute(accessToken: string): Promise<GetGithubUserUseCaseResponse> {
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		const { id, avatar_url, email, name } = await githubUserResponse.json();

		if (!id) throw new GithubCodeInvalidError();
		if (!email || email === null) throw new EmailMustBeSetError();

		return { user: { githubId: id, avatarUrl: avatar_url, email, name } };
	}
}
