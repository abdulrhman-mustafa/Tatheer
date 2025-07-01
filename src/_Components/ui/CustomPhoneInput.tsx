// src/_Components/ui/CustomPhoneInput.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Country {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
}

interface CustomPhoneInputProps {
  value: string; // The full value (including dial code) from parent
  onChange: (fullPhoneNumber: string, isValid: boolean) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

const countries: Country[] = [
  { name: "Egypt", code: "eg", phoneCode: "+20", flag: "https://flagcdn.com/eg.svg" },
  { name: "Saudi Arabia", code: "sa", phoneCode: "+966", flag: "https://flagcdn.com/sa.svg" },
  { name: "United Arab Emirates", code: "ae", phoneCode: "+971", flag: "https://flagcdn.com/ae.svg" },
  { name: "Kuwait", code: "kw", phoneCode: "+965", flag: "https://flagcdn.com/kw.svg" },
  { name: "Qatar", code: "qa", phoneCode: "+974", flag: "https://flagcdn.com/qa.svg" },
  { name: "Oman", code: "om", phoneCode: "+968", flag: "https://flagcdn.com/om.svg" },
  { name: "Bahrain", code: "bh", phoneCode: "+973", flag: "https://flagcdn.com/bh.svg" },
  { name: "Jordan", code: "jo", phoneCode: "+962", flag: "https://flagcdn.com/jo.svg" },
  { name: "Iraq", code: "iq", phoneCode: "+964", flag: "https://flagcdn.com/iq.svg" },
  { name: "Lebanon", code: "lb", phoneCode: "+961", flag: "https://flagcdn.com/lb.svg" },
  { name: "Morocco", code: "ma", phoneCode: "+212", flag: "https://flagcdn.com/ma.svg" },
  { name: "Algeria", code: "dz", phoneCode: "+213", flag: "https://flagcdn.com/dz.svg" },
  { name: "Tunisia", code: "tn", phoneCode: "+216", flag: "https://flagcdn.com/tn.svg" },
  { name: "Libya", code: "ly", phoneCode: "+218", flag: "https://flagcdn.com/ly.svg" },
  { name: "Sudan", code: "sd", phoneCode: "+249", flag: "https://flagcdn.com/sd.svg" },
  { name: "Palestine", code: "ps", phoneCode: "+970", flag: "https://flagcdn.com/ps.svg" },
  { name: "Yemen", code: "ye", phoneCode: "+967", flag: "https://flagcdn.com/ye.svg" },
  { name: "Syria", code: "sy", phoneCode: "+963", flag: "https://flagcdn.com/sy.svg" },
];

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Enter your phone number",
  className,
  inputClassName,
}) => {
  const findCountryByPhoneCodePrefix = (val: string): Country | undefined => {
    return countries.find(c => val.startsWith(c.phoneCode));
  };

  // تهيئة الحالة الأولية بناءً على قيمة الـ prop `value`
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    const countryFromValue = findCountryByPhoneCodePrefix(value);
    return countryFromValue || countries.find(c => c.code === "ps") || countries[0];
  });
  
  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    const countryFromValue = findCountryByPhoneCodePrefix(value);
    return countryFromValue ? value.replace(countryFromValue.phoneCode, '') : value;
  });

  const prevValueRef = useRef(value); // لتتبع القيمة السابقة لـ `value` prop
  const isMounted = useRef(false); // لتتبع ما إذا كان المكون قد تم تركيبه لأول مرة

  // دالة للتحقق من صحة رقم الهاتف
  const validatePhoneNumber = useCallback((phone: string, phoneCode: string): boolean => {
    const cleanedPhone = phone.replace(/\D/g, ''); 
    return cleanedPhone.length >= 8 ;
  }, []);

  // دالة لاستدعاء onChange بطريقة memoized
  const triggerOnChange = useCallback((currentPhoneNumber: string, currentSelectedCountry: Country) => {
    const fullNumber = currentSelectedCountry.phoneCode + currentPhoneNumber;
    const isValid = validatePhoneNumber(currentPhoneNumber, currentSelectedCountry.phoneCode);
    onChange(fullNumber, isValid);
  }, [onChange, validatePhoneNumber]);

  // useEffect واحد للتعامل مع تحديثات `value` prop وتغييرات الحالة الداخلية
  useEffect(() => {
    // عند التركيب الأولي، قم باستدعاء onChange مرة واحدة فقط
    if (!isMounted.current) {
      isMounted.current = true;
      triggerOnChange(phoneNumber, selectedCountry);
      return;
    }

    // إذا تغيرت الـ `value` prop من الخارج
    if (value !== prevValueRef.current) {
      const countryFromValue = findCountryByPhoneCodePrefix(value);
      let newPhoneNumber = value;
      let newSelectedCountry = selectedCountry; 

      if (countryFromValue) {
        newSelectedCountry = countryFromValue;
        newPhoneNumber = value.replace(countryFromValue.phoneCode, '');
      } else {
        newPhoneNumber = value;
      }

      setSelectedCountry(newSelectedCountry);
      setPhoneNumber(newPhoneNumber);
      prevValueRef.current = value; // تحديث القيمة السابقة
    } else {
      // إذا لم تتغير الـ `value` prop، ولكن تغيرت الحالة الداخلية (phoneNumber أو selectedCountry)
      // قم باستدعاء onChange
      triggerOnChange(phoneNumber, selectedCountry);
    }
  }, [value, phoneNumber, selectedCountry, triggerOnChange, validatePhoneNumber]);


  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const newPhone = rawValue.replace(/[^0-9]/g, '');
    setPhoneNumber(newPhone);
  };

  return (
    <div className={twMerge("relative w-full", className)}>
      <div className="flex items-center rounded-sm bg-input border border-transparent focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200 overflow-hidden">
        {/* Country Selector (Flag + Dial Code) */}
        <div className="relative flex items-center bg-input rounded-sm px-3 py-3 border-r border-gray/10">
          <Image
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            width={40}
            height={40}
            className="object-contain mr-2 rounded-md"
            onError={(e) => { 
                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 15'%3E%3Crect width='20' height='15' fill='%23E2E8F0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='%23A0AEC0'%3E${selectedCountry.code.toUpperCase()}%3C/text%3E%3C/svg%3E`; 
            }}
          />
          {/* Custom arrow for select */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-1 text-secondary">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>

          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            className="appearance-none bg-transparent border-none text-place text-base font-normal pr-6 focus:outline-none cursor-pointer"
            style={{ minWidth: "80px" }}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.phoneCode}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          id="phoneNumberInput"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneInputChange}
          placeholder={placeholder}
          className={twMerge(
            "bg-input border-none py-3 outline-none w-full p-2 text-base rounded-sm font-normal text-secondary placeholder-place focus:ring-0",
            inputClassName
          )}
        />
      </div>
    </div>
  );
};

export default CustomPhoneInput;
