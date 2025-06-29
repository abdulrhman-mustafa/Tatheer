// src/app/(auth)/register/create-account/page.tsx

'use client';

import React from 'react';

import Back from '@/_Components/auth/Back';
import WelcomeHeader from '@/_Components/auth/WelcomeHeader';
import ContactInputField from '@/_Components/auth/ContactInputField';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button';

// استيراد الخطاف المخصص الجديد
import { useCreateAccountForm } from '@/hooks/useCreateAccountForm';

export default function CreateAccountPage() {
  // استخدام الخطاف المخصص للحصول على جميع الحالات والدوال
  const {
    personalName,
    setPersonalName,
    secondaryContactInfoValue,
    setSecondaryContactInfoValue,
    secondaryIsPhoneNumberInput,
    setIsPhoneNumberInput, // يمكنك استخدامها إذا أردت تغييرها يدويا
    errorMessage,
    loading,
    handleSecondaryInputChange,
    handleSecondaryPhoneInputValidate,
    handleSubmit,
    initialContactInfo,
    initialIsPhoneNumber,
  } = useCreateAccountForm();

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 text-gray-800">
      <Back />
      <WelcomeHeader />

      <div className="flex flex-col items-center justify-center w-full max-w-md mt-24 px-4">

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* حقل الاسم الشخصي */}
          <div className="space-y-2 text-left">
            <label htmlFor="personalName" className="text-[15px] block">
              Please Enter Personal Name
            </label>
            <Input
              id="personalName"
              name="personalName"
              type="text"
              placeholder="Please Personal Name"
              value={personalName}
              onChange={(e) => { setPersonalName(e.target.value); }} // لا نحتاج لمسح الخطأ هنا، الخطاف سيتولى ذلك
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-light bg-gray-100"
              autoFocus 
            />
          </div>

          {/* حقل معلومات الاتصال الثانوية (التي يديرها الخطاف الآن) */}
          <ContactInputField
            contactInfoValue={secondaryContactInfoValue}
            setContactInfoValue={setSecondaryContactInfoValue}
            isPhoneNumberInput={secondaryIsPhoneNumberInput} 
            setIsPhoneNumberInput={setIsPhoneNumberInput} // هذه الدالة يمكن أن تستخدم لتغيير نوع الإدخال يدويا إذا لزم الأمر
            setErrorMessage={() => {}} // الخطاف يدير رسائل الخطأ، لذا نمرر دالة فارغة أو نلغي الحاجة إليها هنا
            handlePhoneInputValidate={handleSecondaryPhoneInputValidate}
            errorMessage={errorMessage}
            onInputChange={handleSecondaryInputChange} 
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
            {loading ? 'Sending Verification' : 'Send Verification'}
          </Button>
        </form>
      </div>
    </div>
  );
}
