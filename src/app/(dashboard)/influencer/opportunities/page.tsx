// src/app/(dashboard)/influencer/opportunities/page.tsx

'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import DashboardHeader from '@/_Components/dashboard/DashboardHeader';
import SearchBar from '@/_Components/dashboard/SearchBar';
import CampaignCard from '@/_Components/dashboard/CampaignCard';
import BottomNavBar from '@/_Components/dashboard/BottomNavBar';
import { mockUsers, mockCampaigns } from '@/data/mockData';
import { User, AdvertiserProfile } from '@/types/user';
import { useRouter } from 'next/navigation';



export default function InfluencerOpportunitiesPage() {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = mockUsers.find(
    user => user.name === 'Mahmoud Hanafi' && user.role === 'influencer'
  ) as User | undefined;

  const user = currentUser || {
    name: 'User',
    avatarUrl: '/avatar.svg',
    notifications: 0,
    role: 'user',
  };

  const [searchTerm, setSearchTerm] = useState<string>('');

  const getAdvertiserData = (advertiserId: string) => {
    const advertiser = mockUsers.find(u => u.id === advertiserId && u.role === 'advertiser') as AdvertiserProfile | undefined;
    return {
      logoUrl: advertiser?.brandLogoUrl || '/icons/logo.svg',
      tagline: advertiser?.brandTagline || "Default Brand Tagline",
    };
  };

  const handleParticipateClick = (campaignId: string) => {
    router.push(`/influencer/opportunities/${campaignId}`);
  };

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col min-h-screen text-secondary pb-16 md:pb-0">
      <div className="md:flex md:items-center">
        <DashboardHeader
          userName={user.name}
          userAvatarUrl={user.avatarUrl || '/avatar.svg'}
        />
        <SearchBar
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='md:w-full'
        />
      </div>
      

      <div className="mt-5 space-y-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:space-y-0">
        {filteredCampaigns.map((campaign) => {
          const advertiserData = getAdvertiserData(campaign.advertiserId);
          return (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              advertiserLogoUrl={advertiserData.logoUrl}
              brandTagline={advertiserData.tagline}
              onParticipateClick={handleParticipateClick}
            />
          );
        })}
        {filteredCampaigns.length === 0 && searchTerm.length > 0 && (
          <p className="col-span-full text-center text-lg text-place mt-8">
            No campaigns found matching your search.
          </p>
        )}
      </div>

      <BottomNavBar activePath={pathname} />
    </div>
  );
}
