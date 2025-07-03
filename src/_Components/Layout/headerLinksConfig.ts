// src/_Components/Layout/headerLinksConfig.ts

export type LinkItem = {
  label: string;
  href: string;
  isAnchor?: boolean; // لتحديد ما إذا كان الرابط هو anchor link
};

// روابط صفحة الهبوط
export const landingPageLinks: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about-us", isAnchor: true },
  { label: "Influencers", href: "#influencers-section", isAnchor: true },
  { label: "Opinions", href: "#opinions", isAnchor: true },
];

// روابط لوحة تحكم المؤثرين
export const influencerDashboardLinks: LinkItem[] = [
  { label: "Opportunities", href: "/influencer/opportunities" },
  { label: "My Earnings", href: "/influencer/earnings" },
  { label: "Settings", href: "/settings" },
];

// روابط لوحة تحكم المعلنين
export const advertiserDashboardLinks: LinkItem[] = [
  { label: "Campaigns", href: "/advertiser/campaigns" },
  // يمكن إضافة رابط Analytics هنا إذا كان موجودًا
  // { label: "Analytics", href: "/advertiser/analytics" },
  { label: "Settings", href: "/settings" },
];

// روابط خاصة بمرحلة تسجيل المؤثرين
export const influencerRegisterFlowLinks: LinkItem[] = [
  { label: "Influencer", href: "/register/influencer" }, // رابط لتحديد الصفحة الحالية
  ...influencerDashboardLinks, // يمكن تضمين روابط لوحة التحكم لتبسيط المنطق
];

// روابط خاصة بمرحلة تسجيل المعلنين
export const advertiserRegisterFlowLinks: LinkItem[] = [
  { label: "Advertiser", href: "/register/advertiser" }, // رابط لتحديد الصفحة الحالية
  ...advertiserDashboardLinks, // يمكن تضمين روابط لوحة التحكم لتبسيط المنطق
];
