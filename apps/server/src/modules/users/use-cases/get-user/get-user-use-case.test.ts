import { beforeEach, describe, expect, it } from "bun:test";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists";
import { InMemoryUsersRepository } from "@/modules/users/repositories/in-memory-users-repository";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";

import { GetUserUseCase } from "@/modules/users/use-cases/get-user/get-user-use-case";

describe("GetUser use case", () => {
	let usersRepository: UsersRepository;
	let sut: GetUserUseCase;

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserUseCase(usersRepository);
	});

	it("should get an user", async () => {
		const user = await usersRepository.create({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			avatarUrl: "http://example.com/avatar.jpg",
			password: "somepassword",
		});

		const foundUser = await sut.execute(user.id);

		expect(foundUser).toEqual(
			expect.objectContaining({ role: "jobseeker", email: "john@doe.com" }),
		);
	});

	it("should reutrn null if user does not exist", async () => {
		const user = await sut.execute("user.id");
		expect(user).toEqual(null);
	});
});
