import React, { useState } from "react";
import { InputField } from "../data/resume.model.tsx";
import { applyFieldChange } from "../utils/validation.tsx";

export function useFormList<T extends Record<string, InputField>>(defaultItem: T, initialList?: T[]) {
    const [list, setList] = useState<T[]>(() =>
        initialList && initialList.length > 0 ? initialList : [{ ...defaultItem }]
    );
    const [errorsList, setErrorsList] = useState<Record<string, string | null>[]>(() =>
        initialList && initialList.length > 0 ? initialList.map(() => ({})) : [{}]
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;
        const { fieldName, updatedField, error } = applyFieldChange(list[index], name, value);

        setList((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [fieldName]: updatedField };
            return updated;
        });

        setErrorsList((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: error };
            return updated;
        });
    };

    const addItem = () => {
        setList((prev) => [...prev, { ...defaultItem }]);
        setErrorsList((prev) => [...prev, {}]);
    };

    const removeItem = (index: number) => {
        setList((prev) => prev.filter((_, i) => i !== index));
        setErrorsList((prev) => prev.filter((_, i) => i !== index));
    };

    return {
        list,
        setList,
        errorsList,
        setErrorsList,
        handleChange,
        addItem,
        removeItem,
    };

}
