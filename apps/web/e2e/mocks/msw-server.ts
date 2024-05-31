import { authWithPasswordMock } from "@/mocks/auth/auth-with-password-mock";
import { setupServer } from "msw/node";

export const mswServer = setupServer(authWithPasswordMock);
