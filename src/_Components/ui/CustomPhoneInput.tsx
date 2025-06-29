'use client';

import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string, data: any) => void;
  onValidate?: (isValid: boolean, fullNumber: string, isEmptyOrCountryCode: boolean) => void;
  id: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string | boolean;
  [key: string]: any;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  onValidate,
  id,
  label,
  placeholder,
  disabled = false,
  error,
  ...props
}) => {

  const handlePhoneInputChange = (phone: string, countryData: any) => {
    const countryCode = `+${countryData.dialCode}`;
    const isEmptyOrCountryCode = !phone || phone === countryCode || phone.trim() === '';

    console.log('PhoneInput Change:', {
      phone,
      countryCode,
      isValid: countryData.isValid,
      isEmptyOrCountryCode,
    });

    onChange(phone, countryData);

    if (onValidate) {
      onValidate(countryData.isValid && !isEmptyOrCountryCode, phone, isEmptyOrCountryCode);
    }
  };


  const inputStyleBase = {
          width: '100%',
          padding: '0.75rem 1.25rem 0.75rem 60px',
          borderRadius: '12px',
          backgroundColor: '#F5F5F5', 
          color: '#28303F', 
          height:'50px',
          outline: 'none', 
          transition: 'all 200ms', 
          fontSize: '1rem', 
          fontWeight: '500',
          ...(error ? {
            border: '0.25px solid red',
            boxShadow: '0 0 0 1px red', 
          } : {
            border: '1px solid #5500FF', 
          }),
          ...(disabled ? {
            backgroundColor: '#F5F5F5', 
            cursor: 'not-allowed', 
            opacity: '0.7',
          } : {}),
};

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-secondary mb-1">
          {label}
        </label>
      )}
      <PhoneInput
        country={'ps'}
        value={value}
        onChange={handlePhoneInputChange}
        disabled={disabled}
        inputProps={{
          id,
          name: id,
          placeholder,
        }}
        inputStyle={inputStyleBase}
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
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        enableSearch
        disableCountryGuess
        disableSearchIcon
        countryCodeEditable={false}
        onlyCountries={['ps', 'eg', 'sa', 'ae', 'us', 'gb', 'kw', 'qa', 'bh', 'om', 'jo', 'sy', 'lb', 'tr']}
        {...props}
      />
      {typeof error === 'string' && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput;