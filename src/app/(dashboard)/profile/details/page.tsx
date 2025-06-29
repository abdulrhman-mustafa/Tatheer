// src/app/(dashboard)/profile/details/page.tsx

"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Back from "@/_Components/auth/Back";
import { Input } from "@/_Components/ui/Input";
import { Button } from "@/_Components/ui/Button";

import { mockUsers, User } from "@/data/mockData";
import ContactInputField from "@/_Components/auth/ContactInputField";

export default function EditProfilePage() {
  const router = useRouter();

  // محاكاة لجلب بيانات المستخدم الحالي
  const currentUserId = "user-3"; // نفترض أن المستخدم الحالي هو "Mahmoud Hanafi"
  const currentUser = mockUsers.find((user) => user.id === currentUserId) as
    | User
    | undefined;

  // حالات لحقول النموذج
  const [name, setName] = useState(currentUser?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || ""
  );
  const [email, setEmail] = useState(currentUser?.email || "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // لحالة CustomPhoneInput
  const [isPhoneNumberInput, setIsPhoneNumberInput] = useState(true); // ثابت ليكون دائماً رقم هاتف
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | undefined>(true); // صلاحية رقم الهاتف

  // لتحديث الحالات عند تحميل بيانات المستخدم
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setPhoneNumber(currentUser.phoneNumber || "");
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  // دالة لمعالجة صلاحية رقم الهاتف من CustomPhoneInput
  const handlePhoneInputValidate = (
    isValid: boolean | undefined,
    fullNumber: string
  ) => {
    setIsPhoneValid(isValid);
    if (!isValid) {
      setErrorMessage("Please enter a valid phone number.");
    } else {
      setErrorMessage("");
    }
  };

  // دالة لمعالجة التغييرات في حقول الإدخال الأخرى
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // هذا سيتم استخدامه فقط إذا كان ContactInputField يُستخدم للبريد الإلكتروني أيضاً
    // ولكن هنا نستخدمه فقط للهاتف، لذلك قد لا نحتاجه بالضرورة إلا لـ Input العادي
    // في هذه الصفحة، يتم التعامل مع name و email بشكل منفصل
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // تحقق بسيط من الصحة
    if (!name.trim() || !phoneNumber.trim() || !email.trim()) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (isPhoneNumberInput && !isPhoneValid) {
      // تحقق من صلاحية رقم الهاتف إذا كان هو النوع المختار
      setErrorMessage("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    // محاكاة حفظ البيانات في الـ mockUsers
    if (currentUser) {
      const userIndex = mockUsers.findIndex(
        (user) => user.id === currentUserId
      );
      if (userIndex !== -1) {
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          name: name,
          phoneNumber: phoneNumber,
          email: email,
        };
        console.log("Profile updated (mock):", mockUsers[userIndex]);
      }
    }

    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully (mock)!"); // استخدام alert مؤقتًا
      router.back(); // العودة إلى الصفحة السابقة (صفحة الإعدادات)
    }, 1500);
  };

  return (
    <div className="p-4 text-secondary">
      <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow md:hidden">
          Edit Profile
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errorMessage && !name.trim() ? "Name is required" : undefined}
        />

        <div>
          <ContactInputField
            contactInfoValue={phoneNumber}
            setContactInfoValue={setPhoneNumber}
            isPhoneNumberInput={true} // ثابت ليكون دائماً رقم هاتف لهذا الاستخدام
            setIsPhoneNumberInput={() => {}} // لا نحتاج لتغيير هذه الحالة هنا
            setErrorMessage={setErrorMessage}
            handlePhoneInputValidate={handlePhoneInputValidate}
            errorMessage={
              errorMessage && !isPhoneValid && isPhoneNumberInput
                ? errorMessage
                : ""
            }
            onInputChange={handleInputChange} // يمكن أن يكون دالة فارغة هنا
          />

          {errorMessage && !phoneNumber.trim() && (
            <p className="mt-1 text-sm text-red-500">
              Phone Number is required
            </p>
          )}
        </div>

        {/* Email Input */}
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={
            errorMessage &&
            (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
              ? "Please enter a valid email"
              : undefined
          }
        />

        {errorMessage &&
          typeof errorMessage === "string" &&
          !errorMessage.includes("required") && (
            <p className="mt-1 text-sm text-red-500 text-center">
              {errorMessage}
            </p>
          )}

        {/* Continue Button */}
        <Button
          type="submit"
          variant="primary"
          size="medium"
          className="w-full"
          disabled={loading}
          loading={loading}
        >
          {loading ? "Saving" : "Continue"}
        </Button>
      </form>
    </div>
  );
}
