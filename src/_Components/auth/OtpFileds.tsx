// src/components/auth/OtpField.tsx

import React, { useRef, useEffect } from 'react';
import  Input  from '@/_Components/ui/Input'; 

interface OtpFieldProps { 
  otpDigits: string[];
  setOtpDigits: (digits: string[]) => void;
  setErrorMessage: (message: string) => void;
}

const OtpField: React.FC<OtpFieldProps> = ({ otpDigits, setOtpDigits, setErrorMessage }) => { 

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
      console.log("OTP Field: Initial focus set on first input.");
    }

    console.log("OTP Field: inputRefs.current after initial render:", inputRefs.current);
  }, []); 

  const handleOtpDigitChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value) || value.length > 1) return; 

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    setErrorMessage(""); 

    console.log(`OTP Field: Digit changed at index ${index}, value: ${value}`);

    // نقل التركيز (focus) إلى حقل الإدخال التالي إذا تم إدخال رقم
    if (value && index < otpDigits.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
        console.log(`OTP Field: Focus moved to next input at index ${index + 1}.`);
      } else {
        console.log(`OTP Field: Next input at index ${index + 1} is UNDEFINED. Cannot move focus.`);
        // Debugging: Log the current state of all refs if next input is undefined
        console.log("OTP Field: Current inputRefs.current when next is undefined:", inputRefs.current);
      }
    } else if (index === otpDigits.length - 1 && value) {
      // إذا كان هذا هو آخر حقل وتم إدخال رقم، قم بإزالة التركيز (blur)
      inputRefs.current[index]?.blur();
      console.log(`OTP Field: Last input at index ${index} blurred.`);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    console.log(`OTP Field: KeyDown event at index ${index}, key: ${e.key}`);
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
        console.log(`OTP Field: Backspace, focus moved to previous input at index ${index - 1}.`);
      } else {
        console.log(`OTP Field: Backspace, previous input at index ${index - 1} is UNDEFINED. Cannot move focus.`);
      }
    }
  };

  return (
    <div className="flex justify-center space-x-3 mb-6">
      {otpDigits.map((digit, index) => (
        <Input
          id='otp'
          key={index}
          ref={(el: HTMLInputElement) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          type="tel"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOtpDigitChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="
            otp-input-field
            w-12 h-12 
            bg-gray-100 text-center 
            rounded-lg 
            text-2xl font-bold 
            border border-gray-300 
            focus:outline-none 
            focus:ring-2 focus:ring-primary-light 
            focus:border-primary 
            transition-all duration-200 ease-in-out
          "
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
        />
      ))}
    </div>
  );
};

export default OtpField;
