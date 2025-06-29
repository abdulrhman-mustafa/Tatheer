// src/_Components/dashboard/CampaignCard.tsx

import React from "react";
import Image from "next/image";
import { Campaign } from "@/data/mockData";
import Button from "../ui/Button";

interface CampaignCardProps {
campaign: Campaign;
advertiserLogoUrl: string; // رابط شعار المعلن
onParticipateClick: (campaignId: string) => void; // دالة عند النقر على زر المشاركة
}

const CampaignCard: React.FC<CampaignCardProps> = ({
campaign,
advertiserLogoUrl,
onParticipateClick,
}) => {
return (
    <div className="rounded-sm p-4 border border-place">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-3">
            {/* Brand Logo */}
                <Image
                    src={advertiserLogoUrl || ""}
                    alt="Brand Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                    onError={(e) => {
                    (e.target as HTMLImageElement).src =
                        "avatar.svg";
                    }}
                />
                <div>
                    <p className="text-sm font-normal text-secondary">
                        Your skin deserves the best
                    </p>
                    <p className="text-xs text-primary">{campaign.title}</p>
                </div>
            </div>
            <button>
                <Image
                    src="/share.svg"
                    alt="Share Icon"
                    width={25}
                    height={25}
                    className="object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                        "share.svg";
                    }}
                />
            </button>
        </div>

        <p className="text-sm text-secondary mb-3">{campaign.description}</p>

        {/* Campaign Images */}
        <div className="mb-4">
            <Image
                src={campaign.imageUrl || "/food.svg"}
                alt={campaign.title}
                width={300}
                height={200}
                className="rounded-sm object-cover w-full h-auto"
                onError={(e) => {
                    (e.target as HTMLImageElement).src =
                    "/food.svg";
                }}
            />
        </div>

        <Button
            onClick={() => onParticipateClick(campaign.id)}
            size="medium"
            className="w-full"
        >
            Participate
        </Button>
    </div>
);
};

export default CampaignCard;
