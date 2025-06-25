interface ButtonProps {
    children : React.ReactNode;
    onClick?: () => void;
    type ?: "button" | "submit" | "reset";
    disabled ?: boolean
    className ?: string
}

export const Button: React.FC<ButtonProps> = ({ 
    children , onClick , type = "button", disabled = false, className
}) => {
    const baseClasses = `
    bg-primary text-white
    px-5 py-3
    rounded-sm w-full
    text-base hover:bg-phover
    transition-all
    duration-200
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className || ''}
    `;
    return (
    <button onClick={onClick} type={type} disabled={disabled} className={`${baseClasses ?? ""}`}>
        {children ?? ""}
    </button>
);
};

export default Button;
