import { authWithPasswordMock } from "@/services/auth/auth-with-password/auth-with-password-mock";
import { getProfileMock } from "@/services/auth/get-profile/get-profile-mock";
import { createUserMock } from "@/services/user/create-user/create-user-mock";

export const handlers = [authWithPasswordMock, createUserMock, getProfileMock];
