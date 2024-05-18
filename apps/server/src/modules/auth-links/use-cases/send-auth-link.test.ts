import { beforeEach, describe, expect, it } from "bun:test";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import type { AuthLinksRepository } from "@/modules/auth-links/auth-links-repository";
import { InMemoryAuthLinksRepository } from "@/modules/auth-links/repositories/in-memory-auth-links-repository";
import { InMemoryUsersRepository } from "@/modules/users/repositories/in-memory-user-repository";
import type { UsersRepository } from "@/modules/users/users-repository";
import { SendAuthLinkUseCase } from "@/use-cases/auth-links/send-auth-link";

describe("Send auth link use case", () => {
	let authLinksRepository: AuthLinksRepository;
	let usersRepository: UsersRepository;
	let sut: SendAuthLinkUseCase;

	beforeEach(() => {
		authLinksRepository = new InMemoryAuthLinksRepository();
		usersRepository = new InMemoryUsersRepository();
		sut = new SendAuthLinkUseCase(authLinksRepository, usersRepository);
	});

	it("should send an auth link", async () => {
		const user = await usersRepository.create({
			email: "someemail@example.com",
			name: "Jane doe",
			role: "recruiter",
		});

		const authLink = await sut.execute(user.email);

		expect(authLink).toContain("authenticate");
		expect(authLink).toEqual(expect.any(String));
	});

	it("should throw if user email is invalid", async () => {
		expect(sut.execute("some non existing e-mail")).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
