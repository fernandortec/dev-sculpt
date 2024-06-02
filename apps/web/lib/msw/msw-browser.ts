import { handlers } from "@/lib/msw/msw-handlers";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...handlers);
