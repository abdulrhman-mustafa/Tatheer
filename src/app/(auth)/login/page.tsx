// src/app/(auth)/login/page.tsx

'use client';

import React from 'react';
import Back from '@/_Components/auth/Back';
import WelcomeHeader from '@/_Components/auth/WelcomeHeader';
import ContactInputField from '@/_Components/auth/ContactInputField';
import Button from '@/_Components/ui/Button';
import { useLoginForm } from '@/hooks/useLoginForm';

export default function LoginPage() {
  const {
    contactInfoValue,
    isPhoneNumberInput,
    errorMessage,
    loading,
    handleInputChange,
    handlePhoneInputValidate,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 text-gray-800">
      <Back />
      <WelcomeHeader />

      <div className="flex flex-col items-center justify-center w-full max-w-md mt-24 px-4">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <ContactInputField
            contactInfoValue={contactInfoValue}
            isPhoneNumberInput={isPhoneNumberInput}
            onInputChange={handleInputChange} // تمرير دالة تغيير الإدخال العادي
            onPhoneInputValidate={handlePhoneInputValidate} // <--- تمرير دالة التحقق من الهاتف
            errorMessage={errorMessage}
          />

          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-2 text-center">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full rounded-lg py-3"
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}
