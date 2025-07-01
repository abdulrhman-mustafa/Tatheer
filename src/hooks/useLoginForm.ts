// src/hooks/useLoginForm.ts

"use client";
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers, User } from '@/data/mockData';

interface UseLoginFormReturn {
  contactInfoValue: string;
  setContactInfoValue: (value: string) => void;
  isPhoneNumberInput: boolean; // هذا سيتحكم في عرض CustomPhoneInput
  setIsPhoneNumberInput: (value: boolean) => void;
  errorMessage: string;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneInputValidate: (isValid: boolean | undefined, fullNumber: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();

  const [contactInfoValue, setContactInfoValue] = useState<string>('');
  const [isPhoneNumberInput, setIsPhoneNumberInput] = useState<boolean>(false); // يبدأ بـ false
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState<string>('');

  // دالة handleInputChange لتحديد نوع الإدخال بناءً على المنطق الجديد
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactInfoValue(value);
    setErrorMessage('');

    // المنطق الجديد للتحول الديناميكي:
    // 1. الأولوية القصوى: إذا كان الإدخال فارغًا تمامًا أو يحتوي على '@'، فهو ليس رقم هاتف (يعود للايميل).
    if (value.trim().length === 0 || value.includes('@')) {
      setIsPhoneNumberInput(false);
    }
    // 2. إذا كان الإدخال يبدأ بـ '+' متبوعًا بأرقام (على الأقل رقم واحد)،
    //    أو يتكون من أرقام فقط (على الأقل 3 أرقام).
    //    هذا يمنع التحول الفوري عند كتابة رقم واحد فقط.
    else if (/^\+\d+$/.test(value) || /^\d{3,}$/.test(value)) {
      setIsPhoneNumberInput(true);
    }
    // 3. في أي حالة أخرى (يحتوي على أحرف أبجدية بدون '@' أو رموز أخرى)، فهو ليس رقم هاتف.
    else {
      setIsPhoneNumberInput(false);
    }
  }, []);

  const handlePhoneInputValidate = useCallback((isValid: boolean | undefined, fullNumber: string) => {
    setIsPhoneValid(isValid === undefined ? false : isValid);
    setFullPhoneNumber(fullNumber);
  }, []);

  const validateForm = useCallback((): string => {
    const valueTrimmed = contactInfoValue.trim();

    if (!valueTrimmed) {
      return 'Input cannot be empty.';
    }

    if (isPhoneNumberInput) {
      // إذا كان isPhoneNumberInput صحيحًا (أي CustomPhoneInput معروض)، تحقق من صحة رقم الهاتف
      if (!isPhoneValid) {
        return 'Please enter a valid phone number.';
      }
    } else {
      // إذا كان isPhoneNumberInput خاطئًا (أي Input العادي معروض)، تحقق من صحة البريد الإلكتروني
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valueTrimmed)) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }, [contactInfoValue, isPhoneNumberInput, isPhoneValid]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm(); // Validate based on current `isPhoneNumberInput` state
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    setLoading(true);

    // استخدم الحالة الحالية لـ isPhoneNumberInput لتحديد معلومات الاتصال النهائية
    const finalContactInfo = isPhoneNumberInput ? fullPhoneNumber : contactInfoValue.trim();

    const foundUser: User | undefined = mockUsers.find(
      user => {
        if (isPhoneNumberInput) {
          return user.phoneNumber === finalContactInfo;
        } else {
          return user.email?.toLowerCase() === finalContactInfo.toLowerCase();
        }
      }
    );

    if (foundUser) {
      console.log(`User ${foundUser.email || foundUser.phoneNumber} (Role: ${foundUser.role}) found. Redirecting to dashboard.`);
      setLoading(false);
      router.push(`/influencer/opportunities?role=${foundUser.role}`);
    } else {
      console.log(`User ${finalContactInfo} not found. Simulating OTP send for registration.`);
      setTimeout(() => {
        setLoading(false);
        router.push(`/verify-otp?contactInfo=${encodeURIComponent(finalContactInfo)}&isPhoneNumber=${isPhoneNumberInput}&source=login`);
      }, 1500);
    }
  }, [validateForm, contactInfoValue, isPhoneNumberInput, fullPhoneNumber, router]);

  return {
    contactInfoValue,
    setContactInfoValue,
    isPhoneNumberInput,
    setIsPhoneNumberInput,
    errorMessage,
    loading,
    handleInputChange,
    handlePhoneInputValidate,
    handleSubmit,
  };
};
