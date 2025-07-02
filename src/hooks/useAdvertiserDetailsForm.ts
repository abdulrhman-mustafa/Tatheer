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
import { mockUsers, AdvertiserProfile } from "@/data/mockData";

interface AdvertiserDetailsFormState {
  brandName: string;
  brandLogoFile: File | null;
  brandLogoPreview: string | null;
  brandDescription: string;
  showMoreDetails: boolean;
  companyLegalName: string;
  companyCR: string;
  companyVAT: string;
  companyBillingAddress: string;
  errorMessage: string;
  loading: boolean;
  showToast: boolean;
  toastMessage: string;
}

interface AdvertiserDetailsFormHandlers {
  setBrandName: (value: string) => void;
  handleBrandLogoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setBrandDescription: (value: string) => void;
  toggleMoreDetails: () => void;
  setCompanyLegalName: (value: string) => void;
  setCompanyCR: (value: string) => void;
  setCompanyVAT: (value: string) => void;
  setCompanyBillingAddress: (value: string) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  showToastMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

export type UseAdvertiserDetailsFormReturn =
  AdvertiserDetailsFormState & AdvertiserDetailsFormHandlers;

export const useAdvertiserDetailsForm = (): UseAdvertiserDetailsFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialContactInfo = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";

  const [brandName, setBrandName] = useState('');
  const [brandLogoFile, setBrandLogoFile] = useState<File | null>(null);
  const [brandLogoPreview, setBrandLogoPreview] = useState<string | null>(null);
  const [brandDescription, setBrandDescription] = useState('');
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const [companyLegalName, setCompanyLegalName] = useState('');
  const [companyCR, setCompanyCR] = useState('');
  const [companyVAT, setCompanyVAT] = useState('');
  const [companyBillingAddress, setCompanyBillingAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleBrandLogoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const file = e.target.files[0];
        setBrandLogoFile(file);

        if (brandLogoPreview) URL.revokeObjectURL(brandLogoPreview);
        setBrandLogoPreview(URL.createObjectURL(file));
        setErrorMessage('');
      } else {
        setBrandLogoFile(null);
        if (brandLogoPreview) URL.revokeObjectURL(brandLogoPreview);
        setBrandLogoPreview(null);
      }
    },
    [brandLogoPreview]
  );

  useEffect(() => {
    return () => {
      if (brandLogoPreview) URL.revokeObjectURL(brandLogoPreview);
    };
  }, [brandLogoPreview]);

  const toggleMoreDetails = useCallback(() => {
    setShowMoreDetails((prev) => !prev);
  }, []);

  const validateForm = useCallback((): string => {
    if (!brandName.trim()) return "Brand Name is required.";
    if (!brandDescription.trim()) return "Brand Description is required.";

    if (showMoreDetails) {
      if (!companyLegalName.trim()) return "Company Legal Name is required.";
      if (!companyCR.trim()) return "Company CR is required.";
      if (!companyVAT.trim()) return "Company VAT is required.";
      if (!companyBillingAddress.trim()) return "Company Billing Address, City and Country is required.";
    }

    return "";
  }, [
    brandName,
    brandDescription,
    showMoreDetails,
    companyLegalName,
    companyCR,
    companyVAT,
    companyBillingAddress,
  ]);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    // Backend: Save advertiser to DB here

    const advertiser: AdvertiserProfile = {
      id: `user-${mockUsers.length + 1}-${Date.now()}`,
      name: brandName,
      email: initialIsPhoneNumber ? secondaryContactInfo : initialContactInfo,
      phoneNumber: initialIsPhoneNumber ? initialContactInfo : secondaryContactInfo,
      role: "advertiser",
      brandName,
      brandDescription,
      brandLogoUrl: brandLogoFile ? `/uploads/${brandLogoFile.name}` : "/images/logos/default-brand-logo.png",
      companyLegalName: showMoreDetails ? companyLegalName : undefined,
      companyCR: showMoreDetails ? companyCR : undefined,
      companyVAT: showMoreDetails ? companyVAT : undefined,
      companyBillingAddress: showMoreDetails ? companyBillingAddress : undefined,
    };

    mockUsers.push(advertiser);
    console.log("New Advertiser registered (mock):", advertiser);

    setTimeout(() => {
      setLoading(false);
      showToastMessage("Advertiser details saved successfully!");
      router.push("/advertiser/campaigns");
    }, 2000);
  }, [
    initialContactInfo,
    initialIsPhoneNumber,
    secondaryContactInfo,
    brandName,
    brandDescription,
    brandLogoFile,
    showMoreDetails,
    companyLegalName,
    companyCR,
    companyVAT,
    companyBillingAddress,
    validateForm,
    showToastMessage,
    router,
  ]);

  return {
    brandName,
    brandLogoFile,
    brandLogoPreview,
    brandDescription,
    showMoreDetails,
    companyLegalName,
    companyCR,
    companyVAT,
    companyBillingAddress,
    errorMessage,
    loading,
    showToast,
    toastMessage,
    setBrandName,
    handleBrandLogoChange,
    setBrandDescription,
    toggleMoreDetails,
    setCompanyLegalName,
    setCompanyCR,
    setCompanyVAT,
    setCompanyBillingAddress,
    handleSubmit,
    showToastMessage,
    setErrorMessage,
  };
};