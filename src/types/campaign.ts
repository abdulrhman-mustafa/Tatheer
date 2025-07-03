// src/types/campaign.ts

export type CampaignStatus = 'active' | 'pending' | 'completed' | 'cancelled' | 'draft';

export interface Campaign {
    id: string;
    title: string;
    description: string;
    advertiserId: string;
    budget: number;
    status: CampaignStatus;
    startDate: string;
    endDate: string;
    targetAudience: { age: string; gender: string; interests: string[]; geography: string };
    platforms: { name: string; icon: string; isActive: boolean }[];
    requiredDeliverables: string[];
    influencersApplied: string[];
    gainedInfluencers: string[];
    imageUrl?: string;
    earningCardImageUrl?: string;
    shareLink?: string;
    createdAt: string;
}