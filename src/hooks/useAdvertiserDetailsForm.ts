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
// تم تصحيح مسار الاستيراد هنا
import { mockUsers, AdvertiserProfile } from "@/data/mockData";

export function useAdvertiserDetailsForm() {
const router = useRouter();
const searchParams = useSearchParams();

// الحصول على البيانات الممررة من الـ query parameters
const personalNameFromParams = searchParams.get("personalName") || "";
const initialContactInfo = searchParams.get("initialContactInfo") || "";
const initialIsPhoneNumber =
    searchParams.get("initialIsPhoneNumber") === "true";
const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";

// **تم تعديل هذا السطر:** الإعلان عن personalName كحالة باستخدام useState
const [personalName, setPersonalName] = useState<string>(
    personalNameFromParams
);

const [brandName, setBrandName] = useState("");
const [brandLogo, setBrandLogo] = useState<File | null>(null);
const [brandDescription, setBrandDescription] = useState("");
const [showMoreDetails, setShowMoreDetails] = useState(false);

const [companyLegalName, setCompanyLegalName] = useState("");
const [companyCR, setCompanyCR] = useState("");
const [companyVAT, setCompanyVAT] = useState("");
const [companyBillingAddress, setCompanyBillingAddress] = useState("");

const [errorMessage, setErrorMessage] = useState("");
const [loading, setLoading] = useState(false);

// تحديث personalName في حالة الخطاف عند تحميل الصفحة (هذا السطر أصبح صحيحاً الآن)
useEffect(() => {
    // Only update if it's different to avoid unnecessary re-renders
    if (personalName !== personalNameFromParams) {
    setPersonalName(personalNameFromParams);
    }
}, [personalNameFromParams, personalName]);

const handleBrandLogoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBrandLogo(file);
    },
    []
);

const toggleMoreDetails = useCallback(() => {
    setShowMoreDetails((prev) => !prev);
}, []);

const validateForm = useCallback((): string => {
    if (brandName.trim().length === 0) {
    return "Brand Name is required.";
    }
    if (brandDescription.trim().length === 0) {
    return "Brand Description is required.";
    }

    if (showMoreDetails) {
    if (companyLegalName.trim().length === 0) {
        return "Company Legal Name is required.";
    }
    if (companyCR.trim().length === 0) {
        return "Company CR is required.";
    }
    if (companyVAT.trim().length === 0) {
        return "Company VAT is required.";
    }
    if (companyBillingAddress.trim().length === 0) {
        return "Company Billing Address, City and Country is required.";
    }
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

const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
        setErrorMessage(error);
        return;
    }

    setLoading(true);
    setErrorMessage("");

    const advertiser: AdvertiserProfile = {
        id: `user-${mockUsers.length + 1}-${Date.now()}`,
        name: personalName, // استخدام الـ state variable هنا
        email: initialIsPhoneNumber ? secondaryContactInfo : initialContactInfo,
        phoneNumber: initialIsPhoneNumber
        ? initialContactInfo
        : secondaryContactInfo,
        role: "advertiser",
        brandName,
        brandDescription,
        brandLogoUrl: brandLogo
        ? URL.createObjectURL(brandLogo)
        : "/images/default-brand-logo.png",

        companyLegalName: showMoreDetails ? companyLegalName : undefined,
        companyCR: showMoreDetails ? companyCR : undefined,
        companyVAT: showMoreDetails ? companyVAT : undefined,
        companyBillingAddress: showMoreDetails
        ? companyBillingAddress
        : undefined,
    };

    mockUsers.push(advertiser);
    console.log("New Advertiser registered (mock):", advertiser);

    setTimeout(() => {
        setLoading(false);
        router.push("/advertiser?role=advertiser");
    }, 1000);
    },
    [
    personalName,
    initialContactInfo,
    initialIsPhoneNumber,
    secondaryContactInfo,
    brandName,
    brandDescription,
    brandLogo,
    showMoreDetails,
    companyLegalName,
    companyCR,
    companyVAT,
    companyBillingAddress,
    router,
    validateForm,
    ]
);

return {
    personalName, // نُرجع الـ state variable
    brandName,
    brandLogo,
    brandDescription,
    showMoreDetails,
    companyLegalName,
    companyCR,
    companyVAT,
    companyBillingAddress,
    errorMessage,
    loading,
    setBrandName,
    handleBrandLogoChange,
    setBrandDescription,
    toggleMoreDetails,
    setCompanyLegalName,
    setCompanyCR,
    setCompanyVAT,
    setCompanyBillingAddress,
    handleSubmit,
};
}
