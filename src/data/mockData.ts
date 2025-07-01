// src/data/mockData.ts

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: 'advertiser' | 'influencer' | 'admin' | 'user';
    phoneNumber?: string;
    address?: string;
    bio?: string;
    notifications?: number;
}

export interface InfluencerProfile extends User {
    socialMediaLinks: { platform: string; url: string; followers: number; icon: string }[];
    niches: string[];
    engagementRate?: number;
    portfolioImages?: string[];
    beneficiaryName?: string;
    bankName?: string;
    ibanNumber?: string;
    gender?: string;
    age?: string;
}

export interface AdvertiserProfile extends User {
    brandName: string;
    brandDescription: string;
    brandLogoUrl?: string;
    companyLegalName?: string;
    companyCR?: string;
    companyVAT?: string;
    companyBillingAddress?: string;
    brandTagline?: string;
}

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
    influencersAccepted: string[];
    imageUrl?: string;
    earningCardImageUrl?: string; 
    shareLink?: string;
    createdAt: string; 
}

export type TransactionType = 'deposit' | 'withdrawal' | 'campaign_payment' | 'campaign_earning';

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    type: TransactionType;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    description?: string;
    campaignId?: string;
}

export type NotificationType = 'new_campaign' | 'application_status' | 'payment_received' | 'message';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    timestamp: string;
    link?: string;
}


// بيانات المستخدمين الوهمية
export const mockUsers: User[] = [
    {
        id: 'user-1', name: 'Advertiser 1', email: 'advertiser1@example.com', role: 'advertiser',
        phoneNumber: '123456789', brandName: 'BrandX Corp', brandDescription: 'Leading e-commerce brand.',
        brandLogoUrl: '/logo.svg',
        companyLegalName: 'BrandX Corporation', companyCR: 'CR12345', companyVAT: 'VAT98765', companyBillingAddress: '123 Main St, Cairo, Egypt',
        brandTagline: 'Buty Plus',
        notifications: 2
    } as AdvertiserProfile,
    {
        id: 'user-2', name: 'Influencer 1', email: 'influencer1@example.com', role: 'influencer',
        phoneNumber: '987654321', niches: ['Fashion', 'Beauty'], engagementRate: 0.05,
        socialMediaLinks: [{ platform: 'Instagram', url: 'https://instagram.com/influencer1', followers: 100000, icon: '/icons/instagram.svg' }],
        avatarUrl: '/avatar.svg',
        notifications: 5
    } as InfluencerProfile,
    {
        id: 'user-3', name: 'Mahmoud Hanafi', email: 'mahmoud@example.com', role: 'influencer',
        avatarUrl: '/avatar.svg',
        phoneNumber: '+970599123456',
        niches: ['Technology', 'Lifestyle'], engagementRate: 0.07,
        socialMediaLinks: [{ platform: 'YouTube', url: 'https://youtube.com/mahmoud', followers: 500000, icon: '/icons/youtube.svg' }],
        notifications: 3
    } as InfluencerProfile,
    {
        id: 'user-4', name: 'Test User Email', email: 'test@example.com', role: 'user', 
        phoneNumber: undefined, 
        address: '123 Test St',
        avatarUrl: '/avatar.svg',
        notifications: 0
    },
    {
        id: 'user-5', name: 'Admin User', email: 'admin@example.com', role: 'admin',
        phoneNumber: '+111222334455',
        address: 'Admin HQ',
        avatarUrl: '/avatar.svg',
        notifications: 10
    },
    {
        id: 'user-6', name: 'Khalil User', email: 'khalil79@gmail.com', role: 'influencer', 
        phoneNumber: '+15551234567',
        niches: ['Gaming', 'Tech Reviews'], engagementRate: 0.06,
        socialMediaLinks: [{ platform: 'Twiter', url: 'https://twiter.tv/khalil', followers: 50000, icon: '/icons/x.svg' }],
        avatarUrl: '/avatar.svg',
        notifications: 1
    } as InfluencerProfile,
];

