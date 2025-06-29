interface CheckBoxProps {
    id: string;
    label: string;
    checked: boolean;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean
}

export const Checkbox: React.FC<CheckBoxProps> = ({ 
    id,
    label,
    checked,
    name,
    onChange,
    className, 
    disabled = false
}) => {
    const inputClasses = `
        w-4 h-4
        border-1 border-place
        bg-primary
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${checked ? 'accent-primary'  : ''}
        ${className || ''}
    `
    const labelClasses = `
        ml-2 text-place cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
    `;
    return(
        <div className={`flex items-center ${className || ''}`}>
            <input 
                id={id} 
                type="checkbox" 
                checked={checked} 
                name={name}
                disabled={disabled}
                onChange={onChange}
                className={inputClasses} 
            />
            <label htmlFor={id} className={labelClasses}>
                {label}
            </label>
        </div>
    );
}

export default Checkbox