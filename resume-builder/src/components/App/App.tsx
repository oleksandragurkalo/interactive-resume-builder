import React, { useEffect, useMemo, useState } from "react";
import { useFormStep } from "../../hooks/useFormStep.tsx";
import {
    handleValidatedContinue,
    handleValidatedContinueForList,
    validateForm,
} from "../../utils/validation.tsx";
import { loadResumeData, saveResumeData } from "../../utils/storage.tsx";
import Header from "../Header/Header.tsx";
import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm.tsx";
import EducationFormList from "../EducationFormList/EducationFormList.tsx";
import ResumePreview from "../ResumePreview/ResumePreview.tsx";
import ContinueButton from "../ContinueButton/ContinueButton.tsx";
import ExperienceFormList from "../ExperienceFormList/ExperienceFormList.tsx";
import SkillFormList from "../SkillFormList/SkillFormList.tsx";
import LanguageFormList from "../LanguageFormList/LanguageFormList.tsx";
import CertificationFormList from "../CertificationFormList/CertificationFormList.tsx";
import StepIndicator from "../StepIndicator/StepIndicator.tsx";
import {
    CertificationInfo,
    DEFAULT_CERTIFICATION_INFO,
    DEFAULT_EDUCATION_INFO,
    DEFAULT_EXPERIENCE_INFO,
    DEFAULT_LANGUAGE_INFO,
    DEFAULT_PERSONAL_INFO,
    DEFAULT_SKILL_INFO,
    EducationInfo,
    ExperienceInfo,
    LanguageInfo,
    PersonalInfo,
    SkillInfo
} from "../../data/resume.model.tsx";
import './App.css'
import { useFormList } from "../../hooks/useFormList.tsx";

