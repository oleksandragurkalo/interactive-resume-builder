export type PersonalInfoField = {
    value: string;
    name: string;
    label?: string;
    type: "text" | "email" | "tel";
    placeholder: string;
    required?: boolean;
};

export type PersonalInfo = {
    fullName: PersonalInfoField;
    email: PersonalInfoField;
    phone: PersonalInfoField;
    location: PersonalInfoField;
};

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
    fullName: {
        value: "",
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Full Name",
        required: true,
    },
    location: {
        value: "",
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "Location",
        required: true,
    },
    phone: {
        value: "",
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "+1 (555) 555-5555",
        required: true,
    },
    email: {
        value: "",
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "sophie@example.com",
        required: true,
    },
};

export const LOCAL_STORAGE_KEY = "resume-personal-info";
