import React from "react";
import { SkillInfo } from "../../data/resume.model.tsx";
import InfoInput from "../InfoInput/InfoInput.tsx";

type SkillFormProps = {
    index: number;
    skill: SkillInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    fieldErrors: Record<string, string | null>;
    onRemove?: () => void;
};

function SkillForm({ index, skill, handleChange, fieldErrors, onRemove }: SkillFormProps) {
    return (
        <div className="skill-form-item border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700">Skill Category {index + 1}</h3>
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
                {Object.values(skill).map((field) => (
                    <InfoInput
                        key={field.name}
                        info={field}
                        error={fieldErrors[field.name]}
                        onChange={handleChange}
                        fieldId={`${field.name}-${index}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default SkillForm;
