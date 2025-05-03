function EducationForm() {
    return (
        <div className="lg:max-w-lg">
            <div className="flex justify-between items-center gap-1">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    <p className="text-sm text-gray-500">Add your education details</p>
                </div>
                <button className="shrink-0 h-fit px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-color">Add Education</button>
            </div>
        </div>
    )
};

export default EducationForm
