import { create } from "zustand";

interface User {
	name: string;
	email: string;
	avatarUrl: string;
}

interface UserStore {
	user: User;
	setUser: (user: User) => void;
}

export const userStore = create<UserStore>((set) => ({
	user: {} as User,
	setUser: (user) => set({ user }),
}));
