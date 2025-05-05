import { useState } from "react";
import { validateField } from "../utils/validation";
import { InputField } from "../data/resume.model.tsx";

export function useFormStep<T>(defaultValue: T) {
    const [data, setData] = useState<T>(defaultValue);
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof T;
        const field = data[fieldName] as InputField;

        const updatedField = { ...field, value };
        const error = validateField(updatedField);

        setData((prev) => ({
            ...prev,
            [fieldName]: updatedField,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    return {
        data,
        setData,
        errors,
        setErrors,
        handleChange,
    };
}
