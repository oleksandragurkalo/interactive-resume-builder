import { useState } from "react";
import { applyFieldChange } from "../utils/validation.tsx";
import { InputField } from "../data/resume.model.tsx";

export function useFormStep<T extends Record<string, InputField>>(defaultValue: T) {
    const [data, setData] = useState<T>(defaultValue);
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const { fieldName, updatedField, error } = applyFieldChange(data, name, value);

        setData((prev) => ({ ...prev, [fieldName]: updatedField }));
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    return {
        data,
        setData,
        errors,
        setErrors,
        handleChange,
    };
}
