export type InputField = {
    value: string;
    name: string;
    label?: string;
    type: "text" | "email" | "tel" | "textarea" | "month" | "checkbox";
    placeholder?: string;
    required?: boolean;
};

export type PersonalInfo = {
    fullName: InputField;
    email: InputField;
    phone: InputField;
    location: InputField;
    summary: InputField;
    linkedin: InputField;
};

export type ExperienceInfo = {
    jobTitle: InputField;
    employer: InputField;
    location: InputField;
    startDate: InputField;
    endDate: InputField;
    experience: InputField;
};

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
    fullName: {
        value: "",
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Sophie Chen",
        required: true,
    },
    location: {
        value: "",
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "Toronto, Canada",
        required: false,
    },
    phone: {
        value: "",
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "+1 (555) 555-5555",
        required: false,
    },
    email: {
        value: "",
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "sophie@example.com",
        required: true,
    },
    summary: {
        value: "",
        name: "summary",
        label: "Summary",
        type: "textarea",
        placeholder: "Please update your summary",
        required: false,
    },
    linkedin: {
        value: "",
        name: "linkedin",
        label: "LinkedIn",
        type: "text",
        placeholder: "linkedin.com/in/yourprofile",
        required: false,
    },
};

export const DEFAULT_EXPERIENCE_INFO: ExperienceInfo = {
    jobTitle: {
        value: "",
        name: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Cachier",
        required: true,
    },
    employer: {
        value: "",
        name: "employer",
        label: "Employer",
        type: "text",
        placeholder: "McDonalds",
        required: true,
    },
    location: {
        value: "",
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "Toronto, Canada",
        required: false,
    },
    startDate: {
        value: "",
        name: "startDate",
        label: "Start Date",
        type: "month",
        placeholder: "Select Date",
        required: true,
    },
    endDate: {
        value: "",
        name: "endDate",
        label: "End Date",
        type: "month",
        placeholder: "Select Date",
        required: true,
    },
    experience: {
        value: "",
        name: "experience",
        label: "Your experience",
        type: "textarea",
        placeholder: "Please update your experience",
        required: true,
    },
}

export const LOCAL_STORAGE_KEY = "resume-personal-info";
