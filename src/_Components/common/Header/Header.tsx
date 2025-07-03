// src/_Components/Layout/Header.tsx

"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "@/_Components/ui/Button";
import { useRouter, usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
<<<<<<< HEAD
=======
import { useHeaderLinks } from "@/hooks/useHeaderLinks";
import { useAuth } from "@/context/AuthContext";
>>>>>>> dc5882a (create the header)

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
<<<<<<< HEAD

  const isLandingPage = pathname === '/';
  const navLinkClasses = `text-place hover:text-secondary font-medium transition-colors duration-200`;

  return (
    <header
      className={twMerge(
        "py-4 px-4 md:px-10 flex items-center justify-between",
        !isLandingPage && "hidden md:flex"
      )}
    >
      {/* left side */}
      <div className="flex items-center space-x-8">
        <div className="logo">
          <Link href="/">
            <Image
              src="/icons/logo.svg"
              alt="Your App Logo"
              width={40}
              height={40}
              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/40x40/E2E8F0/A0AEC0?text=LOGO`; }}
            />
          </Link>
        </div>
=======
  const { isAuthenticated, isLoadingAuth, userRole } = useAuth(); 

  const links = useHeaderLinks();

  const navLinkClasses =
    "text-place hover:text-secondary font-medium transition-colors duration-200";

  if (isLoadingAuth) {
    return null;
  }
  const isLandingPage = pathname === '/';

    console.log("isAuthenticated:", isAuthenticated);
  return (
    <header className={twMerge("py-4 px-4 md:px-10 flex items-center justify-between",!isLandingPage && "hidden md:flex")}>
      <div>
        <Link href={isAuthenticated && userRole ? (userRole === 'influencer' ? "/influencer/opportunities" : "/advertiser/campaigns") : "/"}>
          <Image
            src="/icons/logo.svg"
            alt="Your App Logo"
            width={40}
            height={40}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/40x40/E2E8F0/A0AEC0?text=LOGO";
            }}
          />
        </Link>
>>>>>>> dc5882a (create the header)
      </div>
      <nav className="hidden md:flex items-center space-x-8">
<<<<<<< HEAD
        <Link href="/" className={twMerge(navLinkClasses, pathname === '/' ? 'text-secondary' : '')}>
          Home
        </Link>

        <Link href="/#about-us" className={navLinkClasses}>
          About Us
        </Link>

        <Link href="/#influencers-section" className={navLinkClasses}>
          Influencers
        </Link>
        <Link href="/#opinions" className={navLinkClasses}>
          Opinions
        </Link>

        {isAuthenticated && userType === "advertiser" && (
          <Link href="/advertiser/campaigns" className={twMerge(navLinkClasses, pathname.startsWith('/advertiser/campaigns') ? 'text-secondary' : '')}>
            Campaigns
=======
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={twMerge(
              navLinkClasses,
              pathname.startsWith(link.href) ? "text-secondary font-semibold" : ""
            )}
          >
            {link.label}
>>>>>>> dc5882a (create the header)
          </Link>
        ))}
      </nav>

        {!isAuthenticated &&
          <div className="flex items-center space-x-4">
              <Button onClick={() => router.push("/login")}>Sign In</Button>
          </div>
        }
    </header>
  );
};

export default Header;
<<<<<<< HEAD
=======

>>>>>>> dc5882a (create the header)
