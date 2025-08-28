import {ExperienceInfo, PersonalInfo} from "../../data/resume.model.tsx";

type ResumePreviewProps = {
    info: PersonalInfo;
    experienceList: ExperienceInfo[];
};

function ResumePreview({ info, experienceList }: ResumePreviewProps) {
    console.log('ResumePreview rendered');
    return (
        <div className="col-span-2 shadow-lg border border-gray-200 p-10 rounded-lg bg-white">
            {/* Name */}
            <div className="text-center border-b pb-10 mb-4">
                <h2 className="text-8xl font-bold text-gray-800">
                    {info.fullName.value || "Your Name"}
                </h2>
            </div>

            {/* Contact Info */}
            <div className="flex justify-center flex-wrap text-6xl text-gray-600 mb-4 divide-x divide-gray-300">
                <span className="px-2">{info.location.value}</span>
                <span className="px-2">{info.phone.value}</span>
                <span className="px-2">{info.email.value}</span>
            </div>


            {/* Summary */}
            {info.summary.value && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Summary</h3>
                    <p className="text-6xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {info.summary.value}
                    </p>
                </div>
            )}

            {/* Experience */}
            {experienceList.map((experience: ExperienceInfo, index: number) => (
                <div key={index}>
                    {experience.jobTitle.value && (
                        <div className="mt-4 space-y-1">
                            <div className="flex flex-wrap text-6xl text-gray-600 divide-x divide-gray-300">
                                {experience.employer.value && (
                                    <span className="pr-2">{experience.employer.value}</span>
                                )}
                                {experience.location.value && (
                                    <span className="px-2">{experience.location.value}</span>
                                )}
                            </div>
                            <div className="flex flex-wrap text-6xl font-medium text-gray-800 divide-x divide-gray-300">
                                <span className="pr-2">{experience.jobTitle.value}</span>
                                {experience.startDate.value && (
                                    <span className="px-2">{experience.startDate.value}</span>
                                )}
                                {experience.startDate.value && (
                                    <span className="px-2">
                            {experience.endDate.value ? experience.endDate.value : "Present"}
                        </span>
                                )}
                            </div>
                            {experience.experience?.value && (
                                <p className="text-6xl text-gray-700 mt-2 whitespace-pre-wrap leading-relaxed">
                                    {experience.experience.value}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {/*<div>*/}
            {/*    {experience.jobTitle.value && (*/}
            {/*        <div className="mt-4 space-y-1">*/}
            {/*            <div className="flex flex-wrap text-6xl text-gray-600 divide-x divide-gray-300">*/}
            {/*                {experience.employer.value && (*/}
            {/*                    <span className="pr-2">{experience.employer.value}</span>*/}
            {/*                )}*/}
            {/*                {experience.location.value && (*/}
            {/*                    <span className="px-2">{experience.location.value}</span>*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*            <div className="flex flex-wrap text-6xl font-medium text-gray-800 divide-x divide-gray-300">*/}
            {/*                <span className="pr-2">{experience.jobTitle.value}</span>*/}
            {/*                {experience.startDate.value && (*/}
            {/*                    <span className="px-2">{experience.startDate.value}</span>*/}
            {/*                )}*/}
            {/*                {experience.startDate.value && (*/}
            {/*                    <span className="px-2">*/}
            {/*                {experience.endDate.value ? experience.endDate.value : "Present"}*/}
            {/*            </span>*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*            {experience.experience?.value && (*/}
            {/*                <p className="text-6xl text-gray-700 mt-2 whitespace-pre-wrap leading-relaxed">*/}
            {/*                    {experience.experience.value}*/}
            {/*                </p>*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}

        </div>

    );
}

export default ResumePreview;
