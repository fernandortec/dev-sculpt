"use server";

import type { PlainServiceResponse } from "@/services/types";
import { fetcher } from "@/wrappers/fetch";
import type { AuthWithPassword } from "@sculpt/server";
import { cookies } from "next/headers";

export async function authWithPassword({
	email,
	password,
}: AuthWithPassword): Promise<PlainServiceResponse> {
	const response = await fetcher("/auth/standard", {
		method: "POST",
		body: { email, password },
		errorToast: "Credenciais inválidas!",
	});

	if (!response.ok) return { error: "Credenciais inválidas!" };

	const { token } = await response.json();

	const cookieStore = cookies();
	cookieStore.set("authorization", token, {
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	return { message: "Usuário autenticado com sucesso!" };
}
