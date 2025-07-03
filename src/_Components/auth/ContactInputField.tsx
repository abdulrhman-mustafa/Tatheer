'use client';

import React from 'react';
import CustomPhoneInput from '@/_Components/ui/CustomPhoneInput';
import Input from '@/_Components/ui/Input';

interface ContactInputFieldProps {
  contactInfoValue: string;
  isPhoneNumberInput: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneInputValidate: (fullNumber: string, isValid: boolean) => void;
  errorMessage: string;
}

const ContactInputField: React.FC<ContactInputFieldProps> = ({
  contactInfoValue,
  isPhoneNumberInput,
  onInputChange,
  onPhoneInputValidate,
  errorMessage,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
        Email or Phone Number
      </label>
      {isPhoneNumberInput ? (
        <CustomPhoneInput
          value={contactInfoValue}
          onChange={(value, isValid) => onPhoneInputValidate(value, isValid)}
          placeholder="Enter your phone number"
          className="w-full"
          inputClassName="py-2 px-3 text-base"
        />
      ) : (
        <Input
          type="text"
          id="contactInfo"
          // CORRECTED: Set the correct name attribute for the email input
          name="secondaryContactInfoValue"
          value={contactInfoValue}
          onChange={onInputChange}
          placeholder="Enter your email or phone number"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          error={errorMessage}
        />
      )}
      {/* You might want to display errorMessage here for CustomPhoneInput too */}
      {errorMessage && (
        <p className="text-red-500 text-xs italic mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default ContactInputField;