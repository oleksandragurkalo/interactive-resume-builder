import React from "react";
import { InputField } from "../../data/resume.model.tsx";

type InfoInputProps = {
    info: InputField;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const InfoInput = React.memo(({info, error, onChange}: InfoInputProps) => {
    console.log('InfoInput rendered', info);
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={info.name} className="font-medium text-gray-700 text-6xl py-10">
                {info.label}
                {info.required && <span className="text-red-500"> *</span>}
                {error && <div><span className="text-red-500">{error}</span></div>}
            </label>
            {info.type === "textarea" ? (
                <textarea
                    name={info.name}
                    id={info.name}
                    placeholder={info.placeholder}
                    required={info.required}
                    value={info.value}
                    onChange={onChange}
                    className={`w-full border p-10 border-gray-300 rounded text-6xl ${error ? "border-red-500" : ""}`}
                    style={{height: '150px'}}
                />
            ) : (
                <input
                    type={info.type}
                    name={info.name}
                    id={info.name}
                    placeholder={info.placeholder}
                    required={info.required}
                    value={info.value}
                    onChange={onChange}
                    className={`w-full border p-10 border-gray-300 rounded text-6xl ${error ? "border-red-500" : ""}`}
                />
            )}
        </div>
    )
}, arePropsEqual);

function arePropsEqual(prevProps: InfoInputProps, nextProps: InfoInputProps) {
    return (
        prevProps.info.value === nextProps.info.value &&
        prevProps.error === nextProps.error
    );
}

export default InfoInput;
