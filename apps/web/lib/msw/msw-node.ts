import { handlers } from "@/lib/msw/msw-handlers";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);
