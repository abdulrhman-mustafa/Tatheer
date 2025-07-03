// src/types/user.ts

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: 'advertiser' | 'influencer';
    phoneNumber?: string;
    address?: string;
    bio?: string;
    notifications?: number;
    profileImageUrl?: string;
}

export interface InfluencerProfile extends User {
    userName: string;
    profilePictureUrl: string;
    bio: string;
    socialMediaLinks: { platform: string; url: string; icon: string; followers?: number }[];
    categories: string[];
    audienceDemographics: { country: string; ageRange: string }[];
    
    beneficiaryName?: string;
    bankName?: string;
    ibanNumber?: string;
    

    gender: string;
    age: string;
    selectedInterests: string[];
    selectedPlatforms: string[];
}

export interface AdvertiserProfile extends User {
    brandTagline?: string;
    brandLogoUrl?: string;
    brandName?: string;
    brandDescription?: string;
    companyLegalName?: string;
    companyCR?: string;
    companyVAT?: string;
    companyBillingAddress?: string;
}

