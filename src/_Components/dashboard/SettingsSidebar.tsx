// src/_Components/dashboard/SettingsSidebar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';


const SettingsSidebar = () => {
  const pathname = usePathname();

  const sidebarItems = [
    { name: 'My Profile', icon: '/user.svg', href: '/settings/profile/details' }, 
    { name: 'Wallet', icon: '/wallet.svg', href: '/settings/wallet' }, 
    { name: 'Privacy Policy', icon: '/privacy.svg', href: '/settings/privacy-policy' }, 
    { name: 'Terms of Use', icon: '/terms.svg', href: '/settings/terms-of-use' },
    { name: 'Technical Support', icon: '/call.svg', href: '/settings/support' }, 
    { name: 'Different Account', icon: '/different.svg', href: '/login' }, 
    { name: 'Log Out', icon: '/logout.svg', href: '/login' },
  ];

  const isActiveLink = (href: string) => {
  
    if (href === '/settings' && pathname === '/settings') {
      return true;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 rounded-sm flex flex-col">
      <nav className="flex flex-col space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={twMerge(
              "flex items-center p-3 rounded-sm transition-colors duration-200",
              isActiveLink(item.href) ? 'bg-primary opacity-50 text-white' : 'text-secondary hover:bg-input',
              item.name === 'Log Out' && (isActiveLink(item.href) ? 'bg-red-600' : 'text-red-600 hover:bg-red-50')
            )}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={20}
              height={20}
              className={twMerge(
                "mr-3 object-contain",
                isActiveLink(item.href) ? 'filter brightness-0 invert' : ''
              )}
            />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
