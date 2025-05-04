import React, { useState } from "react";
import InfoForm from "../InfoForm/InfoForm.tsx";
import ResumePreview from "../ResumePreview/ResumePreview.tsx";
import EducationForm from "../EducationForm/EducationForm.tsx";
import { DEFAULT_PERSONAL_INFO, PersonalInfo } from "../../data/resume.model.tsx";
import { validateField, validateForm } from "../../utils/validation.tsx";

function PersonalInfoForm() {
    console.log('PersonalInfoForm rendered');
    const [info, setInfo] = useState<PersonalInfo>(DEFAULT_PERSONAL_INFO);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
    const [step, setStep] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInfo((prev) => {
            const fieldName = name as keyof typeof prev;
            return {
                ...prev,
                [fieldName]: {
                    ...prev[fieldName],
                    value,
                },
            };
        });

        const field = info[name as keyof typeof info];
        const updatedField = { ...field, value };
        const error = validateField(updatedField);

        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const errors = validateForm(info);
        setFieldErrors(errors);

        const hasErrors = Object.values(errors).some((e) => e !== null);
        if (!hasErrors) {
            setStep((step) => step + 1);
        }
    };

    return (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4 space-y-4">
                    <InfoForm info={info} handleChange={handleChange} handleClick={handleClick} fieldErrors={fieldErrors}/>
                    {step >= 2 && <EducationForm />}
                </div>
            </div>
            <div
                className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <ResumePreview info={info}/>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
