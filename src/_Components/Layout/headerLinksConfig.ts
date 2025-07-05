// src/_Components/Layout/headerLinksConfig.ts

export type LinkItem = {
  label: string;
  href: string;
  isAnchor?: boolean;
};


export const landingPageLinks: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about-us", isAnchor: true },
  { label: "Influencers", href: "#influencers-section", isAnchor: true },
  { label: "Opinions", href: "#opinions", isAnchor: true },
];


export const influencerDashboardLinks: LinkItem[] = [
  { label: "Opportunities", href: "/influencer/opportunities" },
  { label: "My Earnings", href: "/influencer/earnings" },
  { label: "Settings", href: "/settings" },
];


export const advertiserDashboardLinks: LinkItem[] = [
  { label: "Campaigns", href: "/advertiser/campaigns" },
  { label: "Settings", href: "/settings" },
];


export const influencerRegisterFlowLinks: LinkItem[] = [
  { label: "Influencer", href: "/register/influencer" }, 
  ...influencerDashboardLinks, 
];


export const advertiserRegisterFlowLinks: LinkItem[] = [
  { label: "Advertiser", href: "/register/advertiser" }, 
  ...advertiserDashboardLinks, 
];
