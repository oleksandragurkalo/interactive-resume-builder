import { PersonalInfo, InputField } from "../data/resume.model.tsx";

export function validateField(field: InputField): string | null {
    const value = field.value.trim();

    if (field.required && value === "" && field.type !== "checkbox") return "This field is required.";
    if (!field.required && value === "") return `This field is optional. But it is a best practice to add ${field.label}.`;
    if (field.type === "tel" && !/^\d+$/.test(value)) return "Phone number must contain only digits.";
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address.";

    return null;
}

export function validateForm(info: PersonalInfo): Record<string, string | null> {
    return Object.fromEntries(
        Object.values(info).map((field) => [field.name, validateField(field)])
    );
}
