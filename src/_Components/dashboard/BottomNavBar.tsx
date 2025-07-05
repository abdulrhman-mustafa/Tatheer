// src/_Components/dashboard/BottomNavBar.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface BottomNavBarProps {
  activePath: string;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePath }) => {
  const { userRole } = useAuth();

  const influencerNavItems = [
    {
      name: "Opportunities",
      href: "/influencer/opportunities",
      icon: {
        active: "/opportunities-active.svg",
        inactive: "/opportunities-inactive.svg",
      },
    },
    {
      name: "My Earnings",
      href: "/influencer/earnings",
      icon: {
        active: "/earnings-active.svg",
        inactive: "/earnings-inactive.svg",
      },
    },
    {
      name: "Settings",
      href: "/settings",
      icon: {
        active: "/settings-active.svg",
        inactive: "/settings-inactive.svg",
      },
    },
  ];

  const advertiserNavItems = [
    {
      name: "Campaigns",
      href: "/advertiser/campaigns",
      icon: {
        active: "/campaigns-active.svg",
        inactive: "/campaigns-inactive.svg",
      },
    },
    {
      name: "Profile",
      href: "/settings",
      icon: {
        active: "/settings-active.svg",  
        inactive: "/settings-inactive.svg",
      },
    },
  ];

  const navItems = userRole === "advertiser" ? advertiserNavItems : influencerNavItems;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center h-16 shadow-xl md:hidden z-50">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex flex-col items-center ${
            activePath === item.href
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <Image
            src={activePath === item.href ? item.icon.active : item.icon.inactive}
            alt={`${item.name} Icon`}
            width={30}
            height={30}
            className="mb-1 w-auto h-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
            }}
          />
          <span className="text-xs">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavBar;