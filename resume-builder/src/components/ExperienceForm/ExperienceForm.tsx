import React, { useState } from "react";
import { ExperienceInfo } from "../../data/resume.model.tsx";
import ExperienceInput from "../ExperienceInput/ExperienceInput.tsx";

type ExperienceFormProps = {
    experience: ExperienceInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    fieldErrors: Record<string, string | null>;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isOngoing: boolean;
};

function ExperienceForm({ experience, handleChange, fieldErrors, handleCheckboxChange, isOngoing }: ExperienceFormProps) {
    console.log('ExperienceForm rendered');
    const [addExperience, setAddExperience] = useState(false);

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddExperience(true);
    }

    return (
        <div className="w-full border-t py-4">
            <div className="flex justify-between items-center gap-1">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Experience</h2>
                    <p className="text-sm text-gray-500">Add your experience details</p>
                </div>
                <button
                    onClick={onClick}
                    className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                    Add Experience
                </button>
            </div>
            {addExperience && (
                <>
                    <div className="space-y-4 mt-4">
                        {Object.values(experience).map((field) => (
                            <ExperienceInput
                                key={field.name}
                                experience={field}
                                error={fieldErrors[field.name]}
                                onChange={handleChange}
                                isOngoing={isOngoing}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ExperienceForm;
