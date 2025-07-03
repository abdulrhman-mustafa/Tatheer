// src/app/(auth)/register/create-account/page.tsx

'use client';

import React from 'react';
import Back from '@/_Components/auth/Back';
import WelcomeHeader from '@/_Components/auth/WelcomeHeader';
import ContactInputField from '@/_Components/auth/ContactInputField';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button';
import { useCreateAccountForm } from '@/hooks/useCreateAccountForm';


export default function CreateAccountPage() {
  const {
    formData, 
    errors,
    loading,
    handleInputChange,
    handleSecondaryPhoneInputValidate,
    handleSubmit,
  } = useCreateAccountForm();

  // Destructure individual form data fields from the formData object for easier access
  const { personalName, secondaryContactInfoValue, secondaryIsPhoneNumberInput } = formData;


  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 text-gray-800">
      <Back />
      <WelcomeHeader />

      <div className="flex flex-col items-center justify-center w-full max-w-md mt-24 px-4">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2 text-left">
            <label htmlFor="personalName" className="text-[15px] block text-secondary">
              Please Enter Personal Name
            </label>
            <Input
              id="personalName"
              name="personalName"
              type="text"
              placeholder="Please Personal Name"
              value={personalName}
              onChange={handleInputChange} 
              className="w-full py-3 px-4 rounded-sm border border-transparent focus:outline-none focus:ring-1 focus:ring-primary/50 bg-input placeholder-place text-secondary"
              autoFocus
              error={errors.personalName}
            />
          </div>

          <ContactInputField
            contactInfoValue={secondaryContactInfoValue}
            isPhoneNumberInput={secondaryIsPhoneNumberInput}
            onInputChange={handleInputChange}
            onPhoneInputValidate={handleSecondaryPhoneInputValidate}
            errorMessage={errors.secondaryContactInfo || ''}
          />

          {errors.general && (
            <p className="text-red-500 text-xs italic mt-2 text-center">
              {errors.general}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full rounded-sm py-3"
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Sending Verification' : 'Send Verification'}
          </Button>
        </form>
      </div>
    </div>
  );
}