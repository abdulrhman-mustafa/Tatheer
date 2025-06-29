import React from "react";
import { ClipLoader } from "react-spinners";

interface ButtonProps {children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "outline" | "ghost" | "link";
    size?: "small" | "medium" | "large";
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className,
    variant = "primary",
    size = "medium", 
    loading = false,
}) => {

const variantClasses = {
    primary: "bg-primary text-white hover:bg-phover", // Phover هو اللون الفاتح من primary
    outline: "bg-transparent text-secondary border border-primary hover:bg-primary hover:text-white", // شفاف، نص primary، إطار primary
    ghost: `bg-input text-primary`,
    link: "bg-transparent text-place hover:underline p-0",
};
const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-5 py-3 text-base", // الحجم اللي كان موجود عندك
    large: "px-6 py-4 text-lg",
};
const classes = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    rounded-sm
    transition-all
    duration-200
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className || ''}
`;
return (
    <button onClick={onClick} type={type} disabled={disabled || loading} className={`${classes} flex items-center justify-center gap-2`}>
        {children}
        {loading && <ClipLoader size={20} color={variant === 'primary' ? '#fff' : '#000'} />}
    </button>
);
};

export default Button;
