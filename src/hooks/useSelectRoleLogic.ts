"use client";

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseSelectRoleLogicReturn {
  handleRoleSelection: (role: 'advertiser' | 'influencer') => void;
}
export const useSelectRoleLogic = (): UseSelectRoleLogicReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const personalName = searchParams.get("personalName") || "";
  const initialContactInfo = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";
  const secondaryIsPhoneNumber = searchParams.get("secondaryIsPhoneNumber") === "true";

  const handleRoleSelection = useCallback((role: 'advertiser' | 'influencer') => {
    console.log(`User selected role: ${role}`);


    if (role === 'influencer') {
      router.push(
        `/register/influencer-details?personalName=${encodeURIComponent(personalName)}` +
        `&initialContactInfo=${encodeURIComponent(initialContactInfo)}` +
        `&initialIsPhoneNumber=${initialIsPhoneNumber}` +
        `&secondaryContactInfo=${encodeURIComponent(secondaryContactInfo)}` +
        `&secondaryIsPhoneNumber=${secondaryIsPhoneNumber}`
      );
    } else if (role === 'advertiser') {
      router.push(
        `/register/advertiser-details?personalName=${encodeURIComponent(personalName)}` +
        `&initialContactInfo=${encodeURIComponent(initialContactInfo)}` +
        `&initialIsPhoneNumber=${initialIsPhoneNumber}` +
        `&secondaryContactInfo=${encodeURIComponent(secondaryContactInfo)}` +
        `&secondaryIsPhoneNumber=${secondaryIsPhoneNumber}`
      );
    } else {
      router.push('/login');
    }

  }, [personalName, initialContactInfo, initialIsPhoneNumber, secondaryContactInfo, secondaryIsPhoneNumber, router]);

  return {
    handleRoleSelection,
  };
};