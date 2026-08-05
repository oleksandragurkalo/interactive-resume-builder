import React from "react";
import CertificationForm from "../CertificationForm/CertificationForm";
import { CertificationInfo } from "../../data/resume.model";

export type CertificationFormListProps = {
    certificationList: CertificationInfo[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => void;
    fieldErrors: Record<keyof CertificationInfo, string | null>[];
    addCertificationListItem: () => void;
    removeCertificationListItem: (index: number) => void;
};

function CertificationFormList({
                                    certificationList,
                                    handleChange,
                                    fieldErrors,
                                    addCertificationListItem,
                                    removeCertificationListItem,
                                }: CertificationFormListProps) {
    const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addCertificationListItem();
    };

    return (
        <div className="certification-form-list w-full border-t border-gray-200 py-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
                <p className="text-sm text-gray-500">Add any certifications you've earned</p>
            </div>

            <div className="space-y-4">
                {certificationList.map((certification, index) => (
                    <CertificationForm
                        key={`cert-${index}`}
                        index={index}
                        certification={certification}
                        handleChange={(e) => handleChange(e, index)}
                        fieldErrors={fieldErrors[index] ?? ({} as Record<keyof CertificationInfo, string | null>)}
                        onRemove={certificationList.length > 1 ? () => removeCertificationListItem(index) : undefined}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={onAddClick}
                className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
                + Add Certification
            </button>
        </div>
    );
}

export default CertificationFormList;
