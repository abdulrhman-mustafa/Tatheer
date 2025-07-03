// src/hooks/useInfluencerDetailsForm.ts

"use client";

import {
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockUsers } from "@/data/mockData";
import { User, InfluencerProfile } from "@/types/user";
import { AVAILABLE_INTERESTS, SOCIAL_MEDIA_PLATFORMS } from "@/constants/influencerData";
import { useAuth } from "@/context/AuthContext";

// Basic form input values
interface InfluencerFormData {
  selectedInterests: string[];
  gender: string;
  age: string;
  beneficiaryName: string;
  bankName: string;
  ibanNumber: string;
  selectedPlatforms: string[];
}

// Validation errors for each field
interface InfluencerFormErrors {
  selectedInterests?: string;
  gender?: string;
  age?: string;
  beneficiaryName?: string;
  bankName?: string;
  ibanNumber?: string;
  selectedPlatforms?: string;
  general?: string;
}

// Overall form state (values, loading, errors, etc.)
interface InfluencerDetailsFormState {
  formData: InfluencerFormData;
  showMoreDetails: boolean;
  errors: InfluencerFormErrors;
  loading: boolean;
  showToast: boolean;
  toastMessage: string;
}

// Form actions and event handlers
interface InfluencerDetailsFormHandlers {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleInterestToggle: (interest: string) => void;
  handleGenderChange: (value: string) => void;
  handleAgeChange: (value: string) => void;
  toggleMoreDetails: () => void;
  handlePlatformToggle: (platformName: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  showToastMessage: (message: string) => void;
}

// What this hook exposes to the component
export type UseInfluencerDetailsFormReturn =
  InfluencerDetailsFormState & InfluencerDetailsFormHandlers & {
    availableInterests: string[];
    socialMediaPlatforms: { name: string; icon?: string }[]; // Keeping your original structure here
  };

// Hook logic starts here
export const useInfluencerDetailsForm = (): UseInfluencerDetailsFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // Read query params passed from previous step
  const initialContactInfo = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";
  const personalNameFromRegister = searchParams.get("personalName") || "";

  // Unified state for the full form
  const [state, setState] = useState<InfluencerDetailsFormState>({
    formData: {
      selectedInterests: [],
      gender: '',
      age: '',
      beneficiaryName: '',
      bankName: '',
      ibanNumber: '',
      selectedPlatforms: [],
    },
    showMoreDetails: false,
    errors: {},
    loading: false,
    showToast: false,
    toastMessage: '',
  });

  // Update a single field in formData
  // FIXED: Using Generics to remove 'any' and enforce type safety
  const updateFormData = useCallback(<K extends keyof InfluencerFormData>(key: K, value: InfluencerFormData[K]) => {
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

  // Set field-specific error messages
  const setFormErrors = useCallback((newErrors: InfluencerFormErrors) => {
    setState(prevState => ({
      ...prevState,
      errors: newErrors,
    }));
  }, []);

  // Show a temporary toast message
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

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Cast name to match keys of formData
    updateFormData(name as keyof InfluencerFormData, value);
  }, [updateFormData]);

  const handleInterestToggle = useCallback((interest: string) => {
    updateFormData('selectedInterests',
      state.formData.selectedInterests.includes(interest)
        ? state.formData.selectedInterests.filter((i) => i !== interest)
        : [...state.formData.selectedInterests, interest]
    );
  }, [state.formData.selectedInterests, updateFormData]);

  const handleGenderChange = useCallback((value: string) => {
    updateFormData('gender', value);
  }, [updateFormData]);

  const handleAgeChange = useCallback((value: string) => {
    updateFormData('age', value);
  }, [updateFormData]);

