import { beforeEach, describe, expect, it } from "bun:test";
import { GithubCodeInvalidError } from "@/errors/github-code-invalid-error";
import { InMemoryOauthUserRepository } from "@/modules/auth/repositories/in-memory-oauth-user-repository";
import type { OauthUserRepository } from "@/modules/auth/repositories/oauth-user-repository";
import { GetGithubAccessTokenUseCase } from "@/modules/auth/use-cases/get-github-access-token-use-case";

describe("Get github access token use case", () => {
	let sut: GetGithubAccessTokenUseCase;
	let oauthUserRepository: OauthUserRepository;

	beforeEach(() => {
		oauthUserRepository = new InMemoryOauthUserRepository();
		sut = new GetGithubAccessTokenUseCase(oauthUserRepository);
	});

	it("should throw if github code is invalid", async () => {
		expect(sut.execute("invalidcode")).rejects.toBeInstanceOf(
			GithubCodeInvalidError,
		);
	});
});
