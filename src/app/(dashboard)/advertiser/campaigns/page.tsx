// src/app/(dashboard)/advertiser/dashboard/page.tsx

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from '@/_Components/dashboard/SearchBar';
import BottomNavBar from '@/_Components/dashboard/BottomNavBar';
import EarningCard from '@/_Components/dashboard/EarningCard';
import DashboardHeader from '@/_Components/dashboard/DashboardHeader';
import { mockUsers, mockCampaigns } from '@/data/mockData';
import { User, AdvertiserProfile } from '@/types/user';
import { timeAgo } from '@/utils/timeAgo';
import { EarningCardData } from '@/types/earning';
import Analysis from '@/_Components/dashboard/Analysis';

export default function AdvertiserCampaigns() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const currentUser = mockUsers.find(
        user => user.name === 'Ahmed Ali' && user.role === 'advertiser'
    ) as User | undefined;

    const user = currentUser || {
        name: 'Abdulrahman Mus', 
        avatarUrl: '/avatar.svg',
        notifications: 0,
        role: 'advertiser', 
    };

    const handleCreateCampaign = () => {
        router.push('/advertiser/create-campaign');
    };

    const handleAllTimes = () => {
        router.push('/advertiser/all-times');
    };


    const baseCampaignCardsData = useMemo(() => {
        return mockCampaigns.map(campaign => {
            const advertiser = mockUsers.find(u => u.id === campaign.advertiserId) as AdvertiserProfile | undefined;

            const campaignCost = campaign.budget;

            return {
                id: campaign.id,
                brandLogoUrl: advertiser?.brandLogoUrl || 'logo.svg',
                brandHeadline: advertiser?.brandTagline || "Default Brand Tagline",
                productName: campaign.title,
                description: campaign.description,
                createdAt: campaign.createdAt,
                earningCardImageUrl: campaign.earningCardImageUrl || '',
                clickCount: Math.floor(Math.random() * 5000) + 100,
                fixedPrice: campaignCost, 
                isWithdrawalPossible: false,
            };
        });
    }, []);

    const [clientCampaignCards, setClientCampaignCards] = useState<EarningCardData[]>([]); 

    useEffect(() => {
        const updatedCards: EarningCardData[] = baseCampaignCardsData.map(card => ({
            ...card,
            postedTime: timeAgo(card.createdAt), 
        }));
        setClientCampaignCards(updatedCards);
    }, [baseCampaignCardsData]);

    const filteredCampaignCardsData = useMemo(() => {
        return clientCampaignCards.filter(card =>
            card.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.brandHeadline.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [clientCampaignCards, searchTerm]);

    return (
        <div className="flex flex-col min-h-screen text-secondary pb-16 space-y-8">
            <div className="flex flex-col p-4 md:p-0 md:flex-row md:items-center md:justify-between">
                <DashboardHeader
                    userName={user.name}
                    userAvatarUrl={user.avatarUrl || '/avatar.svg'}
                />
                <SearchBar
                    placeholder="Search campaigns"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='md:w-full'
                    createCampaign={handleCreateCampaign}
                    allTimes={handleAllTimes}
                />
            </div>
            <Analysis
                title='Your Results'
                spending={"2.255"}
                clickCount={100}
                fixedPrice={100}
            />
            <div className="flex-grow p-4 md:p-0 space-y-6 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:space-y-0">
                {filteredCampaignCardsData.length > 0 ? (
                    filteredCampaignCardsData.map((campaignCard) => (
                        <EarningCard 
                            key={campaignCard.id}
                            {...campaignCard}
                        
                            onWithdrawalRequest={() => { }}
                            isSelected={false} 
                            onSelect={() => {}} 
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-lg text-gray-500 mt-8">
                        No campaigns found matching your search.
                    </p>
                )}
            </div>

            <BottomNavBar activePath={pathname} />
        </div>
    );
}