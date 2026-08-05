import React from "react";
import { CertificationInfo } from "../../data/resume.model.tsx";
import InfoInput from "../InfoInput/InfoInput.tsx";

type CertificationFormProps = {
    index: number;
    certification: CertificationInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    fieldErrors: Record<string, string | null>;
    onRemove?: () => void;
};

function CertificationForm({ index, certification, handleChange, fieldErrors, onRemove }: CertificationFormProps) {
    return (
        <div className="certification-form-item border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700">Certification {index + 1}</h3>
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
                {Object.values(certification).map((field) => (
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

export default CertificationForm;
