import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { MustHavePasswordError } from "@/errors/must-have-password-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import type { UsersRepository } from "@/modules/users/repositories/users-repository";
import { compare } from "bcrypt-ts";

export interface AuthWithPasswordUseCaseResponse {
	userId: string;
}

export class AuthWithPasswordUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(
		email: string,
		password: string,
	): Promise<AuthWithPasswordUseCaseResponse> {
		const user = await this.usersRepository.getByEmail(email);
		if (!user) throw new ResourceNotFoundError();
		if (user.passwordHash === null) throw new MustHavePasswordError();

		const isPasswordValid = await compare(password, user.passwordHash);
		if (!isPasswordValid) throw new InvalidCredentialsError();

		return { userId: user.id };
	}
}
