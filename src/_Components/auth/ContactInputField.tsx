// src/components/auth/ContactInputField.tsx

import React from 'react';
import Input from '@/_Components/ui/Input';
import CustomPhoneInput from '@/_Components/ui/CustomPhoneInput';

// تعريف الـ Props لهذا المكون
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
  setIsPhoneNumberInput, 
  setErrorMessage,
  handlePhoneInputValidate,
  errorMessage,
  onInputChange 
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="contactInfo" className="text-[15px] block">
        {isPhoneNumberInput ? "Please Enter Mobile Number" : "Please Enter Email Address or Mobile Number"}
      </label>
      <div className="relative w-full">
        {isPhoneNumberInput ? (
          <CustomPhoneInput
            value={contactInfoValue}
            onChange={(phone: string, data: any) => { 
              setContactInfoValue(phone);
              handlePhoneInputValidate(data.isValid, phone);
            }}
            id="contactInfo"
            name="contactInfo"
            placeholder="Enter your phone number" // هذا الـ placeholder لرقم الهاتف
            inputStyle={{
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#f4f4f4',
                border: '1px solid #d1d5db',
                height: '50px',
                paddingLeft: '60px',
                fontSize: '16px',
                fontWeight: 500,
                color: '#000',
            }}
            buttonStyle={{
                backgroundColor: 'transparent',
                border: 'none',
                paddingLeft: '15px',
            }}
            containerStyle={{
                width: '100%',
                boxShadow: 'none',
                outline: 'none',
            }}
            dropdownStyle={{
                borderRadius: '10px',
                fontSize: '14px',
            }}
            enableSearch
            disableCountryGuess
            disableSearchIcon
            countryCodeEditable={false}
            onlyCountries={['ps', 'eg', 'sa', 'ae', 'us', 'gb', 'kw', 'qa', 'bh', 'om', 'jo', 'sy', 'lb', 'tr']}
          />
        ) : (
          <Input
            id="contactInfo"
            name="contactInfo"
            type="text"
            // تم تغيير الـ placeholder هنا ليعكس "email or phone number"
            placeholder="Enter your email or phone number" 
            value={contactInfoValue}
            onChange={onInputChange} 
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-light bg-gray-100"
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
