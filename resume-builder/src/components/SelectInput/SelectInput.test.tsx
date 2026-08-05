import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SelectInput from "./SelectInput.tsx";

const OPTIONS = ["English", "Spanish", "French"];

describe("SelectInput", () => {
    it("shows the placeholder when no value is selected", () => {
        render(<SelectInput id="language" name="language" value="" options={OPTIONS} placeholder="Select language" onChange={vi.fn()} />);

        expect(screen.getByRole("button", { name: "Select language" })).toBeInTheDocument();
    });

    it("shows the selected value instead of the placeholder", () => {
        render(<SelectInput id="language" name="language" value="Spanish" options={OPTIONS} placeholder="Select language" onChange={vi.fn()} />);

        expect(screen.getByRole("button", { name: "Spanish" })).toBeInTheDocument();
    });

    it("opens the option list on click and lists every option", async () => {
        const user = userEvent.setup();
        render(<SelectInput id="language" name="language" value="" options={OPTIONS} onChange={vi.fn()} />);

        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("listbox")).toBeInTheDocument();
        for (const option of OPTIONS) {
            expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
        }
    });

    it("calls onChange with the field name and picked value, then closes", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<SelectInput id="language" name="language" value="" options={OPTIONS} onChange={onChange} />);

        await user.click(screen.getByRole("button"));
        await user.click(screen.getByRole("option", { name: "French" }));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].target).toEqual({ name: "language", value: "French" });
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes without calling onChange when clicking outside", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <div>
                <SelectInput id="language" name="language" value="" options={OPTIONS} onChange={onChange} />
                <button type="button">outside</button>
            </div>
        );

        await user.click(screen.getByRole("button", { name: "Select..." }));
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "outside" }));

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        expect(onChange).not.toHaveBeenCalled();
    });
});
