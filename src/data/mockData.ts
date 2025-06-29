// src/data/mockData.ts

// (باقي تعريفات الواجهات كما هي)
export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string; // رابط صورة الملف الشخصي للمستخدم
    role: 'advertiser' | 'influencer' | 'admin' | 'user';
    phoneNumber?: string;
    address?: string;
    bio?: string;
}

export interface InfluencerProfile extends User {
    socialMediaLinks: { platform: string; url: string; followers: number; icon: string }[];
    niches: string[];
    engagementRate?: number;
    portfolioImages?: string[];
    beneficiaryName?: string;
    bankName?: string;
    ibanNumber?: string;
}

export interface AdvertiserProfile extends User {
    brandName: string;
    brandDescription: string;
    brandLogoUrl?: string; // رابط شعار العلامة التجارية
    companyLegalName?: string;
    companyCR?: string;
    companyVAT?: string;
    companyBillingAddress?: string;
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
    imageUrl?: string; // صورة للحملة
    earningCardImageUrl?: string;
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
    earningCardImageUrl?: string;
}


// بيانات المستخدمين
export const mockUsers: User[] = [
    {
        id: 'user-1', name: 'Advertiser 1', email: 'advertiser1@example.com', role: 'advertiser',
        phoneNumber: '123456789', brandName: 'BrandX Corp', brandDescription: 'Leading e-commerce brand.',
        brandLogoUrl: '/avatar.svg',
        companyLegalName: 'BrandX Corporation', companyCR: 'CR12345', companyVAT: 'VAT98765', companyBillingAddress: '123 Main St, Cairo, Egypt'
    } as AdvertiserProfile,
    {
        id: 'user-2', name: 'Influencer 1', email: 'influencer1@example.com', role: 'influencer',
        phoneNumber: '987654321', niches: ['Fashion', 'Beauty'], engagementRate: 0.05,
        socialMediaLinks: [{ platform: 'Instagram', url: 'https://instagram.com/influencer1', followers: 100000, icon: 'instagram.svg' }],
        avatarUrl: '/avatar.svg' 
    } as InfluencerProfile,
    {
        id: 'user-3', name: 'Mahmoud Hanafi', email: 'mahmoud@example.com', role: 'influencer',
        avatarUrl: '/avatar.svg',
        phoneNumber: '123123123', niches: ['Technology', 'Lifestyle'], engagementRate: 0.07,
        socialMediaLinks: [{ platform: 'YouTube', url: 'https://youtube.com/mahmoud', followers: 500000, icon: '/youtube.svg' }]
    } as InfluencerProfile,
    {
        id: 'user-4', name: 'Test User Email', email: 'test@example.com', role: 'user', 
        phoneNumber: undefined, 
        address: '123 Test St',
        avatarUrl: '/avatar.svg'
    },
    {
        id: 'user-5', name: 'Admin User', email: 'admin@example.com', role: 'admin',
        phoneNumber: '+111222334455',
        address: 'Admin HQ',
        avatarUrl: '/avatar.svg'
    },
    {
        id: 'user-6', name: 'Khalil User', email: 'khalil79@gmail.com', role: 'influencer', 
        phoneNumber: '+15551234567',
        niches: ['Gaming', 'Tech Reviews'], engagementRate: 0.06,
        socialMediaLinks: [{ platform: 'Twiter', url: 'https://twiter.tv/khalil', followers: 50000, icon: '/x.svg' }],
        avatarUrl: '/avatar.svg' // <--- تم إلغاء التعليق ووضع مسار صورتك
    } as InfluencerProfile,
];

// بيانات الحملات
export const mockCampaigns: Campaign[] = [
    {
        id: 'camp-1',
        title: 'Summer Collection Launch',
        description: 'Promote our new summer clothing line across various social media channels.',
        advertiserId: 'user-1',
        budget: 5000,
        status: 'active',
        startDate: '2024-07-01',
        endDate: '2024-07-31',
        targetAudience: { age: '18-35', gender: 'Female', interests: ['Fashion', 'Lifestyle'], geography: 'Egypt' },
        platforms: [
            { name: 'Instagram', icon: '/instagram.svg', isActive: true },
            { name: 'TikTok', icon: '/tiktok.svg', isActive: true }
        ],
        requiredDeliverables: ['2 Instagram Posts', '5 Instagram Stories', '1 TikTok Video'],
        influencersApplied: ['user-2'],
        influencersAccepted: [],
        imageUrl: '/food.svg',
        earningCardImageUrl: '/images/earnings/beauty-product.jpg'
    },
    {
        id: 'camp-2',
        title: 'AlBaik Crispy Chicken',
        description: 'Treat yourself to the legendary AlBaik crispy chicken - golden, juicy, and bursting with flavor. Grab it now with 10% off!',
        advertiserId: 'user-1',
        budget: 3000,
        status: 'active',
        startDate: '2024-06-15',
        endDate: '2024-07-15',
        targetAudience: { age: 'All Ages', gender: 'Any', interests: ['Food', 'Lifestyle'], geography: 'Saudi Arabia' },
        platforms: [
            { name: 'Instagram', icon: '/instagram.svg', isActive: true },
            { name: 'X', icon: '/x.svg', isActive: true }
        ],
        requiredDeliverables: ['1 Reel', '2 Stories'],
        influencersApplied: ['user-3'],
        influencersAccepted: [],
        imageUrl: '/food.svg',
        earningCardImageUrl: '/images/earnings/albaik-earnings.jpg'
    },
];

export const mockTransactions: Transaction[] = [
    { id: 'trans-1', userId: 'user-1', amount: 1000, type: 'deposit', date: '2024-06-20', status: 'completed' },
    { id: 'trans-2', userId: 'user-2', amount: 500, type: 'campaign_earning', date: '2024-06-25', status: 'pending', campaignId: 'camp-1' },
];

export const mockNotifications: Notification[] = [
    { id: 'notif-1', userId: 'user-2', type: 'new_campaign', message: 'New campaign available: Summer Collection Launch!', isRead: false, timestamp: '2024-06-25T10:00:00Z', link: '/opportunities/camp-1' },
    { id: 'notif-2', userId: 'user-1', type: 'application_status', message: 'Influencer 1 applied to your "Tech Gadgets" campaign.', isRead: true, timestamp: '2024-06-24T15:30:00Z', link: '/campaigns/camp-2' },
];
