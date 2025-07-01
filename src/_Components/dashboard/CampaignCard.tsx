

import React from 'react';
import Image from 'next/image';
import Button from '@/_Components/ui/Button';
import { timeAgo } from '@/utils/timeAgo';

interface Campaign {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    createdAt: string;
    platforms: { name: string; icon: string; isActive: boolean }[];
}

interface CampaignCardProps {
    campaign: Campaign;
    advertiserLogoUrl: string;
    brandTagline: string;
    onParticipateClick: (campaignId: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
    campaign,
    advertiserLogoUrl,
    brandTagline,
    onParticipateClick,
}) => {
    const postedTime = timeAgo(campaign.createdAt);
return (
    <div className="rounded-sm flex flex-col h-full border border-place p-4">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
                <Image
                    src={advertiserLogoUrl}
                    alt="Brand Logo"
                    width={24}
                    height={24}
                    className="rounded-full mr-4 object-cover"
                />
                <div className="flex flex-col">
                    <p className="text-base font-normal text-secondary">{brandTagline}</p>
                    <p className="text-base font-normal text-primary">{campaign.title}</p>
                </div>
            </div>
            {/* Share Icon */}
            <button className="">
                <Image
                src="/icons/share.svg"
                alt="Share"
                width={20}
                height={20}
                className="object-cover"
                />
            </button>
        </div>
        




      {/* Content Section */}
    <div className="flex flex-col flex-grow space-y-4">
        <p className="text-md text-secondary font-semibold line-clamp-2">{campaign.description}</p>
        <p className="text-md text-place mt-auto font-normal">Posted {postedTime}</p>
        
        {/* Platforms */}
        
        <div className="relative w-full h-40">
            <Image
                src={campaign.imageUrl || '/food.svg'}
                alt={campaign.title}
                layout="fill"
                objectFit="cover"
                className='rounded-sm'
            />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
            {campaign.platforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-center bg-input rounded-full px-2 py-2">
                    <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={16}
                        height={16}
                    />
                    
                </div>
            ))}
        </div>

            <div className="mt-auto"> 
                <Button onClick={() => onParticipateClick(campaign.id)} className="w-full">
                    Participate
                </Button>
            </div>
    </div>
</div>
);
};

export default CampaignCard;
