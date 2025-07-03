// src/hooks/useHeaderLinks.ts

"use client";
import { usePathname } from "next/navigation";
import {
  landingPageLinks,
  influencerDashboardLinks,
  advertiserDashboardLinks,
  influencerRegisterFlowLinks,
  advertiserRegisterFlowLinks,
} from "@/_Components/Layout/headerLinksConfig";
import { useAuth } from "@/context/AuthContext";
import { LinkItem } from "@/_Components/Layout/headerLinksConfig";

export function useHeaderLinks(): LinkItem[] {
  const pathname = usePathname();
  const { isAuthenticated, userRole, isLoadingAuth } = useAuth();


  if (isLoadingAuth) {
    return landingPageLinks;
  }

  // دي حالة المستخدم اللي مش مسجل دخول
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/verify-otp");
  const isSelectTypePage = pathname.startsWith("/select-type");

  if (!isAuthenticated || pathname === "/" || isAuthPage || isSelectTypePage) {
    // دي الروابط اللي هتظهر وانت بتسجل
    if (pathname.startsWith("/register/influencer")) {
      return influencerRegisterFlowLinks;
    }
    if (pathname.startsWith("/register/advertiser")) {
      return advertiserRegisterFlowLinks;
    }
    // دي روابط ال landing page للي مش مسجلين دخول
    return landingPageLinks;
  }

  // دي حالة المستخدم المسجل
  if (isAuthenticated) {
    if (userRole === "influencer") {
      return influencerDashboardLinks;
    }
    if (userRole === "advertiser") {
      return advertiserDashboardLinks;
    }
  }

  // لو مفيش اي شرط من دول اتطبق رجعلي الينكات دي
  return [
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
  ];
}

