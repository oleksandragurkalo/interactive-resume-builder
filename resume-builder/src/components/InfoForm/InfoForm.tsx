import InfoInput from "../InfoInput/InfoInput.tsx";
import { PersonalInfo } from "../../data/resume.model.tsx";

type InfoFormProps = {
    info: PersonalInfo;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function InfoForm ({ info, handleChange }: InfoFormProps) {
    console.log('InfoForm rendered', info);
    return (
        <form className="space-y-4">
            {Object.values(info).map((field) => (
                <InfoInput key={field.name} info={field} onChange={handleChange} />
            ))}
        </form>
    )
}

export default InfoForm;
