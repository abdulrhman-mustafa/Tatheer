// src/app/(auth)/register/select-role/page.tsx

"use client";

import React from "react";
import WelcomeHeader from "@/_Components/auth/WelcomeHeader";
import Back from "@/_Components/auth/Back";
import { useSelectRoleLogic } from "@/hooks/useSelectRoleLogic"; 

const SelectRolePage = () => {
  const { handleRoleSelection } = useSelectRoleLogic(); 

  return (
    <div className="flex flex-col items-center justify-center p-4 text-secondary">
      <div className="w-full max-w-md flex justify-center items-center mb-8 mt-4">
        <Back />
        <WelcomeHeader />
      </div>

      <div className="flex flex-col justify-center w-full max-w-md ">
        <h2 className="text-xl font-bold mb-4">Who are you?</h2>
        <p className="text-place mb-8">
          Tatheer is a platform that simplifies influencer marketing for advertisers
          create campaigns, influencers promote them, and get paid per quality
          click.
        </p>

        <div className="w-full space-y-6">
          {/* بطاقة دور المؤثر */}
          <div
            onClick={() => handleRoleSelection("influencer")}
            className="
              group
              flex flex-col items-start p-6 rounded-sm border border-place 
              bg-input
              transition-all duration-200 ease-in-out cursor-pointer
              relative overflow-hidden
              hover:bg-primary
            "
          >
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="text-xl font-medium text-primary group-hover:text-white">
                Influencers
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary border border-primary group-hover:text-white group-hover:border-white rounded-full p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <p className="text-place text-base group-hover:text-white">
              Earn more by promoting ads on your Twitter account.
            </p>
          </div>

          {/* بطاقة دور المعلن */}
          <div
            onClick={() => handleRoleSelection("advertiser")}
            className="
              group
              flex flex-col items-start p-6 rounded-sm border border-place 
              bg-input
              transition-all duration-200 ease-in-out cursor-pointer
              relative overflow-hidden
              hover:bg-primary
            "
          >
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="text-xl font-medium text-primary group-hover:text-white">
                Advertisers
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary border border-primary group-hover:text-white group-hover:border-white rounded-full p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <p className="text-place text-base group-hover:text-white">
              Grow your business through influencer-powered, pay-per-click campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRolePage;
