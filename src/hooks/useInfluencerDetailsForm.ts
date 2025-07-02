// src/hooks/useInfluencerDetailsForm.ts

"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  mockUsers,
  InfluencerProfile,
  AVAILABLE_INTERESTS,
  SOCIAL_MEDIA_PLATFORMS,
} from "@/data/mockData";

interface FormErrors {
  selectedInterests?: string;
  gender?: string;
  age?: string;
  beneficiaryName?: string;
  bankName?: string;
  ibanNumber?: string;
  selectedPlatforms?: string;
  general?: string;
}

interface UseInfluencerDetailsFormReturn {
  personalName: string;
  initialContactInfo: string;
  initialIsPhoneNumber: boolean;
  secondaryContactInfo: string;
  selectedInterests: string[];
  gender: string;
  age: string;
  beneficiaryName: string;
  bankName: string;
  ibanNumber: string;
  selectedPlatforms: string[];
  showMoreDetails: boolean;
  errors: FormErrors;
  loading: boolean;
  availableInterests: string[];
  socialMediaPlatforms: { name: string; icon: string }[];
  handleInterestToggle: (interest: string) => void;
  handleGenderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAgeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBeneficiaryNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBankNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIbanNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlatformToggle: (platform: string) => void;
  toggleMoreDetails: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useInfluencerDetailsForm = (): UseInfluencerDetailsFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const personalName = searchParams.get("personalName") || "";
  const initialContactInfo = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [beneficiaryName, setBeneficiaryName] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [ibanNumber, setIbanNumber] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleInterestToggle = useCallback((interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
    setErrors(prev => ({ ...prev, selectedInterests: undefined }));
  }, []);

  const handleGenderChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    setErrors(prev => ({ ...prev, gender: undefined }));
  }, []);

  const handleAgeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(e.target.value);
    setErrors(prev => ({ ...prev, age: undefined }));
  }, []);

  const handleBeneficiaryNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficiaryName(e.target.value);
    setErrors(prev => ({ ...prev, beneficiaryName: undefined }));
  }, []);

  const handleBankNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBankName(e.target.value);
    setErrors(prev => ({ ...prev, bankName: undefined }));
  }, []);

  const handleIbanNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIbanNumber(e.target.value);
    setErrors(prev => ({ ...prev, ibanNumber: undefined }));
  }, []);

  const handlePlatformToggle = useCallback((platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
    setErrors(prev => ({ ...prev, selectedPlatforms: undefined }));
  }, []);

  const toggleMoreDetails = useCallback(() => {
    setShowMoreDetails((prev) => !prev);
    if (showMoreDetails) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.beneficiaryName;
        delete newErrors.bankName;
        delete newErrors.ibanNumber;
        delete newErrors.selectedPlatforms;
        return newErrors;
      });
    }
  }, [showMoreDetails]);

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (selectedInterests.length === 0) {
      newErrors.selectedInterests = "Please select at least one interest.";
    }
    if (!gender) {
      newErrors.gender = "Please select your gender.";
    }
    if (!age) {
      newErrors.age = "Please select your age.";
    }

    if (showMoreDetails) {
      if (beneficiaryName.trim().length < 3) {
        newErrors.beneficiaryName = "Beneficiary Name must be at least 3 characters.";
      }
      if (bankName.trim().length < 3) {
        newErrors.bankName = "Bank Name must be at least 3 characters.";
      }
      if (ibanNumber.trim().length === 0) {
        newErrors.ibanNumber = "IBAN Number is required.";
      }
      if (selectedPlatforms.length === 0) {
        newErrors.selectedPlatforms = "Please select at least one platform.";
      }
    }

    return newErrors;
  }, [
    selectedInterests,
    gender,
    age,
    showMoreDetails,
    beneficiaryName,
    bankName,
    ibanNumber,
    selectedPlatforms,
  ]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      setErrors(prev => ({ ...prev, general: "Please fill in all required fields." }));
      return;
    }

    setLoading(true);

    const newInfluencer: InfluencerProfile = {
      id: `user-${mockUsers.length + 1}-${Date.now()}`,
      name: personalName,
      email: initialIsPhoneNumber ? secondaryContactInfo : initialContactInfo,
      phoneNumber: initialIsPhoneNumber ? initialContactInfo : secondaryContactInfo,
      role: "influencer",
      niches: selectedInterests,
      gender,
      age,
      socialMediaLinks: selectedPlatforms.map((platformName) => ({
        platform: platformName,
        url: `https://www.${platformName.toLowerCase()}.com/user`,
        followers: 0,
        icon: SOCIAL_MEDIA_PLATFORMS.find((p) => p.name === platformName)?.icon || "",
      })),
      engagementRate: 0,
      beneficiaryName: showMoreDetails ? beneficiaryName : undefined,
      bankName: showMoreDetails ? bankName : undefined,
      ibanNumber: showMoreDetails ? ibanNumber : undefined,
    };

    mockUsers.push(newInfluencer); // كده كده دي بيانات تجريبية عادي
    console.log("New Influencer registered:", newInfluencer);

    setTimeout(() => {
      setLoading(false);
      router.push(`/influencer/opportunities?role=influencer`);
    }, 1500);
  }, [
    validateForm,
    personalName,
    initialContactInfo,
    initialIsPhoneNumber,
    secondaryContactInfo,
    selectedInterests,
    gender,
    age,
    beneficiaryName,
    bankName,
    ibanNumber,
    selectedPlatforms,
    showMoreDetails,
    router,
  ]);

  return {
    personalName,
    initialContactInfo,
    initialIsPhoneNumber,
    secondaryContactInfo,
    selectedInterests,
    gender,
    age,
    beneficiaryName,
    bankName,
    ibanNumber,
    selectedPlatforms,
    showMoreDetails,
    errors,
    loading,
    availableInterests: AVAILABLE_INTERESTS,
    socialMediaPlatforms: SOCIAL_MEDIA_PLATFORMS,
    handleInterestToggle,
    handleGenderChange,
    handleAgeChange,
    handleBeneficiaryNameChange,
    handleBankNameChange,
    handleIbanNumberChange,
    handlePlatformToggle,
    toggleMoreDetails,
    handleSubmit,
  };
};
