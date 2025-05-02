import { PersonalInfo } from "../PersonalInfoForm/PersonalInfoForm";

type ResumePreviewProps = {
    info: PersonalInfo;
};

function ResumePreview({ info }: ResumePreviewProps) {
    return (
        <div className="col-span-2 shadow border p-6 rounded">
            <div className="text-center border-b pb-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                    {info.fullName || "Your Name"}
                </h2>
                <p className="text-lg text-gray-500">
                    {info.jobTitle || "Your Title"}
                </p>
            </div>

            <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-600 mb-2">
                {info.email && <span>{info.email}</span>}
                {info.phone && <span> | {info.phone}</span>}
                {info.location && <span> | {info.location}</span>}
            </div>

            {info.summary && (
                <div className="mt-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-1">
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {info.summary}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ResumePreview;