function App() {
    const [savedData] = useState(() => loadResumeData());

    const [isExperienceOngoingList, setIsExperienceOngoingList] = useState(
        savedData?.isExperienceOngoingList ?? [false]
    );
    const [step, setStep] = React.useState(savedData?.step ?? 1);

    const {
        data: info,
        errors: personalErrors,
        setErrors: setPersonalErrors,
        handleChange: handlePersonalChange,
    } = useFormStep<PersonalInfo>(savedData?.info ?? DEFAULT_PERSONAL_INFO);

    const {
        list: experienceList,
        setList: setExperienceList,
        errorsList: experienceErrorsList,
        setErrorsList: setExperienceErrorsList,
        handleChange: handleExperienceChange,
        addItem: addExperience,
        removeItem: removeExperience,
    } = useFormList<ExperienceInfo>(DEFAULT_EXPERIENCE_INFO, savedData?.experienceList);

    const {
        list: educationList,
        errorsList: educationErrorsList,
        setErrorsList: setEducationErrorsList,
        handleChange: handleEducationChange,
        addItem: addEducationListItem,
        removeItem: removeEducationListItem,
    } = useFormList<EducationInfo>(DEFAULT_EDUCATION_INFO, savedData?.educationList);

    const {
        list: skillList,
        errorsList: skillErrorsList,
        setErrorsList: setSkillErrorsList,
        handleChange: handleSkillChange,
        addItem: addSkillListItem,
        removeItem: removeSkillListItem,
    } = useFormList<SkillInfo>(DEFAULT_SKILL_INFO, savedData?.skillList);

    const {
        list: languageList,
        errorsList: languageErrorsList,
        setErrorsList: setLanguageErrorsList,
        handleChange: handleLanguageChange,
        addItem: addLanguageListItem,
        removeItem: removeLanguageListItem,
    } = useFormList<LanguageInfo>(DEFAULT_LANGUAGE_INFO, savedData?.languageList);

    const {
        list: certificationList,
        errorsList: certificationErrorsList,
        handleChange: handleCertificationChange,
        addItem: addCertificationListItem,
        removeItem: removeCertificationListItem,
    } = useFormList<CertificationInfo>(DEFAULT_CERTIFICATION_INFO, savedData?.certificationList);

    useEffect(() => {
        saveResumeData({
            step,
            info,
            experienceList,
            isExperienceOngoingList,
            educationList,
            skillList,
            languageList,
            certificationList,
        });
    }, [step, info, experienceList, isExperienceOngoingList, educationList, skillList, languageList, certificationList]);

    const isPersonalValid = useMemo(
        () => Object.values(personalErrors).every((e) => e === null),
        [personalErrors]
    );

    const isExperienceValid = useMemo(
        () => experienceErrorsList.every((errors) => Object.values(errors).every((e) => e === null)),
        [experienceErrorsList]
    );

    const isEducationValid = useMemo(
        () => educationErrorsList.every((errors) => Object.values(errors).every((e) => e === null)),
        [educationErrorsList]
    );

    const isSkillValid = useMemo(
        () => skillErrorsList.every((errors) => Object.values(errors).every((e) => e === null)),
        [skillErrorsList]
    );

    const isLanguageValid = useMemo(
        () => languageErrorsList.every((errors) => Object.values(errors).every((e) => e === null)),
        [languageErrorsList]
    );

    const handlePersonalInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleValidatedContinue(info, validateForm, setPersonalErrors, () => setStep(s => s + 1));
    };

    const handleExperienceInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleValidatedContinueForList(
            experienceList,
            validateForm,
            setExperienceErrorsList,
            () => setStep(s => s + 1),
            {
                minItems: 1,
                emptyListMessage: "At least one experience is required"
            }
        );
    };

    const handleEducationInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleValidatedContinueForList(
            educationList,
            validateForm,
            setEducationErrorsList,
            () => setStep(s => s + 1),
            {
                minItems: 1,
                emptyListMessage: "At least one education entry is required"
            }
        );
    };

    const handleSkillInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleValidatedContinueForList(
            skillList,
            validateForm,
            setSkillErrorsList,
            () => setStep(s => s + 1),
            {
                minItems: 1,
                emptyListMessage: "At least one skill category is required"
            }
        );
    };

    const handleLanguageInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleValidatedContinueForList(
            languageList,
            validateForm,
            setLanguageErrorsList,
            () => setStep(s => s + 1),
            {
                minItems: 1,
                emptyListMessage: "At least one language is required"
            }
        );
    };

    const handleExperienceCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const checked = e.target.checked;

        if (index < 0 || index >= isExperienceOngoingList.length) return;

        setExperienceList((prev) => updateEndDateField(prev, checked, index));

        setIsExperienceOngoingList((prev) => {
            const updated = [...prev];
            updated[index] = checked;
            return updated;
        });
    };

    function updateEndDateField<T extends { endDate: { value: string; required?: boolean } }>(
        list: T[],
        checked: boolean,
        index: number
    ): T[] {
        if (index < 0 || index >= list.length) return list;

        const updated = [...list];
        updated[index] = {
            ...updated[index],
            endDate: {
                ...updated[index].endDate,
                value: checked ? "" : updated[index].endDate.value,
                required: !checked,
            },
        };
        return updated;
    }

    const addExperienceListItem = () => {
        addExperience();
        setIsExperienceOngoingList((prev) => [...prev, false]);
        setExperienceErrorsList((prev) => [...prev, {}]);
    };

    const removeExperienceListItem = (index: number) => {
        removeExperience(index);
        setIsExperienceOngoingList((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <main className="app-root min-h-screen bg-gray-50 text-gray-900">
            <Header/>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div >
                    <StepIndicator currentStep={step}/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <div className="resume-form-panel space-y-4">
                        {step >= 1 && (
                            <>
                                <PersonalInfoForm info={info} handleChange={handlePersonalChange} fieldErrors={personalErrors}/>
                                {step === 1 && <ContinueButton disabled={!isPersonalValid} onClick={handlePersonalInfoClick}/>}
                            </>
                        )}
                        {step >= 2 && (
                            <>
                                <SkillFormList skillList={skillList} handleChange={handleSkillChange}
                                               fieldErrors={skillErrorsList} addSkillListItem={addSkillListItem}
                                               removeSkillListItem={removeSkillListItem}
                                />
                                {step === 2 && <ContinueButton disabled={!isSkillValid} onClick={handleSkillInfoClick}/>}
                            </>
                        )}
                        {step >= 3 && (
                            <>
                                <ExperienceFormList experienceList={experienceList} handleChange={handleExperienceChange}
                                                    fieldErrors={experienceErrorsList} handleCheckboxChange={handleExperienceCheckboxChange}
                                                    isOngoingList={isExperienceOngoingList} addExperienceListItem={addExperienceListItem}
                                                    removeExperienceListItem={removeExperienceListItem}
                                />
                                {step === 3 && <ContinueButton disabled={!isExperienceValid} onClick={handleExperienceInfoClick}/>}
                            </>
                        )}
                        {step >= 4 && (
                            <>
                                <EducationFormList educationList={educationList} handleChange={handleEducationChange}
                                                    fieldErrors={educationErrorsList} addEducationListItem={addEducationListItem}
                                                    removeEducationListItem={removeEducationListItem}
                                />
                                {step === 4 && <ContinueButton disabled={!isEducationValid} onClick={handleEducationInfoClick}/>}
                            </>
                        )}
                        {step >= 5 && (
                            <>
                                <LanguageFormList languageList={languageList} handleChange={handleLanguageChange}
                                                  fieldErrors={languageErrorsList} addLanguageListItem={addLanguageListItem}
                                                  removeLanguageListItem={removeLanguageListItem}
                                />
                                {step === 5 && <ContinueButton disabled={!isLanguageValid} onClick={handleLanguageInfoClick}/>}
                            </>
                        )}
                        {step >= 6 && (
                            <>
                                <CertificationFormList certificationList={certificationList} handleChange={handleCertificationChange}
                                                        fieldErrors={certificationErrorsList} addCertificationListItem={addCertificationListItem}
                                                        removeCertificationListItem={removeCertificationListItem}
                                />
                            </>
                        )}
                    </div>
                    <div className="resume-preview-panel lg:sticky lg:top-4">
                        <ResumePreview info={info} experienceList={experienceList} educationList={educationList}
                                       skillList={skillList} languageList={languageList} certificationList={certificationList}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default App;
