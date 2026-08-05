type BaseInputField = {
    value: string;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

export type InputField =
    | (BaseInputField & { type: "text" | "email" | "tel" | "textarea" | "month" | "checkbox" })
    | (BaseInputField & { type: "select"; options: string[]; allowOther?: boolean });

export const DEGREE_OPTIONS = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "MBA",
    "Doctorate (PhD)",
    "Certificate",
    "Other",
];

export const LANGUAGE_OPTIONS = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin Chinese",
    "Japanese",
    "Korean",
    "Portuguese",
    "Italian",
    "Russian",
    "Arabic",
    "Hindi",
    "Ukrainian",
    "Polish",
    "Dutch",
    "Other",
];

export const PROFICIENCY_OPTIONS = [
    "Native",
    "Fluent",
    "Advanced",
    "Intermediate",
    "Basic",
];

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

export type EducationInfo = {
    school: InputField;
    degree: InputField;
    fieldOfStudy: InputField;
    location: InputField;
    startDate: InputField;
    endDate: InputField;
};

export type SkillInfo = {
    category: InputField;
    skills: InputField;
};

export type LanguageInfo = {
    language: InputField;
    proficiency: InputField;
};

export type CertificationInfo = {
    name: InputField;
    issuer: InputField;
    date: InputField;
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
    linkedin: {
        value: "",
        name: "linkedin",
        label: "LinkedIn",
        type: "text",
        placeholder: "linkedin.com/in/yourprofile",
        required: false,
    },
    summary: {
        value: "",
        name: "summary",
        label: "Summary",
        type: "textarea",
        placeholder: "Please update your summary",
        required: false,
    },
};

export const DEFAULT_EXPERIENCE_INFO: ExperienceInfo = {
    jobTitle: {
        value: "",
        name: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Cashier",
        required: false,
    },
    employer: {
        value: "",
        name: "employer",
        label: "Employer",
        type: "text",
        placeholder: "McDonalds",
        required: false,
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
        required: false,
    },
    endDate: {
        value: "",
        name: "endDate",
        label: "End Date",
        type: "month",
        placeholder: "Select Date",
        required: false,
    },
    experience: {
        value: "",
        name: "experience",
        label: "Your experience",
        type: "textarea",
        placeholder: "Please update your experience",
        required: false,
    },
}

export const DEFAULT_EDUCATION_INFO: EducationInfo = {
    school: {
        value: "",
        name: "school",
        label: "School",
        type: "text",
        placeholder: "University of Toronto",
        required: false,
    },
    degree: {
        value: "",
        name: "degree",
        label: "Degree",
        type: "select",
        placeholder: "Select degree",
        options: DEGREE_OPTIONS,
        required: false,
    },
    fieldOfStudy: {
        value: "",
        name: "fieldOfStudy",
        label: "Field of Study",
        type: "text",
        placeholder: "Computer Science",
        required: false,
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
        label: "Start Year",
        type: "text",
        placeholder: "2020",
        required: false,
    },
    endDate: {
        value: "",
        name: "endDate",
        label: "End Year",
        type: "text",
        placeholder: "2024",
        required: false,
    },
}

export const DEFAULT_SKILL_INFO: SkillInfo = {
    category: {
        value: "",
        name: "category",
        label: "Category",
        type: "text",
        placeholder: "Technical Skills",
        required: false,
    },
    skills: {
        value: "",
        name: "skills",
        label: "Skills",
        type: "text",
        placeholder: "JavaScript, TypeScript, React, Node.js",
        required: false,
    },
}

export const DEFAULT_LANGUAGE_INFO: LanguageInfo = {
    language: {
        value: "",
        name: "language",
        label: "Language",
        type: "select",
        placeholder: "Select language",
        options: LANGUAGE_OPTIONS,
        allowOther: true,
        required: false,
    },
    proficiency: {
        value: "",
        name: "proficiency",
        label: "Proficiency",
        type: "select",
        placeholder: "Select proficiency",
        options: PROFICIENCY_OPTIONS,
        required: false,
    },
}

export const DEFAULT_CERTIFICATION_INFO: CertificationInfo = {
    name: {
        value: "",
        name: "name",
        label: "Certification Name",
        type: "text",
        placeholder: "AWS Certified Solutions Architect",
        required: false,
    },
    issuer: {
        value: "",
        name: "issuer",
        label: "Issuing Organization",
        type: "text",
        placeholder: "Amazon Web Services",
        required: false,
    },
    date: {
        value: "",
        name: "date",
        label: "Year",
        type: "text",
        placeholder: "2023",
        required: false,
    },
}

export const LOCAL_STORAGE_KEY = "resume-builder-data";
