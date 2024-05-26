import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";

export const mswServer = setupServer(...handlers);
