export type InputField = {
    value: string;
    name: string;
    label?: string;
    type: "text" | "email" | "tel" | "textarea" | "date" | "checkbox";
    placeholder?: string;
    required?: boolean;
};

export type PersonalInfo = {
    fullName: InputField;
    email: InputField;
    phone: InputField;
    location: InputField;
};

export type ExperienceInfo = {
    jobTitle: InputField;
    employer: InputField;
    location: InputField;
    startDate: InputField;
    endDate: InputField;
    ongoing: InputField;
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
    }
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
        type: "date",
        placeholder: "Select Date",
        required: true,
    },
    endDate: {
        value: "",
        name: "endDate",
        label: "End Date",
        type: "date",
        placeholder: "Select Date",
    },
    ongoing : {
        value: "",
        name: "ongoing",
        label: "I am currently working here",
        type: "checkbox",
    }
}

export const LOCAL_STORAGE_KEY = "resume-personal-info";
