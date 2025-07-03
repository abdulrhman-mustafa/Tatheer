// src/hooks/useAdvertiserDetailsForm.ts

"use client";

import {
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockUsers } from "@/data/mockData";
import { AdvertiserProfile, User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";

// Main form data values
interface AdvertiserFormData {
  brandName: string;
  brandLogoFile: File | null;
  brandLogoPreview: string | null;
  brandDescription: string;
  companyLegalName: string;
  companyCR: string;
  companyVAT: string;
  companyBillingAddress: string;
}

// Validation errors per field
interface AdvertiserFormErrors {
  brandName?: string;
  brandDescription?: string;
  // brandLogoFile?: string;
  companyLegalName?: string;
  companyCR?: string;
  companyVAT?: string;
  companyBillingAddress?: string;
  general?: string;
}

// Full form state container
interface AdvertiserDetailsFormState {
  formData: AdvertiserFormData;
  showMoreDetails: boolean;
  errors: AdvertiserFormErrors;
  loading: boolean;
  showToast: boolean;
  toastMessage: string;
}

// Handlers and actions
interface AdvertiserDetailsFormHandlers {
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBrandLogoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleMoreDetails: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  showToastMessage: (message: string) => void;
}

// Hook output
export type UseAdvertiserDetailsFormReturn =
  AdvertiserDetailsFormState & AdvertiserDetailsFormHandlers;

export const useAdvertiserDetailsForm = (): UseAdvertiserDetailsFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const initialContactInfo = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";

  // Unified form state
  const [state, setState] = useState<AdvertiserDetailsFormState>({
    formData: {
      brandName: '',
      brandLogoFile: null,
      brandLogoPreview: null,
      brandDescription: '',
      companyLegalName: '',
      companyCR: '',
      companyVAT: '',
      companyBillingAddress: '',
    },
    showMoreDetails: false,
    errors: {},
    loading: false,
    showToast: false,
    toastMessage: '',
  });

  // Update a field in formData
  const updateFormData = useCallback(<K extends keyof AdvertiserFormData>(key: K, value: AdvertiserFormData[K]) => {
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

  // Set field errors
  const setFormErrors = useCallback((newErrors: AdvertiserFormErrors) => {
    setState(prevState => ({
      ...prevState,
      errors: newErrors,
    }));
  }, []);

  // Show temporary toast message
  const showToastMessage = useCallback((message: string) => {
    setState(prevState => ({
      ...prevState,
      toastMessage: message,
      showToast: true,
    }));
    const timer = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        showToast: false,
        toastMessage: '',
      }));
    }, 3000);
    return () => clearTimeout(timer); 
  }, []);

  // Handle input or textarea change
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    updateFormData(name as keyof AdvertiserFormData, value);
  }, [updateFormData]);

  // Handle brand logo file upload
  const handleBrandLogoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;

      // لو فيه preview قديم، بنمسحه عشان نمنع Memory Leaks
      if (state.formData.brandLogoPreview) {
        URL.revokeObjectURL(state.formData.brandLogoPreview);
      }

      updateFormData('brandLogoFile', file);
      updateFormData('brandLogoPreview', file ? URL.createObjectURL(file) : null);
      // تم حذف السطر التالي: setFormErrors(prev => ({ ...prev, brandLogoFile: undefined }));
      // لأن 'brandLogoFile' غير موجود في AdvertiserFormErrors
      // إذا كان هناك خطأ محدد يتعلق بملف الشعار (مثل الحجم أو النوع)، يجب إضافته صراحةً إلى الواجهة.
    },
    [state.formData.brandLogoPreview, updateFormData] // تم إزالة setFormErrors من هنا
  );

  // Clean up preview URL عند الـ unmount أو تغيير الـ preview
  useEffect(() => {
    return () => {
      if (state.formData.brandLogoPreview) {
        URL.revokeObjectURL(state.formData.brandLogoPreview);
      }
    };
  }, [state.formData.brandLogoPreview]);

  // Toggle additional company info section
  const toggleMoreDetails = useCallback(() => {
    setState((prevState) => ({ ...prevState, showMoreDetails: !prevState.showMoreDetails }));
    setFormErrors({});
  }, [setFormErrors]);

  // Validate input fields
  const validateForm = useCallback((): AdvertiserFormErrors => {
    const newErrors: AdvertiserFormErrors = {};
    const { brandName, brandDescription, companyLegalName, companyCR, companyVAT, companyBillingAddress } = state.formData;

    if (!brandName.trim()) newErrors.brandName = "Brand Name is required.";
    if (!brandDescription.trim()) newErrors.brandDescription = "Brand Description is required.";

    // بنشيك على حقول الشركة لو الـ "More Details" مفتوحة
    if (state.showMoreDetails) {
      if (!companyLegalName.trim()) newErrors.companyLegalName = "Company Legal Name is required.";
      if (!companyCR.trim()) newErrors.companyCR = "Company CR is required.";
      if (!companyVAT.trim()) newErrors.companyVAT = "Company VAT is required.";
      if (!companyBillingAddress.trim()) newErrors.companyBillingAddress = "Company Billing Address, City and Country is required.";
    }

    return newErrors;
  }, [state.formData, state.showMoreDetails]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    setFormErrors(formErrors);

    // لو فيه أي أخطاء، بنعرض رسالة عامة وبنوقف الإرسال
    if (Object.keys(formErrors).length > 0) {
      setFormErrors({ ...formErrors, general: "Please correct the errors above." });
      return;
    }

    // بنشغل مؤشر التحميل وبنمح أي أخطاء سابقة
    setState(prevState => ({ ...prevState, loading: true, errors: {} }));

    // بنجهز رابط لوجو البراند
    const brandLogoUrl = state.formData.brandLogoFile
      ? `/uploads/${state.formData.brandLogoFile.name}`
      : "/images/logos/default-brand-logo.png";

    // بنحدد الإيميل ورقم التليفون الأساسي والثانوي
    const email = initialIsPhoneNumber ? secondaryContactInfo : initialContactInfo;
    const phoneNumber = initialIsPhoneNumber ? initialContactInfo : secondaryContactInfo;

    // بنكون كائن AdvertiserProfile
    const advertiser: AdvertiserProfile = {
      id: `user-${mockUsers.length + 1}-${Date.now()}`,
      name: state.formData.brandName, 
      email,
      phoneNumber,
      role: "advertiser",
      brandName: state.formData.brandName,
      brandDescription: state.formData.brandDescription,
      brandLogoUrl,
      companyLegalName: state.showMoreDetails ? state.formData.companyLegalName : undefined,
      companyCR: state.showMoreDetails ? state.formData.companyCR : undefined,
      companyVAT: state.showMoreDetails ? state.formData.companyVAT : undefined,
      companyBillingAddress: state.showMoreDetails ? state.formData.companyBillingAddress : undefined,
    };

    // بنضيف المعلن الجديد للبيانات الوهمية
    mockUsers.push(advertiser);
    console.log("New Advertiser registered (mock):", advertiser);

    // بنعمل login للمستخدم الجديد عشان نحفظ الـ session بتاعته
    const newUserSession: User = {
      id: advertiser.id,
      name: advertiser.name,
      email: advertiser.email,
      phoneNumber: advertiser.phoneNumber,
      role: advertiser.role
    };
    login(newUserSession);

    // محاكاة لعملية إرسال البيانات للـ server
    setTimeout(() => {
      setState(prevState => ({ ...prevState, loading: false })); 
      showToastMessage("Advertiser details saved successfully!");
      router.push("/advertiser/campaigns"); 
    }, 2000);
  }, [
    state.formData,
    state.showMoreDetails,
    initialContactInfo,
    initialIsPhoneNumber,
    secondaryContactInfo,
    validateForm,
    setFormErrors,
    showToastMessage,
    router,
    login,
  ]);

  // --- الـ Hook بيرجع الحاجات دي عشان الـ Component يستخدمها ---
  return {
    ...state,
    handleInputChange,
    handleBrandLogoChange,
    toggleMoreDetails,
    handleSubmit,
    showToastMessage,
  };
};