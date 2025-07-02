// src/hooks/useCreateAccountForm.ts

"use client";

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormErrors {
  personalName?: string;
  secondaryContactInfo?: string;
  general?: string;
}

interface UseCreateAccountFormReturn {
  personalName: string;
  setPersonalName: (name: string) => void;
  secondaryContactInfoValue: string;
  setSecondaryContactInfoValue: (value: string) => void;
  secondaryIsPhoneNumberInput: boolean;
  setIsPhoneNumberInput: (value: boolean) => void;
  errors: FormErrors;
  loading: boolean;
  handleSecondaryInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecondaryPhoneInputValidate: (fullNumber: string, isValid: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  initialContactInfo: string;
  initialIsPhoneNumber: boolean;
}

export const useCreateAccountForm = (): UseCreateAccountFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialContactInfo = searchParams.get("contactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("isPhoneNumber") === "true";

  const [personalName, setPersonalName] = useState('');
  const [secondaryContactInfoValue, setSecondaryContactInfoValue] = useState('');
  const [secondaryIsPhoneNumberInput, setSecondaryIsPhoneNumberInput] = useState(false);
  const [secondaryPhoneValid, setSecondaryPhoneValid] = useState(false);
  const [fullSecondaryPhoneNumber, setFullSecondaryPhoneNumber] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSecondaryInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecondaryContactInfoValue(value);
    setErrors(prev => ({ ...prev, secondaryContactInfo: undefined, general: undefined }));

    if (!value.trim() || value.includes('@') === false && !/^\+?\d+$/.test(value)) {
      setSecondaryIsPhoneNumberInput(false);
    } else {
      setSecondaryIsPhoneNumberInput(true);
    }
  }, []);

  const handleSecondaryPhoneInputValidate = useCallback((fullNumber: string, isValid: boolean) => {
    setSecondaryPhoneValid(isValid);
    setFullSecondaryPhoneNumber(fullNumber);
    setErrors(prev => ({ ...prev, secondaryContactInfo: undefined, general: undefined }));
  }, []);

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (personalName.trim().length < 2) {
      newErrors.personalName = 'Please enter a valid personal name (at least 2 characters).';
    }

    const valueToValidate = secondaryIsPhoneNumberInput
      ? fullSecondaryPhoneNumber
      : secondaryContactInfoValue.trim();

    if (!valueToValidate) {
      newErrors.secondaryContactInfo = 'Please enter the required contact information.';
    } else if (secondaryIsPhoneNumberInput && !secondaryPhoneValid) {
      newErrors.secondaryContactInfo = 'Please enter a valid phone number.';
    } else if (!secondaryIsPhoneNumberInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valueToValidate)) {
        newErrors.secondaryContactInfo = 'Please enter a valid email address.';
      }
    }

    return newErrors;
  }, [personalName, secondaryContactInfoValue, secondaryIsPhoneNumberInput, secondaryPhoneValid, fullSecondaryPhoneNumber]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors({
        ...formValidationErrors,
        general: "Please fill in all required fields."
      });
      return;
    }

    setErrors({});
    setLoading(true);

    const finalSecondaryContact = secondaryIsPhoneNumberInput
      ? fullSecondaryPhoneNumber
      : secondaryContactInfoValue.trim();

    console.log(`Simulating verification for secondary contact: ${finalSecondaryContact} (Is Phone: ${secondaryIsPhoneNumberInput})`);

    setTimeout(() => {
      setLoading(false);
      router.push(
        `/verify-otp?contactInfo=${encodeURIComponent(initialContactInfo)}` +
        `&isPhoneNumber=${initialIsPhoneNumber}` +
        `&source=create-account` +
        `&personalName=${encodeURIComponent(personalName)}` +
        `&secondaryContactInfo=${encodeURIComponent(finalSecondaryContact)}` +
        `&secondaryIsPhoneNumber=${secondaryIsPhoneNumberInput}`
      );
    }, 1500);
  }, [validateForm, personalName, secondaryContactInfoValue, secondaryIsPhoneNumberInput, fullSecondaryPhoneNumber, initialContactInfo, initialIsPhoneNumber, router]);

  return {
    personalName,
    setPersonalName,
    secondaryContactInfoValue,
    setSecondaryContactInfoValue,
    secondaryIsPhoneNumberInput,
    setIsPhoneNumberInput: setSecondaryIsPhoneNumberInput,
    errors,
    loading,
    handleSecondaryInputChange,
    handleSecondaryPhoneInputValidate,
    handleSubmit,
    initialContactInfo,
    initialIsPhoneNumber,
  };
};
