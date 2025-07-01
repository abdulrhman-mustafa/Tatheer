"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseCreateAccountFormReturn {
  personalName: string;
  setPersonalName: (name: string) => void;
  secondaryContactInfoValue: string;
  setSecondaryContactInfoValue: (value: string) => void;
  secondaryIsPhoneNumberInput: boolean;
  setIsPhoneNumberInput: (value: boolean) => void; // هذا هو الاسم الذي يتوقعه المكون
  errorMessage: string;
  loading: boolean;
  handleSecondaryInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecondaryPhoneInputValidate: (isValid: boolean | undefined, fullNumber: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  initialContactInfo: string;
  initialIsPhoneNumber: boolean;
}

// الخطاف المخصص لإدارة منطق نموذج إنشاء الحساب
export const useCreateAccountForm = (): UseCreateAccountFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // الحصول على معلومات الاتصال التي تم التحقق منها أولاً من الـ query parameters
  const initialContactInfo = searchParams.get("contactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("isPhoneNumber") === "true";

  // حالات النموذج
  const [personalName, setPersonalName] = useState<string>('');
  const [secondaryContactInfoValue, setSecondaryContactInfoValue] = useState<string>('');
  const [secondaryIsPhoneNumberInput, setSecondaryIsPhoneNumberInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // حالات CustomPhoneInput
  const [secondaryPhoneValid, setSecondaryPhoneValid] = useState<boolean>(false);
  const [fullSecondaryPhoneNumber, setFullSecondaryPhoneNumber] = useState<string>('');

  // useEffect لتحديد نوع حقل الإدخال الثانوي عند تحميل المكون
  useEffect(() => {
    setSecondaryIsPhoneNumberInput(!initialIsPhoneNumber);
    setSecondaryContactInfoValue(''); 
  }, [initialIsPhoneNumber]);

  // دالة handleInputChange لتحديد نوع الإدخال الثانوي
  const handleSecondaryInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecondaryContactInfoValue(value);
    setErrorMessage('');

    if (value.includes('@')) {
      setSecondaryIsPhoneNumberInput(false);
    } else if (value.trim().length === 0) {
      setSecondaryIsPhoneNumberInput(!initialIsPhoneNumber); 
    } else if (/^[a-zA-Z]/.test(value)) {
      setSecondaryIsPhoneNumberInput(false);
    } else {
      setSecondaryIsPhoneNumberInput(true);
    }
  }, [initialIsPhoneNumber]);

  const handleSecondaryPhoneInputValidate = useCallback((isValid: boolean | undefined, fullNumber: string) => {
    setSecondaryPhoneValid(isValid === undefined ? true : isValid);
    setFullSecondaryPhoneNumber(fullNumber);
  }, []);

  // دالة التحقق من صحة النموذج
  const validateForm = useCallback((): string => {
    if (personalName.trim().length < 2) {
      return 'Please enter a valid personal name (at least 2 characters).';
    }

    const valueToValidate = secondaryIsPhoneNumberInput ? fullSecondaryPhoneNumber : secondaryContactInfoValue.trim();

    if (!valueToValidate) {
      return 'Please enter the required contact information.';
    }

    if (secondaryIsPhoneNumberInput) {
      if (!secondaryPhoneValid) {
        return 'Please enter a valid phone number.';
      }
      if (valueToValidate.length < 8) {
        return 'Phone number is too short.';
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valueToValidate)) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }, [personalName, secondaryContactInfoValue, secondaryIsPhoneNumberInput, secondaryPhoneValid, fullSecondaryPhoneNumber]);

  // دالة معالجة إرسال النموذج
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    setLoading(true);

    const finalSecondaryContact = secondaryIsPhoneNumberInput ? fullSecondaryPhoneNumber : secondaryContactInfoValue.trim();

    console.log(`Simulating verification for secondary contact: ${finalSecondaryContact} (Is Phone: ${secondaryIsPhoneNumberInput})`);
    
    setTimeout(() => {
      setLoading(false);
      router.push(
        `/verify-otp?contactInfo=${encodeURIComponent(finalSecondaryContact)}` +
        `&isPhoneNumber=${secondaryIsPhoneNumberInput}` +
        `&source=create-account` +
        `&personalName=${encodeURIComponent(personalName)}` +
        `&initialContactInfo=${encodeURIComponent(initialContactInfo)}` +
        `&initialIsPhoneNumber=${initialIsPhoneNumber}`
      );
    }, 1500);
  }, [validateForm, personalName, secondaryContactInfoValue, secondaryIsPhoneNumberInput, fullSecondaryPhoneNumber, initialContactInfo, initialIsPhoneNumber, router]);

  // نُرجع جميع الحالات والدوال التي سيحتاجها المكون
  return {
    personalName,
    setPersonalName,
    secondaryContactInfoValue,
    setSecondaryContactInfoValue,
    secondaryIsPhoneNumberInput,
    setIsPhoneNumberInput: setSecondaryIsPhoneNumberInput, // <-- تم تصحيح الخطأ هنا
    errorMessage,
    loading,
    handleSecondaryInputChange,
    handleSecondaryPhoneInputValidate,
    handleSubmit,
    initialContactInfo,
    initialIsPhoneNumber,
  };
};
