import React from "react";
import {CertificationInfo, EducationInfo, ExperienceInfo, LanguageInfo, PersonalInfo, SkillInfo} from "../../data/resume.model.tsx";

type ResumePreviewProps = {
    info: PersonalInfo;
    experienceList: ExperienceInfo[];
    educationList: EducationInfo[];
    skillList: SkillInfo[];
    languageList: LanguageInfo[];
    certificationList: CertificationInfo[];
};

const TEXT_BASE = "text-[clamp(11px,1.75cqw,14px)]";
const TEXT_SMALL = "text-[clamp(9px,1.5cqw,12px)]";

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 mb-2">
            <h3 className={`${TEXT_SMALL} font-semibold text-gray-800 uppercase tracking-wide whitespace-nowrap`}>{children}</h3>
            <div className="flex-1 h-px bg-gray-200"/>
        </div>
    );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-3">
            <span className={`w-20 shrink-0 ${TEXT_SMALL} font-semibold text-gray-800 uppercase tracking-wide pt-0.5`}>{label}</span>
            <div className={`flex-1 ${TEXT_BASE} text-gray-700 space-y-1`}>{children}</div>
        </div>
    );
}

function ResumePreview({ info, experienceList, educationList, skillList, languageList, certificationList }: ResumePreviewProps) {
    const contactParts = [info.location.value, info.phone.value, info.email.value].filter(Boolean);

    return (
        <div className="resume-preview-frame w-full max-w-[210mm] mx-auto [container-type:inline-size]">
            <div className="resume-preview shadow-lg border border-gray-200 rounded-lg bg-white p-[clamp(12px,9.5cqw,20mm)]">
                {/* Name + contact */}
                <div className="resume-preview__header flex gap-3 pb-4 mb-4 border-b border-gray-200">
                    <div className="w-1 rounded bg-blue-600 shrink-0"/>
                    <div>
                        <h2 className="text-[clamp(18px,3cqw,24px)] font-bold text-gray-900">
                            {info.fullName.value || "Your Name"}
                        </h2>
                        {contactParts.length > 0 && (
                            <div className={`flex flex-wrap items-center gap-x-2 ${TEXT_BASE} text-gray-600 mt-1`}>
                                {contactParts.map((part, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <span className="text-gray-300">·</span>}
                                        <span>{part}</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {info.summary.value && (
                    <div className="resume-preview__summary mb-6">
                        <SectionHeading>Summary</SectionHeading>
                        <p className={`${TEXT_BASE} text-gray-700 whitespace-pre-wrap leading-relaxed`}>
                            {info.summary.value}
                        </p>
                    </div>
                )}

                {/* Skills */}
                {skillList.some((skill) => skill.skills.value) && (
                    <div className="resume-preview__skills mb-6">
                        <SectionHeading>Skills</SectionHeading>
                        <div className="space-y-1">
                            {skillList.map((skill: SkillInfo, index: number) => (
                                skill.skills.value && (
                                    <div key={index} className={`${TEXT_BASE} text-gray-700`}>
                                        {skill.category.value && <span className="font-medium text-gray-800">{skill.category.value}: </span>}
                                        <span>{skill.skills.value}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {experienceList.some((experience) => experience.jobTitle.value) && (
                    <div className="resume-preview__experience mb-6">
                        <SectionHeading>Experience</SectionHeading>
                        <div className="space-y-4">
                            {experienceList.map((experience: ExperienceInfo, index: number) => (
                                experience.jobTitle.value && (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline gap-2">
                                            <span className={`${TEXT_BASE} font-medium text-gray-900`}>
                                                {experience.jobTitle.value}
                                                {experience.employer.value && `, ${experience.employer.value}`}
                                            </span>
                                            {experience.startDate.value && (
                                                <span className={`${TEXT_SMALL} text-gray-500 whitespace-nowrap`}>
                                                    {experience.startDate.value} – {experience.endDate.value || "Present"}
                                                </span>
                                            )}
                                        </div>
                                        {experience.location.value && (
                                            <div className={`${TEXT_SMALL} text-gray-500 mt-0.5`}>{experience.location.value}</div>
                                        )}
                                        {experience.experience?.value && (
                                            <p className={`${TEXT_BASE} text-gray-700 mt-1 whitespace-pre-wrap leading-relaxed`}>
                                                {experience.experience.value}
                                            </p>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {educationList.some((education) => education.school.value) && (
                    <div className="resume-preview__education mb-6">
                        <SectionHeading>Education</SectionHeading>
                        <div className="space-y-4">
                            {educationList.map((education: EducationInfo, index: number) => (
                                education.school.value && (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline gap-2">
                                            <span className={`${TEXT_BASE} font-medium text-gray-900`}>
                                                {education.degree.value ? `${education.degree.value}, ` : ""}{education.school.value}
                                            </span>
                                            {education.startDate.value && (
                                                <span className={`${TEXT_SMALL} text-gray-500 whitespace-nowrap`}>
                                                    {education.startDate.value} – {education.endDate.value || "Present"}
                                                </span>
                                            )}
                                        </div>
                                        {(education.fieldOfStudy.value || education.location.value) && (
                                            <div className={`${TEXT_SMALL} text-gray-500 mt-0.5`}>
                                                {[education.fieldOfStudy.value, education.location.value].filter(Boolean).join(" · ")}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages / Certifications — compact detail rows */}
                <div className="space-y-2">
                    {languageList.some((language) => language.language.value) && (
                        <DetailRow label="Languages">
                            <div>
                                {languageList
                                    .filter((language) => language.language.value)
                                    .map((language: LanguageInfo) =>
                                        language.proficiency.value ? `${language.language.value} (${language.proficiency.value})` : language.language.value
                                    )
                                    .join(", ")}
                            </div>
                        </DetailRow>
                    )}

                    {certificationList.some((certification) => certification.name.value) && (
                        <DetailRow label="Certs">
                            <div>
                                {certificationList
                                    .filter((certification) => certification.name.value)
                                    .map((certification: CertificationInfo) =>
                                        certification.date.value ? `${certification.name.value} (${certification.date.value})` : certification.name.value
                                    )
                                    .join(", ")}
                            </div>
                        </DetailRow>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResumePreview;