// بيانات الحملات الوهمية
export const mockCampaigns: Campaign[] = [
    {
        id: 'camp-1',
        title: 'Beauty Plus Care Package',
        description: 'Enjoy soft and beautiful skin with the Beauty Plus care package - 10% off now!',
        advertiserId: 'user-1',
        budget: 1500,
        status: 'active',
        startDate: '2024-07-01',
        endDate: '2024-07-31',
        targetAudience: { age: '18-35', gender: 'Female', interests: ['Fashion', 'Lifestyle'], geography: 'Egypt' },
        platforms: [
            { name: 'Instagram', icon: '/icons/instagram.svg', isActive: true },
            { name: 'X', icon: '/icons/x.svg', isActive: true }
        ],
        requiredDeliverables: ['2 Instagram Posts', '5 Instagram Stories', '1 TikTok Video'],
        influencersApplied: ['user-2'],
        influencersAccepted: [],
        imageUrl: '/food.svg',
        earningCardImageUrl: '/makeup.svg',
        shareLink: 'https://bit.ly/summer-ad-link',
        createdAt: '2024-06-28T10:00:00Z',
    },
    {
        id: 'camp-2',
        title: 'AlBaik Crispy Chicken',
        description: 'Promote our delicious new crispy chicken. A must-try for food lovers!',
        advertiserId: 'user-1',
        budget: 1000,
        status: 'active',
        startDate: '2024-06-15',
        endDate: '2024-07-15',
        targetAudience: { age: 'All Ages', gender: 'Any', interests: ['Food', 'Lifestyle'], geography: 'Saudi Arabia' },
        platforms: [
            { name: 'Instagram', icon: '/icons/instagram.svg', isActive: true },
            { name: 'X', icon: '/icons/x.svg', isActive: true }
        ],
        requiredDeliverables: ['1 Reel', '2 Stories'],
        influencersApplied: ['user-3'],
        influencersAccepted: [],
        imageUrl: '/food.svg',
        earningCardImageUrl: '/makeup.svg',
        shareLink: 'https://bit.ly/albaik-ad-link-1',
        createdAt: '2024-06-10T14:30:00Z',
    },
    {
        id: 'camp-3',
        title: 'New Tech Gadgets Review',
        description: 'Review our latest smart home devices. Perfect for tech enthusiasts!',
        advertiserId: 'user-1',
        budget: 50,
        status: 'pending',
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        targetAudience: { age: '25-50', gender: 'Male', interests: ['Technology', 'Gadgets'], geography: 'Global' },
        platforms: [
            { name: 'YouTube', icon: '/icons/youtube.svg', isActive: true },
            { name: 'Facebook', icon: '/icons/facebook.svg', isActive: true }
        ],
        requiredDeliverables: ['1 YouTube Video', '3 Facebook Posts'],
        influencersApplied: [],
        influencersAccepted: [],
        imageUrl: '/makeup.svg',
        earningCardImageUrl: '/food.svg',
        shareLink: 'https://bit.ly/tech-review-link',
        createdAt: '2024-05-20T08:00:00Z',
    },
    {
        id: 'camp-4',
        title: 'Healthy Living Challenge',
        description: 'Promote a healthy lifestyle with our new fitness app. Join the challenge!',
        advertiserId: 'user-1',
        budget: 1000,
        status: 'active',
        startDate: '2024-07-10',
        endDate: '2024-07-25',
        targetAudience: { age: '20-40', gender: 'Any', interests: ['Health', 'Fitness'], geography: 'Egypt' },
        platforms: [
            { name: 'Instagram', icon: '/icons/instagram.svg', isActive: true },
            { name: 'Snapchat', icon: '/icons/snapchat.svg', isActive: true }
        ],
        requiredDeliverables: ['4 Instagram Stories', '1 Snapchat Story'],
        influencersApplied: ['user-6'],
        influencersAccepted: [],
        imageUrl: '/makeup.svg',
        earningCardImageUrl: '/food.svg',
        shareLink: 'https://bit.ly/healthy-challenge-link',
        createdAt: '2024-06-29T18:45:00Z',
    },
];

export const mockTransactions: Transaction[] = [
    { id: 'trans-1', userId: 'user-1', amount: 1000, type: 'deposit', date: '2024-06-20', status: 'completed' },
    { id: 'trans-2', userId: 'user-2', amount: 500, type: 'campaign_earning', date: '2024-06-25', status: 'pending', campaignId: 'camp-1' },
    { id: 'trans-3', userId: 'user-3', amount: 300, type: 'campaign_earning', date: '2024-06-26', status: 'completed', campaignId: 'camp-2' },
];

export const mockNotifications: Notification[] = [
    { id: 'notif-1', userId: 'user-2', type: 'new_campaign', message: 'New campaign available: Summer Collection Launch!', isRead: false, timestamp: '2024-06-25T10:00:00Z', link: '/opportunities/camp-1' },
    { id: 'notif-2', userId: 'user-1', type: 'application_status', message: 'Influencer 1 applied to your "Tech Gadgets" campaign.', isRead: true, timestamp: '2024-06-24T15:30:00Z', link: '/campaigns/camp-2' },
    { id: 'notif-3', userId: 'user-3', type: 'payment_received', message: 'You received a payment of $300 for AlBaik Crispy Chicken.', isRead: false, timestamp: '2024-06-26T11:00:00Z', link: '/earnings' },
    { id: 'notif-4', userId: 'user-2', type: 'message', message: 'New message from BrandX Corp.', isRead: true, timestamp: '2024-06-23T09:00:00Z', link: '/messages' },
];

// Constants for Influencer Registration
export const AVAILABLE_INTERESTS = [
    "Sport",
    "Beauty",
    "Fun",
    "Science",
    "Politics",
    "Religion",
    "Culture",
    "Kids",
];

export const SOCIAL_MEDIA_PLATFORMS = [
    { name: "Youtube", icon: "/icons/youtube.svg" },
    { name: "Instagram", icon: "/icons/instagram.svg" },
    { name: "X", icon: "/icons/x.svg" },
    { name: "Facebook", icon: "/icons/facebook.svg" },
    { name: "Snapchat", icon: "/icons/snapchat.svg" },
    { name: "Linkedin", icon: "/icons/linkedin.svg" },
];
