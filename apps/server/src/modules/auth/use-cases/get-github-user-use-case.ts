import { EmailMustBeSetError } from "@/errors/email-must-be-set-error";
import { GithubCodeInvalidError } from "@/errors/github-code-invalid-error";

export interface GithubUser {
	githubId: string;
	avatarUrl: string;
	email: string;
	name: string;
}

export interface GetGithubUserUseCaseResponse {
	user: GithubUser;
}

export class GetGithubUserUseCase {
	async execute(accessToken: string): Promise<GetGithubUserUseCaseResponse> {
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		const {
			id: githubId,
			avatar_url: avatarUrl,
			email,
			name,
		} = await githubUserResponse.json();

		if (!githubId) throw new GithubCodeInvalidError();
		if (!email || email === null) throw new EmailMustBeSetError();

		return { user: { githubId, avatarUrl, email, name } };
	}
}
