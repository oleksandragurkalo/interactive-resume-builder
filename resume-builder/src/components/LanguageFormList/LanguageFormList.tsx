import React from "react";
import LanguageForm from "../LanguageForm/LanguageForm";
import { LanguageInfo } from "../../data/resume.model";

export type LanguageFormListProps = {
    languageList: LanguageInfo[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => void;
    fieldErrors: Record<keyof LanguageInfo, string | null>[];
    addLanguageListItem: () => void;
    removeLanguageListItem: (index: number) => void;
};

function LanguageFormList({
                               languageList,
                               handleChange,
                               fieldErrors,
                               addLanguageListItem,
                               removeLanguageListItem,
                           }: LanguageFormListProps) {
    const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addLanguageListItem();
    };

    return (
        <div className="language-form-list w-full border-t border-gray-200 py-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Languages</h2>
                <p className="text-sm text-gray-500">Add the languages you speak</p>
            </div>

            <div className="space-y-4">
                {languageList.map((language, index) => (
                    <LanguageForm
                        key={`lang-${index}`}
                        index={index}
                        language={language}
                        handleChange={(e) => handleChange(e, index)}
                        fieldErrors={fieldErrors[index] ?? ({} as Record<keyof LanguageInfo, string | null>)}
                        onRemove={languageList.length > 1 ? () => removeLanguageListItem(index) : undefined}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={onAddClick}
                className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
                + Add Language
            </button>
        </div>
    );
}

export default LanguageFormList;
