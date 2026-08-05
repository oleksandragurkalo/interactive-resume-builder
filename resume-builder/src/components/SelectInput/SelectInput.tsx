import React, { useEffect, useRef, useState } from "react";

type SelectInputProps = {
    name: string;
    id: string;
    value: string;
    options: string[];
    placeholder?: string;
    error?: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function SelectInput({ name, id, value, options, placeholder, error, onChange }: SelectInputProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const selectOption = (option: string) => {
        onChange({ target: { name, value: option } } as React.ChangeEvent<HTMLInputElement>);
        setOpen(false);
    };

    return (
        <div className="select-input relative" ref={containerRef}>
            <button
                type="button"
                id={id}
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={`w-full flex items-center justify-between gap-2 border p-2.5 rounded-md text-sm text-left bg-white transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${error ? "border-red-500" : "border-gray-300"} ${value ? "text-gray-900" : "text-gray-400"}`}
            >
                <span className="truncate">{value || placeholder || "Select..."}</span>
                <svg
                    className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                >
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
                </svg>
            </button>
            {open && (
                <ul role="listbox" className="select-input__options absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg py-1">
                    {options.map((option) => (
                        <li
                            key={option}
                            role="option"
                            aria-selected={option === value}
                            onClick={() => selectOption(option)}
                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${option === value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"}`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SelectInput;
