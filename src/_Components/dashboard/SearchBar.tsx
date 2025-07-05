// src/_Components/dashboard/SearchBar.tsx

"use client";

import React from "react";
import Image from "next/image";
import Input from "@/_Components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import Button from "@/_Components/ui/Button";
import NotificationButton from "@/_Components/dashboard/NotificationButton";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;

  createCampaign?: () => void;
  allTimes?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search",
  className,
  createCampaign,
  allTimes,
}) => {
  const { userRole } = useAuth();
  const isAdvertiser = userRole === "advertiser";

  return (
    <div
      className={`${className} mt-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4`}
    >
      {/* Search Bar */}
      <div className="relative w-full md:flex-grow">
        <Input
          id="search"
          className="pl-10"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Image
          src="/search.svg"
          alt="Search Icon"
          width={20}
          height={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {isAdvertiser && (
        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
          {/* زر Create New Campaign */}
          <Button
            onClick={createCampaign}
            variant="primary"
            size="medium"
            className="whitespace-nowrap bg-gray-800 hover:bg-gray-900 w-full md:w-auto flex items-center justify-center"
          >
            <Image
              src="/icons/plus.svg"
              alt="Plus Icon"
              width={20}
              height={20}
              className="w-auto h-auto"
            />
            Create New Campaign
          </Button>
          <Button
            onClick={allTimes}
            variant="primary"
            size="medium"
            className="whitespace-nowrap bg-gray-800 hover:bg-gray-900 w-full md:w-auto flex items-center justify-center"
          >
            <Image
              src="/icons/calendar.svg"
              alt="Calendar Icon"
              width={20}
              height={20}
              className="w-auto h-auto"
            />
            All Times
          </Button>
        </div>
      )}

      {/* Notification Button */}
      <NotificationButton className="hidden md:flex" />
    </div>
  );
};

export default SearchBar;
