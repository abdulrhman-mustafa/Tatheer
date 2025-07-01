// src/app/(dashboard)/settings/profile/details/page.tsx

'use client';

import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/_Components/auth/Back';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button';
// تم إزالة استيراد DropDown و Checkbox لأنها لم تعد مستخدمة
import ContactInputField from '@/_Components/auth/ContactInputField';
import Image from "next/image";

import { mockUsers, InfluencerProfile } from '@/data/mockData';

export default function EditProfilePage() { 
  const router = useRouter();

  const currentUserId = "user-3";
  const currentUser = mockUsers.find((user) => user.id === currentUserId) as InfluencerProfile | undefined;

  // حالات النموذج - فقط الاسم، رقم الهاتف، والبريد الإلكتروني
  const [name, setName] = useState(currentUser?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 

  // حالات CustomPhoneInput
  const [isPhoneNumberInput, setIsPhoneNumberInput] = useState<boolean>(!!currentUser?.phoneNumber);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

  useEffect(() => {
    if (currentUser?.phoneNumber) {
      setIsPhoneNumberInput(true);
    } else {
      setIsPhoneNumberInput(false);
    }
  }, [currentUser]);

  const showToastMessage = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleContactInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setErrorMessage("");

    if (isPhoneNumberInput) {
      setPhoneNumber(value);
    } else {
      setEmail(value);
    }

    // منطق التحول بين الإيميل والهاتف
    // يمكن تبسيطه أكثر إذا كان التبديل يتم فقط عبر زر "Edit"
    if (value.includes('@')) {
      setIsPhoneNumberInput(false);
    } else if (/^\+\d+$/.test(value) || /^\d{3,}$/.test(value)) {
      setIsPhoneNumberInput(true);
    } else {
      setIsPhoneNumberInput(false);
    }
  }, [isPhoneNumberInput]);

  const handlePhoneInputValidate = useCallback((fullNumber: string, isValid: boolean) => {
    setPhoneNumber(fullNumber);
    setIsPhoneValid(isValid);
    setErrorMessage(isValid ? "" : "Please enter a valid phone number.");
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // منطق التحقق من صحة النموذج - فقط الاسم، رقم الهاتف، والبريد الإلكتروني
    if (!name.trim()) {
      setErrorMessage("Name is required.");
      setLoading(false);
      return;
    }

    if (isPhoneNumberInput) {
      if (!phoneNumber.trim() || !isPhoneValid) {
        setErrorMessage("Please enter a valid phone number.");
        setLoading(false);
        return;
      }
    } else {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        setLoading(false);
        return;
      }
    }

    // هنا يمكنك إرسال البيانات المحدثة إلى backend
    if (currentUser) {
      const userIndex = mockUsers.findIndex((user) => user.id === currentUserId);
      if (userIndex !== -1) {
        // تحديث البيانات في mockUsers (هذا للتجربة فقط، في تطبيق حقيقي سترسلها إلى API)
        const updatedUser: InfluencerProfile = {
          ...(mockUsers[userIndex] as InfluencerProfile),
          name: name,
          // تحديث الإيميل أو رقم الهاتف بناءً على isPhoneNumberInput
          email: isPhoneNumberInput ? currentUser.email : email,
          phoneNumber: isPhoneNumberInput ? phoneNumber : currentUser.phoneNumber,
          // إزالة تحديث الحقول الأخرى
        };
        mockUsers[userIndex] = updatedUser;
        console.log("Profile updated (mock):", mockUsers[userIndex]);
      }
    }

    setTimeout(() => {
      setLoading(false);
      showToastMessage("Profile updated successfully!");
      router.back();
    }, 1500);
  }, [name, phoneNumber, email, isPhoneNumberInput, isPhoneValid, currentUser, showToastMessage, router]);

  // تم إزالة خيارات DropDown و Interests و Social Media Platforms و Bank Details لأنها لم تعد مستخدمة

  return (
    <div className="p-4 text-secondary md:bg-gray-50 md:rounded-sm">
      <div className="w-full max-w-md flex md:hidden justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow">Edit Profile</h1>
      </div>

      <div className="hidden md:flex items-center justify-between pb-5">
        <h1 className="text-xl font-semibold">Personal Information</h1>
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={() => {
            setIsPhoneNumberInput(prev => !prev);
            setErrorMessage("");
            if (isPhoneNumberInput) {
              setEmail("");
            } else {
              setPhoneNumber("");
            }
          }}
        >
          Edit
          <Image
            src="/edit.svg"
            alt="Edit"
            width={16}
            height={16}
            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/16x16/E2E8F0/A0AEC0?text=E`; }}
          />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="max-md:space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10">
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errorMessage.includes('Name is required') ? errorMessage : undefined}
        />

        {/* حقل معلومات الاتصال (الهاتف/البريد الإلكتروني) */}
        <ContactInputField
          contactInfoValue={isPhoneNumberInput ? phoneNumber : email}
          isPhoneNumberInput={isPhoneNumberInput}
          onInputChange={handleContactInfoChange}
          onPhoneInputValidate={handlePhoneInputValidate}
          errorMessage={
            errorMessage.includes('email') || errorMessage.includes('phone number') || errorMessage.includes('contact information')
              ? errorMessage : ''
          }
        />

        {/* رسائل الخطأ العامة */}
        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-2 text-center col-span-full">
            {errorMessage}
          </p>
        )}

        {/* زر الحفظ */}
        <Button
          type="submit"
          variant="primary"
          size="medium"
          className="w-full md:col-span-full py-3 mt-8"
          disabled={loading}
          loading={loading}
        >
          {loading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </form>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
