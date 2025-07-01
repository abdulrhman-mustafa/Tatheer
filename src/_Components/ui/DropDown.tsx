// src/_Components/ui/DropDown.tsx

"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

// تعريف واجهة الخيارات
export interface DropdownOption {
  value: string;
  label: string;
  // يمكنك إضافة أيقونة هنا إذا أردت عرض أيقونات بجانب الخيارات
  // icon?: string;
}

interface DropDownProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // ستبقى هذه الواجهة لتوافق الخطاف
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  className?: string; // فئات إضافية للمكون الرئيسي
}

const DropDown: React.FC<DropDownProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // القيمة المعروضة في حقل الإدخال (label وليس value)
  const [displayValue, setDisplayValue] = useState<string>(
    options.find(option => option.value === value)?.label || placeholder || ''
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // تحديث القيمة المعروضة عندما تتغير قيمة الـ prop
  useEffect(() => {
    setDisplayValue(options.find(option => option.value === value)?.label || placeholder || '');
  }, [value, options, placeholder]);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = useCallback((optionValue: string, optionLabel: string) => {
    // إنشاء حدث تغيير اصطناعي ليتوافق مع واجهة onChange في الخطاف
    const syntheticEvent = {
      target: {
        id: id,
        name: name,
        value: optionValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>; // Cast to the expected event type

    onChange(syntheticEvent);
    setDisplayValue(optionLabel);
    setIsOpen(false);
  }, [id, name, onChange]);

  return (
    <div className={twMerge("relative", className)} ref={dropdownRef}>
      <label htmlFor={id} className="text-base font-normal block mb-3 text-secondary">
        {label}
      </label>
      <div
        id={id}
        className={twMerge(
          "flex items-center justify-between w-full px-5 py-3 rounded-sm bg-input cursor-pointer border",
          error ? 'border-red-500' : 'border-transparent',
          'focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200'
        )}
        onClick={() => setIsOpen(!isOpen)}
        role="combobox"
        aria-controls="dropdown-list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label`}
      >
        <span className={twMerge("text-base font-normal", displayValue === placeholder ? 'text-place' : 'text-secondary')}>
          {displayValue}
        </span>
        <svg
          className={twMerge(
            "h-5 w-5 text-gray-700 transform transition-transform duration-300",
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <ul
          className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-auto"
          role="listbox"
          aria-labelledby={`${id}-label`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
              className={twMerge(
                "px-5 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-100",
                value === option.value ? 'bg-primary text-white hover:bg-primary-dark' : 'text-secondary'
              )}
              role="option"
              aria-selected={value === option.value}
            >
              {/* إذا كان لديك أيقونات في المستقبل، يمكنك عرضها هنا */}
              {/* {option.icon && <Image src={option.icon} alt="" width={20} height={20} className="mr-2" />} */}
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-red-500 text-xs italic mt-2">{error}</p>
      )}
    </div>
  );
};

export default React.memo(DropDown); // استخدام React.memo لتحسين الأداء
