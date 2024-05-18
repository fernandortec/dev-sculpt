import type { GithubUser } from "@/modules/auth/repositories/github-oauth-user-repository";

export interface OauthUserRepository {
	getAccessToken(code: string): Promise<string | null>;
	getUser(accessToken: string): Promise<GithubUser>;
}
