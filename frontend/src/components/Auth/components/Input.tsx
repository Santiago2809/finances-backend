
function Input({ label, placeholder, type, extraClasses, children, value, error, onChange }: { label: string, placeholder: string, type?: string, extraClasses?: string, children?: React.ReactNode, value?: string, error?: string, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) {


    return (
        <div className="w-full">
            <label htmlFor={label} className="text-base">{label.charAt(0).toUpperCase() + label.slice(1)}</label>
            <div className="relative w-full">

                {children}
                <input
                    id={label.replace("*", "").replace(" ", "-")}
                    name={label.replace("*", "").replace(" ", "-")}
                    value={value}
                    onChange={onChange}
                    type={type || "text"}
                    placeholder={placeholder}
                    className={`p-4 pl-8 w-full border-b text-sm border-gray-500 bg-transparent focus:outline-none ${extraClasses}`}
                    autoComplete="off"
                />
            </div>
            {error &&
                <p className="text-xs text-red-400 mt-1 animate__animated animate__fadeInUp animate__faster">{error}</p>
            }
        </div>
    );
};

export default Input;