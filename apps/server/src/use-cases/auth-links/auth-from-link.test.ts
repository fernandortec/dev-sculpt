import { beforeEach, describe, expect, it } from "bun:test";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import type { AuthLinksRepository } from "@/repositories/auth-links-repository";
import { InMemoryAuthLinksRepository } from "@/repositories/in-memory/in-memory-auth-links-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import { AuthFromLinkUseCase } from "@/use-cases/auth-links/auth-from-link";
import { SendAuthLinkUseCase } from "@/use-cases/auth-links/send-auth-link";
import { createId } from "@paralleldrive/cuid2";

describe("Auth from link use case", () => {
	let authLinksRepository: AuthLinksRepository;
	let usersRepository: UsersRepository;
	let sut: AuthFromLinkUseCase;

	beforeEach(() => {
		authLinksRepository = new InMemoryAuthLinksRepository();
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthFromLinkUseCase(authLinksRepository);
	});

	it("should authenticate from a link", async () => {
		const user = await usersRepository.create({
			email: "someemail@example.com",
			name: "Jane doe",
			role: "recruiter",
		});

		const authLink = await authLinksRepository.create({
			code: createId(),
			userId: user.id,
		});

		const authData = await sut.execute(authLink.code);

		expect(authData.userId).toEqual(user.id);
	});

	it("should throw if auth link is too old", async () => {
		const user = await usersRepository.create({
			email: "someemail@example.com",
			name: "Jane doe",
			role: "recruiter",
		});

		const dateEightDaysInThePast = new Date();
		dateEightDaysInThePast.setDate(new Date().getDate() - 8);

		const invalidAuthLink = await authLinksRepository.create({
			code: createId(),
			userId: user.id,
			createdAt: dateEightDaysInThePast,
		});

		expect(sut.execute(invalidAuthLink.code)).rejects.toBeInstanceOf(Error);
	});

	it("should throw if user email is invalid", async () => {
		expect(sut.execute("some non existing e-mail")).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
