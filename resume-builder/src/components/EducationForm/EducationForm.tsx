function EducationForm() {
    return (
        <div className="w-full border-t py-4">
            <div className="flex justify-between items-center gap-1">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    <p className="text-sm text-gray-500">Add your education details</p>
                </div>
                <button className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">Add Education</button>
            </div>
        </div>
    )
};

export default EducationForm
