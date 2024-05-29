"use server";

import { cookies } from "next/headers";
import { fetcher } from "../fetch-wrapper";

export const authWithPassword = async (
	email: string,
	password: string,
): Promise<boolean> => {
	try {
		const response = await fetcher("/auth/standard", {
			method: "POST",
			body: { email, password },
		});

		const { token } = await response.json();

		const cookieStore = cookies();
		cookieStore.set("authorization", token, {
			maxAge: 60 * 60 * 24 * 7,
			path: "/",
		});

		return true;
	} catch (error) {
		return false;
	}
};
