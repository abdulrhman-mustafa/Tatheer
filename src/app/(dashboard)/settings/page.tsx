// src/app/(auth)/settings/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import Back from "@/_Components/auth/Back";
import BottomNavBar from "@/_Components/dashboard/BottomNavBar";
import Switch from "@/_Components/ui/SwitchToggle";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/_Components/ui/Modal";
import Button from "@/_Components/ui/Button";

export default function SettingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  // حالات التبديل للإعدادات
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [mobilePushEnabled, setMobilePushEnabled] = useState<boolean>(true);
  const [desktopNotificationEnabled, setDesktopNotificationEnabled] =
    useState<boolean>(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState<boolean>(true);

  // <<-- هنا نضيف تعريف الـ state الخاص بالـ Modal -->>
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = () => {
    closeLogoutModal();
    logout();
    router.push("/login");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    console.log("Language changed to:", e.target.value);
  };

  const settingsOptions = [
    {
      name: "Profile",
      icon: "/user.svg",
      link: "/settings/profile/details",
    },
    {
      name: "Wallet",
      icon: "/wallet.svg",
      link: "/settings/wallet",
    },
    {
      name: "Privacy Policy",
      icon: "/privacy.svg",
      link: "/settings/privacy-policy",
    },
    {
      name: "Terms of Use",
      icon: "/terms.svg",
      link: "/settings/terms-of-use",
    },
    {
      name: "Technical Support",
      icon: "/call.svg",
      link: "/settings/support",
    },
    {
      name: "Receive Notifications",
      icon: "/notification3.svg",
      type: "toggle",
    },
    {
      name: "Different Account",
      icon: "/different.svg",
      link: "/login",
    },
    {
      name: "Log Out",
      icon: "/logout.svg",
      type: "logout",
    },
  ];

  const handleOptionClick = (option: {
    name: string;
    link?: string;
    type?: string;
  }) => {
    if (option.link) {
      router.push(option.link);
    } else if (option.type === "logout") {
      openLogoutModal();
    }
  };

  return (
    <div className="md:bg-gray-50 rounded-sm">
      <div className="p-4 text-secondary md:hidden">
        <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4 md:hidden">
          <Back />
          <h1 className="text-xl font-medium text-center flex-grow">Profile</h1>
        </div>

        {/* Settings Options List */}
        <div className="flex-1">
          <div>
            {settingsOptions.map((option, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-3 cursor-pointer hover:bg-input hover:rounded-sm transition-colors ${
                  option.type === "toggle" ? "" : "group"
                }`}
                // بنضيف onClick هنا، لكن بنتحقق من النوع عشان التوجل ميعملش push
                onClick={() =>
                  option.type !== "toggle" && handleOptionClick(option)
                }
              >
                <div className="flex items-center space-x-4">
                  {option.icon ? (
                    <Image
                      src={option.icon}
                      alt={option.name}
                      width={24}
                      height={24}
                      className="text-place"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://placehold.co/24x24/E2E8F0/A0AEC0?text=${option.name.substring(
                          0,
                          1
                        )}`;
                      }}
                    />
                  ) : (
                    <span className="text-place w-6 h-6 flex items-center justify-center">
                      ?
                    </span>
                  )}
                  <span
                    className={`text-base font-medium ${
                      option.type === "logout"
                        ? "text-red-500"
                        : "text-secondary"
                    }`}
                  >
                    {option.name}
                  </span>
                </div>

                {option.type === "toggle" ? (
                  <Switch
                    checked={receiveNotifications} 
                    onCheckedChange={setReceiveNotifications} 
                    className={`${
                      receiveNotifications ? "bg-green-400" : "bg-gray-200"
                    }`}
                  />
                ) : (
                  <svg
                    className={`w-5 h-5 text-place group-hover:text-primary transition-colors ${
                      option.type === "logout"
                        ? "text-red-400 group-hover:text-red-600"
                        : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        <Modal
          isOpen={isLogoutModalOpen}
          onClose={closeLogoutModal}
          title="Confirm Logout"
          describtion="Are you sure you want to log out? You will be redirected to the login page."
          iconSrc="/logout.svg"
          className="max-w-sm text-center"
        >
          <div className="flex justify-center gap-3 mt-4">
            <Button onClick={closeLogoutModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleConfirmLogout}>Yes, Logout</Button>
          </div>
        </Modal>
        {/* Bottom Navigation Bar */}
        <BottomNavBar activePath={pathname} />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block p-4">
        {/* Desktop Header for this section */}
        <h2 className="hidden md:block text-xl font-bold p-4">Settings</h2>{" "}
        {/* غيرت العنوان لـ Settings */}
        {/* Main Content Area */}
        <div className="p-4 space-y-4">
          {/* Language Selection */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex flex-col">
              <span className="text-base font-medium text-secondary">
                Language
              </span>
              <span className="text-sm text-place">Select your language</span>
            </div>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="block appearance-none w-full bg-input text-secondary py-2 px-4 pr-8 rounded-sm focus:outline-none "
              >
                <option>English</option>
                <option>العربية</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Notification Toggles */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex flex-col">
              <span className="text-base font-medium text-secondary">
                Mobile Push Notifications
              </span>
              <span className="text-sm text-place">
                Receive push notification
              </span>
            </div>
            <Switch
              checked={mobilePushEnabled}
              onCheckedChange={setMobilePushEnabled}
              className={`${
                mobilePushEnabled ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          </div>

          <div className="flex items-center justify-between pb-4">
            <div className="flex flex-col">
              <span className="text-base font-medium text-secondary">
                Desktop Notification
              </span>
              <span className="text-sm text-place">
                Receive push notification in desktop
              </span>
            </div>
            <Switch
              checked={desktopNotificationEnabled}
              onCheckedChange={setDesktopNotificationEnabled}
              className={`${
                desktopNotificationEnabled ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base font-medium text-secondary">
                Email Notifications
              </span>
              <span className="text-sm text-place">
                Receive email notification
              </span>
            </div>
            <Switch
              checked={emailNotificationsEnabled}
              onCheckedChange={setEmailNotificationsEnabled}
              className={`${
                emailNotificationsEnabled ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
