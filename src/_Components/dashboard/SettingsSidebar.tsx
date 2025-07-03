// src/_Components/dashboard/SettingsSidebar.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/_Components/ui/Modal";
import Button from "@/_Components/ui/Button";

const SettingsSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = () => {
    closeLogoutModal();
    logout();
    router.push("/login");
  };

  const sidebarItems = [
    {
      name: "My Profile",
      icon: "/user.svg",
      href: "/settings/profile/details",
    },
    { name: "Wallet", icon: "/wallet.svg", href: "/settings/wallet" },
    {
      name: "Privacy Policy",
      icon: "/privacy.svg",
      href: "/settings/privacy-policy",
    },
    {
      name: "Terms of Use",
      icon: "/terms.svg",
      href: "/settings/terms-of-use",
    },
    { name: "Technical Support", icon: "/call.svg", href: "/settings/support" },
    { name: "Different Account", icon: "/different.svg", href: "/login" },

    { name: "Log Out", icon: "/logout.svg", href: "#", isLogout: true },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/settings" && pathname.startsWith("/settings")) {
      return true;
    }

    return pathname.startsWith(href) && href !== "#";
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();

    openLogoutModal();
  };

  return (
    <div className="w-64 rounded-sm flex flex-col">
      <nav className="flex flex-col space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={twMerge(
              "flex items-center p-3 rounded-sm transition-colors duration-200",
              item.isLogout
                ? "bg-red-600 text-white hover:bg-red-700"
                : isActiveLink(item.href)
                ? "bg-primary opacity-50 text-white"
                : "text-secondary hover:bg-input"
            )}
            onClick={item.isLogout ? handleLogoutClick : undefined}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={20}
              height={20}
              className={twMerge(
                "mr-3 object-contain",

                isActiveLink(item.href) || item.isLogout
                  ? "filter brightness-0 invert"
                  : ""
              )}
            />
            <span
              className={twMerge(
                "font-medium",
                item.isLogout ? "text-white" : ""
              )}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

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
    </div>
  );
};

export default SettingsSidebar;
