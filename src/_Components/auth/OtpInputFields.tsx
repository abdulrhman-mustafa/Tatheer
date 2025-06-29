// src/components/auth/OtpInputFields.tsx

import React, { useRef } from 'react';
import { Input } from '@/_Components/ui/Input'; // تأكد من المسار الصحيح لمكون Input

interface OtpInputFieldsProps {
  otpDigits: string[];
  setOtpDigits: (digits: string[]) => void;
  setErrorMessage: (message: string) => void;
}

const OtpInputFields: React.FC<OtpInputFieldsProps> = ({ otpDigits, setOtpDigits, setErrorMessage }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleOtpDigitChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value) || value.length > 1) return; // السماح برقم واحد فقط

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    setErrorMessage(""); // مسح رسالة الخطأ عند أي تغيير

    // نقل التركيز (focus) إلى حقل الإدخال التالي
    if (value && index < otpDigits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // عند الضغط على Backspace وحقل الإدخال الحالي فارغ، انقل التركيز إلى الحقل السابق
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-3 mb-6">
      {otpDigits.map((digit, index) => (
        <Input
          key={index}
          // ربط الـ ref الخاص بكل حقل إدخال
          ref={(el: HTMLInputElement) => {
            if (el) inputRefs.current[index] = el;
          }}
          type="tel" // استخدام 'tel' لإظهار لوحة المفاتيح الرقمية على الهواتف
          maxLength={1} // السماح بإدخال رقم واحد فقط
          value={digit}
          onChange={(e) => handleOtpDigitChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          // Tailwind CSS classes for styling
          className="w-12 h-12 bg-gray-100 text-center rounded-lg text-2xl font-bold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light"
          inputMode="numeric" // تلميح للمتصفحات لإظهار لوحة المفاتيح الرقمية
          autoComplete={index === 0 ? "one-time-code" : "off"} // لخاصية التعبئة التلقائية لأكواد OTP
        />
      ))}
    </div>
  );
};

export default OtpInputFields;
