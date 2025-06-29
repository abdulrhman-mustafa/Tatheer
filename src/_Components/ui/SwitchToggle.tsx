// src/_Components/ui/Switch.tsx

import React from 'react';

// تعريف الواجهة لـ props التي سيتلقاها مكون Switch
interface SwitchProps {
  checked: boolean; // تحدد ما إذا كان التبديل في حالة "تشغيل" أم "إيقاف"
  onCheckedChange: (checked: boolean) => void; // دالة يتم استدعاؤها عند تغيير حالة التبديل
  className?: string; // لتمكين تمرير classes إضافية من Tailwind CSS
}

// مكون Switch باستخدام React.FC لتحديد نوع المكون الوظيفي
export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className }) => {
    return (

    <button
        type="button"
        role="switch" 
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
            rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out 
            focus:outline-none
            ${checked ? 'bg-primary' : 'bg-gray-200'} 
            ${className || ''}
    `}
    >
        <span
            aria-hidden="true"
            className={`
                pointer-events-none inline-block h-5 w-5 transform 
                rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${checked ? 'translate-x-5' : 'translate-x-0'} // تحريك الدائرة بناءً على الحالة
            `}
        />
    </button>
);
};

export default Switch;
