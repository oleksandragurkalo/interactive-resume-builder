import React, {useMemo} from "react";
import { useFormStep } from "../../hooks/useFormStep.tsx";
import {handleValidatedContinue, validateForm} from "../../utils/validation.tsx";
import Header from "../Header/Header.tsx";
import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm.tsx";
import ExperienceForm from "../ExperienceForm/ExperienceForm.tsx";
import EducationForm from "../EducationForm/EducationForm.tsx";
import ResumePreview from "../ResumePreview/ResumePreview.tsx";
import {
    DEFAULT_EXPERIENCE_INFO,
    DEFAULT_PERSONAL_INFO,
    ExperienceInfo,
    PersonalInfo
} from "../../data/resume.model.tsx";
import './App.css'
import ContinueButton from "../ContinueButton/ContinueButton.tsx";


function App() {
    const [step, setStep] = React.useState(1);

    const {
        data: info,
        errors: personalErrors,
        setErrors: setPersonalErrors,
        handleChange: handlePersonalChange,
    } = useFormStep<PersonalInfo>(DEFAULT_PERSONAL_INFO);

    const {
        data: experience,
        errors: experienceErrors,
        setErrors: setExperienceErrors,
        handleChange: handleExperienceChange,
    } = useFormStep<ExperienceInfo>(DEFAULT_EXPERIENCE_INFO);

    const isPersonalValid = useMemo(
        () => Object.values(personalErrors).every((e) => e === null),
        [personalErrors]
    );

    const isExperienceValid = useMemo(
        () => Object.values(experienceErrors).every((e) => e === null),
        [experienceErrors]
    );

    const handlePersonalInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleValidatedContinue(info, validateForm, setPersonalErrors, () => setStep(s => s + 1));
    };

    const handleExperienceInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleValidatedContinue(experience, validateForm, setExperienceErrors, () => setStep(s => s + 1));
    };


    return (
        <main className="grid grid-cols-6 items-start min-h-screen text-gray-900">
            <div className="col-span-4 col-start-2">
                <Header/>
                <div className="px-6 py-24 sm:py-12 lg:overflow-visible lg:px-0">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                            <div className="lg:pr-4 space-y-4">
                                {step >= 1 && (
                                    <>
                                        <PersonalInfoForm info={info} handleChange={handlePersonalChange} fieldErrors={personalErrors}/>
                                        <ContinueButton disabled={!isPersonalValid} onClick={handlePersonalInfoClick}/>
                                    </>
                                )}
                                {step >= 2 && (
                                    <>
                                        <ExperienceForm experience={experience} handleChange={handleExperienceChange} fieldErrors={experienceErrors}/>
                                        <ContinueButton disabled={!isExperienceValid} onClick={handleExperienceInfoClick}/>
                                    </>
                                )}
                                {step >= 3 && (
                                    <>
                                        <EducationForm />
                                        <ContinueButton onClick={() => setStep((s) => s + 1)} disabled={false}/>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                            <ResumePreview info={info} experience={experience}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default App;