  const toggleMoreDetails = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      showMoreDetails: !prevState.showMoreDetails,
    }));
  }, []);

  const handlePlatformToggle = useCallback((platformName: string) => {
    updateFormData('selectedPlatforms',
      state.formData.selectedPlatforms.includes(platformName)
        ? state.formData.selectedPlatforms.filter((p) => p !== platformName)
        : [...state.formData.selectedPlatforms, platformName]
    );
  }, [state.formData.selectedPlatforms, updateFormData]);

  // Run validations before submit
  const validateForm = useCallback((): InfluencerFormErrors => {
    const newErrors: InfluencerFormErrors = {};
    const { selectedInterests, gender, age, beneficiaryName, bankName, ibanNumber, selectedPlatforms } = state.formData;

    if (selectedInterests.length === 0) {
      newErrors.selectedInterests = "Please select at least one interest.";
    }
    if (!gender) {
      newErrors.gender = "Gender is required.";
    }
    if (!age) {
      newErrors.age = "Age is required.";
    }

    if (state.showMoreDetails) {
      if (!beneficiaryName.trim()) {
        newErrors.beneficiaryName = "Beneficiary Name is required.";
      }
      if (!bankName.trim()) {
        newErrors.bankName = "Bank Name is required.";
      }
      if (!ibanNumber.trim()) {
        newErrors.ibanNumber = "IBAN Number is required.";
      }
      if (selectedPlatforms.length === 0) {
        newErrors.selectedPlatforms = "Please select at least one platform.";
      }
    }

    return newErrors;
  }, [state.formData, state.showMoreDetails]);

  // Handle form submit and save data
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm();
    setFormErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setFormErrors({ ...formErrors, general: "Please correct the errors above." });
      return;
    }

    setState(prevState => ({ ...prevState, loading: true, errors: {} }));

    const email = initialIsPhoneNumber ? secondaryContactInfo : initialContactInfo;
    const phoneNumber = initialIsPhoneNumber ? initialContactInfo : secondaryContactInfo;
    const name = personalNameFromRegister || 'New Influencer';

    const influencer: InfluencerProfile = {
      id: `user-${mockUsers.length + 1}-${Date.now()}`,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      role: "influencer",
      userName: name.split(' ')[0] || 'influencer',
      profilePictureUrl: "/images/default-avatar.png",
      bio: "An aspiring influencer.",
      // FIXED: Ensure socialMediaLinks are mapped to the correct SocialMediaLink interface
      socialMediaLinks: SOCIAL_MEDIA_PLATFORMS 
        .filter(platform => state.formData.selectedPlatforms.includes(platform.name))
        .map(platform => ({
          platform: platform.name, // ✅ هنا استخدمنا "platform" بدل "name"
          url: `https://example.com/${platform.name.toLowerCase()}/${name.replace(/\s/g, '')}`,
          icon: platform.icon || '',
          followers: 0,
        })), // Explicitly cast to SocialMediaLink if needed
      categories: state.formData.selectedInterests,
      audienceDemographics: [{ country: "Egypt", ageRange: state.formData.age || "18-99" }],
      gender: state.formData.gender,
      age: state.formData.age,
      selectedInterests: state.formData.selectedInterests,
      selectedPlatforms: state.formData.selectedPlatforms,
      ...(state.showMoreDetails && {
        beneficiaryName: state.formData.beneficiaryName,
        bankName: state.formData.bankName,
        ibanNumber: state.formData.ibanNumber,
      }),
    };

    mockUsers.push(influencer);

    const newUserSession: User = {
      id: influencer.id,
      name: influencer.name,
      email: influencer.email,
      phoneNumber: influencer.phoneNumber,
      role: influencer.role
    };
    login(newUserSession);

    setTimeout(() => {
      setState(prevState => ({ ...prevState, loading: false }));
      showToastMessage("Influencer details saved successfully!");
      router.push(`/influencer/opportunities`);
    }, 2000);
  }, [
    state.formData,
    state.showMoreDetails,
    validateForm,
    setFormErrors,
    showToastMessage,
    router,
    login,
    initialContactInfo,
    initialIsPhoneNumber,
    secondaryContactInfo,
    personalNameFromRegister,
  ]);

  // Expose state and handlers to consuming component
  return {
    ...state,
    handleInputChange,
    handleInterestToggle,
    handleGenderChange,
    handleAgeChange,
    toggleMoreDetails,
    handlePlatformToggle,
    handleSubmit,
    showToastMessage,
    availableInterests: AVAILABLE_INTERESTS,
    socialMediaPlatforms: SOCIAL_MEDIA_PLATFORMS,
  };
};