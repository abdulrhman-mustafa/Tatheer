"use client";
import React from 'react';

import { useRouter } from 'next/navigation';


const AuthHeader: React.FC = () => {
  const router = useRouter();

  return (
    <>
        <div className="absolute top-8 left-6 md:hidden block">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
    </>
  );
};

export default AuthHeader;
