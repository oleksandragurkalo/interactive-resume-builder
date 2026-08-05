import React from "react";
import { InputField } from "../data/resume.model.tsx";

export function validateField(field: InputField): string | null {
    const value = field.value.trim();

    if (field.required && value === "") return "This field is required.";
    if (value !== "") {
        if (field.type === "tel" && !/^\d+$/.test(value)) return "Phone number must contain only digits.";
        if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address.";
    }
    return null;
}

export function applyFieldChange<T extends Record<string, InputField>>(
    item: T,
    name: string,
    value: string
): { fieldName: keyof T; updatedField: InputField; error: string | null } {
    const fieldName = name as keyof T;
    const field = item[fieldName] as InputField;
    const updatedField = { ...field, value };

    return {
        fieldName,
        updatedField,
        error: validateField(updatedField),
    };
}

export function validateForm(info: Record<string, InputField>): Record<string, string | null> {
    return Object.fromEntries(
        Object.values(info).map((field) => [field.name, validateField(field)])
    );
}

export function handleValidatedContinue<T>(
    data: T,
    validateForm: (data: T) => Record<string, string | null>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>,
    onSuccess: () => void
) {
    const errors = validateForm(data);
    setErrors(errors);

    const hasErrors = Object.values(errors).some((e) => e !== null);

    if (!hasErrors) {
        onSuccess();
    }
}

export function handleValidatedContinueForList<T>(
    data: T[],
    validateSingleItem: (item: T) => Record<string, string | null>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>[]>>,
    onSuccess: () => void,
    options?: { minItems?: number; emptyListMessage?: string }
) {
    const errorsArray: Record<string, string | null>[] = [];
    let hasErrors = false;

    data.forEach((item) => {
        const itemErrors = validateSingleItem(item);
        errorsArray.push(itemErrors);
        if (Object.values(itemErrors).some(e => e !== null)) {
            hasErrors = true;
        }
    });

    const minItems = options?.minItems ?? 1;
    if (data.length < minItems) {
        hasErrors = true;
    }

    setErrors(errorsArray);

    if (!hasErrors) {
        onSuccess();
    }
}
