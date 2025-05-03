import { PersonalInfoField } from "../../data/resume.model.tsx";

type InfoInputProps = {
    info: PersonalInfoField;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InfoInput( { info, onChange }: InfoInputProps) {
    console.log('InfoInput rendered', info);
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={info.name} className="font-medium text-sm text-gray-700">
                {info.label}
            </label>
            <input
                type={info.type}
                name={info.name}
                id={info.name}
                placeholder={info.placeholder}
                required={info.required}
                value={info.value}
                onChange={onChange}
                className="w-full border p-2 border-gray-300 rounded"
            />
        </div>
    )
}

export default InfoInput;
