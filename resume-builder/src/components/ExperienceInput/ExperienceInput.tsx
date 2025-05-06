import React from "react";
import { InputField } from "../../data/resume.model.tsx";

type ExperienceInputProps = {
    experience: InputField;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isOngoing: boolean,
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const ExperienceInput = React.memo(({experience, error, onChange, isOngoing, handleCheckboxChange}: ExperienceInputProps) => {
    console.log('ExperienceInput rendered');
    return (
        <div className={`flex gap-1 flex-col`}>
            <label htmlFor={experience.name} className="font-medium text-sm text-gray-700">
                {experience.label}
                {experience.required && <span className="text-red-500"> *</span>}
                {error && <div><span className="text-red-500">{error}</span></div>}
            </label>
            {experience.type === "textarea" ? (
                <textarea
                    name={experience.name}
                    id={experience.name}
                    placeholder={experience.placeholder}
                    required={experience.required}
                    value={experience.value}
                    onChange={onChange}
                    className={`w-full border p-2 border-gray-300 rounded ${error ? "border-red-500" : ""}`}
                    style={{height: '150px'}}
                />
            ) : (
                <input
                    type={experience.type}
                    name={experience.name}
                    id={experience.name}
                    placeholder={experience.placeholder}
                    required={experience.required}
                    value={experience.value}
                    onChange={onChange}
                    disabled={experience.name === "endDate" && isOngoing}
                    className={`w-full border p-2 rounded
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${experience.name === "endDate" && isOngoing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
                />
            )}

            {experience.name === "endDate" && (
                <div className="flex items-center gap-2 mt-4">
                    <input type='checkbox' id='ongoing' className={`border p-2 border-gray-300 rounded`}
                           checked={isOngoing}
                           onChange={(e) => handleCheckboxChange(e)}/>
                    <label htmlFor='ongoing' className="font-medium text-sm text-gray-700">
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
        prevProps.error === nextProps.error
    );
}

export default ExperienceInput;
