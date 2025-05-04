import { PersonalInfo } from "../../data/resume.model.tsx";

type ResumePreviewProps = {
    info: PersonalInfo;
};

function ResumePreview({ info }: ResumePreviewProps) {
    console.log('ResumePreview rendered');
    return (
        <div className="col-span-2 shadow border p-6 rounded">
            <div className="text-center border-b pb-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                    {info.fullName.value || "Your Name"}
                </h2>
            </div>

            <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-600 mb-2">
                {info.location.value && <span>{info.location.value}</span>}
                {info.phone.value && <span> | {info.phone.value}</span>}
                {info.email.value && <span> | {info.email.value}</span>}
            </div>

            {info.linkedin.value && (
                <div className="flex justify-center text-xs text-gray-600">
                    <span>Linkedin: {info.linkedin.value}</span>
                </div>
            )}

            {info.summary.value && (
                <div className="mt-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-1">
                        Summary
                    </h3>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {info.summary.value}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ResumePreview;
