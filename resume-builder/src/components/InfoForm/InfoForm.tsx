import { PersonalInfo } from "../PersonalInfoForm/PersonalInfoForm";
import InfoInput from "../InfoInput/InfoInput.tsx";

type InfoFormProps = {
    info: PersonalInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function InfoForm ({ info, handleChange }: InfoFormProps) {
    return (
        <form className="space-y-4">
            <InfoInput
                name="fullName"
                placeholder="Full Name"
                value={info.fullName}
                onChange={handleChange}
            />
            <InfoInput
                name="jobTitle"
                placeholder="Job Title"
                value={info.jobTitle}
                onChange={handleChange}
            />
            <InfoInput
                name="email"
                placeholder="Email"
                value={info.email}
                onChange={handleChange}
            />
            <InfoInput
                name="phone"
                placeholder="Phone"
                value={info.phone}
                onChange={handleChange}
            />
            <InfoInput
                name="location"
                placeholder="Location"
                value={info.location}
                onChange={handleChange}
            />
            <textarea
                name="summary"
                placeholder="Professional Summary"
                value={info.summary}
                onChange={handleChange}
                rows={4}
                className="w-full border p-2 border-gray-300 rounded"
            />
        </form>
    )
}

export default InfoForm;
