// src/hooks/useLoginForm.ts

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers, User } from '@/data/mockData'; // استيراد بيانات المستخدمين الوهمية

interface UseLoginFormReturn {
  contactInfoValue: string;
  setContactInfoValue: (value: string) => void;
  isPhoneNumberInput: boolean;
  setIsPhoneNumberInput: (value: boolean) => void; // يمكن استخدامه لتغيير النوع يدويا إذا لزم الأمر
  errorMessage: string;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneInputValidate: (isValid: boolean | undefined, fullNumber: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

// الخطاف المخصص لإدارة منطق نموذج تسجيل الدخول
export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();

  // حالات النموذج
  const [contactInfoValue, setContactInfoValue] = useState<string>('');
  const [isPhoneNumberInput, setIsPhoneNumberInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // حالات CustomPhoneInput
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState<string>('');

  // دالة handleInputChange لتحديد نوع الإدخال
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactInfoValue(value);
    setErrorMessage('');

    if (value.includes('@')) {
      setIsPhoneNumberInput(false);
    } else if (value.trim().length === 0) {
      setIsPhoneNumberInput(false);
    } else if (/^[a-zA-Z]/.test(value)) {
      setIsPhoneNumberInput(false);
    } else {
      setIsPhoneNumberInput(true);
    }
  }, []); // لا توجد تبعيات داخلية

  const handlePhoneInputValidate = useCallback((isValid: boolean | undefined, fullNumber: string) => {
    setIsPhoneValid(isValid === undefined ? true : isValid);
    setFullPhoneNumber(fullNumber);
  }, []); // لا توجد تبعيات داخلية

  // دالة التحقق من صحة النموذج
  const validateForm = useCallback((): string => {
    const valueToValidate = isPhoneNumberInput ? fullPhoneNumber : contactInfoValue.trim();

    if (!valueToValidate) {
      return 'Input cannot be empty.';
    }

    if (isPhoneNumberInput) {
      if (!isPhoneValid) {
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
  }, [contactInfoValue, isPhoneNumberInput, isPhoneValid, fullPhoneNumber]);

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

    const finalContactInfo = isPhoneNumberInput ? fullPhoneNumber : contactInfoValue.trim();

    // التحقق مما إذا كان المستخدم مسجلًا بالفعل باستخدام mockUsers
    const foundUser: User | undefined = mockUsers.find(
      user => {
        if (isPhoneNumberInput) {
          return user.phoneNumber === finalContactInfo;
        } else {
          return user.email.toLowerCase() === finalContactInfo.toLowerCase();
        }
      }
    );

    if (foundUser) {
      console.log(`User ${foundUser.email || foundUser.phoneNumber} (Role: ${foundUser.role}) found. Redirecting to dashboard.`);
      setLoading(false);
      router.push(`/dashboard?role=${foundUser.role}`);
    } else {
      console.log(`User ${finalContactInfo} not found. Simulating OTP send for registration.`);
      setTimeout(() => {
        setLoading(false);
        // توجيه المستخدمين الجدد إلى صفحة التحقق من الـ OTP، مع تحديد المصدر كـ 'login'
        router.push(`/verify-otp?contactInfo=${encodeURIComponent(finalContactInfo)}&isPhoneNumber=${isPhoneNumberInput}&source=login`);
      }, 1500);
    }
  }, [validateForm, contactInfoValue, isPhoneNumberInput, fullPhoneNumber, router]);

  // نُرجع جميع الحالات والدوال التي سيحتاجها المكون
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
