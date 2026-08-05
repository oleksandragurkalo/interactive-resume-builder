import React, { useState } from "react";
import { InputField } from "../../data/resume.model.tsx";
import SelectInput from "../SelectInput/SelectInput.tsx";

const OTHER_OPTION = "Other";

type InfoInputProps = {
    info: InputField;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    fieldId?: string;
};

const InfoInput = React.memo(({info, error, onChange, fieldId}: InfoInputProps) => {
    const id = fieldId ?? info.name;

    const [isCustom, setIsCustom] = useState(
        () => Boolean(info.type === "select" && info.allowOther && info.value !== "" && !info.options.includes(info.value))
    );

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (info.type === "select" && info.allowOther && e.target.value === OTHER_OPTION) {
            setIsCustom(true);
            onChange({ target: { name: info.name, value: "" } } as React.ChangeEvent<HTMLInputElement>);
        } else {
            onChange(e);
        }
    };

    const backToList = () => {
        setIsCustom(false);
        onChange({ target: { name: info.name, value: "" } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="field-input flex flex-col gap-1">
            <label htmlFor={id} className="font-medium text-gray-700 text-sm">
                {info.label}
                {info.required && <span className="text-red-500"> *</span>}
                {error && <div><span className="text-red-500 text-xs">{error}</span></div>}
            </label>
            {info.type === "select" ? (
                isCustom ? (
                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            name={info.name}
                            id={id}
                            placeholder="Please specify"
                            value={info.value}
                            onChange={onChange}
                            autoFocus
                            className={`w-full border p-2.5 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? "border-red-500" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={backToList}
                            className="self-start text-xs text-blue-600 hover:underline"
                        >
                            Choose from list instead
                        </button>
                    </div>
                ) : (
                    <SelectInput
                        id={id}
                        name={info.name}
                        value={info.value}
                        options={info.options}
                        placeholder={info.placeholder}
                        error={error}
                        onChange={handleSelectChange}
                    />
                )
            ) : info.type === "textarea" ? (
                <textarea
                    name={info.name}
                    id={id}
                    placeholder={info.placeholder}
                    required={info.required}
                    value={info.value}
                    onChange={onChange}
                    className={`w-full border p-2.5 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? "border-red-500" : ""}`}
                    style={{height: '100px'}}
                />
            ) : (
                <input
                    type={info.type}
                    name={info.name}
                    id={id}
                    placeholder={info.placeholder}
                    required={info.required}
                    value={info.value}
                    onChange={onChange}
                    className={`w-full border p-2.5 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? "border-red-500" : ""}`}
                />
            )}
        </div>
    )
}, arePropsEqual);

function arePropsEqual(prevProps: InfoInputProps, nextProps: InfoInputProps) {
    return (
        prevProps.info.value === nextProps.info.value &&
        prevProps.info.required === nextProps.info.required &&
        prevProps.error === nextProps.error &&
        prevProps.fieldId === nextProps.fieldId
    );
}

export default InfoInput;
