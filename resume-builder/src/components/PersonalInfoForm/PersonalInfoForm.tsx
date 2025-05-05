import React, { useMemo } from "react";
import InfoInput from "../InfoInput/InfoInput.tsx";
import { PersonalInfo } from "../../data/resume.model.tsx";

type InfoFormProps = {
    info: PersonalInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    fieldErrors: Record<string, string | null>;
};

function PersonalInfoForm({ info, handleChange, handleClick, fieldErrors }: InfoFormProps) {
    const isFormValid = useMemo(
        () => Object.values(fieldErrors).every((error) => error === null),
        [fieldErrors]
    );

    return (
        <>
            <form className="space-y-4">
                {Object.values(info).map((field) => (
                    <InfoInput key={field.name} info={field} error={fieldErrors[field.name]} onChange={handleChange}/>
                ))}
            </form>
            <div className="flex justify-end">
                <button type="submit"
                        disabled={!isFormValid}
                        onClick={handleClick}
                        className={`px-5 py-2 rounded-md font-medium transition-colors
                            ${isFormValid
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    Continue
                </button>
            </div>
        </>
    )
}

export default PersonalInfoForm;
