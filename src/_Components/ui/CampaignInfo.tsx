// src/_Components/ui/CampaignInfo.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Campaign } from '@/types/campaign';
import { AdvertiserProfile } from '@/types/user';

interface CampaignInfoProps {
    campaign: Campaign;
    advertiser: AdvertiserProfile | null;
}


const CampaignInfo: React.FC<CampaignInfoProps> = ({ campaign, advertiser }) => {
return (
    <>
    {/* Campaign Info Section */}
        <div className="mb-6">
            <div className="flex items-center mb-4">
            <Image

                src={advertiser?.brandLogoUrl || '/images/logos/default-brand-logo.png'} 
                alt={advertiser?.name || 'Advertiser'}
                width={48}
                height={48}
                className="rounded-full object-cover mr-3"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/logos/default-brand-logo.png'; }} // <--- مسار افتراضي صحيح
            />
            <div>
                <h2 className="text-base font-medium text-gray-900">{campaign.title}</h2>
                <p className="text-sm text-primary">{advertiser?.brandTagline || advertiser?.name || ''}</p>
            </div>
            </div>

            <h3 className="text-base font-semibold mb-2">Campaign Description</h3>
            <p className="text-place leading-relaxed mb-4">{campaign.description}</p>
        </div>
    </>
);
};

export default CampaignInfo;
