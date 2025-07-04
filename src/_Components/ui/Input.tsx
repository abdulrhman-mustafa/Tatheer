// src/_Components/ui/Input.tsx

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  error?: string | boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, type = "text", placeholder, error, className, ...rest },
    ref
  ) => {
    const baseClasses = `
      w-full
      px-5 py-3
      rounded-sm
      bg-input
      placeholder-place
      border-0
      focus:ring-1
      outline-none
      transition-all duration-200
      ${className || ""}
    `;

    const errorClasses = error
      ? "border border-red-500 focus:ring-red-500"
      : "border-secondary focus:ring-primary/50 focus:border-primary";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-secondary mb-1"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses} ${
            rest.disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""
          }`}
          ref={ref}
          {...rest}
        />
        {typeof error === "string" && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
