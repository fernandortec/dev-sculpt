import { DrizzleUsersRepository } from "@/modules/users/repositories/drizzle-users-repository";
import { CreateUserUseCase } from "@/use-cases/user/create-user";

export function makeCreateUserUseCase(): CreateUserUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const createUserUseCase = new CreateUserUseCase(usersRepository);

	return createUserUseCase;
}
