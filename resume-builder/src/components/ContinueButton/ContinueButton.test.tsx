import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ContinueButton from "./ContinueButton.tsx";

describe("ContinueButton", () => {
    it("is disabled when disabled is true", () => {
        render(<ContinueButton disabled={true} onClick={vi.fn()} />);

        expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
    });

    it("is enabled when disabled is false", () => {
        render(<ContinueButton disabled={false} onClick={vi.fn()} />);

        expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
    });

    it("calls onClick when clicked while enabled", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<ContinueButton disabled={false} onClick={onClick} />);

        await user.click(screen.getByRole("button", { name: "Continue" }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when clicked while disabled", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<ContinueButton disabled={true} onClick={onClick} />);

        await user.click(screen.getByRole("button", { name: "Continue" }));

        expect(onClick).not.toHaveBeenCalled();
    });
});
