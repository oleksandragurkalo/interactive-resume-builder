import React from "react";
import { ExperienceInfo } from "../../data/resume.model.tsx";
import ExperienceInput from "../ExperienceInput/ExperienceInput.tsx";

type ExperienceFormProps = {
    index: number;
    experience: ExperienceInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    fieldErrors: Record<string, string | null>;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isOngoing: boolean;
    onRemove?: () => void;
};

function ExperienceForm({ index, experience, handleChange, fieldErrors, handleCheckboxChange, isOngoing, onRemove }: ExperienceFormProps) {
    return (
        <div className="experience-form-item border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700">Experience {index + 1}</h3>
                {onRemove && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                    >
                        Remove
                    </button>
                )}
            </div>
            <div className="space-y-4">
                {Object.values(experience).map((field) => (
                    <ExperienceInput
                        key={field.name}
                        experience={field}
                        error={fieldErrors[field.name]}
                        onChange={handleChange}
                        isOngoing={isOngoing}
                        handleCheckboxChange={handleCheckboxChange}
                        fieldId={`${field.name}-${index}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExperienceForm;
