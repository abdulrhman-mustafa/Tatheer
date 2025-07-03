"use client";

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseSelectRoleLogicReturn {
  handleRoleSelection: (role: 'advertiser' | 'influencer') => void;
}

export const useSelectRoleLogic = (): UseSelectRoleLogicReturn => {
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams(searchParams); 
    return params.toString(); 
  }, [searchParams]); 

  // دالة اختيار الدور اللي المستخدم هيختاره
  const handleRoleSelection = useCallback((role: 'advertiser' | 'influencer') => {
    console.log(`User selected role: ${role}`);

    const queryParams = buildQueryParams(); 

    if (role === 'influencer') {
      router.push(`/register/influencer-details?${queryParams}`);
    } else if (role === 'advertiser') {
      router.push(`/register/advertiser-details?${queryParams}`);
    } else {

      router.push('/login');
    }
  }, [router, buildQueryParams]);

  return {
    handleRoleSelection,
  };
};