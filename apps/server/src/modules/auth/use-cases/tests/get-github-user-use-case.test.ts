import { beforeEach, describe, expect, it } from "bun:test";
import { GithubCodeInvalidError } from "@/errors/github-code-invalid-error";
import { InMemoryOauthUserRepository } from "@/modules/auth/repositories/in-memory-oauth-user-repository";
import type { OauthUserRepository } from "@/modules/auth/repositories/oauth-user-repository";
import { GetGithubUserUseCase } from "@/modules/auth/use-cases/get-github-user-use-case";

describe("Get github user use case", () => {
	let sut: GetGithubUserUseCase;
	let oauthUserRepository: OauthUserRepository;

	beforeEach(() => {
		oauthUserRepository = new InMemoryOauthUserRepository();
		sut = new GetGithubUserUseCase(oauthUserRepository);
	});

	it("should throw if github code is invalid", async () => {
		expect(sut.execute("invalid token")).rejects.toBeInstanceOf(
			GithubCodeInvalidError,
		);
	});
});
