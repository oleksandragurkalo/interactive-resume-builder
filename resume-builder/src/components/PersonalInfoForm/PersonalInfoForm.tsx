import { useEffect, useState } from "react";
import InfoForm from "../InfoForm/InfoForm.tsx";

export type PersonalInfo = {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
};

const LOCAL_STORAGE_KEY = "resume-personal-info";

function PersonalInfoForm() {
    const [info, setInfo] = useState<PersonalInfo>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return {
                    fullName: "",
                    jobTitle: "",
                    email: "",
                    phone: "",
                    location: "",
                    summary: "",
                };
            }
        } else {
            return {
                fullName: "",
                jobTitle: "",
                email: "",
                phone: "",
                location: "",
                summary: "",
            };
        }
    });

    // Load saved data when the component mounts
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setInfo(parsed);
            } catch (e) {
                console.error("Error loading personal info from localStorage", e);
            }
        }
    }, []);

    // Save to localStorage every time info changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(info));
    }, [info]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                    <div className="lg:max-w-lg">
                        <h2 className="">Personal Information</h2>
                        <InfoForm info={info} handleChange={handleChange} />
                    </div>
                </div>
            </div>
            <div
                className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <div className="col-span-2 shadow border p-6 rounded">
                    <div className="text-center border-b pb-4 mb-4">
                        <h2 className="text-3xl font-bold text-gray-800">{info.fullName || "Your Name"}</h2>
                        <p className="text-lg text-gray-500">{info.jobTitle || "Your Title"}</p>
                    </div>

                    <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-600 mb-2">
                        {info.email && <span>{info.email}</span>}
                        {info.phone && <span> | {info.phone}</span>}
                        {info.location && <span> | {info.location}</span>}
                    </div>

                    {info.summary && (
                        <div className="mt-4">
                            <h3 className="text-md font-semibold text-gray-700 mb-1">Professional Summary</h3>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{info.summary}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
