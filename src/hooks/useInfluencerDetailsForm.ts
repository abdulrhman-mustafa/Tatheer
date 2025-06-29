import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockUsers, InfluencerProfile } from "@/data/mockData";

const AVAILABLE_INTERESTS = [
  "Sport",
  "Beauty",
  "Fun",
  "Science",
  "Politics",
  "Religion",
  "Culture",
  "Kids",
];

const SOCIAL_MEDIA_PLATFORMS = [
  { name: "Youtube", icon: "/youtube.svg" },
  { name: "Instagram", icon: "/instagram.svg" },
  { name: "X", icon: "/x.svg" },
  { name: "Facebook", icon: "/facebook.svg" },
  { name: "Snapchat", icon: "/snapchat.svg" },
  { name: "Linkedin", icon: "/linkedin.svg" },
];

interface UseInfluencerDetailsFormReturn {
  personalName: string;
  initialContactInfo: string;
  initialIsPhoneNumber: boolean;
  secondaryContactInfo: string;
  attrSecondaryIsPhoneNumber: boolean;
  selectedInterests: string[];
  gender: string;
  age: string;
  beneficiaryName: string;
  bankName: string;
  ibanNumber: string;
  selectedPlatforms: string[];
  showMoreDetails: boolean;
  errorMessage: string;
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
  const initialIsPhoneNumber =
    searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [beneficiaryName, setBeneficiaryName] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [ibanNumber, setIbanNumber] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInterestToggle = useCallback((interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }, []);

  const handleGenderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setGender(e.target.value);
    },
    []
  );

  const handleAgeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setAge(e.target.value);
    },
    []
  );

  const handleBeneficiaryNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBeneficiaryName(e.target.value);
    },
    []
  );

  const handleBankNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBankName(e.target.value);
    },
    []
  );

  const handleIbanNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIbanNumber(e.target.value);
    },
    []
  );

  const handlePlatformToggle = useCallback((platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  }, []);

  const toggleMoreDetails = useCallback(() => {
    setShowMoreDetails((prev) => !prev);
  }, []);

  const validateForm = useCallback((): string => {
    if (selectedInterests.length === 0) {
      return "Please select at least one interest.";
    }
    if (!gender) {
      return "Please select your gender.";
    }
    if (!age) {
      return "Please select your age.";
    }

    if (showMoreDetails) {
      if (beneficiaryName.trim().length < 3) {
        return "Beneficiary Name is required and must be at least 3 characters.";
      }
      if (bankName.trim().length < 3) {
        return "Bank Name is required and must be at least 3 characters.";
      }
      if (ibanNumber.trim().length === 0) {
        return "IBAN Number is required.";
      }
      if (selectedPlatforms.length === 0) {
        return "Please select at least one social media platform.";
      }
    }

    return "";
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");

      const error = validateForm();
      if (error) {
        setErrorMessage(error);
        return;
      }
      setLoading(true);

      const newInfluencer: InfluencerProfile = {
        id: `user-${mockUsers.length + 1}-${Date.now()}`,
        name: personalName,
        email: initialIsPhoneNumber ? secondaryContactInfo : initialContactInfo,
        phoneNumber: initialIsPhoneNumber
          ? initialContactInfo
          : secondaryContactInfo,
        role: "influencer",
        niches: selectedInterests,
        socialMediaLinks: selectedPlatforms.map((platform) => ({
          platform: platform,
          url: `https://www.${platform.toLowerCase()}.com/user`,
          followers: 0,
          icon:
            SOCIAL_MEDIA_PLATFORMS.find((p) => p.name === platform)?.icon || "",
        })),
        engagementRate: 0,
        beneficiaryName: showMoreDetails ? beneficiaryName : undefined,
        bankName: showMoreDetails ? bankName : undefined,
        ibanNumber: showMoreDetails ? ibanNumber : undefined,
      };

      mockUsers.push(newInfluencer);
      console.log("New Influencer registered:", newInfluencer);

      setTimeout(() => {
        setLoading(false);
        router.push(`/influencer/opportunities?role=influencer`);
      }, 1500);
    },
    [
      validateForm,
      personalName,
      initialContactInfo,
      initialIsPhoneNumber,
      secondaryContactInfo,
      selectedInterests,
      beneficiaryName,
      bankName,
      ibanNumber,
      selectedPlatforms,
      showMoreDetails,
      router,
    ]
  );

  return {
    personalName,
    initialContactInfo,
    initialIsPhoneNumber,
    secondaryContactInfo,
    attrSecondaryIsPhoneNumber: searchParams.get("secondaryIsPhoneNumber") === "true",
    selectedInterests,
    gender,
    age,
    beneficiaryName,
    bankName,
    ibanNumber,
    selectedPlatforms,
    showMoreDetails,
    errorMessage,
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
