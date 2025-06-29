import Image from "next/image";
export type DropdownOption = {
    value: string;
    label: string;
};
interface DropDownProps {
    id: string;
    label: string;
    placeholder?: string;
    name: string;
    disabled?: boolean;
    className?: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: DropdownOption[];
    error?: string;
}
export const DropDown : React.FC<DropDownProps> = ({ 
    id,
    label,
    options,
    placeholder,
    error,
    disabled = false,
    className,
    value,
    onChange, 
}) => {
    const baseClasses = `
    w-full
    px-5 py-3
    rounded-sm
    bg-input
    text-three
    placeholder-place
    border-0
    focus:ring-1
    outline-none
    transition-all duration-200
    ${className || ''}
    
`;
const errorClasses = error ? 'border-danger focus:ring-danger/50' : 'focus:ring-primary/50 focus:border-primary';
const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : '';
    return(
        <div>
            {label && (
                <label htmlFor={id} className="block text-secondary mb-4">
                    {label}
                </label>
            )}
            <div className="relative">
                <select 
                    id={id} 
                    value={value}  
                    onChange={onChange} 
                    className={`appearance-none ${baseClasses ?? ""} ${disabledClasses} ${errorClasses}`} 
                >
                    {placeholder && (
                        <option value='' disabled hidden>
                            {placeholder}
                        </option>
                    )}
                    {options?.map((option) => (
                        <option  className="space-y-2" key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-place">
                        <Image 
                            src="/arrow-select.png" 
                            alt="Arrow Select" 
                            width={22} 
                            height={22} 
                        />
                    </div>
            </div>
                {error && (
                    <p className="mt-1 text-sm text-danger">
                        {error}
                    </p>
                )}
        </div>
    )
}
export default DropDown