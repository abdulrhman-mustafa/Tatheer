// src/hooks/useCreateAccountForm.ts

"use client";

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// البيانات الأساسية اللي المستخدم بيدخلها
interface CreateAccountFormData {
    personalName: string;
    secondaryContactInfoValue: string;
    secondaryIsPhoneNumberInput: boolean;
    secondaryPhoneValid: boolean;
    fullSecondaryPhoneNumber: string;
}

// الأخطاء اللي ممكن تظهر في الفورم
interface CreateAccountFormErrors {
    personalName?: string;
    initialContactInfo?: string;
    secondaryContactInfo?: string;
    general?: string;
}

// الحالة الكاملة للفورم
interface CreateAccountFormState {
    formData: CreateAccountFormData;
    errors: CreateAccountFormErrors;
    loading: boolean;
}

// الدوال اللي هنستخدمها جوه الفورم
interface CreateAccountFormHandlers {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSecondaryPhoneInputValidate: (fullNumber: string, isValid: boolean) => void;
    handleSubmit: (e: FormEvent) => Promise<void>;
    setIsPhoneNumberInput: (value: boolean) => void;
}

// القيم اللي هنرجعها من الـ hook
export type UseCreateAccountFormReturn =
    CreateAccountFormState & CreateAccountFormHandlers & {
        initialContactInfo: string;
        initialIsPhoneNumber: boolean;
    };

// هنا بنبدأ نكتب hook الفورم نفسه
export const useCreateAccountForm = (): UseCreateAccountFormReturn => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialContactInfo = searchParams.get("contactInfo") || "";
    const initialIsPhoneNumber = searchParams.get("isPhoneNumber") === "true";

    const [state, setState] = useState<CreateAccountFormState>({
        formData: {
            personalName: '',
            secondaryContactInfoValue: '',
            secondaryIsPhoneNumberInput: false,
            secondaryPhoneValid: false,
            fullSecondaryPhoneNumber: '',
        },
        errors: {},
        loading: false,
    });

    // لتحديث أي جزء من الحالة بسهولة
    const updateState = useCallback((updates: Partial<CreateAccountFormState>) => {
        setState(prevState => ({
            ...prevState,
            ...updates,
            errors: {
                ...prevState.errors,
                general: undefined,
            }
        }));
    }, []);

    // لتحديث البيانات جوا formData
    const updateFormData = useCallback(<K extends keyof CreateAccountFormData>(key: K, value: CreateAccountFormData[K]) => {
        setState(prevState => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                [key]: value,
            },
            errors: {
                ...prevState.errors,
                [key]: undefined,
                general: undefined,
            }
        }));
    }, []);

    // لتعيين الأخطاء مرة واحدة (التعريف الصحيح والوحيد)
    const setFormErrors = useCallback((newErrors: CreateAccountFormErrors) => {
        setState(prevState => ({
            ...prevState,
            errors: newErrors,
        }));
    }, []);

    // لما المستخدم يكتب في أي input
    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData(name as keyof CreateAccountFormData, value);

        if (name === 'secondaryContactInfoValue') {
            const isPhone = !value.trim() || (!value.includes('@') && /^\+?\d+$/.test(value));
            updateFormData('secondaryIsPhoneNumberInput', isPhone);
        }
    }, [updateFormData]);

    // لما نتحقق من رقم الموبايل
    const handleSecondaryPhoneInputValidate = useCallback((fullNumber: string, isValid: boolean) => {
        updateFormData('secondaryPhoneValid', isValid);
        updateFormData('fullSecondaryPhoneNumber', fullNumber);
        // <<-- تم التصحيح هنا: استخدام state.errors مباشرةً بدلاً من updater function
        setFormErrors({ ...state.errors, secondaryContactInfo: undefined, general: undefined });
    }, [updateFormData, setFormErrors, state.errors]); 

    // لو المستخدم عايز يغير نوع الوسيلة التانية (رقم أو إيميل)
    const setIsPhoneNumberInput = useCallback((value: boolean) => {
        updateFormData('secondaryIsPhoneNumberInput', value);
    }, [updateFormData]);

    // بنشيك على صحة البيانات
    const validateForm = useCallback((): CreateAccountFormErrors => {
        const newErrors: CreateAccountFormErrors = {};
        const { personalName, secondaryContactInfoValue, secondaryIsPhoneNumberInput, secondaryPhoneValid, fullSecondaryPhoneNumber } = state.formData;

        if (personalName.trim().length < 2) {
            newErrors.personalName = 'enter a valid name.';
        }

        const valueToValidate = secondaryIsPhoneNumberInput
            ? fullSecondaryPhoneNumber
            : secondaryContactInfoValue.trim();

        if (!valueToValidate) {
            newErrors.secondaryContactInfo = 'enter a valid phone number or email address.';
        } else if (secondaryIsPhoneNumberInput && !secondaryPhoneValid) {
            newErrors.secondaryContactInfo = 'enter a valid phone number.';
        } else if (!secondaryIsPhoneNumberInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valueToValidate)) {
                newErrors.secondaryContactInfo = 'enter a valid email address.';
            }
        }

        return newErrors;
    }, [state.formData]);

    // لما الفورم يتبعت
    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        const formValidationErrors = validateForm();
        setFormErrors(formValidationErrors);

        if (Object.keys(formValidationErrors).length > 0) {
            setFormErrors({
                ...formValidationErrors,
                general: "your form has errors, please fix them before submitting",
            });
            return;
        }

        updateState({ loading: true, errors: {} });

        const finalSecondaryContact = state.formData.secondaryIsPhoneNumberInput
            ? state.formData.fullSecondaryPhoneNumber
            : state.formData.secondaryContactInfoValue.trim();

        console.log(`finalSecondaryContact ${finalSecondaryContact} (Is Phone Number? ${state.formData.secondaryIsPhoneNumberInput})`);

        setTimeout(() => {
            updateState({ loading: false });
            router.push(
                `/verify-otp?contactInfo=${encodeURIComponent(initialContactInfo)}` +
                `&isPhoneNumber=${initialIsPhoneNumber}` +
                `&source=create-account` +
                `&personalName=${encodeURIComponent(state.formData.personalName)}` +
                `&secondaryContactInfo=${encodeURIComponent(finalSecondaryContact)}` +
                `&secondaryIsPhoneNumber=${state.formData.secondaryIsPhoneNumberInput}`
            );
        }, 1500);
    }, [
        validateForm,
        setFormErrors,
        updateState,
        state.formData,
        initialContactInfo,
        initialIsPhoneNumber,
        router
    ]);

    // البيانات والدوال اللي الفورم بيرجعها
    return {
        ...state,
        handleInputChange,
        handleSecondaryPhoneInputValidate,
        handleSubmit,
        setIsPhoneNumberInput,
        initialContactInfo,
        initialIsPhoneNumber,
    };
};