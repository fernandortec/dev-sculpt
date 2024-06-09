export * from "@testing-library/jest-dom/jest-globals";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

import { cleanup } from "@testing-library/react";
import { afterEach } from "bun:test";

afterEach(() => {
	cleanup();
});

GlobalRegistrator.register();
