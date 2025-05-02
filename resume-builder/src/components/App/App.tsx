import './App.css'
import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm.tsx";

function App() {
    return (
        <main className="grid grid-cols-6 items-start min-h-screen text-gray-900">
            <div className="col-span-4 col-start-2">
                <header className="text-center py-6 border-b">
                    <h1 className="text-3xl font-bold text-blue-700">Interactive Resume Builder</h1>
                    <p className="text-sm text-gray-500">Start creating your resume step-by-step</p>
                </header>
                <div
                    className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-12 lg:overflow-visible lg:px-0">
                    <PersonalInfoForm/>
                </div>
            </div>
        </main>
    )
}

export default App;
