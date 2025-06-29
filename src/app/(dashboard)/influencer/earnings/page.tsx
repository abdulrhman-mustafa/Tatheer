// src/app/(dashboard)/influencer/earnings/page.tsx

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Back from '@/_Components/auth/Back';
import { Button } from '@/_Components/ui/Button'; // تم إعادة استيراد Button هنا
import BottomNavBar from '@/_Components/dashboard/BottomNavBar';
import EarningCard from '@/_Components/dashboard/EarningCard';

// تأكد من مسار mockData الخاص بك
import { mockUsers, mockCampaigns, AdvertiserProfile } from '@/data/mockData'; // تم إعادته إلى @/lib/mockUsers

export default function InfluencerEarningsPage() {
  const pathname = usePathname();

  // دالة لمعالجة طلب السحب لكل بطاقة
  const handleWithdrawalRequest = (earningId: string) => {
    console.log(`Withdrawal Request button clicked for earning ID: ${earningId}`);
    alert(`Withdrawal request initiated for earning ID: ${earningId} (mock).`);
  };

  // محاكاة بيانات الأرباح
  const earningsData = mockCampaigns.map(campaign => {
    const advertiser = mockUsers.find(u => u.id === campaign.advertiserId) as AdvertiserProfile | undefined;
    const currentFixedPrice = campaign.budget / 10; // مثال: 10% من ميزانية الحملة كربح

    return {
      id: campaign.id,
      brandLogoUrl: advertiser?.brandLogoUrl || '/images/logos/default-brand-logo.png',
      brandHeadline: "Your skin deserves the best",
      productName: campaign.title,
      description: campaign.description,
      postedTime: `Posted ${Math.floor(Math.random() * 60) + 1} minutes ago`,
      imageUrl: campaign.imageUrl || '/images/campaigns/default-product.png',
      clickCount: Math.floor(Math.random() * 5000) + 100,
      postedSinceDays: Math.floor(Math.random() * 30) + 1,
      fixedPrice: currentFixedPrice,
      isWithdrawalPossible: currentFixedPrice >= 100, // تحديد ما إذا كان السحب ممكنًا (>= 100)
    };
  });

  return (
    <div className="flex flex-col items-center  p-4 text-secondary">
      {/* Top Bar - Back Button and Title */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow">My Earnings</h1>
      </div>

      {/* Earnings Cards Section */}
      <div className="flex-grow p-4 space-y-6">
        {earningsData.map((earning) => (
          <React.Fragment key={earning.id}> {/* استخدام Fragment لتجميع البطاقة والزر */}
            <EarningCard
              key={earning.id}
              {...earning}
            />
            {/* Withdrawal Request Button - الآن خارج البطاقة ومكرر لكل منها */}
            <div className=" -mt-4 mb-2"> {/* -mt-4 لسحب الزر لأعلى قليلاً ليكون أقرب للبطاقة */}
              <Button
                onClick={() => handleWithdrawalRequest(earning.id)}
                size='medium'
                className="w-full"
                disabled={!earning.isWithdrawalPossible} // تعطيل الزر إذا لم يكن السحب ممكنًا
              >
                Withdrawal Request
              </Button>
              {!earning.isWithdrawalPossible && (
                <p className="text-center text-xs text-place mt-2">over $100</p>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      <BottomNavBar activePath={pathname} />
    </div>
  );
}
