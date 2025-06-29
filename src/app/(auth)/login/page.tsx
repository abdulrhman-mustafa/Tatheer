// src/app/(auth)/login/page.tsx

'use client'; 

import React from 'react'; 

// استيراد المكونات المقسمة
import WelcomeHeader from '@/_Components/auth/WelcomeHeader'; 
import ContactInputField from '@/_Components/auth/ContactInputField'; 

import Button from '@/_Components/ui/Button'; 
import Back from '@/_Components/auth/Back'; 

// استيراد الخطاف المخصص الجديد
import { useLoginForm } from '@/hooks/useLoginForm';

export default function LoginPage() {
  // استخدام الخطاف المخصص للحصول على جميع الحالات والدوال
  const {
    contactInfoValue,
    setContactInfoValue,
    isPhoneNumberInput,
    setIsPhoneNumberInput, // يمكن استخدامها إذا أردت تغييرها يدويا
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
          setErrorMessage={() => {}} // الخطاف يدير رسائل الخطأ، لذا نمرر دالة فارغة أو نلغي الحاجة إليها هنا
          handlePhoneInputValidate={handlePhoneInputValidate}
          errorMessage={errorMessage}
          onInputChange={handleInputChange}
        />

        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-2 text-center">
            {errorMessage}
          </p>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full" 
          disabled={loading}
          loading={loading}
        >
          {loading ? 'Processing' : 'Continue'} 
        </Button>
      </form>
    </div>
  );
}
