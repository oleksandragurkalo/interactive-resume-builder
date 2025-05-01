import PersonalInfoForm from "./components/PersonalInfoForm";

function App() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            <header className="text-center py-6 border-b">
                <h1 className="text-3xl font-bold text-blue-700">Interactive Resume Builder</h1>
                <p className="text-sm text-gray-500">Start creating your resume step-by-step</p>
            </header>

            <section className="p-6 max-w-5xl mx-auto">
                <PersonalInfoForm />
            </section>
        </main>
    );
}

export default App;
