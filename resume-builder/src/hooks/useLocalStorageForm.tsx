import { useEffect, useState } from "react";

export function useLocalStorageForm<T>(key: string, defaultValue: T) {
    const [data, setData] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);

    return [data, setData] as const;
}
