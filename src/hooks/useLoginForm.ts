// src/hooks/useLoginForm.ts

"use client";
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers, User } from '@/data/mockData';

interface UseLoginFormReturn {
  contactInfoValue: string;
  setContactInfoValue: (value: string) => void;
  isPhoneNumberInput: boolean;
  setIsPhoneNumberInput: (value: boolean) => void;
  errorMessage: string;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // تم تعديل توقيع الدالة لاستقبال رقم الهاتف الكامل
  handlePhoneInputValidate: (fullNumber: string, isValid: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();

  const [contactInfoValue, setContactInfoValue] = useState<string>('');
  const [isPhoneNumberInput, setIsPhoneNumberInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState<string>(''); // هذا سيحتوي على الرقم الكامل الآن

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactInfoValue(value);
    setErrorMessage('');

    // تحديد ما إذا كان المدخل رقم هاتف بناءً على البادئة أو التنسيق
    if (value.trim().length === 0 || value.includes('@')) {
      setIsPhoneNumberInput(false);
    } else if (/^\+\d+$/.test(value) || /^\d{3,}$/.test(value)) {
      setIsPhoneNumberInput(true);
    } else {
      setIsPhoneNumberInput(false);
    }
  }, []);

  // تم تعديل توقيع الدالة لاستقبال رقم الهاتف الكامل
  const handlePhoneInputValidate = useCallback((fullNumber: string, isValid: boolean) => {
    setIsPhoneValid(isValid);
    setFullPhoneNumber(fullNumber); // تخزين الرقم الكامل هنا
  }, []);

  const validateForm = useCallback((): string => {
    const valueTrimmed = contactInfoValue.trim();

    if (!valueTrimmed) {
      return 'Input cannot be empty.';
    }

    if (isPhoneNumberInput) {
      if (!isPhoneValid) {
        return 'Please enter a valid phone number.';
      }
      // يمكن هنا إضافة تحقق إضافي على fullPhoneNumber إذا لزم الأمر
      // على سبيل المثال، التأكد من أن طول fullPhoneNumber يتوافق مع التنسيق المتوقع
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valueTrimmed)) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }, [contactInfoValue, isPhoneNumberInput, isPhoneValid]); // fullPhoneNumber لم يعد مطلوبًا في التبعيات هنا لأنه يتم استخدامه مباشرة في handleSubmit

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    setLoading(true);

    // استخدام الرقم الكامل المخزن في fullPhoneNumber
    const finalContactInfo = isPhoneNumberInput ? fullPhoneNumber : contactInfoValue.trim();

    // البحث عن المستخدم في البيانات الوهمية
    const foundUser: User | undefined = mockUsers.find(
      user => {
        if (isPhoneNumberInput) {
          // تأكد من أن تنسيق رقم الهاتف في mockUsers يطابق finalContactInfo (مع رمز الاتصال)
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
