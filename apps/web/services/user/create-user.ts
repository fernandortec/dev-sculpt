"use server";

import { fetcher } from "@/services/fetch-wrapper";
import type { HttpUser } from "@sculpt/drizzle";
import type { CreateUser, CreateUserResponse } from "@sculpt/server";
import { cookies } from "next/headers";

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

	const authResponse = await fetcher("/auth/standard", {
		method: "POST",
		body: { email, password },
	});

	const { token } = await authResponse.json();

	const cookieStore = cookies();
	cookieStore.set("authorization", token, {
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	return user;
}
