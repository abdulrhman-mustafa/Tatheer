'use client';

import { useState, useCallback,  } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers} from '@/data/mockData';
import { User } from '@/types/user';

export const useLoginForm = () => {
  const router = useRouter();

  const [contactInfoValue, setContactInfoValue] = useState('');
  const [isPhoneNumberInput, setIsPhoneNumberInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactInfoValue(value);
    setErrorMessage('');

    if (value.trim().length === 0 || value.includes('@')) {
      setIsPhoneNumberInput(false);
    } else if (/^\+\d+$/.test(value) || /^\d{3,}$/.test(value)) {
      setIsPhoneNumberInput(true);
    } else {
      setIsPhoneNumberInput(false);
    }
  }, []);

  const handlePhoneInputValidate = useCallback((fullNumber: string, isValid: boolean) => {
    setIsPhoneValid(isValid);
    setFullPhoneNumber(fullNumber);
  }, []);

  const validateForm = useCallback((): string => {
    const valueTrimmed = contactInfoValue.trim();

    if (!valueTrimmed) return 'Input cannot be empty.';

    if (isPhoneNumberInput) {
      if (!isPhoneValid) return 'Please enter a valid phone number.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valueTrimmed)) return 'Please enter a valid email address.';
    }

    return '';
  }, [contactInfoValue, isPhoneNumberInput, isPhoneValid]);

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

    // هنا هيتم استدعاء API للتحقق من بيانات المستخدم في المستقبل
    const foundUser: User | undefined = mockUsers.find(user =>
      isPhoneNumberInput
        ? user.phoneNumber === finalContactInfo
        : user.email?.toLowerCase() === finalContactInfo.toLowerCase()
    );

    if (foundUser) {
      setLoading(false);
      router.push(`/influencer/opportunities?role=${foundUser.role}`);
    } else {
      setTimeout(() => {
        setLoading(false);
        router.push(
          `/verify-otp?contactInfo=${encodeURIComponent(finalContactInfo)}&isPhoneNumber=${isPhoneNumberInput}&source=login`
        );
      }, 1500); // محاكاة لإرسال OTP
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