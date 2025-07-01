// src/app/(dashboard)/influencer/earnings/page.tsx

'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SearchBar from '@/_Components/dashboard/SearchBar'; 
import BottomNavBar from '@/_Components/dashboard/BottomNavBar';
import EarningCard from '@/_Components/dashboard/EarningCard';
import Back from '@/_Components/auth/Back';
import { mockUsers, mockCampaigns, AdvertiserProfile } from '@/data/mockData';
import { timeAgo } from '@/utils/timeAgo';
import { EarningCardData } from '@/types/earning'; // <--- تمت الإضافة: استيراد الواجهة

export default function InfluencerEarningsPage() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // استخدام الواجهة المحددة بدلاً من 'any'
  const [clientEarningsData, setClientEarningsData] = useState<EarningCardData[]>([]);
  // حالة لتتبع الكروت المحددة
  const [selectedEarnings, setSelectedEarnings] = useState<Set<string>>(new Set());


  const showToastMessage = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleWithdrawalRequest = useCallback((earningId: string) => {
    // <--- تم تصحيح الـ template literals هنا
    console.log(`Withdrawal Request button clicked for earning ID: ${earningId}`);
    showToastMessage(`Withdrawal request initiated for earning ID: ${earningId} (mock).`);
  }, [showToastMessage]);

  // دالة لمعالجة تحديد/إلغاء تحديد الكارت
  const handleSelectEarning = useCallback((earningId: string) => {
    setSelectedEarnings(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(earningId)) {
        newSelected.delete(earningId);
      } else {
        newSelected.add(earningId);
      }
      return newSelected;
    });
  }, []);

  // Use useMemo for the base data that is static from mockCampaigns/mockUsers
  const baseEarningsData = useMemo(() => {
    return mockCampaigns.map(campaign => {
      const advertiser = mockUsers.find(u => u.id === campaign.advertiserId) as AdvertiserProfile | undefined;

      const currentFixedPrice = campaign.budget / 10; 

      return {
        id: campaign.id,
        brandLogoUrl: advertiser?.brandLogoUrl || '/images/logos/default-brand-logo.png',
        brandHeadline: advertiser?.brandTagline || "Default Brand Tagline",
        productName: campaign.title,
        description: campaign.description,
        createdAt: campaign.createdAt, // Pass raw createdAt date for client-side processing
        earningCardImageUrl: campaign.earningCardImageUrl || '/images/earnings/default-earning.jpg',
        clickCount: Math.floor(Math.random() * 5000) + 100,
        fixedPrice: currentFixedPrice,
        isWithdrawalPossible: currentFixedPrice >= 100,
      };
    });
  }, []); // إضافة dependencies لتجنب التحذيرات

  // Use useEffect to calculate and set client-specific data AFTER hydration
  useEffect(() => {
    const updatedEarnings: EarningCardData[] = baseEarningsData.map(earning => ({
      ...earning,
      postedTime: timeAgo(earning.createdAt), // Calculate timeAgo only on the client
    }));
    setClientEarningsData(updatedEarnings);
  }, [baseEarningsData]);

  const filteredEarningsData = useMemo(() => {
    return clientEarningsData.filter(earning =>
      earning.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earning.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earning.brandHeadline.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clientEarningsData, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen text-secondary pb-16 md:pb-0">
      <div className="md:hidden p-4">
        <div className=" flex justify-between items-center mt-4">
            <Back/>
            <h1 className="text-xl font-medium text-center flex-grow">My Earnings</h1>
        </div>
        <SearchBar
          placeholder="Search earnings"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='md:w-full'
        />
      </div>

      <div className="flex-grow p-4 space-y-6 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:space-y-0">
        {filteredEarningsData.length > 0 ? (
          filteredEarningsData.map((earning) => (
            <EarningCard
              key={earning.id}
              {...earning}
              onWithdrawalRequest={handleWithdrawalRequest}
              // <--- تمت الإضافة: تمرير isSelected و onSelect
              isSelected={selectedEarnings.has(earning.id)}
              onSelect={() => handleSelectEarning(earning.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500 mt-8">
            No earnings found matching your search.
          </p>
        )}
      </div>

      <BottomNavBar activePath={pathname} />

      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
