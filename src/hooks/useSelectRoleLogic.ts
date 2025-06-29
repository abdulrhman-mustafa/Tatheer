// src/hooks/useSelectRoleLogic.ts

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseSelectRoleLogicReturn {
  handleRoleSelection: (role: 'advertiser' | 'influencer') => void;
}

// الخطاف المخصص لإدارة منطق اختيار الدور وتسجيل المستخدم الجديد
export const useSelectRoleLogic = (): UseSelectRoleLogicReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // الحصول على جميع البيانات التي تم تمريرها من صفحة verify-otp
  const personalName = searchParams.get("personalName") || "";
  const initialContactInfo = searchParams.get("initialContactInfo") || "";
  const initialIsPhoneNumber = searchParams.get("initialIsPhoneNumber") === "true";
  const secondaryContactInfo = searchParams.get("secondaryContactInfo") || "";
  const secondaryIsPhoneNumber = searchParams.get("secondaryIsPhoneNumber") === "true";

  const handleRoleSelection = useCallback((role: 'advertiser' | 'influencer') => {
    console.log(`User selected role: ${role}`);

    // لن نقوم بتسجيل المستخدم في mockUsers إلا بعد إكمال جميع التفاصيل.
    // بدلاً من ذلك، سنوجهه إلى صفحة التفاصيل الخاصة بالدور، مع تمرير البيانات.

    if (role === 'influencer') {
      // توجيه إلى صفحة تفاصيل المؤثر
      router.push(
        `/register/influencer-details?personalName=${encodeURIComponent(personalName)}` +
        `&initialContactInfo=${encodeURIComponent(initialContactInfo)}` +
        `&initialIsPhoneNumber=${initialIsPhoneNumber}` +
        `&secondaryContactInfo=${encodeURIComponent(secondaryContactInfo)}` +
        `&secondaryIsPhoneNumber=${secondaryIsPhoneNumber}`
      );
    } else if (role === 'advertiser') {
      // توجيه إلى صفحة تفاصيل المعلن
      router.push(
        `/register/advertiser-details?personalName=${encodeURIComponent(personalName)}` +
        `&initialContactInfo=${encodeURIComponent(initialContactInfo)}` +
        `&initialIsPhoneNumber=${initialIsPhoneNumber}` +
        `&secondaryContactInfo=${encodeURIComponent(secondaryContactInfo)}` +
        `&secondaryIsPhoneNumber=${secondaryIsPhoneNumber}`
      );
    } else {
      // حالة غير متوقعة
      router.push('/login'); // fallback
    }

  }, [personalName, initialContactInfo, initialIsPhoneNumber, secondaryContactInfo, secondaryIsPhoneNumber, router]);

  return {
    handleRoleSelection,
  };
};
