import { DrizzleUsersRepository } from "@/repositories/drizzle/drizzle-users-repository";
import { CreateUserUseCase } from "@/use-cases/user/create-user";

export function makeCreateUserUseCase(): CreateUserUseCase {
	const usersRepository = new DrizzleUsersRepository();
	const createUserUseCase = new CreateUserUseCase(usersRepository);

	return createUserUseCase;
}
