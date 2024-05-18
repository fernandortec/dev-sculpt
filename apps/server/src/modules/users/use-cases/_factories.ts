import { DrizzleUsersRepository } from "@/modules/users/repositories/drizzle-users-repository";
import { CreateUserUseCase } from "@/modules/users/use-cases/create-user";

export function makeCreateUserUseCase(): CreateUserUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const createUserUseCase = new CreateUserUseCase(usersRepository);

	return createUserUseCase;
}
