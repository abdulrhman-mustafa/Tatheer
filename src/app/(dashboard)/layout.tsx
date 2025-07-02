// src/app/(dashboard)/layout.tsx

"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SettingsSidebar from '@/_Components/dashboard/SettingsSidebar';

import { mockUsers, User } from '@/data/mockData';
import SearchBar from '@/_Components/dashboard/SearchBar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();

    // Mock user data for the desktop header
    const currentUser = mockUsers.find(
        user => user.name === 'Mahmoud Hanafi' && user.role === 'influencer' 
    ) as User | undefined;

    const user = currentUser || {
        id: 'user-default',
        name: 'User',
        email: 'user@example.com',
        avatarUrl: '/avatar.svg',
        notifications: 0,
        role: 'user',
    };

    const isActiveLink = (href: string) => {
        if (href === '/influencer/opportunities/' || href === '/influencer/earnings' || href === '/settings/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const handleNotificationClick = () => {
        router.push('/dashboard/notifications');
    };
    const [desktopSearchTerm, setDesktopSearchTerm] = React.useState('');
    const isSettingsPath = pathname.startsWith('/settings');

    return (
        <div className="flex flex-col min-h-screen ">
            <header className="hidden md:flex w-full p-4 items-center">
                <Link href="/influencer/opportunities">
                    <Image
                        src="/icons/logo.svg"
                        alt="Tatheer Logo"
                        width={40} 
                        height={30} 
                        className="cursor-pointer"
                    />
                </Link>
                <div className="flex items-center space-x-8  w-full justify-center">
                    <nav className="flex space-x-6  font-medium">
                        <Link href="/influencer/opportunities" className={`hover:text-secondary transition-colors ${isActiveLink('/influencer/opportunities') ? 'text-secondary' : 'text-place'}`}>
                            Opportunise
                        </Link>
                        <Link href="/influencer/earnings" className={`hover:text-secondary transition-colors ${isActiveLink('/influencer/earnings') ? 'text-secondary' : 'text-place'}`}>
                            My Earnings
                        </Link>
                        <Link href="/settings" className={`hover:text-secondary transition-colors ${isActiveLink('/settings') ? 'text-secondary' : 'text-place'}`}>
                            Setting
                        </Link>
                    </nav>
                </div>
            </header>
            <div className="items-center space-x-2 p-4 md:flex hidden">
                <div className="flex items-center space-x-2">
                    <Image
                        src={user.avatarUrl || '/avatar.svg'}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `/avatar.svg`; }}
                    />
                    <div className="flex flex-col text-sm">
                        <span className="font-semibold text-primary">Hi {user.name},</span>
                        <span className="text-place">Tatheer Web</span>
                    </div>
                </div>

                <div className="flex items-center w-full">
                        {/* Search Bar */}
                    <SearchBar
                        placeholder="Search"
                        value={desktopSearchTerm}
                        onChange={(e) => setDesktopSearchTerm(e.target.value)}
                        className='w-full'
                    />

                        {/* Notification Bell */}
                    <button onClick={handleNotificationClick} className="relative p-2 rounded-full">
                        <Image
                            src="/notification.svg"
                            alt="Notifications"
                            width={60}
                            height={60}
                            className="cursor-pointer mb-4"
                            onError={(e) => { (e.target as HTMLImageElement).src = `/notification.svg`; }}
                        />
                        {user?.notifications && user.notifications > 0 && (
                            <span className="absolute top-4 right-4 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                {user.notifications}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 h-full">
                {isSettingsPath && (
                    <div className="hidden px-2 mr-5 md:block w-64 ">
                        <SettingsSidebar />
                    </div>
                )}

                <main className={`flex-1 rounded-sm md:px-6 ${isSettingsPath ? '' : ''}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}