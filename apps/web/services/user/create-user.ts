import { fetcher } from "@/services/fetch-wrapper";
import type { HttpUser } from "@sculpt/drizzle";
import type { CreateUser, CreateUserResponse } from "@sculpt/server";

export async function createUser({
	avatarUrl,
	email,
	name,
	password,
	role,
}: CreateUser): Promise<HttpUser> {
	const response = await fetcher<CreateUserResponse>("/users", {
		method: "POST",
		body: { avatarUrl, email, name, password, role },
	});

	const { user } = await response.json();

	return user;
}
