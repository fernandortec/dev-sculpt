import { DrizzleUsersRepository } from "@/modules/users/repositories/drizzle-users-repository";
import { CreateUserUseCase } from "@/modules/users/use-cases/create-user/create-user-use-case";
import { GetUserUseCase } from "@/modules/users/use-cases/get-user/get-user-use-case";

export function makeCreateUserUseCase(): CreateUserUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const createUserUseCase = new CreateUserUseCase(usersRepository);

	return createUserUseCase;
}

export function makeGetUserUseCase(): GetUserUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const getUserUseCase = new GetUserUseCase(usersRepository);

	return getUserUseCase;
}
