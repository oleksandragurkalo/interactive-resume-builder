import './App.css'
import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm.tsx";

function App() {
    return (
        <main className="grid grid-cols-6 items-start min-h-screen text-gray-900">
            <div className="col-span-4 col-start-2">
                <header className="text-center py-6 border-b">
                    <h1 className="">Interactive Resume Builder</h1>
                    <p className="text-sm text-gray-500">Start creating your resume step-by-step</p>
                </header>

                <section className="p-6 max-w-5xl mx-auto">
                    <PersonalInfoForm/>
                </section>
            </div>
        </main>
    )
}

export default App;
