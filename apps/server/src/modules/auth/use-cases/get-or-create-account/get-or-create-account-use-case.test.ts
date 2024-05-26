import { beforeEach, describe, expect, it } from "bun:test";
import type { AccountsRepository } from "@/modules/accounts/repositories/accounts-repository";
import { InMemoryAccountsRepository } from "@/modules/accounts/repositories/in-memory-accounts-repository";

import { GetOrCreateAccountUseCase } from "@/modules/auth/use-cases/get-or-create-account/get-or-create-account-use-case";
import { InMemoryUsersRepository } from "@/modules/users/repositories/in-memory-users-repository";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";

describe("Get or create account use case", () => {
	let usersRepository: UsersRepository;
	let accountsRepository: AccountsRepository;
	let sut: GetOrCreateAccountUseCase;

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		accountsRepository = new InMemoryAccountsRepository();
		sut = new GetOrCreateAccountUseCase(usersRepository, accountsRepository);
	});

	it("create an account and user", async () => {
		const { userId } = await sut.execute({
			provider: "github",
			user: {
				avatarUrl: "http://example.com/avatar.jpg",
				email: "johndoe@gmail.com",
				name: "John doe",
				id: "123",
			},
		});

		const accountJustCreated = await accountsRepository.getByUser({
			provider: "github",
			userId,
		});
		expect(userId).toEqual(expect.any(String));
		expect(accountJustCreated).toEqual(
			expect.objectContaining({ userId: userId, id: expect.any(String) }),
		);
	});

	it("get an account and user", async () => {
		const user = await usersRepository.create({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			avatarUrl: "http://example.com/avatar.jpg",
			password: null,
		});

		const account = await accountsRepository.create({
			provider: "google",
			providerAccountId: "321",
			userId: user.id,
		});

		const { userId } = await sut.execute({
			user: {
				avatarUrl: user.avatarUrl,
				email: user.email,
				name: user.name,
				id: "321",
			},
			provider: "google",
		});

		const accountJustCreated = await accountsRepository.getByUser({
			provider: "google",
			userId,
		});

		expect(userId).toEqual(userId);
		expect(accountJustCreated).toEqual(
			expect.objectContaining({ id: account.id, userId: userId }),
		);
	});
});
