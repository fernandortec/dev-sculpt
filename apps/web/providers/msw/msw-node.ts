import { handlers } from "@/providers/msw/msw-handlers";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);
