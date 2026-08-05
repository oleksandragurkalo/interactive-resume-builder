import React from "react";
import ExperienceForm from "../ExperienceForm/ExperienceForm";
import { ExperienceInfo } from "../../data/resume.model";

export type ExperienceFormListProps = {
    experienceList: ExperienceInfo[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => void;
    fieldErrors: Record<keyof ExperienceInfo, string | null>[];
    handleCheckboxChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    isOngoingList: boolean[];
    addExperienceListItem: () => void;
    removeExperienceListItem: (index: number) => void;
};

function ExperienceFormList({
                                experienceList,
                                handleChange,
                                fieldErrors,
                                handleCheckboxChange,
                                isOngoingList,
                                addExperienceListItem,
                                removeExperienceListItem,
                            }: ExperienceFormListProps) {
    const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addExperienceListItem();
    };

    return (
        <div className="experience-form-list w-full border-t border-gray-200 py-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
                <p className="text-sm text-gray-500">Add your work experience details</p>
            </div>

            <div className="space-y-4">
                {experienceList.map((experience, index) => (
                    <ExperienceForm
                        key={`exp-${index}`}
                        index={index}
                        experience={experience}
                        handleChange={(e) => handleChange(e, index)}
                        fieldErrors={fieldErrors[index] ?? ({} as Record<keyof ExperienceInfo, string | null>)}
                        handleCheckboxChange={(e) => handleCheckboxChange(e, index)}
                        isOngoing={isOngoingList[index] ?? false}
                        onRemove={experienceList.length > 1 ? () => removeExperienceListItem(index) : undefined}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={onAddClick}
                className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
                + Add Experience
            </button>
        </div>
    );
}

export default ExperienceFormList;
