import React from "react";
import InfoInput from "../InfoInput/InfoInput.tsx";
import { PersonalInfo } from "../../data/resume.model.tsx";

type InfoFormProps = {
    info: PersonalInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    fieldErrors: Record<string, string | null>;
};

function PersonalInfoForm({ info, handleChange, fieldErrors }: InfoFormProps) {
    return (
        <form className="space-y-4">
            {Object.values(info).map((field) => (
                <InfoInput key={field.name} info={field} error={fieldErrors[field.name]} onChange={handleChange}/>
            ))}
        </form>
    )
}

export default PersonalInfoForm;
