/// <reference lib="dom" />

import { describe, expect, it } from "bun:test";
import { FormFeedback } from "@/components/form-feedback";
import { render } from "@testing-library/react";

describe("Form feedback", () => {
	it("should render a success feedback", () => {
		const wrapper = render(<FormFeedback message="Created successfully" />);
		const message = wrapper.getByText("Created successfully");
		const icon = wrapper.getByTestId("check");

		expect(icon).toBeVisible();
		expect(message).toBeVisible();
	});
	it("should render an error feedback", () => {
		const wrapper = render(<FormFeedback error="Invalid credentials" />);
		const message = wrapper.getByText("Invalid credentials");
		const icon = wrapper.getByTestId("error");

		expect(icon).toBeVisible();
		expect(message).toBeVisible();
	});
});
