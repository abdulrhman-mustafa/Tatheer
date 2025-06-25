
interface InputProps {
    id: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    disabled?: boolean; 
    error?: string | boolean;
    className?: string;
}

// تعريف مكون Input كـ Functional Component
export const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    disabled = false,
    error,
    className,
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


    const errorClasses = error ? 'border-danger focus:ring-danger/50' : 'border-scondary focus:ring-primary/50 focus:border-primary';

    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : '';

return (
    <div className="mb-4"> {/* Container للحقل والـ label ورسالة الخطأ */}
        {label && ( 
            <label htmlFor={id} className="block text-sm font-medium text-secondary mb-1">
                {label}
            </label>
    )}
    <input
        id={id} 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
    />

    {typeof error === 'string' && (
        <p className="mt-1 text-sm text-danger">
            {error}
        </p>
    )}
    </div>
);
};

export default Input;