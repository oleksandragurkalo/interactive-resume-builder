type ContinueButtonProps = {
    disabled: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ContinueButton({ disabled, onClick }: ContinueButtonProps) {
    return (
        <div className="flex justify-end">
            <button
                type="submit"
                disabled={disabled}
                onClick={onClick}
                className={`px-5 py-2 rounded-md font-medium transition-colors
          ${disabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
                Continue
            </button>
        </div>
    );
}

export default ContinueButton;
