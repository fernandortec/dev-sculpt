import { beforeEach, describe, expect, it, mock } from "bun:test";
import { SocialLoginsForm } from "@/(unauthenticated)/(components)/social-logins-form";
import { render } from "@testing-library/react";

describe.skip("Social logins form unit", () => {
	const pushMock = mock();

	mock.module("next/navigation", () => ({
		useRouter: pushMock,
	}));

	beforeEach(() => {
		pushMock.mockClear();
	});

	it("should render three social logins options", () => {
		const wrapper = render(<SocialLoginsForm />);

		expect(
			wrapper.getByRole("button", {
				name: /continuar com github/i,
			}),
		).toBeVisible();
		expect(
			wrapper.getByRole("button", {
				name: /continuar com google/i,
			}),
		).toBeVisible();
		expect(
			wrapper.getByRole("button", {
				name: /continuar com linkedin/i,
			}),
		).toBeVisible();
	});
});
