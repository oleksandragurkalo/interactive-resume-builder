type InfoInputProps = {
    name: string,
    placeholder: string
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InfoInput( { name, placeholder, value, onChange }: InfoInputProps) {
    return (
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border p-2 border-gray-300 rounded"
        />
    )
}

export default InfoInput;
