"use server";

import { fetcher } from "@/services/fetch-wrapper";
import { cookies } from "next/headers";

export const authWithPassword = async (
	email: string,
	password: string,
): Promise<boolean> => {
	try {
		const response = await fetcher("auth/standard", {
			method: "POST",
			body: { email, password },
		});

		const { token } = await response.json();

		const cookieStorage = cookies();
		cookieStorage.set("authorization", token);

		return true;
	} catch (error) {
		return false;
	}
};
