"use server";

import { type ServiceResponse, fetcher } from "@/wrappers/fetch*";
import type { CreateUser, CreateUserResponse } from "@sculpt/server";
import { cookies } from "next/headers";

export async function createUser({
	avatarUrl,
	email,
	name,
	password,
	role,
}: CreateUser): Promise<ServiceResponse> {
	const createResponse = await fetcher<CreateUserResponse>("/users", {
		method: "POST",
		body: { avatarUrl, email, name, password, role },
	});

	const authResponse = await fetcher("/auth/standard", {
		method: "POST",
		body: { email, password },
	});

	if (!createResponse.ok) return { error: createResponse.error };
	if (!authResponse.ok) return { error: authResponse.error };

	const { token } = await authResponse.json();

	const cookieStore = cookies();
	cookieStore.set("authorization", token, {
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	return { message: "Usuário criado com sucesso!" };
}
