import {
    CertificationInfo,
    EducationInfo,
    ExperienceInfo,
    LanguageInfo,
    LOCAL_STORAGE_KEY,
    PersonalInfo,
    SkillInfo,
} from "../data/resume.model.tsx";

export type PersistedResumeData = {
    step: number;
    info: PersonalInfo;
    experienceList: ExperienceInfo[];
    isExperienceOngoingList: boolean[];
    educationList: EducationInfo[];
    skillList: SkillInfo[];
    languageList: LanguageInfo[];
    certificationList: CertificationInfo[];
};

export function loadResumeData(): Partial<PersistedResumeData> | null {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function saveResumeData(data: PersistedResumeData) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch {
        // localStorage may be unavailable (private browsing, quota exceeded) — fail silently
    }
}
