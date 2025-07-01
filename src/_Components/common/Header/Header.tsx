// src/_Components/layout/Header.tsx

"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "@/_Components/ui/Button";
import { useRouter, usePathname } from "next/navigation"; // <--- استيراد usePathname
import { twMerge } from "tailwind-merge"; // <--- استيراد twMerge

interface HeaderProps {
  isAuthenticated: boolean;
  userType?: "advertiser" | "influencer";
  userName?: string;
  userAvatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  userType,
  userName,
  userAvatarUrl,
}) => {
  const router = useRouter();
  const pathname = usePathname(); // <--- الحصول على المسار الحالي

  // تحديد ما إذا كانت الصفحة الحالية هي الـ Landing Page
  const isLandingPage = pathname === '/';

  // فئات الروابط
  const navLinkClasses = `text-place hover:text-secondary font-medium transition-colors duration-200`;

  return (
    <header
      className={twMerge(
        "py-4 px-4 md:px-10 flex items-center justify-between",
        // إخفاء الهيدر على الشاشات الصغيرة إلا إذا كانت Landing Page
        // على الديسكتوب (md:flex) يظهر دائمًا
        !isLandingPage && "hidden md:flex" // <--- هذا هو الشرط الرئيسي للتحكم في الظهور
      )}
    >
      {/* left side */}
      <div className="flex items-center space-x-8">
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo.svg" // <--- تم تصحيح المسار (بافتراض وجوده في public/icons)
              alt="Your App Logo"
              width={40}
              height={40}
              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/40x40/E2E8F0/A0AEC0?text=LOGO`; }}
            />
          </Link>
        </div>
      </div>
      {/* center */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className={twMerge(navLinkClasses, pathname === '/' ? 'text-secondary' : '')}> {/* تفعيل Home إذا كان المسار هو الجذر */}
          Home
        </Link>

        <Link href="/#about-us" className={navLinkClasses}>
          About Us
        </Link>

        <Link href="/#influencers-section" className={navLinkClasses}>
          Influencers
        </Link>
        <Link href="/#opinions" className={navLinkClasses}>
          Opinions
        </Link>

        {isAuthenticated && userType === "advertiser" && (
          <Link href="/advertiser/campaigns" className={twMerge(navLinkClasses, pathname.startsWith('/advertiser/campaigns') ? 'text-secondary' : '')}>
            Campaigns
          </Link>
        )}
        {isAuthenticated && userType === "influencer" && (
          <Link href="/influencer/opportunities" className={twMerge(navLinkClasses, pathname.startsWith('/influencer/opportunities') ? 'text-secondary' : '')}>
            Opportunities
          </Link>
        )}
      </nav>
      {/* right side */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="relative">
              <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a.997.997 0 01-.061.272m0 0A1.993 1.993 0 0014 18c0 1.1-.9 2-2 2s-2-.9-2-2c0-.529.212-1.037.587-1.418L10 17h4l-1-1zm0 0l-1-1"
                  ></path>
                </svg>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  3
                </span>
              </button>
            </div>

            <div className="relative">
              <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-gray-900 transition-colors">
                {userAvatarUrl ? (
                  <Image
                    src={userAvatarUrl}
                    alt={userName || "User"}
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-200"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/32x32/E2E8F0/A0AEC0?text=${userName ? userName.charAt(0).toUpperCase() : 'U'}`; }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}

                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
