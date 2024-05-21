"use server";

import { env } from "@sculpt/env";
import { cookies } from "next/headers";

interface AuthWithPasswordResponse {
	token: string;
}

export const authWithPassword = async (
	email: string,
	password: string,
): Promise<AuthWithPasswordResponse> => {
	const response = await fetch(`${env.API_BASE_URL}/auth/standard`, {
		method: "POST",
		body: JSON.stringify({ email, password }),
	});

	const { token } = await response.json();

	const cookieStorage = cookies();
	cookieStorage.set("authorization", token);

	return { token };
};
