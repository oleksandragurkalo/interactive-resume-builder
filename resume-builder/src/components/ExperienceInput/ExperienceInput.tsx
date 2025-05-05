import React from "react";
import { InputField } from "../../data/resume.model.tsx";

type ExperienceInputProps = {
    experience: InputField;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const ExperienceInput = React.memo(({experience, error, onChange}: ExperienceInputProps) => {
    console.log('ExperienceInput rendered');
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={experience.name} className="font-medium text-sm text-gray-700">
                {experience.label}
                {experience.required && <span className="text-red-500"> *</span>}
                {error && <div><span className="text-red-500">{error}</span></div>}
            </label>
            <input
                type={experience.type}
                name={experience.name}
                id={experience.name}
                placeholder={experience.placeholder}
                required={experience.required}
                value={experience.value}
                onChange={onChange}
                className={`w-full border p-2 border-gray-300 rounded ${error ? "border-red-500" : ""}`}
            />
        </div>
    )
}, arePropsEqual);

function arePropsEqual(prevProps: ExperienceInputProps, nextProps: ExperienceInputProps) {
    return (
        prevProps.experience.value === nextProps.experience.value &&
        prevProps.error === nextProps.error
    );
}

export default ExperienceInput;
