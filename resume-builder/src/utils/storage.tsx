import {
    CertificationInfo,
    EducationInfo,
    ExperienceInfo,
    LanguageInfo,
    LOCAL_STORAGE_KEY,
    PersonalInfo,
    SkillInfo,
} from "../data/resume.model.tsx";

const STORAGE_VERSION = 1;

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

type PersistedEnvelope = {
    version: number;
    data: PersistedResumeData;
};

export function loadResumeData(): Partial<PersistedResumeData> | null {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as Partial<PersistedEnvelope>;
        if (parsed.version !== STORAGE_VERSION || !parsed.data) return null;

        return parsed.data;
    } catch {
        return null;
    }
}

export function saveResumeData(data: PersistedResumeData) {
    try {
        const envelope: PersistedEnvelope = { version: STORAGE_VERSION, data };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(envelope));
    } catch {
        // localStorage may be unavailable (private browsing, quota exceeded) — fail silently
    }
}
