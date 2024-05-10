import { beforeEach, describe, expect, it } from "bun:test";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CreateUserUseCase } from "@/use-cases/user/create-user";

describe("Create User use case", () => {
	let authLinsRepository: AuthLinsRepository;
	let sut: CreateUserUseCase;

	beforeEach(() => {
		authLinsRepository = new InMemoryAuthLinsRepository();
		sut = new CreateUserUseCase(authLinsRepository);
	});

	it("should create an user", async () => {
		const user = await sut.execute({
			email: "john@doe.com",
			name: "John doe",
			role: "jobseeker",
			bio: "I'm John Doe!",
			companyId: null,
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
			bio: "I'm John Doe!",
			companyId: null,
		});

		expect(
			sut.execute({
				email: "john@doe.com",
				name: "John doe",
				role: "jobseeker",
				bio: "I'm John Doe!",
				companyId: null,
			}),
		).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
	});

	it.todo("should create an user with a company");
	it.todo("should create recruiter and add him to company list");
});
