// src/_Components/dashboard/BottomNavBar.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
interface BottomNavBarProps {
  activePath: string; // المسار النشط لتحديد الأيقونة الملونة
}
const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePath }) => {
  // تعريف مسارات الأيقونات (افتراضياً في مجلد public/icons)
  const icons = {
    opportunities: {
      active: '/opportunities-active.svg',
      inactive: '/opportunities-inactive.svg',
    },
    earnings: {
      active: '/earnings-active.svg',
      inactive: '/earnings-inactive.svg',
    },
    settings: {
      active: '/settings-active.svg',
      inactive: '/settings-inactive.svg',
    },
  };
  return (
<div className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center h-16 shadow-xl md:hidden z-50">
      {/* Opportunities Link */}
      <Link
        href="/influencer/opportunities"
        className={`flex flex-col items-center ${
          activePath === "/influencer/opportunities"
            ? "text-primary" // نص باللون الأساسي
            : "text-secondary hover:text-primary" // نص باللون الثانوي ويتحول للأساسي عند التحويم
        }`}
      >
        <Image
          // اختر مسار الصورة بناءً على حالة activePath
          src={activePath === "/influencer/opportunities" ? icons.opportunities.active : icons.opportunities.inactive}
          alt="Opportunities Icon"
          width={30}
          height={30}
          className="mb-1"
          onError={(e) => { // fallback لأي أيقونة مفقودة
            (e.target as HTMLImageElement).src = ''; // استخدم أيقونة افتراضية آمنة
          }}
        />
        <span className="text-xs">Opportunities</span>
      </Link>

      {/* My Earnings Link */}
      <Link
        href="/influencer/earnings"
        className={`flex flex-col items-center ${
          activePath === "/influencer/earnings"
            ? "text-primary"
            : "text-secondary hover:text-primary"
        }`}
      >
        <Image
          src={activePath === "/influencer/earnings" ? icons.earnings.active : icons.earnings.inactive}
          alt="My Earnings Icon"
          width={30}
          height={30}
          className="mb-1"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '';
          }}
        />
        <span className="text-xs">My Earnings</span>
      </Link>

      {/* Settings/Profile Link */}
      <Link
        href="/settings" // هذا هو المسار الذي يؤدي لصفحة الإعدادات/البروفايل
        className={`flex flex-col items-center ${
          activePath === "/settings"
            ? "text-primary"
            : "text-secondary hover:text-primary"
        }`}
      >
        <Image
          src={activePath === "/settings" ? icons.settings.active : icons.settings.inactive}
          alt="Settings Icon"
          width={30}
          height={30}
          className="mb-1"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '';
          }}
        />
        <span className="text-xs">Settings</span>
      </Link>
    </div>
  );
};

export default BottomNavBar;
