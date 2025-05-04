import { PersonalInfo, PersonalInfoField } from "../data/resume.model.tsx";

export function validateField(field: PersonalInfoField): string | null {
    const value = field.value.trim();

    if (field.required && value === "") return "This field is required.";
    if (field.type === "tel" && !/^\d+$/.test(value)) return "Phone number must contain only digits.";
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address.";

    return null;
}

export function validateForm(info: PersonalInfo): Record<string, string | null> {
    return Object.fromEntries(
        Object.values(info).map((field) => [field.name, validateField(field)])
    );
}
