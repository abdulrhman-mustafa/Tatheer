// src/_Components/auth/ContactInputField.tsx

"use client";

import React from "react";
import Input from "@/_Components/ui/Input";
import CustomPhoneInput from "@/_Components/ui/CustomPhoneInput";

interface ContactInputFieldProps {
  contactInfoValue: string;
  setContactInfoValue: (value: string) => void;
  isPhoneNumberInput: boolean;
  setIsPhoneNumberInput: (value: boolean) => void;
  setErrorMessage: (message: string) => void;
  handlePhoneInputValidate: (isValid: boolean | undefined, fullNumber: string) => void;
  errorMessage: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInputField: React.FC<ContactInputFieldProps> = ({
  contactInfoValue,
  setContactInfoValue,
  isPhoneNumberInput,
  handlePhoneInputValidate,
  errorMessage,
  onInputChange,
}) => {
  const handlePhoneChange = (phone: string, phoneCode: string, isValid: boolean) => { // <--- تم توحيد التسمية
    const fullNumber = `${phoneCode}${phone}`;
    setContactInfoValue(fullNumber);
    handlePhoneInputValidate(isValid, fullNumber);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="contactInfo" className="text-[15px] block text-secondary">
        {isPhoneNumberInput
          ? "Phone Number"
          : "Email or Phone"}
      </label>
      <div>
        {isPhoneNumberInput ? (
          <CustomPhoneInput
            value={contactInfoValue}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
            inputClassName="text-secondary"
          />
        ) : (
          <Input
            id="contactInfo"
            name="contactInfo"
            type="text"
            placeholder="Enter your email or phone number"
            value={contactInfoValue}
            onChange={onInputChange}
            className="w-full px-5 py-3 rounded-sm bg-input placeholder-place border-0 focus:ring-1 focus:ring-primary/50 outline-none transition-all duration-200"
            autoFocus
          />
        )}

        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ContactInputField;
