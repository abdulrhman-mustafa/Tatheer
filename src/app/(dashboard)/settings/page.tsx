// src/app/(dashboard)/settings/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import Back from "@/_Components/auth/Back";
import BottomNavBar from "@/_Components/dashboard/BottomNavBar";
import { Switch } from "@/_Components/ui/SwitchToggle";

export default function SettingsPage() {
    const router = useRouter();
    const pathname = usePathname();


const [receiveNotifications, setReceiveNotifications] = useState(true);


const settingsOptions = [
    {
        name: "Profile",
        icon: "/user.svg",
        link: "/profile/details",
    }, 
    { 
        name: "Wallet", 
        icon: "/wallet.svg", 
        link: "/wallet" 
    },
    {
        name: "Privacy Policy",
        icon: "/privacy.svg",
        link: "/privacy-policy",
    },
    { 
        name: "Terms of Use", 
        icon: "/terms.svg", 
        link: "/terms-of-use" 
    },
    { 
        name: "Technical Support", 
        icon: "/call.svg", 
        link: "/support" 
    },
    { 
        name: "Receive Notifications", 
        icon: "/notification3.svg", 
        type: "toggle" 
    },
    {
        name: "Different Account",
        icon: "/different.svg",
        link: "/login",
    },
    { 
        name: "Log Out", 
        icon: "/logout.svg", 
        type: "logout" 
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

        console.log("Logging out");

        router.push("/login");
    }

};

return (
    <div className="p-4 text-secondary">
        <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
            <Back />
            <h1 className="text-xl font-medium text-center flex-grow md:hidden">Profile</h1>
        </div>

      {/* Settings Options List */}
        <div className="flex-1">
            <div>
            {settingsOptions.map((option,index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between py-3 cursor-pointer hover:bg-input hover:rounded-sm transition-colors ${
                    option.type === "toggle" ? "" : "group"
                    }`}
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
                            onError={(e) => {(e.target as HTMLImageElement
                                ).src = `https://placehold.co/24x24/E2E8F0/A0AEC0?text=${option.name.substring(0,1)}`;
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
                )
            )}
            </div>
        </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activePath={pathname} />
    </div>
);
}
