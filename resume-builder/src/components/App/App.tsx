import './App.css'
import PersonalInfoForm from "../PersonalInfoForm/PersonalInfoForm.tsx";
import Header from "../Header/Header.tsx";

function App() {
    return (
        <main className="grid grid-cols-6 items-start min-h-screen text-gray-900">
            <div className="col-span-4 col-start-2">
                <Header/>
                <div
                    className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-12 lg:overflow-visible lg:px-0">
                    <PersonalInfoForm/>
                </div>
            </div>
        </main>
    )
}

export default App;
