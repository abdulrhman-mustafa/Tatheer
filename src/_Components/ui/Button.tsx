// src/_Components/ui/Button.tsx

import React from "react";
import { ClipLoader } from "react-spinners";
import { twMerge } from "tailwind-merge"; 

interface ButtonProps {
  children: React.ReactNode;

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
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
    primary: "bg-primary rounded-sm text-white hover:bg-phover", 
    outline: "bg-transparent text-secondary rounded-sm border border-secondary",
    ghost: `bg-input text-primary rounded-sm`,
    link: "bg-transparent text-place hover:underline p-0",
  };
  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-5 py-3 text-base", 
    large: "px-6 py-4 text-lg",
  };

  const mergedClasses = twMerge(
    variantClasses[variant],
    sizeClasses[size],
    "rounded-sm",
    "transition-all",
    "duration-200",
    disabled || loading ? 'opacity-60 cursor-not-allowed' : '',
    className 
  );

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`${mergedClasses} flex items-center justify-center gap-2`}
    >
      {children}
      {loading && <ClipLoader size={20} color={variant === 'primary' ? '#fff' : '#000'} />}
    </button>
  );
};

export default Button;
