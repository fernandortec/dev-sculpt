import { authWithPasswordMock } from "@/services/auth/auth-with-password/auth-with-password-mock";
import { createUserMock } from "@/services/user/create-user/create-user-mock";

export const handlers = [authWithPasswordMock, createUserMock];
