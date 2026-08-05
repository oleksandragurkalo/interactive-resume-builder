import React from "react";
import { InputField } from "../../data/resume.model.tsx";

type ExperienceInputProps = {
    experience: InputField;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isOngoing: boolean,
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fieldId?: string;
};

const ExperienceInput = React.memo(({experience, error, onChange, isOngoing, handleCheckboxChange, fieldId}: ExperienceInputProps) => {
    const id = fieldId ?? experience.name;

    return (
        <div className="experience-field flex gap-1 flex-col">
            <label htmlFor={id} className="font-medium text-gray-700 text-sm">
                {experience.label}
                {experience.required && <span className="text-red-500"> *</span>}
                {error && <div><span className="text-red-500 text-xs">{error}</span></div>}
            </label>
            {experience.type === "textarea" ? (
                <textarea
                    name={experience.name}
                    id={id}
                    placeholder={experience.placeholder}
                    required={experience.required}
                    value={experience.value}
                    onChange={onChange}
                    className={`w-full border p-2.5 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? "border-red-500" : ""}`}
                    style={{height: '100px'}}
                />
            ) : (
                <input
                    type={experience.type}
                    name={experience.name}
                    id={id}
                    placeholder={experience.placeholder}
                    required={experience.required}
                    value={experience.value}
                    onChange={onChange}
                    disabled={experience.name === "endDate" && isOngoing}
                    className={`w-full border p-2.5 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${experience.name === "endDate" && isOngoing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
                />
            )}

            {experience.name === "endDate" && (
                <div className="flex items-center gap-2 mt-2">
                    <input type='checkbox' id={`${id}-ongoing`} className={`border p-2 border-gray-300 rounded`}
                           checked={isOngoing}
                           onChange={(e) => handleCheckboxChange(e)}/>
                    <label htmlFor={`${id}-ongoing`} className="font-medium text-sm text-gray-700">
                        I am currently working here
                    </label>
                </div>
            )}
        </div>
    )
}, arePropsEqual);

function arePropsEqual(prevProps: ExperienceInputProps, nextProps: ExperienceInputProps) {
    return (
        prevProps.experience.value === nextProps.experience.value &&
        prevProps.experience.required === nextProps.experience.required &&
        prevProps.error === nextProps.error &&
        prevProps.isOngoing === nextProps.isOngoing &&
        prevProps.fieldId === nextProps.fieldId
    );
}

export default ExperienceInput;
