const STEPS = ["Personal Info", "Skills", "Experience", "Education", "Languages", "Certifications"];

type StepIndicatorProps = {
    currentStep: number;
};

function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <ol className="step-indicator flex items-center w-full mb-8 py-1 overflow-x-auto">
            {STEPS.map((label, i) => {
                const stepNumber = i + 1;
                const isComplete = currentStep > stepNumber;
                const isActive = currentStep === stepNumber;

                return (
                    <li key={label} className={`flex items-center ${stepNumber !== STEPS.length ? "flex-1" : ""}`}>
                        <div className="flex items-center gap-2 shrink-0 m-0.5">
                            <span
                                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0
                                ${isComplete ? "bg-blue-600 text-white" : isActive ? "bg-blue-100 text-blue-700 ring-2 ring-blue-600" : "bg-gray-100 text-gray-400"}`}
                            >
                                {isComplete ? "✓" : stepNumber}
                            </span>
                            <span className={`hidden sm:inline text-sm font-medium whitespace-nowrap ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                                {label}
                            </span>
                        </div>
                        {stepNumber !== STEPS.length && (
                            <div className={`flex-1 h-px mx-3 min-w-4 ${isComplete ? "bg-blue-600" : "bg-gray-200"}`}/>
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

export default StepIndicator;
