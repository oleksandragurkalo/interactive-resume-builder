import React from "react";
import EducationForm from "../EducationForm/EducationForm";
import { EducationInfo } from "../../data/resume.model";

export type EducationFormListProps = {
    educationList: EducationInfo[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => void;
    fieldErrors: Record<keyof EducationInfo, string | null>[];
    addEducationListItem: () => void;
    removeEducationListItem: (index: number) => void;
};

function EducationFormList({
                                educationList,
                                handleChange,
                                fieldErrors,
                                addEducationListItem,
                                removeEducationListItem,
                            }: EducationFormListProps) {
    const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addEducationListItem();
    };

    return (
        <div className="education-form-list w-full border-t border-gray-200 py-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                <p className="text-sm text-gray-500">Add your education details</p>
            </div>

            <div className="space-y-4">
                {educationList.map((education, index) => (
                    <EducationForm
                        key={`edu-${index}`}
                        index={index}
                        education={education}
                        handleChange={(e) => handleChange(e, index)}
                        fieldErrors={fieldErrors[index] ?? ({} as Record<keyof EducationInfo, string | null>)}
                        onRemove={educationList.length > 1 ? () => removeEducationListItem(index) : undefined}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={onAddClick}
                className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
                + Add Education
            </button>
        </div>
    );
}

export default EducationFormList;
