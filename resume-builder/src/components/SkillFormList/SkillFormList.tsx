import React from "react";
import SkillForm from "../SkillForm/SkillForm";
import { SkillInfo } from "../../data/resume.model";

export type SkillFormListProps = {
    skillList: SkillInfo[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => void;
    fieldErrors: Record<keyof SkillInfo, string | null>[];
    addSkillListItem: () => void;
    removeSkillListItem: (index: number) => void;
};

function SkillFormList({
                            skillList,
                            handleChange,
                            fieldErrors,
                            addSkillListItem,
                            removeSkillListItem,
                        }: SkillFormListProps) {
    const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addSkillListItem();
    };

    return (
        <div className="skill-form-list w-full border-t border-gray-200 py-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                <p className="text-sm text-gray-500">Group your skills by category</p>
            </div>

            <div className="space-y-4">
                {skillList.map((skill, index) => (
                    <SkillForm
                        key={`skill-${index}`}
                        index={index}
                        skill={skill}
                        handleChange={(e) => handleChange(e, index)}
                        fieldErrors={fieldErrors[index] ?? ({} as Record<keyof SkillInfo, string | null>)}
                        onRemove={skillList.length > 1 ? () => removeSkillListItem(index) : undefined}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={onAddClick}
                className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
                + Add Category
            </button>
        </div>
    );
}

export default SkillFormList;
