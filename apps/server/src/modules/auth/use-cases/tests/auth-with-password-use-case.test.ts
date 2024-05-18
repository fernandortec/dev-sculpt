import { beforeEach, describe, expect, it } from "bun:test";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { MustHavePasswordError } from "@/errors/must-have-password-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { AuthWithPasswordUseCase } from "@/modules/auth/use-cases/auth-with-password-use-case";
import { InMemoryUsersRepository } from "@/modules/users/repositories/in-memory-users-repository";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import { hash } from "bcrypt-ts";

describe("Auth with password use case", () => {
	let usersRepository: UsersRepository;
	let sut: AuthWithPasswordUseCase;

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthWithPasswordUseCase(usersRepository);
	});

	it("should authenticate an user", async () => {
		const user = await usersRepository.create({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			avatarUrl: "http://example.com/avatar.jpg",
			password: await hash("somepassword", 0),
		});

		const { userId } = await sut.execute(user.email, "somepassword");
		expect(userId).toEqual(user.id);
	});

	it("should throw if email does not belong to any user", async () => {
		expect(
			sut.execute("fakeemail@whatever", "somepassword"),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should throw if user doesn't have a password", async () => {
		const user = await usersRepository.create({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			avatarUrl: "http://example.com/avatar.jpg",
			password: null,
		});

		expect(sut.execute(user.email, "somepassword")).rejects.toBeInstanceOf(
			MustHavePasswordError,
		);
	});

	it("should throw if password is incorrect", async () => {
		const user = await usersRepository.create({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			avatarUrl: "http://example.com/avatar.jpg",
			password: await hash("somepassword", 0),
		});

		expect(sut.execute(user.email, "otherpassword")).rejects.toBeInstanceOf(
			InvalidCredentialsError,
		);
	});
});
