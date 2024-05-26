import { afterAll, beforeAll } from "bun:test";
import { mswServer } from "@/mocks/msw-server";

beforeAll(() => {
	mswServer.listen();
});

afterAll(() => {
	mswServer.close();
});
