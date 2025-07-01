// src/app/(auth)/login/page.tsx

'use client'; 

import React from 'react'; 

import WelcomeHeader from '@/_Components/auth/WelcomeHeader'; 
import ContactInputField from '@/_Components/auth/ContactInputField'; 

import Button from '@/_Components/ui/Button'; 
import Back from '@/_Components/auth/Back'; 

import { useLoginForm } from '@/hooks/useLoginForm';

export default function LoginPage() {
  const {
    contactInfoValue,
    setContactInfoValue,
    isPhoneNumberInput,
    setIsPhoneNumberInput,
    errorMessage,
    loading,
    handleInputChange,
    handlePhoneInputValidate,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="flex flex-col items-center justify-center space-y-16 p-4">
      <Back />
      <WelcomeHeader />

      <form onSubmit={handleSubmit} className="w-full px-4 space-y-4 max-w-md">
        <ContactInputField 
          contactInfoValue={contactInfoValue}
          setContactInfoValue={setContactInfoValue}
          isPhoneNumberInput={isPhoneNumberInput}
          setIsPhoneNumberInput={setIsPhoneNumberInput}
          setErrorMessage={() => {}}
          handlePhoneInputValidate={handlePhoneInputValidate}
          errorMessage={errorMessage}
          onInputChange={handleInputChange}
        />

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full" 
          disabled={loading}
          loading={loading}
        >
          {loading ? 'continue' : 'Send Verification'} 
        </Button>
      </form>
    </div>
  );
}
