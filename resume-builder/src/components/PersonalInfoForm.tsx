import { useEffect, useState } from "react";

export type PersonalInfo = {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
};

const LOCAL_STORAGE_KEY = "resume-personal-info";

export default function PersonalInfoForm() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <form className="space-y-4">
                    <input className="w-full border p-2 rounded" name="fullName" placeholder="Full Name"
                           value={info.fullName} onChange={handleChange}/>
                    <input className="w-full border p-2 rounded" name="jobTitle" placeholder="Job Title"
                           value={info.jobTitle} onChange={handleChange}/>
                    <input className="w-full border p-2 rounded" name="email" placeholder="Email" value={info.email}
                           onChange={handleChange}/>
                    <input className="w-full border p-2 rounded" name="phone" placeholder="Phone" value={info.phone}
                           onChange={handleChange}/>
                    <input className="w-full border p-2 rounded" name="location" placeholder="Location"
                           value={info.location} onChange={handleChange}/>
                    <textarea className="w-full border p-2 rounded" name="summary" placeholder="Professional Summary"
                              value={info.summary} onChange={handleChange} rows={4}/>
                </form>
            </div>

            {/* Live Preview */}
            <div className="bg-white shadow-md border p-6 rounded-md">
                <div className="text-center border-b pb-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">{info.fullName || "Your Name"}</h2>
                    <p className="text-lg text-gray-500">{info.jobTitle || "Your Title"}</p>
                </div>

                <div className="flex justify-center gap-4 text-sm text-gray-600 mb-2">
                    {info.email && <span>{info.email}</span>}
                    {info.phone && <span>| {info.phone}</span>}
                    {info.location && <span>| {info.location}</span>}
                </div>

                {info.summary && (
                    <div className="mt-4">
                        <h3 className="text-md font-semibold text-gray-700 mb-1">Professional Summary</h3>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{info.summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
