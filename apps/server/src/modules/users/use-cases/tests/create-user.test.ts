import { beforeEach, describe, expect, it } from "bun:test";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists";
import { InMemoryUsersRepository } from "@/modules/users/repositories/in-memory-users-repository";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import { CreateUserUseCase } from "@/modules/users/use-cases/create-user-use-case";

describe("Create User use case", () => {
	let usersRepository: UsersRepository;
	let sut: CreateUserUseCase;

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new CreateUserUseCase(usersRepository);
	});

	it("should create an user", async () => {
		const user = await sut.execute({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			avatarUrl: "http://example.com/avatar.jpg",
			password: "somepassword",
		});

		expect(user).toEqual(
			expect.objectContaining({ role: "jobseeker", email: "john@doe.com" }),
		);
	});

	it("should throw if trying to create an user with same email twice", async () => {
		await sut.execute({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			avatarUrl: "http://example.com/avatar.jpg",
			password: "somepassword",
		});

		expect(
			sut.execute({
				email: "john@doe.com",
				name: "John doe",
				role: "jobseeker",
				avatarUrl: "http://example.com/avatar.jpg",
				password: "somepassword",
			}),
		).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
	});

	it.todo("should create an user with a company");
	it.todo("should create recruiter and add him to company list");
});
