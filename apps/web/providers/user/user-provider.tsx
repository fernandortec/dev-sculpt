"use client";

import { getProfile } from "@/services/auth/get-profile/get-profile";
import { createContext, use, type ReactNode } from "react";

interface User {
	avatarUrl: string;
	name: string;
	email: string;
}

const UserContext = createContext<{ user: User }>({
	user: {
		avatarUrl: "",
		email: "",
		name: "",
	},
});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
	const { user } = use(getProfile());

	return (
		<UserContext.Provider
			value={{
				user: { avatarUrl: user.avatarUrl, email: user.email, name: user.name },
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => use(UserContext);
