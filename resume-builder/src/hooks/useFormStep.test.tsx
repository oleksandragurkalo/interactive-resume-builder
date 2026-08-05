import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFormStep } from "./useFormStep.tsx";
import { InputField } from "../data/resume.model.tsx";

type TestData = {
    fullName: InputField;
    email: InputField;
};

const DEFAULT_DATA: TestData = {
    fullName: { value: "", name: "fullName", label: "Full Name", type: "text", required: true },
    email: { value: "", name: "email", label: "Email", type: "email", required: true },
};

function changeEvent(name: string, value: string) {
    return { target: { name, value } } as React.ChangeEvent<HTMLInputElement>;
}

describe("useFormStep", () => {
    it("starts with the provided default value and no errors", () => {
        const { result } = renderHook(() => useFormStep<TestData>(DEFAULT_DATA));

        expect(result.current.data.fullName.value).toBe("");
        expect(result.current.errors).toEqual({});
    });

    it("handleChange updates only the targeted field", () => {
        const { result } = renderHook(() => useFormStep<TestData>(DEFAULT_DATA));

        act(() => result.current.handleChange(changeEvent("fullName", "Sophie Chen")));

        expect(result.current.data.fullName.value).toBe("Sophie Chen");
        expect(result.current.data.email.value).toBe("");
    });

    it("handleChange records a validation error for the edited field", () => {
        const { result } = renderHook(() => useFormStep<TestData>(DEFAULT_DATA));

        act(() => result.current.handleChange(changeEvent("email", "not-an-email")));

        expect(result.current.errors.email).toBe("Invalid email address.");
    });

    it("editing one field does not revert a sibling field edited moments earlier (regression)", () => {
        const { result } = renderHook(() => useFormStep<TestData>(DEFAULT_DATA));

        act(() => result.current.handleChange(changeEvent("fullName", "Sophie Chen")));
        act(() => result.current.handleChange(changeEvent("email", "sophie@example.com")));

        expect(result.current.data.fullName.value).toBe("Sophie Chen");
        expect(result.current.data.email.value).toBe("sophie@example.com");
    });
});
