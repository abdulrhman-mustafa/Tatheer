// src/app/(dashboard)/influencer/earnings/page.tsx

'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SearchBar from '@/_Components/dashboard/SearchBar'; 
import BottomNavBar from '@/_Components/dashboard/BottomNavBar';
import EarningCard from '@/_Components/dashboard/EarningCard';
import Back from '@/_Components/auth/Back';
import { mockUsers, mockCampaigns } from '@/data/mockData';
import { AdvertiserProfile, User} from '@/types/user';
import { timeAgo } from '@/utils/timeAgo';
import { EarningCardData } from '@/types/earning'; 
import DashboardHeader from '@/_Components/dashboard/DashboardHeader';

export default function InfluencerEarningsPage() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [clientEarningsData, setClientEarningsData] = useState<EarningCardData[]>([]);
  const [selectedEarnings, setSelectedEarnings] = useState<Set<string>>(new Set());

  const currentUser = mockUsers.find(
      user => user.name === 'Mahmoud Hanafi' && user.role === 'influencer'
    ) as User | undefined;
  
    const user = currentUser || {
      name: 'User',
      avatarUrl: '/avatar.svg',
      notifications: 0,
      role: 'user',
    };


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
    console.log(`Withdrawal Request button clicked for earning ID: ${earningId}`);
    showToastMessage(`Withdrawal request initiated for earning ID: ${earningId} (mock).`);
  }, [showToastMessage]);

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

  const baseEarningsData = useMemo(() => {
    return mockCampaigns.map(campaign => {
      const advertiser = mockUsers.find(u => u.id === campaign.advertiserId) as AdvertiserProfile | undefined;

      const currentFixedPrice = campaign.budget / 10; 

      return {
        id: campaign.id,
        brandLogoUrl: advertiser?.brandLogoUrl || 'logo.svg',
        brandHeadline: advertiser?.brandTagline || "Default Brand Tagline",
        productName: campaign.title,
        description: campaign.description,
        createdAt: campaign.createdAt,
        earningCardImageUrl: campaign.earningCardImageUrl || '',
        clickCount: Math.floor(Math.random() * 5000) + 100,
        fixedPrice: currentFixedPrice,
        isWithdrawalPossible: currentFixedPrice >= 100,
      };
    });
  }, []); 

  useEffect(() => {
    const updatedEarnings: EarningCardData[] = baseEarningsData.map(earning => ({
      ...earning,
      postedTime: timeAgo(earning.createdAt),
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
      </div>
      <div className="hidden md:flex">
        <DashboardHeader
          userName={user.name}
          userAvatarUrl={user.avatarUrl || '/avatar.svg'}
          notificationsCount={user.notifications ?? 0}
        />
        <SearchBar
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='md:w-full'
          notificationsCount={user.notifications ?? 0}
        />
      </div>

      <div className="flex-grow p-4 space-y-6 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:space-y-0">
        {filteredEarningsData.length > 0 ? (
          filteredEarningsData.map((earning) => (
            <EarningCard
              key={earning.id}
              {...earning}
              onWithdrawalRequest={handleWithdrawalRequest}
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
