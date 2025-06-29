// src/app/(dashboard)/influencer/opportunities/page.tsx

'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

// استيراد المكونات المستخلصة
import DashboardHeader from '@/_Components/dashboard/DashboardHeader';
import SearchBar from '@/_Components/dashboard/SearchBar';
import CampaignCard from '@/_Components/dashboard/CampaignCard';
import BottomNavBar from '@/_Components/dashboard/BottomNavBar';

// استيراد البيانات الوهمية
import { mockUsers, mockCampaigns, User, AdvertiserProfile } from '@/data/mockData';

export default function InfluencerOpportunitiesPage() {
  const pathname = usePathname(); // للحصول على المسار الحالي للـ BottomNavBar

  // محاكاة للمستخدم الحالي (يمكن جلبها من سياق المصادقة لاحقاً)
  const currentUser = mockUsers.find(
    user => user.name === 'Mahmoud Hanafi' && user.role === 'influencer'
  ) as User | undefined;

  // توفير بيانات افتراضية في حال عدم العثور على المستخدم
  const user = currentUser || {
    name: 'User',
    avatarUrl: '/images/avatars/default-avatar.png',
    notifications: 0,
    role: 'user'
  };

  // حالة شريط البحث
  const [searchTerm, setSearchTerm] = useState<string>('');

  // دالة مساعدة لجلب شعار المعلن
  const getAdvertiserLogoUrl = (advertiserId: string): string => {
    const advertiser = mockUsers.find(u => u.id === advertiserId && u.role === 'advertiser') as AdvertiserProfile | undefined;
    return advertiser?.brandLogoUrl || '/images/logos/default-brand-logo.png';
  };

  // دالة لمعالجة النقر على زر "Participate" في بطاقة الحملة
  const handleParticipateClick = (campaignId: string) => {
    console.log(`Participate button clicked for campaign: ${campaignId}`);
    // هنا يمكن إضافة منطق لإرسال طلب مشاركة أو التوجيه لصفحة تفاصيل الحملة
  };

  // تصفية الحملات بناءً على مصطلح البحث
  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen  text-gray-800 pb-16 md:pb-0">
      {/* Top Dashboard Bar */}
      <DashboardHeader
        userName={user.name}
        userAvatarUrl={user.avatarUrl || '/images/avatars/default-avatar.png'}
        notificationsCount={user.notifications}
      />

      {/* Search Bar (Mobile & Desktop) */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      

      {/* Campaign Cards Section */}
      <div className="flex-grow p-4 space-y-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:space-y-0">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            advertiserLogoUrl={getAdvertiserLogoUrl(campaign.advertiserId)}
            onParticipateClick={handleParticipateClick}
          />
        ))}
      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <BottomNavBar activePath={pathname} />
    </div>
  );
}
