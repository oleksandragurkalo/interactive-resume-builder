import { describe, expect, it, vi } from "vitest";
import {
    applyFieldChange,
    handleValidatedContinue,
    handleValidatedContinueForList,
    validateField,
    validateForm,
} from "./validation.tsx";
import { InputField } from "../data/resume.model.tsx";

function textField(overrides: Partial<InputField> = {}): InputField {
    return {
        value: "",
        name: "field",
        label: "Field",
        type: "text",
        required: false,
        ...overrides,
    } as InputField;
}

describe("validateField", () => {
    it("flags an empty required field", () => {
        const field = textField({ required: true, value: "" });
        expect(validateField(field)).toBe("This field is required.");
    });

    it("allows an empty optional field", () => {
        const field = textField({ required: false, value: "" });
        expect(validateField(field)).toBeNull();
    });

    it("accepts a plain digit phone number", () => {
        const field = textField({ type: "tel", value: "5555555555" });
        expect(validateField(field)).toBeNull();
    });

    it("accepts a formatted phone number matching the field's own placeholder", () => {
        const field = textField({ type: "tel", value: "+1 (555) 555-5555" });
        expect(validateField(field)).toBeNull();
    });

    it("rejects a phone number with too few digits", () => {
        const field = textField({ type: "tel", value: "12345" });
        expect(validateField(field)).toBe("Enter a valid phone number.");
    });

    it("rejects a phone number containing letters", () => {
        const field = textField({ type: "tel", value: "555-CALL-NOW" });
        expect(validateField(field)).toBe("Enter a valid phone number.");
    });

    it("accepts a valid email", () => {
        const field = textField({ type: "email", value: "sophie@example.com" });
        expect(validateField(field)).toBeNull();
    });

    it("rejects an invalid email", () => {
        const field = textField({ type: "email", value: "not-an-email" });
        expect(validateField(field)).toBe("Invalid email address.");
    });
});

describe("applyFieldChange", () => {
    it("returns the field name, the updated field, and its error", () => {
        const item = { email: textField({ name: "email", type: "email", required: true }) };

        const { fieldName, updatedField, error } = applyFieldChange(item, "email", "sophie@example.com");

        expect(fieldName).toBe("email");
        expect(updatedField.value).toBe("sophie@example.com");
        expect(error).toBeNull();
    });

    it("does not mutate the original item", () => {
        const original = textField({ name: "email", value: "old@example.com" });
        const item = { email: original };

        applyFieldChange(item, "email", "new@example.com");

        expect(original.value).toBe("old@example.com");
    });
});

describe("validateForm", () => {
    it("validates every field, keyed by its own name", () => {
        const info = {
            fullName: textField({ name: "fullName", required: true, value: "" }),
            email: textField({ name: "email", type: "email", value: "sophie@example.com" }),
        };

        expect(validateForm(info)).toEqual({
            fullName: "This field is required.",
            email: null,
        });
    });
});

describe("handleValidatedContinue", () => {
    it("calls onSuccess when there are no errors", () => {
        const setErrors = vi.fn();
        const onSuccess = vi.fn();

        handleValidatedContinue({}, () => ({ fullName: null }), setErrors, onSuccess);

        expect(setErrors).toHaveBeenCalledWith({ fullName: null });
        expect(onSuccess).toHaveBeenCalled();
    });

    it("does not call onSuccess when there are errors", () => {
        const setErrors = vi.fn();
        const onSuccess = vi.fn();

        handleValidatedContinue({}, () => ({ fullName: "This field is required." }), setErrors, onSuccess);

        expect(onSuccess).not.toHaveBeenCalled();
    });
});

describe("handleValidatedContinueForList", () => {
    it("calls onSuccess when every item is valid", () => {
        const setErrors = vi.fn();
        const onSuccess = vi.fn();

        handleValidatedContinueForList([{}, {}], () => ({}), setErrors, onSuccess);

        expect(onSuccess).toHaveBeenCalled();
    });

    it("does not call onSuccess when any item has an error", () => {
        const setErrors = vi.fn();
        const onSuccess = vi.fn();
        let calls = 0;

        handleValidatedContinueForList(
            [{}, {}],
            (): Record<string, string | null> => {
                calls += 1;
                return calls === 2 ? { name: "This field is required." } : { name: null };
            },
            setErrors,
            onSuccess
        );

        expect(onSuccess).not.toHaveBeenCalled();
    });
});
