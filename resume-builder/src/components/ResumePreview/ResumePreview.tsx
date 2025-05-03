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
                {info.email.value && <span>{info.email.value}</span>}
                {info.phone.value && <span> | {info.phone.value}</span>}
                {info.location.value && <span> | {info.location.value}</span>}
            </div>
        </div>
    );
}

export default ResumePreview;
