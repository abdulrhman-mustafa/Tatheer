// src/hooks/useInfluencerDetailsForm.ts

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockUsers, InfluencerProfile } from "@/data/mockData"; // استيراد بيانات المستخدمين وواجهة InfluencerProfile

// تعريف الاهتمامات المتاحة والمنصات الاجتماعية كما في التصميم
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
  { name: "X", icon: "/x.svg" }, // Twitter is now X
  { name: "Facebook", icon: "/facebook.svg" },
  { name: "Snapchat", icon: "/snapchat.svg" },
  { name: "Linkedin", icon: "/linkedin.svg" },
];

interface UseInfluencerDetailsFormReturn {
  personalName: string;
  initialContactInfo: string;
  initialIsPhoneNumber: boolean;
  secondaryContactInfo: string;
  secondaryIsPhoneNumber: boolean;
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

  // جلب جميع البيانات التي تم تمريرها من الخطوات السابقة
  const personalName = searchParams.get("personalName") || "";
  const initialContactInfo = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumber =
    searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";
  const secondaryIsPhoneNumber =
    searchParams.get("secondaryIsPhoneNumber") === "true";

  // حالات النموذج
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [beneficiaryName, setBeneficiaryName] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [ibanNumber, setIbanNumber] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false); // لطي/توسيع قسم التفاصيل الإضافية
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // دوال معالجة التغييرات في الحقول
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

  // دالة التحقق من صحة النموذج قبل الإرسال
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

    // التحقق من حقول تفاصيل البنك إذا كانت مرئية (اختياري)
    if (showMoreDetails) {
      if (beneficiaryName.trim().length < 3) {
        return "Beneficiary Name is required and must be at least 3 characters.";
      }
      if (bankName.trim().length < 3) {
        return "Bank Name is required and must be at least 3 characters.";
      }
      // يمكن إضافة regex للتحقق من IBAN
      if (ibanNumber.trim().length === 0) {
        // بسيطة لغير فارغ
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

  // دالة معالجة إرسال النموذج (التسجيل النهائي للمؤثر)
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(""); // مسح أي رسائل خطأ سابقة

      const error = validateForm();
      if (error) {
        setErrorMessage(error);
        return;
      }
      setLoading(true);

      // بناء كائن المؤثر النهائي
      const newInfluencer: InfluencerProfile = {
        id: `user-${mockUsers.length + 1}-${Date.now()}`, // توليد ID فريد وهمي
        name: personalName,
        email: initialIsPhoneNumber ? secondaryContactInfo : initialContactInfo, // الإيميل هو الذي ليس رقم هاتف
        phoneNumber: initialIsPhoneNumber
          ? initialContactInfo
          : secondaryContactInfo, // رقم الهاتف هو الذي هو رقم هاتف
        role: "influencer", // الدور المحدد
        niches: selectedInterests,
        socialMediaLinks: selectedPlatforms.map((platform) => ({
          // بناء روابط وهمية مؤقتة
          platform: platform,
          url: `https://www.${platform.toLowerCase()}.com/user`, // URL وهمي
          followers: 0, // يمكن إضافة حقل للمتابعين لاحقًا
          icon:
            SOCIAL_MEDIA_PLATFORMS.find((p) => p.name === platform)?.icon || "", // أيقونة المنصة
        })),
        engagementRate: 0, // قيمة افتراضية
        // تفاصيل البنك إذا كانت موجودة
        beneficiaryName: showMoreDetails ? beneficiaryName : undefined,
        bankName: showMoreDetails ? bankName : undefined,
        ibanNumber: showMoreDetails ? ibanNumber : undefined,
      };

      // إضافة المؤثر الجديد إلى mockUsers (محاكاة قاعدة البيانات)
      mockUsers.push(newInfluencer);
      console.log("New Influencer registered:", newInfluencer);

      setTimeout(() => {
        setLoading(false);
        // التوجيه إلى لوحة تحكم المؤثر بعد التسجيل النهائي
        router.push(`/influencer/opportunities?role=influencer`);
      }, 1500);
    },
    [
      validateForm,
      personalName,
      initialContactInfo,
      initialIsPhoneNumber,
      secondaryContactInfo,
      secondaryIsPhoneNumber,
      selectedInterests,
      gender,
      age,
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
    attrSecondaryIsPhoneNumber: secondaryIsPhoneNumber, // Changed name to avoid conflict with `secondaryIsPhoneNumberInput` for ContactInputField
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
