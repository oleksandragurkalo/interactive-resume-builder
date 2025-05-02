import { useLocalStorageForm } from "../../hooks/useLocalStorageForm.tsx";
import InfoForm from "../InfoForm/InfoForm.tsx";
import ResumePreview from "../ResumePreview/ResumePreview.tsx";

export type PersonalInfo = {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
};

const LOCAL_STORAGE_KEY = "resume-personal-info";

const DEFAULT_INFO: PersonalInfo = {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
};

function PersonalInfoForm() {
    const [info, setInfo] = useLocalStorageForm<PersonalInfo>(LOCAL_STORAGE_KEY, DEFAULT_INFO);

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
            <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
               <ResumePreview info={info}/>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
