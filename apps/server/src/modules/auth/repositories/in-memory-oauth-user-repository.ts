import { GithubCodeInvalidError } from "@/errors/github-code-invalid-error";
import type { GithubUser } from "@/modules/auth/repositories/github-oauth-user-repository";
import type { OauthUserRepository } from "@/modules/auth/repositories/oauth-user-repository";

export class InMemoryOauthUserRepository implements OauthUserRepository {
	getAccessToken(_: string): Promise<string | null> {
		throw new GithubCodeInvalidError();
	}
	getUser(_: string): Promise<GithubUser> {
		throw new GithubCodeInvalidError();
	}
}
