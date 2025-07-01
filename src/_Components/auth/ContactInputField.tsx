// src/_Components/auth/ContactInputField.tsx

"use client";

import React from 'react';
import CustomPhoneInput from '@/_Components/ui/CustomPhoneInput'; // تأكد من المسار الصحيح
import Input from '@/_Components/ui/Input'; // إذا كان لديك مكون Input عادي

interface ContactInputFieldProps {
  contactInfoValue: string;
  isPhoneNumberInput: boolean;
  // تم تغيير هذه الدوال لتتوافق مع ما يتم تمريره من الخطافات الأبوية
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // لـ Input العادي
  onPhoneInputValidate: (fullNumber: string, isValid: boolean) => void; // لـ CustomPhoneInput
  errorMessage: string;
}

const ContactInputField: React.FC<ContactInputFieldProps> = ({
  contactInfoValue,
  isPhoneNumberInput,
  onInputChange,
  onPhoneInputValidate, // <--- تم تغيير الاسم ليكون أكثر وضوحًا
  errorMessage,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
        Email or Phone Number
      </label>
      {isPhoneNumberInput ? (
        <CustomPhoneInput
          value={contactInfoValue} // تمرير القيمة الحالية من الخطاف الأب
          onChange={onPhoneInputValidate} // <--- تمرير دالة التحقق مباشرة من الخطاف الأب
          placeholder="Enter your phone number"
          className="w-full"
          inputClassName="py-2 px-3 text-base"
        />
      ) : (
        <Input // استخدام مكون Input العادي
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={contactInfoValue}
          onChange={onInputChange} // تمرير دالة التغيير العادية من الخطاف الأب
          placeholder="Enter your email or phone number"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          error={errorMessage} // تمرير رسالة الخطأ للمكون Input
        />
      )}
      {!isPhoneNumberInput && errorMessage && (
        <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default ContactInputField;
