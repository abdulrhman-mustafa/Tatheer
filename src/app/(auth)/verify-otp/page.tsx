// src/app/(auth)/verify-otp/page.tsx

'use client'; 

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Back from '@/_Components/auth/Back'; 
import ResendCodeSection from '@/_Components/auth/ResendCodeSection'; 
import OtpField from '@/_Components/auth/OtpFileds'; 

import { Button } from "@/_Components/ui/Button"; 

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const contactInfoFromUrl = searchParams.get("contactInfo") || "";
  const isPhoneNumberFromUrl = searchParams.get("isPhoneNumber") === "true";
  const sourceFromUrl = searchParams.get("source") || "login"; // 'login' أو 'create-account'
  // بيانات إضافية قد تأتي من صفحة create-account (للتوثيق الثاني)
  const personalNameFromUrl = searchParams.get("personalName") || "";
  const initialContactInfoFromUrl = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumberFromUrl = searchParams.get("initialIsPhoneNumber") === "true";


  const [contactInfo, setContactInfo] = useState<string>(contactInfoFromUrl);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(isPhoneNumberFromUrl);
  const [source, setSource] = useState<string>(sourceFromUrl); 
  const [personalName, setPersonalName] = useState<string>(personalNameFromUrl);
  const [initialContactInfo, setInitialContactInfo] = useState<string>(initialContactInfoFromUrl);
  const [initialIsPhoneNumber, setInitialIsPhoneNumber] = useState<boolean>(initialIsPhoneNumberFromUrl);


  const [timer, setTimer] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (initialTime: number = 60) => {
    setTimer(initialTime);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    setContactInfo(contactInfoFromUrl);
    setIsPhoneNumber(isPhoneNumberFromUrl);
    setSource(sourceFromUrl);
    setPersonalName(personalNameFromUrl);
    setInitialContactInfo(initialContactInfoFromUrl);
    setInitialIsPhoneNumber(initialIsPhoneNumberFromUrl);

    startTimer(); 

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [contactInfoFromUrl, isPhoneNumberFromUrl, sourceFromUrl, personalNameFromUrl, initialContactInfoFromUrl, initialIsPhoneNumberFromUrl, router]);


  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const combinedOtp = otpDigits.join("");

    if (combinedOtp.length !== 4) {
      setErrorMessage("Please enter the 4-digit code.");
      setLoading(false);
      return;
    }

    const DUMMY_OTP_CODE = "1234"; // كود OTP المحاكي

    if (combinedOtp === DUMMY_OTP_CODE) {
      console.log("OTP verified successfully (simulated)!");
      setLoading(false);

      if (source === 'login') {
        // التحقق الأول: المستخدم قادم من صفحة تسجيل الدخول لأول مرة
        console.log("Redirecting to create account page for initial setup.");
        router.push(
          `/register/create-account?contactInfo=${encodeURIComponent(contactInfo)}&isPhoneNumber=${isPhoneNumber}`
        );
      } else if (source === 'create-account') {
        // التحقق الثاني: المستخدم قادم من صفحة إنشاء الحساب (بعد إدخال معلومات الاتصال الثانية)
        console.log("Redirecting to select role page after second verification.");
        // هنا يمكنك تمرير جميع البيانات لصفحة اختيار الدور إذا كنت ستقوم بتسجيل المستخدم هناك
        // أو يمكنك ببساطة تخزينها مؤقتًا في سياق React أو localStorage حتى يتم تسجيلها لاحقًا
        // For now, we'll just redirect to select-role as per the plan.
        
        // لو كنا سنحفظ المستخدم في mockUsers (Backend حقيقي سيحدث هنا)
        // const newUser = {
        //   id: `user-${mockUsers.length + 1}`, // Generate a mock ID
        //   name: personalName,
        //   email: isPhoneNumber ? initialContactInfo : contactInfo, // Email is the one *not* phone
        //   phoneNumber: isPhoneNumber ? contactInfo : initialContactInfo, // Phone is the one *is* phone
        //   role: 'user', // Default role before selection
        // };
        // mockUsers.push(newUser); // Add to mock data
        // console.log("New user added to mockUsers:", newUser);
        
        router.push(`/register/select-role?personalName=${encodeURIComponent(personalName)}&initialContactInfo=${encodeURIComponent(initialContactInfo)}&initialIsPhoneNumber=${initialIsPhoneNumber}&secondaryContactInfo=${encodeURIComponent(contactInfo)}&secondaryIsPhoneNumber=${isPhoneNumber}`);

      } else {
        console.warn("Unknown source for OTP verification. Redirecting to login.");
        router.push('/login');
      }
      
    } else {
      setLoading(false);
      setErrorMessage("Invalid code. Please try again. (Hint: Try 1234)");
      setOtpDigits(["", "", "", ""]); 
      const firstOtpInput = document.querySelector<HTMLInputElement>('.otp-input-field:first-child');
      if (firstOtpInput) {
        firstOtpInput.focus();
      }
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setErrorMessage("");
    setOtpDigits(["", "", "", ""]); 

    console.log("Simulating resending code");
    setTimeout(() => {
      setLoading(false);
      setErrorMessage("New code sent (simulated)!");
      startTimer(); 
      const firstOtpInput = document.querySelector<HTMLInputElement>('.otp-input-field:first-child');
      if (firstOtpInput) {
        firstOtpInput.focus();
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4 text-gray-800">
      <Back /> 
      <div className="flex flex-col items-center justify-center w-full max-w-md mt-24 px-4">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Please check your {isPhoneNumber ? "Number" : "email"}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We&apos;ve sent a code to <span className="font-semibold text-primary">{contactInfo}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className="w-full space-y-6">
          <OtpField 
            otpDigits={otpDigits} 
            setOtpDigits={setOtpDigits} 
            setErrorMessage={setErrorMessage} 
          />

          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-2 text-center">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full rounded-lg py-3"
            disabled={loading}
            loading={loading}
          >
            {loading ? "Verifying" : "Verify account"} 
          </Button>

          <ResendCodeSection
            isPhoneNumber={isPhoneNumber}
            canResend={canResend}
            timer={timer}
            loading={loading}
            handleResendCode={handleResendCode}
          />
        </form>
      </div>
    </div>
  );
}
